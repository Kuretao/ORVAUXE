# Lead Submission Flow

## Contract

A project inquiry is accepted when Attio confirms the Deal identified by submission_id. Email delivery and analytics are follow-up side effects and do not redefine acceptance.

## Input model

The exact UI fields may be refined during product implementation, but the application input has these architectural categories:

- submissionId: UUID;
- turnstileVerificationId: UUID for the current Siteverify operation;
- contact identity: name and email;
- company/brand: name and optional website;
- serviceInterest: edition or atelier;
- optional editionSlug;
- budgetRange: controlled value, optional until product decides otherwise;
- inquiryMessage: bounded free text;
- source context: controlled route/CTA identifiers;
- turnstileToken: transport-only and removed before CRM mapping.

Zod limits string length, trims values and rejects unexpected controlled values. The free-text message never enters analytics or default Sentry context.

## Submission ID lifecycle

1. StartProjectForm creates a UUID in the browser for a logical submission attempt.
2. The ID is held in component state and submitted as a hidden value.
3. Double-click is disabled in UI, but repeated requests retain the same ID.
4. Validation or Turnstile failure retains the ID and obtains a fresh Turnstile token.
5. A network retry retains the ID.
6. Success locks the completed state; starting another inquiry creates a new ID.
7. The server validates UUID shape but does not treat the client-generated value as authorization.

## Turnstile verification ID lifecycle

`turnstileVerificationId` identifies one Siteverify operation for one Turnstile token. It is distinct from the long-lived business `submissionId`.

1. When the form receives a Turnstile token, it creates a UUID `turnstileVerificationId` for that token.
2. A network retry of Siteverify for the same token reuses the same `turnstileVerificationId`.
3. A refreshed or reset challenge produces a new token and a new `turnstileVerificationId`.
4. Refreshing Turnstile never changes the inquiry's `submissionId`.
5. The server validates both UUIDs and never treats either value as authorization.

## Layer ownership

### StartProjectForm

- accessible labels, descriptions and focus;
- local pending state;
- generation/retention of submissionId;
- Turnstile widget token;
- presentation of typed action state;
- project_form_started browser event once.

It does not normalize CRM records or call vendors.

### Server Action

- use server transport entry;
- FormData-to-plain-input conversion;
- Zod safeParse;
- safe field-error mapping;
- Turnstile verification before CRM;
- construction of application dependencies;
- translation of application result to serializable action state.

It does not contain email markup, raw Attio fetch bodies or the full workflow.

### submitProjectInquiry

- controls Attio → Resend → PostHog order;
- determines accepted versus rejected;
- invokes narrow ports;
- catches non-blocking side-effect failures;
- returns a typed application result.

### Infrastructure adapters

- timeouts and authentication;
- provider request/response shape;
- vendor-specific error detail;
- safe mapped response for the application.

## CRM identity and edge cases

### Person

Trim and lowercase the email for the ORVAUXE matching policy. Do not strip plus tags, dots or rewrite provider-specific aliases. Upsert Person by Attio’s unique email attribute. A duplicate email updates the same Person while preserving intentional new Deals.

### Company

Prefer a website explicitly supplied by the user. Parse and normalize the hostname for matching; preserve the submitted URL separately if useful.

- Explicit reliable business website: upsert Company by unique domain.
- No website: do not infer Company from email alone.
- Gmail/private mailbox: do not create a Company from the mailbox domain.
- Company name but no reliable domain: store the name on the Deal as submitted_company_name and leave the Company reference empty for human resolution.
- Same company, different people: domain upsert resolves to one Company.

### Deal

Every intentional inquiry is a distinct Deal. submission_id is a custom unique attribute. Upsert the Deal using this attribute so a retry updates/returns the same record.

The Deal stores:

- submission_id;
- Person reference;
- optional Company reference;
- submitted company name;
- service/Edition interest;
- budget range;
- source context;
- message/notes as confidential CRM data;
- initial pipeline status NEW.

## Exact execution

~~~text
1. Parse FormData.
2. Validate with Zod.
   Failure → field errors; stop.
3. Verify Turnstile with turnstileVerificationId as idempotency_key.
   Failure → safe retry; stop.
4. Upsert Person by email.
5. If a reliable domain exists, upsert Company by domain.
6. Upsert Deal by submission_id and link known records.
   Any step 4–6 failure → not accepted; Sentry; safe retry.
7. Mark application result accepted.
8. Send confirmation with key project-inquiry-confirmation/{submissionId}.
9. Send internal notification with key project-inquiry-internal/{submissionId}.
   Either step 8–9 failure → accepted; Sentry; operations runbook.
10. Capture project_form_submitted server event.
    Failure → accepted; never rethrow to user.
11. Return accepted state.
~~~

Person or Company may have been written before a Deal failure. Retry is safe because those operations are upserts and the Deal uses a unique key.

## Retry policy

- Transport/network failures: bounded retry with timeout and jitter inside an adapter only where the operation is idempotent.
- Attio: retry upserts with the same matching attributes and submissionId; never switch to create on retry.
- Turnstile: a Siteverify network retry for the same token reuses its `turnstileVerificationId` as `idempotency_key`; a used/expired challenge returns to the browser for a fresh token and a new `turnstileVerificationId`. The business `submissionId` remains unchanged.
- Resend: retry the identical payload with the same idempotency key during its provider window.
- PostHog: best effort; do not delay accepted response for repeated retries.

No unbounded retry loop exists in a server request.

## No distributed transaction

Attio, Resend and PostHog cannot commit atomically without ORVAUXE-owned durable state. This is accepted at launch. Revisit when lead volume, revenue criticality, durable async work, financial transactions or multi-stage automated workflows justify a database and queue review.
