# Design System Implementation Direction

Tailwind is an implementation tool, not the ORVAUXE aesthetic. Components consume named tokens; they should not accumulate arbitrary one-off values.

```css
:root {
  --color-black: #0b0b0b;
  --color-ivory: #f2efe8;
  --color-bone: #d8d2c7;
  --color-graphite-brand: #74716b;
  --color-graphite-ui: #6f6c66;
  --color-oxblood: #421817;

  --font-display: "Bodoni Moda", serif;
  --font-interface: "Inter", sans-serif;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
  --space-16: 4rem;

  --motion-fast: 160ms;
  --motion-ui: 320ms;
  --motion-editorial: 800ms;
}
```

Token groups must cover color, type, spacing, containers, grid, breakpoints, motion, z-index, borders, focus rings and the small number of shadows actually used. Tailwind’s official theme variables map design tokens to utilities, while regular `:root` custom properties remain appropriate where no utility is needed: [Tailwind theme variables](https://tailwindcss.com/docs/theme).

Focus states are never removed without a visible accessible replacement. Default radius is zero or minimal; shadows are rare, soft and structural rather than decorative.

