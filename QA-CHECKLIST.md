# QA Checklist (Pre-Deploy)

Use this checklist after content, styling, or behavior updates.

## 1) RO/EN parity

- [ ] Open `/` and `/en/`; verify section order and available sections are equivalent.
- [ ] Confirm key copy parity: hero, pricing, subscriptions, testimonials, FAQ, contact CTA labels.
- [ ] Verify pricing values/currency are consistent with current policy in both locales.

## 2) JavaScript ON/OFF fallback

- [ ] JS ON: language switch updates text/meta and URL path correctly.
- [ ] JS OFF: static copy remains coherent in both locales (no contradictory prices or labels).
- [ ] JS OFF: forms and essential navigation anchors remain usable.

## 3) Mobile navigation

- [ ] On <=768px, hamburger opens/closes menu correctly.
- [ ] Overlay click + ESC closes menu.
- [ ] Nav links navigate to correct sections (`home`, `services`, `pricing`, `results`, `contact`).
- [ ] Header elements do not overlap on narrow devices.

## 4) Dark mode

- [ ] Toggle works on both pages and persists after refresh.
- [ ] Contrast remains readable for hero, cards, FAQ, forms, simulator.
- [ ] No broken icon states (`🌙`/`☀️`) in header and mobile menu.

## 5) Lead form behavior

- [ ] Required fields validate correctly (`name`, `email`, `business`, `goal`).
- [ ] Invalid email shows clear error.
- [ ] Successful submit shows success message (Formspree response OK).
- [ ] Error response path shows fallback error message.

## 6) Simulator behavior

- [ ] `Generate preview` creates desktop + mobile preview.
- [ ] Style/color/type updates refresh preview correctly.
- [ ] `Export preview` downloads HTML only after preview exists.
- [ ] Language switch updates simulator text for generated preview content.

## 7) Anchors and CTA behavior

- [ ] Primary hero CTA points to `#contact`.
- [ ] Secondary hero CTA points to `#results`.
- [ ] Pricing CTA buttons point to `#contact`.
- [ ] WhatsApp floating button opens `wa.me` with localized prefilled text.

## 8) Basic performance sanity

- [ ] Page loads without console errors in latest Chrome/Safari/Firefox.
- [ ] Lighthouse quick pass (mobile): no severe regressions in Performance/SEO/Accessibility.
- [ ] No obvious layout shifts in first viewport.

## 9) Final release checks

- [ ] `robots.txt` and `sitemap.xml` remain accessible.
- [ ] Canonical/hreflang tags are correct for `/` and `/en/`.
- [ ] No references to removed legacy files.

