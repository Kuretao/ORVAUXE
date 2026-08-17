# Status

**READY — the Edition product definition, production marketing routes, Sanity contract, reviewed
visual baselines and every required Phase B quality gate pass on `feat/editions-nocturne-v1`.**

The branch is intentionally not merged into `main`; it remains reviewable by the founder before the
separate Shopify theme implementation phase.

# Product Definition

An ORVAUXE Edition is a curated premium Shopify storefront system with a fixed art-direction
foundation, adapted to the buyer's brand and launched as a functioning Shopify theme implementation.
It is not a downloadable template, an unrestricted custom design engagement, a commodity theme
installation or a headless build.

The base Edition product includes:

- Home, Collection, Product, Cart and Editorial/About storefront experiences;
- intentional mobile behavior across the complete system, not a separate mobile page;
- a shared announcement/header/navigation/search/footer shell where appropriate;
- controlled adaptation of approved identity, licensed typography, imagery, supplied copy, product
  and collection data, navigation, social links and permitted section ordering;
- responsive native Shopify implementation, semantic markup, native product/cart flows, JSON
  templates, constrained sections/blocks, Theme Editor controls, baseline accessibility and
  technical SEO, responsive images and practical app-block insertion points.

The base includes one primary language, one initial market configuration and one core currency/store
setup, subject to the merchant's Shopify account and platform capabilities. Brand creation,
copywriting, photography, bulk migration, advanced Markets/localization, custom apps, deep
integrations, B2B, custom checkout, headless/Hydrogen and unlimited revisions are outside the base.
Requests that preserve the Edition system can be estimated as add-ons; requests that change its art
direction, information architecture, template family, commerce logic or runtime move to Atelier
qualification.

# Commercial Baseline

| Term            | Approved baseline                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Public price    | From **$2,490**; no discount, crossed-out price or scarcity claim                                                                   |
| Delivery target | **7–10 business days from Ready to Build**                                                                                          |
| Revision policy | **2 consolidated revision rounds**                                                                                                  |
| Handoff         | Final QA, deployment/publishing support, basic merchant handoff, editable-control explanation and Edition-appropriate documentation |
| Support window  | **14 days** for reproducible implementation defects in the delivered scope                                                          |

Ready to Build begins only after scope, required payment/deposit, Shopify access, approved brand
assets and content, sufficiently ready product data, necessary in-scope credentials, approvals and a
single feedback owner are complete. Missing or replaced inputs pause the clock. A revision round is
one consolidated feedback package; it is not unlimited messages or continuous redesign.

The internal working payment baseline is 50% to schedule/start and 50% before production launch or
transfer. It is not approved public copy. Contract terms, tax treatment, refund policy and
source-ownership language still require founder/legal approval before client use.

# Editions vs Atelier

Editions and Atelier solve different problems at the same quality standard.

| Editions                                                           | Atelier                                                                           |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| Fixed underlying art direction and predefined product architecture | Bespoke art direction and custom information architecture                         |
| Controlled brand adaptation                                        | Scope-defined custom design and novel interaction systems                         |
| Repeatable delivery, from $2,490                                   | Discovery-led scope, from $6,000                                                  |
| Native Shopify theme foundation                                    | Native Shopify, headless/Hydrogen or another approved architecture when justified |
| Standard product/cart primitives and bounded integrations          | Unusual product logic, custom apps and deep integrations                          |

An Edition request becomes an add-on only when it remains isolated, estimable and compatible with
the selected product. Completely new art direction, navigation/IA, template families, custom app or
backend work, advanced subscriptions/B2B, unusual checkout, headless delivery and enterprise
integrations move to Atelier qualification.

# Shopify Architecture

Editions use native Shopify Online Store theme architecture: Liquid, JSON templates, constrained
sections and blocks, Theme Editor settings, CSS and minimal progressive JavaScript. This keeps the
product merchant-editable, quick to launch, easier to hand off and operationally appropriate for the
$2,490+ tier. Core navigation, product access, cart access and purchase paths must remain native and
server rendered.

Headless/Hydrogen is reserved for Atelier unless a future commercial Edition is explicitly approved
otherwise. Shopify app blocks are allowed only at deliberate insertion points and must not weaken
purchase hierarchy, responsiveness or accessibility.

Decision record: `docs/adr/ADR-0009-editions-native-shopify-theme.md`. Official-source register:
`docs/product/shopify-official-sources.md`.

