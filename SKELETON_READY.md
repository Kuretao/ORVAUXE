# SKELETON_READY — ORVAUXE Repository Skeleton v1.0

Status: READY FOR ARCHITECTURE REVIEW  
Authority: ORVAUXE Application & Repository Architecture Specification v1.0  
Purpose: exact input for the next Codex task

Approved amendments incorporated for repository generation:

- A1: `submissionId` remains the logical inquiry identity; a separate `turnstileVerificationId` is the Siteverify `idempotency_key` for one token.
- A2: `/legal/[slug]` and the `legal` web module are launch capabilities.
- A3: Attio Deal owner and stage come from `ATTIO_DEFAULT_DEAL_OWNER` and `ATTIO_DEFAULT_DEAL_STAGE`.
- A4: PostHog automatic collection and session recording are explicitly disabled; typed ORVAUXE events are the only business-event path.

For A1, `submissionId` remains unchanged across double-clicks, network retries, Turnstile refresh, Attio retry and email retry. Each Turnstile token receives one `turnstileVerificationId`: Siteverify network retries for that same token reuse the ID, while a fresh/reset token receives a new ID. Tests must prove both transitions and the unchanged business ID.

The next task must generate this skeleton and no alternative architecture. It may select current stable dependency versions compatible with Vercel at generation time, then pin them in package.json and pnpm-lock.yaml. Version selection is an implementation compatibility check, not permission to change boundaries.

## 1. Legend

- [I] Initial implementation: must contain real, minimal, compiling configuration/foundation code.
- [P] Placeholder: must compile and clearly state the later feature owner; no production design or vendor call.
- [G] Generated: created by the documented generator and committed; never edited manually.
- [D] Documentation: copied from approved architecture/planning sources.

Folders exist only because a listed file needs them. Do not create empty folders or .gitkeep files.

## 2. Exact repository tree

