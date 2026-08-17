# ORVAUXE Editions — Product Definition v1

## Product definition

An ORVAUXE Edition is a curated premium Shopify storefront system with a fixed art-direction foundation, adapted to the buyer’s brand and launched as a functioning Shopify theme implementation.

An Edition is not:

- a downloadable template;
- an unrestricted custom design project;
- a ThemeForest-style theme;
- a cheap theme installation;
- a headless or Hydrogen build.

The buyer selects a defined Edition because its underlying point of view already fits the brand. ORVAUXE adapts that system coherently; it does not redesign the product from zero. Requests that need a new art direction or architecture belong to [Atelier](./editions-vs-atelier.md).

## Public commercial baseline

| Term                 | Edition v1 baseline                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Starting price       | From **$2,490**                                                                                                                                     |
| Delivery target      | **7–10 business days from Ready to Build**                                                                                                          |
| Revision policy      | **2 consolidated revision rounds**                                                                                                                  |
| Initial market scope | One primary language, one initial market configuration and one core currency/store setup, subject to Shopify capabilities and account configuration |
| Defect window        | **14 days** after launch/handoff for implementation defects in the delivered scope                                                                  |

The public offer uses no discount, crossed-out comparison price or scarcity claim. A final quote may increase when approved add-ons expand the baseline. No calendar delivery date is promised from first contact.

## Base storefront scope

The baseline Edition includes the following experiences:

1. Home.
2. Collection.
3. Product.
4. Cart.
5. Editorial or About page.
6. Intentional mobile behavior across the complete system.

Mobile is not a separate page. The shared storefront shell includes the appropriate announcement area, header, navigation, search where appropriate, footer, product/collection navigation and essential commerce states for the selected Edition.

## Included brand adaptation

The following client inputs may enter the Edition within its approved controls:

- approved logo;
- approved color system;
- approved typography where legally and technically web licensed;
- supplied product, campaign and editorial imagery;
- client-supplied written content;
- product and collection content;
- navigation labels and social links;
- brand and contact information;
- curated section ordering where the Edition permits it;
- predefined theme settings;
- minor visual tuning needed to make supplied assets work coherently.

The Edition’s architecture, product UX, responsive logic, core composition and art-direction DNA remain recognizable. “Adapted” does not mean every layout can be redesigned.

## Included technical foundation

The Edition baseline includes:

- a responsive native Shopify theme;
- semantic storefront markup;
- native Shopify product and cart flows;
- JSON templates and Theme Editor-compatible content controls;
- intentionally constrained sections, blocks and settings;
- baseline accessibility against the project’s WCAG 2.2 AA target;
- baseline technical SEO;
- responsive image handling;
- performance-oriented HTML, CSS, Liquid and minimal progressive JavaScript;
- app-block compatibility at approved insertion points where practical;
- standard analytics and tag integration points where applicable.

The technical architecture is governed by [ADR-0009](../adr/ADR-0009-editions-native-shopify-theme.md). Third-party vendor setup, custom application behavior and platform/account features are included only when named in an approved scope.

## Initial language, market and currency boundary

The base price covers one primary language, one initial market configuration and one core currency/store setup, subject to the merchant’s Shopify plan, account and platform capabilities. Additional localization, multiple languages, complex Markets configuration and international pricing logic require an add-on review and may become Atelier scope. No platform behavior is guaranteed beyond verified Shopify capabilities and the approved implementation scope.

## Ready to Build and the delivery clock

The 7–10-business-day target begins only when the project is recorded as **Ready to Build**. Ready to Build means:

- scope approved;
- required payment or deposit complete;
- appropriate Shopify access provided;
- approved brand assets provided;
- approved content provided;
- product data sufficiently ready for the agreed scope;
- necessary in-scope third-party credentials available;
- required client approvals complete;
- one responsible feedback owner confirmed.

The operational checklist lives in [Edition Client Readiness](./edition-client-readiness.md). Missing, replaced or late client inputs pause the delivery clock. An approved change order resets or extends the affected milestone in writing.

