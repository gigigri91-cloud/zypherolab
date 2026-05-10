# ZypheroLab Current State Audit

Audit date: 2026-04-16  
Scope: `index.html`, `en/index.html`, `css/`, `js/`, SEO/config files, and visible legacy files.

## 1) Project Overview

- The site is a static marketing/presentation website for ZypheroLab web design services (conversion-focused websites, SEO, AI-search visibility).
- It has two language entry points:
  - Romanian: `/` (`index.html`)
  - English: `/en/` (`en/index.html`)
- Main section flow on both pages:
  - hero
  - facts
  - services
  - offer
  - pricing
  - subscriptions
  - results/portfolio
  - process
  - about
  - testimonials
  - FAQ
  - simulator
  - contact
  - footer
- Main user journey today:
  - land in hero -> scroll through service proof/pricing -> interact with simulator and/or portfolio -> submit lead form or click WhatsApp/contact CTA.

## 2) Current Structure

- **Core HTML**
  - `index.html`: RO landing page with full content blocks, schema, form, and script bootstrapping.
  - `en/index.html`: EN variant, same structure and behavior.
- **Core CSS**
  - `css/style.css`: active stylesheet (referenced by both pages), includes layout, responsive, dark mode, simulator visuals, animations.
  - `css/fonts.css`: self-hosted `@font-face` for Inter and Montserrat.
  - `css/style.min.css`: present but not referenced in HTML; appears older and visually diverged from active theme.
- **Core JS runtime**
  - `js/config.js`: global constants (`waPhoneE164`).
  - `js/i18n.js`: RO/EN dictionary, language switching, meta/canonical/hreflang updates, text replacement by `data-i18n`.
  - `js/mobile-menu.js`: mobile menu open/close, overlay, focusability control.
  - `js/dark-mode.js`: theme persistence via `localStorage`.
  - `js/simulator.js`: simulator generation/export, reveal-on-scroll, nav highlight, lead form validation + Formspree submit.
  - `js/analytics.js`: exists but not loaded by HTML.
- **SEO/config/assets**
  - `robots.txt`, `sitemap.xml`, `llms.txt`, `CNAME`, favicon set, brand assets under `img/brand/`, local WOFF2 fonts under `fonts/`.
- **Legacy/duplicate signals**
  - `index.html.backup`: old full backup page still present.
  - `css/style.min.css`: legacy/derived variant not used at runtime.
  - `js/analytics.js`: dead asset (not imported).

## 3) Current Design State

- **Hero**: centered copy + CTA pair + trust badges, ambient gradient shapes and subtle motion layer in active CSS.
- **Navigation**: fixed top header with brand, desktop nav, language switch, dark toggle, CTA, plus mobile hamburger/slideout menu.
- **Pricing/subscriptions**: card-based, featured plan highlighting, strong visual hierarchy.
- **Testimonials/FAQ**: social proof in cards + FAQ via native `<details>`.
- **Footer**: compact with FAQ/contact links and email.
- **Visual character**:
  - generally modern and premium-leaning;
  - conversion-focused (many CTA entry points);
  - somewhat dense due to many sections in one page.
- **Dark mode**: globally supported through variable overrides (`body.dark-mode ...` blocks).
- **Responsive**: multiple breakpoints, mobile menu, hero and simulator adaptations, and very-small-screen header handling.

## 4) Current Functionality

- Working interactive systems from loaded runtime scripts:
  - language switch (RO/EN + URL normalization + localStorage),
  - dark mode toggle with system preference fallback,
  - mobile menu with overlay and escape handling,
  - reveal-on-scroll animations,
  - nav active-state highlight by section visibility,
  - simulator preview generation (desktop/mobile tabs) and export HTML,
  - lead form validation and async Formspree submit.
- Notable implementation details:
  - GTM/gtag loads lazily (`setTimeout` after `load`) to reduce initial blocking.
  - WhatsApp links are rewritten by i18n to localized preset text.
- Broken/incomplete/redundant/risky signals:
  - `js/analytics.js` is not loaded (its tracking never executes).
  - `js/analytics.js` also listens to `#simulator-form`, but no such form exists.
  - Content fallback mismatch exists between static HTML and i18n dictionary (especially prices/titles); JS users see i18n values, no-JS users see static HTML values.

