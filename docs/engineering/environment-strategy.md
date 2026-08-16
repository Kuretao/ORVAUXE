# Environment Strategy

## Environments

| Environment | Purpose | Data/integrations |
|---|---|---|
| local | developer work | local/test keys; no production writes |
| preview | PR review, CMS preview, QA | non-production dataset/credentials |
| production | public site and real leads | production dataset/credentials |

Staging is not created. Add it only when a persistent production-like rehearsal cannot be achieved with protected Preview deployments.

## Ownership

Vercel stores web/Studio environment values by project and environment. .env.local is ignored. Root .env.example documents names and purpose, never values. Each variable has a named operational owner in the vendor inventory.

src/config/env.server.ts parses privileged web variables and imports server-only. env.client.ts parses only browser-safe variables. Studio has its own small typed environment reader in its app config. Missing required configuration fails the relevant app early.

## Root .env.example inventory

### Shared public/non-secret values

| Variable | Consumer | Required | Purpose |
|---|---|---:|---|
| NEXT_PUBLIC_SANITY_PROJECT_ID | web | yes | public Sanity project ID |
| NEXT_PUBLIC_SANITY_DATASET | web | yes | public dataset name |
| NEXT_PUBLIC_TURNSTILE_SITE_KEY | web client | yes | widget site key |
| NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN | analytics client/server | production | PostHog project token |
| NEXT_PUBLIC_POSTHOG_HOST | analytics | production | regional ingest host |
| NEXT_PUBLIC_SENTRY_DSN | Sentry client/server | production | Sentry DSN |
| SANITY_STUDIO_PROJECT_ID | Studio | yes | Studio project ID |
| SANITY_STUDIO_DATASET | Studio | yes | Studio dataset |

These values are browser-visible by design. They still pass typed validation and are scoped to the correct project/environment.

### Server-only web values

| Variable | Required | Purpose |
|---|---:|---|
| ORVAUXE_SITE_URL | yes | absolute canonical production/preview base |
| SANITY_API_TOKEN | preview/production as configured | draft/preview read token |
| SANITY_PREVIEW_SECRET | preview/production | protects draft-mode activation |
| ATTIO_API_KEY | production/preview integration | least-privilege CRM token |
| ATTIO_DEFAULT_DEAL_OWNER | production/preview integration | default owner for a new project-inquiry Deal |
| ATTIO_DEFAULT_DEAL_STAGE | production/preview integration | default initial stage for a new project-inquiry Deal |
| RESEND_API_KEY | production/preview integration | transactional email token |
| RESEND_FROM_EMAIL | production/preview | verified sender |
| PROJECT_INQUIRY_RECIPIENT_EMAIL | production/preview | internal notification destination |
| TURNSTILE_SECRET_KEY | yes | server Siteverify secret |

### Build/CI only

| Variable | Purpose |
|---|---|
| SENTRY_AUTH_TOKEN | upload source maps; never runtime/client |
| SENTRY_ORG | source-map project coordinates |
| SENTRY_PROJECT | source-map project coordinates |
| TURBO_TOKEN | optional remote cache authentication |
| TURBO_TEAM | optional remote cache scope |

### Test only

| Variable | Purpose |
|---|---|
| ORVAUXE_E2E_MODE | set to stub only in local/CI test execution |

env.server rejects ORVAUXE_E2E_MODE=stub in Vercel production and in any unmarked self-hosted production runtime. Stub mode is accepted only when CI, test/development mode or an explicit loopback site URL proves a test context. Standard CI, NODE_ENV and VERCEL_ENV markers are runtime/platform-provided and are not assigned in .env.example.

## Values deliberately not configured

- No DATABASE_URL, Redis or queue variables.
- No public Attio/Resend/Sanity token.
- No generic API_SECRET.
- No NEXT_PUBLIC_ value containing privileged capability.
- No staging values until staging exists.

## Environment behavior

- Production uses the canonical ORVAUXE domain.
- Preview uses the deployment URL for preview metadata where appropriate but sets noindex and must not replace the production canonical policy accidentally.
- Local uses safe defaults only for non-secret values; required vendor paths use documented test keys or fail with a clear message.
- Vercel changes apply to new deployments, so secret rotation includes redeployment and verification.
- Build-affecting variables appear in the relevant Turbo task env list to prevent cache poisoning.

## Rotation and incident response

Rotate credentials when a contributor leaves, a token may be exposed, a provider requires it or the scheduled operational policy says so. On suspected exposure: revoke first, replace in Vercel, redeploy, validate, review logs and document the incident. Never paste secrets into issues, PRs or Sentry.
