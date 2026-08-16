# ORVAUXE Application & Repository Architecture Specification v1.0

Status: Ready for architecture review  
Date: 2026-08-16  
Scope: final architecture before repository skeleton generation

## 1. Purpose and authority

This specification turns the approved Planning Package v1.1 into an implementation-ready repository architecture. It defines ownership, dependency direction, runtime boundaries, integration sequencing, failure behavior, test structure and the exact next-phase skeleton.

It does not redesign the product, build the website, implement production UI, call vendors or create the repository. The future skeleton task must not invent alternative folders, packages, transports or data ownership.

Normative language:

- MUST / MUST NOT: required for v1.0.
- SHOULD / SHOULD NOT: default; an exception needs written reasoning.
- MAY: permitted but not required.

## 2. Product and architectural constraints

ORVAUXE is a focused premium acquisition website for Editions and Atelier services. Launch routes are:

~~~text
/
/editions
/editions/[slug]
/atelier
/studio
/start-a-project
/legal/[slug]
~~~

Work and Journal are deferred until authentic work or an active editorial program exists. There is no application database, authentication, checkout, queue or internal workflow engine at launch.

Approved stack:

| Concern | Decision |
|---|---|
| Workspace | pnpm workspaces |
| Orchestration | Turborepo |
| Web | Next.js, TypeScript, App Router |
| CMS | Sanity |
| Styling | Tailwind CSS plus CSS Custom Properties |
| Motion | CSS for simple transitions; GSAP and ScrollTrigger for signature interactions |
| CRM | Attio |
| Transactional email | Resend |
| Bot protection | Cloudflare Turnstile |
| Product analytics | PostHog |
| Runtime errors | Sentry |
| Deployment | Vercel Pro |
| Tests | Vitest, React Testing Library, Playwright, axe |
| Persistence | No application database at launch |

## 3. Governing principles

1. Server Components are the default. Client JavaScript exists only for browser state, browser APIs and deliberate interaction.
2. Code lives beside the capability that owns it.
3. A package is created because a stable architectural boundary or multi-app ownership exists, not merely because code can be shared.
4. Routes compose; modules own business capabilities; infrastructure adapts vendors.
5. External input and external output are typed and validated at boundaries.
6. Content systems own content, not layout freedom.
7. Attio is the lead system of record; PostHog is not a CRM.
8. Failure behavior is part of the feature contract.
9. No infrastructure is introduced without a present requirement.
10. Architecture evolves through observed triggers and ADRs, not speculation.

## 4. Repository decision

The repository is a private pnpm/Turborepo monorepo:

~~~text
orvauxe/
├── apps/
│   ├── web/
│   └── studio/
├── packages/
│   ├── tokens/
│   ├── ui/
│   ├── analytics/
│   ├── eslint-config/
│   └── typescript-config/
├── docs/
├── .github/
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
├── pnpm-lock.yaml
├── .env.example
├── README.md
└── CONTRIBUTING.md
~~~

No utils, helpers, common, shared, types, api or server package is created. A file remains near its owner until stable cross-application reuse exists.

Package responsibilities:

| Package | Owns | May depend on | Must not own |
|---|---|---|---|
| @orvauxe/tokens | Brand primitives and CSS token contract | Nothing runtime-specific | React, Sanity, CRM, analytics, domains |
| @orvauxe/ui | Application-independent visual primitives | @orvauxe/tokens | page sections, CMS queries, vendor calls, domain workflows |
| @orvauxe/analytics | Typed event catalogue and separate browser/server adapters | PostHog SDKs in isolated entrypoints | CRM state, PII, UI, page orchestration |
| @orvauxe/eslint-config | Shared flat lint policy and boundary rules | ESLint plugins | application behavior |
| @orvauxe/typescript-config | Strict compiler baselines | TypeScript configuration only | runtime code |

An EditionHero is a domain component in apps/web. A Button is a UI primitive. Reuse alone does not erase ownership.

## 5. Web application shape

The conceptual source tree is:

~~~text
apps/web/src/
├── app/
├── modules/
├── infrastructure/
├── seo/
├── config/
├── generated/
├── styles/
├── instrumentation.ts
└── instrumentation-client.ts
~~~

This baseline is accepted. Tests live outside src under apps/web/tests because they exercise the assembled application; unit and component tests may be colocated with their owner.

### 5.1 Routing

