# Data Flow

## Content read

~~~text
Route page
→ domain public getter
→ domain-owned named GROQ query
→ infrastructure/sanity client
→ Sanity Content Lake
→ generated query-result type
→ domain mapping/normalization
→ Server Component screen
→ HTML/RSC response
~~~

The query belongs to the consumer because it describes the shape that capability needs. The client belongs to infrastructure because it knows project, dataset, API version, preview token and request policy.

Published reads use the least-privileged client and cache policy appropriate to content freshness. Draft/preview reads require a server-only token and explicit draft-mode context. A browser never receives SANITY_API_TOKEN.

## Route and metadata flow

Each route obtains one domain model and passes a small metadata input to a shared builder. Route metadata remains close to the route because canonical URL, title intent and indexability are route contracts. Shared code only normalizes the repeated parts.

~~~text
params
→ domain getter
→ route validates existence
→ generateMetadata / metadata builder
→ screen composition
~~~

The sitemap pulls indexable canonical Edition and Legal slugs through their module public APIs. It does not duplicate GROQ in app/sitemap.ts.

## Project inquiry write

~~~text
Browser form state
→ FormData + submissionId + Turnstile token + turnstileVerificationId
→ Server Action
→ validation/security gate
→ normalized ProjectInquiry
→ application use case
→ Attio accepted record
→ non-transactional notification/analytics side effects
→ safe action state
~~~

Only Attio contains identifiable lead truth after acceptance. Resend receives the fields required to address and render the two transactional messages. PostHog receives allowed categorical dimensions and an opaque correlation ID. Sentry receives error context, never the message body.

## Analytics

~~~text
Domain/client island
→ typed @orvauxe/analytics/client.track
→ event enrichment
→ PostHog browser SDK

Accepted server use case
→ typed @orvauxe/analytics/server.track
→ immediate server flush
→ PostHog ingest
~~~

Event enrichment owns event_version and environment. Callers provide event-specific properties. The type system rejects unknown event names and missing/extra properties.

## Observability

Expected validation failures return typed results. Unexpected errors and integration failures are reported to Sentry with:

- stable error code;
- environment/release;
- route or integration name;
- retryability/severity;
- submissionId when relevant;
- no raw FormData, PII or vendor credential.

Vercel logs are the operational fallback. Logs use the same correlation ID and safe error code.

## Cache and freshness

Caching belongs to each content getter because freshness depends on the domain. Initial policy:

- published site settings/pages/Editions: cached with explicit tags;
- draft mode: uncached;
- project inquiry and all integrations: never cached;
- metadata may reuse the same cached domain getter;
- revalidation uses named Sanity-related tags, not global cache clearing.

Do not invent a Redis cache. Next.js/Vercel and Sanity delivery are sufficient until measurements prove otherwise.
