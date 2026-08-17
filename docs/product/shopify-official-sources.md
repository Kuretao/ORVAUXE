# Shopify Official Sources for Editions v1

Reviewed 2026-08-17. Only first-party Shopify documentation is used here as technical authority. These sources describe the platform; ORVAUXE pricing, scope, delivery timing and product boundaries remain ORVAUXE decisions rather than Shopify guarantees.

## Theme architecture and merchant editing

- [Theme architecture](https://shopify.dev/docs/storefronts/themes/architecture) — Shopify themes use a defined directory structure. Liquid layouts, templates, sections, blocks and snippets compose the storefront; `layout/theme.liquid` is the shared layout entry point.
- [Liquid reference](https://shopify.dev/docs/api/liquid) — Liquid objects, tags and filters expose Shopify storefront data and server-rendered behavior to theme code.
- [Templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) — template types map to storefront resources and routes. JSON templates are the appropriate default when merchant-reorderable sections are required.
- [JSON templates](https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates) — JSON templates store an ordered composition of sections and their settings; merchants can add, remove and reorder eligible sections in the theme editor.
- [Sections](https://shopify.dev/docs/storefronts/themes/architecture/sections) — sections are reusable Liquid modules with schema-defined settings and optional blocks. JSON templates and section groups make them merchant-editable.
- [Blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks) — Shopify distinguishes reusable theme blocks, section-local blocks and app-provided blocks. A theme should choose the least flexible construct that still supports the intended merchant task.
- [Building with sections and blocks](https://shopify.dev/docs/storefronts/themes/best-practices/templates-sections-blocks) — Shopify recommends deliberate granularity, logical reading flow and app-block support only where the host section can remain resilient.
- [Theme settings](https://shopify.dev/docs/storefronts/themes/architecture/settings) — global, section and block settings expose controlled customization through the theme editor.
- [Theme editor](https://shopify.dev/docs/storefronts/themes/tools/online-editor) — merchants use the editor to change theme-controlled settings and preview the result. Theme code must handle editor lifecycle behavior where JavaScript enhancements are present.

## Commerce primitives and app integration

- [Product template](https://shopify.dev/docs/storefronts/themes/architecture/templates/product/overview) — the product template or its referenced main section uses the Liquid `product` object and a product form for variant selection, quantity and add-to-cart behavior.
- [Collection template](https://shopify.dev/docs/storefronts/themes/architecture/templates/collection) — the collection template or its referenced section uses the Liquid `collection` object to render collection content and product listings.
- [Cart template](https://shopify.dev/docs/storefronts/themes/architecture/templates/cart) — the cart template or its referenced sections use the Liquid `cart` object and native form behavior for line items, quantity changes and checkout progression.
- [App blocks for themes](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks) — sections in JSON templates can opt into `@app` blocks, allowing installed apps to add content without direct theme-code edits. Support is explicit, not automatic for every section.

## Quality and delivery workflow

- [Performance best practices](https://shopify.dev/docs/storefronts/themes/best-practices/performance) — Shopify recommends HTML and CSS first, reduced JavaScript, progressive enhancement, responsive images and deliberate resource loading.
- [Accessibility best practices](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility) — accessible theme work includes semantic structure, keyboard and gesture operation, media alternatives, contrast, dynamic-component behavior and testing; following a checklist alone does not guarantee accessibility.
- [Shopify CLI for themes](https://shopify.dev/docs/storefronts/themes/tools/cli) — Shopify CLI supports development themes, live preview, environments, theme push/publish and Theme Check.
- [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check) — Theme Check analyzes Liquid and JSON for syntax, missing templates, deprecated constructs and selected performance issues, and can run locally or in CI.
- [Shopify GitHub integration for themes](https://shopify.dev/docs/storefronts/themes/tools/github) — a GitHub branch can be connected to an unpublished or published theme. The integration synchronizes branch changes to Shopify and theme-editor/code-editor changes back to the branch, so repository access and branch discipline must be explicit.

## Findings applied to Editions v1

1. Editions use native Shopify Online Store theme architecture: Liquid, JSON templates, constrained sections and blocks, CSS and minimal progressive JavaScript.
2. Merchant editability is intentional and bounded. Theme settings, sections and blocks expose approved adaptation controls without becoming an unrestricted page builder.
3. `index.json`, `collection.json`, `product.json`, `cart.json` and page templates compose native Shopify resource experiences; transactional behavior stays on Shopify product and cart primitives.
4. App blocks are supported where their insertion has a clear commerce use case and cannot destabilize Nocturne’s hierarchy, initially the main product experience and cart-related surfaces where practical.
5. The base theme remains usable for navigation, product discovery, product access and the purchase path without a large client-side application. JavaScript enhances rather than replaces core behavior.
6. Development uses Shopify CLI development/unpublished themes, Theme Check and reviewed promotion. A GitHub connection is optional and must be configured with limited repository access and controlled production-branch permissions.
7. Theme performance and accessibility require implementation-time testing against a representative Shopify store. This product-definition phase does not claim a theme score because the Nocturne Shopify theme has not yet been implemented.
