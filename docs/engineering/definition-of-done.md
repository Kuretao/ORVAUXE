# Definition of Done

A task is complete only when every relevant item below is true. Non-applicable items are marked with a short reason in the PR.

## Product and behavior

- Acceptance behavior is implemented and matches the approved product/brand contract.
- Loading, empty, error, retry and success states are defined.
- No placeholder, fake metric, fake client work or unapproved future route is exposed.
- Integration partial-failure behavior matches the architecture.

## Architecture

- Code lives with the closest owner.
- Cross-domain imports use public APIs.
- No forbidden dependency or new dumping-ground folder was introduced.
- Server/client boundary is minimal and secrets remain server-only.
- New package/vendor/boundary decision has an ADR when required.

## Type and validation

- TypeScript strict checks pass with no unexplained any or non-null assertion.
- Untrusted inputs and external responses are validated/narrowed at the boundary.
- Environment access goes through typed config.
- Generated Sanity types are current and unedited.

## UX and brand

- Defined mobile/desktop layouts are checked with long and missing content.
- Typography, tokens, image treatment and motion follow Brand Book v1.1.
- No generic Tailwind appearance or arbitrary token bypass remains.
- Visual diff is reviewed for art-directed pages.

## Accessibility

- Semantic structure and accessible names are correct.
- Keyboard journey, focus order/visibility and error focus are checked.
- Screen-reader status/error behavior is checked where interactive.
- Target size, contrast, zoom/reflow and reduced motion are checked.
- Relevant axe checks pass; automation is supplemented by manual review.

## Performance

- Server Component default was preserved.
- New client JavaScript and third-party code have a clear need.
- Images have dimensions, responsive sizes and appropriate optimization.
- Fonts and GSAP do not introduce avoidable shift/blocking.
- Relevant budgets/Core Web Vitals impact is reviewed.

## Analytics, SEO and CMS

- Required events use the typed dictionary and do not duplicate.
- No PII/free text reaches PostHog/Sentry.
- Page metadata, canonical, heading structure and JSON-LD are correct when relevant.
- CMS validation, preview and editor constraints are verified.
- Content changes do not allow editors to redesign the page.

## Testing and operations

- Appropriate unit/component/E2E coverage is added for changed risk.
- Critical failure paths are tested.
- No unexpected browser/server console errors.
- Logs/errors are actionable and scrubbed.
- Deployment/rollback/runbook impact is updated if behavior changed.

## Review and documentation

- CI is green.
- Screenshots and test evidence are attached as relevant.
- Contract/architecture/environment/event changes update documentation in the same PR.
- Required engineering, product/design and architecture reviews are complete.

