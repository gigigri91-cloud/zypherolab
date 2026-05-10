(function () {
  var config = window.ZypheroConfig || {};
  var measurementId = config.ga4MeasurementId;
  var consentKey = "zyphero_analytics_consent";
  var analyticsLoaded = false;

  function getConsentState() {
    try {
      return window.localStorage.getItem(consentKey);
    } catch (error) {
      return null;
    }
  }

  function isConsentGranted() {
    return getConsentState() === "granted";
  }

  function isConsentDenied() {
    return getConsentState() === "denied";
  }

  function initConsentHelpers() {
    window.ZypheroAnalyticsConsent = {
      grant: function () {
        try {
          window.localStorage.setItem(consentKey, "granted");
        } catch (error) {
          return;
        }
        loadAnalytics();
      },
      deny: function () {
        try {
          window.localStorage.setItem(consentKey, "denied");
        } catch (error) {
          return;
        }
      },
      status: function () {
        return getConsentState() || "unknown";
      }
    };
  }

  function loadAnalytics() {
    if (analyticsLoaded || !measurementId || !isConsentGranted() || isConsentDenied()) {
      return;
    }
    analyticsLoaded = true;

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: window.location.pathname + window.location.search + window.location.hash,
      page_title: document.title
    });
  }

  initConsentHelpers();
  if (isConsentGranted()) {
    loadAnalytics();
  }
})();
