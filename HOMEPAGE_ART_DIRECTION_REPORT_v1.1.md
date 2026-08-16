# ORVAUXE Homepage Art Direction Revision v1.1 Report

**Report date:** 2026-08-17

**Report state:** Final implementation report

## Status

```text
READY
```

Homepage v1.1 is visually and functionally ready to replace Homepage v1.0. The implementation, production build, browser review, accessibility review, automated tests, image delivery, and measured build artifacts support this status. Every required repository gate passed on the final staged snapshot.

Do not merge or push automatically.

## Why revision was made

Homepage v1.0 was technically strong but opened like a text-dominant editorial architecture studio. Revision v1.1 restores the intended ORVAUXE balance:

- fashion-house confidence through image dominance, forceful cropping, material detail, and scale;
- editorial-campaign behavior through three deliberate visual states and restrained controls;
- architectural precision through the existing grid, typography, tokens, and surface system;
- immediate commercial clarity through the initial heading and explicit Shopify offer;
- premium-commerce credibility through honest Editions, Nocturne, and Atelier positioning.

The work is an art-direction revision, not an architecture rewrite. The global design system, shell, navigation, server-first data flow, Point of View, Atelier capability structure, footer, SEO, Sanity ownership, and analytics contract remain intact.

## Final narrative composition

The eight narrative beats are:

1. image-dominant campaign hero;
2. integrated four-destination editorial rail;
3. dark Point of View statement;
4. Editions introduction and commercial entry point;
5. Edition 001 / Nocturne concept feature;
6. dark Atelier offer and numbered capabilities;
7. concise Studio signal;
8. final Start a Project invitation.

The shell-owned footer follows this sequence. The separate v1.0 typographic hero and visual interlude were replaced by the integrated campaign opening; no second page-builder or alternate layout system was introduced.

## Hero

### Structure and hierarchy

The opening uses the established ORVAUXE container and responsive grid inside a near/full-width campaign stage. Media occupies the stage, while a compact top line, title/context block, commercial clarification, actions, manual controls, and lower rail remain legible over a controlled scrim.

The initial server-rendered state communicates the offer immediately:

- eyebrow: `ORVAUXE`;
- title: `Commerce for the distinctive.`;
- supporting copy: `Premium Shopify storefronts for fashion, jewelry and design-led brands.`;
- context: `Commerce Atelier` and `Chengdu · Worldwide`;
- actions: Start a Project and Explore Editions.

The active state's visible title is the sole H1. It is intentionally dynamic: Brand, Nocturne, and Atelier each become the one H1 when that state is active or previewed. The initial server-rendered H1 remains the commercially explicit Brand heading; the implementation does not keep a second hidden or stable initial H1.

### Three campaign states

| State    | Visible title                 | Truthful context                         | Primary destination                |
| -------- | ----------------------------- | ---------------------------------------- | ---------------------------------- |
| Brand    | Commerce for the distinctive. | Commerce Atelier / Chengdu · Worldwide   | `/start-a-project` and `/editions` |
| Nocturne | Nocturne                      | Concept Edition / ORVAUXE Original       | `/editions`                        |
| Atelier  | Atelier                       | Bespoke commerce / current Atelier price | `/atelier`                         |

Nocturne is represented only as a concept Edition and ORVAUXE original. It is not presented as client work, and it links only to the honestly usable `/editions` route.

### Manual state behavior

- Previous and next buttons wrap through exactly three states.
- There is no timer, autoplay, preloader, smooth scroll, custom cursor, canvas, WebGL, or waiting choreography.
- A polite live region announces the deliberately selected index and title.
- Mouse hover may temporarily preview a panel's mapped state; pointer leave restores the selected state.
- Editorial panels remain semantic destination links. Click/tap navigates rather than creating a deceptive inactive control.
- Keyboard users can reach every link and both named controls; previous/next state selection wraps while focus remains on the control.

## Four editorial panels

The rail is a fixed, code-owned navigation structure, not a CMS page builder and not a SaaS card row. It uses rules, typography, index, contrast, and a restrained active treatment—no rounded cards, shadows, floating surfaces, icons, bright filled tabs, or hover lift.

The exact preview/destination mapping is:

| Panel       | Preview state | Destination |
| ----------- | ------------- | ----------- |
| 01 Editions | Nocturne      | `/editions` |
| 02 Atelier  | Atelier       | `/atelier`  |
| 03 Nocturne | Nocturne      | `/editions` |
| 04 Studio   | Brand         | `/studio`   |

