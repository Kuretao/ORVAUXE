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

Local and hosted results will be recorded after candidate review and final validation.

## Recommendation

Do not merge until all local gates pass, every Linux candidate is visually approved and both hosted
CI jobs are green.
