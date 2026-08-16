# Runbook — Lead Integration Failure

## Purpose

Recover a project inquiry safely without duplicating Deals or misleading the submitter. Attio Deal presence by submission_id is the acceptance authority.

## Inputs available to operators

- timestamp/window;
- submissionId;
- environment/release;
- safe error code and integration;
- Sentry issue/event;
- Vercel logs;
- Attio record search;
- Resend email logs.

Do not copy PII into chat/issues. Access Attio/Resend only through authorized accounts.

## Triage

1. Confirm production/preview and release.
2. Search Attio Deal by submission_id.
3. Determine whether the user saw accepted or retryable state.
4. Check Sentry integration/error code.
5. Check Resend only after acceptance status is known.

## Decision table

### No Deal exists

The inquiry is not confirmed accepted.

- If the user still has a retryable state, restore integration and ask them to retry only through the product’s normal path if contact is possible without inventing a lead.
- If Person/Company exists from a partial attempt, leave it; same submissionId retry safely upserts.
- Do not manually create a Deal unless the original lead content is available in an approved system and an owner authorizes recovery.
- Escalate sustained failures as lead-path degradation.

### Deal exists with matching submission_id

The inquiry is accepted.

- Do not ask the user to resubmit.
- Confirm Person and optional Company links/fields.
- If duplicate Deals exist despite uniqueness policy, stop automation, preserve evidence and merge/remediate under CRM ownership.
- Continue with email check.

### Confirmation or internal email missing

Check Resend by destination/time/idempotency key:

- confirmation key: project-inquiry-confirmation/{submissionId};
- internal key: project-inquiry-internal/{submissionId}.

Within Resend’s idempotency window, retry the identical payload/key through an authorized replay tool or controlled implementation path. Outside the window, verify no email was sent before manual resend; the provider can no longer guarantee deduplication by that key.

Email failure never changes Attio acceptance.

### PostHog event missing

Do not replay from PII or change the lead. Record analytics loss if material. Because no durable event queue exists, individual events may be unrecoverable. Validate current ingestion/config and monitor subsequent accepted submissions.

## Common error actions

| Code | Action |
|---|---|
| VALIDATION_FAILED | no operational action |
| BOT_VERIFICATION_FAILED | check Turnstile status/config if sustained |
| CRM_UNAVAILABLE | check Attio status, token scopes, attributes and rate limits |
| EMAIL_DELIVERY_FAILED | verify Deal, then follow email retry steps |
| ANALYTICS_FAILED | verify PostHog host/token/CSP; never block leads |
| UNKNOWN_APPLICATION_ERROR | inspect release and safe stack context; consider rollback |

## Rollback / feature response

Rollback or disable public submission only when it prevents repeated unsafe behavior or false acceptance. If CRM is unavailable, the form must return retryable_error, not success. Provide an approved alternative contact path without claiming captured data.

Trigger SEV-1 for exposed PII/secret or a fully broken lead path with no safe alternative. Trigger SEV-2 for material degradation with a workaround.

## Resolution checks

- fresh test submission has a new UUID;
- exactly one Attio Deal exists;
- Person and conditional Company behavior is correct;
- confirmation/internal emails have expected IDs;
- PostHog accepted event contains no PII;
- Sentry/logs show no new integration error;
- user-facing state matches acceptance.

## Follow-up

For SEV-1/2, record timeline, impact, root cause, why monitoring did/did not catch it and one owned prevention action. Review the no-database/no-queue decision if failures show that provider idempotency and manual recovery are no longer adequate.

