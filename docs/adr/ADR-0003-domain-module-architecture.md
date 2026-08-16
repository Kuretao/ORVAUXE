# ADR-0003 — Domain-Oriented Web Modules

## Status

Accepted.

## Context

Generic top-level components, hooks, services and utils directories obscure ownership as applications grow. ORVAUXE has clear launch capabilities: Editions, Atelier, Studio and Project Inquiry.

## Decision

apps/web/src/modules is organized by business capability. Each module contains only needed ui, data, model, application, actions or narrowly named local folders. Cross-boundary imports use public.ts; internals use relative imports.

app owns routes/composition. infrastructure owns vendors. packages own only stable cross-application concerns.

The closest-ownership rule applies: code remains beside its component/capability until demonstrated reuse and stability justify movement.

## Alternatives considered

- Global components/hooks/services folders: easy initially, but mix domains and vendor concerns.
- Full feature-sliced/entities/widgets methodology: more taxonomy than current product requires.
- Package per domain: creates publication/configuration overhead without multi-app reuse.

## Consequences

New contributors can answer where code belongs through product language. Boundary linting is required. Some local duplication is accepted until a real common abstraction appears. Adding a new domain requires a product capability, not a folder preference.

## Date

2026-08-16.

