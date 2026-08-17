# Edition Codebase Strategy

## Boundary

`Kuretao/ORVAUXE` remains the marketing, product-content and business-application repository. It may present Edition data and visual product documentation, but it does not own Shopify theme runtime source.

The Nocturne Shopify theme has a different platform, development toolchain, deployment lifecycle, client-delivery lifecycle and versioning model. Theme source must therefore live in a private Edition codebase created only after founder approval. No external repository is created in this phase.

## Options evaluated

| Option                                              | Strengths                                                                                                                                                | Risks                                                                                                                         |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| A. Dedicated private repository per Edition         | Clear product ownership and release history; narrow Shopify configuration; simple access control; failures and client work cannot affect another Edition | Shared tooling can be duplicated as more Editions appear; cross-Edition improvements need deliberate propagation              |
| B. One private Editions monorepo under `editions/*` | Centralized tooling and conventions; easier reuse across several theme products; one place for cross-Edition quality gates                               | Broader access surface; coupled CI and dependency decisions; premature abstractions before a second theme proves shared needs |

## Recommendation

Start with **Option A: one dedicated private repository for the Nocturne base Edition**.

Nocturne is the only approved theme product, so a dedicated repository creates the clearest boundary with the least speculative infrastructure. Re-evaluate a private Editions monorepo only after at least one additional Edition exists and repeated tooling or shared theme modules are demonstrated rather than assumed.

Client-specific source must remain isolated from the reusable Nocturne base. The eventual contract determines whether a client implementation receives a dedicated private delivery repository, a controlled export or another transfer model. A client implementation must never become the implicit base source of truth.

## Future repository contract

The private Nocturne repository should own:

- the Shopify theme directory structure and Liquid/JSON/CSS/JavaScript source;
- Theme Check and formatting configuration;
- development, preview and release scripts using Shopify CLI;
- representative fixture/setup guidance without production secrets or client personal data;
- theme-specific accessibility, functional, performance and visual checks;
- release notes and base Edition version history;
- merchant handoff documentation appropriate to the theme.

It must not own ORVAUXE marketing routes, Sanity marketing content, CRM/lead code or unrelated client business systems.

## Branch and release model

- `main` represents the reviewed, releasable base Edition.
- Feature/fix branches merge through review and green theme-specific checks.
- Base releases are tagged and documented as Nocturne product versions.
- Development uses a Shopify development theme; review uses a stable unpublished theme or other approved preview environment.
- Production publishing is an explicit authorized action after final QA. No CI job publishes a live client theme merely because a branch changed.
- Shopify’s GitHub theme integration may be used, but only with repository-scoped access and protected branch discipline. Because admin/editor changes can synchronize back to the connected branch, production editing ownership and reconciliation rules must be documented before connection.

Store identifiers and environment names may be configured according to Shopify CLI conventions; access tokens, Theme Access passwords and other credentials stay outside Git.

## Versioning model

### Base Edition version

The planned base version identifies the reusable product once a release passes the future theme gates:

- **Nocturne 1.0** — first commercially approved base after implementation and review.
- **Nocturne 1.1** — backward-compatible improvements, fixes or controlled capabilities.
- **Nocturne 2.0** — material design-system, template or merchant-control changes requiring migration review.

The exact release/tag syntax is established in the theme repository, but every release maps unambiguously to the human-readable product version.

### Client implementation version

Each client delivery records:

- the base Nocturne version it started from;
- a client implementation identifier/version;
- approved adaptation and add-on scope;
- launch date and delivered commit/artifact;
- any client-only changes and their support implications.

A client implementation version does not rename or silently mutate the reusable base version.

## Improvement flow

```text
Base Edition
  → client implementation
  → candidate reusable improvement identified
  → remove client-specific content and assumptions
  → product/design/engineering review
  → implement and test in the base
  → release as the next base Edition version
  → opt client implementations into an explicit upgrade where appropriate
```

Bug fixes and useful ideas are not copied blindly from client source. Reuse requires a general product case, rights to reuse, compatibility review and complete base-theme tests.

## Delivery and deployment pipeline

1. Pin the approved base Edition version and client implementation record.
2. Establish Shopify CLI development access and a development theme.
3. Apply controlled brand adaptation and approved add-ons in isolated client source.
4. Run formatting, Theme Check and theme-specific automated checks.
5. Preview with representative client products, variants, collections, cart states and content.
6. Run responsive, keyboard, accessibility, Theme Editor, performance and cross-browser QA.
7. Push a stable unpublished review theme and complete the two consolidated revision rounds.
8. Run final QA against the approved scope and recorded base/client versions.
9. Publish or support publishing only with explicit launch authority.
10. Record the delivered commit/artifact, provide handoff and start the 14-day implementation-defect window.

The pipeline uses Shopify’s native tools but does not claim a deployed environment until a store, credentials and launch approval actually exist.

## Decision checkpoint

Before theme implementation begins, the founder must approve:

- this product definition and Nocturne design DNA;
- the private repository creation and access model;
- the client implementation/transfer model;
- minimum automated and manual release gates;
- contract terms for source ownership and reuse.
