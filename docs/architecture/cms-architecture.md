# CMS Architecture

## Model

Sanity is a constrained editorial system. Editors may change approved content; they may not assemble arbitrary sections, CSS, spacing, animation or page layouts.

## Launch documents

### siteSettings singleton

Owns site name/description, contact details, verified social profiles, default SEO image and global legal/footer copy. Navigation labels/order remain code-owned to protect the approved information architecture.

### homePage singleton

Owns fixed-slot content: hero copy/media, clear service introduction, selected Edition references, Atelier introduction and closing CTA. The field model follows the approved page composition; it is not sections[].

### atelierPage singleton

Owns hero, service explanation, controlled capability/process content, approved commercial copy, CTA and SEO.

### studioPage singleton

Owns hero, point of view, origin/operating model, trust content, contact CTA and SEO.

### edition collection

Owns:

- name and slug;
- editionNumber and category;
- status: draft/available/retired or the product-approved controlled list;
- hero imageWithAlt;
- intro;
- gallery of imageWithAlt;
- controlled features;
- startingPrice copy;
- launchEstimate copy;
- optional approved demo URL;
- CTA;
- SEO.

Slug and Edition number require uniqueness validation. A retired Edition remains addressable only under the approved redirect/index policy.

### legalPage collection

Owns title, constrained slug, Portable Text body, SEO and effective/updated date. Legal content requires owner review; CMS publishing does not replace legal approval.

## Reusable objects

- seo: meta title, description, share image and explicit noIndex only where allowed.
- cta: label, allowed destination kind/value and optional analytics ID from an approved list.
- imageWithAlt: image asset, required alt for informative images, explicit decorative flag, crop/hotspot and optional caption/credit.

Do not add an object because it might be useful. Add it when two real schema fields share the same validated content contract.

## Explicit exclusions

No launch schema for:

- generic page;
- page sections[];
- service collection;
- caseStudy;
- journalPost;
- testimonial;
- FAQ;
- Work or Journal.

These may be reviewed only after their product trigger occurs.

## File ownership and naming

~~~text
apps/studio/src/schema-types/
├── documents/
│   ├── site-settings.ts
│   ├── home-page.ts
│   ├── atelier-page.ts
│   ├── studio-page.ts
│   ├── edition.ts
│   └── legal-page.ts
├── objects/
│   ├── seo.ts
│   ├── cta.ts
│   └── image-with-alt.ts
└── index.ts
~~~

File names are kebab-case; schema type names and field names are lower camelCase. Document IDs for singletons are stable and controlled by Studio structure. index.ts registers schema types; it is not a broad application barrel.

## Studio structure and editorial permissions

The Studio desk structure:

- surfaces the four singletons as single edit targets;
- groups Editions and Legal Pages as collections;
- hides singleton duplication;
- does not show system/internal document types to ordinary editors.

Preview and Production use separate datasets or explicitly documented dataset policy. Roles use least privilege. Publishing requires content/brand review; legal and pricing changes require the named business owner.

## Type generation

Queries must be named variables using defineQuery or the supported GROQ helper so TypeGen can discover them. The workflow is:

~~~text
pnpm typegen:sanity
  1. sanity schema extract → apps/studio/schema.json
  2. sanity typegen generate
     schema: apps/studio/schema.json
     query path: apps/web/src/**/*.query.ts
     output: apps/web/src/generated/sanity.types.ts
  3. add DO NOT EDIT MANUALLY banner
~~~

Both generated artifacts are committed. CI regenerates and fails when git diff shows drift. Generated types may be imported by domain data/mapping files; no route imports Studio source.

## Query ownership

The Sanity client is in infrastructure/sanity. Queries live with their consumer:

~~~text
modules/editions/data/editions.query.ts
modules/editions/data/edition.query.ts
modules/atelier/data/atelier-page.query.ts
modules/studio/data/studio-page.query.ts
modules/legal/data/legal-page.query.ts
~~~

Home composition may own its route-specific query in a small home module only when implementation proves that capability is substantial; the initial skeleton may keep home data orchestration near the home route through a narrowly named file. It must not create infrastructure/sanity/queries.ts.

## Preview and failure

Draft mode is enabled by a secret-protected Route Handler and reads with SANITY_API_TOKEN on the server. Preview URLs are non-indexable. Production pages fail predictably if required content is missing; CMSReadError reaches Sentry while the user sees a branded safe error or not-found state according to the route contract.

## Change process

A schema change requires:

1. content and migration impact assessment;
2. Studio validation update;
3. schema extract and TypeGen;
4. web mapping/query update;
5. preview verification;
6. tests and documentation update;
7. migration plan before removing or renaming populated fields.
