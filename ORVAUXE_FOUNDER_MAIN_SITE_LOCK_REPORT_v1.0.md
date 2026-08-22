# ORVAUXE Founder Main-Site Lock Report v1.0

## Status

READY FOR FOUNDER REVIEW

PR #13 was merged into `main` at `a767614edf76a43940e263b434cff45a475bb5b0` before this pass. Work continued on `fix/founder-main-site-lock-v1`. No production deployment or Shopify theme publication was performed.

## Start a Project

- Reframed the visible security step from “Bot verification” to “Verification”.
- Replaced mechanical instructions with “Verify securely before sending your inquiry.” and the action “Verify & continue”.
- Preserved the existing Turnstile token contract, server verification and failure semantics; the explicit step remains because inquiry submission still requires a verified token.
- Widened the desktop form panel, retained 48 px control targets and reduced compressed two-column rhythm. At 768 px the controls now remain in one readable column; the paired desktop layout begins at 64 rem.
- Confirmed no horizontal page overflow and no mobile regression at 375, 430, 768, 1440 and 1920 px.

## Home storefront-system rhythm

The live sticky sequence was inspected at 1440×900 and 1920×1080. All six states—home, collection, product, cart, editorial and mobile—advance through the scroll; the preview remains sticky during the active sequence and exits naturally with the final step. The apparent empty left area in a full-page capture is a screenshot artifact rather than dead user scroll. Scroll distance and sticky behavior were therefore left unchanged.

## Concept Edition language

- Removed the immediate duplicate “Concept product study” label from the Home proof overlay while retaining “ORVAUXE Original” and the explicit “Concept Edition / ORVAUXE Original” metadata.
- Replaced one repeated Nocturne status sentence with a concise product-study description.
- Preserved truthful `ORVAUXE Original` and `Concept Edition` status in the edition hero, product metadata and proof context. No availability, client-launch or publication claim was introduced.

## Visual baselines

Windows baselines were updated for the affected Home, Nocturne and Start a Project views. The explicit Linux candidate workflow completed successfully as GitHub Actions run `32606016618`; 12 of 15 generated candidates matched the repository byte-for-byte. Human review accepted only the three changed Linux captures:

- Start a Project desktop 1440
- Start a Project mobile 375
- Nocturne mobile 375

Visual comparison tolerance remains unchanged (`maxDiffPixelRatio: 0.02`, `threshold: 0.25`).

## Quality gates

- `pnpm install --frozen-lockfile` — PASS
- `pnpm format:check` — PASS
- `pnpm typegen:check` — PASS
- `pnpm lint` — PASS
- `pnpm typecheck` — PASS
- `pnpm test` — PASS (all workspaces; web: 82 tests)
- `pnpm build` — PASS with the repository CI test environment
- `pnpm test:e2e` — PASS (89 functional/axe passed, 23 intentionally skipped; 15 visual passed)
- `git diff --check` — PASS

## Deferred

The final motion-direction phase, production environment configuration and production deployment remain deferred. No broader redesign or new section was introduced in this lock pass.