~~~text
orvauxe/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                                      [I]
│   ├── dependabot.yml                                  [I]
│   └── pull_request_template.md                        [I]
│
├── apps/
│   ├── web/
│   │   ├── package.json                                [I]
│   │   ├── next.config.ts                              [I]
│   │   ├── postcss.config.mjs                          [I]
│   │   ├── eslint.config.mjs                           [I]
│   │   ├── tsconfig.json                               [I]
│   │   ├── vitest.config.ts                            [I]
│   │   ├── vitest.setup.ts                             [I]
│   │   ├── playwright.config.ts                        [I]
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (site)/
│   │   │   │   │   ├── editions/
│   │   │   │   │   │   ├── [slug]/
│   │   │   │   │   │   │   └── page.tsx              [P]
│   │   │   │   │   │   └── page.tsx                  [P]
│   │   │   │   │   ├── atelier/
│   │   │   │   │   │   └── page.tsx                  [P]
│   │   │   │   │   ├── studio/
│   │   │   │   │   │   └── page.tsx                  [P]
│   │   │   │   │   ├── start-a-project/
│   │   │   │   │   │   └── page.tsx                  [P]
│   │   │   │   │   ├── legal/
│   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │       └── page.tsx              [P]
│   │   │   │   │   ├── error.tsx                     [I]
│   │   │   │   │   ├── layout.tsx                    [I]
│   │   │   │   │   └── page.tsx                      [P]
│   │   │   │   ├── api/
│   │   │   │   │   └── draft-mode/
│   │   │   │   │       ├── enable/
│   │   │   │   │       │   └── route.ts              [I]
│   │   │   │   │       └── disable/
│   │   │   │   │           └── route.ts              [I]
│   │   │   │   ├── global-error.tsx                  [I]
│   │   │   │   ├── layout.tsx                        [I]
│   │   │   │   ├── not-found.tsx                     [P]
│   │   │   │   ├── robots.ts                         [I]
│   │   │   │   └── sitemap.ts                        [I]
│   │   │   │
│   │   │   ├── modules/
│   │   │   │   ├── editions/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── edition.query.ts         [I]
│   │   │   │   │   │   ├── editions.query.ts        [I]
│   │   │   │   │   │   ├── get-edition.ts           [P]
│   │   │   │   │   │   └── get-editions.ts          [P]
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── edition.ts               [I]
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   ├── EditionIndexScreen.tsx   [P]
│   │   │   │   │   │   └── EditionScreen.tsx        [P]
│   │   │   │   │   └── public.ts                     [I]
│   │   │   │   ├── atelier/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── atelier-page.query.ts    [I]
│   │   │   │   │   │   └── get-atelier-page.ts      [P]
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── AtelierScreen.tsx        [P]
│   │   │   │   │   └── public.ts                     [I]
│   │   │   │   ├── studio/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── studio-page.query.ts     [I]
│   │   │   │   │   │   └── get-studio-page.ts       [P]
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── StudioScreen.tsx         [P]
│   │   │   │   │   └── public.ts                     [I]
│   │   │   │   ├── legal/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   ├── legal-page.query.ts       [I]
│   │   │   │   │   │   └── get-legal-page.ts         [P]
│   │   │   │   │   ├── ui/
│   │   │   │   │   │   └── LegalPageScreen.tsx       [P]
│   │   │   │   │   └── public.ts                     [I]
│   │   │   │   └── project-inquiry/
│   │   │   │       ├── actions/
│   │   │   │       │   ├── project-inquiry.dependencies.server.ts [P]
│   │   │   │       │   └── submit-project-inquiry.action.ts       [P]
│   │   │   │       ├── application/
│   │   │   │       │   ├── submit-project-inquiry.test.ts         [I]
│   │   │   │       │   └── submit-project-inquiry.ts              [I]
│   │   │   │       ├── model/
│   │   │   │       │   ├── project-inquiry.schema.test.ts         [I]
│   │   │   │       │   ├── project-inquiry.schema.ts              [I]
│   │   │   │       │   └── project-inquiry.types.ts               [I]
│   │   │   │       ├── ui/
│   │   │   │       │   ├── StartProjectForm.client.tsx            [P]
│   │   │   │       │   └── TurnstileWidget.client.tsx             [P]
│   │   │   │       └── public.ts                                  [I]
│   │   │   │
│   │   │   ├── infrastructure/
│   │   │   │   ├── sanity/
│   │   │   │   │   ├── client.server.ts             [I]
│   │   │   │   │   ├── image.ts                     [I]
│   │   │   │   │   └── preview.server.ts            [I]
│   │   │   │   ├── attio/
│   │   │   │   │   ├── client.server.ts             [P]
│   │   │   │   │   └── lead-records.server.ts       [P]
│   │   │   │   ├── resend/
│   │   │   │   │   ├── client.server.ts             [P]
│   │   │   │   │   └── project-inquiry-email.server.ts [P]
│   │   │   │   ├── turnstile/
│   │   │   │   │   └── verify-turnstile.server.ts   [P]
│   │   │   │   └── observability/
│   │   │   │       ├── report-error.server.ts        [I]
│   │   │   │       └── sentry.server.ts              [I]
│   │   │   │
│   │   │   ├── seo/
│   │   │   │   ├── metadata/
│   │   │   │   │   ├── build-metadata.test.ts       [I]
│   │   │   │   │   └── build-metadata.ts            [I]
│   │   │   │   └── structured-data/
│   │   │   │       ├── breadcrumbs.ts               [I]
│   │   │   │       ├── JsonLd.tsx                   [I]
│   │   │   │       └── organization.ts              [I]
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── env.client.ts                    [I]
│   │   │   │   ├── env.server.test.ts               [I]
│   │   │   │   ├── env.server.ts                    [I]
│   │   │   │   └── site.ts                          [I]
│   │   │   ├── generated/
│   │   │   │   └── sanity.types.ts                  [G]
│   │   │   ├── styles/
│   │   │   │   └── globals.css                      [I]
│   │   │   ├── instrumentation-client.ts            [I]
│   │   │   └── instrumentation.ts                   [I]
│   │   │
│   │   └── tests/
│   │       ├── e2e/
│   │       │   ├── accessibility.spec.ts            [I]
│   │       │   ├── project-inquiry.spec.ts          [P]
│   │       │   └── smoke.spec.ts                    [I]
│   │       └── fixtures/
│   │           └── project-inquiry.ts               [I]
│   │
│   └── studio/
│       ├── package.json                              [I]
│       ├── sanity.cli.ts                             [I]
│       ├── sanity.config.ts                          [I]
│       ├── eslint.config.mjs                         [I]
│       ├── tsconfig.json                             [I]
│       ├── schema.json                               [G]
│       └── src/
│           ├── schema-types/
│           │   ├── documents/
│           │   │   ├── atelier-page.ts              [I]
│           │   │   ├── edition.ts                   [I]
│           │   │   ├── home-page.ts                 [I]
│           │   │   ├── legal-page.ts                [I]
│           │   │   ├── site-settings.ts             [I]
│           │   │   └── studio-page.ts               [I]
│           │   ├── objects/
│           │   │   ├── cta.ts                       [I]
│           │   │   ├── image-with-alt.ts            [I]
│           │   │   └── seo.ts                       [I]
│           │   ├── index.ts                         [I]
│           │   └── schema-types.test.ts             [I]
│           └── structure/
│               └── desk-structure.ts                [I]
│
├── packages/
│   ├── tokens/
│   │   ├── package.json                              [I]
│   │   ├── eslint.config.mjs                         [I]
│   │   ├── tsconfig.json                             [I]
│   │   └── src/
│   │       ├── index.ts                              [I]
│   │       └── tokens.css                            [I]
│   ├── ui/
│   │   ├── package.json                              [I]
│   │   ├── eslint.config.mjs                         [I]
│   │   ├── tsconfig.json                             [I]
│   │   ├── vitest.config.ts                          [I]
│   │   ├── vitest.setup.ts                           [I]
│   │   └── src/
│   │       ├── primitives/
│   │       │   ├── Button.test.tsx                  [I]
│   │       │   ├── Button.tsx                       [I]
│   │       │   ├── Container.tsx                    [I]
│   │       │   ├── Divider.tsx                      [I]
│   │       │   ├── FocusRing.tsx                    [I]
│   │       │   ├── Grid.tsx                         [I]
│   │       │   ├── Heading.tsx                      [I]
│   │       │   ├── Link.tsx                         [I]
│   │       │   ├── Media.tsx                        [I]
│   │       │   └── Text.tsx                         [I]
│   │       └── index.ts                             [I]
│   ├── analytics/
│   │   ├── package.json                              [I]
│   │   ├── eslint.config.mjs                         [I]
│   │   ├── tsconfig.json                             [I]
│   │   ├── vitest.config.ts                          [I]
│   │   └── src/
│   │       ├── client.test.ts                        [I]
│   │       ├── client.ts                             [I]
│   │       ├── events.test.ts                        [I]
│   │       ├── events.ts                             [I]
│   │       ├── server.test.ts                        [I]
│   │       └── server.ts                             [I]
│   ├── eslint-config/
│   │   ├── package.json                              [I]
│   │   ├── base.mjs                                  [I]
│   │   ├── next.mjs                                  [I]
│   │   └── react.mjs                                 [I]
│   └── typescript-config/
│       ├── package.json                              [I]
│       ├── base.json                                 [I]
│       ├── nextjs.json                               [I]
│       └── react-library.json                        [I]
│
├── docs/
│   ├── architecture/                                 [D: files listed in §10]
│   ├── adr/                                          [D: ADR-0001…0008]
│   ├── product/                                      [D]
│   ├── engineering/                                  [D]
│   ├── analytics/                                    [D]
│   ├── seo/                                          [D]
│   ├── runbooks/                                     [D]
│   └── README.md                                     [D]
│
├── .editorconfig                                     [I]
├── .env.example                                      [I]
├── .gitignore                                        [I]
├── .npmrc                                            [I]
├── CONTRIBUTING.md                                   [I]
├── README.md                                         [I]
├── eslint.config.mjs                                 [I]
├── package.json                                      [I]
├── pnpm-lock.yaml                                    [G]
├── pnpm-workspace.yaml                               [I]
├── prettier.config.mjs                               [I]
├── SKELETON_READY.md                                 [D]
├── turbo.json                                        [I]
└── tsconfig.json                                     [I]
~~~

