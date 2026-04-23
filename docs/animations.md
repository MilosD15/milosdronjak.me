# Animation & interaction rules — milosdronjak.me

Runtime constants and helpers live in **`js/site-system.js`** on the global **`window.MilosSite`**.

## Script load order

1. **`js/site-system.js`** (defines `MilosSite`)  
2. **`js/home.js`** (or future page scripts) — read `MilosSite` with safe fallbacks if the file is missing

## `MilosSite.motion`

### `motion.ms` (JavaScript timings)

| Key | Default (ms) | Used for |
|-----|----------------|----------|
| `copyFade` | 280 | Variant copy cross-fade (`home.js`) |
| `chainStart` | 180 | Delay before first PDP chain reveal |
| `chainStagger` | 105 | Stagger between chained `data-reveal-chain` items |

Change these once; **`home.js`** reads them via `MilosSite.motion.ms`.

### `motion.css` (documentation mirror of motion-heavy CSS)

Documents typical durations that **must stay in sync** with `css/styles.css` rules:

- `revealOpacityTransformMs` — `.reveal` opacity/transform (0.6s)
- `variantOpacityTransformMs` — `.variant-copy` (0.28s)
- `menuIconRotateMs` — `.site-header__menu-icon` transition

General UI hover/focus transitions (links/buttons/cards) are standardized in `css/styles.css` at **300ms** and are not JS-driven.

If you change CSS transition length, update **`MilosSite.motion.css`** in `js/site-system.js` and any `setTimeout` that depends on it.

### `motion.easing`

String tokens for `transition-timing-function` when setting styles from JS (optional). CSS today uses the same curves in `css/styles.css` (e.g. reveal `cubic-bezier(0.22, 1, 0.36, 1)`).

### Scroll reveal trigger rules

Homepage scroll reveals now support section-level progress logic:

- Sections marked with `data-reveal-section`
- Child items marked with `data-reveal-scroll`
- Reveal starts once viewer has passed roughly **60%** of the section height
- Child elements reveal individually with a small stagger

Ungrouped `data-reveal-scroll` elements still fall back to `IntersectionObserver`.

### `motion.intersectionObserver`

| Key | Value | Used for |
|-----|--------|----------|
| `threshold` | `0.06` | Fallback scroll reveals (ungrouped elements) |
| `rootMargin` | `0px 0px 10% 0px` | Trigger slightly before entering viewport |

**`home.js`** should use `MilosSite.motion.intersectionObserver` when creating `IntersectionObserver` instances.

## `MilosSite.ui`

| Key | Value |
|-----|--------|
| `breakpoints.navMobile` | `(max-width: 640px)` |

Use for `matchMedia` in menus or mobile-only behaviour so the string is not duplicated.

## `MilosSite.prefersReducedMotion()`

Returns `true` when `prefers-reduced-motion: reduce` is active. Use before:

- staggered timeouts  
- scroll-driven class toggles that animate  

If `true`, prefer instant state (e.g. add `is-revealed` immediately), matching CSS `@media (prefers-reduced-motion: reduce)`.

## Patterns in `home.js`

1. **Variant pills** — `setCopyUpdating` + timeout `motion.ms.copyFade` + double `requestAnimationFrame` before clearing updating state  
2. **Chain reveal** — `setTimeout(..., chainStart + i * chainStagger)`  
3. **Scroll reveal** — one `IntersectionObserver` per observed set; unobserve after reveal  
4. **Nav drawer** — `matchMedia(ui.breakpoints.navMobile)`, click outside, Escape, close on resize when leaving mobile

## Adding a new animation

1. Add or reuse a duration in **`MilosSite.motion.ms`** (if JS-driven) and document the CSS duration in **`motion.css`**  
2. Add CSS under a clear class (e.g. `.my-block.is-active`) in `css/styles.css`  
3. If motion matters for a11y, branch on **`MilosSite.prefersReducedMotion()`**  
4. Update this file with the class name and timing
