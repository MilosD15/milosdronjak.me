# Unified brand identity (portable spec)

This file is the single-source visual identity reference for the current site.
Use it to reproduce the same look/feel in another project.

---

## 1) Brand foundation

- **Tone:** clean, high-contrast editorial style, technical but human
- **Primary heading face:** Fraunces (`--font-display`)
- **Primary UI/body face:** Montserrat (`--font-ui`)
- **Accent system:** orange scale (`--orange`, `--orange-dark`, `--orange-darker`)
- **Core shape language:** rounded corners (`--radius: 12px`), soft separators (`--line`)
- **Interaction speed:** about `300ms` for most hover/focus transitions

---

## 2) Global design tokens (`css/styles.css :root`)

### Color tokens

- `--bg: #ffffff`
- `--ink: #1c1c1c`
- `--orange: #e07b1f`
- `--orange-dark: #c96a12`
- `--orange-darker: #b85f10`
- `--strawberry: var(--orange-dark)` (primary button base)
- `--blush: #fdf3e7` (light orange section background)
- `--sky: var(--orange-dark)`
- `--steel: #1c1c1c`
- `--ice: #fdf3e7`
- `--white: #ffffff`
- `--muted: #4a4a4a`
- `--line: rgba(28, 28, 28, 0.12)`

### Typography/system tokens

- `--font-ui: 'Montserrat', system-ui, sans-serif`
- `--font-display: 'Fraunces', Georgia, serif`
- `--body-text-size: 0.92rem`
- `--body-text-size-mobile: 0.82rem`

### Layout tokens

- `--radius: 12px`
- `--space: clamp(1rem, 3vw, 2rem)`
- `--max: 1200px`

### Mobile token overrides

At `@media (max-width: 640px)`:

- `--body-text-size: var(--body-text-size-mobile)` (0.82rem effective)
- `--space: 0.6rem`

---

## 3) Utility type scale tokens (`css/utilities.css :root`)

- `--u-type-display: 2.75rem`
- `--u-type-display-sm: 1.6rem`
- `--u-type-h2: 2rem`
- `--u-type-h2-sm: 1.35rem`
- `--u-type-h3: 1.35rem`
- `--u-type-h3-sm: 1.12rem`
- `--u-type-body: 0.92rem`
- `--u-type-body-mobile: 0.82rem`
- `--u-type-body-sm: 0.875rem`
- `--u-type-ui: 0.7rem`
- `--u-type-ui-sm: 0.65rem`
- `--u-interactive-ms: 300ms`

---

## 4) Utility classes (portable)

### Typography utilities

- `.u-type-display`
- `.u-type-h2`
- `.u-type-h3`
- `.u-type-body`
- `.u-type-body-serif`
- `.u-type-body-sm`
- `.u-type-ui`
- `.u-type-muted`

### Accent/text helpers

- `.u-text-accent`
- `.u-text-accent-light`
- `.u-italic`
- `.u-link-accent`
- `.u-link-accent-light`

### Weight helpers

- `.u-fw-medium`
- `.u-fw-semibold`
- `.u-fw-bold`
- `.u-fw-heavy`

### Layout rhythm helpers

- `.u-prose`
- `.u-stack-sm`
- `.u-stack-md`
- `.u-stack-lg`

### Mobile behavior for utilities

At `<=640px`, display/h2/h3/body/ui all downscale to `*-sm` tokens and tighter prose spacing.

---

## 5) Core reusable components and class contract

This is the practical class system to replicate in another app.

### A) Reveal/motion primitives

- `.reveal`
- `.reveal--up`
- `.is-revealed`
- `.variant-copy`
- `.variant-copy.is-updating`

Use these with JS section hooks:

- `data-reveal-section`
- `data-reveal-scroll`

### B) Header/nav

- `.site-header`
- `.site-header__inner`
- `.site-header__menu-btn`
- `.site-header__menu-icon`
- `.site-header__brand`
- `.site-header__brand-logo`
- `.site-nav`
- `.site-header__meta`
- `.site-header__label`

Availability indicator:

- `.product-tags__avail`
- `.live-dot`
- `.live-dot--avail`

### C) Button system

Base + variants:

- `.btn`
- `.btn--audit`
- `.btn--primary`
- `.btn--primary__left`
- `.btn--primary__right`
- `.btn--ghost`
- `.btn--inline`

Current rule:

- Backlog-audit primary CTAs use weight `600` via selector:
  - `.btn--primary[href*='Backlog%20audit']`

### D) Pills/toggles

- `.pill-row`
- `.pill`
- `.pill.is-active`

Used in:

- homepage focus switch
- contact audience toggle

### E) Footer system

