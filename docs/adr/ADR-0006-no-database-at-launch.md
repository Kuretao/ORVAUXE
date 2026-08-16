# ADR-0006 — No Application Database at Launch

## Status

Accepted.

## Context

Sanity owns content, Attio owns leads, Resend owns email delivery records and PostHog owns behavior. The launch website has no accounts, financial transaction, application-owned relational data or durable workflow.

## Decision

Do not add PostgreSQL, Prisma, Redis, Supabase, Firebase, a queue or another persistence service at launch.

Cross-vendor lead reliability uses ordering, unique submissionId, Attio upsert, Resend/Turnstile idempotency, bounded retries, Sentry and an operations runbook. Atomicity across vendors is explicitly not guaranteed.

## Alternatives considered

- Database inbox/outbox: stronger durability but introduces schema, backup, privacy, migration and operations ownership.
- Queue/serverless job platform: useful for async workflows that do not yet exist.
- Browser/local storage as persistence: not authoritative or operationally reliable.

## Consequences

An accepted Attio Deal can coexist with a failed email or lost analytics event. Operators recover through provider records/runbook. Review this ADR when submission volume, revenue criticality, financial transactions, multi-step automation or persistent event processing require durable application state.

## Date

2026-08-16.