## 3. Initial implementation versus placeholder policy

### Real implementation required

Foundation code must be complete enough that install, lint, typecheck, unit tests, Studio build and web production build pass:

- workspace/package manifests and configs;
- strict environment parsing;
- server-only guards;
- Sanity schemas, desk structure, schema extraction and TypeGen;
- named GROQ query constants and generated types;
- typed analytics event map plus isolated adapters;
- brand token CSS and UI primitives;
- metadata/structured-data helpers;
- Sentry/PostHog initialization behind current framework conventions;
- draft-mode enable/disable validation;
- minimal error boundaries, sitemap and robots behavior;
- minimal smoke/axe/unit tests;
- CI and documentation.

### Compile-safe placeholders

Placeholder pages/screens render neutral structural text or an explicit development-only marker. They must not recreate the ORVAUXE homepage design, generate marketing copy, invent portfolio content or simulate client results.

Attio, Resend and Turnstile adapter placeholder files define the approved function signatures and throw a stable NotImplemented/config error only when called outside test mode. They must not contain live HTTP/SDK calls during skeleton generation. Project-inquiry tests inject fake ports and prove workflow ordering without vendors.

The Server Action and form placeholder may prove type/transport wiring but must not claim a successful real integration.

### Generated files

schema.json and sanity.types.ts are produced by the real Sanity commands after schemas/queries exist. sanity.types.ts begins with a generated/do-not-edit warning. CI regenerates and checks no diff.