- `.site-footer`
- `.site-footer__wrap`
- `.site-footer__main`
- `.site-footer__shell`
- `.site-footer__grid`
- `.site-footer__col-label`
- `.site-footer__contact-list`
- `.site-footer__contact-type`
- `.site-footer__contact-value`
- `.site-footer__nav-list`
- `.site-footer__bottom`
- `.site-footer__copy`
- `.site-footer__available.product-tags__avail`

### F) Homepage section signatures

Reviews:

- `.reviews`
- `.reviews__inner`
- `.reviews__title`
- `.reviews__grid`
- `.review-card`
- `.review-card__stars`
- `.review-card__byline`
- `.review-card__photo`
- `.review-card__meta`
- `.review-card__name`
- `.review-card__role`
- `.review-card__company`

Teaser strip:

- `.teaser-strip`
- `.teaser-strip--wd`
- `.teaser-strip__inner`
- `.teaser-strip__layout`
- `.teaser-strip__title`
- `.teaser-strip__title-accent`
- `.teaser-strip__extract`
- `.teaser-strip__extract-body`

### G) Case page reusable signatures

Reference file: `css/case-wonderful-dental.css`

Key blocks:

- `.case-wrap`
- `.case-hero`, `.case-title`, `.case-meta`
- `.case-review-card`, `.case-quote`
- `.case-metrics__grid`, `.case-metric`, `.case-metrics__note`
- `.case-compare*` family:
  - `.case-compare`
  - `.case-compare__before`
  - `.case-compare__divider`
  - `.case-compare__handle`
  - `.case-compare__range`
  - `.case-compare__label--before`
  - `.case-compare__label--after`
- `.case-visual__video-frame`, `.case-visual__video`
- `.case-story--tight-bottom`, `.case-visual--tight-top`
- `.case-footer-cta__content`, `.case-footer-cta__actions`

### H) Contact page reusable signatures

Reference file: `css/contact.css`

Key blocks:

- `.contact-wrap`
- `.contact-hero`, `.contact-supertitle`, `.contact-title`, `.contact-copy`
- `.contact-form-card`, `.contact-form-card__label`
- `.contact-toggle`, `.contact-toggle__label`, `.contact-toggle__buttons`
- `.contact-form` (+ `.is-active`, `.is-updating`)
- `.contact-form__field`
- `.contact-form__cta`
- `.contact-form__fallback`

---

## 6) Breakpoint and responsiveness policy

Standard breakpoints:

- Tablet/layout shift: `@media (max-width: 960px)`
- Mobile/compact typography: `@media (max-width: 640px)`

Responsive consistency rules:

- Keep section containers aligned with `max-width: var(--max)` + horizontal padding via `var(--space)`
- On mobile, rely on tokenized spacing (`--space: 0.6rem`) instead of one-off inline paddings

---

## 7) Motion contract (JS/CSS)

Shared JS config via `window.MilosSite.motion.ms`:

- `copyFade: 280`
- `chainStart: 180`
- `chainStagger: 105`

Current switching patterns:

- homepage focus variant switching: fades copy with `.is-updating`
- contact audience form switching: same fade pattern (`copyFade` + `.is-updating`)

Reduced motion:

- all major animated flows branch on `MilosSite.prefersReducedMotion()`

---

## 8) Accessibility and interaction baseline

- Skip link: `.skip-link` to `#main`
- Keyboard-visible focus outlines for controls/links
- Mobile nav closes on:
  - link click
  - outside click
  - Escape key
- Form inputs have visible `:focus-visible` ring in accent color

---

## 9) Portable extraction checklist (copy to another app)

Minimum files to port:

1. `css/styles.css` (tokens + base components)
2. `css/utilities.css` (typography/util helpers)
3. Optional section CSS files:
   - `css/case-wonderful-dental.css`
   - `css/contact.css`
4. `js/site-system.js` (motion + breakpoint contract)
5. Any page script using those contracts:
   - `js/home.js`
   - `js/how-I-work.js`
   - `js/case-wonderful-dental.js`
   - `js/contact.js`

Copy these conventions too:

- header pattern (`Available Now` + `Contact me`)
- unified CTA routing (`Contact me` + backlog-audit CTAs -> `/contact`)
- section title standard (`u-type-h2`) as BR-02 rule

---

## 10) Quick style recipe (if rebuilding from scratch)

1. Set root tokens from sections 2 and 3
2. Implement utility classes from section 4
3. Implement base components (header/buttons/footer/reveal) from section 5
4. Add section-level modules (reviews/teaser/case/contact)
5. Wire JS reveal + switch animations to `copyFade`
6. Add mobile token override (`--space: 0.6rem`, body text mobile token)

This yields the current visual identity with matching spacing, typography, motion, and interaction behavior.
