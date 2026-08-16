# Contributing to ORVAUXE

ORVAUXE uses a server-first, domain-oriented pnpm monorepo. Keep changes small, place code with its owner, and update tests and documentation with the behavior they describe.

## Prerequisites and local setup

Use the Node.js range and exact pnpm version declared in the root `package.json`.

```sh
corepack enable
pnpm install --frozen-lockfile
```

Use `.env.example` as the inventory, then export the relevant values in your shell or place them in ignored `apps/web/.env.local` and `apps/studio/.env.local` files. Provide only safe local or test credentials, then start the workspace:

```sh
pnpm dev
```

Never commit `.env.local` or any credential. See [Environment Strategy](./docs/engineering/environment-strategy.md) for environment ownership and validation rules.

## Short-lived branch and trunk policy

`main` is the protected trunk. Branch from an up-to-date `main`, keep the branch short-lived, and merge only through a reviewed pull request with green required checks. Do not mix unrelated refactors into a feature or fix.

Use a descriptive branch such as:

- `feat/edition-gallery`
- `fix/project-form-validation`
- `chore/update-sanity-types`

## Code, naming, and import boundaries

- Routes own routing, metadata, not-found/error decisions, page orchestration, and composition. Domain implementation belongs in the owning module.
- Import another web module only through its `public.ts` API, for example `@/modules/editions`. Do not deep-import another module's internals.
- Vendor clients and adapters belong under `apps/web/src/infrastructure`; infrastructure must not import domain UI or module internals.
- Shared packages must not import applications. `@orvauxe/ui` remains application-independent, `@orvauxe/tokens` has no React dependency, and analytics SDK access remains inside `@orvauxe/analytics`.
- Prefer explicit owned files over mixed-purpose `utils`, `helpers`, `common`, `shared`, `services`, or `components` dumping grounds.
- Use kebab-case for folders and ordinary source files, PascalCase for React component files and exported types, camelCase for functions/values, and the approved `.client.tsx`, `.server.ts`, `.query.ts`, `.action.ts`, `.test.ts(x)`, and `.spec.ts` suffixes where they communicate a boundary.
- Follow [Naming Conventions](./docs/engineering/naming-conventions.md), [Import Rules](./docs/engineering/import-rules.md), and [Dependency Rules](./docs/architecture/dependency-rules.md).

## Server/client boundaries and secret safety

Server Components are the default. Add `"use client"` only at the smallest browser-interactive boundary, and never import server-only modules through that boundary.

Read browser-safe configuration through the client environment module and privileged configuration through the server-only environment module. Do not scatter `process.env` reads or use non-null assertions for environment values. Attio, Resend, Sanity preview, Turnstile secret, and other privileged credentials must never enter client code, analytics events, logs, screenshots, fixtures, issues, or pull requests.

## Testing expectations

Add or update the narrowest meaningful test whenever behavior changes:

- unit tests for pure contracts, mapping, validation, and configuration;
- component tests for accessible interaction and rendering behavior;
- application tests with explicit fake ports for project-inquiry orchestration;
- deterministic Playwright and axe coverage for changed critical user flows.

Tests must not contact production Sanity, Attio, Resend, Turnstile, PostHog, or Sentry. Use the approved stubs and official Turnstile testing facilities.

Run the relevant checks before requesting review; for a repository-wide change, run:

```sh
pnpm format:check
pnpm typegen:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Report what actually ran and any skipped check in the pull request.

## Accessibility, analytics, SEO, and CMS impact

Every pull request must assess these areas, even when the result is “not applicable” with a reason.

- Accessibility: preserve semantic HTML, keyboard operation, visible focus, reduced-motion behavior, labels, and WCAG 2.2 AA expectations.
- Analytics: emit only events and properties declared by `@orvauxe/analytics`; never call PostHog directly or send PII/free text.
- SEO: review metadata, canonical, indexing, sitemap, structured-data, and route implications when content or routing changes.
- CMS: keep GROQ queries with the consuming domain, keep schema changes constrained, and regenerate committed Sanity schema/types after schema or named-query changes.

## PR and CI rules

Complete every section of the pull-request template. Add screenshots or a Preview link for visual changes; otherwise mark the field not applicable and explain why. Identify context, test evidence, accessibility, analytics, SEO, CMS, architecture, migration, and documentation impact.

CI installs with the frozen pnpm lockfile, checks Sanity schema/type drift, then runs lint, typecheck, unit/component tests, production builds, deterministic E2E, and axe smoke coverage. Vercel Git integration owns Preview deployments; this repository does not duplicate deployment in CI.

Merge requires green blocking checks and at least one review. Architecture-boundary changes need architecture-owner review; approved visual-baseline changes need design review. Do not weaken or skip a required check to make a pull request pass.

## When to create an ADR

Create an ADR when a decision changes durable system boundaries, dependency direction, persistent data ownership, security posture, deployment model, integration ownership, or long-term contributor workflow. Record the context, considered options, decision, and consequences under `docs/adr/`.

Routine local implementation choices do not need an ADR. If the proposed solution conflicts with an accepted specification or ADR, resolve that conflict explicitly before implementation.

## Documentation and generated-file updates

Update documentation in the same pull request when behavior, ownership, environment variables, operational steps, analytics, SEO, or CMS contracts change. Keep [the documentation index](./docs/README.md) accurate.

Regenerate `apps/studio/schema.json` and `apps/web/src/generated/sanity.types.ts` through the repository type-generation commands and commit the resulting drift. Never edit generated files manually. Update the lockfile only through pnpm.

## Commit policy

Write concise, imperative commit messages that describe the change. No ceremonial or enforced commit-message format is required; clarity and a reviewable history are.
