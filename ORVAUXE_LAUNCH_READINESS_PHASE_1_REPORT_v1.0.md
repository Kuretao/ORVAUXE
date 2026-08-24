# ORVAUXE Launch Readiness Phase 1 Report v1.0

## Status

**SANITY PRODUCTION CONTENT SEEDED AND VERIFIED.**

No Vercel Web project, web deployment, domain configuration, Sanity Studio deployment, Shopify deployment, or Nocturne publication was performed.

## Git basis

- Current `main` / `origin/main` at branch creation: `6aa0d52929eb50e4796090540625e065f01d62c5`
- Branch: `feat/launch-readiness-phase-1`
- Seed implementation branch SHA: `c3d4ad4764d4793e0aa2aba9ad9edb4eec76ae77`
- The final documentation commit and final branch SHA are recorded in the PR and handoff because this report is part of that subsequent commit.

## CMS ownership audit

| Content type   | Ownership decision                                                                                                                                 | Result                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `homePage`     | Sanity owns founder-approved narrative, CTAs, commercial labels, featured Edition reference and SEO copy; composition and motion remain code-owned | Published singleton seeded as `homePage`                |
| `atelierPage`  | Sanity owns approved service, process, commercial and SEO copy; page structure and visual implementation remain code-owned                         | Published singleton seeded as `atelierPage`             |
| `studioPage`   | Sanity owns approved studio narrative, anonymous experience proof and SEO copy; page structure and visual implementation remain code-owned         | Published singleton seeded as `studioPage`              |
| `edition`      | Sanity owns the constrained Nocturne product record and approved Edition media references                                                          | Published document seeded as `edition-001-nocturne`     |
| `siteSettings` | Intended for Sanity, but its required production contact email is not known                                                                        | Mutation postponed; no email or social profile invented |
| `legalPage`    | Intended for Sanity after entity facts and legal copy are approved                                                                                 | No legal document seeded                                |

No generic page builder, schema redesign, section reordering, copy rewrite, price change, positioning change, or motion change was introduced. `ORVAUXE Original` remains a controlled web-model label; the seeded Nocturne `status: draft` maps to the public `Concept Edition` label.

## Seed architecture

The Studio package now provides:

- `seed:dry-run` for a non-mutating plan;
- `seed:production` for guarded asset upload/reuse, deterministic `createOrReplace` writes and immediate read-back;
- `seed:verify` for independent published-data verification.

The mechanism is restricted to project `avdwmukn` and dataset `production`. It refuses any other target before constructing a remote mutation. Singleton IDs and `edition-001-nocturne` are deterministic. Repeated execution replaces the same four records, and Sanity content-addresses duplicate asset uploads rather than creating duplicate binary assets.

The mutation client reads only `SANITY_SEED_TOKEN`. The independent verification client reads only `SANITY_API_TOKEN`. Neither token value is in source, command output, the report, or Git.

## Dry-run and production mutation

Dry-run completed before mutation and planned:

- 11 approved asset upload/reuse operations;
- four `createOrReplace` operations;
- explicit skips for `siteSettings` and `legalPage`.

It performed no remote mutation and exposed no secret value.

The production mutation then completed successfully for:

- `edition-001-nocturne` (`edition`);
- `homePage` (`homePage`);
- `atelierPage` (`atelierPage`);
- `studioPage` (`studioPage`).

All four are published records. No incomplete contact or legal document was published.

## Remote verification

Immediate post-mutation verification and a separate subsequent `seed:verify` both passed through the Viewer client. Read-back confirmed:

- every expected deterministic ID and document type;
- one `homePage`, one `atelierPage` and one `studioPage`;
- one Edition with slug `nocturne` and Edition number `1`;
- Nocturne `status: draft`, preserving public `Concept Edition` truth;
- Nocturne `From $2,490`;
- Home Atelier copy `Projects from $6,000`;
- founder-locked Home and Atelier headings;
- anonymous Studio trust copy including fiscal receipt support.

## Media ownership

Repository files remain the source for visual implementation assets that do not require editorial control, including Home campaign states and the Atelier/Studio in-page material compositions. Those paths were not moved into arbitrary CMS fields.

Sanity received approved copies only where the existing CMS contracts require or benefit from editorial ownership:

- Nocturne hero and two material gallery images;
- six founder-approved public Storefront v1 proof derivatives used by the Edition contract;
- existing ORVAUXE-original Atelier and Studio SEO share images.

The storefront proof derivatives are the already public, processed assets documented in `docs/product/nocturne-proof-provenance.md`. No raw QA capture, private repository artifact, development-store detail, credential, token, customer record, or Shopify administration view was uploaded.

## Content blockers

- `siteSettings` remains unseeded because `contactEmail` is required and no real production ORVAUXE mailbox is confirmed. The schema was not weakened.
- No unverified social profiles or default SEO image were added.
- Legal pages remain unseeded pending entity, jurisdiction, effective-date and approved-copy decisions.
- No public Nocturne demo URL or availability claim was added.

## Token policy

- `SANITY_API_TOKEN`: Viewer role; persistent server-only draft/preview reads; never browser-visible, `NEXT_PUBLIC`, or committed.
- `SANITY_SEED_TOKEN`: temporary Editor role; migration writes only; never a deployment variable or mutation fallback for the Viewer token.

The production seed and read-back are complete. Founder action is now to revoke the temporary Editor token in Sanity and remove `SANITY_SEED_TOKEN` from the ignored local `.env.local`. The Viewer token remains subject to normal least-privilege storage and rotation policy.

## Deployment preflight and blockers

The exact Preview/Production/build environment matrix and conservative launch blocker matrix are in `docs/operations/deployment-environment.md`.

Known public web values are:

- `NEXT_PUBLIC_SANITY_PROJECT_ID=avdwmukn`
- `NEXT_PUBLIC_SANITY_DATASET=production`

Sanity content is `PARTIAL` until truthful Site Settings and legal content can be published. Domain/DNS, Resend/mailboxes, Turnstile, Attio, PostHog and Sentry need founder provisioning or decisions. Legal and email are blocked on real launch facts. Vercel Web and production QA are `NOT STARTED` by design.

## Quality gates

- `pnpm install --frozen-lockfile` — PASS
- `pnpm format:check` — PASS
- `pnpm typegen:check` — PASS (22 schema types, seven queries, no generated drift)
- `pnpm lint` — PASS
- `pnpm typecheck` — PASS
- `pnpm test` — PASS (130 tests: Studio 16, Web 85, UI 12, Analytics 11, Tokens 6)
- `pnpm build` — PASS (Sanity Studio and Next.js production builds included)
- `git diff --check` — PASS
- Independent production `seed:verify` — PASS

Focused seed coverage verifies deterministic IDs, repeat-safe replacement behavior, Nocturne status and price, project/dataset refusal, dry-run non-mutation and surfaced-error token redaction.

## Next founder actions

1. Revoke the temporary Sanity Editor seed token and remove it from the ignored local env file.
2. Confirm the production domain, real ORVAUXE mailbox, Resend sender/recipient and legal entity facts.
3. Provision least-privilege Turnstile, Attio, PostHog and Sentry configuration.
4. Review this branch and PR without merging automatically.
5. Create and configure Vercel Web only in the next approved phase, followed by deployed production QA.

Next Phase: External Services Provisioning & Vercel Web Pre-Production