## 4. Package names and ownership

| Directory | package.json name | private | Owner |
|---|---|---:|---|
| root | orvauxe | yes | platform |
| apps/web | @orvauxe/web | yes | web |
| apps/studio | @orvauxe/studio | yes | content platform |
| packages/tokens | @orvauxe/tokens | yes | design system |
| packages/ui | @orvauxe/ui | yes | design system |
| packages/analytics | @orvauxe/analytics | yes | analytics engineering |
| packages/eslint-config | @orvauxe/eslint-config | yes | platform |
| packages/typescript-config | @orvauxe/typescript-config | yes | platform |

All packages remain private at launch.

## 5. package.json responsibilities

### Root

Owns:

- packageManager pinned to the verified current stable pnpm;
- engines.node pinned/ranged to the current Vercel-supported active LTS;
- scripts: dev, build, lint, typecheck, test, test:e2e, typegen:sanity, typegen:check, format, format:check;
- root development tools only: turbo and Prettier where used;
- no application runtime dependencies.

### Web

Owns Next.js/React, Tailwind/PostCSS, Zod, GSAP, Sanity client integration, Turnstile browser wrapper if selected, Resend/Attio HTTP or SDK dependencies when later implemented, Sentry Next.js, and workspace dependencies:

~~~json
"@orvauxe/tokens": "workspace:*",
"@orvauxe/ui": "workspace:*",
"@orvauxe/analytics": "workspace:*"
~~~

Testing dependencies are local to web: Vitest, React Testing Library, Playwright and @axe-core/playwright.

### Studio

Owns Sanity Studio/vision/structure packages and schema/typegen CLI support. It does not depend on web or workspace UI packages.

### Tokens

Has no React or vendor runtime dependency. Exports:

~~~json
"exports": {
  ".": "./src/index.ts",
  "./styles.css": "./src/tokens.css"
}
~~~

### UI

Depends on @orvauxe/tokens through workspace:*. React is a peer dependency. It must not depend on Next.js, Sanity, analytics or vendor SDKs. Link must remain a presentational anchor contract; routing-specific Next Link composition stays in web if the primitive cannot remain framework-independent.

### Analytics

Owns posthog-js, posthog-node and server-only. Exports exactly:

~~~json
"exports": {
  "./events": "./src/events.ts",
  "./client": "./src/client.ts",
  "./server": "./src/server.ts"
}
~~~

No mixed root implementation export.

### Shared configs

eslint-config owns flat-config exports base, next and react. typescript-config owns base, nextjs and react-library JSON configs. Neither contains runtime code.

## 6. Workspace relationships

pnpm-workspace.yaml includes only:

