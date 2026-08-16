# Accessibility Standard

ORVAUXE targets WCAG 2.2 AA. The normative reference is [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/). Accessibility defects in navigation, the lead form or primary content block launch.

## Core standard

- Use semantic headings and landmarks.
- Support full keyboard operation and a logical focus order.
- Keep focus visible with sufficient non-text contrast.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for qualifying large text.
- Provide labels, descriptions and programmatically associated errors for forms.
- Announce status and success messages when appropriate.
- Write alternative text for purpose; decorative images use empty alt.
- Size touch targets and controls for reliable operation.
- Respect `prefers-reduced-motion`; no required information exists only inside animation.
- Give icon-only controls an accessible name.
- Test zoom, reflow and text resizing.

## Landmarks and headings

Each site route owns exactly one focusable main landmark:

```tsx
<main id="main-content" tabIndex={-1}>
  {/* Route content */}
</main>
```

The route-group shell supplies `header`, labelled primary/mobile `nav` landmarks and `footer`; it must not add another `main`. The skip link is the first shell control, becomes visible on `:focus-visible`, and targets `#main-content` on every site route, including error and not-found states.

Every route should have one descriptive `h1`. Subsequent levels describe the document outline without skipping for visual size. `Heading` separates semantic `level`/`as` from its visual `variant`; never choose `h1` merely because `display-lg` is desired.

## Focus and keyboard interaction

The shared `:focus-visible` treatment is a `2px` outline with a `3px` offset. It uses Oxblood on light surfaces and Ivory on dark surfaces. Do not remove it, reduce it to color-only feedback, or clip it with an overflow wrapper. `FocusRing` may add a focus-within presentation around a composite, but the actual link, button or input remains keyboard-focusable.

Document order should match the visual and keyboard order. Do not use positive `tabIndex`. Native links and buttons are preferred over click handlers on non-interactive elements. Standalone controls and navigation targets have a minimum width and height of `2.75rem` (`44px`), including Menu, Close, navigation links and buttons. Inline links inside prose are the intentional exception; preserve readable line flow and sufficient focus visibility instead of forcing a 44px box into each line.

## Navigation contract

Desktop and mobile navigation contain only the launch links: Editions, Atelier, Studio and Start a Project. Current-route state is exposed with `aria-current="page"` and a visible underline; color is not the only signal. The Editions parent remains current for an edition detail route.

Mobile navigation uses the native modal `dialog` contract:

- Menu has an accurate accessible name, `aria-controls` and `aria-expanded`.
- Opening calls `showModal()`, prevents background interaction, locks background body scrolling and moves focus to Close.
- Tab and Shift+Tab remain within the modal platform focus scope.
- Escape, Close and backdrop activation dismiss the modal and restore focus to Menu.
- Selecting a route dismisses the modal and restores focus to Menu before navigation replaces the document.
- Crossing to the desktop layout closes the modal without forcing focus onto the now-hidden Menu control.
- Every close path restores the exact body-overflow value that existed before opening.
- The mobile navigation has a programmatic label independent of its visual treatment.

Do not replace this behavior with a visually hidden checkbox or a non-modal overlay.

## Contrast and surface contexts

Use the semantic color pairs from `@orvauxe/tokens`. Calculated sRGB contrast ratios for the core pairs are:

| Pair                            | Contrast  | Policy                                                |
| ------------------------------- | --------- | ----------------------------------------------------- |
| Black on Atelier Ivory          | `17.14:1` | Primary text                                          |
| Graphite UI on Atelier Ivory    | `4.56:1`  | Normal-sized secondary functional text                |
| Graphite Brand on Atelier Ivory | `4.24:1`  | Decorative/non-critical or qualifying large text only |
| Bone on Black                   | `13.09:1` | Secondary text on dark surfaces                       |
| Atelier Ivory on Oxblood        | `13.30:1` | Accent controls/surfaces                              |

`data-theme="dark"` changes the inherited surface, text, border and focus roles together. Never assume a light-context raw color remains accessible after moving a component into a dark section. Active, hover, disabled and focus states must each remain distinguishable without relying only on hue.

## Motion

The reduced-motion media query resolves non-instant motion durations and motion distances to zero. Application and shell styles remove transitions and animations instead of accelerating large movement. Content is rendered in its usable end state; no reveal may gate reading or navigation.

A future JS/GSAP animation must check the preference before setup, expose content immediately when reduced, avoid scroll-jacking and clean up its lifecycle. Reduced motion must not introduce additional scroll locking; modal background locking applies only while the navigation dialog is actually open.

## Text, zoom and reflow

Body text uses relative units and a readable `46rem` maximum measure. Fluid type uses bounded `clamp()` values. At 200% zoom and narrow reflow, text must remain readable without two-dimensional page scrolling, controls must not overlap, and content must not be truncated. Do not disable browser zoom or hide overflow to conceal a layout failure.

Uppercase is limited to short labels, navigation and metadata with controlled tracking. Body copy remains sentence case. Content must tolerate user font scaling and longer localized strings.

## Images and media

Informative imagery receives concise alt text that describes its purpose in context. Decorative imagery uses `alt=""`; it should not repeat nearby text. Images that act as links describe the destination or action. Captions do not replace alt text when the image itself conveys information.

Reserve dimensions/aspect to prevent layout shift. Crop and object position must not remove information essential to the alt text. Autoplaying or background media is outside the foundation; any future time-based media requires pause/stop controls and an equivalent accessible presentation.

## Forms and status

Every input has a visible programmatic label. Help and error text is connected with `aria-describedby`; invalid fields use `aria-invalid` when applicable. Validation does not rely only on color. The first invalid field should be reachable without disrupting the user's ability to review all errors.

Pending, failure and accepted states retain stable, descriptive text. Announce asynchronous status/success where appropriate. Disabled controls remain natively disabled, and accepted/pending form fields cannot be resubmitted accidentally. Never place sensitive field values in analytics or error telemetry.

## Verification policy

Automated coverage must include axe smoke checks for `/`, `/editions` and `/start-a-project` with the global shell at one representative mobile and desktop viewport. Component tests should cover the skip target, navigation landmarks, menu naming/state, open/close behavior, Escape, focus restoration and active-route semantics.

Manual review remains required because axe cannot assess interaction quality or art direction. Verify and record in `FOUNDATION_REPORT.md`:

1. Tab from the browser chrome to the visible skip link and into `main-content`.
2. Traverse header links, Menu, dialog links, Close and footer in logical order.
3. Open the mobile dialog, exercise Tab/Shift+Tab, Escape, backdrop and route selection, then check focus restoration and body scrolling.
4. Inspect focus on light, dark and accent surfaces.
5. Enable reduced motion and confirm that content is immediate and usable.
6. Review headings and landmark names with the accessibility tree or a screen reader.
7. Inspect 200% zoom, narrow reflow and text resizing.
8. Verify image names/empty alt against their actual purpose.

This document defines policy and expected behavior. A command or manual check is reported as passing only after it has actually run in the current change.
