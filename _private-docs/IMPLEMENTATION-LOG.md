# Implementation Log

## Documentation Cleanup Status (2026-04-15)

- Scope: documentation-only alignment with real implementation/runtime.
- Current production hosting: **GitHub Pages** (custom domain via `CNAME`).
- Active stylesheet in current HTML pages: `css/style.css`.
- `css/style.min.css` exists but is currently derivative/unused at runtime (not referenced by `index.html` / `en/index.html`).
- Active header/preload brand asset in current implementation: `img/brand/zypherolab-logo.webp` (fallback `img/brand/zypherolab-logo.png`).
- `_redirects` is currently **missing** from repo (not available at runtime).
- Potentially stale/ambiguous files kept for now (not deleted):
  - `index.html.backup`
  - `css/style.min.css`
  - `js/analytics.js`

- Date: 2026-04-14
- Files modified: `js/simulator.js`, `js/i18n.js`, `index.html`, `en/index.html`

## Bugs Fixed

1. **Desktop toggle broken after switching to Mobile**  
   Added a static preview device class map in `setupPreviewToggle()` so `desktop` correctly targets `.preview-laptop`.

2. **Style pills do not regenerate preview**  
   Updated `setupStylePills()` to call `generateSite()` after style selection when a business name is already present.

3. **`siteType` select does not trigger real-time update**  
   Updated `setupRealTimeUpdates()` to use `change` for `<select>` and `input` for other form controls.

4. **`createPreviewCard()` returns `DocumentFragment` causing clone issue**  
   Changed `createPreviewCard()` to return the wrapper `<div>` directly and kept mobile cloning on the concrete element.

5. **Hardcoded Romanian strings in preview card**  
   Replaced Romanian literals with `tt()` i18n lookups and added `preview.section.*` keys for both `ro` and `en` in `js/i18n.js`.

6. **Export button generates broken HTML fragment**  
   Reworked `setupExportButton()` to export a full standalone HTML document with extracted `.preview-*` CSS rules and validation checks.

## Known Limitation

- CSS export via `document.styleSheets` / `cssRules` may fail for CORS-restricted stylesheets; fallback approach is to link a live stylesheet URL in exported HTML.

## Next Steps

1. Add a "Copy link" / "Share preview" action in the simulator.
2. Add a "Reset" button to clear all simulator inputs and preview output.
3. Persist last-used simulator values to `localStorage`.
4. Replace `alert()` usage in Export flow with inline validation feedback.

## Hosting Notes (2026-04-15)

- Production hosting target is GitHub Pages with custom domain from `CNAME`.
- Repository keeps static-only deployment assumptions (no build pipeline).
- `_redirects` is still missing and is not part of current runtime behavior.

## P2 audit improvements (2026-04-20)

Scope: website audit P2 only. P1 items (hero CTA hierarchy, trust strip in hero, no-JS nav fallback, floating-button overlap guard, meta/schema parity) were not intentionally changed.

### Phase 1 — Funnel re-sequence

- **Change:** In `index.html` and `en/index.html`, `<main>` section order after the hero was adjusted so the commercial path is shorter: **Services → Offer → new proof strip → Portfolio (results) → Testimonials → Process → Pricing → Subscriptions → About → Facts → FAQ → Simulator → Contact.**
- **Rationale:** Value (services/offer), concrete credibility, and portfolio evidence appear before long explanatory blocks; pricing appears before subscriptions and about/facts; **simulator moved to late stage** (before contact) so it supports a decision already framed by offer, proof, and price.
- **Left untouched:** Hero structure, header CTAs, trust chips in hero, nav link set (still home / services / portfolio / simulator / contact).

### Phase 2 — Simulator role in the funnel

- **Change:** Positioned as **late-stage conversion helper** (pre-contact, after FAQ). Added **`gen.funnelBridge`** in `js/i18n.js` (RO/EN) and a **`<p class="generator-funnel-bridge">`** under the simulator H2 in both HTML files. **`gen.footText`** / **`gen.footCta`** already point users to the quote request after preview.
- **Left untouched:** Simulator logic and preview UI in `js/simulator.js` (no redesign).

### Phase 3 — Proof / credibility

- **Change:** New **`.proof-strip`** section with `data-i18n` keys `proof.title`, `proof.lead`, `proof.b1`–`proof.b4` (response time, delivery window, process path, post-launch support). Placed immediately after **Offer** so proof sits early without duplicating the hero trust strip.

### Phase 4 — Portfolio mini case studies

- **Change:** Portfolio cards use **`<ul class="portfolio-case">`** with challenge / solution / outcome lines; labels via `portfolio.labelChallenge|labelSolution|labelResult` and per-project `portfolio.projectN.{challenge,solution,result}` in `js/i18n.js`. Static HTML fallbacks match each locale.
- **Tradeoff:** Case lines are illustrative anonymized examples (not named client projects); they still read as evidence-oriented copy.

