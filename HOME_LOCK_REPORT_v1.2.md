# ORVAUXE Homepage v1.2 Lock Report

## Status

**LOCKED.**

The Homepage implementation completed its final focused polish, production build, full automated
gate run and manual browser review. The refreshed visual baselines were inspected and accepted.

Once locked, Homepage v1.2 should not be redesigned again until real data, clients, analytics or
product work supplies evidence for a change.

## Final polish applied

- Replaced `fill` inside the reusable code-native storefront artboards with intrinsic media
  `width`/`height` plus CSS-controlled 100% cover rendering. This removes Next.js zero-height-parent
  warnings created by the simultaneously server-rendered desktop and rail responsive variants.
- Changed photographic Home, Cart and Editorial artboard headers to Atelier Ivory; Collection and
  Product retain black headers on their light interfaces.
- Reduced tall-desktop System stages from `48vh` to `34vh`, removing excessive dead space while
  preserving native page scroll, sticky preview behavior and all six states.
- Strengthened the selected desktop System state with the existing Oxblood accent and a token-driven
  color transition.
- Replaced visitor-facing `design and development` / `Commerce development` with `design and
implementation` / `Commerce implementation` to satisfy the production-language audit.
- Expanded unit and browser regression coverage for intrinsic storefront dimensions, dark/light
  artboard header contrast, and every forbidden visitor-facing development term in the brief.

## Visual changes

The visual direction, section order and content volume are unchanged. The only compositional change
is a tighter tall-desktop Storefront System chapter. In the development build, page height changed
from the approved v1.2 baseline of 14,076px to 13,320px at 1440×900 and from 15,587px to 14,680px at
1920×1080. Mobile, tablet and short-height layouts retain the horizontal rail.

Existing baselines inspected before editing:

- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-mobile-375-chromium.png`
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-short-laptop-1366x640-chromium.png`
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-desktop-1440-chromium.png`
- `apps/web/tests/e2e/homepage.visual.spec.ts-snapshots/home-wide-1920-chromium.png`

Focused post-polish screenshots inspected manually:

- `output/playwright/phase-a/home-mobile-320.png`
- `output/playwright/phase-a/home-tablet-768.png`

The 320px and 768px compositions retain complete imagery, deliberate section pacing and an initial
Home System frame with a partial-next cue. The production baselines were regenerated after the
legitimate desktop pacing, interface contrast and copy changes, then rerun without snapshot updates.
The visual harness now forces offscreen lazy images to rasterize only during full-page capture; the
application's production eager/lazy behavior remains unchanged and is covered separately.

| Baseline                                  | Dimensions  | Bytes     |
| ----------------------------------------- | ----------- | --------- |
| `home-mobile-375-chromium.png`            | 375×10,383  | 1,194,496 |
| `home-short-laptop-1366x640-chromium.png` | 1366×640    | 613,166   |
| `home-desktop-1440-chromium.png`          | 1440×13,320 | 4,701,687 |
| `home-wide-1920-chromium.png`             | 1920×14,680 | 5,520,914 |

## Typography review

The rendered review excluded decorative `aria-hidden` miniature interface lettering and measured a
12px minimum for customer-visible text at all six requested viewports. Metadata, section labels,
System descriptions, Process labels and CTA copy remain readable without enlarging the global type
system. The dark-artboard header correction restores the missing contrast for functional-looking
Home, Cart and Editorial interface labels.

## Storefront System review

The System remains one semantic product-documentation story with Home, Collection, Product, Cart,
Editorial and Mobile states. It has no cards, decorative dashboard UI, wheel interception, scroll
lock or added dependency.

The focused 1440px browser flow cycled all six controls. It found ten System images, zero missing
intrinsic dimensions, zero visible zero-height image parents and only static image positioning. The
header colors resolved to Atelier Ivory (`rgb(242, 239, 232)`) for Home, Cart, Editorial and Mobile,
and ORVAUXE Black (`rgb(11, 11, 11)`) for Collection and Product.

## Nocturne repetition review

No copy change was justified. The light Editions chapter behaves as a catalogue introduction: offer,
price, Edition 001 index and status. The following dark Nocturne chapter is the product reveal:
campaign, metadata, product interface and material studies. The repeated name therefore has two
clear editorial roles rather than duplicating the same message.

## CTA review

`START A PROJECT ↗`, `EXPLORE EDITIONS →` and `DISCOVER ATELIER →` remain editorial text actions.
At 375px each focused action accepted focus, exposed a solid visible outline, retained the correct
arrow and measured 44px high. Hover increased the existing underline emphasis. Hero touch targets
for Start a Project and Explore Editions also measured 44px high at every audited viewport.

## Development warning review

The initial development run exposed genuine Next/Image warnings for Nocturne product and detail
assets whose hidden responsive-variant parents had height zero. The intrinsic-dimension change fixes
the root cause instead of hiding the dev indicator.

After HMR, a fresh 1440px navigation and all six System states produced zero browser console warnings
and zero errors. The Next development indicator reported `data-error="false"` and
`data-status="none"` at 320, 375, 768, 1366×640, 1440 and 1920. A fresh top-of-page context emitted no
owned-server warning; a deliberate reload while scrolled below the fold can make Next's development
LCP heuristic warn about the visible below-fold image, but that does not occur in a normal fresh
navigation and does not justify broadening production eager loading.

## Temporary content audit

Rendered `main.innerText` contained zero occurrences of `temporary`, `placeholder`, `pending`,
`mock`, `dev`, `development`, `sample` or `final asset pending` at all six viewports. Internal asset
filenames, provenance fields, tests and data attributes remain intentionally explicit and are not
customer-visible.

## Performance

- New runtime dependencies: zero.
- New or broadened client boundaries: zero.
- Hero, preload, eager/lazy policy and responsive `sizes`: unchanged.
- Storefront imagery keeps intrinsic ratios and existing stable aspect-ratio frames.
- Tall-desktop System scroll distance is reduced by the 34vh stage rhythm.

No new LCP/CLS claim is made in this focused pass. The approved v1.2 lab values remain the reference.
The production build, browser loading assertions and full E2E run passed with the one-initial-preload
policy intact.

## Accessibility

The focused review retained one H1, ten named sections, native document scrolling, a
keyboard-focusable System rail, semantic lists and 44px primary CTA targets. Dark artboard header
contrast is corrected, important text remains at least 12px, and body overflow is not locked. The
full E2E run passed desktop/mobile axe checks for the Homepage, changed campaign state and changed
Storefront System state with no serious or critical violations.

## Responsive QA

| Viewport  | Result                                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------------------- |
| 320×720   | 10 sections, one H1, 0px overflow, 12px minimum visible text, scrollable System rail; full page inspected.           |
| 375×812   | 10 sections, one H1, 0px overflow, 12px minimum visible text, scrollable System rail and 44px hero CTAs.             |
| 768×1024  | 10 sections, one H1, 0px overflow, 12px minimum visible text, balanced two-column compositions; full page inspected. |
| 1366×640  | Short-height rail selected, 0px overflow; final Mobile stage and following Atelier remain reachable.                 |
| 1440×900  | Sticky System selected, all six states cycled, 0px overflow; section height 2,508px after pacing polish.             |
| 1920×1080 | Sticky System selected, capped content composition, 0px overflow; section height 2,950px.                            |

At every viewport the Next indicator reported no issue and rendered customer copy contained no
forbidden temporary/development language.

## Tests

Focused checks executed after the final source edits:

- `pnpm --filter @orvauxe/web test -- src/modules/home/ui/HomeScreen.test.tsx` — **PASS**, 9/9.
- `pnpm --filter @orvauxe/web lint` — **PASS**, zero warnings.
- `pnpm exec tsc --project apps/web/tsconfig.json --noEmit` — **PASS**.
- Focused Prettier check for all five changed source/test files — **PASS**.
- `git diff --check` — **PASS** at focused handoff.
- Real Chrome responsive audit at 320, 375, 768, 1366×640, 1440 and 1920 — **PASS** for
  composition, overflow, mode selection, development indicator and rendered-word audit.

Final root Phase A gates:

- `pnpm install --frozen-lockfile` — **PASS**, pnpm 10.34.5, 8 workspace projects, frozen lockfile.
- `pnpm format:check` — **PASS**.
- `pnpm typegen:check` — **PASS**, 8 queries and 22 schema types, no generated drift.
- `pnpm lint` — **PASS**, zero warnings.
- `pnpm typecheck` — **PASS**, five executable workspace tasks.
- `pnpm test` — **PASS**, 84/84 tests across Tokens, Analytics, UI, Studio and Web.
- `pnpm build` — **PASS**, Sanity Studio and Next.js 16.3.1 production builds.
- `pnpm test:e2e` — **PASS**, 54 passed and 16 intentionally project-skipped across 70
  registrations.
- `pnpm workspace:graph` — **PASS**, 87 packages across 8 projects.
- `git diff --check` — **PASS**.
- Production visual baselines — **PASS**, four Chromium baselines; refreshed artifacts manually
  reviewed and a no-update rerun passed.

## Remaining production brand assets

- Final approved Hero campaign photography.
- Final Nocturne campaign, product and detail photography.
- Final Atelier material photography.
- Final Studio architectural photography or an approved documentary alternative.
- Any licensed production typography/brand assets supplied for the commercial launch.

Current originals remain honest concept-production inputs and are not represented as client work.

## Architecture deviations

None. No section, route, generic renderer, dependency, package, public module contract or client island
was added. The change remains inside Homepage data, UI styles/components and Homepage tests.

## Recommended merge status

**READY FOR SAFE MAIN MERGE.** Homepage v1.2 is `LOCKED`; no further Homepage redesign is recommended
until real data, clients, analytics or product work provides evidence for a change.