~~~yaml
packages:
  - apps/*
  - packages/*
~~~

Allowed workspace edges:

~~~text
@orvauxe/web
  → @orvauxe/ui
  → @orvauxe/tokens
  → @orvauxe/analytics
  → eslint/typescript configs as dev dependencies

@orvauxe/ui
  → @orvauxe/tokens
  → eslint/typescript configs as dev dependencies

@orvauxe/analytics
  → eslint/typescript configs as dev dependencies

@orvauxe/studio
  → eslint/typescript configs as dev dependencies
~~~

No app-to-app dependency and no package-to-app dependency.

## 7. TypeScript relationships

- root tsconfig.json contains no source include; it exists for editor/reference consistency.
- typescript-config/base.json enables strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes, noImplicitOverride, noFallthroughCasesInSwitch, noUncheckedSideEffectImports, isolatedModules and noEmit.
- nextjs.json extends base and uses Next.js-required module/JSX/plugin settings.
- react-library.json extends base and uses react-jsx/library settings.
- web extends @orvauxe/typescript-config/nextjs.
- Studio uses a Sanity-compatible strict config based on base unless Sanity tooling requires a documented override.
- UI extends react-library.
- tokens and analytics extend base or react-library only where JSX exists.
- TypeScript paths map @/* to web src and @/modules/* to each module public.ts. ESLint remains the authority blocking deep imports.

Any override is local, minimal and commented.

## 8. ESLint relationships

The root eslint.config.mjs applies @orvauxe/eslint-config/base to root scripts/config. Each workspace has a small config:

- web: next plus architecture restrictions;
- Studio: base plus React/Sanity rules;
- UI: react;
- tokens/analytics: base, with React only where needed.

Initial web restrictions:

- no package import from apps paths;
- no infrastructure import from modules;
- no module deep import from outside that module;
- no server entrypoint from client files;
- no posthog-js/posthog-node import outside packages/analytics;
- no process.env outside config, instrumentation, next/sanity build config;
- no raw console in production source except approved logger/telemetry boundary;
- report unused disable directives.

## 9. Turbo task graph

turbo.json uses the current tasks syntax:

~~~text
dev
  cache: false
  persistent: true

lint
  dependsOn: ^lint

typecheck
  dependsOn: ^typecheck

test
  dependsOn: ^test
  outputs: coverage/** when coverage is produced

build
  dependsOn: ^build
  outputs:
    apps/web package → .next/** excluding .next/cache/**
    Studio/package build → dist/** where applicable

e2e
  cache: false initially
~~~

The actual JSON must follow current Turborepo schema. Build-affecting environment variables appear in env/globalEnv only at the narrow task that uses them.

## 10. Initial documentation copied into repository

Copy the architecture package documents verbatim:

### docs/architecture

- ORVAUXE_Architecture_Specification_v1.0.md
- overview.md
- repository-map.md
- dependency-rules.md
- application-boundaries.md
- server-client-boundaries.md
- data-flow.md
- lead-submission-flow.md
- cms-architecture.md
- integration-architecture.md
- error-model.md
- official-sources.md

### docs/adr

- ADR-0001-monorepo-pnpm-turborepo.md
- ADR-0002-nextjs-server-first.md
- ADR-0003-domain-module-architecture.md
- ADR-0004-sanity-constrained-cms.md
- ADR-0005-attio-system-of-record.md
- ADR-0006-no-database-at-launch.md
- ADR-0007-typed-analytics-contract.md
- ADR-0008-sentry-observability.md

### docs/engineering

- naming-conventions.md
- import-rules.md
- testing-strategy.md
- environment-strategy.md
- ci-quality-gates.md
- definition-of-done.md
- accessibility.md from Planning Package v1.1
- performance.md from Planning Package v1.1
- security.md from Planning Package v1.1
- design-system.md from Planning Package v1.1

### docs/analytics

- analytics-code-contract.md
- README.md, event-dictionary.md, funnel-definitions.md, privacy.md and tracking-plan.md from Planning Package v1.1

### docs/product

- product-model.md and crm-model.md from Planning Package v1.1

### docs/seo

- seo-strategy.md, keyword-intent-map.md, metadata-rules.md and structured-data.md from Planning Package v1.1

### docs/runbooks

- lead-integration-failure.md
- deployment.md, rollback.md and incident-response.md from Planning Package v1.1

docs/README.md links these areas and states the precedence rule from the architecture package README.

Do not copy obsolete Planning ADR numbers into docs/adr; their decisions are superseded and incorporated into ADR-0001…0008.

## 11. Environment variables

Root .env.example contains names, safe descriptions and grouping only:

~~~text
# Web public
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_SENTRY_DSN=

# Web server-only
ORVAUXE_SITE_URL=
SANITY_API_TOKEN=
SANITY_PREVIEW_SECRET=
ATTIO_API_KEY=
ATTIO_DEFAULT_DEAL_OWNER=
ATTIO_DEFAULT_DEAL_STAGE=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
PROJECT_INQUIRY_RECIPIENT_EMAIL=
TURNSTILE_SECRET_KEY=

# Sanity Studio public configuration
SANITY_STUDIO_PROJECT_ID=
SANITY_STUDIO_DATASET=

# Build/CI only; never runtime/client
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
TURBO_TOKEN=
TURBO_TEAM=

# Test only; production parser rejects stub
ORVAUXE_E2E_MODE=
~~~

VERCEL_ENV and related Vercel variables are platform-provided and documented but are not assigned in .env.example.

## 12. Initial CI files

.github/workflows/ci.yml:

1. trigger on pull_request and push to main;
2. cancel superseded runs on the same branch;
3. checkout;
4. install pinned Node/pnpm;
5. pnpm install --frozen-lockfile;
6. pnpm typegen:check;
7. pnpm lint;
8. pnpm typecheck;
9. pnpm test;
10. pnpm build;
11. install Playwright Chromium after fast checks;
12. pnpm test:e2e with ORVAUXE_E2E_MODE=stub and official Turnstile test keys;
13. upload report/trace only on failure.

Visual snapshot blocking is not enabled in the skeleton because no approved production UI baseline exists. Do not create fake screenshots. Add them in the UI implementation PR under the approved testing strategy.

dependabot.yml checks pnpm and GitHub Actions weekly with grouped non-breaking updates. It opens reviewable PRs; it does not auto-merge runtime major versions.

## 13. Initial test setup

- Unit/component tests run with Vitest, not Jest.
- UI and form component tests use React Testing Library and user-event.
- Playwright starts the compiled/production-like web app through webServer.
- smoke.spec.ts checks the seven launch route patterns return a usable skeleton and an unknown URL returns 404.
- accessibility.spec.ts runs axe on the neutral Home and Start Project skeleton states.
- project-inquiry.spec.ts remains a clearly marked placeholder until the compile-safe Server Action/form connection exists; then it uses stub ports and Cloudflare test keys.
- No test contacts production Sanity, Attio, Resend, PostHog or Sentry.
- No visual baselines are generated until design implementation.

## 14. Sanity skeleton contract

The six document and three object files contain actual defineType/defineField schemas with conservative required fields and validation. desk-structure.ts exposes four singletons and two collections. The Studio prevents creating duplicate singleton documents.

sanity.cli.ts configures:

- project/dataset from SANITY_STUDIO_*;
- schema extraction to schema.json;
- TypeGen query scan over the web *.query.ts files;
- generated output to apps/web/src/generated/sanity.types.ts.

No generic page, sections[], service, Work, Journal, caseStudy, testimonial or FAQ schema is generated.

## 15. Next.js skeleton contract

The web skeleton builds and exposes only the seven approved route patterns, including `/legal/[slug]`. Route placeholders import module public APIs where available and do not contain domain implementations.

next.config.ts:

- transpiles the required workspace packages;
- configures approved Sanity image hosts;
- wraps with Sentry build configuration;
- applies practical security headers/CSP for Sanity image delivery, Turnstile, PostHog and Sentry;
- retains same-origin Server Actions;
- applies a small inquiry-appropriate Server Action body limit;
- does not add experimental features without a documented requirement.

Root layout imports globals.css and establishes basic metadata/site constants. It must not implement the production header, hero or motion.

No /work, /journal or /api/project-inquiries route exists.

## 16. Analytics package skeleton contract

events.ts contains the complete v1 event property map from analytics-code-contract.md. client.ts and server.ts each export init/track behavior appropriate to their runtime. Tests prove:

- unknown/missing properties fail at compile/test level;
- common event_version/environment are enriched;
- PII keys are not part of the contract;
- client entry does not import server SDK;
- server failures do not throw into the business use case after safe handling.

Only the package may import PostHog SDKs.

The browser adapter explicitly configures `autocapture: false`, `capture_pageview: false`, `capture_pageleave: false`, `capture_exceptions: false`, and `capture_performance: false`; it also disables session recording, heatmaps, dead-click capture, feature-flag requests, surveys, web experiments, conversations, product tours, external dependency loading, campaign persistence and referrer persistence. A final allowlist removes vendor-generated events, full URLs/query strings and any property outside the typed contract plus the minimal transport envelope. It never relies on vendor defaults for collection policy.

## 17. UI and tokens skeleton contract

tokens.css implements the Brand Book v1.1 production token baseline:

- Black, Atelier Ivory, Bone, Graphite Brand, Graphite UI and Oxblood;
- Bodoni Moda and Inter family names;
- type scale aliases;
- spacing/container/grid;
- focus;
- motion durations;
- z-index;
- minimal border/shadow values.

It uses CSS Custom Properties and Tailwind CSS-first theme mapping compatible with the pinned Tailwind version. globals.css imports Tailwind, token CSS and declares the UI package source for class scanning if required by that version.

UI primitives are semantic, accessible and unstyled beyond the token contract. They contain no Edition, CMS, CRM, analytics or page-specific logic. Button.test.tsx proves accessible name/element behavior.

Approved font files/logo assets are not invented or redrawn during skeleton generation. If copied from Planning Package v1.1, preserve licenses/provenance and document the source; otherwise leave font loading on a safe fallback until the design implementation task.

## 18. Root README exact sections

The generated root README contains:

1. ORVAUXE
2. Project Overview
3. Repository Map
4. Architecture
5. Applications
6. Packages
7. Requirements
8. Installation
9. Environment
10. Local Development
11. Sanity and Type Generation
12. Testing
13. Analytics
14. Deployment
15. Documentation
16. Contribution

It includes working commands and links to the main specification, SKELETON_READY, ADRs and runbooks.

## 19. CONTRIBUTING exact sections

- prerequisites/local setup;
- short-lived branch/trunk policy;
- branch examples feat/edition-gallery, fix/project-form-validation, chore/update-sanity-types;
- code/naming/import boundaries;
- server/client and secret safety;
- testing expectations;
- accessibility/analytics/SEO/CMS impact;
- PR/CI rules;
- when to create an ADR;
- documentation and generated-file updates;
- commit policy: concise imperative messages; no ceremonial enforced format.

## 20. Pull-request template

~~~text
Summary
Context
Screenshots / Preview
Testing
Accessibility
Analytics
SEO
CMS impact
Architecture impact
Breaking changes / migration
Documentation
Checklist
~~~

Fields may be marked not applicable with a reason.

## 21. Folders/files that must not be created

Do not create:

~~~text
packages/utils
packages/helpers
packages/common
packages/shared
packages/types
packages/api
packages/server
packages/config

apps/web/src/components
apps/web/src/hooks
apps/web/src/utils
apps/web/src/helpers
apps/web/src/services
apps/web/src/types
apps/web/src/lib

apps/web/src/modules/work
apps/web/src/modules/journal
apps/web/src/app/(site)/work
apps/web/src/app/(site)/journal
apps/web/src/app/api/project-inquiries

apps/studio/src/schema-types/documents/page.ts
apps/studio/src/schema-types/documents/service.ts
apps/studio/src/schema-types/documents/case-study.ts
apps/studio/src/schema-types/documents/journal-post.ts
apps/studio/src/schema-types/documents/testimonial.ts
apps/studio/src/schema-types/documents/faq.ts

prisma
database
docker
Dockerfile
docker-compose.yml
kubernetes
queues
middleware/proxy without a concrete route need
vitest.workspace.ts
staging configuration
~~~

Do not add PostgreSQL, Prisma, Redis, Supabase, Firebase, GraphQL, a queue, microservice, auth or a public API.

## 22. Skeleton acceptance checklist

The next skeleton is complete only when:

- exact tree exists with no unauthorized directories;
- pnpm frozen install succeeds;
- workspace graph has only approved edges;
- lint/typecheck/tests/build pass;
- web exposes only launch routes with neutral placeholders;
- Studio builds with exact launch schemas;
- TypeGen produces committed generated files with no drift;
- server/client entrypoints cannot cross-import;
- analytics compile contract is tested;
- no vendor integration performs a real call;
- no secret/value is committed;
- docs are copied and linked;
- README and CONTRIBUTING are actionable;
- SKELETON_READY remains in the repository as provenance;
- no production UI, Work or Journal is generated.

## 23. Blocking decisions

None.

Vendor accounts, project IDs, real secrets, final domains, final copy and approved production assets are implementation/operations inputs. They do not require a different skeleton.

## 24. Next task

> **Next Phase: ORVAUXE Repository Skeleton v1.0**

Do not continue beyond architecture review in the current phase.
