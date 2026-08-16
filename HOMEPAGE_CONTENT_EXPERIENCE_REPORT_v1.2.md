# ORVAUXE Homepage Content & Experience Expansion v1.2 Report

## Status

READY — the expanded Homepage, production build, automated checks, responsive review and visual baselines pass. v1.2 is ready to replace the previous Homepage implementation.

## Problem addressed

Homepage v1.1 established the visual identity and campaign Hero, but the experience became too sparse after the opening: the Point of View occupied too much empty space, product proof was limited, and Atelier and Studio were mostly textual. v1.2 extends the page through new visual and commercial information rather than more generic agency prose. It shows what ORVAUXE builds, turns Nocturne into a coherent concept product, explains the included storefront system, and gives the bespoke offer, process and studio origin distinct visual roles.

## Final Homepage structure

The server-rendered `HomeScreen` owns one `<main>` and composes ten explicit sections in this order:

1. Campaign Hero
2. Point of View
3. What We Build
4. Editions introduction
5. Edition 001 — Nocturne showcase
6. Storefront System
7. Atelier
8. Process
9. Studio
10. Final CTA

There is no generic section renderer, page-builder array, Work route, Journal route, testimonial, client-logo strip, fake metric or unapproved Nocturne detail route.

## New content

### What We Build

The section combines an offer statement, exactly three capability signals, and a code-native paired desktop/mobile storefront composition. It answers what ORVAUXE produces before the visitor reaches the product line.

### Nocturne showcase

The page now presents Edition 001 as an ORVAUXE Original concept for fashion: campaign image, approved identity and status, Shopify platform, code-native product view, product-material image and macro detail. The page links to the implemented `/editions` index and does not invent `/editions/nocturne` before that route is ready.

### Storefront System

Six ordered views explain the included system: Home, Collection, Product, Cart, Editorial and Mobile. Tall desktop uses native page scroll with a sticky preview and IntersectionObserver state enhancement. Tablet, mobile, reduced-motion and short-height desktop use a native horizontal scroll-snap rail. Neither mode locks page scroll or intercepts the wheel.

### Process

Four ruled stages—Direction, Adaptation, Build and Launch—replace generic process cards and reduce uncertainty with one concise sentence per stage.

### Studio

Studio now pairs the Chengdu · Worldwide identity with a restrained architectural study and explicitly describes the image as a study, not documentary proof of a real ORVAUXE premises.

## Product proof

### Final implementation

- semantic HTML/CSS storefront compositions for Home, Collection, Product, Cart, Editorial and Mobile;
- responsive compositions, captions, metadata, focus states and native scrolling behavior;
- one typed local storefront-stage source reused by What We Build, Nocturne and Storefront System;
- framework-owned responsive image optimization with fixed aspect-ratio containers.

### Concept content

- Nocturne / Edition 001 is explicitly labelled `Concept Edition / ORVAUXE Original`;
- simulated commerce labels and product views are non-interactive presentation content, not a claim about a shipped client store;
- the architecture image is described as an architectural study, not a factual Chengdu location.

### Temporary raster inputs

- `apps/web/public/media/editions/nocturne/nocturne-product-study-temporary.webp` — 1536×1024, 150,460 bytes;
- `apps/web/public/media/editions/nocturne/nocturne-detail-study-temporary.webp` — 1536×1024, 138,836 bytes;
- `apps/web/public/media/studio/studio-architecture-study-temporary.webp` — 1536×1024, 80,642 bytes;
- the v1.1 campaign and Atelier temporary media remain in use until approved production photography is supplied.

The three new raster studies were generated as original photographic inputs and then converted locally to WebP at quality 82. No external logo, person, product branding, landmark or copied interface is present. Temporary provenance remains internal; no visitor-facing development label appears.

### Image-generation record

