# ADR-0009 — Native Shopify Theme Architecture for Editions

## Context

ORVAUXE Editions is a productized storefront offer with a fixed art-direction foundation, controlled brand adaptation, a starting price of $2,490 and a target delivery window of 7–10 business days from Ready to Build. The implementation needs to be merchant-editable, reusable, straightforward to hand off and economical to maintain.

The current ORVAUXE repository is a Next.js marketing and business application. It presents Editions, but it is not the runtime for a merchant’s Edition storefront. The storefront architecture therefore needs an explicit boundary before Nocturne theme development begins.

Official Shopify documentation confirms that Online Store themes natively compose Liquid layouts, JSON templates, sections, blocks, settings, CSS and JavaScript; Shopify CLI, development themes, Theme Check and optional GitHub integration support their delivery workflow. The reviewed sources are recorded in [Shopify Official Sources for Editions v1](../product/shopify-official-sources.md).

## Decision

ORVAUXE Editions v1 will use native Shopify Online Store theme architecture:

- Liquid and semantic HTML for server-rendered storefront markup and Shopify commerce primitives;
- JSON templates for page composition;
- a deliberately constrained vocabulary of sections, theme/section blocks and settings;
- CSS for layout, art direction and the majority of interaction states;
- minimal progressive JavaScript only for behavior that HTML, Liquid and CSS cannot provide cleanly;
- native Shopify product, collection and cart flows;
- app blocks only in intentionally supported, resilient insertion points;
- Shopify CLI development themes, Theme Check and reviewed deployment/publishing procedures.

Nocturne is not a Next.js headless storefront and is not a Hydrogen storefront. Headless or Hydrogen implementations belong to ORVAUXE Atelier unless a future commercial Edition is explicitly approved with a different architecture.

The reusable Nocturne theme source will not live in the `Kuretao/ORVAUXE` marketing repository. Its future private codebase is defined in [Edition Codebase Strategy](../product/edition-codebase-strategy.md); no external repository or theme source is created by this decision.

## Alternatives

### Next.js headless storefront

Rejected for Editions v1. It would add hosting, storefront API, caching, preview, deployment and handoff complexity that conflicts with a repeatable $2,490+ offer. It remains valid Atelier scope when a project genuinely needs bespoke architecture.

### Hydrogen storefront

Rejected for Editions v1 for the same product-boundary reasons. Hydrogen is a credible Shopify headless option, but the Edition promise does not require a headless runtime.

### Third-party theme installation with cosmetic setup

Rejected because it would not create a controlled ORVAUXE product foundation or a consistent Nocturne design system.

### Unrestricted bespoke native theme per client

Rejected as the Edition baseline because unlimited structural variation destroys repeatability, delivery predictability and the distinction between Editions and Atelier.

## Consequences

- Merchants receive a functioning Shopify theme implementation that works with native Theme Editor and commerce concepts.
- ORVAUXE can keep a stable base Edition version separate from client adaptations and reuse reviewed improvements.
- The product can prioritize operational simplicity, handoff and low client-side runtime cost.
- Merchant controls must be intentionally limited; not every layout, component or interaction becomes configurable.
- Theme-specific development, QA, deployment access and versioning require a separate private codebase and Shopify environment.
- App compatibility is evaluated per insertion point. The baseline does not promise configuration of every third-party app.
- Performance, accessibility and cross-browser quality must be measured on the implemented theme and representative store data; the architecture alone does not prove them.
- Requests for bespoke art direction, new template families, headless delivery or deep integrations escalate to an add-on or Atelier.

## Status

Accepted.

## Date

2026-08-17.
