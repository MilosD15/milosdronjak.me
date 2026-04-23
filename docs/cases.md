# Case page guidelines

Reusable structure and styling rules for client case pages (based on `cases/wonderful-dental`).

## File structure

- Page HTML: `cases/<client-slug>/index.html`
- Page CSS: `css/case-<client-slug>.css`
- Page JS: `js/case-<client-slug>.js`

Load order per page:

1. `css/styles.css`
2. `css/utilities.css`
3. `css/case-<client-slug>.css`
4. `js/site-system.js`
5. `js/case-<client-slug>.js`

## Header pattern (current standard)

- Use the shared header/nav structure.
- In header meta:
  - availability badge: `<span class="product-tags__avail"><span class="live-dot live-dot--avail"></span>Available Now</span>`
  - contact CTA: `<a class="btn btn--audit" ...>Contact me</a>`
- On mobile, availability in header is hidden globally by `styles.css`.

## Case content order

1. Hero title + meta cards (`Client`, `Location`, `Stack`, `Status`)
2. Client review card
3. Metrics section (`u-type-h2` title + 3 cards + footnote note)
4. Before/after compare section
5. Story sections (`u-type-h2` title + body)
6. Media blocks (video/image/compare as needed)
7. Final CTA section
8. Shared footer

## Typography rules for case sections

- Section titles: `u-type-h2 case-section-title` (BR-02)
- Body copy: `u-type-body` or default body tokenized copy
- Small metadata/captions: uppercase + muted tone, use note pattern:
  - class: `case-visual__note`
  - style: small (`~0.64rem`), uppercase, muted, right-aligned (adjust per layout)

## Reusable media patterns

### 1) Before/after slider stack

Wrapper:

- `.case-compare-stack` (vertical grid of compare blocks)

Single slider:

- `.case-compare` + `data-compare`
- inside:
  - `.case-compare__img--after`
  - `.case-compare__before` with `.case-compare__img--before`
  - `.case-compare__divider` + `.case-compare__handle`
  - `.case-compare__range` input (`type="range"`)
  - optional corner labels `.case-compare__label--before` / `.case-compare__label--after`

JS hooks:

- `data-compare`
- `data-compare-before`
- `data-compare-divider`
- `data-compare-range`

Current behavior:

- range drives clip-path width of before layer
- handle/divider track same percentage

### 2) Video frame

- wrapper: `.case-visual__video-frame`
- media: `.case-visual__video`
- supports `autoplay muted loop playsinline` and optional `controls`

### 3) Static image frame

- class: `.case-visual__placeholder` (used as `<img>` when image is available)

## Reveal/animation rules on case pages

- Section wrapper: `data-reveal-section`
- Animated children: `data-reveal-scroll`
- Default reveal threshold: 60% section progress
- Large media sections can override with:
  - `data-reveal-threshold="0.2"`

## Spacing conventions

- Tight story-to-media spacing:
  - story section: `.case-story--tight-bottom`
  - next media section: `.case-visual--tight-top`
- Use these as a pair when media should feel connected to the story paragraph.

## CTA section pattern (current)

- Left: `u-type-h2` title + short subtitle
- Right: shared backlog CTA stack:
  - `.backlog-diagnostic__cta-wrap`
  - `.backlog-diagnostic__primary`
  - `.backlog-diagnostic__free`

Current copy pattern:

- title can include accent span with `u-italic u-fw-heavy u-text-accent`
- subtitle kept to narrower measure (`max-width` in case CSS)

## Checklist for new case pages

- [ ] Header uses `Available Now` + `Contact me`
- [ ] All section titles use BR-02 (`u-type-h2`) unless explicitly different
- [ ] Captions/notes use consistent muted micro-copy style
- [ ] Media blocks have consistent frame/border/radius
- [ ] Mobile spacing and text sizes tested
- [ ] Footer uses shared component markup from other pages
