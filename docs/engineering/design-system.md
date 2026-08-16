# ORVAUXE Digital Design System

This document is the implementation source of truth for turning the approved brand direction into code. It does not replace the Brand Book. When a token or public primitive changes, update this guide in the same change.

The authoritative implementation locations are:

- `packages/tokens/src/tokens.css` for all concrete visual values and Tailwind mappings;
- `packages/tokens/src/index.ts` for framework-independent references to those CSS values;
- `packages/ui/src/` for public, application-independent primitives;
- `apps/web/src/styles/globals.css` for Tailwind integration and web-only global foundations;
- `apps/web/src/app/(site)/_components/` for the ORVAUXE site shell.

## 1. Design principles

ORVAUXE combines editorial luxury, commercial clarity and engineering precision. The implementation should feel quiet, disciplined, tactile, architectural and intentionally spacious.

- Build luxury through proportion, typography, imagery, rhythm, whitespace and interaction quality.
- Prefer semantic tokens over raw values and a small constrained API over many options.
- Keep the default surface Atelier Ivory and use dark sections as deliberate art direction.
- Keep presentation server-rendered unless browser state or browser APIs are required.
- Use native scrolling. Do not introduce scroll interception, glass effects, startup gradients, neon treatments or decorative animation.
- Do not create generic page-building abstractions, a universal `Card`, or speculative primitives.

## 2. Token hierarchy

The system has one value flow:

```text
primitive values
  -> semantic roles
    -> Tailwind theme aliases / UI primitive styles
      -> application composition
```

Primitive values name what a value is, such as `--oxblood`. Semantic values name why it is used, such as `--orvauxe-focus-ring`. Application and UI code should consume semantic values. Raw colors belong only in `packages/tokens/src/tokens.css`.

CSS is the only concrete value source. The TypeScript exports in `@orvauxe/tokens` return `var(...)` references; they do not duplicate hex codes, sizes or durations. Compatibility aliases named `--orvauxe-color-*` remain for skeleton migration and are not the preferred API for new code.

Tailwind 4 consumes the same values through CSS-first `@theme` mappings. `apps/web/src/styles/globals.css` explicitly declares `@source "../../../../packages/ui/src"`, so utilities used by workspace primitives are discoverable in production builds. Do not mirror the values in a JavaScript theme object.

## 3. Color system

These six values are the complete primitive brand palette:

| Token              | Value     | Role                                        |
| ------------------ | --------- | ------------------------------------------- |
| `--orvauxe-black`  | `#0b0b0b` | Primary ink and dark surface                |
| `--atelier-ivory`  | `#f2efe8` | Default surface and inverse text            |
| `--bone`           | `#d8d2c7` | Secondary surface and subtle structure      |
| `--graphite-brand` | `#74716b` | Non-critical editorial or decorative detail |
| `--graphite-ui`    | `#6f6c66` | Functional secondary text on Ivory          |
| `--oxblood`        | `#421817` | Restrained signature accent                 |

Target distribution is 75–80% Black/Ivory, 15–20% neutral and 3–5% Oxblood. `graphite-brand` is not normal-sized functional text on Ivory: that pair is approximately 4.24:1. `graphite-ui` on Ivory is approximately 4.56:1 and is the secondary functional-text pairing. Black on Ivory is approximately 17.14:1, Bone on Black 13.09:1, and Ivory on Oxblood 13.30:1.

Do not add a color, duplicate a hex value in a component, or create an opacity-based pseudo-token without updating the token contract and documenting the requirement.

## 4. Semantic surfaces

Surface themes are section-level art direction, not a user-facing light/dark preference. There is no theme switch and no OS-theme coupling.