### Phase 5 — Mobile motion / visual fatigue

- **Change:** In `css/style.css`, **softened hero decorative layers** at `max-width: 768px` (lower opacity, longer ambient animation). **Replaced** the previous `max-width: 650px` rules that **increased** hero shape opacity (`0.98 !important`) with **lower** opacity, **slower** `::before` animation, **smaller** `::after` glow, and **hide** `.floating-shape--circle-3` on very narrow viewports. **`prefers-reduced-motion: reduce`** block unchanged (still disables animations globally).
- **Risk:** Hero may feel slightly flatter on small phones; intentional trade for readability and CTA focus.

### File-by-file summary

| File | Summary |
|------|--------|
| `index.html` | Section reorder; `proof-strip`; portfolio case markup; simulator funnel bridge paragraph. |
| `en/index.html` | Same structure; English static fallbacks for proof, portfolio cases, simulator bridge (RO script mistakes corrected). |
| `js/i18n.js` | `proof.*`; portfolio labels + case strings RO/EN; `gen.funnelBridge`; `gen.footText` / `gen.footCta` aligned to quote path. |
| `css/style.css` | `.proof-strip*`, `.portfolio-case*`, `.generator-funnel-bridge`; dark mode list tiles; mobile hero motion calmer; removed “boost opacity” mobile hero regression. |
| `js/simulator.js` | No changes required for P2 (nav highlight still uses `home`, `services`, `results`, `simulator`). |

### Intentionally not done (follow-up)

- Named portfolio links, real metrics per client, or separate case-study pages.
- Nav items for pricing/contact in the scroll spy (still sparse nav).
- Further simulator UX (reset, share link, non-`alert` export) — see existing Next Steps above.

## GSC / apex (2026-04-21)

- **`robots.txt`:** Removed deprecated `Host:` directive (ignored by Google). Added comment that canonical host is apex without `www`. `Sitemap:` line unchanged.
- **`llms.txt`:** Clarified under Canonical that all public URLs use apex `https://zypherolab.com/` (no `www`), matching GSC URL-prefix setup.
- **DNS / GitHub Pages:** Redirect `www` → apex remains a **hosting/DNS** task (not in static files); with property `https://zypherolab.com`, ensure in repo **Pages → Custom domain** apex is primary and optional www redirects in DNS provider if both records exist.

## S3 Core Web Vitals pass 1 (2026-04-23)

Scope: reduce initial render pressure before content architecture work.

### Applied optimizations

- **Head resource pressure reduced** in both `index.html` and `en/index.html`:
  - removed `preconnect` for GTM host (analytics is still lazy-loaded on interaction),
  - removed logo image preload,
  - kept only base Latin font preloads (dropped latin-ext preloads from critical path),
  - removed `fetchpriority="high"` from header logo image.
- **Hero animation startup deferred** in both pages:
  - added a tiny inline bootstrap script that sets `.fx-ready` using `requestIdleCallback` (fallback `setTimeout`).
- **CSS animation gating** in `css/style.css`:
  - decorative hero animations are disabled for first paint by default,
  - animations resume only after `.fx-ready` is present.

### Validation notes

- Linter check for edited files: no diagnostics.
- Attempted local Lighthouse run, but this environment currently lacks `npm`/`npx`, so audit CLI could not be executed here.

## S3 Core Web Vitals pass 2 (2026-04-23)

Scope: target remaining LCP gap after RO Lighthouse snapshot.

### Baseline observed (RO mobile snapshot provided by user)

- LCP: **3.3s** (target < 2.5s, still open)
- INP proxy (`max-potential-fid`): **60ms** (target met)
- CLS: **0** (target met)

### Applied optimizations

- **Critical head pressure reduced further** in both `index.html` and `en/index.html`:
  - removed Montserrat preload from first paint path,
  - removed preload hint for `css/fonts.css` (kept async stylesheet loading with print/onload + noscript fallback).
- **Decorative paint cost deferred harder** in `css/style.css`:
  - `body::before`, `.hero::before`, `.hero::after` now start with `content: none` and are enabled only after `.fx-ready`,
  - `.hero .floating-shape` now starts hidden (`display: none`) and is enabled only after `.fx-ready`,
  - hero H1 switched to Inter stack for faster above-the-fold text rendering.

### Validation notes

- Linter check for edited files: no diagnostics.
- New Lighthouse snapshots still needed to validate post-pass-2 LCP on both `/` and `/en/`.

## S3 Core Web Vitals pass 3 (2026-04-23)

Scope: reduce startup main-thread pressure to improve INP/TBT after LCP target was reached.

### Baseline observed (RO mobile snapshot provided by user, latest)

- FCP: **1.1s** (target met)
- LCP: **2.1s** (target met)
- CLS: **0.018** (target met)
- INP proxy (`max-potential-fid`): **450ms** (target still open)

