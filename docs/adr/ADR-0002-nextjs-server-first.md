# ADR-0002 — Next.js Server-First Architecture

## Status

Accepted.

## Context

ORVAUXE needs crawlable editorial content, CMS reads, route metadata, optimized media and privileged form integrations while keeping a premium visual experience fast. React/Next.js currently make layouts/pages Server Components by default and define use client as the browser module boundary.

## Decision

Use Next.js App Router with Server Components as the default. Client Components are small islands for browser state/APIs: menu, form, Turnstile, carousel, GSAP and browser analytics.

Privileged code is marked with server-only and isolated in .server.ts modules. instrumentation.ts owns server observability; instrumentation-client.ts owns lightweight browser initialization. Server Actions are treated as public mutation endpoints.

## Alternatives considered

- Client-rendered React SPA: adds hydration/fetch waterfalls and weakens default metadata/content delivery.
- Marking page sections client for animation: simpler locally but expands bundle and secret-import risk.
- Separate public API for the inquiry form: no second caller exists.

## Consequences

Primary content is available without feature JavaScript and vendor credentials stay server-side. Engineers must understand serializable props and import graphs. Interactive elements need deliberate islands; GSAP cannot be imported into Server Components.

## Date

2026-08-16.