# Nocturne

Nocturne is Edition 001 for fashion and accessories: a cinematic, fashion-editorial storefront
system built around dark materiality, deliberate campaign hierarchy, high typography contrast,
precise merchandising, restrained interaction and premium mobile commerce.

The public state remains **ORVAUXE Original · Concept Edition**. It is not represented as client
work, a completed case study or an implemented Shopify theme.

The layout/grid logic, editorial pacing, hero hierarchy, collection philosophy, product-page
structure, typography-scale relationships, transition language and responsive/mobile philosophy
stay Nocturne. Approved logo, accessible palette roles, licensed typography, supplied imagery and
copy, commerce data, merchandising and bounded theme settings may adapt. A change to the stable DNA
requires Atelier review.

Nocturne's concept status is intentionally enforced by a code-reviewed invariant. Commercializing it
as `Available` therefore requires an explicit product/page code change and review in addition to the
live Sanity content update; an editor-only status flip is not sufficient.

# Pages Implemented

- `/editions` — product definition, featured Nocturne, included experiences and technical
  foundation, adaptation model, Ready-to-Build delivery sequence, public Editions/Atelier boundary
  and project CTA.
- `/editions/nocturne` — full concept-product narrative, campaign hero, commercial/status metadata,
  Home/Collection/Product/Mobile storefront proof, design DNA, adaptation boundary, included scope,
  delivery and project CTA.
- `/start-a-project?edition=nocturne` — allowlisted Nocturne context preselects `Edition` and the
  `nocturne` slug; arbitrary query values are ignored.

Unknown Edition slugs retain the application 404 behavior. Generic future Edition data can render
through the shared detail screen while Nocturne uses its deliberately authored product screen.

# Sanity

The `edition` document now models:

- `draft`/Concept, `available` and `retired` lifecycle states;
- required Home, Collection, Product and Mobile storefront proof, with optional Cart and Editorial
  proof and uniqueness validation;
- technical foundation, design DNA, stable-system and brand-adaptation lists with item/count limits;
- starting price, Ready-to-Build delivery target, optional HTTPS demo URL, CTA and SEO;
- unique positive Edition number and required media/content constraints.

One shared GROQ projection serves index and detail reads. Public queries include Concept and
Available Editions, exclude Retired records and order by Edition number. Sitemap slugs also exclude
records marked `seo.noIndex`. The typed mapper rejects incomplete records and duplicated/missing
required storefront views.

When Sanity is unconfigured, a complete Nocturne concept fallback supports local development. When a
production Sanity configuration exists, missing/incomplete Nocturne content or a CMS read failure is
surfaced as `CMSReadError`; the website does not silently replace production content with fallback
data. Generated schema/types are updated and the final `typegen:check` reproduced 7 queries and 22
schema types without drift.

Before deployment with live Sanity enabled, the production dataset must be migrated/populated with a
complete Nocturne record matching the new required contract. This run does not modify live Sanity
data.

# Assets

No new customer-facing raster imagery or external asset dependencies were added. The pages reuse
three existing ORVAUXE original concept images:

- `apps/web/public/media/home-campaign-nocturne-temporary.webp`;
- `apps/web/public/media/editions/nocturne/nocturne-product-study-temporary.webp`;
- `apps/web/public/media/editions/nocturne/nocturne-detail-study-temporary.webp`.

The internal filenames retain `temporary`; visitor-facing copy identifies the work truthfully as an
ORVAUXE original concept and does not expose temporary/development language. Commercial delivery
still requires final approved, licensed campaign/product/editorial imagery plus the client's approved
brand assets, content and web-font licenses. Five Chromium PNGs were generated as automated visual
test baselines; they are QA artifacts, not production media.

# Motion

Motion is limited to token-driven CSS feedback on editorial CTAs: underline opacity/scale and a
small arrow translation on hover or keyboard focus. `prefers-reduced-motion: reduce` removes those
transitions. Storefront proof is static; there is no carousel, scroll hijacking, smooth-scroll
runtime, autoplay video, WebGL or GSAP use in Editions.

# Client Boundaries

The only new `"use client"` file is
`apps/web/src/modules/editions/ui/EditionAnalytics.client.tsx`, a narrow leaf for one view effect and
tracked project links. The existing `StartProjectForm.client.tsx` accepts the allowlisted initial
Edition selection but was not broadened into a new page-level client boundary.

