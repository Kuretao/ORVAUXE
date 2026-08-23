# ORVAUXE Final Motion Direction Report v1.0

## Status

READY FOR FOUNDER MOTION REVIEW

The founder-locked static site remains intact. Motion is a progressive, restrained layer; no production deployment or merge was performed.

## Branch / SHA

- Branch: `feat/final-motion-direction-v1`
- Locked `main` base: `dc85b1b0f5ed96f1245f546e43ebd8d70aef632d`
- Verified motion and test implementation: `e6f5051f1dc85d78c678b42e9c3d810e3f1e6319`
- Documentation is intentionally carried in a subsequent small commit; the PR head is the authoritative final branch SHA.

## Motion System

A shared five-speed vocabulary now defines 140 ms instant, 220 ms quick, 380 ms standard, 640 ms editorial and 900 ms cinematic motion with `cubic-bezier(0.22, 1, 0.36, 1)` as the primary ease. CSS owns state and control motion. A zero-DOM client island uses IntersectionObserver for sparse one-time reveals and a temporary passive fast-scroll check while elements remain pending. It cleans observers, listeners and scheduled frames on route change.

GSAP was not needed and no dependency was added. Page components remain Server Components.

## Home Campaign

Explicit campaign changes use a 640 ms crossfade, approximately 1.5% incoming scale settlement and a small text entrance. Mouse previews use the quieter 380 ms duration. The state machine retains at most one incoming and one outgoing media layer; repeated controls cannot accumulate timelines. The first composition settles within 900 ms without hiding usable media or delaying interaction.

## Editorial Reveals

Selected headings, major copy compositions and final CTAs receive one-time vertical settlement with a 70-130 ms internal stagger. Text and proof carriers remain fully opaque, preserving readable contrast during the pending state. A fast scroll cannot leave skipped elements hidden. Lists, ordinary sections and form fields remain static.

## Product Proof

Selected Nocturne proof enters with a small vertical movement and 1.5% scale settlement. Captions remain fully opaque. There is no device float, perspective, 3D tilt, parallax on screenshots or case-study showreel treatment. The approved Home storefront sequence, scroll length and content timing are unchanged; only its existing state transition was softened.

## Navigation

Desktop links retain stable text with restrained rule/arrow response. Buttons gain a 1 px active press. The native mobile dialog opens through a 380 ms surface settle and tight 30 ms item offsets while preserving Escape, focus trapping, focus restoration and body-scroll release. No router interception or delayed navigation was introduced.

## Mobile

Mobile travel is reduced to approximately 14 px with shorter stagger and no hover dependency. Live QA found no horizontal overflow at 375, 430, 768, 1024, 1440 or 1920 px across all six required routes. Campaign touch controls, repeated menu open/close and viewport resize remained stable.

## Reduced Motion

`prefers-reduced-motion: reduce` removes animation, transition travel and scroll-linked effects. Reveal elements use a static state; campaign changes replace media immediately with one incoming and zero outgoing layers. Live inspection confirmed zero running animations and no pending content after interaction.

## Performance

Motion is limited to transform and opacity on media-only surfaces. There is no continuous animation loop, scroll hijacking or permanent layout-reading listener. The observer and temporary passive scroll guard are lazy, frame-coalesced and removed on cleanup. No entire page was converted to a client component.

## Accessibility

Server-rendered content is visible before enhancement and remains visible without JavaScript. Motion does not change DOM reading order, landmarks, live regions, keyboard control or form semantics. An initial axe run exposed lowered effective contrast on pending containers; opacity was removed from text/proof reveal carriers. The final functional/axe run has no serious or critical violations.

## Tests

- `pnpm install --frozen-lockfile`: pass.
- `pnpm format:check`: pass.
- `pnpm typegen:check`: pass with an isolated local Studio test configuration; 7 queries and 22 schema types, no generated diff.
- `pnpm lint`: pass.
- `pnpm typecheck`: pass.
- `pnpm test`: pass, 123 tests across web, UI, analytics, Studio and tokens.
- `pnpm build`: pass for Sanity Studio and the Next.js production site.
- Playwright functional/axe: 89 passed, 23 intentionally skipped.
- Windows visual regression: 15 passed.
- `git diff --check`: pass.
- Manual Playwright matrix: 36 route/viewport combinations, zero overflow and zero stuck pending states.
- Hosted CI is the final PR-head authority and is reported in GitHub checks and the handoff, avoiding a self-referential documentation SHA.

## Static Visual Regression

The existing Windows baselines passed without updates and without tolerance changes. Layout, spacing, type sizing, colors, copy, imagery and section heights remain founder-locked. The deterministic screenshot contract settles motion without changing responsive layout. Because no baseline changed, no new canonical Linux candidate was generated; hosted Linux CI validates the existing canonical set.

## Review Recordings

Generated with `pnpm --filter @orvauxe/web review:motion` against the production build.

- `output/playwright/final-motion/recordings/home-desktop-1440.webm`
- `output/playwright/final-motion/recordings/home-mobile-375.webm`
- `output/playwright/final-motion/recordings/nocturne-desktop-1440.webm`
- `output/playwright/final-motion/recordings/atelier-desktop-1440.webm`
- `output/playwright/final-motion/recordings/studio-desktop-1440.webm`
- `output/playwright/final-motion/recordings/start-project-1440.webm`
- `output/playwright/final-motion/recordings/home-reduced-motion-1440.webm`
- Matching resting PNGs: `output/playwright/final-motion/screenshots/`

These review artifacts are local and intentionally ignored by Git; the capture script is versioned and reproducible.

## Intentional Non-Animations

- No preloader, logo performance, custom cursor or route-transition framework.
- No scroll hijacking, smooth-scroll dependency, parallax system or continuous timeline.
- No animation on capability/process lists, ordinary cards, product screenshots, form fields or validation copy.
- No word/letter splitting, dramatic blur, masks, 3D tilt, magnetic links or animation analytics.
- Start a Project remains quiet and immediately operable.

## Deferred

- Founder review and explicit approval of the motion recordings.
- Merge only after approval and green hosted CI.
- Production environment validation, deployment, monitoring and launch-readiness operations remain separate infrastructure work.

Next Phase: ORVAUXE Founder Motion Review & Launch Readiness
