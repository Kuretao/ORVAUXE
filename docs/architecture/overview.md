# Architecture Overview

## System in one view

~~~text
Visitor
  │
  ▼
Next.js web on Vercel
  ├── server-rendered content ───────→ Sanity Content Lake
  ├── project inquiry orchestration ─→ Turnstile
  │                                  → Attio
  │                                  → Resend
  │                                  → PostHog
  └── runtime diagnostics ───────────→ Sentry

Editor → Sanity Studio on a separate Vercel project → Sanity Content Lake
~~~

## Fast ownership matrix

| If the concern is… | Owner |
|---|---|
| URL, layout, metadata or route error | app |
| Editions, Atelier, Studio or inquiry capability | its module |
| Sanity/Attio/Resend/Turnstile/Sentry protocol | infrastructure |
| primitive UI with no ORVAUXE domain meaning | @orvauxe/ui |
| color/type/space/motion primitive | @orvauxe/tokens |
| event name and property types | @orvauxe/analytics |
| CMS document schema | apps/studio |
| typed environment access | config |
| shared metadata/JSON-LD building | seo |

## Package creation rule

> A package is created because a stable architectural boundary or multi-app ownership exists, not merely because some code can be shared.

Proposed new packages require an ADR showing at least two real consumers, a stable contract, an owner and a dependency direction. Until then, code stays near its capability.

## Placement decision tree

~~~text
Framework route contract?                    → app
Website business capability?                 → modules/{domain}
External vendor adapter or secret?           → infrastructure/{vendor}
Reusable presentational primitive?           → @orvauxe/ui
Non-React design primitive?                  → @orvauxe/tokens
Analytics event/adapter?                     → @orvauxe/analytics
Sanity schema/desk structure?                → apps/studio
Relevant to one component only?              → beside the component
Only hypothetically shared?                  → do not move it
~~~

## Runtime defaults

- Server Component unless browser behavior is required.
- Node.js runtime for privileged integrations at launch.
- Server Action for the first-party inquiry form.
- No public REST endpoint until a second caller exists.
- No database, queue or cache service.
- local / preview / production only.

## Architecture invariants

1. packages never import apps.
2. infrastructure never imports modules or UI.
3. UI never imports CMS, CRM or analytics business events.
4. external module consumers use public.ts only.
5. client code cannot import server-only modules.
6. no CMS sections[] page builder.
7. no direct PostHog capture outside @orvauxe/analytics.
8. no process.env outside config/instrumentation/build config.
9. no identifiable lead data in PostHog.
10. no Deal creation without submission_id.