`@/modules/editions/server` is explicitly `server-only` and owns CMS getters and server screens.
`@/modules/editions` remains the client-safe public surface for models and the shared code-native
storefront renderer. ESLint boundaries forbid client imports of the server entry point and private
cross-module deep imports. The shared `NocturneStorefront` remains server-compatible and is reused by
the locked Homepage without importing Sanity or environment code into its client component.

The final code audit found one new client file, no Editions GSAP import, no raw palette hex, no
`process.env`, direct `posthog.capture`, `console`, TODO or FIXME usage in the Editions surface, and
no visitor-visible temporary/placeholder language. A small set of raw `rem` clamps remains only
inside the code-native storefront artboard compatibility mode; product-page typography and color use
the shared semantic tokens. Internal concept-asset filenames retain `temporary` for provenance.

# SEO

- `/editions` has authored title/description, canonical URL, Open Graph and Twitter metadata.
- `/editions/nocturne` derives authored metadata and social image from the validated Edition record;
  the current concept is explicitly indexable.
- Unknown Edition metadata is `noindex`; configured records can opt out through `seo.noIndex`, and
  noindex records are excluded from the sitemap.
- The detail route emits conservative `BreadcrumbList` JSON-LD only. It intentionally does not emit
  `Product`, price, availability, aggregate-rating or review schema because Nocturne remains a
  concept service/product definition rather than a transactable Shopify listing.

# Analytics

- `edition_viewed` fires once per Edition slug from the detail-screen leaf with `edition_slug`,
  `edition_number` and `edition_category`.
- `start_project_clicked` is reused for Editions and Nocturne CTAs with typed `cta_id`,
  `cta_location` and `edition_slug` where applicable.
- `edition_demo_opened` is not emitted because no approved live demo exists.

Tracking uses the existing `@orvauxe/analytics/client` adapter; there is no direct PostHog SDK call,
hover tracking or new analytics dependency.

# Performance

- New runtime dependencies: **zero**.
- New animation/media runtimes: **zero**.
- The Nocturne hero is the only Phase B image marked eager/high priority; code-native storefront
  proof images remain lazy and provide intrinsic dimensions plus responsive `sizes`.
- Server-first route composition is preserved; the only new client JavaScript is the narrow analytics
  leaf described above.
- The strict route-over-site-layout client delta shared by `/editions` and the Edition detail route is
  one JavaScript chunk: **17,705 bytes raw / 6,571 bytes gzip**. Route CSS is **47,998 / 5,955 bytes
  gzip**. The static Editions document is **77,402 / 10,397 bytes gzip** HTML and **38,534 / 5,689
  bytes gzip** RSC.

Cold-cache local production measurements used Chromium at DPR 1, service workers blocked, network
cache disabled, a fresh context per sample and three unthrottled samples per route/viewport. These
are lab diagnostics, not field-performance claims:

| Route / viewport              | LCP samples / median | LCP element and resource                                | CLS   |
| ----------------------------- | -------------------- | ------------------------------------------------------- | ----- |
| `/editions` 375×812           | 180/180/180 ms; 180  | server-rendered H1                                      | 0/0/0 |
| `/editions` 1440×900          | 176/192/208 ms; 192  | server-rendered H1                                      | 0/0/0 |
| `/editions/nocturne` 375×812  | 100/108/360 ms; 108  | hero IMG, 640w, 9,084 transfer / 8,784 encoded bytes    | 0/0/0 |
| `/editions/nocturne` 1440×900 | 108/200/216 ms; 200  | hero IMG, 1920w, 61,868 transfer / 61,568 encoded bytes | 0/0/0 |

The Editions index emits no image preload/eager/high-priority image and requested only two nearby
lazy candidates initially. Nocturne emits exactly one image preload and one eager/high-priority hero;
six remaining images stay lazy. No initial Nocturne hero exceeded the 300 KB mobile target and no
carousel, smooth-scroll, WebGL or autoplay payload was added.

# Accessibility

The implementation uses one H1 per route, labelled semantic sections/lists, descriptive source-media
alternatives, one named `role="img"` per code-native storefront proof and decorative nested images
with empty alt text. CTAs use native links, retain the design-system minimum target and expose
hover/focus feedback. Reduced-motion behavior is defined and body scrolling is not intercepted.