## Revision policy

The baseline includes **two consolidated revision rounds**. One revision round is one complete, prioritized feedback package from the responsible client feedback owner against the approved Edition adaptation.

A revision round is not unlimited messages or continuous redesign. Fragmented comments are consolidated before implementation. Additional revision rounds, new requirements and changes to already approved inputs are assessed separately and may change price and schedule.

## Handoff and defect window

Edition delivery includes:

- final QA against the approved scope;
- deployment and publishing support;
- basic merchant handoff;
- a brief explanation of editable theme controls;
- Edition-appropriate documentation;
- source/theme ownership according to the future executed contract;
- a 14-day implementation-defect correction window.

The 14-day window covers reproducible defects in the delivered implementation against the approved scope. It does not cover new design requests, new features, content replacement, strategy changes, third-party service changes or merchant modifications made after handoff.

## Base exclusions

The base $2,490 Edition does not automatically include the following. Relevant items can be scoped separately without implying that every request is unsuitable.

### Brand and content production

- brand identity creation, rebranding or logo design;
- copywriting;
- product or campaign photography;
- bulk catalog migration or data entry;
- complex product-data cleanup;
- translations.

### Markets and business configuration

- advanced multi-language setup;
- complex international tax or business configuration;
- complex Markets or international pricing logic beyond the approved initial setup.

### Systems and integrations

- subscription or loyalty systems;
- custom Shopify apps or custom backend services;
- ERP, PIM or WMS integrations;
- complex CRM integrations;
- custom product configurators;
- B2B architecture;
- account or customer portals beyond native agreed capabilities;
- custom mobile apps.

### Architecture and checkout

- a headless storefront or Hydrogen;
- custom checkout features requiring special Shopify capabilities;
- completely new art direction, major navigation redesign or a new custom template family;
- complex interactive storytelling or other novel interaction systems.

### Commercial pass-throughs

- unlimited revision rounds;
- third-party software fees;
- Shopify subscription fees;
- premium app fees;
- domain fees.

## Change-order rule

A request is assessed against four questions:

1. Does it preserve the selected Edition’s art direction and core architecture?
2. Can it be isolated without weakening the reusable base product or merchant experience?
3. Can scope, dependencies, price and schedule be estimated clearly?
4. Can it be delivered without introducing an Atelier-level strategy, integration or runtime?

If all four answers are yes, the request may be quoted as an add-on. If it changes the art direction, information architecture, template system, purchase logic, runtime or integration depth, it moves to Atelier qualification. No out-of-scope work begins until the classification, commercial effect and timeline effect are approved.

See [Editions vs Atelier](./editions-vs-atelier.md) for the full boundary.

## Delivery pipeline

```text
Lead
  → Qualification
  → Edition fit check
  → Scope confirmation
  → Commercial acceptance
  → Client readiness
  → Ready to Build
  → Brand adaptation
  → Theme implementation
  → Content integration
  → QA
  → Revision round 1
  → Revision round 2
  → Final QA
  → Launch / handoff
  → 14-day defect window
  → Care / future work
```

Stages may overlap operationally, but Ready to Build remains the delivery-clock boundary and the two revision rounds remain distinct approval moments.

## INTERNAL COMMERCIAL BASELINE

This section is internal operating guidance and is not approved as public website copy.

- 50% to schedule/start.
- 50% before final production launch or transfer.

Payment processing is not implemented in this phase. Legal terms, tax treatment, refund policy, source ownership and contract language require separate founder/legal approval before client use.

## Related product documents

- [Editions vs Atelier](./editions-vs-atelier.md)
- [Edition Client Readiness](./edition-client-readiness.md)
- [Edition 001 — Nocturne](./edition-001-nocturne.md)
- [Edition Codebase Strategy](./edition-codebase-strategy.md)
- [Edition Unit Economics Template](./edition-unit-economics-template.md)
- [Shopify Official Sources for Editions v1](./shopify-official-sources.md)
