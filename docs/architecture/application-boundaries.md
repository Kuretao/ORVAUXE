# Application Boundaries

## Routing versus capability

The app directory expresses the URL and Next.js lifecycle. A domain module expresses what ORVAUXE does.

Routes own:

- params and search-parameter contracts;
- metadata and canonical composition;
- page-level loading/error/not-found choices;
- calls into one or more public domain APIs;
- top-level page composition.

Routes do not own:

- GROQ strings;
- Edition rendering internals;
- form workflow;
- vendor authentication;
- analytics SDK calls.

## Module contracts

### Home

Owns the production homepage content query, mapping, deterministic local/E2E fallback and the
fixed editorial presentation for the launch narrative. The Sanity `homePage` singleton owns
approved copy, CTAs, media references and one featured Edition; React owns the stable section
sequence, grid, surface themes and responsive art direction. Home must not evolve into a generic
page builder.

Public API: `getHomePage`, `HomeScreen` and the route-ready `HomePageData` type.

Allowed dependencies: the Sanity client and image adapters from the data layer, UI primitives,
and the typed analytics client from a focused interactive leaf when a CTA needs measurement.

Forbidden: direct vendor SDKs in UI, hardcoded production marketing copy scattered through JSX,
Edition detail deep-links without truthful route content, client-only page rendering, or generic
layout/animation selectors exposed to editors.

### Editions

Owns the launch Edition catalogue and detail capability. Its data folder owns named GROQ queries and mapping from generated query results into route-ready Edition models. Its UI owns Edition index/detail screens and Edition-specific interactive islands.

Public API: the client-safe `public.ts` exposes the shared Nocturne storefront presentation and
route-ready Edition types. The explicit server-only `server.ts` entry exposes `getEditions`,
`getEdition`, `getEditionSlugs`, `EditionIndexScreen` and `EditionScreen` to App Router server
files. This split prevents Sanity and environment code from entering a client graph while keeping
all other module internals private.

Allowed dependencies: Sanity client adapter, UI primitives, analytics client for Edition interaction, shared SEO input types.

Forbidden: CRM/email logic, direct env reads, generic Button implementation, manual CMS interfaces.

### Atelier

Owns Atelier content retrieval, mapping and presentation. It may link to the public project-inquiry entry but does not own form orchestration.

Public API: getAtelierPage and AtelierScreen.

### Studio

Owns Studio content retrieval, mapping and presentation.

Public API: getStudioPage and StudioScreen.

### Legal

Owns retrieval, mapping and neutral presentation of every `legalPage` document under `/legal/[slug]`. One module serves privacy, terms, cookies and later approved legal documents; separate application modules per document are forbidden.

Public API: getLegalPage, getLegalPageSlugs and LegalPageScreen.

### Project inquiry

Owns the inquiry form, Zod schema, normalized domain input, Server Action and application use case. The action is internal to the form; the route imports only StartProjectForm from public.ts.

Public API: StartProjectForm and public display types only if a route requires them.

The application use case accepts narrow injected ports. The action composition binds those ports to vendor adapters. This preserves testability without a generic service container.

## Infrastructure

Infrastructure adapters expose vendor-shaped operations but not UI or route decisions:

- sanity: configured clients, image URL support, preview helpers;
- attio: upsert Person, conditional Company and Deal-by-submission operations;
- resend: idempotent email send functions;
- turnstile: Siteverify request and response mapping;
- observability: Sentry setup and safe reporting helpers.

Infrastructure errors are translated into application error types at the composition/use-case boundary.

## No hidden shared layer

There is no global services or shared domain folder. Cross-cutting behavior is placed according to its actual nature:

- runtime configuration → config;
- SEO builders → seo;
- analytics contract → package;
- visual primitive → UI package;
- vendor protocol → infrastructure;
- local transformation → its module.
