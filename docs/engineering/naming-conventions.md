# Naming Conventions

## Files and folders

| Item | Convention | Example |
|---|---|---|
| folders | kebab-case | project-inquiry |
| React components | PascalCase.tsx | EditionGallery.tsx |
| client components needing explicit signal | PascalCase.client.tsx | StartProjectForm.client.tsx |
| utilities/local functions | kebab-case.ts | normalize-domain.ts |
| server-only modules | kebab-case.server.ts | client.server.ts |
| schemas | *.schema.ts | project-inquiry.schema.ts |
| GROQ queries | *.query.ts | edition.query.ts |
| Server Actions | *.action.ts | submit-project-inquiry.action.ts |
| unit/component tests | *.test.ts(x) | normalize-domain.test.ts |
| E2E tests | *.spec.ts | project-inquiry.spec.ts |
| generated files | descriptive generated name | sanity.types.ts |
| configs | tool convention | next.config.ts, eslint.config.mjs |
| docs | kebab-case.md except named deliverables | dependency-rules.md |
| ADR | ADR-NNNN-kebab-case.md | ADR-0003-domain-module-architecture.md |

The .client suffix is required where it materially reveals a client island or prevents accidental server assumptions. Not every small component needs the suffix. The .server suffix is required for privileged adapters/config.

## TypeScript symbols

- Components, classes and exported types: PascalCase.
- Functions, values and fields: camelCase.
- Environment variables and true constants: UPPER_SNAKE_CASE.
- Analytics event and property wire names: lower_snake_case.
- Sanity schema type/field names: lowerCamelCase.
- URL paths and slugs: kebab-case.

Boolean names start with is, has, can, should or a clear predicate. Avoid data, info, item, thing, helper and manager when a domain word exists.

## Functions

Name functions for outcomes:

- getEdition — read that may return absence;
- requireEdition — read that throws/returns error on absence;
- normalizeEmail — deterministic transformation;
- verifyTurnstile — external verification;
- submitProjectInquiry — application use case;
- upsertDealBySubmissionId — explicit vendor operation.

Avoid handleSomething outside event-handler UI code and processData without a domain noun.

## Events and identifiers

Analytics events remain object_verb in lower snake case, for example edition_viewed. DOM callback names may be camelCase such as onEditionDemoOpen.

Identifiers include their domain:

- editionSlug;
- submissionId;
- attioRecordId;
- resendEmailId.

Do not use generic id when more than one identity exists.

## Generated files

The first lines of generated files must state:

~~~text
GENERATED FILE — DO NOT EDIT MANUALLY.
Source and regeneration command: see docs/architecture/cms-architecture.md.
~~~

Generated output is not reformatted by hand. Change the schema/query/generator and regenerate.

## Documentation terms

Use Edition, Atelier, Studio and Start a Project exactly as product names. Use project inquiry for the technical domain and lead for the accepted CRM entity. Do not introduce Work or Journal as live launch capabilities.

