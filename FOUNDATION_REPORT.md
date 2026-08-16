# Status

```text
READY
```

Website Foundation & Design System v1.0 is implemented and verified on the final source. The homepage remains the neutral repository skeleton; the next product phase has not been started.

## Implemented

- Expanded `@orvauxe/tokens` into the production visual contract and mapped it into Tailwind's CSS-first theme.
- Loaded the approved Bodoni Moda and Inter direction through `next/font` and application-owned CSS variables.
- Refined the nine existing `@orvauxe/ui` primitives without adding speculative components.
- Added package-owned primitive styles through the deliberate `@orvauxe/ui/styles.css` public export.
- Replaced the skeleton navigation and footer with a server-first site shell and one focused navigation client island.
- Added a neutral transparent favicon placeholder, implementation documentation, token/UI/shell regression tests, responsive Playwright coverage and expanded axe coverage.
- Kept the existing homepage and domain-route content unchanged apart from the shared shell and focusable main target.

## Design system

- **Colors:** the exact Black, Atelier Ivory, Bone, Graphite Brand, Graphite UI and Oxblood primitives, with semantic light/dark surfaces, text, borders, accents and focus roles.
- **Typography:** two display, four heading, three body, label and caption roles, each with a documented family, size, line height, tracking and approved weight.
- **Spacing:** a restrained quarter-rem numeric scale plus control, content, section and major-section roles.
- **Layout:** 4/8/12 columns, shared gaps and gutters, page/editorial/text/full-bleed containers and four layout-transition breakpoints.
- **Motion:** instant/fast/standard/editorial/cinematic durations, four easing roles and reduced-motion overrides.
- **Foundation:** token-driven visible focus, 44px standalone targets, restrained borders/radius/shadow and explicit layer roles.
- **UI primitives:** Button, Link, Heading, Text, Container, Grid, Divider, Media and FocusRing retain native semantics and constrained public variants.

## Site shell

- Server-rendered `SiteHeader`, `SiteFooter` and `SkipLink` are colocated under `app/(site)/_components`.
- Launch navigation contains only Editions, Atelier, Studio and Start a Project. Nested Edition routes preserve the parent `aria-current="page"` state.
- The mobile navigation uses native modal `dialog` semantics, an explicit Tab boundary, initial focus, Escape/Close/route dismissal, opener restoration and reversible body scroll locking.
- The skip link is the first keyboard control and moves focus to a visibly outlined `main#main-content`.
- Every site route owns exactly one focusable main landmark; the shell adds no competing main.
- The footer provides only the text wordmark, Commerce Atelier descriptor, `Chengdu · Worldwide` and copyright. No social, contact or legal destinations were invented.

## Brand assets

```text
production assets still required
```

The Planning Package concept/source SVGs and OFL font files were inspected. The SVGs retain live type dependencies, while the source inventory still calls for a production Digital Wordmark master and a final favicon decision; none was promoted as an approved production asset. The precise text wordmark remains the safe shell fallback. `apps/web/src/app/icon.svg` is intentionally transparent metadata plumbing, not an approved mark. No concept photography or unlicensed asset was integrated.

## Runtime dependencies

```text
No new runtime dependencies.
```

The lockfile and runtime dependency graph are unchanged. The token test script and UI stylesheet export are manifest-contract changes only.

## Client boundaries

The final repository contains five `"use client"` files:

- `apps/web/src/app/(site)/_components/SiteNavigation.client.tsx` - pathname state, modal lifecycle, keyboard focus, resize handling and body scroll restoration.
- `apps/web/src/app/(site)/error.tsx` - required Next.js segment error boundary, browser-side Sentry capture and reset callback.
- `apps/web/src/app/global-error.tsx` - required root error boundary, browser-side Sentry capture and reset callback.
- `apps/web/src/modules/project-inquiry/ui/StartProjectForm.client.tsx` - form action state, browser submission identity, Turnstile state and typed client analytics.
- `apps/web/src/modules/project-inquiry/ui/TurnstileWidget.client.tsx` - browser interaction boundary for the verification widget.

Only `SiteNavigation.client.tsx` was introduced in this phase. Header, footer, skip link, layouts, typography and route presentation remain server-rendered.

## GSAP

```text
GSAP intentionally not used yet. Reserved for signature page interactions.
```