| Semantic role                 | Light / root                    | Dark                                |
| ----------------------------- | ------------------------------- | ----------------------------------- |
| `--orvauxe-surface-primary`   | Ivory                           | Black                               |
| `--orvauxe-surface-secondary` | Bone                            | `color-mix(Black 94%, Ivory)`       |
| `--orvauxe-surface-inverse`   | Black                           | Ivory                               |
| `--orvauxe-surface-accent`    | Oxblood                         | Oxblood                             |
| `--orvauxe-text-primary`      | Black                           | Ivory                               |
| `--orvauxe-text-secondary`    | Graphite UI                     | Bone                                |
| `--orvauxe-text-inverse`      | Ivory                           | Black                               |
| `--orvauxe-text-on-accent`    | Ivory                           | Ivory                               |
| `--orvauxe-border-subtle`     | Bone                            | `color-mix(Ivory 24%, transparent)` |
| `--orvauxe-border-default`    | Graphite UI                     | Bone                                |
| `--orvauxe-border-strong`     | Black                           | Ivory                               |
| `--orvauxe-accent-primary`    | Oxblood                         | Oxblood                             |
| `--orvauxe-accent-hover`      | `color-mix(Oxblood 88%, Black)` | `color-mix(Oxblood 78%, Ivory)`     |
| `--orvauxe-accent-contrast`   | Ivory                           | Ivory                               |
| `--orvauxe-focus-ring`        | Oxblood                         | Ivory                               |

Apply a theme at the closest meaningful section and let descendants inherit it:

```tsx
<section data-theme="dark">
  <Heading level={2}>Editorial statement</Heading>
</section>
```

Do not manually restate surface, text, border and focus colors on every descendant.

## 5. Typography

`apps/web/src/app/layout.tsx` loads fonts with `next/font/google` and exposes `--font-orvauxe-display` and `--font-orvauxe-interface`. Font loading is an application concern; `@orvauxe/tokens` provides semantic stacks with safe fallbacks and never imports Next.js.

Only these files and weights are requested:

- Bodoni Moda, normal: `400`, `500`;
- Inter, normal: `400`, `500`, `600`.

No font binaries are committed. `next/font` self-hosts the generated web assets in the application build. Bodoni Moda is the approved current display direction; a separately licensed commercial display face remains a future brand enhancement, not an implicit substitution.

| Variant      | Family    | Size                              | Line height | Tracking   | Weight | Intended use                                |
| ------------ | --------- | --------------------------------- | ----------- | ---------- | ------ | ------------------------------------------- |
| `display-xl` | Display   | `clamp(4rem, 9vw, 9rem)`          | `0.9`       | `-0.035em` | `400`  | Rare short hero statements                  |
| `display-lg` | Display   | `clamp(3.25rem, 7vw, 7rem)`       | `0.92`      | `-0.03em`  | `400`  | Page introductions and editorial statements |
| `heading-xl` | Display   | `clamp(2.75rem, 5vw, 5rem)`       | `0.98`      | `-0.025em` | `400`  | Primary page headings                       |
| `heading-lg` | Display   | `clamp(2.25rem, 4vw, 3.75rem)`    | `1`         | `-0.02em`  | `400`  | Major section headings                      |
| `heading-md` | Display   | `clamp(1.75rem, 2.6vw, 2.5rem)`   | `1.08`      | `-0.015em` | `500`  | Subsection headings                         |
| `heading-sm` | Display   | `clamp(1.375rem, 1.8vw, 1.75rem)` | `1.14`      | `-0.01em`  | `500`  | Compact editorial headings                  |
| `body-lg`    | Interface | `clamp(1.125rem, 1.2vw, 1.25rem)` | `1.55`      | `-0.005em` | `400`  | Introductions and standfirsts               |
| `body-md`    | Interface | `1rem`                            | `1.6`       | `0`        | `400`  | Default prose and interface copy            |
| `body-sm`    | Interface | `0.875rem`                        | `1.55`      | `0`        | `400`  | Secondary interface copy                    |
| `label`      | Interface | `0.75rem`                         | `1.25`      | `0.12em`   | `600`  | Controls and navigation                     |
| `caption`    | Interface | `0.75rem`                         | `1.45`      | `0.025em`  | `500`  | Metadata and annotations                    |

Display variants use Bodoni Moda; body, label and caption variants use Inter. Uppercase is a component decision for navigation and compact labels. Never uppercase body copy. Semantic HTML hierarchy and visual variants are independent: choose the heading element for document structure and the variant for art direction.

## 6. Spacing

The numeric scale is deliberately restrained:

| Step       | Value    | Step       | Value     |
| ---------- | -------- | ---------- | --------- |
| `space-0`  | `0`      | `space-1`  | `0.25rem` |
| `space-2`  | `0.5rem` | `space-3`  | `0.75rem` |
| `space-4`  | `1rem`   | `space-6`  | `1.5rem`  |
| `space-8`  | `2rem`   | `space-12` | `3rem`    |
| `space-16` | `4rem`   | `space-24` | `6rem`    |
| `space-32` | `8rem`   | `space-40` | `10rem`   |