## 5) Performance / SEO / Accessibility Signals

- **Performance positives**
  - static architecture, no framework/runtime bundle;
  - self-hosted fonts with preload;
  - deferred scripts;
  - `content-visibility` and `contain-intrinsic-size` for non-hero sections;
  - deferred GTM load.
- **Performance concerns**
  - large single-page content length and many visual effects can still increase paint cost on low-end devices.
  - duplicated/unused legacy assets (`style.min.css`, backup HTML, unused analytics script) add maintenance complexity.
- **SEO basics present**
  - title/description/canonical/hreflang/OpenGraph/Twitter tags;
  - JSON-LD graph with Organization/WebSite/WebPage/ProfessionalService/FAQPage;
  - `robots.txt`, `sitemap.xml`, `llms.txt`, domain in `CNAME`.
- **Accessibility/semantic signals**
  - good baseline: semantic sectioning, skip-link, labels, aria attributes, `aria-live` on status/preview regions, keyboard-accessible FAQ (`details/summary`).
  - potential weakness: content correctness for no-JS mode differs because i18n patching happens client-side.

## 6) Content and Conversion

- Value proposition is clear: premium, fast, conversion-oriented websites.
- Strong conversion blocks:
  - hero CTA pair,
  - pricing + subscriptions cards,
  - simulator CTA path,
  - repeated contact/WhatsApp CTAs,
  - testimonials + FAQ reducing objections.
- Weaknesses observed in current content architecture:
  - too many sections can dilute focus before contact.
  - static fallback copy in HTML is not fully aligned with i18n dictionary values (e.g., some pricing/text variants).
  - EN static prices in HTML use RON while i18n EN pricing strings are EUR; this can create indexing or no-JS inconsistency.

## 7) What Is Intentionally Kept (Current State)

- Static deployment model (GitHub Pages compatible) with no build pipeline.
- Bilingual structure (`/` and `/en/`) with shared runtime i18n handling.
- Existing SEO metadata + structured data model.
- Existing simulator flow and Formspree lead pipeline.
- Existing dark mode and mobile-menu architecture.
- Note: this audit does not implement fixes; it documents current behavior only.

## 8) Improvement Candidates (Ranked)

### A) Visual Improvements
1. Simplify section density/spacing rhythm to reduce perceived clutter on long scroll.
2. Unify decorative motion patterns across hero + other sections for tighter art direction.
3. Normalize card visual hierarchy between pricing/subscriptions/results.

### B) UX Improvements
1. Prioritize a clearer primary journey (hero -> proof -> contact) with fewer competing CTA branches.
2. Add explicit in-page progress/jump aids for long single-page navigation.
3. Tighten mobile form/simulator ergonomics (input flow, faster completion).

### C) Technical Improvements
1. Resolve stale assets: either wire or remove `js/analytics.js`; remove/park legacy `index.html.backup` and unreferenced `css/style.min.css`.
2. Eliminate HTML vs i18n fallback mismatches (especially pricing and some section text).
3. Add lightweight regression checks (manual checklist or script) for RO/EN parity and no-JS fallback sanity.

### D) Content / Conversion Improvements
1. Align all pricing and offer values across static HTML, i18n strings, and perceived language/currency context.
2. Reduce duplicate claims between sections and sharpen proof-led messaging.
3. Increase trust specificity (case data granularity, proof artifacts, stronger credibility markers).

## 9) Feedback on Audit Process

- Review method:
  - inspected both language HTML files end-to-end for structure/content/SEO;
  - inspected all runtime JS and loaded/non-loaded scripts;
  - inspected active CSS patterns (responsive, dark mode, motion);
  - reviewed robots/sitemap/llms/CNAME and legacy assets.
- Straightforward areas:
  - architecture, section map, runtime responsibilities.
- Areas requiring extra caution:
  - i18n runtime replacements vs static fallback content;
  - distinguishing active vs legacy files (`style.css` vs `style.min.css`, loaded vs unloaded scripts).
- Information that would sharpen a second-pass audit:
  - latest Lighthouse/Web Vitals numbers,
  - analytics funnel data by section/CTA,
  - target audience priority (RO-only vs international),
  - intended pricing currency strategy per locale.

