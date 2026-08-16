# Official Sources Reviewed

Accessed 2026-08-16. Primary documentation is preferred; the implementation phase must re-check release-specific details before installing versions.

## Framework and language

- React Server Components: https://react.dev/reference/rsc/server-components
- Next.js App Router: https://nextjs.org/docs/app
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js instrumentation: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation
- Next.js client instrumentation: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
- Next.js Server Actions configuration: https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions
- Next.js metadata: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- TypeScript strict: https://www.typescriptlang.org/tsconfig/strict
- TypeScript exact optional properties: https://www.typescriptlang.org/tsconfig/exactOptionalPropertyTypes.html
- TypeScript unchecked indexed access: https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html
- ESLint flat configuration: https://eslint.org/docs/latest/use/configure/configuration-files

## Workspace and deployment

- pnpm workspaces and workspace protocol: https://pnpm.io/workspaces
- Turborepo task configuration: https://turborepo.com/docs/crafting-your-repository/configuring-tasks
- Vercel Turborepo deployment: https://vercel.com/docs/monorepos/turborepo
- Vercel environment variables: https://vercel.com/docs/environment-variables

## Content and integrations

- Sanity schemas: https://www.sanity.io/docs/studio/schemas-and-forms
- Sanity TypeGen: https://www.sanity.io/docs/apis-and-sdks/sanity-typegen
- Attio record upsert: https://docs.attio.com/rest-api/endpoint-reference/records/upsert-a-record
- Attio webhooks: https://docs.attio.com/rest-api/guides/webhooks
- Resend email API: https://resend.com/docs/api-reference/emails/send-email
- Resend idempotency keys: https://resend.com/docs/dashboard/emails/idempotency-keys
- Turnstile server validation: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
- Turnstile test keys: https://developers.cloudflare.com/turnstile/troubleshooting/testing/

## Analytics and observability

- PostHog Next.js: https://posthog.com/docs/libraries/next-js
- PostHog event capture: https://posthog.com/docs/product-analytics/capture-events
- PostHog privacy: https://posthog.com/docs/privacy
- Sentry Next.js: https://docs.sentry.io/platforms/javascript/guides/nextjs/

## Quality and search

- Vitest test projects: https://vitest.dev/guide/projects
- Playwright visual comparisons: https://playwright.dev/docs/test-snapshots
- Playwright and axe: https://playwright.dev/docs/accessibility-testing
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Google Search sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Google canonical guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google structured data guidance: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data

## Current-documentation findings that affect v1.0

1. React/Next.js server-first assumptions remain valid; use client defines the browser module boundary.
2. Next.js provides both instrumentation.ts and instrumentation-client.ts as framework conventions.
3. pnpm requires pnpm-workspace.yaml and supports explicit workspace: dependencies; ORVAUXE uses workspace:*.
4. Turbo cache correctness requires environment values affecting builds to be declared in task inputs.
5. Sanity TypeGen generates schema and named-GROQ result types; manual CMS interfaces are not accepted.
6. Attio upsert requires a unique matching attribute; submission_id must be configured unique before launch.
7. Turnstile tokens are single-use, expire after five minutes and Siteverify accepts a UUID idempotency_key.
8. Resend supports idempotency keys for 24 hours; retries outside that window require operator care.
9. PostHog currently advertises a pre-release Next package; v1.0 deliberately uses stable JS/Node SDKs behind the ORVAUXE abstraction.
10. Vitest workspace configuration is deprecated in favor of projects; no vitest.workspace file is planned.
