# Structured Data Plan

Use JSON-LD and validate with Google’s Rich Results Test. Google recommends JSON-LD and emphasizes accurate, visible, representative content: [structured data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) and [general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Launch candidates

- `Organization` on Home / Studio with name, URL, logo and verified `sameAs` profiles.
- `WebSite` on Home for site identity.
- `BreadcrumbList` on nested Edition pages when visible navigation supports it.
- `Service` on Atelier and potentially Edition pages as semantic description; do not imply Google rich-result eligibility.
- `Article` only for real Journal posts when Journal launches.

## Deliberate exclusions

- No aggregate ratings or review markup without supported first-party evidence and applicable Google rules.
- Do not treat an Edition as `Product` merely because it has a price. Product rich-result requirements focus on pages for specific products and require applicable offers/reviews/ratings; the service implementation must genuinely satisfy the semantics before adoption. See [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).
- Do not mark concepts as client work.

Structured data never introduces claims that are absent from the visible page.

