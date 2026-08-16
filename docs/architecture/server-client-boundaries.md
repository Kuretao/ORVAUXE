# Server and Client Boundaries

## Default

Layouts, pages and components are Server Components unless they require state, event handlers, effects, browser-only APIs or a browser SDK. There is no use server directive for Server Components; use server marks Server Functions.

## Server-owned examples

- route layouts and pages;
- site header/footer markup and navigation data;
- Sanity queries and mapping;
- Edition, Atelier and Studio primary content;
- metadata and JSON-LD;
- project-inquiry application workflow;
- Attio, Resend and Turnstile calls;
- server PostHog capture;
- Sentry server reporting.

## Client-island examples

- MenuButton and interactive menu state;
- EditionGallery controls;
- DemoLauncher;
- StartProjectForm state;
- TurnstileWidget;
- a GSAP motion wrapper;
- browser event capture.

The static content surrounding an island stays server-rendered. For example, EditionScreen remains server-side and passes serializable media items to EditionGallery.client.tsx.

## Server-only enforcement

Files ending in .server.ts that access credentials or privileged vendors must:

1. import server-only first;
2. receive parsed values from config/env.server;
3. avoid re-export through a mixed barrel;
4. be blocked by lint patterns from client-marked files;
5. never accept a React component as an architectural dependency.

Sensitive values:

- ATTIO_API_KEY
- RESEND_API_KEY
- SANITY_API_TOKEN
- SANITY_PREVIEW_SECRET
- TURNSTILE_SECRET_KEY
- SENTRY_AUTH_TOKEN

SENTRY_AUTH_TOKEN is build/CI only and must not be available at runtime.

## Client configuration

Only deliberately public values carry NEXT_PUBLIC_:

- Turnstile site key;
- PostHog project token/host;
- Sentry DSN;
- public Sanity project ID/dataset if required by presentation tooling.

Public does not mean uncontrolled. env.client.ts parses and exports an explicit allowlist.

## Instrumentation

instrumentation.ts is the server entry for Sentry registration and request-error capture. It must not initialize browser analytics.

instrumentation-client.ts is the single lightweight browser initialization point. It initializes Sentry browser behavior and the @orvauxe/analytics/client adapter. It does not capture application business events itself.

## Motion

GSAP/ScrollTrigger imports remain in client files. A motion component:

- registers plugins once in the client;
- scopes selectors to its root;
- cleans up timelines and ScrollTriggers on unmount;
- uses gsap.matchMedia or equivalent for responsive/reduced-motion conditions;
- presents complete readable content without animation;
- avoids hydrating the parent screen.

## Boundary review questions

- Could this render without browser state? Keep it server-side.
- Is a secret or privileged SDK reachable from the import graph? Mark and isolate it.
- Are props serializable and minimal?
- Did a client directive pull a large subtree into the browser?
- Does the user retain the same information with JavaScript or motion unavailable?