The app directory owns route contracts, layouts, parameters, metadata, loading/error/not-found states, composition and framework route files such as robots.ts and sitemap.ts. It must not become the primary home of business logic.

A single route group, app/(site), groups the public website under a shared site layout without changing URL paths. Parentheses are organizational only. Add another route group only when a set of routes needs a genuinely different layout, runtime policy or access boundary.

A page generally:

1. validates route parameters;
2. obtains data through a domain public API;
3. creates route metadata;
4. composes one domain screen;
5. chooses not-found or error behavior.

Illustrative only:

~~~tsx
export default async function EditionPage({ params }: EditionPageProps) {
  const edition = await getEdition((await params).slug)
  if (!edition) notFound()
  return <EditionScreen edition={edition} />
}
~~~

### 5.2 Domain modules

Initial web capabilities are editions, atelier, studio, legal and project-inquiry. Each module owns its domain UI, data/query definitions, models and local application behavior. Folders are created only when they contain a real responsibility.

Each module exposes a narrow public.ts. Cross-boundary consumers import through the module public API. Internal code uses relative imports. Universal barrels are forbidden.

The TypeScript alias and ESLint policy must support:

~~~ts
import { EditionScreen, getEdition } from "@/modules/editions"
~~~

and reject external deep imports into modules/editions/data or modules/editions/ui.

Initial responsibilities:

| Module | Responsibility | Public API | Forbidden ownership |
|---|---|---|---|
| editions | Edition listing/detail content, view model, Edition presentation | query-facing getters, route-ready types, Edition screens | Sanity client creation, generic UI, CRM |
| atelier | Atelier content and page presentation | getter and screen | inquiry workflow, vendor clients |
| studio | Studio content and page presentation | getter and screen | Sanity schema, global navigation policy |
| legal | Legal-page content retrieval, mapping and neutral presentation | getter and screen | separate modules per legal document, legal approval |
| project-inquiry | form model, UI, transport and submit use case | StartProjectForm | vendor credentials, reusable Button |

### 5.3 Closest ownership

- Used only by EditionGallery: keep beside EditionGallery.
- Used across Editions: move to editions/lib only when the folder has a named purpose.
- Used by another domain: first expose a narrow public API.
- Stable and application-independent across apps: consider a package through an ADR.

## 6. Application and infrastructure boundaries

Infrastructure contains external-system adapters:

~~~text
infrastructure/
├── sanity/
├── attio/
├── resend/
├── turnstile/
└── observability/
~~~

Infrastructure knows vendor protocols and credentials. It never imports React UI or domain modules. A domain action/composition file may combine a use-case port with infrastructure functions; this keeps infrastructure pointing inward to nothing.

The three lead-flow layers are:

| Layer | Owns |
|---|---|
| Transport / Server Action | FormData parsing, Zod result mapping, Turnstile gate, safe response |
| Application use case | accepted workflow order, partial-failure policy, orchestration |
| Infrastructure adapter | vendor request/response, timeout, authentication, vendor error mapping |

The Server Action is a public mutation boundary, not a trusted internal call. It remains short and delegates the workflow.

## 7. Server-first and server safety

Server Components own CMS reads, page content, navigation, footer, SEO, Edition/Atelier/Studio rendering and page composition. Client Components are small islands for menu state, form state, Turnstile, carousel behavior, browser analytics and GSAP.

The use client directive creates a client module graph: imported descendants can enter the browser bundle. Therefore:

- do not mark a whole page or screen client because one child animates;
- pass serializable props from server to client;
- keep GSAP registration inside client-only motion files;
- import server-only in every module that reads a secret or uses privileged integrations;
- never re-export server and client code from the same barrel.

Sensitive modules include Attio, Resend, Sanity preview tokens, Turnstile verification, server PostHog and Sentry build credentials. NEXT_PUBLIC_ is reserved for intentionally browser-safe configuration.

## 8. CMS architecture

Sanity is constrained structured content, not a page builder.

Code owns art direction, page structure, responsive logic, component composition and interaction. Sanity owns copy, imagery, Edition information, pricing copy, SEO content and editorial ordering inside explicitly modelled fields.

Launch documents:

- Singletons: siteSettings, homePage, atelierPage, studioPage.
- Collections: edition, legalPage.
- Objects: seo, cta, imageWithAlt.

There is no generic page with sections[], and no launch schema for Work, Journal, case studies, testimonials or FAQ.

This deliberately narrows the preliminary CMS list in Planning Package v1.1. That list was a planning exploration; the architecture phase applies the newer no-page-builder and no-empty-content constraints without changing product strategy.

