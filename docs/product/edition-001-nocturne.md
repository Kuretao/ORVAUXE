# Edition 001 — Nocturne

## Product identity

| Attribute       | Definition                             |
| --------------- | -------------------------------------- |
| Edition         | 001                                    |
| Name            | Nocturne                               |
| Category        | Fashion / Accessories                  |
| Status          | ORVAUXE Original · Concept Edition     |
| Platform        | Native Shopify Online Store theme      |
| Public position | From $2,490                            |
| Delivery target | 7–10 business days from Ready to Build |

Nocturne is the first ORVAUXE Edition: a cinematic, fashion-editorial storefront system adapted to a buyer’s brand without losing its underlying identity. It is a product definition and original concept until the reusable Shopify theme is implemented, reviewed and approved for commercial delivery. It is not presented as client work or a case study.

## Intended fit

Nocturne is designed for:

- fashion labels;
- accessories;
- jewelry-adjacent products;
- design-led apparel brands;
- merchants whose photography and product world benefit from dark materiality, editorial pacing and high typography contrast.

It is not positioned as universally appropriate for every merchant. Brands that need a bright utility-first system, a materially different art direction, unusual product logic or deep integrations should be evaluated against another Edition or Atelier.

## Core character

- cinematic campaign hierarchy;
- fashion-editorial pacing;
- dark materiality with disciplined contrast;
- strong supplied campaign imagery;
- high typography-scale contrast without sacrificing functional legibility;
- precise collection and product merchandising;
- restrained interaction;
- premium mobile commerce.

## Design DNA: what stays Nocturne

The following remain stable across client adaptations:

- underlying layout and grid logic;
- editorial pacing and whitespace relationships;
- campaign/hero hierarchy;
- collection-merchandising philosophy;
- product-detail structure and purchase hierarchy;
- typography scale relationships;
- core composition of approved templates and sections;
- transition language and restrained motion policy;
- responsive logic and mobile-first commerce philosophy;
- the relationship between campaign media, product imagery and technical metadata.

These rules make Nocturne a repeatable product. A request to replace them is a new art direction and triggers Atelier review.

## Controlled adaptation: what may change

- approved client logo;
- approved brand palette within accessible role mappings;
- approved, licensed typography that can preserve Nocturne’s scale relationships;
- campaign, editorial and product imagery;
- approved copy and brand information;
- product, variant and collection data;
- navigation labels and social links;
- merchandising order;
- selected theme settings and section ordering within approved boundaries;
- minor visual tuning needed for supplied assets.

Adaptation is accepted only when the result remains recognizably Nocturne and preserves accessible product and purchase behavior.

## Storefront experience

The base implementation is planned to cover:

1. Home — campaign lead, selected collection/product storytelling and clear commerce entry points.
2. Collection — deliberate merchandising, filtering/sorting where appropriate to the store and legible product states.
3. Product — native Shopify product data, media, variants, quantity and add-to-cart behavior with a precise purchase hierarchy.
4. Cart — an accessible native cart route and essential line-item, quantity and checkout behavior. Any cart drawer is progressive enhancement, not the only cart experience.
5. Editorial/About — brand context using the constrained editorial vocabulary.
6. Mobile — intentional composition, navigation, product discovery and purchase behavior across every experience rather than a separate page.

The shared shell includes the appropriate announcement area, header, navigation, search, footer and section groups.

## Planned Shopify template map

This is an implementation target, not theme source code.

| Theme construct                 | Nocturne responsibility                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `layout/theme.liquid`           | Shared document structure, Shopify-required layout output, global assets and template rendering |
| Header section group            | Announcement, logo, primary navigation, search/account entry where approved                     |
| Footer section group            | Navigation, brand/contact information, social links and newsletter integration where approved   |
| `templates/index.json`          | Home composition                                                                                |
| `templates/collection.json`     | Collection merchandising and product grid                                                       |
| `templates/product.json`        | Product media, information, variants, native product form and approved app-block region         |
| `templates/cart.json`           | Native cart route, line items, quantity controls, notes where approved and checkout progression |
| `templates/page.json`           | General constrained content page                                                                |
| `templates/page.about.json`     | About/brand narrative using approved Nocturne sections                                          |
| `templates/page.editorial.json` | Editorial story composition where required                                                      |
| `templates/search.json`         | Storefront search results where search is enabled for the implementation                        |

Shopify resource data flows through native Liquid objects and forms. Mobile behavior is implemented within these templates and sections; there is no `mobile` template.

## Planned constrained section system

Nocturne begins with a small vocabulary, refined during theme implementation:

- Campaign Hero;
- Editorial Split;
- Collection Feature;
- Product Focus;
- Product Grid;
- Editorial Media;
- Statement;
- Text / Media;
- Newsletter integration.

Dedicated main sections own the core product, collection, cart and page behavior. Header and footer use section groups. Blocks/settings are introduced only when they support a real merchant task and preserve a predictable composition; Nocturne will not become an unrestricted `sections[]` page builder.

App blocks are initially evaluated for the main product information region and practical cart-related insertion points. They are not enabled everywhere by default. Unexpected app content must not break purchase hierarchy, responsive layout or accessibility.

## JavaScript policy

Nocturne is HTML/CSS/Liquid first. Core navigation, product access, cart access and the purchase path must not depend unnecessarily on a large JavaScript application.

JavaScript is reserved for genuine progressive enhancements such as an accessible mobile-navigation lifecycle, variant/media coordination, a non-essential cart enhancement or restrained campaign transitions. Enhancements must survive Theme Editor section re-rendering, preserve keyboard behavior, respect reduced motion and clean up event listeners. The base theme will not include a React runtime without a future explicit, isolated requirement.

## Quality baseline

- WCAG 2.2 AA remains the ORVAUXE target; implementation requires semantic structure, keyboard and focus QA, accessible names/states, contrast review, media alternatives, zoom/reflow and reduced-motion behavior.
- Responsive images, reserved media dimensions and deliberate loading are required.
- Core functionality remains server rendered through native Shopify constructs.
- Theme Check, functional tests and representative performance/accessibility review are release gates.
- Third-party integrations are validated only when in approved scope; compatibility is not claimed merely because an app exists.

## Product boundary

Nocturne follows the common [Edition Product Definition](./editions-product-definition-v1.md), including two consolidated revision rounds, one initial language/market/core currency setup, handoff and the 14-day implementation-defect window. Brand identity, content production, bulk migration, advanced Markets work, custom apps, deep integrations, B2B, custom checkout and headless/Hydrogen are outside the base.

## Current implementation status

The ORVAUXE marketing site may use original Nocturne imagery and storefront representations to explain the product. **The Nocturne Shopify theme itself has not yet been implemented.** Theme construction starts only after founder review of this product definition and creation of the approved private codebase described in [Edition Codebase Strategy](./edition-codebase-strategy.md).
