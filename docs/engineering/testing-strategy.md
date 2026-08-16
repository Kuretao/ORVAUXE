# Testing Strategy

## Principle

Tests protect business behavior, architectural boundaries and art direction. Coverage percentage is diagnostic, not a success target.

## Test layers

### Unit — Vitest

Own tests beside the code:

- Zod inquiry validation and normalization;
- submission result transitions;
- Person/domain normalization;
- use-case ordering and failure behavior with injected ports;
- analytics event helpers/type contract;
- SEO metadata and JSON-LD builders;
- CMS result mapping;
- environment parser behavior.

Use Node environment by default. Use jsdom only for component tests that need the DOM.

### Component — React Testing Library

Test behavior through accessible roles and labels:

- menu open/close, focus return and Escape;
- StartProjectForm labels, errors, pending and accepted state;
- Turnstile reset integration through a local adapter boundary;
- carousel controls and keyboard behavior;
- reduced-motion variant of an interactive island.

Do not snapshot large component trees as a substitute for assertions.

### Adapter contract tests

Use mocked fetch/SDK boundaries to prove:

- Attio matching attribute and payload mapping;
- Resend deterministic idempotency keys;
- Turnstile success, timeout/duplicate and provider failure;
- PostHog server flush does not block application result;
- Sentry scrubber removes prohibited values.

No merge-blocking test writes to live production vendors.

### End to end — Playwright

Critical launch flows:

1. Homepage loads with primary navigation.
2. Editions index and one detail route load.
3. Atelier and Studio load.
4. Start a Project opens/navigates.
5. Required-field validation is accessible.
6. Turnstile failure resets and can retry.
7. Successful deterministic submission shows accepted state.
8. CRM failure shows recoverable state without false success.
9. Resend failure after CRM still shows accepted state.
10. Unknown URL shows the designed 404.

Cloudflare test keys are used. CI uses deterministic test-only adapters for Attio/Resend/PostHog selected by ORVAUXE_E2E_MODE=stub; env validation rejects this mode in production. The production adapter graph remains the default in every non-test deployment.

## Vitest organization

Use per-package vitest.config.ts files or Vitest projects from a root config. Do not create vitest.workspace.ts; current Vitest documentation deprecates the workspace configuration name.

Turbo runs package test scripts. UI uses jsdom; analytics runs separate runtime-neutral and Node tests as needed; web unit tests include module and configuration behavior.

## Accessibility

Playwright uses @axe-core/playwright on:

- Home;
- Edition detail;
- Atelier;
- Start a Project default, invalid and accepted states;
- open navigation.

New serious/critical automated violations block merge. Suppression requires a documented issue, narrow selector/rule and expiry owner.

Manual release checks remain mandatory:

- keyboard-only completion;
- visible and unobscured focus;
- VoiceOver or NVDA journey through navigation and inquiry;
- zoom/reflow;
- reduced motion;
- meaningful alt text and reading order.

Automated axe checks do not prove WCAG conformance.

## Visual regression

Initial approved baselines:

| Page | Desktop | Mobile |
|---|---:|---:|
| Home | 1440×1000 | 390×844 |
| Edition detail | 1440×1000 | 390×844 |
| Atelier | 1440×1000 | deferred until design if cost needs control |

Use one Chromium baseline environment initially for stability. Additional browsers are functional E2E targets, not duplicate visual baselines, unless defects justify them.

Tests fix fonts, viewport, content fixtures, clock where visible and reduced-motion/animation completion. Mask only genuinely nondeterministic external content. Never mask the art-directed area under test.

Baseline changes require:

1. linked design/brand context;
2. before/after screenshots;
3. reviewer approval;
4. baseline update in the same PR.

Once baselines are approved, critical visual diffs block merge.

## Browser matrix

Merge E2E: Chromium desktop and mobile emulation. Pre-launch/nightly: current Chromium, WebKit and Firefox on critical flows; real Safari/iOS spot check before launch. Expand only from analytics/device evidence.

## Test data

- No real lead PII in fixtures.
- Stable Edition/content fixtures are versioned in tests.
- Production credentials are unavailable to test jobs.
- Test submission IDs are valid UUIDs and clearly tagged in the stub adapter.
- Screenshot fixtures use licensed/local assets approved for development.

## Flake policy

A flaky blocking test is a defect. Quarantine is temporary, owned and time-bound. Retries may gather evidence but cannot hide persistent nondeterminism. Fix data, waiting conditions or environment rather than adding arbitrary sleeps.