Unit and E2E coverage verifies landmark/content semantics, keyboard-visible CTAs, overflow, reduced
motion and image alternatives. Axe passed for `/editions` and `/editions/nocturne` on desktop and
mobile with zero serious or critical violations. Manual review confirmed readable hierarchy,
visible focus/CTA affordances and no page-level clipping across the six required widths.

# Responsive QA

The Editions E2E suite contains composition, horizontal-overflow and runtime-error checks for all
required viewports:

| Viewport | Intended check                                  | Final result |
| -------- | ----------------------------------------------- | ------------ |
| 320      | Narrow mobile composition and overflow          | PASS         |
| 375      | Mobile baseline, copy, CTA and storefront proof | PASS         |
| 768      | Tablet composition and overflow                 | PASS         |
| 1366×640 | Short-height desktop reachability and overflow  | PASS         |
| 1440     | Desktop baselines and complete narrative        | PASS         |
| 1920     | Wide Nocturne baseline and capped composition   | PASS         |

Five persistent Chromium baselines were regenerated, manually inspected and then passed a no-update
comparison under `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/`:

- `editions-mobile-375-chromium.png` — 375×10030, 616,335 bytes;
- `editions-desktop-1440-chromium.png` — 1440×8744, 1,860,869 bytes;
- `nocturne-mobile-375-chromium.png` — 375×7620, 718,745 bytes;
- `nocturne-desktop-1440-chromium.png` — 1440×7931, 2,434,644 bytes;
- `nocturne-wide-1920-chromium.png` — 1920×8430, 2,804,983 bytes.

Temporary full-page review captures also covered 320, 768 and 1366×640 for both routes. They were
inspected together with the five baseline widths, then removed before commit; they are not product
or repository assets.

# Tests

Required final Phase B gates, executed with Node 24.19.0 and pnpm 10.34.5:

- `pnpm format:check` — **PASS**;
- `pnpm typegen:check` — **PASS**, 7 queries / 22 schema types, no drift;
- `pnpm lint` — **PASS**, 5 workspace lint tasks, zero warnings;
- `pnpm typecheck` — **PASS**, 5 workspace typecheck tasks;
- `pnpm test` — **PASS**, 111 tests (73 web, 9 Studio, 12 UI, 11 analytics, 6 tokens);
- `pnpm build` — **PASS**, Studio and Web production builds; local Studio build used documented
  non-production placeholder project/dataset identifiers and contacted no live Sanity dataset;
- `pnpm test:e2e` — **PASS**, 73 passed / 25 intentionally skipped registrations;
- `pnpm workspace:graph` — **PASS**, 87 packages in 8 projects;
- `git diff --check` — **PASS**.

# Architecture Deviations

None. An independent final audit found no code, module-boundary, SEO/data, accessibility or
architecture blocker. The work remains inside the approved route/module/Sanity boundaries,
introduces no new package or runtime dependency, and formalizes the client-safe public/server-only
Editions split.

# Shopify Theme Implementation

**The Nocturne Shopify theme itself has NOT yet been implemented.** This phase defines the Edition
product and builds its ORVAUXE marketing pages only; it does not contain Liquid theme source, a live
demo, a Shopify development theme or a production deployment.

The recommended next codebase is a dedicated private Nocturne base-theme repository. Its `main`
should represent the reviewed releasable base, with feature/fix branches, tagged base releases,
Shopify CLI development themes, Theme Check and theme-specific functional/accessibility/performance
gates. Each client implementation should record the pinned base version and approved adaptation in
an isolated private repository or protected delivery branch. Credentials remain outside Git;
publishing a live theme requires explicit authority and never occurs merely because a branch changed.

# Remaining Decisions / Inputs

- Founder approval of the Edition product definition, Nocturne design DNA and Editions/Atelier
  boundary.
- Founder/legal approval of contract, payment, tax/refund and theme source ownership/reuse terms.
- Approval to create the dedicated private Nocturne theme repository and its client-transfer model.
- Complete production Sanity Nocturne content migrated to the new required schema before deployment
  with live CMS configuration.
- Final approved/licensed campaign, product, editorial and typography assets for commercial use.

# Next Phase

After founder approval, begin exactly one next phase: **Nocturne Shopify Theme v1.0 foundation in a
new approved private repository**, implementing the native Liquid/JSON-template/section architecture
and its release gates. Do not begin client adaptation or production-store publishing in that phase.
