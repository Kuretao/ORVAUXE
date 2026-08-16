# ADR-0001 — pnpm and Turborepo Monorepo

## Status

Accepted.

## Context

ORVAUXE has two deployable applications and five stable shared/platform boundaries. Website, Studio, design tokens, UI primitives, analytics contracts and configuration policy must evolve together. Planning Package v1.1 proposed a monorepo but deferred the final choice.

## Decision

Use one private pnpm workspace orchestrated by Turborepo.

Workspace applications:

- @orvauxe/web;
- @orvauxe/studio.

Workspace packages:

- @orvauxe/tokens;
- @orvauxe/ui;
- @orvauxe/analytics;
- @orvauxe/eslint-config;
- @orvauxe/typescript-config.

Internal dependencies use workspace:*. One root pnpm-lock.yaml is authoritative. Turbo owns dev, lint, typecheck, test and build task orchestration/caching.

## Alternatives considered

- Separate repositories: increases coordination and duplicates contracts before independent release needs exist.
- pnpm workspace without Turbo: viable but loses explicit task graph/caching that benefits two apps and CI.
- npm/Yarn workspace: capable, but pnpm is approved and its strict dependency/linking behavior is desirable.
- More packages: rejected without stable owners.

## Consequences

Contracts change atomically and CI can target affected work. Contributors must understand package boundaries and Turbo environment hashing. Cycles are prohibited. The monorepo is not permission to extract every shared function.

## Date

2026-08-16.

