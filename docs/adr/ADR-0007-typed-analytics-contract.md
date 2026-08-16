# ADR-0007 — Typed Analytics Abstraction

## Status

Accepted.

## Context

Scattered SDK calls allow inconsistent event names, missing properties, duplicates and accidental PII. ORVAUXE already has an approved event dictionary and a clear CRM/analytics split.

## Decision

Create @orvauxe/analytics with a closed AnalyticsEvents TypeScript map and explicit ./events, ./client and ./server entrypoints. Applications call track with a known event and event-specific properties. Direct PostHog SDK calls outside the package are forbidden.

Event names/properties retain the Planning Package snake_case wire contract. PostHog does not receive direct lead PII. Attio remains authoritative for pipeline/business states.

Use stable posthog-js and posthog-node adapters; do not depend on the currently pre-release Next-specific package at v1.0.

## Alternatives considered

- Direct posthog.capture everywhere: fastest initially, weak contract.
- Browser-only analytics: cannot correctly emit accepted server conversion.
- Analytics in the web app only: loses a stable cross-runtime boundary.
- Custom analytics backend: unnecessary infrastructure.

## Consequences

The compiler catches missing/extra properties and client/server imports are auditable. Event changes require contract/docs/dashboard review. The package carries vendor SDK dependencies but shields domains from them.

## Date

2026-08-16.

