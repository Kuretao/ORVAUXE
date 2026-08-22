# ORVAUXE CI Visual Baseline Report v1.0

## Original failure

GitHub Actions run `32601895244` passed `Quality` and failed `Deterministic E2E and axe` with 95
passed, 38 skipped and nine failed screenshot comparisons. Functional E2E and axe assertions passed.

Confirmed failures covered four completion-page captures, three Editions captures and two Homepage
captures. The Ubuntu screenshots preserved the approved content and composition, but cross-platform
font rasterization and text metrics changed full-page geometry. The shared platform-agnostic baseline
path was the root cause.

## Hardened baseline policy

- Canonical environment: GitHub Actions `ubuntu-24.04`, Node 24.19.0, pnpm 10.34.5 and Chromium
  pinned by `@playwright/test` 1.62.1.
- Snapshot paths encode `linux/` and `win32/`; Linux is the merge-blocking source of visual truth.
- Existing reviewed workstation baselines are retained under `win32/` for normal Windows QA.
- Normal CI only compares snapshots. Updates require an explicit candidate workflow, human review
  and a deliberate commit.
- Visual captures use one worker and a 15-second screenshot assertion timeout. Functional E2E and
  axe checks remain separately reported and parallel.
- Every capture waits for `document.fonts.ready` and verifies that the ORVAUXE display and interface
  font variables resolve to the active computed families.

## Verification

Candidate workflow run `32602984254` generated all 15 Linux baselines successfully. Every candidate
was reviewed against the approved site for content, section order, responsive composition, imagery,
font activation, overflow, CTA visibility and private-data exclusion. No product regression was
accepted as a baseline change.

Local validation passed: frozen install, formatting, Sanity type generation, lint, typecheck, 120
unit/component tests, production build and `git diff --check`. Windows E2E passed with 89 functional
tests, 23 intentional skips and 15 serialized visual comparisons.

Pull request `#13` triggered compare-only GitHub Actions run `32603345687`. `Quality` and
`Deterministic E2E and axe` both completed successfully, including the canonical Linux visual step.

## Recommendation

The deterministic visual-baseline fix is recommended for merge after founder review. All local gates
pass, every Linux candidate was visually approved and both hosted CI jobs are green.
