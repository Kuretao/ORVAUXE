// CSS owns every concrete value; these exports are framework-independent references.
export const colors = {
  black: "var(--orvauxe-black)",
  ivory: "var(--atelier-ivory)",
  bone: "var(--bone)",
  graphiteBrand: "var(--graphite-brand)",
  graphiteUi: "var(--graphite-ui)",
  oxblood: "var(--oxblood)",
} as const;

export const semanticColors = {
  surfacePrimary: "var(--orvauxe-surface-primary)",
  surfaceSecondary: "var(--orvauxe-surface-secondary)",
  surfaceInverse: "var(--orvauxe-surface-inverse)",
  surfaceAccent: "var(--orvauxe-surface-accent)",
  textPrimary: "var(--orvauxe-text-primary)",
  textSecondary: "var(--orvauxe-text-secondary)",
  textInverse: "var(--orvauxe-text-inverse)",
  textOnAccent: "var(--orvauxe-text-on-accent)",
  borderSubtle: "var(--orvauxe-border-subtle)",
  borderDefault: "var(--orvauxe-border-default)",
  borderStrong: "var(--orvauxe-border-strong)",
  accentPrimary: "var(--orvauxe-accent-primary)",
  accentHover: "var(--orvauxe-accent-hover)",
  accentContrast: "var(--orvauxe-accent-contrast)",
  focusRing: "var(--orvauxe-focus-ring)",
} as const;

export const fonts = {
  display: "var(--orvauxe-font-display)",
  interface: "var(--orvauxe-font-interface)",
} as const;

export const typography = {
  displayXl: "var(--orvauxe-type-display-xl-size)",
  displayLg: "var(--orvauxe-type-display-lg-size)",
  headingXl: "var(--orvauxe-type-heading-xl-size)",
  headingLg: "var(--orvauxe-type-heading-lg-size)",
  headingMd: "var(--orvauxe-type-heading-md-size)",
  headingSm: "var(--orvauxe-type-heading-sm-size)",
  bodyLg: "var(--orvauxe-type-body-lg-size)",
  bodyMd: "var(--orvauxe-type-body-md-size)",
  bodySm: "var(--orvauxe-type-body-sm-size)",
  label: "var(--orvauxe-type-label-size)",
  caption: "var(--orvauxe-type-caption-size)",
} as const;

export const spacing = {
  controlBlock: "var(--orvauxe-space-control-block)",
  controlInline: "var(--orvauxe-space-control-inline)",
  content: "var(--orvauxe-space-content)",
  section: "var(--orvauxe-space-section)",
  sectionMajor: "var(--orvauxe-space-section-major)",
} as const;

export const controls = {
  targetMin: "var(--orvauxe-target-min)",
} as const;

export const layout = {
  page: "var(--orvauxe-container-page)",
  editorial: "var(--orvauxe-container-editorial)",
  text: "var(--orvauxe-container-text)",
  fullBleed: "var(--orvauxe-container-full-bleed)",
  pageGutter: "var(--orvauxe-page-gutter)",
  gridColumns: "var(--orvauxe-grid-columns)",
  gridGap: "var(--orvauxe-grid-gap)",
} as const;

export const motion = {
  instant: "var(--orvauxe-motion-instant)",
  fast: "var(--orvauxe-motion-fast)",
  standard: "var(--orvauxe-motion-standard)",
  ui: "var(--orvauxe-motion-standard)",
  editorial: "var(--orvauxe-motion-editorial)",
  cinematic: "var(--orvauxe-motion-cinematic)",
} as const;

export const easing = {
  standard: "var(--orvauxe-ease-standard)",
  enter: "var(--orvauxe-ease-enter)",
  exit: "var(--orvauxe-ease-exit)",
  editorial: "var(--orvauxe-ease-editorial)",
} as const;

export const focus = {
  ring: "var(--orvauxe-focus-ring)",
  width: "var(--orvauxe-focus-width)",
  offset: "var(--orvauxe-focus-offset)",
} as const;

export const layers = {
  base: "var(--orvauxe-z-base)",
  raised: "var(--orvauxe-z-raised)",
  header: "var(--orvauxe-z-header)",
  overlay: "var(--orvauxe-z-overlay)",
  modal: "var(--orvauxe-z-modal)",
  skipLink: "var(--orvauxe-z-skip-link)",
} as const;