Prefer semantic spacing in compositions:

| Token                            | Value                      | Use                        |
| -------------------------------- | -------------------------- | -------------------------- |
| `--orvauxe-space-control-block`  | `0.75rem`                  | Control block padding      |
| `--orvauxe-space-control-inline` | `1rem`                     | Control inline padding     |
| `--orvauxe-space-content`        | `1.5rem`                   | Related content gap        |
| `--orvauxe-space-section`        | `clamp(4rem, 8vw, 8rem)`   | Standard section rhythm    |
| `--orvauxe-space-section-major`  | `clamp(6rem, 12vw, 12rem)` | Major editorial separation |
| `--orvauxe-target-min`           | `2.75rem` / `44px`         | Minimum interactive target |

Page-specific values such as `73px`, `19px` or `43px` require an explicit art-direction reason; they are not a substitute for the scale.

## 7. Responsive grid and breakpoints

The grid is mobile-first:

- base: 4 columns;
- from `md` (`48rem`): 8 columns;
- from `lg` (`64rem`): 12 columns;
- gap: `clamp(0.75rem, 2vw, 2rem)`.

`Grid` resolves this through `repeat(var(--orvauxe-grid-columns), minmax(0, 1fr))`. It exposes only `gap="default"` and `gap="none"`; route composition owns intentional item spans.

There are four layout transitions:

| Name | Value              | Purpose                                                       |
| ---- | ------------------ | ------------------------------------------------------------- |
| `sm` | `30rem` / `480px`  | Modern-phone refinements when the narrowest layout has room   |
| `md` | `48rem` / `768px`  | Tablet composition and the 8-column grid                      |
| `lg` | `64rem` / `1024px` | Laptop/desktop composition, 12 columns and desktop navigation |
| `xl` | `90rem` / `1440px` | Wide-desktop art direction without unbounded stretching       |

Tailwind breakpoints are literal values in `@theme`, because custom properties cannot control media-query conditions. Runtime `--orvauxe-breakpoint-*` aliases reference those same theme values for documentation and inspection. Do not add device-model breakpoints.

At mobile widths, preserve strong typography, intentional crop and 44px targets. At tablet widths, recompose rather than compress desktop. Desktop can use scale and whitespace confidently; wide layouts remain bounded by the container and text-measure tokens.

## 8. Containers

The complete layout vocabulary is:

| Concept     | Token                            | Value                       |
| ----------- | -------------------------------- | --------------------------- |
| Viewport    | `--orvauxe-container-viewport`   | `100%`                      |
| Page        | `--orvauxe-container-page`       | `96rem`                     |
| Editorial   | `--orvauxe-container-editorial`  | `75rem`                     |
| Text        | `--orvauxe-container-text`       | `46rem`                     |
| Full bleed  | `--orvauxe-container-full-bleed` | `100vw`                     |
| Page gutter | `--orvauxe-page-gutter`          | `clamp(1.25rem, 4vw, 4rem)` |

`Container` exposes `page`, `editorial`, `text` and `full-bleed`. Page, editorial and text variants are centered and receive the shared responsive gutter. Text measure is capped at `46rem`; long-form copy must not span the page container. `full-bleed` removes max-width, centering and gutter constraints, but deliberately remains `width: 100%`; compose it directly in a top-level section that already owns the available viewport width. It does not perform a nested `100vw` breakout or scrollbar-sensitive negative-margin trick.

## 9. UI primitives

Import deliberate public contracts from the package root:

```tsx
import { Button, Container, Grid, Heading, Link, Media, Text } from "@orvauxe/ui";
```

Do not deep-import package internals. The public primitives are framework-, vendor-, domain- and content-independent.

