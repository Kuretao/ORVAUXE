# ORVAUXE Homepage v1.0 Report

## Status

```text
READY
```

The production Homepage implementation, documentation and required verification are complete.

## Homepage architecture

The route remains a thin server boundary:

```text
apps/web/src/app/(site)/page.tsx
  -> getHomePage()
  -> HomeScreen
```

Homepage ownership is contained in `apps/web/src/modules/home/`:

- `data/` owns the singleton GROQ query, cached getter, typed development fallback, CMS-to-domain mapper and their tests;
- `model/home-page.ts` owns the stable render model;
- `ui/` owns the eight-part composition, Home CSS Module, media adapter, component tests and one analytics leaf;
- `public.ts` is the only module entrypoint used by the route.

Supporting changes are limited to the existing Home Sanity singleton and test, generated Sanity artifacts, the Sanity image helper, the Home route, site metadata copy, the web alias/lint module lists, Playwright configuration/tests/baselines, this report and the Home ownership note in `docs/architecture/application-boundaries.md`.

No universal page builder, generic Card/Reveal abstraction, new shared layer or forbidden catch-all directory was introduced. Header and footer ownership remains unchanged.

## Final section structure

1. Hero: editorial eyebrow, one H1, compact commercial clarification and two restrained actions.
2. Editorial visual interlude: full-bleed, lazy, art-directed temporary media with a visible temporary caption.
3. Brand statement: dark chapter headed “Built to be desired. Designed to be bought.”
4. Editions introduction: concise product definition, approved starting price and index link.
5. Featured Edition: homepage-owned Edition 001 / Nocturne concept composition, never presented as client work.
6. Atelier introduction: approved bespoke positioning, six-item editorial capability list, price and one CTA.
7. Studio signal: ORVAUXE / Commerce Atelier / Chengdu · Worldwide with one international positioning sentence.
8. Final project CTA: “Have a brand worth building for?” and one Start a Project action.

The existing restrained site footer follows the final CTA; Home does not create a second footer.

## Production copy

Main production headings and labels:

- eyebrow: `ORVAUXE — DIGITAL COMMERCE STUDIO`;
- H1: `Commerce for the distinctive.` with three visual lines and one intact accessible name;
- hero clarification: `Premium Shopify storefronts for fashion, jewelry and design-led brands.`;
- statement: `Built to be desired. Designed to be bought.`;
- product headings: `Editions`, `Nocturne`, `Atelier`;
- concept labels: `Edition 001`, `Concept Edition`, `Fashion`;
- Studio signal: `ORVAUXE`, `Commerce Atelier`, `Chengdu · Worldwide`;
- final heading: `Have a brand worth building for?`.

Commercial labels use the current approved planning values: `From $2,490` for Editions and `Projects from $6,000` for Atelier. Nocturne is labelled as a concept Edition, links only to `/editions`, and is not represented as client work.

Final CTA destinations:

| CTA              | Destination        | Notes                                                  |
| ---------------- | ------------------ | ------------------------------------------------------ |
| Start a Project  | `/start-a-project` | Hero and final CTA; both use the existing typed event. |
| Explore Editions | `/editions`        | Hero, Editions introduction and featured concept.      |
| Discover Atelier | `/atelier`         | One action in the Atelier chapter.                     |

There are no Work/Journal links, testimonials, client logos, fake metrics, discounts or unsupported conversion claims.

## Sanity

- Extended the existing `homePage` singleton; no second document type or `sections[]` page builder was added.
- Added explicit, stable fields for hero copy/CTAs/media, statement, Editions, one selected Edition, Atelier, Studio signal, final CTA and SEO.
- Constrained CTA destinations and analytics IDs to the allowed route/event semantics, and constrained the selected Edition count to exactly one.
- Added one typed Home GROQ query and generated result aliases through the existing Sanity TypeGen pipeline.
- Committed `apps/studio/schema.json` and `apps/web/src/generated/sanity.types.ts`; neither is hand-edited.
- Kept the existing preview-aware `sanityFetch` path and cache tags.
- Centralized the typed development/E2E fallback in `home-page.fallback.ts`. Unconfigured local/test environments use it explicitly; a configured CMS that is unavailable or incomplete raises the existing safe `CMSReadError` path instead of silently presenting fallback marketing data as CMS content.
- Mapped Sanity crop/hotspot metadata into stable media dimensions and crop-relative `object-position`; asymmetric crop behavior has unit coverage.

