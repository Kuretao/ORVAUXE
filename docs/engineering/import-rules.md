# Import Rules

## General order

Import groups:

1. framework and external packages;
2. @orvauxe workspace packages;
3. web aliases across architectural boundaries;
4. relative module-local files;
5. type-only imports where appropriate;
6. styles/assets according to framework convention.

Formatting is automated; reviewers focus on dependency direction.

## Stable boundaries

Across workspace packages:

~~~ts
import { Button } from "@orvauxe/ui"
import { track } from "@orvauxe/analytics/client"
~~~

Across web domain boundaries:

~~~ts
import { EditionScreen } from "@/modules/editions"
~~~

Within one module:

~~~ts
import { editionQuery } from "../data/edition.query"
~~~

Avoid relative paths that leave the current architectural owner. Six-level ../../ chains signal a missing alias or incorrect ownership.

## Module public.ts

public.ts exports only supported cross-boundary capabilities. It must:

- use named exports;
- avoid side effects;
- not re-export internal query constants unless another owner genuinely needs them;
- not re-export server and client implementations through one unsafe graph;
- remain small enough to review as the module contract.

The @/modules/* alias resolves module imports to public.ts. ESLint blocks explicit deep paths from outside.

## Package exports

@orvauxe/analytics exports:

- ./events — types and event catalogue, runtime-neutral;
- ./client — browser adapter;
- ./server — server-only adapter.

It does not offer a root implementation export.

@orvauxe/tokens exports:

- ./styles.css;
- optional runtime-neutral token metadata from its root.

@orvauxe/ui exports only implemented primitives from the package entry.

## Type-only imports

Use import type when a symbol is needed only by TypeScript. Do not use type-only imports to disguise a forbidden ownership direction. Infrastructure still may not import domain types from modules.

Composition code inside project-inquiry maps domain input to the primitive adapter input, allowing infrastructure to remain independent of modules.

## Server/client safety

- Client-marked files may import @orvauxe/analytics/client but not /server.
- Privileged files import server-only.
- No mixed barrel exports a .server file beside a client-safe export.
- env.server is imported only from server files.
- env.client contains only public allowlisted values.
- packages/ui and tokens never import web aliases.

## Lint policy

Initial restrictions are implemented with ESLint flat config and no-restricted-imports patterns. If pattern rules become too coarse, add a narrowly justified boundaries plugin; do not add a dependency before a real enforcement gap appears.

Lint suppressions require a local explanation. Repository-wide disable rules need an ADR or engineering-document change.

