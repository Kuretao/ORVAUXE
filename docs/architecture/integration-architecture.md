# Integration Architecture

## Shared adapter policy

Every vendor adapter:

- is server-only unless explicitly browser-facing;
- receives parsed configuration;
- applies a bounded timeout;
- validates or narrows external responses;
- maps vendor errors into stable internal information;
- exposes the smallest operation required by a use case;
- avoids logging credentials, payload PII or full response bodies;
- is testable with controlled fetch/SDK doubles.

No generic API/client package is created.

## Sanity

Owner: infrastructure/sanity for clients; domain modules for queries.

Published reads use a read client without a token when dataset policy permits. Draft reads use SANITY_API_TOKEN server-side. API version is a fixed code constant, not today’s date at runtime. Cache tags use stable domain names.

Sanity failures map to CMSReadError. Missing content is not automatically an exception: the domain getter returns null when absence is a valid route outcome.

## Attio

Owner: infrastructure/attio.

Required operations:

- upsert Person by unique email;
- upsert Company by unique domain when reliable;
- upsert Deal by custom unique submission_id.

The Attio token uses only required record/object permissions. Attribute slugs/IDs are centralized in the adapter config, not repeated in action code. New project-inquiry Deals receive their owner and initial stage from the server-only `ATTIO_DEFAULT_DEAL_OWNER` and `ATTIO_DEFAULT_DEAL_STAGE` configuration. No workspace owner or stage is hardcoded in source. Rate-limit and retry behavior respects provider responses. Upserts are the only automatic retryable writes; the adapter never changes an upsert to create.

No Attio webhook is required at launch. If later added, verify the provider signature on the raw body before parsing and add a route-specific ADR/contract.

## Resend

Owner: infrastructure/resend.

Required operations:

- send inquiry confirmation to the submitter;
- send internal lead notification.

Templates live with the integration or a narrowly owned email presentation area, not inside the Server Action. Every send has a deterministic idempotency key. Resend’s documented idempotency retention is finite; the operations runbook governs late manual retries.

Email failure after Attio acceptance maps to EmailDeliveryError, reports to Sentry and does not make the user retry the whole lead.

## Turnstile

Owner: infrastructure/turnstile; widget island in project-inquiry UI.

The browser uses NEXT_PUBLIC_TURNSTILE_SITE_KEY. Only the server uses TURNSTILE_SECRET_KEY and calls Siteverify. The adapter sends the response token, expected action/hostname when configured, and `turnstileVerificationId` as `idempotency_key`.

`submissionId` identifies the logical ORVAUXE inquiry and survives Turnstile refreshes. `turnstileVerificationId` identifies one Siteverify operation for one specific token. A network retry for the same token reuses its verification ID; a new token always receives a new verification ID. An idempotency key is never reused for a different Turnstile token.

Tokens expire and are single-use. timeout-or-duplicate produces a safe retry state with widget reset. Automated tests use Cloudflare’s published test keys.

Turnstile complements validation and platform abuse controls; it is not authorization.

## PostHog

Owner: @orvauxe/analytics.

The browser entry depends on posthog-js. The server entry depends on posthog-node and server-only. Application code never imports either SDK directly.

Browser initialization explicitly disables interaction/form autocapture, page views/page leave, session recording, heatmaps, dead-click capture, exception capture and performance capture. Feature-flag requests, surveys, web experiments, conversations, product tours and external dependency loading are also disabled so remote configuration cannot expand collection beyond the typed ORVAUXE event contract. Campaign/referrer persistence is disabled, and a final event/property allowlist strips full URLs, query strings and unapproved implicit properties before transport. These capabilities remain off unless a future architecture and privacy change approves them. Serverless capture flushes deliberately after accepted events. Analytics failure never changes business behavior.

## Sentry

Owner: infrastructure/observability plus Next.js instrumentation files.

Initial scope:

- uncaught browser/server exceptions;
- App Router request/render/action errors;
- integration errors with safe tags;
- source maps uploaded at build;
- restrained trace sampling.

sendDefaultPii is false. Free-text inquiry data, email and phone are removed in beforeSend or never placed on the event. Session Replay is off initially. SENTRY_AUTH_TOKEN is available only to the build that uploads source maps.

## Vercel

Owner: platform/deployment.

Two Vercel projects point to the same repository:

- web root: apps/web;
- Studio root: apps/studio.

Both use pnpm and Turbo-aware builds. The Git integration produces Preview deployments; production follows protected main. Environment variables are project- and environment-scoped. Native Vercel rollback and logs are the first operational tools.

## Timeouts and retries

Exact durations are implementation constants and measured later, but the contract is:

- every external request has a timeout shorter than the overall Server Action budget;
- retries are bounded and only for known transient/idempotent operations;
- validation/provider 4xx errors are not blindly retried;
- retry count/latency is observable without PII;
- the user is not left pending indefinitely.
