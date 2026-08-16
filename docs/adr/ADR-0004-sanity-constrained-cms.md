# ADR-0004 — Sanity as a Constrained CMS

## Status

Accepted.

## Context

ORVAUXE needs editable editorial content without allowing arbitrary layouts to erode art direction, accessibility or performance. Planning Package v1.1 explored a broader page/module model; the final launch routes and content evidence are narrower.

## Decision

Use explicit Sanity documents:

- siteSettings, homePage, atelierPage, studioPage;
- edition and legalPage.

Reusable objects begin with seo, cta and imageWithAlt. Code owns layout, composition, responsive behavior and motion. No generic page sections[] builder exists.

Sanity TypeGen generates web query-result types. Schemas live in Studio; queries live with consuming domains; the client lives in web infrastructure.

## Alternatives considered

- Generic page builder: flexible but creates uncontrolled combinations and testing burden.
- Hard-coded content: protects layout but makes routine editorial work dependent on engineering.
- Broad future schemas now: creates empty models and false product promises.

## Consequences

Editors have safe, explicit fields and cannot redesign the website. New layout needs require code and design review. Work, Journal, testimonials, FAQ and case studies are added only when real requirements exist. Schema changes require regeneration and migration review.

## Date

2026-08-16.