The canonical active-panel mapping for selected states is Brand → Studio, Nocturne → Nocturne, and Atelier → Atelier. Editions remains a truthful alternate entry to the Nocturne/Edition world rather than pretending a fourth campaign state exists.

## Mobile and header behavior

The existing accessible global header is retained as a stable surface; it was not overlaid or inverted per slide. This avoids fragile contrast changes while the campaign imagery changes. Its approved vocabulary remains ORVAUXE / Commerce Atelier, Editions, Atelier, Studio, and Start a Project; no Work or Journal destination was added.

On mobile, the composition is intentionally recut rather than mechanically compressed:

- campaign media retains a dominant fashion/editorial crop;
- title, context, commerce explanation, actions, and manual controls remain available;
- the four destinations become a horizontally scrollable editorial rail;
- touch does not depend on desktop hover preview;
- interactive targets meet the 44px minimum;
- the rail scrolls independently without causing document-level horizontal overflow.

At approximately 1366 × 640, the visual, title, commercial explanation, controls, and destination rail remain meaningfully available without requiring a visitor to scroll before understanding the offer.

## Visual references

Official fashion-house sites were reviewed on 2026-08-16 for high-level campaign and commerce principles only:

- [Dior Fashion](https://www.dior.com/en_int/fashion)
- [Saint Laurent](https://www.ysl.com/)
- [Bottega Veneta](https://www.bottegaveneta.com/)
- [Loewe](https://www.loewe.com/)
- [Prada](https://www.prada.com/)

Transferable principles were image dominance, decisive editorial crops, minimal interface chrome, large/small scale contrast, small technical labels beside major visual moments, restrained transitions, and clear paths from campaign storytelling into offer discovery.

Nothing was copied: no layout, identity, copy, typography, logo, code, animation, navigation implementation, or asset. ORVAUXE adds more immediate commercial explanation than an established fashion house can require. Brand imitation, ambiguous offer language, autoplay, hover-only operation, excessive choreography, and interface spectacle were explicitly avoided.

## Copy changes

- Removed `ORVAUXE — DIGITAL COMMERCE STUDIO` and its CMS field rather than substituting another generic agency descriptor.
- `ORVAUXE`, `Commerce Atelier`, and `Chengdu · Worldwide` now frame the Brand state.
- The explanatory sentence still says exactly what is sold: premium Shopify storefronts for fashion, jewelry, and design-led brands.
- Studio copy is now the more confident `An independent commerce atelier for brands that refuse to look interchangeable.`
- Editorial actions gain consistent arrow/rule affordance for pointer, keyboard focus, and touch contexts.
- Editions retains one base price and one Explore Editions action in its introduction; the Nocturne feature no longer repeats the price or CTA.
- No visitor-facing temporary-media note remains.
- `Have a brand worth building for?` is preserved.

The public copy does not claim Nocturne is client work and does not add unsupported testimonials, logos, metrics, discounts, Work, or Journal.

## Imagery

### Temporary campaign assets used

No licensed production photography was supplied. The implementation therefore uses three original, synthetic, task-specific temporary material studies created for this revision. They are not sourced from or represented as work for another luxury brand.

| Asset                                   |  Dimensions |  Source bytes |
| --------------------------------------- | ----------: | ------------: |
| `home-campaign-orvauxe-temporary.webp`  | 1536 × 1024 |     185,542 B |
| `home-campaign-nocturne-temporary.webp` | 1536 × 1024 |      82,150 B |
| `home-campaign-atelier-temporary.webp`  | 1536 × 1024 |     140,684 B |
| **Total**                               |             | **408,376 B** |

The files remain explicitly temporary in filenames and internal data attributes. Their public alternative text describes only the visible materials; internal asset-status notes are not exposed as customer-facing captions.

The material direction—black tailoring, ivory textile, leather, brushed metal, smoked glass, hard light, and deep shadow—moves the opening away from generic geometric/Bauhaus placeholders and toward a tactile fashion world without fabricating fashion campaign photography.

### Still required

- rights-cleared production fashion/editorial campaign imagery;
- final Edition 001 / Nocturne imagery or truthful product visuals;
- approved outlined digital wordmark/lockup;
- final optical monogram/favicon;
- approved permanent Open Graph asset.

## Motion

GSAP `3.15.0` is a pre-existing repository dependency, but Homepage v1.1 has **0 GSAP imports**. No runtime dependency and no new motion package or token was added.

The implemented transition is a narrow CSS reveal/fade treatment driven by existing duration and easing tokens. It responds immediately, avoids bouncing and long cinematic waits, and does not hide initial content behind a JavaScript reveal.

Under `prefers-reduced-motion: reduce`, campaign animation and related transitions are disabled; state changes remain immediate and fully usable. Browser inspection recorded zero active animations after state changes in reduced-motion mode.

## Client boundaries

The Homepage remains server-first. The route fetches through the existing Sanity server path, mapping stays server-owned, and `HomeScreen` plus the narrative sections remain Server Components.

There are exactly two authored Home client boundaries:

| File                         | Status in v1.1                         | Reason                                                                                                                                                                              |
| ---------------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HomeCampaign.client.tsx`    | New narrow client island               | Holds selected/preview state, named manual controls, hover preview, live announcement, and active-panel presentation. It receives typed prepared content; it does not fetch Sanity. |
| `TrackedHomeLink.client.tsx` | Pre-existing boundary reused unchanged | Sends the existing typed Start a Project event from hero/final placements.                                                                                                          |

`HomeCampaign.tsx` is the server-owned preparation layer for three fixed states and four fixed panels. No unrelated section became client-rendered, and no universal `Carousel`, shared slider, or motion package was introduced.

## Sanity

The constrained `homePage` singleton remains the source of editable Homepage copy and media. The revision:

- retains `heroMedia` as the Brand campaign source;
- adds the explicit optional `atelierCampaignMedia` field for the Atelier campaign state;
- continues to source Nocturne from the one selected Edition relationship;
- preserves Sanity image crop/hotspot mapping and responsive image infrastructure;
- keeps campaign panel labels, destinations, and state mapping code-controlled because they are stable application navigation;
- introduces no `sections[]`, `heroSlides[]`, arbitrary layout controls, or generic page builder.

There is no legacy `heroEyebrow` in the schema, GROQ query, domain model, mapper, or fallback. The code-owned `ORVAUXE` label supplies the Brand-state eyebrow.

Sanity TypeGen passed and generated 8 queries and 22 schema types through the existing pipeline; generated files were not manually edited.

## Analytics

No slider-change or hover-noise event was added. Panel navigation uses normal semantic links. The only Homepage business event remains the existing typed `start_project_clicked` event through `TrackedHomeLink.client.tsx`; there is no direct `posthog.capture` call.

This preserves the principle that analytics must answer a business question rather than record every visual interaction.

## Performance

### Dependencies and emitted artifacts

- New dependencies: **0**.
- GSAP imports: **0**.
- The only new interactive runtime is the Home-owned campaign island.

Measured production artifacts and the v1.0 comparison are:

| Emitted artifact                      |  v1.0 raw / gzip |  v1.1 raw / gzip |  Raw / gzip delta |
| ------------------------------------- | ---------------: | ---------------: | ----------------: |
| Home campaign-containing client chunk | 16,877 / 6,345 B | 25,371 / 8,328 B | +8,494 / +1,983 B |
| Home CSS                              |  8,869 / 1,593 B | 15,243 / 2,734 B | +6,374 / +1,141 B |
| Prerendered Home HTML                 | 47,369 / 6,906 B | 51,220 / 7,516 B |   +3,851 / +610 B |
| Home RSC payload                      | 24,166 / 4,189 B | 23,728 / 4,365 B |     −438 / +176 B |

The client figure is the size of the emitted chunk containing the Home campaign, not the isolated byte size of authored `HomeCampaign` source. It remains far below the established 150 KB gzip route-JavaScript budget.

### Image loading and LCP

The initial Brand image uses `next/image`, `sizes="100vw"`, eager loading, and high fetch priority only before interaction, making it the intentional LCP candidate. Other state images are requested lazily as their keyed state becomes active; the implementation does not preload all three maximum-width source files. The below-fold Nocturne feature remains lazy and retains its narrower responsive `sizes` expression. Sanity sources continue through the existing image/crop/hotspot path.

Fresh local browser-lab observations:

| Viewport | LCP element |    LCP | Optimized candidate | Transfer / encoded body |
| -------- | ----------- | -----: | ------------------- | ----------------------: |
| 375px    | `IMG`       | 108 ms | `w=640`             |       24,422 / 24,122 B |
| 1440px   | `IMG`       | 108 ms | `w=1920`            |     133,690 / 133,390 B |

These are fresh local lab observations, not field Core Web Vitals and not a claim about production-user latency. They confirm the intended image LCP and responsive candidate selection; field monitoring remains necessary after deployment with final licensed imagery.

## Accessibility

Automated and manual review found:

- desktop and mobile axe checks, including after a campaign state switch, reported no serious or critical violations;
- one visible H1 at a time: the active campaign title;
- named previous/next buttons and a labelled destination navigation region;
- predictable keyboard order, focus retention, state wrapping, and visible focus treatment;
- a polite selected-state announcement without autoplay noise;
- semantic destination links with correct routes;
- 44px minimum mobile targets;
- no essential hover-only operation;
- no document-level horizontal overflow;
- zero active animations after state changes under reduced motion;
- initial campaign content remains available through server rendering and does not wait for an animated reveal.

No over-engineered carousel ARIA role was introduced; the interaction uses a section, named buttons, links, navigation, and a small live status.

## Responsive QA

All requested art-direction viewports were manually reviewed and passed:

| Viewport    | Result                                                                                                           |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| 320 × 720   | PASS — commercial message, title, controls, crop, and reflow remain usable without horizontal document overflow. |
| 375 × 812   | PASS — mobile campaign identity is retained; touch targets, controls, and horizontal rail are usable.            |
| 768 × 1024  | PASS — 8-column transition preserves media dominance and readable hierarchy.                                     |
| 1366 × 640  | PASS — short-laptop view exposes meaningful visual, title, offer context, controls, and destinations.            |
| 1440 × 900  | PASS — 12-column campaign composition, asymmetric hierarchy, and integrated panels read as intended.             |
| 1920 × 1080 | PASS — media can remain expansive while text measure and grid relationships stay controlled.                     |

Manual interaction coverage also passed for mobile rail scrolling/touch, 44px targets, keyboard wrap/focus retention, reduced motion, and desktop/mobile accessibility after a state switch.

## Preserved and polished sections

### Point of View

`Built to be desired. Designed to be bought.` remains the dark tonal pivot. Only the transition from the new campaign opening was integrated; its core composition and message were preserved.

### Editions / Nocturne

The Editions introduction owns the one base price and Explore Editions action. Vertical dead space before the featured concept was reduced without eliminating luxury whitespace. Nocturne retains Edition 001, Concept Edition, and Fashion metadata plus its concise point-of-view statement; duplicate price/action copy was removed.

### Atelier

The successful dark section, bespoke positioning, price, CTA, and six-item numbered service list remain. Services were not turned into cards. Atelier also receives a dedicated optional campaign-media input for the opening state.

### Studio

Studio now uses a concise, confident commerce-atelier statement rather than corporate digital-studio prose, with `Chengdu · Worldwide` retained as context.

### Final CTA

`Have a brand worth building for?` and the established section structure remain. The Start a Project link shares the same fine-rule/arrow affordance and typed analytics path as the opening action.

## Next.js “1 Issue”

The development indicator was investigated rather than dismissed. Its exact cause was React's development evaluation being blocked by the Content Security Policy. The fix allows `'unsafe-eval'` only in the development CSP, where the React/Next development runtime requires it.

After a clean development-server restart, the page showed no issue badge, issue dialog, page error, or console application error. Production policy excludes `'unsafe-eval'`; a production response/header recheck returned HTTP 200 and confirmed `unsafe-eval: false`.

## Tests

### Behavior covered

Homepage coverage verifies the initial Brand state, the sole active-state H1, all panel destinations and mappings, manual state changes, control wrapping/focus retention, mouse-only transient preview, no six-second autoplay, CTA navigation, mobile rail/touch geometry, no horizontal document overflow, reduced-motion usability with zero animations, truthful concept treatment, and absence of Work, Journal, and visitor-facing temporary-media notes.

Accessibility and visual suites cover the changed state as well as the initial state. Focused Home, Sanity, CSP, and related tests passed before the full suite.

### Repository gates

Verified with Node 24.19.0 and pnpm 10.34.5:

| Command                          | Result                                                                 |
| -------------------------------- | ---------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile` | PASS — lockfile current across 8 workspace projects.                   |
| `pnpm format:check`              | PASS.                                                                  |
| `pnpm typegen:check`             | PASS — 8 queries and 22 schema types; generated artifacts are current. |
| `pnpm lint`                      | PASS.                                                                  |
| `pnpm typecheck`                 | PASS.                                                                  |
| `pnpm test`                      | PASS — 77 total: Web 45, Studio 3, Analytics 11, Tokens 6, UI 12.      |
| `pnpm build`                     | PASS — current production Home artifacts measured above.               |
| `pnpm test:e2e`                  | PASS — 49 passed, 13 intentionally skipped.                            |
| `pnpm workspace:graph`           | PASS — 87 packages represented across 8 workspace projects.            |
| `git diff --check`               | PASS.                                                                  |

Skipped E2E cases are intentional project/state exclusions, not hidden failures.

## Visual baselines

All four final Chromium baselines were intentionally regenerated, reviewed rather than blindly accepted, and passed visual inspection:

| Baseline                     | Captured dimensions |   File size | Review |
| ---------------------------- | ------------------: | ----------: | ------ |
| `home-mobile-375`            |          375 × 4759 |   448,483 B | PASS   |
| `home-short-laptop-1366x640` |          1366 × 640 |   613,166 B | PASS   |
| `home-desktop-1440`          |         1440 × 5902 | 1,530,795 B | PASS   |
| `home-wide-1920`             |         1920 × 6420 | 1,995,072 B | PASS   |

Review covered campaign crop, active controls, title/offer visibility, lower rail behavior, header readability, section rhythm, CTA affordance, wide-screen measure, and the preservation of ORVAUXE identity.

## SEO

The existing metadata and structured-data architecture are preserved. Initial server output retains the commercially descriptive title, description, canonical root URL, truthful Organization data, and Brand-state H1 `Commerce for the distinctive.` The client interaction replaces that H1 text with the active visible campaign title but never creates multiple H1 elements.

No fake ratings, client claims, awards, addresses, or permanent OG image were introduced. A final approved OG asset remains pending.

## Architecture deviations

None.

- No architecture layer, generic page builder, universal carousel, shared motion package, or forbidden catch-all directory was added.
- No Sanity fetching moved to the browser.
- No global design-token, shell, navigation, analytics, or SEO architecture was redesigned.
- New dependencies: 0.
- Unrelated refactoring: none.

## Code cleanliness

The requested audit found the two intentional Home `"use client"` directives described above and no Home imports of GSAP, direct `posthog.capture`, `process.env`, `console.*`, TODO, or FIXME. Homepage CSS introduces no raw hex values or hardcoded font-size literals; it uses semantic/design tokens for color, typography, spacing, duration, and easing. The campaign's asset-specific object positions and responsive layout constraints remain deliberate. Lint rules were not weakened.

## Remaining brand inputs

The implementation can ship honestly with temporary material studies, but production brand completion still requires:

- final approved digital wordmark/lockup;
- final monogram and favicon;
- rights-cleared production fashion/editorial campaign imagery;
- final Nocturne/Edition 001 product imagery;
- final Open Graph artwork;
- final content approval for production Sanity entries.

## Final visual test

| Question                                                                                       | Evidence-based answer                                                                                                                    |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Does the first viewport feel closer to a premium fashion campaign than an agency landing page? | Yes — image dominance, material crops, compact labels, and the integrated rail establish a campaign opening.                             |
| Does it remain recognizably ORVAUXE rather than imitating Dior or another house?               | Yes — the Bodoni/Inter system, ORVAUXE grid, oxblood restraint, copy, and commerce model remain house-specific.                          |
| Can a first-time visitor understand what is sold?                                              | Yes — the initial viewport explicitly names premium Shopify storefronts and target categories.                                           |
| Do Editions, Nocturne, and Atelier feel like real offers?                                      | Yes — each has distinct positioning, truthful status, price context where applicable, and usable navigation.                             |
| Are the four panels useful rather than decorative?                                             | Yes — each is a semantic destination, and desktop preview adds context without replacing navigation.                                     |
| Is motion polish rather than spectacle?                                                        | Yes — one token-driven reveal treatment, no autoplay, no GSAP import, and immediate reduced-motion state changes.                        |
| Does the identity survive at 375px?                                                            | Yes — manual/touch QA and the reviewed mobile baseline passed.                                                                           |
| Are concepts/placeholders handled truthfully?                                                  | Yes — Nocturne is labelled Concept Edition / ORVAUXE Original, and temporary synthetic assets make no client claim.                      |
| Did visual ambition remain technically disciplined?                                            | Yes — 0 new dependencies, one narrow new client island, measured responsive images, local image LCP, and controlled emitted-size deltas. |

## Recommendation

Homepage Art Direction Revision v1.1 is ready to replace Homepage v1.0 and proceed toward a separately approved merge. It delivers the requested fashion-house campaign signal without sacrificing commercial clarity, accessibility, performance discipline, truthfulness, or the approved architecture. Do not merge or push automatically.

Next Phase: ORVAUXE Editions Product Definition & Edition 001 — Nocturne v1.0
