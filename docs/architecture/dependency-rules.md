# Dependency Rules

## Allowed graph

~~~text
apps/web/app
  ├── modules through public APIs
  ├── seo
  ├── config
  └── @orvauxe/ui

apps/web/modules
  ├── module-local code
  ├── infrastructure at composition/data boundaries
  ├── seo when building domain inputs
  ├── @orvauxe/ui
  └── @orvauxe/analytics explicit entrypoints

apps/web/infrastructure
  ├── config
  └── vendor SDKs / platform fetch

@orvauxe/ui
  └── @orvauxe/tokens

@orvauxe/analytics
  ├── posthog-js only in ./client
  └── posthog-node + server-only only in ./server

apps/studio
  └── Sanity packages
~~~

## Forbidden graph

| From | To | Status |
|---|---|---|
| any package | apps/* | forbidden |
| infrastructure | modules | forbidden |
| infrastructure | React UI | forbidden |
| @orvauxe/ui | infrastructure, Sanity, Attio, Resend | forbidden |
| @orvauxe/tokens | React or any vendor | forbidden |
| module A | module B private file | forbidden |
| client component | server-only config/infrastructure/analytics | forbidden |
| app page | module private file | forbidden |
| apps/web | apps/studio source | forbidden |
| browser analytics | Attio stage or PII | forbidden |

No initial exception is approved.

## Enforcement

@orvauxe/eslint-config uses ESLint flat config and:

- no-restricted-imports patterns for module deep imports from outside the module;
- patterns blocking apps paths from packages;
- patterns blocking infrastructure from modules;
- patterns blocking server-marked files in client files;
- import/no-cycle or equivalent cycle detection where reliable;
- report unused disable directives.

Naming conventions make runtime intent visible: privileged vendor modules end in .server.ts. Those files also import server-only, so a build fails if they enter a client graph.

Package package.json files expose only deliberate entrypoints. @orvauxe/analytics has no mixed root barrel. @orvauxe/ui exports primitives explicitly. @orvauxe/tokens exposes CSS and optional immutable token metadata.

## Cross-domain access

Allowed:

~~~ts
import { EditionScreen } from "@/modules/editions"
~~~

Forbidden outside Editions:

~~~ts
import { editionQuery } from "@/modules/editions/data/edition.query"
~~~

Inside the Editions module, relative imports are preferred. A public API is not a convenience barrel; it contains only capabilities another owner is allowed to rely on.

## Dependency admission

Every new dependency needs answers:

1. Which owned problem requires it?
2. Can the platform or existing dependency solve that problem?
3. Is it runtime, development, browser or server-only?
4. What browser/build/operational cost does it add?
5. Which app or package owns upgrades?
6. What is the removal or replacement surface?

Lockfile changes are reviewed as architecture-impacting when they introduce a new runtime vendor, browser script or privileged client.

