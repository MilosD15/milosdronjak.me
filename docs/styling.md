# Styling rules — milosdronjak.me

Static site: global tokens live in **`css/styles.css`** (`:root`). Reusable typography and stacks live in **`css/utilities.css`**.

## Load order

1. `css/styles.css` — fonts, `:root`, layout, components, component-level responsive rules  
2. `css/utilities.css` — `u-*` utility classes for new pages and prose

## Tokens (`:root` in `css/styles.css`)

| Token | Role |
|--------|------|
| `--bg`, `--ink`, `--white` | Surfaces and text |
| `--orange`, `--orange-dark`, `--orange-darker` | Accent scale (light / default-on-dark / hover-strong) |
| `--strawberry`, `--sky`, `--steel`, `--ice`, `--blush` | Backward-compatible aliases mapped to orange system |
| `--muted`, `--line` | Secondary text and hairlines |
| `--font-ui` | Montserrat — body/UI/labels/buttons |
| `--font-display` | Fraunces — headings only (`h1`...`h6`) |
| `--radius` | 12px — rounded rects (pills stay `999px`) |
| `--space`, `--max` | Page gutter and shell width |

## Utility classes (`css/utilities.css`)

Prefix: **`u-`**. Combine with semantic HTML (`<h1 class="u-type-display">`).

| Class | Use |
|--------|-----|
| `u-type-display` | Hero / page title (Fraunces 900, large; shrinks at ≤640px) |
| `u-type-h2` | Section title |
| `u-type-h3` | Subsection / card title (UI weight) |
| `u-type-body` | Default paragraph (sans, 16px desktop) |
| `u-type-body-serif` | Editorial paragraph (Fraunces, same size) |
| `u-type-body-sm` | Compact body |
| `u-type-muted` | Muted colour (pair with a type class) |
| `u-text-accent` | Dark orange text on light backgrounds |
| `u-text-accent-light` | Light orange text on dark backgrounds |
| `u-type-ui` | Uppercase micro-label |
| `u-fw-medium` … `u-fw-heavy` | Weight helpers |
| `u-text-strong` | Semibold inline; `strong` inside `u-type-body*` is semibold |
| `u-italic` | Italic (e.g. quotes) |
| `u-link-accent` | Link utility: dark orange default, darker orange hover/focus |
| `u-link-accent-light` | Link utility for dark sections: light orange default, darker orange hover/focus |
| `u-prose` | Readable max-width; use `u-prose > * + *` spacing via nested rule |
| `u-stack-sm` / `u-stack-md` / `u-stack-lg` | Vertical rhythm between direct children |

### Type scale variables (utilities `:root`)

`--u-type-display`, `--u-type-display-sm`, `--u-type-h2`, `--u-type-h2-sm`, etc. — tweak once for all pages using these utilities. **`--u-type-body-mobile`** (13px) and **`--u-type-h3-sm`** / **`--u-type-ui-sm`** back the phone scale. **`--u-interactive-ms`** controls utility link transition speed (currently 300ms).

## Responsive utilities (`css/utilities.css`)

Aligned with **`css/styles.css`** breakpoints **960px** (tablet / stacked layouts) and **640px** (phone).

| Breakpoint | What changes |
|-------------|----------------|
| **≤960px** | `.u-prose` uses `max-width: 100%` so long copy fits single-column shells. |
| **≤640px** | `.u-type-display` / `.u-type-h2` use the small scale vars; `.u-type-h3` steps down; `.u-type-body`, `.u-type-body-serif`, `.u-type-body-sm` use **`13px`** (same as `body` / description on the homepage); `.u-type-ui` tightens slightly; `.u-prose` is uncapped width with slightly tighter paragraph and stack gaps. |

Weight helpers (`.u-fw-*`) are unchanged at all breakpoints.

## Existing components

Home PDP sections use **named classes** (`.product-title`, `.description-block__body`, …), not only utilities. For **new** pages, prefer utilities + a thin page wrapper; or align new components with the same token values.

## Buttons

Button look is component-level (`.btn`, `.btn--primary`, …) in `css/styles.css`. Do not duplicate button CSS in utilities; use existing modifiers.

### Accent interaction rule

- On light backgrounds: default **dark orange**, hover/focus **darker orange**
- On dark backgrounds: default **light orange**, hover/focus **dark orange**

## Reduced motion

`prefers-reduced-motion: reduce` is handled in `css/styles.css` for `.reveal`, `.variant-copy`, and the menu icon. New CSS transitions should repeat that pattern (see `docs/animations.md`).