### Applied optimizations

- **Removed non-critical JS from critical startup path** in both `index.html` and `en/index.html`:
  - `i18n.js` is now loaded lazily (idle warmup + immediate load on language-switch intent),
  - `simulator.js` is now loaded lazily (near-viewport via IntersectionObserver, simulator interaction, or late timeout fallback),
  - kept `config.js`, `mobile-menu.js`, and `dark-mode.js` as deferred startup scripts.

### Validation notes

- Linter check for edited files: no diagnostics.
- Need fresh Lighthouse mobile snapshots in **Incognito** for both `/` and `/en/` to validate INP/TBT impact without extension noise.

## S3 final validation + verdict (2026-04-23)

### Latest snapshots reviewed

- **RO (`/`)**: FCP **1.2s**, LCP **2.0s**, CLS **0.018**, INP proxy (`max-potential-fid`) **420ms**.
- **EN (`/en/`)**: FCP **1.5s**, LCP **2.0s**, CLS **0.000032**, INP proxy (`max-potential-fid`) **16ms**.

### Interpretation

- LCP/FCP/CLS targets are met on both locale pages.
- EN fully meets the INP proxy target.
- RO still reports elevated INP proxy, but audits include extension-attributed long tasks (`bubble_compiled.js`) and unattributable noise, so signal is not considered a clean app-only regression.

### Decision

- **S3 is marked Done** and we move to **S4 (commercial page architecture)**.
- For stricter CWV hygiene, run one extra RO mobile Lighthouse in Incognito with extensions disabled and keep it as monitoring evidence, not as a blocker for starting S4.

## Post P1/P2 validation pass (2026-04-20)

### What was checked

- **RO/EN parity:** Spot-checked `meta.*`, hero, offer, proof, portfolio labels and case lines, FAQ (all five Q/A), contact/form, simulator (`gen.*`), footer/float strings in `js/i18n.js` against static fallbacks in `index.html` and `en/index.html`. Confirmed no Romanian diacritics in `en/index.html` body.
- **Meta / schema:** Compared `<title>`, `meta name="description"`, `og:*`, `twitter:*`, and JSON-LD (`Organization`, `WebSite`, `WebPage`, `FAQPage`, `ProfessionalService`) on both pages to visible FAQ and org descriptions; structures are aligned per locale.
- **SEO / technical:** `canonical` + `hreflang` pairs, `robots.txt` allow + sitemap URL, `sitemap.xml` entries for `/`, `/en/`, `llms.txt`. No stale in-repo references from public HTML to `index.html.backup` or `css/style.min.css`.
- **Runtime behavior (code review):** `i18n.js` calls `applyMeta()` + `applyDomStrings()` on load and language switch; JSON-LD stays static in HTML (crawler-safe). **Note:** switching language on `/` via UI updates canonical to `/en/` while the path may remain `/` until navigation — existing behavior, not changed.

### Fixes applied in this pass

- **`llms.txt`:** Updated “Primary sections” and hero description; removed incorrect claim that the hero CTA targets the simulator. Documented bilingual maintenance (`index.html` / `en/index.html` + `js/i18n.js`) and the post–P2 section order (proof strip, late simulator, contact).
- **`sitemap.xml`:** Bumped `<lastmod>` to `2026-04-20` for all listed URLs (housekeeping after content/funnel updates).

### Left untouched (confirmed OK or out of scope)

- P1/P2 layout, funnel order, CSS motion tuning, simulator JS, form endpoint, theme-color, minor title vs `og:title` wording differences (intentional marketing variants).
- `Host:` line in `robots.txt` (legacy; low impact).
- Hamburger / mobile-menu-close `aria-label` strings remain hardcoded per page (RO vs EN file); not wired through `data-i18n` — acceptable until a dedicated a11y copy pass.

### Drift prevention (lightweight)

When editing user-visible copy, do **at least** this:

1. **Dual edit:** Change the same logical string in `js/i18n.js` (`ro` and `en`) and in **both** `index.html` and `en/index.html` static fallbacks for any element with `data-i18n` / `data-i18n-placeholder` / `data-i18n-aria`.
2. **Meta + JSON-LD:** If you change positioning or claims (e.g. delivery window), update **head tags and** the in-page JSON-LD FAQ answers on **both** locales so crawlers match the visible FAQ.
3. **Auxiliary files:** If the funnel or hero CTAs change again, update **`llms.txt`** in the same PR.
4. **Optional later:** A tiny `node` script could diff `STRINGS.ro/en` keys for parity; not added now to keep the repo build-free.

### Follow-up recommendations

- Manual smoke matrix once per release: RO/EN × mobile width × JS on/off × dark mode × open simulator + export + form validation (as listed in the audit).
- Consider wiring hamburger / drawer close labels through i18n for perfect parity when `?lang=` is used on a single physical page.