Schema files are owned by apps/studio. GROQ queries are owned by the consuming web domain. The Sanity client and preview adapter live in web infrastructure.

Sanity TypeGen is mandatory:

~~~text
Studio schemas
→ sanity schema extract
→ schema.json
→ sanity typegen generate over named defineQuery queries
→ apps/web/src/generated/sanity.types.ts
~~~

The generated file is committed, carries a DO NOT EDIT MANUALLY warning and is checked for drift in CI. Frontend developers do not hand-copy CMS interfaces.

## 9. Project inquiry architecture

The launch transport is a Server Action because the website is the only caller. The application use case is transport-independent so a future route handler can reuse it if an actual external caller appears.

Canonical flow:

~~~text
StartProjectForm
→ submit-project-inquiry.action
→ Zod validation
→ Turnstile Siteverify
→ submitProjectInquiry
→ Attio Person upsert
→ conditional Company upsert
→ Attio Deal upsert by submission_id
→ Resend confirmation and internal notification
→ PostHog accepted event
~~~

Every logical form attempt receives a browser-generated UUID `submissionId`, validated by the server and retained across double-click, network retry, Turnstile refresh, Attio retry and email retry. A new intentional inquiry receives a new UUID. It is a business correlation/idempotency identifier, not authentication.

Every Turnstile token receives a separate browser-generated UUID `turnstileVerificationId`. A Siteverify network retry for the same token reuses that verification ID. A refreshed challenge produces a new token and a new verification ID while the business `submissionId` remains unchanged. A Siteverify idempotency key must never be reused for a different token.

Attio rules:

- Person matches normalized email; do not strip plus aliases or apply provider-specific rewriting.
- Company matches a reliable normalized website domain.
- If there is no reliable business domain, do not create a guess-based Company. Preserve the submitted company name on the Deal for human resolution.
- Deal has a custom unique submission_id attribute and is upserted on it.
- One Person or Company may have many Deals; multiple intentional submissions remain distinct.

Order matters: the lead is accepted only after the Deal is safely upserted. Email and analytics follow acceptance.

### 9.1 Idempotency

- The action disables repeat submit while pending but the server never relies on UI state.
- Turnstile validation receives `turnstileVerificationId` as `idempotency_key`. Tokens remain single-use and expire; a failed/expired challenge must refresh both the token and its verification ID without changing `submissionId`.
- Attio Deal upsert uses submission_id.
- Resend keys are project-inquiry-confirmation/{submissionId} and project-inquiry-internal/{submissionId}; provider deduplication is limited to its documented retention window.
- Sentry and structured logs tag submissionId.
- PostHog may receive the opaque submission_id on the accepted server event; it receives no email, phone, name or message.

There is no distributed transaction across Attio, Resend and PostHog. Reliability comes from ordering, idempotency, safe retries and observability.

### 9.2 Failure contract

| Failure | Integrations already called | Accepted? | User behavior | Observability |
|---|---|---:|---|---|
| Validation | None | No | field feedback | no Sentry unless unexpected |
| Turnstile rejection/expiry | Turnstile only | No | refresh and retry | aggregate abuse/availability signals |
| Attio failure before Deal confirmation | Turnstile, possibly partial Person/Company upsert | No | recoverable retry | Sentry error with submissionId |
| Resend after Deal success | Attio | Yes | show success; do not claim email delivery | Sentry; runbook retry |
| PostHog failure | Attio, optional Resend | Yes | no impact | low-severity/sampled diagnostic |
| Sentry failure | any | unchanged | no impact | platform logs remain fallback |
| Unknown failure before Deal confirmation | unknown | No | safe recoverable error | best-effort Sentry |

## 10. Analytics contract

@orvauxe/analytics owns a closed TypeScript event map. Application code calls track(event, properties); random posthog.capture calls are forbidden outside the adapter.

Separate exports are mandatory:

~~~text
@orvauxe/analytics/events
@orvauxe/analytics/client
@orvauxe/analytics/server
~~~

The root package entry must not re-export client and server implementations. The server entry imports server-only. Stable browser and Node SDKs remain isolated behind ORVAUXE’s contract. Browser initialization explicitly disables interaction/form autocapture, automatic page views/page leave, session recording, heatmaps, dead-click, exception and performance capture, together with remote feature/configuration surfaces that could re-enable collection; no vendor default may collect events outside the typed contract.

