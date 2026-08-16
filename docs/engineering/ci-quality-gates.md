# CI Quality Gates

## Pull-request workflow

~~~text
checkout
→ setup Node and pnpm
→ pnpm install --frozen-lockfile
→ generate/check Sanity types
→ lint
→ typecheck
→ unit/component tests
→ production builds
→ Playwright E2E
→ axe checks
→ approved visual comparisons
→ Vercel Preview
~~~

Vercel Preview is produced by the Git integration, not a duplicate custom deploy job.

## Blocking policy

Blocking immediately:

- frozen-lockfile install;
- lint;
- strict typecheck;
- generated schema/type drift;
- unit/component tests;
- web and Studio production builds;
- secret scanning/provider branch protection.

Blocking when deterministic fixtures are present in the skeleton/application phase:

- critical E2E;
- axe on critical states.

Blocking after approved design baselines:

- Home desktop/mobile;
- Edition desktop/mobile;
- Atelier desktop.

Performance audits begin informational until the measurement environment and budgets are stable, then regressions beyond approved budgets block.

## Turbo graph

Conceptual tasks:

| Task | Dependency | Cache | Outputs |
|---|---|---:|---|
| dev | none | no; persistent | none |
| lint | ^lint | yes | none |
| typecheck | ^typecheck | yes | none |
| test | ^test | yes | coverage only if produced |
| build | ^build | yes | .next/** excluding cache; dist/** |
| e2e | web build or webServer | no initially | reports/screenshots on failure |

The root typegen:sanity/check script runs before Turbo typecheck/build in CI because it writes a generated web file from the Studio schema. Do not force this cross-app generator into a misleading package dependency.

Turbo task hashes include lockfile, relevant configs and environment values affecting build output. Client NEXT_PUBLIC_ values and Studio project/dataset values must not reuse a cache produced for another environment.

## Job shape and cost

Start with one quality job for install/generate/lint/typecheck/unit/build and one browser job dependent on it. This avoids installing Playwright for failures already caught by fast checks.

Use pnpm/Turbo caching with explicit keys. Do not cache secrets, .env files or test result state that changes assertions. Upload Playwright report, traces and screenshot diffs only on failure or for the documented retention period.

## Merge policy

- protected main;
- required green blocking checks;
- at least one reviewer;
- design review for visual baseline change;
- architecture owner review for package/boundary/ADR changes;
- no direct production hotfix without follow-up PR/incident record.

No coverage percentage alone blocks merge. Missing tests for changed critical behavior can block during review.

## Failure messages

Every script must be runnable locally and name the failing app/package. CI should link or print the exact command. Avoid CI-only magic.

## Supply chain

- frozen pnpm lockfile;
- dependabot or equivalent scheduled review;
- secret scanning and push protection;
- review new install scripts/runtime dependencies;
- pin action major versions and update deliberately.

