# Contact page guidelines

Reusable contact page rules based on `contact/index.html`.

## Purpose

The contact page supports three intents in one place:

- backlog audit (agency flow)
- project inquiry (freelance client flow)
- open conversation (just saying hi flow)

## File structure

- Page HTML: `contact/index.html`
- Page CSS: `css/contact.css`
- Page JS: `js/contact.js`
- Copy source: `copy/contact.txt`

## Header/footer pattern

- Header uses standard site nav with:
  - availability badge (`product-tags__avail` + live dot)
  - `Contact me` CTA linking to `/contact`
- Footer uses shared footer markup and contact details.

## Hero content pattern

- Supertitle (`NO PITCH. NO APPLICATION.`)
- Main title (`u-type-display`)
- Body paragraphs in `u-type-body`
- Personal-note paragraph (strong emphasis)
- Secondary audience cue:
  - `Not an agency?` as `u-type-h2`
  - follow-up explanatory body text

## Form system (v2)

### Audience toggle

- Label: `I am`
- Options:
  - `An agency`
  - `A freelance client`
  - `Just saying hi`

Implementation:

- Toggle buttons: `data-contact-type-btn`
- Form variants: `data-contact-form="agency|freelance|hi"`

### Form variants

1. **Agency**
   - label: `SEND THE BRIEF`
   - fields: agency name, name+role, stuck tickets, preferred slot
   - CTA: `Send three tickets →` / `REPLY WITHIN 24 HOURS`

2. **Freelance**
   - label: `TELL ME ABOUT YOUR PROJECT`
   - fields: name, company/website, needs, timeline
   - CTA: `Send it over →` / `REPLY WITHIN 24 HOURS`

3. **Hi**
   - label: `SAY HI`
   - fields: name, email, message
   - CTA: `Send it →` / `I READ EVERYTHING`

Shared fallback line:

- `Or directly hello@milosdronjak.me`

## Motion/interaction

- Contact form variant switching follows homepage focus-switch behavior:
  - `copyFade` timing from `MilosSite.motion.ms.copyFade`
  - `.is-updating` fade/translate transition
  - reduced-motion fallback: instant switch

## Routing convention

Across site pages:

- all `Contact me` CTAs should link to `/contact`
- all `+ Book a backlog audit` CTAs should link to `/contact`

This keeps one canonical entry point for all inquiry intents.
