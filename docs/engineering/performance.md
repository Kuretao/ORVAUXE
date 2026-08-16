# Performance Standard

Performance is part of the luxury experience. Visual polish does not justify delayed interaction, layout instability or an unnecessarily hydrated shell.

## External thresholds

At the 75th percentile of field visits, target Google “good” thresholds:

- LCP ≤ 2.5 s.
- INP ≤ 200 ms.
- CLS ≤ 0.1.

Source: [web.dev — Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

Field data is authoritative once traffic is sufficient. A local production build or a single lab run does not prove these thresholds.

## Internal launch budgets

- Route-specific first-party client JavaScript: target ≤ 150 KB gzip on core marketing routes; justify exceptions.
- Critical hero image: target ≤ 300 KB on common mobile delivery; responsive variants are mandatory.
- Initial font transfer: target ≤ 180 KB total; subset and limit weights.
- Third-party scripts: load only with a defined owner, purpose and measured cost.
- Signature GSAP sequence: one primary timeline per major section; avoid many concurrent ScrollTriggers.
- No layout shift from media, fonts or CMS content.

Budgets are review gates, not estimates to declare as passing without measurement. Record measured route/build output and the measurement method in the relevant completion report.

## Rendering and client JavaScript

Server Components are the default for the site shell, routes and presentation. Add `"use client"` only when a leaf requires state, an event lifecycle or a browser API. Do not move surrounding typography, layout or content into the client bundle for convenience.

The foundation shell isolates pathname detection and mobile-dialog state in `apps/web/src/app/(site)/_components/SiteNavigation.client.tsx`. Header, footer, skip link and the route-group layout remain server-rendered. Future shell interaction should extend that narrow boundary only when it shares the same browser lifecycle.

Audit every client boundary before release:

```text
Does it need browser state or an effect?
  no  -> remove "use client"
  yes -> keep the smallest interactive leaf client-side
```

Do not add a hydration-dependent menu, a global animation provider or client-rendered surface theming.

## Fonts

The web application uses `next/font/google`, so generated font assets are self-hosted by the application build and no runtime Google stylesheet is added.

The exact requested set is:

- Bodoni Moda normal `400` and `500`, Latin subset;
- Inter normal `400`, `500` and `600`, Latin subset.

Both use `display: "swap"` and explicit fallbacks. Do not request italic files, additional subsets or additional weights until shipped content uses them and the transfer impact is reviewed. The total emitted font transfer must remain within the 180 KB initial-font budget; verify the built assets rather than assuming the budget from the number of declarations.

## CSS and design-system delivery

Concrete values live once in `@orvauxe/tokens`. Tailwind consumes the CSS-first mappings and explicitly scans `@orvauxe/ui`; the UI package owns one primitive stylesheet imported once by the web application. This avoids per-route copies of raw values and does not require a runtime theme object.

Prefer CSS for hover, focus, underlines, opacity and small state transitions. Keep global CSS limited to reset, body, selection, forms, accessibility defaults, Tailwind integration and shared route scaffolding. Page-specific art direction belongs to its owning route/module and should not inflate the global critical path.

## Motion and GSAP

The foundation shell uses CSS transitions only. GSAP remains installed for future signature page interactions but should not be imported merely to demonstrate availability.

Use GSAP only when CSS cannot cleanly express a major editorial reveal, scroll sequence, image choreography or page-level transition. Each use must document:

- why CSS was insufficient;
- its client boundary and lifecycle;
- cleanup of timelines, triggers and listeners;
- the reduced-motion branch;
- measured bundle/runtime impact.

Do not add Lenis, locomotive-scroll, wheel interception or another smooth-scroll runtime. Native scrolling is the default.

## Images

Future content imagery should use `next/image` through a web-owned adapter where optimization is appropriate. Next.js documents responsive delivery and layout-shift prevention in its [production checklist](https://nextjs.org/docs/app/guides/production-checklist).

The delivery path is:

```text
Sanity asset
  -> owning typed domain query
    -> web image adapter / Sanity transformation
      -> next/image
        -> framework-independent Media frame
```

Every image implementation must:

- reserve intrinsic dimensions or a stable aspect ratio;
- provide `sizes` that matches the actual grid/container span;
- request transformed dimensions suitable for the viewport and density;
- prefer modern optimized output rather than shipping the original;
- lazy-load below-the-fold images;
- use priority only for the real expected LCP image;
- avoid an oversized mobile download and duplicate preloads.

Critical mobile hero delivery targets ≤ 300 KB. Record the delivered response size and viewport used; source-file size is not the metric. Avoid background video in the foundation.

## Layout stability

Media, CMS blocks, forms and navigation must reserve their layout before asynchronous content arrives. Use stable aspect ratios, explicit image dimensions and predictable shell rows. Do not insert consent, telemetry or preview UI above already-rendered content without reserved space.

Font fallbacks should remain metrically reasonable, and `display: "swap"` must not be counteracted with hidden text. Review actual CLS in a production-like build when content imagery and commercial fonts are introduced.

## Third parties and telemetry

Every third-party runtime needs an owner, a business purpose, a loading strategy and a measured cost. Existing analytics and error telemetry must keep their privacy gates and should not block content or interaction. Navigation does not gain click telemetry merely because it is measurable.

Do not add an icon mega-library, component runtime, animation wrapper, visual-regression application or class-composition utility for this foundation. Prefer platform semantics and small local CSS.

## Verification policy

Performance review should use a clean, production-like build and distinguish build output, lab observations and field data. At minimum:

1. Run the repository production build with the documented environment.
2. Enumerate all `"use client"` files and state the browser reason for each.
3. Inspect emitted font files and total transferred weights/subsets.
4. Confirm no foundation source imports GSAP and list any future exception explicitly.
5. Inspect representative mobile and desktop routes for layout shifts and oversized image requests.
6. Record route client-JavaScript output where the build tooling exposes a reliable measurement; do not invent an approximate byte count when it does not.
7. Use field Core Web Vitals at the 75th percentile after production traffic exists.

Executed commands, measured sizes and manual observations belong in `FOUNDATION_REPORT.md`. This document defines budgets and implementation policy; it does not claim that the current change passed a check that has not been executed.
