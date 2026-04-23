# Animation & interaction rules — milosdronjak.me

Shared timing constants and helpers live in **`js/site-system.js`** on **`window.MilosSite`**.

## Script load order

1. `js/site-system.js`
2. Page script (`js/home.js`, `js/how-I-work.js`, etc.)

Page scripts must read `MilosSite` with safe fallbacks.

## `MilosSite.motion.ms`

| Key | Default | Usage |
|-----|---------|-------|
| `copyFade` | `280` | Copy/panel/list fade transition timing |
| `chainStart` | `180` | Start delay for chained reveals |
| `chainStagger` | `105` | Chained reveal stagger |

## Shared CSS motion contract

Keep these in sync with behavior in `styles.css`:

- `.reveal` transitions (`opacity` + `transform`)
- `.variant-copy` transitions (`is-updating`)
- menu icon rotate transition
- backlog ticket transitions

General interactive transitions remain ~300ms in component styles.

## Scroll reveal behavior

Used on homepage and `how-I-work`:

- Section wrapper: `data-reveal-section`
- Animated children: `data-reveal-scroll`
- Reveal trigger: section passes ~60% viewport progress
- Grouped reveal uses stagger; ungrouped elements can use observer fallback
- Case page also uses this reveal model (`js/case-wonderful-dental.js`) and supports per-section thresholds with `data-reveal-threshold` (for large media sections, e.g. `0.2`)

## Homepage (`js/home.js`)

Current patterns:

1. **Focus pills**
   - Hero/description copy updates with `copyFade`
   - Uses `variant-copy` + `is-updating`
2. **Description lead/body rendering**
   - Variant description is rendered as `<strong>` lead + `<span>` body
3. **Chained hero reveals**
   - `chainStart + i * chainStagger`
4. **Mobile nav drawer**
   - `matchMedia(ui.breakpoints.navMobile)`, close on outside click/Escape

## How-I-work (`js/how-I-work.js`)

Current patterns:

1. **Tool tab switching**
   - Panel container remains stable
   - Only `.philosophy-list` elements animate on option changes (`is-updating`)
2. **Backlog ticket hover interaction**
   - CTA hover toggles `.backlog-diagnostic.is-hovered`
   - Tickets reorder/stack and show checkmarks
   - Right-side stacking uses JS-computed `left` values for smooth interpolation
3. **Backlog connector lines**
   - Connector coordinates are recalculated on resize and hover state changes
4. **Mobile behavior**
   - Ticket scene hidden at phone breakpoint in section-specific CSS

## Case page (`js/case-wonderful-dental.js`)

Current patterns:

1. **Section reveal groups**
   - Same grouped reveal behavior as other pages
   - Optional per-section threshold via `data-reveal-threshold`
2. **Before/after compare sliders**
   - Controlled with `data-compare`, `data-compare-range`, `data-compare-before`, `data-compare-divider`
   - Before layer uses clip-path reveal; divider/handle follow range value
3. **Mobile nav behavior**
   - Reuses shared nav open/close behavior pattern

## Contact page (`js/contact.js`)

Current patterns:

1. **Audience toggle switching**
   - Controlled by `data-contact-type-btn` and `data-contact-form`
   - Uses the same fade-switch pattern as homepage focus copy switching:
     - `MilosSite.motion.ms.copyFade`
     - `.is-updating` transition class
2. **Form variants**
   - `agency`, `freelance`, `hi` form blocks
   - Only one is visible/active at a time (`.is-active`, `hidden`)
3. **Mobile nav behavior**
   - Reuses shared nav open/close behavior pattern

## Reduced motion

Always branch on `MilosSite.prefersReducedMotion()` for JS-driven motion.
When reduced motion is on:

- apply final state immediately
- avoid stagger/setTimeout choreography where possible
- mirror CSS reduced-motion rules

## Adding/changing an animation

1. Reuse/add a `motion.ms` token if JS timing is involved
2. Implement class-based CSS state (`.is-updating`, `.is-hovered`, etc.)
3. Add reduced-motion fallback
4. Update this file to match actual behavior
