/**
 * Site-wide constants (no build step). WhatsApp: digits only, no + prefix.
 * When changing the number, also update: JSON-LD telephone (index.html, en/index.html),
 * <a class="whatsapp" href="https://wa.me/...">, and llms.txt if the number is listed.
 */
window.ZypheroConfig = {
  waPhoneE164: "40747821384",
  ga4MeasurementId: "G-JRPX0T1X3S"
};

window.dataLayer = window.dataLayer || [];

window.ZypheroAnalytics = {
  track(eventName, eventParams) {
    if (!eventName) {
      return;
    }

    const params = eventParams && typeof eventParams === "object" ? eventParams : {};
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params);
      return;
    }

    window.dataLayer.push(["event", eventName, params]);
  }
};
