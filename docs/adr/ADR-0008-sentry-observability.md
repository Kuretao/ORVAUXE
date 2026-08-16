# ADR-0008 — Sentry for Application Observability

## Status

Accepted.

## Context

Vercel logs show runtime output but do not provide the error grouping, releases, source maps and cross-runtime context needed for browser/server/integration failures. PostHog is behavior analytics and must not become error monitoring.

## Decision

Use @sentry/nextjs for browser and Node.js application errors, integration failures, release/source-map mapping and restrained performance traces.

Next.js instrumentation files initialize Sentry at the correct boundaries. sendDefaultPii remains false; inquiry fields and vendor payloads are scrubbed. submissionId may be a safe correlation tag. Session Replay is disabled initially and trace sampling starts low.

SENTRY_AUTH_TOKEN exists only in build/CI for source-map upload.

## Alternatives considered

- Vercel logs only: insufficient grouping and browser visibility.
- PostHog error tracking: conflates product analytics and operational errors.
- Multiple observability vendors: unnecessary cost/complexity.
- Full high-volume tracing/replay: disproportionate at launch and increases privacy/noise risk.

## Consequences

Runtime/integration errors become actionable across releases. Sentry setup adds browser/server SDK cost and requires quota/privacy configuration. Sentry failure never changes application behavior; Vercel logs remain fallback.

## Date

2026-08-16.

