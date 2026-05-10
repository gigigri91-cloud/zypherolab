# Tracking Foundation — SEO & Lead Generation

Date: 2026-04-22  
Scope: audit + minimal implementation for GA4 conversion tracking (GitHub Pages safe, no dependencies).

## 1) What tracking exists now

- GA4 script is loaded from `googletagmanager.com` in:
  - `index.html`
  - `en/index.html`
- GA4 measurement ID in use: `G-JRPX0T1X3S`.
- GA4 load strategy is deferred/lazy (loads on user interaction or delayed fallback), which is good for performance.
- Google Search Console verification meta tag already exists in both locale pages:
  - `<meta name="google-site-verification" ...>`

### Existing gaps (before this update)

- No explicit custom conversion events for:
  - contact form submit success
  - WhatsApp click
  - primary hero CTA click
  - pricing CTA click
- No explicit Bing Webmaster verification token in code/docs at this time.

## 2) What was changed

### `js/config.js`

- Added `ga4MeasurementId` to `window.ZypheroConfig`.
- Added a minimal global tracking helper:
  - `window.ZypheroAnalytics.track(eventName, params)`
- Added `window.dataLayer` bootstrap fallback so events can be queued safely even when `gtag` is not yet available.

### `js/simulator.js`

- Added `trackEvent()` helper wrapper.
- Added conversion tracking in existing form flow:
  - event: `contact_form_submit`
  - fired only when Formspree submit returns success.
- Added delegated click tracking for:
  - `whatsapp_click` on `a[data-wa-link='true']`
  - `primary_cta_click` on `.hero-actions a.btn:not(.btn-secondary)`
  - `pricing_cta_click` on `#pricing .btn`
- Added `page_lang` event parameter for easy RO/EN split analysis.

## 3) Manual setup still required outside repo

These steps are required in platform dashboards, not in code:

1. **GA4 conversion setup**
   - In GA4 Admin, mark as conversions:
     - `contact_form_submit`
     - `whatsapp_click`
     - `primary_cta_click`
     - `pricing_cta_click`
   - Validate in DebugView/Realtime that events arrive with expected params.

2. **Google Search Console**
   - Confirm property ownership and active coverage for:
     - `https://zypherolab.com/`
   - Submit/refresh sitemap ingestion and check indexing/reporting.

3. **Bing Webmaster Tools**
   - Create/verify site property.
   - Add Bing verification meta tag (or alternate verification method).
   - Submit sitemap.

4. **GA4 integrations**
   - Link GA4 <-> Search Console for combined acquisition + query reporting.
   - Configure Looker Studio (optional) for weekly KPI dashboarding.

## 4) Recommended KPI tracking (weekly)

Core business KPIs:
- Organic leads (form submits + WhatsApp starts from organic sessions).
- Lead conversion rate by landing page.
- Contact intent split:
  - `contact_form_submit`
  - `whatsapp_click`

SEO KPIs:
- Non-brand impressions and clicks.
- Average position for commercial keywords.
- CTR by query and by landing page.
- Indexed pages and coverage issues.

Quality/control KPIs:
- Core Web Vitals trend (mobile first).
- Top landing pages with high impressions but low CTR (title/meta rewrite candidates).
- Top landing pages with traffic but low lead conversion (CRO candidates).

## 5) Notes for safe operations

- No design/layout changes were introduced.
- No external dependencies were added.
- Changes are static-site compatible (GitHub Pages safe).
- Event naming follows GA4-friendly snake_case for consistency.
