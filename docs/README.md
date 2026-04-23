# Site docs

- **[styling.md](./styling.md)** — tokens, `css/utilities.css`, `u-*` classes  
- **[animations.md](./animations.md)** — `MilosSite` motion / interaction contract and `js/home.js` patterns  

Scripts: load **`js/site-system.js`** before any page script that reads `window.MilosSite`.

Current baseline:
- Body/UI font is Montserrat (`--font-ui`), headings use Fraunces (`--font-display`)
- Accent system is orange-based (`--orange`, `--orange-dark`, `--orange-darker`)
- Global body text scale is tokenized: desktop `0.92rem`, mobile `0.82rem`
- Hover/focus interactions are standardized to ~300ms
- Current page-specific scripts:
  - Homepage: `js/home.js`
  - How I work page: `js/how-I-work.js`