Generation mode was text-to-image; no supplied or repository image was edited. The original PNG outputs remain outside the repository under `C:\Users\bogda\.codex\generated_images\01a00afd-f1c8-78e3-9e3e-39d718076a39\` and were reviewed before their three WebP derivatives were admitted to the repository.

`exec-d6a6b438-3366-49b7-a35b-139235b534f0.png` → `nocturne-product-study-temporary.webp`:

```text
Create one original, rights-clearable high-fashion ecommerce product photograph for the fictional ORVAUXE Original concept “Nocturne”. Landscape 3:2 composition, editorial studio photography, a sculptural black silk garment and precise brushed silver hardware arranged on an Atelier Ivory stone surface, deep ORVAUXE Black shadows, subtle Bone tonal transition, rare restrained Oxblood thread detail under 3% of frame. Cinematic side light, tactile fabric weave, premium fashion catalogue realism, quiet negative space, crisp enough to crop into desktop storefront, collection grid, PDP, and mobile frames. No person, no mannequin, no logo, no lettering, no recognizable brand, no packaging, no UI, no border, no watermark. Keep the subject materially plausible and the palette strictly near-black, ivory, bone, graphite, brushed silver, with only the tiny oxblood accent. Output a single clean landscape photograph, not a collage or mockup.
```

`exec-7b24d174-07a8-4683-86e4-1c52dbe2b4df.png` → `studio-architecture-study-temporary.webp`:

```text
Create one original, rights-clearable contemporary Chengdu-origin architectural photograph for ORVAUXE’s Studio section. Landscape 3:2, quiet editorial night-to-dusk study of modern concrete planes, dark glass, a narrow reflecting pool or rain-slick pavement, precise geometric shadows and soft interior ivory light. The location should feel plausible for contemporary Chengdu but contain no identifiable landmark, no skyline cliché, no pandas, no neon-China trope, no tourist motif, no signs, no lettering, no logos, no people, no vehicles. Premium fashion-house art direction, restrained ORVAUXE palette: deep black, graphite, bone concrete, atelier ivory highlights, a nearly imperceptible oxblood reflection. Strong horizontal composition with calm negative space suitable for a wide full-bleed web crop and a narrower mobile crop. Photorealistic, subtle film grain, architectural detail, no border, no watermark, not a collage.
```

`exec-123d5a1e-77e3-4a6e-9964-a0e86faf6652.png` → `nocturne-detail-study-temporary.webp`:

```text
Create one original, rights-clearable macro fashion-material photograph that belongs to the same fictional ORVAUXE Original “Nocturne” collection as a sculptural black silk garment with brushed silver hardware. Landscape 3:2, extreme close detail of a precise black silk/leather seam crossing a brushed steel clasp plane, with a smoked-glass reflection and one very restrained oxblood stitch at the edge. Cinematic hard side light, tactile weave and machining detail, premium fashion product realism, deep black and graphite with bone/ivory reflection. Center-safe composition that can crop cleanly to a wide 2.2:1 ecommerce detail strip and to a narrow mobile crop. No person, no hand, no mannequin, no logo, no lettering, no recognizable brand, no packaging, no UI, no border, no watermark. Single photograph, not a collage or mockup.
```

## Nocturne reuse

The Edition document remains the sole CMS source for Nocturne identity, number, category, status, price, introduction, hero and typed storefront media. Shopify is a code-owned product invariant while only that platform is supported; it is not a CMS field. `StorefrontViewKind`, normalized `storefrontViews` and the typed media records are reusable inputs for the future Edition 001 page. The six-stage taxonomy and `NocturneStorefront` currently remain private to Home: their implementation is deliberately portable, but the next phase must move them into Editions ownership or expose an approved public contract instead of cross-module importing Home internals.

The Home CMS contract is deliberately constrained to draft Edition 001 with slug `nocturne`. Studio filters that reference, TypeGen includes the slug, the mapper rejects any mismatched name/slug/number/category/status, and the Home model exposes literal Nocturne identity fields. This prevents another Edition from being combined with Nocturne-specific art direction.

## Sanity

### `homePage`

- added required `whatWeBuildHeading`, `whatWeBuildIntroduction` and exactly three unique `whatWeBuildSignals`;
- added required `processHeading` and exactly four constrained `processSteps`;
- added optional `studioMedia`;
- retained and reused `atelierCampaignMedia`;
- retained legacy `editionsPrice` for migration safety, but the query no longer consumes it;
- constrained the single `selectedEditions` reference to draft Edition 001 — Nocturne.

### `edition`

- added required `storefrontViews`, four to six unique controlled entries;
- required kinds: Home, Collection, Product and Mobile;
- optional additional kinds: Cart and Editorial;
- each entry owns required `imageWithAlt` media;
- Homepage price now comes from Edition `startingPrice`;
- unapproved launch timing is neither queried nor displayed.

Schema extraction and TypeGen produce 22 schema types and eight named query results. Generated `schema.json` and `sanity.types.ts` remain committed artifacts. Configured CMS content fails through the existing `CMSReadError` path when the new required narrative or Nocturne storefront proof is incomplete; it never mixes partial CMS data with the local fallback.

## Motion

1. Campaign state transition: responds only to deliberate Prev/Next selection or pointer preview; there is no autoplay.
2. Nocturne campaign-to-storefront matte reveal: connects art direction to commerce proof as the product view enters.
3. Storefront System preview change: a 320 ms state transition clarifies the selected stage on tall desktop.
4. Process rule progression: marks reading progress without hiding the stage content.

All essential content exists without animation. Reduced-motion disables masks, transitions and process animation, uses the native System rail, and leaves every stage reachable.

## Client boundaries

The only new client component is `HomeStorefrontSystem.client.tsx`, limited to IntersectionObserver state and deliberate stage selection. Existing islands remain:

- `HomeCampaign.client.tsx` for the manual campaign;
- `TrackedHomeLink.client.tsx` for the two approved Start Project events.

`HomeScreen`, What We Build, Editions, Nocturne, Atelier, Process and Studio remain server components. No giant Homepage client controller was introduced.

## Performance

### Dependencies and JavaScript

- new runtime dependencies: zero;
- GSAP imports in the Homepage: zero;
- existing `gsap` manifest dependency was not used or expanded;
- strict Home-over-site-layout client JavaScript: 40,446 bytes raw / 11,615 bytes gzip, a v1.1 delta of +15,075 / +3,287 bytes;
- Home route CSS: 39,957 bytes raw / 5,402 bytes gzip, a v1.1 delta of +24,714 / +2,668 bytes;
- prerendered `index.html`: 122,077 / 13,639 bytes raw/gzip, a v1.1 delta of +70,857 / +6,123 bytes;
- prerendered `index.rsc`: 42,815 / 6,476 bytes raw/gzip, a v1.1 delta of +19,087 / +2,111 bytes;
- target budget: 150 KB gzip first-party route JavaScript.

### Images

- the initial campaign image is the sole eager, high-priority image and the LCP candidate;
- alternate campaign states mount only after deliberate interaction;
- prerendered HTML contains one eager/high image and 18 lazy images across six source assets;
- all below-fold raster media use `loading="lazy"`, responsive `sizes` and stable aspect-ratio frames;
- Collection cells and the Cart thumbnail have slot-specific `sizes` instead of inheriting the outer preview width;
- a cold initial page requests only the Hero and two nearby lazy candidates; it makes no request for the far-below-fold detail, Atelier or Studio media.

### Local lab results

Three fresh cache-isolated Chromium contexts per width, service workers blocked, no throttling:

| Viewport | LCP samples        | Median | Candidate                    | Transfer / encoded  | CLS           |
| -------- | ------------------ | ------ | ---------------------------- | ------------------- | ------------- |
| 375×812  | 140 / 196 / 188 ms | 188 ms | initial Hero image, `w=640`  | 24,422 / 24,122 B   | 0 in all runs |
| 1440×900 | 204 / 200 / 208 ms | 204 ms | initial Hero image, `w=1920` | 133,690 / 133,390 B | 0 in all runs |

These are warmed local lab observations, not field Core Web Vitals. The LCP candidate and transfer sizes are unchanged from v1.1; production field monitoring remains required.

## Responsive QA

| Viewport  | Result                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 320×720   | Production Chromium inspected; one H1 and all ten sections remain readable, the rail is reachable, and document overflow is exactly 0 px. |
| 375×812   | Full page inspected; no document overflow; mobile System rail is keyboard-focusable and leaves a partial-next cue.                        |
| 768×1024  | Full page inspected; intentional eight-column pairings, balanced Atelier and native System rail.                                          |
| 1366×640  | Short-height desktop correctly avoids sticky mode; rail reaches Mobile and the following Atelier section without scroll lock.             |
| 1440×900  | Full page inspected; tall-desktop System enhancement, bounded 12-column composition and stable sticky preview.                            |
| 1920×1080 | Full page inspected; page content remains capped, imagery and text do not become oversized, and the sticky story remains reachable.       |

## Accessibility

The page retains one H1, ten named regions, logical DOM/visual order, meaningful product-study alt text, decorative interface copy hidden from assistive technology where appropriate, visible token-driven focus, 44 px controls, native scrolling and semantic ordered lists.

During the real-browser audit, axe exposed two serious issues in the new System section: Graphite UI text on Bone and an unfocusable horizontal scroller. Both were corrected by using primary text on Bone and making the labelled native rail keyboard-focusable. Ten final axe checks passed across desktop and mobile routes, changed Campaign/System states and the open mobile navigation, with zero serious or critical violations. Manual review confirmed headings and landmarks, DOM/visual order, visible focus on light and dark surfaces, 44 px controls, 320 px reflow, native scrolling and reduced-motion behavior.

## SEO

All commercial explanations, product-stage labels, offer definitions, pricing entry points and CTAs are server-rendered text. The route retains one semantic H1, its existing title/description/canonical, Organization JSON-LD, robots behavior and OG metadata. No essential offer content is baked into raster UI, hidden behind interaction or dependent on JavaScript.

## Tests

Implemented coverage includes:

- exact ten-section order and server-rendered commercial content;
- exactly three capability signals, one Editions price and four Process stages;
- Nocturne identity, product proof, safe routes and six System stages;
- CMS completeness, crop/hotspot mapping and Nocturne identity rejection;
- one new System island state transition and cleanup behavior;
- Hero wrap/focus/no-autoplay behavior and exactly two analytics calls;
- six responsive widths, short-height rail reachability and no document overflow;
- reduced motion, lazy-image loading, console/page errors and route navigation;
- desktop/mobile axe plus changed Hero/System states;
- four visual regression baselines.

The final unit run passed 84 tests: 50 Web, 5 Studio, 12 UI, 11 Analytics and 6 Tokens. The final Playwright run passed 54 tests and intentionally skipped 16 project/viewport-inapplicable registrations; this includes behavior, responsive, visual, smoke and ten axe checks.

## Code and content audit

- Home has exactly three client islands: the existing manual Campaign and typed CTA tracker plus the new local Storefront System enhancement.
- There are zero GSAP imports, raw hex colors, `process.env` reads, direct `posthog.capture` calls, `console.*` calls, TODOs or FIXMEs in the Home module.
- Raw font/geometry values are limited to the intentionally code-native miniature storefront artboards; site-facing typography, color, spacing, focus and motion use ORVAUXE tokens.
- Raw responsive dimensions are intentional image `sizes`, approved breakpoint conditions and the standard visually-hidden 1 px technique.
- Production-rendered content contains none of the forbidden `temporary`, `placeholder`, `final pending`, `mock`, `fake` or `demo only` development labels. Internal temporary filenames remain explicit for provenance.

## Visual review

Persistent, inspected full-page artifacts:

- 375: `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-mobile-375-chromium.png` — 375×10,383, 1,202,409 bytes;
- 1440: `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-desktop-1440-chromium.png` — 1440×14,076, 4,724,118 bytes;
- 1920: `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-wide-1920-chromium.png` — 1920×15,587, 5,553,542 bytes;
- short laptop: `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-short-laptop-1366x640-chromium.png` — 1366×640, 613,166 bytes.

Review answers:

- Every one to one-and-a-half viewports introduces a new visual or commercial idea; the deliberate tall desktop System sequence is the only longer sustained chapter.
- The page is richer without using feature cards, icons, client proof or agency-content bloat.
- Visual storytelling continues through storefront compositions, Nocturne material studies, Atelier texture and Studio architecture.
- The visitor can see actual code-native Home, Collection, Product, Cart, Editorial and Mobile interface compositions.
- Nocturne reads as a coherent concept product and Editions reads as a sellable product line.
- Included views, Atelier distinction, the path to launch and Studio identity are all explicit.
- The final CTA follows product, bespoke, process and brand proof and therefore feels earned.

Product-clarity answers available from this page alone:

- ORVAUXE creates premium Shopify storefront systems and bespoke commerce experiences.
- An Edition is a curated premium storefront system adapted to a brand.
- The page shows what an Edition looks like through six code-native views.
- Home, Collection, Product, Cart, Editorial and Mobile are included in the demonstrated system.
- Nocturne is Edition 001, a fashion Concept Edition / ORVAUXE Original.
- Atelier is the semi-custom and bespoke strategy, design and development offer.
- Direction, Adaptation, Build and Launch explain the project path.
- Start a Project links provide the deliberate conversion path.

## Development issue indicator

Fresh `next dev` inspection at `127.0.0.1:3004` reported zero console errors and zero warnings. The Next.js portal badge had `data-error="false"`, `data-status="none"`, no issue text and no error dialog. Development CSP includes `'unsafe-eval'` only to satisfy React/Next development tooling. A final served production response returned HTTP 200 and a CSP with no `'unsafe-eval'` directive.

Next.js 16 generated `apps/web/AGENTS.md` and its `CLAUDE.md` pointer during the required development inspection. They are retained as framework-owned local agent guidance so subsequent `next dev` runs do not recreate uncommitted files.

## Architecture deviations

None.

## Remaining production inputs

- final outlined wordmark;
- approved favicon/monogram optical cuts;
- final OG asset;
- production campaign photography;
- final Nocturne product photography and storefront screens;
- production-safe web font subset/format assets if the current packaged fonts are replaced;
- CMS migration and content population for the new required Home narrative fields and Nocturne `storefrontViews` before configured Preview/Production cutover.

## Final approval questions

- **Visual richness:** Yes. Product and material storytelling continues after the Hero.
- **Product proof:** Yes. Six semantic storefront views replace abstract claims.
- **Content:** Yes. Offer, product line, bespoke service and route to launch are understandable.
- **Restraint:** Yes. The page avoids agency conventions and repeats no generic benefits framework.
- **Nocturne:** Yes. Edition 001 now has a coherent identity, product surface and included system while remaining explicitly conceptual.
- **Editions:** Yes. The visitor can understand the productized model and entry price before opening `/editions`.
- **Atelier:** Yes. Its bespoke scope, higher entry point, tactile visual and capabilities distinguish it from Editions.
- **Process:** Yes. Four concise stages explain movement toward launch.
- **Brand:** Yes. Fashion-house restraint and commerce clarity remain balanced.
- **Mobile:** Yes. The long page remains sectional and scannable; the System uses a compact native rail rather than a desktop sticky simulation.
- **Engineering:** Yes. The implementation remains server-first with one narrow new island, explicit module ownership and no new dependency.

## Recommendation

Replace v1.1 with this implementation. The final gates and production CSP check pass; production launch still depends on the explicitly listed CMS migration and approved asset inputs.

## Quality gates

| Gate                             | Result                                                                     |
| -------------------------------- | -------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | PASS — eight workspaces, lockfile current, pnpm 10.34.5                    |
| `pnpm format:check`              | PASS                                                                       |
| `pnpm typegen:check`             | PASS — 22 schema types and eight query results, no generated drift         |
| `pnpm lint`                      | PASS — five tasks                                                          |
| `pnpm typecheck`                 | PASS — five tasks, including `next typegen`                                |
| `pnpm test`                      | PASS — 84 tests                                                            |
| `pnpm build`                     | PASS — five tasks; Studio used documented public placeholder configuration |
| `pnpm test:e2e`                  | PASS — 54 passed, 16 intentionally skipped                                 |
| `pnpm workspace:graph`           | PASS — 87 packages across eight projects                                   |
| `git diff --check`               | PASS                                                                       |

Next Phase: ORVAUXE Editions Product Definition & Edition 001 — Nocturne v1.0
