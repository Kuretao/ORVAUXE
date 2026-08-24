# Deployment environment

This inventory is the pre-production contract for the ORVAUXE web and Studio projects. Values live in the owning provider, never in Git. `apps/studio/.env.local` is ignored and is used only for local Studio and migration work.

## Vercel and CI matrix

`Required` below reflects the current runtime parser in `apps/web/src/config/env.server.ts`. Production-only observability variables are not required in Preview by that parser.

| Variable                            | Public / secret | Preview             | Production          | Provider                             | Purpose                                          | Current status                                   |
| ----------------------------------- | --------------- | ------------------- | ------------------- | ------------------------------------ | ------------------------------------------------ | ------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`     | Public          | Required            | Required            | Vercel Web                           | Published-content project                        | **Known:** `avdwmukn`; Web project not created   |
| `NEXT_PUBLIC_SANITY_DATASET`        | Public          | Required            | Required            | Vercel Web                           | Published-content dataset                        | **Known:** `production`; Web project not created |
| `ORVAUXE_SITE_URL`                  | Public          | Required            | Required            | Vercel Web                           | Absolute canonical/preview base URL              | Needs approved deployment URL and domain         |
| `SANITY_API_TOKEN`                  | Secret          | Required            | Required            | Vercel Web                           | Server-only Viewer token for draft/preview reads | Present locally; not configured for Web          |
| `SANITY_PREVIEW_SECRET`             | Secret          | Required            | Required            | Vercel Web                           | Protects draft-mode activation                   | Needs provisioning                               |
| `ATTIO_API_KEY`                     | Secret          | Required            | Required            | Vercel Web / Attio                   | Server-only project-inquiry CRM writes           | Needs provisioning                               |
| `ATTIO_DEFAULT_DEAL_OWNER`          | Secret          | Required            | Required            | Vercel Web / Attio                   | Approved owner for new inquiry Deals             | Needs founder configuration                      |
| `ATTIO_DEFAULT_DEAL_STAGE`          | Secret          | Required            | Required            | Vercel Web / Attio                   | Approved initial stage for inquiry Deals         | Needs founder configuration                      |
| `RESEND_API_KEY`                    | Secret          | Required            | Required            | Vercel Web / Resend                  | Server-only transactional email                  | Needs provisioning                               |
| `RESEND_FROM_EMAIL`                 | Public          | Required            | Required            | Vercel Web / Resend                  | Verified sender address                          | Blocked on real mailbox/domain                   |
| `PROJECT_INQUIRY_RECIPIENT_EMAIL`   | Public          | Required            | Required            | Vercel Web / email provider          | Internal inquiry destination                     | Blocked on real mailbox                          |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`    | Public          | Required            | Required            | Vercel Web / Cloudflare              | Browser challenge site key                       | Needs provisioning                               |
| `TURNSTILE_SECRET_KEY`              | Secret          | Required            | Required            | Vercel Web / Cloudflare              | Server-side challenge verification               | Needs provisioning                               |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Public          | Optional            | Required            | Vercel Web / PostHog                 | Production analytics project token               | Needs provisioning                               |
| `NEXT_PUBLIC_POSTHOG_HOST`          | Public          | Optional            | Required            | Vercel Web / PostHog                 | Regional analytics ingest host                   | Needs provisioning                               |
| `NEXT_PUBLIC_SENTRY_DSN`            | Public          | Optional            | Required            | Vercel Web / Sentry                  | Production error reporting endpoint              | Needs provisioning                               |
| `SENTRY_AUTH_TOKEN`                 | Secret          | Optional build/CI   | Optional build/CI   | Vercel or GitHub Actions / Sentry    | Source-map upload authorization                  | Needs provisioning if source maps are uploaded   |
| `SENTRY_ORG`                        | Public          | Optional build/CI   | Optional build/CI   | Vercel or GitHub Actions / Sentry    | Source-map organization coordinate               | Needs provisioning if source maps are uploaded   |
| `SENTRY_PROJECT`                    | Public          | Optional build/CI   | Optional build/CI   | Vercel or GitHub Actions / Sentry    | Source-map project coordinate                    | Needs provisioning if source maps are uploaded   |
| `TURBO_TOKEN`                       | Secret          | Optional build/CI   | Optional build/CI   | Vercel or GitHub Actions / Turborepo | Remote cache authentication                      | Optional; not confirmed                          |
| `TURBO_TEAM`                        | Public          | Optional build/CI   | Optional build/CI   | Vercel or GitHub Actions / Turborepo | Remote cache scope                               | Optional; not confirmed                          |
| `SANITY_STUDIO_PROJECT_ID`          | Public          | Required for Studio | Required for Studio | Vercel Studio                        | Studio project                                   | Configured: `avdwmukn`                           |
| `SANITY_STUDIO_DATASET`             | Public          | Required for Studio | Required for Studio | Vercel Studio                        | Studio dataset                                   | Configured: `production`                         |

`ORVAUXE_E2E_MODE` is test-only. The server parser rejects `stub` in production; it must never be configured on the production Web project.

## Migration-only token

| Variable            | Public / secret | Location               | Role                                                      | Lifecycle                                                              |
| ------------------- | --------------- | ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| `SANITY_SEED_TOKEN` | Secret          | Ignored local env only | Temporary Editor token for the controlled production seed | Revoke in Sanity and remove from `.env.local` after verified migration |

`SANITY_API_TOKEN` and `SANITY_SEED_TOKEN` are separate capabilities. The Viewer token is persistent server-only preview configuration. The Editor token is not a deployment variable and must never be copied to Vercel, a browser-visible variable, source control, logs, issues, or chat.

## Launch blocker matrix

| Area           | Status               | Exit condition                                                                                                                                                   |
| -------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sanity content | PARTIAL              | Founder-locked Home, Atelier, Studio and Nocturne are seeded; add Site Settings only after a real contact mailbox exists and add legal pages only after approval |
| Domain / DNS   | NEEDS FOUNDER ACTION | Approve domain, ownership and DNS plan                                                                                                                           |
| Email / Resend | BLOCKED              | Establish a real mailbox, verify sender/domain and provision Resend values                                                                                       |
| Turnstile      | NEEDS FOUNDER ACTION | Create approved site/secret key pair for Preview and Production                                                                                                  |
| Attio          | NEEDS FOUNDER ACTION | Provision least-privilege API access and confirm owner/stage identifiers                                                                                         |
| PostHog        | NEEDS FOUNDER ACTION | Provision production project token and regional host; approve analytics policy                                                                                   |
| Sentry         | NEEDS FOUNDER ACTION | Provision production DSN and decide source-map upload configuration                                                                                              |
| Legal          | BLOCKED              | Confirm entity, jurisdiction, effective dates and approved legal copy                                                                                            |
| Vercel Web     | NOT STARTED          | Create the Web project only in the next phase with `apps/web` as Root Directory                                                                                  |
| Production QA  | NOT STARTED          | Complete deployed content, inquiry, accessibility, responsive, performance and observability checks                                                              |

## Web project boundary

No Web Vercel project, domain, deployment, or production integration was created in Launch Readiness Phase 1. The later target is repository `Kuretao/ORVAUXE`, Root Directory `apps/web`, Framework `Next.js`.
