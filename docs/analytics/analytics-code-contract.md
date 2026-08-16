# Analytics Code Contract

## Ownership

@orvauxe/analytics is the only application-facing analytics API. It owns:

- approved event names;
- required/optional property types;
- common property enrichment;
- PostHog browser adapter;
- PostHog server adapter;
- privacy-safe value normalization;
- unit/type tests.

Direct posthog.capture imports are allowed only inside this package.

The browser adapter explicitly disables PostHog automatic collection: `autocapture`, `capture_pageview`, `capture_pageleave`, `capture_exceptions`, and `capture_performance` are false, and session recording is disabled. Interaction/form autocapture, automatic navigation events, replay, heatmaps, dead-click capture, feature-flag requests, surveys, web experiments, conversations, product tours and external dependency loading are outside the v1 contract. Vendor defaults and remote configuration must not expand collection.

Campaign/referrer persistence is disabled. A final `before_send` allowlist drops vendor-generated events, full current/referrer URLs, campaign parameters, person updates and any property outside the typed event plus the minimal PostHog transport envelope; `page_path` is reduced to its pathname. This repository contract supersedes the earlier Planning dictionary where fields differ: the accepted `project_form_submitted` event requires opaque `submission_id` and permits only the fixed `budget_range` values declared below.

## Entry points

~~~text
@orvauxe/analytics/events
  runtime-neutral types and event catalogue

@orvauxe/analytics/client
  browser-safe initialization and track

@orvauxe/analytics/server
  server-only initialization, track and flush
~~~

The package root does not re-export client/server. The server entry imports server-only. The client entry never imports Node code.

## Conceptual type map

Property names preserve Planning Package v1.1 snake_case wire contracts.

~~~ts
type CommonProperties = {
  event_version: 1
  environment: "local" | "preview" | "production"
}

type AnalyticsEvents = {
  page_viewed: {
    page_path: string
    page_type: "home" | "editions" | "edition" | "atelier" | "studio" | "project_inquiry" | "legal" | "not_found"
    locale: string
    referrer_type?: string
  }
  edition_viewed: {
    edition_slug: string
    edition_category: string
    edition_number?: number
  }
  edition_demo_opened: {
    edition_slug: string
    demo_id: string
    cta_location: string
  }
  atelier_viewed: {
    page_path: string
  }
  start_project_clicked: {
    cta_id: string
    cta_location: string
    edition_slug?: string
  }
  project_form_started: {
    form_version: string
    entry_context: string
  }
  project_form_submitted: {
    form_version: string
    service_interest: "edition" | "atelier"
    edition_slug?: string
    budget_range?: "under_10k" | "10k_25k" | "25k_50k" | "50k_plus" | "undecided"
    submission_id: string
  }
  contact_link_clicked: {
    contact_method: "email" | "instagram" | "linkedin" | "other"
    cta_location: string
  }
}

declare function track<E extends keyof AnalyticsEvents>(
  event: E,
  properties: AnalyticsEvents[E]
): void | Promise<void>
~~~

Common properties are added by the adapter, so callers cannot spoof environment or omit version.

## Trigger rules

| Event | Exact trigger | Runtime |
|---|---|---|
| page_viewed | one meaningful route view after privacy/config decision | client |
| edition_viewed | Edition detail route becomes primary view | client; once per route view |
| edition_demo_opened | user explicitly opens a demo | client |
| atelier_viewed | Atelier route becomes primary view | client |
| start_project_clicked | explicit Start a Project CTA activation | client |
| project_form_started | first meaningful input interaction; once per form attempt | client |
| project_form_submitted | server has confirmed Attio Deal upsert | server |
| contact_link_clicked | explicit alternative contact link activation | client |

Do not emit project_form_submitted on button click, validation success or Turnstile success.

## CRM boundary

Attio owns:

- discovery_call_booked;
- proposal_sent;
- deal_won/lost;
- qualification and pipeline stage;
- identifiable lead fields and notes.

These are CRM state transitions, not default PostHog events. A future approved warehouse/webhook design may mirror privacy-reviewed aggregate outcomes, but v1.0 does not.

## PII policy

Forbidden by default:

- email, phone, name;
- company/person record IDs;
- full inquiry message or business notes;
- query strings that may contain user data;
- raw referrer URL;
- free-form company name.

Allowed controlled dimensions:

- service_interest;
- edition_slug/category/number;
- budget_range from a fixed list;
- page/path without sensitive query;
- CTA/form version;
- locale/environment;
- device/source dimensions supplied under the privacy policy;
- opaque submission_id for accepted-flow correlation.

submission_id must never be used as PostHog distinct_id. ORVAUXE has no authenticated user identity at launch and does not call identify by default.

## Versioning

- Adding an optional property without changing meaning may retain event_version.
- Adding a required property, changing meaning/trigger or changing a controlled enum increments event_version or introduces a new event.
- Removing/renaming an event requires a migration period and dashboard audit.
- Dashboards never silently redefine code meaning.

The TypeScript map, tracking plan documentation and PostHog schema/dashboard changes ship together.

## Failure and duplication

Browser calls are best effort. Route instrumentation must avoid duplicate captures caused by React rendering/effects. Server accepted capture is awaited only long enough for the configured server SDK flush; failure is swallowed after safe reporting.

Analytics never blocks rendering, navigation or inquiry acceptance.

## Review checklist

- Event exists in the map and dictionary.
- Trigger is a user/business fact, not a rendering detail.
- Properties are controlled and necessary.
- No PII/free text.
- Client/server entrypoint is correct.
- Duplicate behavior is tested.
- Funnel/dashboard consumer is documented.