Browser/product events remain those approved in Planning Package v1.1:

- page_viewed
- edition_viewed
- edition_demo_opened
- atelier_viewed
- start_project_clicked
- project_form_started
- project_form_submitted
- contact_link_clicked

Discovery call, proposal and won/lost are Attio states. They are not fabricated browser events.

Event properties use snake_case to preserve the existing dictionary. Every event contains event_version and environment. No direct PII or full free text enters PostHog or Sentry.

## 11. Error and observability model

Application errors are typed into:

- ValidationError
- BotVerificationError
- CRMIntegrationError
- EmailDeliveryError
- CMSReadError
- AnalyticsError
- UnknownApplicationError

Errors carry a stable code, safe message, retryability and severity. Vendor response bodies, credentials and internal stack details never reach the user.

Ownership:

- PostHog: behavior and acquisition funnel.
- Sentry: runtime exceptions, server errors, integration failures, source maps and restrained traces.
- Vercel: deployment/runtime infrastructure and logs.

instrumentation.ts owns server registration and request-error capture. instrumentation-client.ts owns lightweight browser initialization for Sentry and analytics. sendDefaultPii stays false; request/form payloads are scrubbed; trace and replay sampling begin low or disabled until a concrete diagnostic need exists.

## 12. Configuration and environments

Only local, preview and production are defined. Staging requires a future persistent rehearsal need.

src/config owns typed configuration:

- env.server.ts parses privileged configuration and imports server-only.
- env.client.ts parses only NEXT_PUBLIC_ values.
- site.ts owns stable non-secret site constants.

Attio Deal defaults are server-only typed configuration: `ATTIO_DEFAULT_DEAL_OWNER` and `ATTIO_DEFAULT_DEAL_STAGE`. They are required for the production project-inquiry adapter and must never be hardcoded in source.

Random process.env access and non-null assertions are forbidden outside config. Required configuration fails early with actionable variable names.

The complete inventory is in docs/engineering/environment-strategy.md. Vercel variables are scoped by environment and changes take effect only on new deployments. Turbo build hashes include relevant build-time environment variables.

## 13. SEO, design and motion ownership

Routes own page-specific metadata. src/seo contains only shared typed metadata and JSON-LD builders. robots.ts and sitemap.ts remain App Router files. Schema markup must match visible content and Planning Package v1.1.

@orvauxe/tokens owns reusable color, typography, spacing, grid, breakpoints, motion and z-index values. apps/web/src/styles owns reset, global application behavior, font integration and Tailwind entry CSS. Tailwind consumes semantic ORVAUXE tokens; arbitrary utilities must not replace named design decisions.

CSS handles simple transition states. GSAP/ScrollTrigger belongs in the smallest client island for a signature interaction. Every timeline has cleanup, reduced-motion behavior, responsive conditions and measured mobile cost. No global animation engine or scroll-jacking.

## 14. Testing and CI

Testing follows risk:

- Vitest: validation, mapping, analytics types/helpers, SEO builders and application workflow.
- React Testing Library: form, menu and interactive islands.
- Playwright: routes, navigation, inquiry success/failure, 404 and responsive behavior.
- axe through @axe-core/playwright: automated accessibility checks plus manual keyboard and screen-reader review.
- Playwright screenshots: approved art-directed baselines.

Vitest test projects or per-package configs are used; the deprecated workspace configuration is not introduced.

Merge-blocking from repository creation: install, lint, typecheck, generated-file drift, unit/component tests and build. E2E and axe become blocking as soon as deterministic skeleton fixtures exist. Visual tests become blocking only after design approves baselines; baseline updates require explicit visual approval.

## 15. Security and performance

Security targets real launch risks:

- validate all public mutations;
- verify Turnstile server-side;
- same-origin Server Actions, restrictive body/field limits;
- server-only secrets and least-privilege vendor keys;
- CSP and secure headers compatible with required vendors;
- secret scanning and dependency review;
- verified webhook signatures if webhooks are later added;
- no PII in analytics or default error telemetry.

Performance is protected by Server Components, responsive Sanity images, local optimized fonts, reserved media dimensions, restrained client islands, measured third-party scripts and explicit Turbo inputs. Core Web Vitals and budgets from Planning Package v1.1 remain the launch standard.

## 16. Architecture decision matrix

