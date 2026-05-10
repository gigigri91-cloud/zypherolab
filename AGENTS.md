## Cursor / AI agent instructions — ZypheroLab

Documentația detaliată (handoff RO + ghid tehnic EN) stă în **`docs/`**:

- `docs/AGENTS.md` — instrucțiuni agenți (engleză)
- `docs/PENTRU-CHATURI-VIITOARE.md` — context complet (română)

**Folderul `docs/` este în `.gitignore`** — nu se comite și nu se publică în repo; păstrează aceste fișiere **doar local** sau copiază-le unde ai nevoie.

### Referință minimă (când `docs/` lipsește)

- Site **static**: HTML, CSS, vanilla JS — fără `package.json` / build / backend.
- Local: `python3 -m http.server 8080` → `/` (RO), `/en/` (EN).
- Scripturi runtime: `js/config.js`, `js/i18n.js`, `js/mobile-menu.js`, `js/dark-mode.js`, `js/simulator.js`. Preview simulator: `#previewBox`, `generateSite()` în `simulator.js`.
- Stil activ principal: `css/style.css`.
- Brand asset activ în header/preload: `img/brand/zypherolab-logo.webp` (fallback `img/brand/zypherolab-logo.png`).
- Deploy: GitHub Pages, domeniu în `CNAME` → `zypherolab.com`.
- `_redirects` nu există în repo în starea curentă.
- Nu înlocui `index.html` cu un prototip gol fără i18n, `en/index.html`, meta SEO și căi root-relative (`/css/`, `/js/`).
