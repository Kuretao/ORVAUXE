# ADR-0005 — Attio as Lead System of Record

## Status

Accepted.

## Context

ORVAUXE needs lead capture and sales progression but no application-owned customer workflow at launch. Duplicate browser/network submissions and partial vendor failures must not create duplicate projects.

## Decision

Attio is authoritative after submission:

- Person upsert by normalized unique email;
- Company upsert by reliable unique domain only;
- Deal upsert by a custom unique submission_id.

A lead is accepted only when the Deal upsert is confirmed. Multiple intentional submissions create separate Deals. PostHog owns behavior, not lead records or pipeline stages.

## Alternatives considered

- Application database plus CRM sync: adds persistence, migrations and reconciliation without a launch requirement.
- Create-only Deal writes: duplicates on retry.
- Match Deals by email/company: merges distinct projects.
- PostHog as lead store: violates PII and CRM ownership.

## Consequences

Attio custom attributes and uniqueness must be configured before launch. Partial Person/Company writes are safe to retry. Missing/unreliable domains leave Company unresolved rather than creating guesses. Attio outage makes the form retryable, not accepted.

## Date

2026-08-16.

