# Repository Map

## Top level

| Path | Owner | Purpose |
|---|---|---|
| apps/web | Web engineering | public acquisition application |
| apps/studio | Content platform | constrained Sanity Studio and schemas |
| packages/tokens | Design system | non-React design primitives |
| packages/ui | Design system | reusable presentational primitives |
| packages/analytics | Analytics engineering | typed event contract and PostHog adapters |
| packages/eslint-config | Platform | shared lint policy |
| packages/typescript-config | Platform | strict compiler baselines |
| docs | Technical lead | source-of-truth architecture and operations |
| .github | Engineering | CI and pull-request workflow |

## apps/web/src

| Path | Purpose | Typical files |
|---|---|---|
| app | route contracts and composition | page.tsx, layout.tsx, error.tsx, sitemap.ts |
| modules | web business capabilities | screens, domain queries, models, use cases |
| infrastructure | vendor adapters | client.server.ts, verify-turnstile.server.ts |
| seo | shared typed SEO builders | build-metadata.ts, JSON-LD builders |
| config | parsed app configuration | env.server.ts, env.client.ts, site.ts |
| generated | machine-generated contracts | sanity.types.ts |
| styles | application CSS entry and global behavior | globals.css |
| instrumentation.ts | server observability convention | Sentry registration/request errors |
| instrumentation-client.ts | browser instrumentation convention | Sentry/PostHog initialization |

## Domain public APIs

Every domain has public.ts as its deliberate entrypoint. The alias pattern @/modules/* resolves to that file for cross-boundary imports. The module may contain ui, data, model, application or actions only when each contains a real file.

Do not add a top-level components, hooks, services, utils, helpers or types directory. Those labels may exist inside an owned capability if narrow and justified.

## Generated files

apps/web/src/generated/sanity.types.ts and apps/studio/schema.json are generated, committed and checked for drift. They are never edited manually. Their source is the Sanity schema plus named GROQ queries.

## Exact initial tree

SKELETON_READY.md is the only authority for which paths are created in the next phase. Diagrams in supporting documents describe ownership possibilities, not permission to create empty directories.