| Primitive   | Public contract                                                                                                                                                                                                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`    | Native button; variants `primary`, `secondary`, `quiet`, `inverse`; sizes `sm` (`44px` minimum), `md` (`48px` minimum), `lg` (`56px` minimum); defaults to `type="button"`, `variant="primary"`, `size="md"`; native disabled state |
| `Link`      | Native anchor; variants `default`, `editorial`, `navigation`, `quiet`; no Next.js dependency                                                                                                                                        |
| `Heading`   | `h1`–`h6` through `level` or `as`; six semantic display/heading variants                                                                                                                                                            |
| `Text`      | `p` or `span`; variants `body-lg`, `body-md`, `body-sm`, `label`, `caption`                                                                                                                                                         |
| `Container` | Variants `page`, `editorial`, `text`, `full-bleed`                                                                                                                                                                                  |
| `Grid`      | Responsive 4/8/12 layout; gap `default` or `none`                                                                                                                                                                                   |
| `Divider`   | Native `hr`; tones `subtle`, `strong`                                                                                                                                                                                               |
| `FocusRing` | Presentational focus-within wrapper for composite controls; it does not replace native focus semantics                                                                                                                              |
| `Media`     | Framework-independent `figure`; aspects `auto`, `landscape`, `portrait`, `square`; fit `cover` or `contain`; optional `figcaption`                                                                                                  |

Button roles are fixed: `primary` is Oxblood with the semantic accent hover; `secondary` is transparent with a strong border and secondary-surface hover; `quiet` is transparent and gains a strong border on hover; `inverse` uses the inverse surface/text pair and becomes Oxblood on hover. Do not use a visual variant as a business-state name.

Link roles are likewise constrained: `default` is the standard underlined anchor; `editorial` combines the display family with `body-lg`; `navigation` is an uppercase label with a `44px` minimum target and active underline; `quiet` uses secondary `body-sm` text. `Heading` defaults level 1/2/3/4–6 to `heading-xl`/`heading-lg`/`heading-md`/`heading-sm`, while an explicit visual variant may override that mapping without changing the element. `Text` defaults to a `body-md` paragraph.

The package owns its primitive CSS and exports it as `@orvauxe/ui/styles.css`; the web app imports that stylesheet once from globals. App globals own reset, body, selection, forms and route scaffolding, not primitive variants. The package must not import `next/link`, `next/image`, Sanity, analytics or application modules.

Do not add `Card`, modal systems, carousels, tabs, accordions, tooltips, toasts or other speculative catalogue components until a concrete cross-application need exists.

## 10. Focus

The global `:focus-visible` treatment is token-driven:

- width: `0.125rem` / `2px`;
- offset: `0.1875rem` / `3px`;
- light surfaces: Oxblood ring;
- dark surfaces: Ivory ring.

Never remove an outline without an equally visible replacement. Do not clip focus rings with an overflow wrapper; move clipping to an inner media element when necessary. Every link, button and form control must retain a visible keyboard state in both surface contexts. `FocusRing` is for a composite presentation that needs `:focus-within`; the underlying interactive element still owns its semantic focus.

Borders, structural depth and layers are fixed:

| Token                         | Value                                            |
| ----------------------------- | ------------------------------------------------ |
| `--orvauxe-border-width`      | `1px`                                            |
| `--orvauxe-radius-none`       | `0`                                              |
| `--orvauxe-radius-minimal`    | `0.125rem`                                       |
| `--orvauxe-shadow-structural` | `0 0.5rem 2rem color-mix(Black 8%, transparent)` |
| `--orvauxe-z-base`            | `0`                                              |
| `--orvauxe-z-raised`          | `1`                                              |
| `--orvauxe-z-header`          | `20`                                             |
| `--orvauxe-z-overlay`         | `40`                                             |
| `--orvauxe-z-modal`           | `60`                                             |
| `--orvauxe-z-skip-link`       | `100`                                            |

Use a named layer rather than an arbitrary large `z-index`. The skip link owns the highest regular-document layer; a native modal `dialog` still participates in the browser top layer. Shadows are structural exceptions, not default decoration.

## 11. Motion

The motion vocabulary is small and semantic:

| Duration    | Value    | Intended use                          |
| ----------- | -------- | ------------------------------------- |
| `instant`   | `0ms`    | Immediate state change                |
| `fast`      | `160ms`  | Hover, underline and compact feedback |
| `standard`  | `320ms`  | UI state transitions                  |
| `editorial` | `800ms`  | Deliberate editorial reveal           |
| `cinematic` | `1200ms` | Rare signature sequence only          |

| Easing      | Value                            |
| ----------- | -------------------------------- |
| `standard`  | `cubic-bezier(0.2, 0, 0, 1)`     |
| `enter`     | `cubic-bezier(0.16, 1, 0.3, 1)`  |
| `exit`      | `cubic-bezier(0.4, 0, 1, 1)`     |
| `editorial` | `cubic-bezier(0.65, 0, 0.35, 1)` |

Motion distances are `0.5rem` (`sm`) and `2rem` (`md`). Use CSS transitions for hover, focus, opacity, underlines and small state changes. GSAP is reserved for signature page interactions where CSS cannot express the choreography, cleanup and lifecycle clearly. The foundation shell does not need GSAP. Do not add smooth-scroll software or wheel interception.

## 12. Reduced motion

Under `prefers-reduced-motion: reduce`, `fast`, `standard`, `editorial` and `cinematic` resolve to `0ms`, and both motion distances resolve to `0`. Global application styles remove animation and transition effects rather than merely making large movement faster. The shell's skip-link and navigation indicators also stop transitioning.

Content must be present without waiting for animation. Reduced-motion mode must not hide information, introduce scroll locking, or require an animation to reach a usable state. A future GSAP sequence must branch before setup, expose content immediately, and clean up its client lifecycle.

## 13. Imagery and brand asset intake

Image roles are `hero`, `editorial-landscape`, `editorial-portrait`, `detail`, `product` and `architecture`. Each owning page or module must declare aspect/crop intent instead of relying on an accidental source-image ratio. The framework-independent `Media` primitive provides only presentation structure: `landscape` is `16 / 10`, `portrait` is `4 / 5`, `square` is `1 / 1`, and `auto` preserves the media's declared/intrinsic aspect. A hero remains route-art-directed rather than receiving a universal ratio.

For every image:

- reserve its dimensions or aspect before load;
- specify crop and meaningful object position when the default center is wrong;
- write alt text for the image's purpose, not a file description;
- use `alt=""` for decorative imagery;
- provide an accurate responsive `sizes` expression;
- lazy-load below-the-fold content;
- grant priority only to the true expected LCP image;
- never send an enormous original asset to a narrow viewport.

Next.js and Sanity stay in the web application. `@orvauxe/ui` must not know about either dependency. The approved flow is:

```text
Sanity asset
  -> owning domain query
    -> generated typed data
      -> web image adapter / Sanity transformation
        -> next/image
          -> Media presentation
