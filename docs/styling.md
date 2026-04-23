# Styling rules — milosdronjak.me

Static site: global tokens and component styles live in **`css/styles.css`**. Reusable typography/layout utilities live in **`css/utilities.css`**.

## Load order

1. `css/styles.css` — fonts, `:root` tokens, shared components, responsive rules
2. `css/utilities.css` — `u-*` utility classes for typography/prose/spacing
3. Optional page CSS (e.g. `css/how-I-work.css`)

## Core tokens (`:root` in `css/styles.css`)

| Token | Role |
|--------|------|
| `--bg`, `--ink`, `--white` | Surface and text colors |
| `--orange`, `--orange-dark`, `--orange-darker` | Accent color scale |
| `--strawberry`, `--sky`, `--steel`, `--ice`, `--blush` | Aliases / section palette |
| `--muted`, `--line` | Secondary text and borders |
| `--font-ui`, `--font-display` | Montserrat / Fraunces |
| `--radius`, `--space`, `--max` | Radius, gutters, max container |
| `--body-text-size` | Global body text size on desktop (`0.92rem`) |
| `--body-text-size-mobile` | Global body text size on mobile (`0.82rem`) |

## Body text policy (current)

- Desktop body text should use **`0.92rem`** consistently
- Mobile body text should use a smaller consistent token (**`0.82rem`**)
- Prefer token-based sizing (`var(--body-text-size)`) over hardcoded px/rem for body copy

## Utility classes (`css/utilities.css`)

Prefix: **`u-`**.

| Class | Use |
|--------|-----|
| `u-type-display` | Main hero/page title |
| `u-type-h2` | Section title |
| `u-type-h3` | Subsection title |
| `u-type-body` | Body paragraph (`0.92rem` desktop) |
| `u-type-body-serif` | Alternative body paragraph style |
| `u-type-body-sm` | Compact body text |
| `u-type-ui` | Uppercase micro-label |
| `u-text-accent` / `u-text-accent-light` | Accent text color helpers |
| `u-fw-medium` … `u-fw-heavy` | Weight helpers |
| `u-italic` | Italic helper |
| `u-link-accent` / `u-link-accent-light` | Accent link patterns |
| `u-prose`, `u-stack-sm/md/lg` | Readability and vertical rhythm helpers |

### Utility type scale vars

- `--u-type-body: 0.92rem`
- `--u-type-body-mobile: 0.82rem`
- `--u-type-display*`, `--u-type-h2*`, `--u-type-h3*`, `--u-type-ui*` remain the heading/UI scale controls

## Responsive rules

Breakpoints are standardized:

- **`@media (max-width: 960px)`**: layout stacks / tablet adjustments
- **`@media (max-width: 640px)`**: phone typography and compact spacing

At ≤640px, body copy should resolve to the mobile body token and remain consistent across sections/pages.
The shared horizontal gutter token is also reduced on mobile:

- `--space: 0.6rem` at `@media (max-width: 640px)`

## Page-specific notes

- `how-I-work` uses `css/how-I-work.css` + `js/how-I-work.js`
- Homepage uses `js/home.js` variant switching and component-level classes
- Keep section containers aligned using the shared container pattern (`max-width: var(--max)`, horizontal padding via `var(--space)`)

## Reduced motion

`prefers-reduced-motion` is respected in shared transitions (`reveal`, variant copy, menu/ticket effects). New motion styles should include a reduced-motion fallback; see `docs/animations.md`.
