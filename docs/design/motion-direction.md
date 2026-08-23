# ORVAUXE Motion Direction

## Principle

Motion directs editorial photography; it does not perform UI tricks. The resting composition remains authoritative. Every enhancement must preserve readable server-rendered content, native scrolling and immediate control response.

The target is controlled, tactile, cinematic, restrained and deliberate: fashion campaign × architectural editorial × quiet high-end commerce.

## Tokens

| Token            |  Value | Use                                |
| ---------------- | -----: | ---------------------------------- |
| `instant`        | 140 ms | tactile active feedback            |
| `quick` / `fast` | 220 ms | links, buttons and controls        |
| `standard`       | 380 ms | menu surface and quiet previews    |
| `editorial`      | 640 ms | selected copy and viewport reveals |
| `cinematic`      | 900 ms | one major media settling moment    |

Primary ease: `cubic-bezier(0.22, 1, 0.36, 1)`. Exit motion may use a restrained material deceleration; bounce, elastic and overshoot are prohibited.

## Levels

- Level 0 — static. This is the default.
- Level 1 — micro interaction for controls, navigation and links.
- Level 2 — selected editorial entrance for a heading, composition, proof or major CTA.
- Level 3 — one narrative transition such as the Home campaign or storefront-system state change.
- Level 4 — complex choreography or pinning. Requires explicit product justification; none is approved by default.

## Hero behavior

Hero media is useful at paint. Selected text settles with opacity and a small vertical movement; supporting copy follows within 90–150 ms. The composed entrance finishes within 900 ms and never delays navigation or interaction. There is no preloader, logo performance or route-transition framework.

The Home campaign uses a true crossfade with approximately 1.5% incoming scale settlement. Explicit state changes use the editorial duration; mouse-only previews use the standard duration. At most one incoming and one outgoing layer may exist, so repeated controls cannot accumulate timelines.

## Editorial reveals

Use `data-motion-reveal` only on selected high-value compositions. The shared site observer adds a pending state only after client initialization and reveals once at meaningful viewport entry. Content is visible by default, remains visible without JavaScript and becomes static if IntersectionObserver is unavailable.

Composition parts may use `data-motion-part="eyebrow|heading|body|action"`. Stagger is limited to 70–130 ms. Do not animate lists, form fields or every section.

## Product proof and materiality

Real storefront proof may enter with a 1.5% scale settlement and a small vertical movement. Proof carriers remain fully opaque so caption contrast never changes; opacity settlement is reserved for media-only surfaces such as a hero image. No device float, 3D tilt, perspective rotation or hover spectacle is allowed.

Large editorial material imagery may use the same one-time treatment. Continuous parallax is not the default and must never be applied to product screenshots, cards, form controls or commerce UI.

## Navigation and controls

Links use stable text with a restrained rule or 3–5 px arrow response over the quick duration. Buttons may invert existing colors and move 1 px on active press; scale bounce, glow and shadow expansion are prohibited.

The mobile menu uses opacity plus a small vertical movement. Item stagger is tight and the entire entrance remains within the standard interaction window. Dialog semantics, focus trapping, Escape, focus restoration and body-scroll release take priority over animation.

## Mobile

Mobile uses less travel (approximately 14 px), shorter stagger and no desktop-only sticky or hover assumptions. Touch information is complete without hover. No continuous scroll loop or permanent layout-reading listener is approved.

## Reduced motion

`prefers-reduced-motion: reduce` removes animation, transition travel, scroll-linked effects and parallax. Campaign and storefront state changes remain immediate and understandable. Reveal content uses the static state; nothing waits at `opacity: 0`.

Visual regression uses an explicit settled-motion document contract. It preserves the normal responsive layout while capturing final resting states rather than mid-transition frames.

## GSAP policy

CSS handles states and micro interactions. IntersectionObserver handles simple one-time entrances. GSAP is permitted only for a genuinely coordinated or lifecycle-heavy signature sequence and must remain in the smallest client island with scoped selectors, responsive/reduced-motion conditions and cleanup. GSAP is not required by the current system.

## Anti-patterns

No preloader, custom cursor, smooth-scroll library, scroll hijacking, autoplay campaign, letter splitting, dramatic blur, giant masks, magnetic links, full-screen wipes, 3D screenshot effects, animation analytics, continuous unbounded `requestAnimationFrame`, or animation-driven content order.