| Concern | Owner | Location | Reason | Must not own |
|---|---|---|---|---|
| Routing | Next app | apps/web/src/app | framework contract | domain workflows |
| Commerce page capability | domain | apps/web/src/modules | closest business owner | vendor client setup |
| Vendor APIs | infrastructure | apps/web/src/infrastructure | isolate protocols/secrets | React UI |
| Content schema | Studio | apps/studio/src/schema-types | editorial source | web layout |
| CRM records | Attio | external + adapter | lead source of truth | behavior analytics |
| UI primitives | UI package | packages/ui | stable visual reuse | Edition logic |
| Brand primitives | tokens package | packages/tokens | non-React contract | Tailwind page composition |
| Analytics contract | analytics package | packages/analytics | compile-time event control | PII/CRM stages |
| Runtime errors | observability | Sentry adapter | actionable failures | business funnel truth |
| Typed app config | web config | apps/web/src/config | centralized environment boundary | miscellaneous helpers |

## 17. Where does this code go?

~~~text
Is it a route/layout/metadata/error contract?
→ apps/web/src/app

Is it an ORVAUXE web business capability?
→ apps/web/src/modules/{owner}

Is it an external vendor protocol or privileged client?
→ apps/web/src/infrastructure/{vendor}

Is it an application-independent visual primitive?
→ packages/ui

Is it a brand/design primitive with no React dependency?
→ packages/tokens

Is it an analytics event or tracking adapter?
→ packages/analytics through its explicit entrypoint

Is it a Sanity schema or Studio structure?
→ apps/studio

Is it used by one component?
→ beside that component

Is it only potentially reusable?
→ keep it with its current owner
~~~

## 18. Non-goals and review triggers

v1.0 is not a universal commerce platform, design-system product, microservice estate, custom CMS, CRM, email service, analytics backend or workflow engine.

Review architecture when evidence appears:

- database: durable application-owned workflows or authenticated records;
- queue: reliable asynchronous jobs or multi-step processing become business-critical;
- package: multiple applications repeatedly reuse the same stable domain contract;
- localization: a second locale is scheduled;
- Work: authentic case studies exist;
- Journal: a funded editorial cadence exists;
- auth: customer or internal authenticated functionality is approved;
- lead reliability: volume or revenue impact makes cross-vendor eventual handling inadequate.

## 19. Quality assessment

| Question | Answer |
|---|---|
| Discoverability | Yes; placement guide and exact repository map are defined. |
| Ownership | Yes; each app, package, module and vendor adapter has one purpose. |
| Dependency direction | Yes; allowed and forbidden edges are explicit and lintable. |
| Server safety | Yes; separate entrypoints, server-only markers and config boundaries prevent client secret imports. |
| CMS constraint | Yes; explicit documents replace a generic page builder. |
| CRM idempotency | Yes; Deal submission_id is unique and retries upsert. |
| Analytics control | Yes; a closed typed event map prevents random event invention. |
| Partial failure | Yes; acceptance and retry semantics are specified per integration. |
| Testing | Yes; critical behavior and visual quality have proportional layers. |
| Documentation | Yes; ADRs, supporting contracts and SKELETON_READY are included. |
| Complexity | Yes; no database, queue, public API, auth or speculative packages are introduced. |

## 20. Architecture changes from Planning Package v1.1

1. pnpm plus Turborepo moves from proposed direction to accepted architecture.
2. The package name design-tokens becomes @orvauxe/tokens; the proposed generic config package is not created.
3. Web organization is fixed as app/modules/infrastructure/seo/config/generated/styles rather than an unresolved features/entities/widgets direction.
4. The preliminary broad CMS/page-module list is narrowed to explicit launch documents and three reusable objects; generic page building and empty future content types are removed.
5. Sanity TypeGen, generated-file ownership and query colocation are made mandatory.
6. Sentry is added as the explicit runtime-error owner.
7. Lead idempotency, failure ordering, conditional Company behavior and no-distributed-transaction acceptance are defined.
8. Analytics becomes a closed typed package with separate client/server entrypoints.
9. Vitest projects/per-package configuration replaces the now-deprecated workspace configuration concept.
10. Current Next.js instrumentation-client.ts is used as the browser instrumentation convention.

## 21. Final status

Architecture status: READY.

Blocking architectural decisions: none.

Operational values such as domains, vendor project IDs, credentials and final content are required during implementation but do not block repository generation.

SKELETON_READY.md is normative for the next task and is sufficient to generate the repository without new architectural decisions.

> **Next Phase: ORVAUXE Repository Skeleton v1.0**
