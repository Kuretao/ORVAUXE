# ORVAUXE Overnight Run

## Overall Status

**COMPLETE — Homepage v1.2 is locked, merged and pushed to `main`; Editions / Nocturne v1.0 is
implemented, tested, documented and pushed on its separate founder-review branch.**

## Phase A — Homepage

- Status: **COMPLETE**.
- Final commit: `d5fc5d5616162d930ba26549da429ff2234be7c9` (`fix: finalize homepage v1.2`).
- Test results: Phase A final gates **PASS** as recorded in `HOME_LOCK_REPORT_v1.2.md` — frozen
  install, format, typegen, lint, typecheck, 84/84 tests, production build, 54 passed plus 16
  intentionally skipped E2E registrations, workspace graph, diff check and manually reviewed visual
  baselines.
- Homepage LOCKED?: **Yes — LOCKED v1.2.**
- Merge into main?: **Yes — fast-forwarded safely.**
- Push to origin?: **Yes.**
- Current main commit: `d5fc5d5616162d930ba26549da429ff2234be7c9`; local `main` and
  `origin/main` were verified at this commit before Phase B began.

## Phase B — Editions / Nocturne

- Status: **READY for founder review**.
- Branch: `feat/editions-nocturne-v1`, created from updated main.
- Commits:
  - `752697d6b5558a12dd9278e8c85ced08be2c6a95` —
    `docs: define ORVAUXE Editions product model`;
  - `a66ef80fe9b90305861ccf9e4c07370fb87e442a` —
    `feat: build Editions and Nocturne product pages`;
  - the branch-tip handoff commit containing this report — `docs: record overnight handoff`.
- Push status: **pushed safely without force** to `origin/feat/editions-nocturne-v1`, including the
  final report commit.
- Merge into main?: **No.** This branch remains isolated for founder review as required.

## What Was Built

- A documented Editions product, commercial boundary, client-readiness model, Nocturne definition,
  native Shopify decision, codebase/release strategy and formula-only unit-economics template.
- Production marketing routes for `/editions` and `/editions/nocturne`, including honest Concept
  Edition positioning, storefront-system proof and a contextual Start a Project path.
- A typed Sanity Edition contract, unified query/mapping layer, strict production-CMS failure behavior,
  deterministic local/E2E fallback and indexability-aware sitemap behavior.
- A shared code-native Nocturne storefront renderer used by Editions and the locked Homepage, with a
  server/client-safe Editions public surface.
- Typed analytics leaves, metadata, canonical/social output, conservative breadcrumb structured data,
  accessibility/responsive coverage and five Phase B visual baselines.

## Product Decisions

- An Edition is a curated premium Shopify storefront system with fixed art-direction DNA and
  controlled brand adaptation; it is not a downloadable template or unrestricted custom project.
- Public baseline: from **$2,490**, **7–10 business days from Ready to Build**, two consolidated
  revision rounds and a 14-day delivered-implementation defect window.
- The base covers Home, Collection, Product, Cart, Editorial/About and intentional mobile behavior;
  one primary language, one initial market and one core currency/store setup.
- Scope that preserves the product may be an add-on; new art direction, architecture, commerce logic,
  headless delivery or deep integration moves to Atelier.
- Nocturne is Edition 001 for fashion/accessories and remains an **ORVAUXE Original · Concept
  Edition**, never represented as client work or a completed Shopify theme.
- Nocturne commercialization is a code-reviewed product decision: moving from Concept to Available
  requires an explicit code/page update as well as the CMS record change.
- No discounts, fabricated comparison prices, scarcity tactics, review claims or transactable Product
  schema were introduced.

## Shopify Decision

**Editions use native Shopify theme architecture:** Shopify Online Store, Liquid, JSON templates,
constrained sections/blocks, Theme Editor controls, CSS and minimal progressive JavaScript.

**Headless/Hydrogen is reserved for Atelier unless explicitly approved later.** This choice protects
merchant editability, launch speed, handoff quality, operational simplicity and the economics of the
$2,490+ Edition tier.

The Nocturne Shopify theme has **not** been implemented. The recommended future home is a dedicated
private base-theme repository with tagged releases and isolated, version-pinned client
implementations.

## Visual Review Artifacts

Phase A locked baselines:

- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-mobile-375-chromium.png`;
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-short-laptop-1366x640-chromium.png`;
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-desktop-1440-chromium.png`;
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-wide-1920-chromium.png`.

Phase B baselines regenerated, manually accepted and passed by the final no-update E2E run:

- `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/editions-mobile-375-chromium.png`;
- `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/editions-desktop-1440-chromium.png`;
- `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/nocturne-mobile-375-chromium.png`;
- `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/nocturne-desktop-1440-chromium.png`;
- `apps/web/tests/e2e/editions.visual.spec.ts-snapshots/nocturne-wide-1920-chromium.png`.

Temporary full-page review captures were created at these exact paths, inspected, then sent to the
Windows Recycle Bin before commit:

- `output/playwright/review-editions-320.png`;
- `output/playwright/review-nocturne-320.png`;
- `output/playwright/review-editions-mobile-375.png`;
- `output/playwright/review-nocturne-mobile-375.png`;
- `output/playwright/review-editions-tablet-768.png`;
- `output/playwright/review-nocturne-tablet-768.png`;
- `output/playwright/review-editions-short-laptop-1366x640.png`;
- `output/playwright/review-nocturne-short-laptop-1366x640.png`;
- `output/playwright/review-editions-desktop-1440.png`;
- `output/playwright/review-nocturne-desktop-1440.png`;
- `output/playwright/review-nocturne-wide-1920.png`.

The reviewed routes had no document overflow, broken media or accidental clipping at 320, 375, 768,
1366×640, 1440 or 1920. The five persistent Phase B PNGs remain in the repository; transient CLI,
test-result and diagnostic output does not.

## Quality Gates

Phase A results are final and recorded in `HOME_LOCK_REPORT_v1.2.md`.

Phase B final commands were executed with Node 24.19.0 and pnpm 10.34.5:

| Command                | Result                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `pnpm format:check`    | **PASS**                                                      |
| `pnpm typegen:check`   | **PASS** — 7 queries / 22 schema types, no drift              |
| `pnpm lint`            | **PASS** — 5 workspace tasks, zero warnings                   |
| `pnpm typecheck`       | **PASS** — 5 workspace tasks                                  |
| `pnpm test`            | **PASS** — 111 tests                                          |
| `pnpm build`           | **PASS** — Web + Studio production builds                     |
| `pnpm test:e2e`        | **PASS** — 73 passed / 25 intentionally skipped registrations |
| `pnpm workspace:graph` | **PASS** — 87 packages in 8 projects                          |
| `git diff --check`     | **PASS**                                                      |

The Studio build/typegen used documented non-production placeholder project/dataset identifiers;
no live Sanity dataset was read or changed. Cold-context production lab checks also recorded zero
CLS in 12 samples, median LCP of 180/192 ms for the Editions H1 and 108/200 ms for the Nocturne hero
at 375/1440 respectively, with zero new runtime dependencies.

## Git State

- Current branch: `feat/editions-nocturne-v1`.
- Phase B implementation commit: `a66ef80fe9b90305861ccf9e4c07370fb87e442a`.
- Main status: local `main` and `origin/main` verified at `d5fc5d5`; Phase B is not merged into main.
- Working-tree status: **clean after the branch-tip report commit**.
- Remote push status: **`origin/feat/editions-nocturne-v1` updated by non-force push through the
  final report commit**.
- History policy: no force-push, shared-history rewrite or automatic Phase B merge.

## External Inputs Still Needed

- Founder approval of the Edition definition, Nocturne design DNA, commercial boundary and the next
  Shopify implementation phase.
- Founder/legal approval of contract, payment, tax/refund and source ownership/reuse terms.
- Approval to create a dedicated private Nocturne theme repository and select its client
  implementation/transfer model.
- A complete production Nocturne record populated in live Sanity under the expanded required schema
  before deploying the marketing routes with live CMS configuration.
- Final approved/licensed campaign, product, editorial and typography/brand assets for commercial
  release.

No live Shopify credentials are required for this definition/marketing phase. No live Shopify store,
Sanity dataset or other external production service was modified.

## Blockers

**None.** The required work is complete. Remaining items below require founder/legal approval or
production content/assets and are inputs for a future phase, not blockers to this review branch.

## Morning Review Order

1. Open `EDITIONS_NOCTURNE_REPORT_v1.0.md` and approve the Edition commercial/product boundary.
2. Review `/editions` and `/editions/nocturne` at the desktop and mobile baselines, with particular
   attention to Nocturne's Concept Edition honesty and storefront proof.
3. Review ADR-0009 plus `docs/product/edition-001-nocturne.md` and
   `docs/product/edition-codebase-strategy.md`; confirm native Shopify and the private-repository
   model.
4. Inspect the final Phase B gate table and Git state, then decide whether to approve the branch and
   authorize the separate **Nocturne Shopify Theme v1.0 foundation** in a new private repository.