## Assets

### Production assets

No new production photography, logo master or permanent OG artwork was supplied or claimed. Home reuses the approved foundation fonts, text wordmark treatment, semantic tokens and current neutral icon behavior.

### Temporary placeholders

- `home-editorial-temporary.png`: neutral 1600 × 1000 editorial placeholder, 10,878 bytes.
- `home-edition-concept-temporary.png`: neutral 1200 × 1500 concept placeholder, 11,548 bytes.

Both are explicitly marked temporary through filenames, code ownership and visible captions. They are abstract compositions rather than fake client screenshots. Raster delivery is intentional so the production build emits real responsive `sizes`/`srcset` candidates; the encoded palette is a temporary binary-asset exception and does not introduce raw colors into Home CSS.

### Still-required assets

- rights-cleared ORVAUXE editorial photography;
- final Edition 001 imagery or truthful product screenshots;
- approved outlined digital wordmark/lockup and final optical favicon/monogram;
- an approved permanent Open Graph image.

## Motion

No GSAP or other Homepage motion was added. The composition is distinctive through typography, grid, negative space, media scale and tonal chapters, so an additional client animation boundary had no justified value in v1.0.

All core content is present in server-rendered HTML in its final state. Existing token-driven hover/focus transitions remain; reduced-motion users do not encounter masks, delays, parallax or hidden content.

## Client boundaries

One new authored `"use client"` file exists:

- `TrackedHomeLink.client.tsx`: a narrow Link-compatible leaf used only by the hero and final Start a Project actions to send the approved typed `start_project_clicked` payloads.

`HomeScreen` and every narrative section remain server components. There is no motion island. `next/image` contributes framework client code but is not a new authored application boundary.

## Performance

No package manifest or lockfile dependency was added. GSAP remains an existing unused dependency and is absent from Home source/chunks.

Measured from the final production build:

| Artifact                      |      Raw |     Gzip |
| ----------------------------- | -------: | -------: |
| Incremental Home client chunk | 16,877 B |  6,345 B |
| Home-owned CSS chunk          |  8,869 B |  1,593 B |
| Prerendered Home HTML         | 47,369 B |  6,906 B |
| Home RSC payload              | 24,166 B |  4,189 B |
| Two temporary source images   | 22,426 B | 14,269 B |

The incremental Home JavaScript is comfortably below the 150 KB gzip route budget. The two existing preloaded foundation font files total 74,236 bytes, below the 180 KB initial-font budget.

Both Home media slots reserve stable ratios, use `next/image`, stay lazy, omit priority/preload and expose production `sizes`/`srcset`. During responsive QA, generated WebP variants were 1,820–6,216 bytes and the 768px featured frame selected a `w=640` candidate. CMS source width is capped at 2400px with quality 85 before Next optimization; this should be reviewed against final licensed photography.

The expected LCP is the server-rendered hero H1. Both images begin below the hero, remain lazy and are deliberately not promoted as competing LCP resources. There is no video, canvas, WebGL, preloader or scroll-jacking.

## Accessibility

Automated checks:

- axe ran on Home in both desktop Chromium and Pixel 7 projects with no serious or critical violations;
- component coverage verifies one accessible H1, logical H2/H3 structure, named sections/article, truthful links, image semantics and intact screen-reader names;
- the full Playwright suite covers the existing reduced-motion shell behavior and the new Home in both projects.

Manual production-browser review verified logical keyboard order, the visible skip link, focus transfer to `main#main-content`, a token-driven `2px` visible target outline, readable focus states across light/dark surfaces, empty alt for the decorative temporary media, caption semantics and no console errors. A 320px reflow-equivalent viewport has no horizontal overflow.

No essential content depends on motion or client-side execution.

## Responsive QA