```

The web adapter must provide dimensions, crop/hotspot intent, alt text and a deliberate `sizes` contract to `next/image`. Use Sanity transformations to request the delivered dimensions and format. `fill` is allowed only when the parent has a stable aspect; `priority` is not a general hero-like styling flag.

No approved production logo, monogram, favicon, social mark or photography is present in the repository. `apps/web/src/app/icon.svg` is an intentionally transparent neutral metadata fallback that prevents a missing-icon request; it is not a brand asset and must be replaced, not evolved into a logo. Keep the precise text wordmark and do not manufacture a branded SVG or luxury placeholder. Production asset intake remains open for:

- display wordmark;
- digital wordmark;
- OX/X monogram;
- favicon and platform icon set;
- social avatar;
- Open Graph mark;
- licensed editorial and project photography.

For each delivered asset, record source, owner, license/usage rights, delivery date and version; preserve the approved original and optimize only a web copy. Add a real favicon only after an approved monogram exists.

## 14. Header and navigation

The site shell belongs to `apps/web/src/app/(site)/_components`. `SiteHeader` is server-rendered; only `SiteNavigation.client.tsx` is a client boundary because it reads the current pathname and manages the mobile dialog.

Launch navigation is exactly:

- Editions;
- Atelier;
- Studio;
- Start a Project.

Do not add Work or Journal at launch. The desktop navigation appears from `lg` (`64rem`). A precise text `ORVAUXE` wordmark links home and is labelled `ORVAUXE home`; `COMMERCE ATELIER` remains its descriptor until approved artwork is supplied.

Active links use `aria-current="page"` and a visible underline, not color alone. The Editions parent remains current on edition-detail routes.

Mobile navigation uses the native modal `dialog`. The menu button exposes an accessible name, `aria-controls` and `aria-expanded`. Opening the dialog prevents background interaction, locks background body scrolling and focuses Close. Escape, Close, backdrop activation and route selection dismiss it and restore focus to Menu; navigation then replaces the document normally. A resize to desktop closes the dialog without forcing focus onto a control hidden by the desktop layout. Every close path restores the exact prior body-overflow value. Do not add a sticky/transparent animation system before homepage art direction requires one.

## 15. Footer

The footer is a restrained dark semantic surface. Its current structural contract contains the ORVAUXE text wordmark, `COMMERCE ATELIER`, `CHENGDU · WORLDWIDE` and the current UTC copyright year.

Do not invent social URLs, legal slugs or contact details. Legal navigation should render only from actual CMS documents when that integration is implemented; absence is valid and must not leave dead links. Future additions stay inside the route-group shell rather than creating a generic top-level component directory.

## 16. Accessibility

WCAG 2.2 AA is the target and `docs/engineering/accessibility.md` is authoritative. Foundation components must provide:

- one predictable `<main id="main-content" tabIndex={-1}>` per route;
- a keyboard-visible skip link to that target;
- semantic header, navigation, main and footer landmarks;
- logical heading levels independent of visual type variants;
- native controls and accurate accessible names;
- `aria-current` for active navigation;
- 44px minimum interactive targets;
- visible token-driven focus on light and dark surfaces;
- modal keyboard operation, Escape, focus containment and focus restoration;
- meaningful alt text or empty alt for decorative imagery;
- content-equivalent reduced-motion behavior.

Automated axe checks complement, but do not replace, keyboard, screen-reader, zoom, reflow and responsive review. Record executed checks and their results in the phase report; do not turn this policy document into a claim that a check ran.

## 17. Component ownership

Use this decision guide before creating a file:

```text
Is it a raw or semantic visual value?
  -> @orvauxe/tokens

