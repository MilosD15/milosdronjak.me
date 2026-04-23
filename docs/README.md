# Site docs

- **[styling.md](./styling.md)** — tokens, `css/utilities.css`, `u-*` classes  
- **[animations.md](./animations.md)** — `MilosSite` motion / interaction contract and `js/home.js` patterns  
- **[cases.md](./cases.md)** — reusable case-page structure, section patterns, and media conventions  
- **[contact.md](./contact.md)** — contact page structure, audience toggle forms, and CTA/linking conventions  
- **[brand-identity-unified.md](./brand-identity-unified.md)** — portable one-file visual identity system (tokens, classes, components, motion, responsive rules)  

Scripts: load **`js/site-system.js`** before any page script that reads `window.MilosSite`.

Current baseline:
- Body/UI font is Montserrat (`--font-ui`), headings use Fraunces (`--font-display`)
- Accent system is orange-based (`--orange`, `--orange-dark`, `--orange-darker`)
- Global body text scale is tokenized: desktop `0.92rem`, mobile `0.82rem`
- Hover/focus interactions are standardized to ~300ms
- Current page-specific scripts:
  - Homepage: `js/home.js`
  - How I work page: `js/how-I-work.js`
  - Contact page: `js/contact.js`
  - Case page (Wonderful Dental): `js/case-wonderful-dental.js`