No foundation source imports GSAP and no animation client boundary was added. CSS handles compact state transitions; native scrolling remains unchanged.

## Performance review

- Requested font weights are Bodoni Moda normal 400/500 and Inter normal 400/500/600, Latin subset, `display: "swap"`.
- The production font manifest preloads two Latin WOFF2 files totalling 74,236 bytes (25,804 + 48,432), below the 180 KB initial-font budget.
- The final emitted JavaScript chunk containing `site-mobile-navigation` is 9,273 bytes raw and 3,502 bytes gzip. This is a chunk measurement, not a claim about isolated authored-code size.
- No image/video payload, icon library, smooth-scroll code, animation runtime or dependency was added.
- Field Core Web Vitals remain a production-traffic responsibility; a local build does not prove p75 LCP, INP or CLS.

## Accessibility

- Token tests verify approved contrast pairs and the focus contract.
- Component tests verify semantic primitive behavior, shell landmarks, launch navigation, modal state, focus restoration and route semantics.
- Playwright axe scans found no serious or critical violations on `/`, `/editions`, `/start-a-project` or the open mobile navigation at representative desktop and mobile viewports.
- The final keyboard pass verified the visible skip link, focus transfer to `main-content`, its 2px token-driven outline, logical navigation order, modal initial focus, forward/reverse focus loop, Escape dismissal, opener restoration and scroll unlock.
- The final browser pass verified nested Editions current-route semantics, a usable accessibility tree and zero browser-console errors or warnings.
- Reduced-motion emulation resolved the foundation fast and standard motion tokens to zero duration while preserving usable content and controls.

## Responsive QA

Automated and manual production-browser checks covered:

- 375 x 812: mobile navigation, modal focus behavior and no horizontal overflow;
- 768 x 1024: mobile/tablet transition and no horizontal overflow;
- 1440 x 1000: desktop navigation and no horizontal overflow;
- 1920 x 1080: wide container behavior and no horizontal overflow.

The mobile/desktop navigation switch, single main landmark and document scroll width were asserted at each representative width.

## Commands executed

| Command                                                                                    | Result                                                                                                            |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                                                           | PASS - clean install, 8 workspace projects and 1,289 packages reused/resolved from the lockfile                   |
| `pnpm format:check`                                                                        | PASS                                                                                                              |
| `pnpm typegen:check`                                                                       | PASS - 22 schema types and 7 queries regenerated with no tracked drift                                            |
| `pnpm lint`                                                                                | PASS - root and all 5 runnable workspace lint tasks                                                               |
| `pnpm typecheck`                                                                           | PASS - all 5 runnable workspace typecheck tasks, including clean Next route type generation                       |
| `pnpm test`                                                                                | PASS - 60 tests: tokens 6, analytics 11, Studio 1, UI 12 and web 30                                               |
| `pnpm build`                                                                               | PASS - Studio and optimized Next production build; 12 static-generation steps and only approved routes            |
| `pnpm test:e2e`                                                                            | PASS - 33 passed, 5 expected cross-project skips; smoke, form, shell, axe, responsive and reduced-motion coverage |
| `pnpm workspace:graph`                                                                     | PASS - 87 dependency entries across 8 projects; no forbidden graph edge                                           |
| `pnpm exec prettier --check docs/engineering/{design-system,accessibility,performance}.md` | PASS                                                                                                              |
| `git diff --check`                                                                         | PASS                                                                                                              |
| Playwright CLI production-browser inspection                                               | PASS - final focus, modal, responsive, reduced-motion, current-route and console checks                           |

The final build used placeholder Studio identifiers, the official Turnstile test site key and no public Sanity project identifier, so server-rendered CMS routes exercised their documented local fallback without contacting a production dataset.

## Architecture deviations

```text
None.
```

No new package, application, framework, ADR, generic component directory, page builder, public styleguide route or homepage abstraction was introduced. The package-owned UI stylesheet is a deliberate public subpath of the existing UI package, not a new architectural layer.

## Remaining visual inputs

- approved display and Digital Wordmark masters;
- approved OX/X monogram;
- favicon/platform icon set, social avatar and Open Graph mark;
- licensed, rights-cleared editorial and project photography;
- final crop/hotspot and responsive `sizes` art direction for real content;
- a separately licensed commercial display-face upgrade if later approved.

## Blockers

```text
None.
```

> **Next Phase: ORVAUXE Homepage v1.0**
