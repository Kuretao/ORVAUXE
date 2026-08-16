# Status

```text
READY
```

The repository skeleton is complete. Clean installation, generation, static analysis, unit/component tests, production builds, browser tests, architecture probes, and the final security audit all pass.

## Versions

| Tool or runtime                |                 Pinned version |
| ------------------------------ | -----------------------------: |
| Node.js                        | 24.19.0 (`engines.node: 24.x`) |
| pnpm                           |                        10.34.5 |
| Turborepo                      |                        2.10.10 |
| Next.js                        |                         16.3.1 |
| React / React DOM              |                         19.2.8 |
| TypeScript                     |                          6.0.3 |
| Tailwind CSS                   |                          4.3.3 |
| Sanity / next-sanity           |                 6.9.2 / 13.3.3 |
| @sanity/client                 |                         7.26.2 |
| Zod                            |                          4.4.3 |
| GSAP                           |                         3.15.0 |
| PostHog browser / Node         |               1.417.1 / 5.49.1 |
| Sentry Next.js                 |                        10.70.0 |
| Vitest / React Testing Library |                4.1.10 / 16.3.2 |
| Playwright / axe               |                1.62.1 / 4.13.0 |
| ESLint / Prettier              |                 9.39.5 / 3.9.6 |

Compatibility adjustments are deliberate:

- pnpm 10.34.5 is the newest 10.x line and remains inside [Vercel's documented pnpm 6–10 support range](https://vercel.com/docs/package-managers). pnpm 11 would require opting both Vercel projects into experimental Corepack behavior.
- TypeScript 6.0.3 remains below the current `typescript-eslint` supported ceiling of `<6.1.0`; TypeScript 7 is deferred.
- ESLint 9.39.5 remains compatible with the pinned React/import/accessibility plugin peer ranges; ESLint 10 is deferred.
- `@sanity/client` 7.26.2 satisfies the `next-sanity` 13.3.3 peer range; client 8 is deferred.

## Architecture amendments applied

- **A1 Turnstile verification identity** — `submissionId` remains the logical inquiry ID; one `turnstileVerificationId` belongs to one token, is reused for a same-token network retry, and changes with a fresh token. Unit tests cover the lifecycle.
- **A2 Legal capability** — `/legal/[slug]`, the legal module, Sanity `legalPage` schema, metadata, noindex behavior, sitemap filtering, and E2E route coverage are present.
- **A3 Attio default Deal configuration** — typed server environment configuration contains `ATTIO_DEFAULT_DEAL_OWNER` and `ATTIO_DEFAULT_DEAL_STAGE`; no owner or stage is hard-coded.
- **A4 Strict PostHog capture configuration** — browser automatic capture surfaces and remote collection expansion are disabled. A final event/property allowlist removes implicit full URLs, referrers, campaigns, person updates, and vendor-generated events.

## Commands executed

All commands below were executed with Node 24.19.0 and pnpm 10.34.5. The final verification began without prior dependency links, Turbo caches, Next output, Studio output, `.next`, or `next-env.d.ts`.

| Command                            | Result                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `pnpm install --frozen-lockfile`   | PASS — clean installation of all eight workspace projects and 1289 packages                      |
| `pnpm format:check`                | PASS                                                                                             |
| `pnpm typegen:sanity`              | PASS — deterministic regeneration of 22 schema types and 7 named queries                         |
| `pnpm typegen:check`               | PASS — generated artifacts match the staged repository baseline                                  |
| `pnpm lint`                        | PASS — uncached repository and workspace lint                                                    |
| `pnpm typecheck`                   | PASS — uncached; `next typegen` bootstrapped route types from absent `.next` and `next-env.d.ts` |
| `pnpm test`                        | PASS — 36 unit/component tests                                                                   |
| `pnpm build`                       | PASS — uncached web and Studio production builds                                                 |
| `pnpm test:e2e`                    | PASS — 26 desktop/mobile Chromium smoke, axe, 404, navigation, and inquiry tests                 |
| `pnpm workspace:graph`             | PASS — eight projects, 87 resolved packages, approved workspace edges only                       |
| architecture lint rejection probes | PASS — 13 explicit route/module, client/server, UI/vendor, and package-boundary probes rejected  |
| final security/architecture audit  | PASS — no remaining blockers                                                                     |

## Repository differences

The implemented source tree matches the amended `SKELETON_READY.md`. Intentional differences and compatibility details are:

1. `SKELETON_REPORT.md` is added by the repository-generation task that consumed `SKELETON_READY.md`.
2. `pnpm-workspace.yaml` retains the two required package globs and adds pnpm 10 build-script allow/ignore lists for reviewed native/tooling dependencies. This is package-manager supply-chain configuration, not another workspace boundary.
3. Node 24.19.0, pnpm 10.34.5 and exact compatible dependency versions were selected at implementation time. The pnpm 10 choice is a Vercel compatibility pin, as described above.
4. Framework-local `next-env.d.ts`, `.next`, `.sanity`, `.turbo`, `dist`, test output and TypeScript build-info files are generated and ignored; they are not repository source-tree additions.
5. No Planning font, logo, preview or concept-photography assets were copied because the exact skeleton tree contains no approved destination and production provenance/optimization remains a later design-phase decision.
6. The initial CSP permits framework-required inline scripts and styles. Replacing `'unsafe-inline'` with request-scoped nonces requires a later nonce architecture and rendering validation; it is deliberately deferred from this neutral skeleton.

### Actual repository tree

```text
ORVAUXE/
├── .github/
│   ├── workflows/ci.yml
│   ├── dependabot.yml
│   └── pull_request_template.md
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (site)/{page,layout,error,atelier,editions,studio,start-a-project,legal}
│   │   │   │   ├── api/draft-mode/{enable,disable}/route.ts
│   │   │   │   └── {layout,global-error,not-found,robots,sitemap}.tsx|ts
│   │   │   ├── config/{env.client,env.server,env.server.test,site}.ts
│   │   │   ├── generated/sanity.types.ts
│   │   │   ├── infrastructure/{sanity,attio,resend,turnstile,observability}/
│   │   │   ├── modules/{editions,atelier,studio,legal,project-inquiry}/
│   │   │   ├── seo/{metadata,structured-data}/
│   │   │   ├── styles/globals.css
│   │   │   ├── instrumentation.ts
│   │   │   └── instrumentation-client.ts
│   │   ├── tests/{e2e,fixtures}/
│   │   └── package and Next/PostCSS/Playwright/Vitest/TypeScript/ESLint configs
│   └── studio/
│       ├── src/schema-types/
│       │   ├── documents/{site-settings,home-page,atelier-page,studio-page,edition,legal-page}.ts
│       │   ├── objects/{seo,cta,image-with-alt}.ts
│       │   ├── index.ts
│       │   └── schema-types.test.ts
│       ├── src/structure/desk-structure.ts
│       ├── schema.json
│       └── package, Sanity, TypeScript and ESLint configs
├── packages/
│   ├── analytics/{src/{events,client,server}.ts,tests-and-configs}
│   ├── tokens/{src/{index.ts,tokens.css},configs}
│   ├── ui/{src/index.ts,src/primitives/{Button,Container,Divider,FocusRing,Grid,Heading,Link,Media,Text},tests-and-configs}
│   ├── eslint-config/{base,next,react}.mjs
│   └── typescript-config/{base,nextjs,react-library}.json
├── docs/
│   ├── adr/ (ADR-0001 through ADR-0008)
│   ├── analytics/
│   ├── architecture/
│   ├── engineering/
│   ├── product/
│   ├── runbooks/
│   ├── seo/
│   └── README.md
├── .editorconfig
├── .env.example
├── .gitignore
├── .npmrc
├── CONTRIBUTING.md
├── README.md
├── SKELETON_READY.md
├── SKELETON_REPORT.md
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prettier.config.mjs
├── tsconfig.json
└── turbo.json
```

#### Literal source file inventory (203 files)

Ignored dependency, framework-build, cache, and test-output artifacts are excluded.

```text
.editorconfig
.env.example
.github/dependabot.yml
.github/pull_request_template.md
.github/workflows/ci.yml
.gitignore
.npmrc
apps/studio/eslint.config.mjs
apps/studio/package.json
apps/studio/sanity.cli.ts
apps/studio/sanity.config.ts
apps/studio/schema.json
apps/studio/src/schema-types/documents/atelier-page.ts
apps/studio/src/schema-types/documents/edition.ts
apps/studio/src/schema-types/documents/home-page.ts
apps/studio/src/schema-types/documents/legal-page.ts
apps/studio/src/schema-types/documents/site-settings.ts
apps/studio/src/schema-types/documents/studio-page.ts
apps/studio/src/schema-types/index.ts
apps/studio/src/schema-types/objects/cta.ts
apps/studio/src/schema-types/objects/image-with-alt.ts
apps/studio/src/schema-types/objects/seo.ts
apps/studio/src/schema-types/schema-types.test.ts
apps/studio/src/structure/desk-structure.ts
apps/studio/tsconfig.json
apps/web/eslint.config.mjs
apps/web/next.config.ts
apps/web/package.json
apps/web/playwright.config.ts
apps/web/postcss.config.mjs
apps/web/src/app/(site)/atelier/page.tsx
apps/web/src/app/(site)/editions/[slug]/page.tsx
apps/web/src/app/(site)/editions/page.tsx
apps/web/src/app/(site)/error.tsx
apps/web/src/app/(site)/layout.tsx
apps/web/src/app/(site)/legal/[slug]/page.tsx
apps/web/src/app/(site)/page.tsx
apps/web/src/app/(site)/start-a-project/page.tsx
apps/web/src/app/(site)/studio/page.tsx
apps/web/src/app/api/draft-mode/disable/route.ts
apps/web/src/app/api/draft-mode/enable/route.ts
apps/web/src/app/global-error.tsx
apps/web/src/app/layout.tsx
apps/web/src/app/not-found.tsx
apps/web/src/app/robots.ts
apps/web/src/app/sitemap.ts
apps/web/src/config/env.client.ts
apps/web/src/config/env.server.test.ts
apps/web/src/config/env.server.ts
apps/web/src/config/site.ts
apps/web/src/generated/sanity.types.ts
apps/web/src/infrastructure/attio/client.server.ts
apps/web/src/infrastructure/attio/lead-records.server.ts
apps/web/src/infrastructure/observability/report-error.server.ts
apps/web/src/infrastructure/observability/sentry.server.ts
apps/web/src/infrastructure/resend/client.server.ts
apps/web/src/infrastructure/resend/project-inquiry-email.server.ts
apps/web/src/infrastructure/sanity/client.server.ts
apps/web/src/infrastructure/sanity/image.ts
apps/web/src/infrastructure/sanity/preview.server.ts
apps/web/src/infrastructure/turnstile/verify-turnstile.server.ts
apps/web/src/instrumentation.ts
apps/web/src/instrumentation-client.ts
apps/web/src/modules/atelier/data/atelier-page.query.ts
apps/web/src/modules/atelier/data/get-atelier-page.ts
apps/web/src/modules/atelier/public.ts
apps/web/src/modules/atelier/ui/AtelierScreen.tsx
apps/web/src/modules/editions/data/edition.query.ts
apps/web/src/modules/editions/data/editions.query.ts
apps/web/src/modules/editions/data/get-edition.ts
apps/web/src/modules/editions/data/get-editions.ts
apps/web/src/modules/editions/model/edition.ts
apps/web/src/modules/editions/public.ts
apps/web/src/modules/editions/ui/EditionIndexScreen.tsx
apps/web/src/modules/editions/ui/EditionScreen.tsx
apps/web/src/modules/legal/data/get-legal-page.ts
apps/web/src/modules/legal/data/legal-page.query.ts
apps/web/src/modules/legal/public.ts
apps/web/src/modules/legal/ui/LegalPageScreen.tsx
apps/web/src/modules/project-inquiry/actions/project-inquiry.dependencies.server.ts
apps/web/src/modules/project-inquiry/actions/submit-project-inquiry.action.ts
apps/web/src/modules/project-inquiry/application/submit-project-inquiry.test.ts
apps/web/src/modules/project-inquiry/application/submit-project-inquiry.ts
apps/web/src/modules/project-inquiry/model/project-inquiry.schema.test.ts
apps/web/src/modules/project-inquiry/model/project-inquiry.schema.ts
apps/web/src/modules/project-inquiry/model/project-inquiry.types.ts
apps/web/src/modules/project-inquiry/public.ts
apps/web/src/modules/project-inquiry/ui/StartProjectForm.client.tsx
apps/web/src/modules/project-inquiry/ui/TurnstileWidget.client.tsx
apps/web/src/modules/studio/data/get-studio-page.ts
apps/web/src/modules/studio/data/studio-page.query.ts
apps/web/src/modules/studio/public.ts
apps/web/src/modules/studio/ui/StudioScreen.tsx
apps/web/src/seo/metadata/build-metadata.test.ts
apps/web/src/seo/metadata/build-metadata.ts
apps/web/src/seo/structured-data/breadcrumbs.ts
apps/web/src/seo/structured-data/JsonLd.tsx
apps/web/src/seo/structured-data/organization.ts
apps/web/src/styles/globals.css
apps/web/tests/e2e/accessibility.spec.ts
apps/web/tests/e2e/project-inquiry.spec.ts
apps/web/tests/e2e/smoke.spec.ts
apps/web/tests/fixtures/project-inquiry.ts
apps/web/tsconfig.json
apps/web/vitest.config.ts
apps/web/vitest.setup.ts
CONTRIBUTING.md
docs/adr/ADR-0001-monorepo-pnpm-turborepo.md
docs/adr/ADR-0002-nextjs-server-first.md
docs/adr/ADR-0003-domain-module-architecture.md
docs/adr/ADR-0004-sanity-constrained-cms.md
docs/adr/ADR-0005-attio-system-of-record.md
docs/adr/ADR-0006-no-database-at-launch.md
docs/adr/ADR-0007-typed-analytics-contract.md
docs/adr/ADR-0008-sentry-observability.md
docs/analytics/analytics-code-contract.md
docs/analytics/event-dictionary.md
docs/analytics/funnel-definitions.md
docs/analytics/privacy.md
docs/analytics/README.md
docs/analytics/tracking-plan.md
docs/architecture/application-boundaries.md
docs/architecture/cms-architecture.md
docs/architecture/data-flow.md
docs/architecture/dependency-rules.md
docs/architecture/error-model.md
docs/architecture/integration-architecture.md
docs/architecture/lead-submission-flow.md
docs/architecture/official-sources.md
docs/architecture/ORVAUXE_Architecture_Specification_v1.0.md
docs/architecture/overview.md
docs/architecture/repository-map.md
docs/architecture/server-client-boundaries.md
docs/engineering/accessibility.md
docs/engineering/ci-quality-gates.md
docs/engineering/definition-of-done.md
docs/engineering/design-system.md
docs/engineering/environment-strategy.md
docs/engineering/import-rules.md
docs/engineering/naming-conventions.md
docs/engineering/performance.md
docs/engineering/security.md
docs/engineering/testing-strategy.md
docs/product/crm-model.md
docs/product/product-model.md
docs/README.md
docs/runbooks/deployment.md
docs/runbooks/incident-response.md
docs/runbooks/lead-integration-failure.md
docs/runbooks/rollback.md
docs/seo/keyword-intent-map.md
docs/seo/metadata-rules.md
docs/seo/seo-strategy.md
docs/seo/structured-data.md
eslint.config.mjs
package.json
packages/analytics/eslint.config.mjs
packages/analytics/package.json
packages/analytics/src/client.test.ts
packages/analytics/src/client.ts
packages/analytics/src/events.test.ts
packages/analytics/src/events.ts
packages/analytics/src/server.test.ts
packages/analytics/src/server.ts
packages/analytics/tsconfig.json
packages/analytics/vitest.config.ts
packages/eslint-config/base.mjs
packages/eslint-config/next.mjs
packages/eslint-config/package.json
packages/eslint-config/react.mjs
packages/tokens/eslint.config.mjs
packages/tokens/package.json
packages/tokens/src/index.ts
packages/tokens/src/tokens.css
packages/tokens/tsconfig.json
packages/typescript-config/base.json
packages/typescript-config/nextjs.json
packages/typescript-config/package.json
packages/typescript-config/react-library.json
packages/ui/eslint.config.mjs
packages/ui/package.json
packages/ui/src/index.ts
packages/ui/src/primitives/Button.test.tsx
packages/ui/src/primitives/Button.tsx
packages/ui/src/primitives/Container.tsx
packages/ui/src/primitives/Divider.tsx
packages/ui/src/primitives/FocusRing.tsx
packages/ui/src/primitives/Grid.tsx
packages/ui/src/primitives/Heading.tsx
packages/ui/src/primitives/Link.tsx
packages/ui/src/primitives/Media.tsx
packages/ui/src/primitives/Text.tsx
packages/ui/tsconfig.json
packages/ui/vitest.config.ts
packages/ui/vitest.setup.ts
pnpm-lock.yaml
pnpm-workspace.yaml
prettier.config.mjs
README.md
SKELETON_READY.md
SKELETON_REPORT.md
tsconfig.json
turbo.json
```

### Workspace dependency graph

```text
orvauxe (root)
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/web
├─ runtime: @orvauxe/analytics, @orvauxe/tokens, @orvauxe/ui
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/studio
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/ui
├─ runtime: @orvauxe/tokens
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/analytics
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/tokens
└─ dev: @orvauxe/eslint-config, @orvauxe/typescript-config

@orvauxe/eslint-config, @orvauxe/typescript-config
└─ no workspace dependencies
```

There is no package-to-app edge, no Studio-to-web edge, no UI-to-web edge, no React dependency in tokens, and analytics exposes only `/events`, `/client`, and `/server`.

## External setup still required

- Create the Sanity project/datasets, set public IDs and provision the least-privilege preview token/secret.
- Configure the Attio workspace, the unique Deal `submission_id` attribute, API key, default Deal owner and default Deal stage.
- Configure the Resend account, verified sending domain, sender and inquiry-recipient addresses.
- Configure the Cloudflare Turnstile site and production keys.
- Configure the PostHog project/token/host and retain the repository's restrictive collection policy.
- Configure the Sentry project, DSN, organization/project coordinates and build-only source-map token.
- Create separate Vercel projects rooted at `apps/web` and `apps/studio`, assign environment-scoped values and protect production promotion.
- Configure the production domain/canonical URL and complete DNS/launch verification.
- Approve and optimize final font, logo and photography assets with their licenses/provenance during the next design phase.

These are external account/content inputs. Attio, Resend and Turnstile remain explicit compile-safe adapters and intentionally perform no live production write/verification in this skeleton phase.

## Blockers

None.

## Next phase

> **Next Phase: ORVAUXE Website Foundation & Design System v1.0**
