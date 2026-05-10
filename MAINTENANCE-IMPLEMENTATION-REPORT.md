# Maintenance Implementation Report (Top 5 Priorities)

Date: 2026-04-16

## Scope

Implemented in minimal-risk order:
1. RO/EN parity + fallback consistency
2. Pricing/currency strategy
3. Stale/legacy cleanup
4. Conversion flow simplification
5. Lightweight QA checklist

## What Changed

### Phase 1 — RO/EN parity + fallback consistency

- Aligned i18n strings with the current static HTML copy to reduce JS-on vs JS-off drift.
- Updated mismatched copy areas in `js/i18n.js`:
  - process labels/descriptions (RO/EN)
  - about block (RO/EN)
  - pricing/subscription labels and feature lines (RO/EN)
  - portfolio titles/descriptions/links (RO/EN)
  - FAQ title and Q1/Q4 wording (RO/EN)
  - hero/header CTA labels (EN)
- Aligned FAQ JSON-LD question/answer text in both `index.html` and `en/index.html` with visible FAQ copy.
- Result: static fallback and runtime-injected text now match more closely for key conversion sections.

### Phase 2 — pricing/currency strategy

- Chosen strategy: **single visible currency model = EUR in both locales** for core package pricing.
- Applied to EN static fallback in `en/index.html`:
  - Starter: `300 €`
  - Growth: `600 €`
- Ensured i18n values are consistent with this model.

### Phase 3 — stale/legacy artifact cleanup

- Removed dead/legacy files that were not used in runtime:
  - `js/analytics.js` (not imported)
  - `css/style.min.css` (not referenced)
  - `index.html.backup` (legacy backup)
- Updated `AGENTS.md` to reflect active stylesheet reality (`css/style.css` only).

### Phase 4 — conversion flow simplification

- Simplified primary navigation path to prioritize purchase intent:
  - replaced nav “Simulator” with “Pricing” in both desktop + mobile nav on RO/EN pages.
- Updated nav active highlighting in `js/simulator.js`:
  - tracked sections now include `pricing` instead of `simulator`.
- Simulator section remains available (still reachable from in-page CTAs), but no longer promoted as a top-level nav step.

### Phase 5 — lightweight QA/regression checklist

- Added `QA-CHECKLIST.md` with repeatable manual pre-deploy checks for:
  - RO/EN parity
  - JS on/off fallback
  - mobile nav
  - dark mode
  - form behavior
  - simulator behavior
  - anchors/CTA paths
  - quick performance sanity

## What Was Intentionally Left Untouched

- Visual design system and core layout architecture in `css/style.css`.
- Existing meta tag architecture.
- Formspree endpoint and lead form data model.
- Simulator generation/export logic (except nav highlight mapping).
- Dark mode behavior and token model.

## Risks / Tradeoffs

- i18n alignment was done by matching current static HTML copy (safe fallback-first approach), not a full copywriting rewrite.
- Deleting legacy files reduces ambiguity, but removes historical fallback artifacts from repo root.
- Nav simplification improves conversion focus, but reduces direct top-nav exposure for simulator.

## Follow-up Recommended

1. Run full manual QA checklist on real mobile + desktop browsers.
2. Run Lighthouse (mobile/desktop) and compare against previous baseline.
3. Decide whether to publish a short pricing-policy note in public-facing content (if business wants explicit currency rationale).
4. Optionally tighten long-page section sequencing further after analytics validation.