Is it reusable across applications, domain-independent,
vendor-independent and content-independent?
  -> @orvauxe/ui

Is it specific to the ORVAUXE website shell?
  -> apps/web/src/app/(site)/_components

Is it specific to Editions?
  -> apps/web/src/modules/editions

Is it specific to another business capability?
  -> that capability under apps/web/src/modules

Is it Next.js route composition?
  -> the owning apps/web route or route group

Is it Sanity, analytics, CRM, telemetry or another vendor adapter?
  -> apps/web/src/infrastructure
```

Do not create `src/components`, `src/shared`, `src/utils`, a new design-system package, or a generic page renderer. A server-renderable presentation stays server-rendered; isolate only the interactive leaf behind `"use client"`.

## 18. Correct and incorrect usage

Prefer semantic color and system spacing:

```css
/* Correct */
.section {
  color: var(--orvauxe-text-primary);
  background: var(--orvauxe-surface-primary);
  padding-block: var(--orvauxe-space-section);
}

/* Incorrect */
.section {
  color: #0b0b0b;
  background: #f2efe8;
  padding-block: 73px;
}
```

Keep document semantics independent from visual scale:

```tsx
// Correct: a second-level section with a large editorial treatment.
<Heading level={2} variant="display-lg">
  Commerce, composed.
</Heading>

// Incorrect: visual size determines a false document level.
<Heading level={1} variant="display-lg">
  A nested section
</Heading>
```

Use an art-direction surface and a public primitive:

```tsx
// Correct
<section data-theme="dark">
  <Button variant="inverse">Start a Project</Button>
</section>

// Incorrect
<section className="bg-[#0b0b0b] text-[#f2efe8]">
  <button className="rounded-full px-[19px]">Start a Project</button>
</section>
```

Keep framework image work in the web layer:

```tsx
// Correct: a web-owned adapter composes Next Image with the generic frame.
<Media aspect="portrait" fit="cover">
  <Image
    alt={image.alt}
    height={image.height}
    sizes="(min-width: 64rem) 50vw, 100vw"
    src={image.src}
    width={image.width}
  />
</Media>

// Incorrect: @orvauxe/ui imports next/image or queries Sanity.
```

Keep client boundaries narrow:

```tsx
// Correct: the server shell renders a focused interactive navigation island.
export function SiteHeader() {
  return (
    <header>
      <span>ORVAUXE</span>
      <SiteNavigation />
    </header>
  );
}

// Incorrect: mark the entire site layout client-side for menu state.
```

If a future component needs an arbitrary color, width, breakpoint, animation or new package, first determine whether the requirement is approved art direction or evidence that the system itself needs a documented change.