| Viewport    | Result                                                                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 375 × 812   | Approved 4-column mobile baseline; intentional H1 lines, compact practical rhythm, legible CTAs and deliberate media crops.                                      |
| 768 × 1024  | Manually reviewed 8-column composition; asymmetric copy, CTA placement and featured media/metadata remain coherent. The visible featured image selected `w=640`. |
| 1440 × 900  | Approved 12-column desktop baseline; strong negative space, offset copy and full hero conversion path.                                                           |
| 1920 × 1080 | Approved wide baseline; page containers hold relationships while the editorial interlude remains intentionally full bleed.                                       |
| 1366 × 640  | Manually reviewed short-laptop state; header, complete H1, commercial clarification and both hero actions remain visible and usable.                             |

Automated geometry checks repeat all five target viewports and reject document/H1 horizontal overflow. A separate 320 × 800 reflow check also passed.

The final Chromium baselines are limited to the three representative states requested:

- mobile: 375 × 5408, 254,131 bytes;
- desktop: 1440 × 6712, 445,043 bytes;
- wide: 1920 × 7529, 521,137 bytes.

All three were regenerated from the same final optimized-image build, compared successfully and visually inspected for composition, typography, spacing, crop behavior and premium restraint.

## SEO

- title: `ORVAUXE — Premium Commerce for Fashion & Design-Led Brands`;
- description: `ORVAUXE creates premium Shopify storefronts for fashion, jewelry and design-led brands worldwide, combining brand expression with commerce usability.`;
- one semantic H1: `Commerce for the distinctive.`;
- canonical: `/`, resolved through the environment-aware site URL;
- truthful Organization JSON-LD retained, without ratings, reviews, awards, addresses or customer counts;
- existing production/preview/draft robots protections remain authoritative, with Sanity `seo.noIndex` respected;
- Open Graph/Twitter title, description, canonical URL, site name and type are present; no permanent OG image is invented while the approved mark/artwork is pending.

## Tests

- Home data/mapper/component tests: 12 passing tests.
- Home Sanity singleton contract: 2 passing schema tests.
- Repository unit/component suites: 74 passing tests across five tested workspaces.
- Playwright: 39 passed, 9 intentionally skipped across desktop/mobile projects (48 discovered).
- Homepage behavior: render, H1, narrative landmarks, truthful CTA navigation, no Work/Journal, console/page-error checks, responsive geometry and real optimized placeholder attributes.
- Axe: Home desktop/mobile has no serious or critical violations.
- Visual regression: three controlled Chromium baselines pass with fonts/images settled and animations disabled.

## Commands executed

All required commands ran on 2026-08-16 with Node 24.19.0 and pnpm 10.34.5.

| Command                          | Result                                                                |
| -------------------------------- | --------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | PASS — all 8 workspace projects, frozen lockfile current.             |
| `pnpm format:check`              | PASS — all matched files use Prettier style.                          |
| `pnpm typegen:check`             | PASS — 8 queries, 22 schema types, generated artifacts drift-free.    |
| `pnpm lint`                      | PASS — 5 applicable workspace tasks, zero warnings.                   |
| `pnpm typecheck`                 | PASS — 5 applicable workspace tasks; Next route types generated.      |
| `pnpm test`                      | PASS — 74 tests across tokens, analytics, Studio, UI and Web.         |
| `pnpm build`                     | PASS — Studio and Web production builds; Home prerendered statically. |
| `pnpm test:e2e`                  | PASS — 39 passed, 9 intentional project/state skips, 48 discovered.   |
| `pnpm workspace:graph`           | PASS — 87 packages represented across 8 workspace projects.           |
| `git diff --check`               | PASS — no whitespace errors.                                          |

## Architecture deviations

None.

## Remaining visual inputs

Production handoff still needs rights-cleared editorial photography, final Edition 001 media, the approved outlined digital wordmark/lockup, final favicon/monogram and a permanent OG image. Their absence is explicit and does not block the honest temporary-media Homepage implementation.

## Blockers

None.

> **Next Phase: ORVAUXE Editions & Edition 001 v1.0**
