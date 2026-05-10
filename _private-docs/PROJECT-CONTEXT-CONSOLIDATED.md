# ZypheroLab — Context Consolidat (docs + private-docs)

_Actualizat: 2026-04-15_

## 1) Setup curent in productie (source of truth)

- Hosting activ: **GitHub Pages** (domeniu custom din `CNAME` -> `zypherolab.com`).
- Stack: site static (HTML/CSS/vanilla JS), fara backend si fara build toolchain.
- Limbi: RO la `/`, EN la `/en/`.

## 2) Fisiere active (runtime)

- Pagini active:
  - `index.html`
  - `en/index.html`
- Stil activ principal:
  - `css/style.css`
- Fonturi:
  - `css/fonts.css`
- Scripturi runtime folosite in pagini:
  - `js/config.js`
  - `js/i18n.js`
  - `js/mobile-menu.js`
  - `js/dark-mode.js`
  - `js/simulator.js`

### Note de ordine scripturi

- `js/i18n.js` trebuie sa ruleze inainte de `js/simulator.js`.
- `js/config.js` trebuie incarcat inainte de scripturile care folosesc configurari globale.

## 3) i18n si continut dinamic

- Traduceri centralizate in `STRINGS.ro` si `STRINGS.en` din `js/i18n.js`.
- Cheile noi se adauga in ambele limbi.
- `zyphero:langchange` regenereaza preview-ul simulatorului cand exista deja.
- Meta (`title`, `description`, `og:*`, `twitter:*`) este sincronizata din i18n.

## 4) Simulator (stare actuala)

- Preview DOM in `#previewBox` (desktop) si `#previewBoxMobile` (mobile), fara iframe.
- Toggle desktop/mobile stabil prin mapare:
  - `desktop -> .preview-laptop`
  - `mobile -> .preview-mobile`
- Style pills regenereaza preview-ul cand exista nume business.
- `siteType` foloseste `change`, restul campurilor folosesc `input`.
- `createPreviewCard()` returneaza wrapper `div`.
- Textele de preview folosesc chei i18n (`preview.*`, inclusiv `preview.section.*`).
- Exportul produce HTML standalone cu CSS `.preview-*` extras din stylesheet-uri.
- Limitare cunoscuta la export:
  - accesul la `cssRules` poate esua pe stylesheet-uri CORS-restricted.

## 5) Formular lead (Formspree)

- Endpoint activ: `https://formspree.io/f/xzdyzdpn`.
- Fallback HTML activ in ambele pagini (`action` + `method="POST"`).
- Submit AJAX in `setupLeadForm()` cu:
  - `fetch(...)`
  - header `Accept: "application/json"`
- Inline field-level errors implementate pentru:
  - `name`
  - `email`
  - `business`
  - `goal`
- Validari:
  - required
  - format email
  - mapare erori Formspree pe campuri
- A11y:
  - `aria-invalid`
  - `aria-describedby`
  - clear erori la `input`

## 6) Branding activ in implementare

- Asset brand activ in header si preload: `img/brand/zypherolab-logo.webp` (fallback `img/brand/zypherolab-logo.png`).
- JSON-LD `logo` foloseste: `https://zypherolab.com/img/brand/zypherolab-logo.webp`.
- `zypherolab-mark.png` ramane disponibil in repo ca asset alternativ, dar nu este logo-ul activ in header/preload.

## 7) Fisiere derivative / stale / ambigue (fara stergere automata)

- `css/style.min.css`:
  - fisier derivat/alternativ,
  - **nu este referentiat in HTML-ul curent**.
- `index.html.backup`:
  - backup local, nu este fisier runtime.
- `js/analytics.js`:
  - exista in repo, dar nu este incarcat in paginile active.
- `_redirects`:
  - **nu exista** in repo la acest moment.

## 8) Publicare si deploy (stare curenta)

- Platforma activa: GitHub Pages.
- Domeniu activ: `zypherolab.com` via `CNAME`.
- Publicarea se face prin push in repository-ul GitHub.
- Nu exista reguli active de redirect custom in repo (`_redirects` lipseste).
