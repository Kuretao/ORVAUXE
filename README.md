# ORVAUXE

ORVAUXE Repository Skeleton v1.0 is the compiling monorepo foundation for the website, Sanity Studio, shared design primitives, and typed analytics contract. This phase establishes boundaries and testable workflows; it does not implement the final production design, copy, or live vendor writes.

## Project Overview

The launch foundation supports Editions, Atelier, Studio, Start a Project, and reusable legal pages. The web application is server-first, Sanity owns content, Attio owns accepted CRM records, and vendor access stays behind explicit server-only adapters. There is no application database, authentication system, Work area, or Journal at launch.

## Repository Map

```text
apps/
  web/                Next.js website and domain modules
  studio/             Sanity Studio and launch schemas
packages/
  tokens/             CSS design-token contract
  ui/                 application-independent React primitives
  analytics/          typed browser/server analytics boundary
  eslint-config/      shared lint policy
  typescript-config/  shared strict TypeScript policy
docs/                 architecture, decisions, engineering, and runbooks
.github/               CI, dependency updates, and PR template
```

## Architecture

Routes own routing, metadata, error/not-found decisions, and composition. Domain behavior stays under `apps/web/src/modules`, and another module is consumed only through its public API. Vendor clients stay under `apps/web/src/infrastructure`; packages never depend on applications. Server Components are the default and privileged modules remain server-only.

The [normative Architecture Specification](./docs/architecture/ORVAUXE_Architecture_Specification_v1.0.md) defines durable boundaries. [SKELETON_READY](./SKELETON_READY.md) defines the exact initial-generation contract, and accepted [ADRs](./docs/adr/) record architectural decisions.

## Applications

- `@orvauxe/web` — Next.js App Router application exposing `/`, `/editions`, `/editions/[slug]`, `/atelier`, `/studio`, `/start-a-project`, and `/legal/[slug]`.
- `@orvauxe/studio` — constrained Sanity Studio for `siteSettings`, `homePage`, `atelierPage`, `studioPage`, `edition`, and `legalPage` plus approved reusable objects.

The web app and Studio deploy as two separately configured Vercel projects from this monorepo.

## Packages

- `@orvauxe/tokens` exports the CSS token baseline and has no React dependency.
- `@orvauxe/ui` exports semantic, lightweight primitives with React as a peer dependency.
- `@orvauxe/analytics` exposes only `@orvauxe/analytics/events`, `@orvauxe/analytics/client`, and `@orvauxe/analytics/server`.
- `@orvauxe/eslint-config` and `@orvauxe/typescript-config` enforce shared static-analysis boundaries without runtime code.

Internal dependencies use `workspace:*`; the root `pnpm-lock.yaml` is authoritative.

## Requirements

- Node.js `24.19.0` (the repository engine policy is `24.x`)
- pnpm `10.34.5`, pinned by the root `packageManager` field
- Corepack and Git

Use these versions locally and in CI; do not regenerate the lockfile with another package-manager version.

## Installation

From the repository root:

```sh
corepack enable
pnpm install --frozen-lockfile
```

The frozen install is the normal onboarding and CI path. Change dependencies with pnpm so the workspace lockfile remains reproducible.

## Environment

[`.env.example`](./.env.example) is the complete name-only inventory. Export relevant values in the shell or place them in ignored `apps/web/.env.local` and `apps/studio/.env.local` files. Browser-visible, server-only, Studio, build/CI, and test values remain separated; never commit credentials.

Attio setup requires `ATTIO_DEFAULT_DEAL_OWNER` and `ATTIO_DEFAULT_DEAL_STAGE` in addition to its API key. `ORVAUXE_E2E_MODE=stub` is allowed only for local/CI tests and is rejected in production. Vercel-provided variables such as `VERCEL_ENV` are not assigned in `.env.example`.

## Local Development

Run both applications and watchable packages through Turbo:

```sh
pnpm dev
```

Run one application when needed:

```sh
pnpm --filter @orvauxe/web dev
pnpm --filter @orvauxe/studio dev
```

The skeleton renders neutral development-safe output and performs no production Attio, Resend, or Turnstile business writes.

## Sanity and Type Generation

Sanity schemas are owned by `apps/studio`; named GROQ queries stay with their consuming web modules. The supported workflow extracts `apps/studio/schema.json`, scans named web queries, and generates `apps/web/src/generated/sanity.types.ts`.

```sh
pnpm typegen:sanity
pnpm typegen:check
```

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` before running these commands. Commit both generated artifacts and never edit them manually. CI regenerates them and fails on drift.

## Testing

Run repository quality checks with the landed root scripts:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm typegen:check
pnpm build
```

For the first browser-test run, install the pinned Playwright Chromium binary, build the app, then run deterministic E2E and axe smoke tests:

```sh
pnpm --filter @orvauxe/web exec playwright install chromium
pnpm build
pnpm test:e2e
```

Tests use explicit fakes/stub mode and official Turnstile testing facilities; they must not contact production vendors.

## Analytics

The event dictionary is a typed product contract. Application code imports the appropriate events, client, or server entrypoint from `@orvauxe/analytics`; it must not import PostHog SDKs or call `posthog.capture` directly. Browser initialization explicitly disables autocapture, automatic page views/page leave, session recording, heatmaps, dead-click capture, exception/performance capture, and remote collection expansion. A final event/property allowlist strips implicit URLs, referrers, campaign data, person updates, and vendor-generated events. Analytics initialization and delivery failures never invalidate an accepted business flow.

See the [analytics code contract](./docs/analytics/analytics-code-contract.md), [event dictionary](./docs/analytics/event-dictionary.md), and [privacy rules](./docs/analytics/privacy.md).

## Deployment

Vercel Git integration owns Preview and production deployments; CI does not create a duplicate deployment job. Configure two Vercel projects with separate roots and environment scopes:

- web project: `apps/web`
- Studio project: `apps/studio`

Protected `main` owns production promotion. Review the [deployment](./docs/runbooks/deployment.md) and [rollback](./docs/runbooks/rollback.md) runbooks before changing release behavior.

## Documentation

Start at the [documentation index](./docs/README.md). The primary references are the [Architecture Specification](./docs/architecture/ORVAUXE_Architecture_Specification_v1.0.md), [SKELETON_READY](./SKELETON_READY.md), accepted [ADRs](./docs/adr/), engineering standards under [`docs/engineering`](./docs/engineering/), and operational [runbooks](./docs/runbooks/).

Update documentation in the same pull request whenever behavior, ownership, environment, analytics, SEO, CMS, or operational contracts change.

## Contribution

Read [CONTRIBUTING](./CONTRIBUTING.md) before changing code. Use a short-lived branch, respect public module/package boundaries, add meaningful tests, and complete every section of the [pull-request template](./.github/pull_request_template.md). Merge requires review and green blocking checks.
