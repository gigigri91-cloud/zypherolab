const STYLE_DEFAULT = "modern";
const PREVIEW_CARD_SUFFIXES = ["a", "b", "c"];
const PREVIEW_DEVICE_CLASS = {
  desktop: ".preview-laptop",
  mobile: ".preview-mobile"
};
const FORM_FIELDS = ["name", "email", "business", "goal"];
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PREVIEW_EXPORT_SELECTOR = [
  ".preview-browser",
  ".preview-site-nav",
  ".preview-hero",
  ".preview-cards",
  ".preview-card",
  ".preview-cta",
  ".preview-site-body",
  ".preview-contact",
  ".preview-about",
  ".preview-services-section",
  ".preview-footer"
];

function trackEvent(eventName, params) {
  const analytics = window.ZypheroAnalytics;
  if (analytics && typeof analytics.track === "function") {
    analytics.track(eventName, params);
  }
}

function tt(path) {
  const i = window.ZypheroI18n;
  if (i && typeof i.t === "function") {
    return i.t(path);
  }
  return path;
}

function getSelectedStyle() {
  const active = document.querySelector(".style-options button.active");
  return active && active.dataset.style ? active.dataset.style : STYLE_DEFAULT;
}

function ctaLabelForType(type) {
  const key = `preview.cta.${type}`;
  const label = tt(key);
  return label === key ? tt("preview.cta.default") : label;
}

function taglineForType(type) {
  const key = `preview.tagline.${type}`;
  const text = tt(key);
  return text === key ? tt("preview.tagline.default") : text;
}

function serviceCardLabels(type) {
  const keys = PREVIEW_CARD_SUFFIXES.map((s) => `preview.cards.${type}.${s}`);
  const fallbackKeys = PREVIEW_CARD_SUFFIXES.map((s) => `preview.cards.default.${s}`);
  return keys.map((key, i) => {
    const label = tt(key);
    if (label !== key) {
      return label;
    }
    return tt(fallbackKeys[i]);
  });
}

function typeLabelForPill(type) {
  const key = `gen.opt.${type}`;
  const label = tt(key);
  return label === key ? type : label;
}

function getSimulatorInputs() {
  return {
    name: document.getElementById("siteName"),
    type: document.getElementById("siteType"),
    description: document.getElementById("siteDescription"),
    address: document.getElementById("siteAddress"),
    phone: document.getElementById("sitePhone"),
    services: document.getElementById("siteServices"),
    color: document.getElementById("siteColor")
  };
}

function getPreviewRoots() {
  return {
    desktop: document.getElementById("previewBox"),
    mobile: document.getElementById("previewBoxMobile")
  };
}

function createPreviewCard(values) {
  const { name, type, style, hue, description, address, phone, services } = values;
  const wrap = document.createElement("div");
  wrap.className = `preview-browser preview-style-${style}`;
  wrap.style.setProperty("--preview-hue", String(hue));

  const nav = document.createElement("div");
  nav.className = "preview-site-nav";
  const brand = document.createElement("span");
  brand.textContent = name.slice(0, 18) + (name.length > 18 ? "…" : "");
  const pill = document.createElement("span");
  pill.textContent = typeLabelForPill(type);
  nav.append(brand, pill);

  const hero = document.createElement("div");
  hero.className = "preview-hero";

  const title = document.createElement("h3");
  title.textContent = name;
  const sub = document.createElement("p");
  sub.textContent = taglineForType(type);
  hero.append(title, sub);

  if (description) {
    const desc = document.createElement("p");
    desc.className = "preview-hero-description";
    desc.textContent = description;
    hero.appendChild(desc);
  }

  const cta = document.createElement("a");
  cta.className = "preview-cta";
  cta.href = "#contact";
  cta.textContent = ctaLabelForType(type);
  hero.appendChild(cta);

  const cardsRow = document.createElement("div");
  cardsRow.className = "preview-cards";
  serviceCardLabels(type).forEach((text) => {
    const card = document.createElement("div");
    card.className = "preview-card";
    card.textContent = text;
    cardsRow.appendChild(card);
  });

  const body = document.createElement("div");
  body.className = "preview-site-body";
  const strong = document.createElement("strong");
  strong.textContent = tt("preview.whyTitle");
  const ul = document.createElement("ul");
  ["preview.li1", "preview.li2", "preview.li3"].forEach((key) => {
    const li = document.createElement("li");
    li.textContent = tt(key);
    ul.appendChild(li);
  });
  body.append(strong, ul);

  const serviceSection = document.createElement("div");
  serviceSection.className = "preview-services-section";
  const serviceTitle = document.createElement("strong");
  serviceTitle.textContent = tt("preview.section.services");
  const serviceLine = document.createElement("p");
  serviceLine.textContent = services || serviceCardLabels(type).join(" • ");
  serviceSection.append(serviceTitle, serviceLine);

  const aboutSection = document.createElement("div");
  aboutSection.className = "preview-about";
  const aboutTitle = document.createElement("strong");
  aboutTitle.textContent = tt("preview.section.about");
  const aboutLine = document.createElement("p");
  aboutLine.textContent = description || taglineForType(type);
  aboutSection.append(aboutTitle, aboutLine);

  const contactSection = document.createElement("div");
  contactSection.className = "preview-contact";
  const contactTitle = document.createElement("strong");
  contactTitle.textContent = tt("preview.section.contact");
  const contactInfo = document.createElement("p");
  const contactParts = [address, phone].filter(Boolean);
  contactInfo.textContent = contactParts.length
    ? contactParts.join(" • ")
    : tt("preview.section.contactPlaceholder");
  contactSection.append(contactTitle, contactInfo);

  const footer = document.createElement("div");
  footer.className = "preview-footer";
  footer.textContent = `${name} • ${typeLabelForPill(type)}`;

  wrap.append(nav, hero, cardsRow, body, serviceSection, aboutSection, contactSection, footer);
  return wrap;
}

function renderPlaceholder(root) {
  root.innerHTML = "";
  const message = document.createElement("p");
  message.className = "form-status";
  message.style.margin = "auto";
  message.textContent = tt("gen.errorName");
  root.appendChild(message);
}

function generateSite() {
  const inputs = getSimulatorInputs();
  const roots = getPreviewRoots();
  if (!(inputs.name && inputs.type && roots.desktop && roots.mobile)) {
    return false;
  }

  const cleanName = inputs.name.value.trim();
  if (!cleanName) {
    renderPlaceholder(roots.desktop);
    renderPlaceholder(roots.mobile);
    return false;
  }

  const previewNode = createPreviewCard({
    name: cleanName,
    type: inputs.type.value,
    style: getSelectedStyle(),
    hue: inputs.color ? Number(inputs.color.value) || 220 : 220,
    description: inputs.description ? inputs.description.value.trim() : "",
    address: inputs.address ? inputs.address.value.trim() : "",
    phone: inputs.phone ? inputs.phone.value.trim() : "",
    services: inputs.services ? inputs.services.value.trim() : ""
  });

  roots.desktop.innerHTML = "";
  roots.desktop.appendChild(previewNode);
  roots.mobile.innerHTML = "";
  roots.mobile.appendChild(previewNode.cloneNode(true));
  return true;
}

function setupStylePills() {
  const pills = document.querySelectorAll(".style-options button");
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const nameInput = document.getElementById("siteName");
      if (nameInput && nameInput.value.trim()) {
        generateSite();
      }
    });
  });
}

function setupColorSlider() {
  const slider = document.getElementById("siteColor");
  const label = document.getElementById("siteColorValue");
  if (!(slider && label)) {
    return;
  }

  const sync = () => {
    label.textContent = `${slider.value}°`;
  };

  slider.addEventListener("input", () => {
    sync();
    const nameInput = document.getElementById("siteName");
    if (nameInput && nameInput.value.trim()) {
      generateSite();
    }
  });
  sync();
}

function setupPreviewToggle() {
  const toggles = document.querySelectorAll(".preview-toggle");
  if (!toggles.length) {
    return;
  }

  const setActive = (mode) => {
    toggles.forEach((btn) => {
      const active = btn.dataset.preview === mode;
      btn.classList.toggle("preview-toggle--active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    Object.entries(PREVIEW_DEVICE_CLASS).forEach(([key, selector]) => {
      const node = document.querySelector(selector);
      if (node) {
        node.classList.toggle("preview-device--active", key === mode);
      }
    });
  };

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.preview === "mobile" ? "mobile" : "desktop";
      setActive(mode);
    });
  });

  setActive("desktop");
}

function setupRealTimeUpdates() {
  const nameInput = document.getElementById("siteName");
  const typeInput = document.getElementById("siteType");
  const descriptionInput = document.getElementById("siteDescription");
  const addressInput = document.getElementById("siteAddress");
  const phoneInput = document.getElementById("sitePhone");
  const servicesInput = document.getElementById("siteServices");
  const colorInput = document.getElementById("siteColor");

  const onInputChange = () => {
    if (nameInput && nameInput.value.trim()) {
      generateSite();
    }
  };

  [nameInput, descriptionInput, addressInput, phoneInput, servicesInput, colorInput].forEach((el) => {
    if (el) {
      el.addEventListener("input", onInputChange);
    }
  });

  if (typeInput) {
    typeInput.addEventListener("change", onInputChange);
  }
}

function extractPreviewCss() {
  const rules = [];
  const selectorsRegex = new RegExp(PREVIEW_EXPORT_SELECTOR.map((s) => s.replace(".", "\\.")).join("|"));
  const fallbackCss = `
body{font-family:Inter,Arial,sans-serif;background:#0b1020;color:#e2e8f0;padding:24px}
.preview-browser{max-width:760px;margin:0 auto;border-radius:12px;overflow:hidden}
`;

  Array.from(document.styleSheets).forEach((sheet) => {
    let cssRules;
    try {
      cssRules = sheet.cssRules;
    } catch {
      return;
    }
    if (!cssRules) {
      return;
    }
    Array.from(cssRules).forEach((rule) => {
      if (!rule.cssText) {
        return;
      }
      if (rule.selectorText && selectorsRegex.test(rule.selectorText)) {
        rules.push(rule.cssText);
      } else if (rule.cssText.includes("@font-face")) {
        rules.push(rule.cssText);
      }
    });
  });

  return `${fallbackCss}\n${rules.join("\n")}`;
}

function downloadHtml(filename, html) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function setupExportButton() {
  const exportBtn = document.getElementById("exportPreviewBtn");
  const formStatus = document.getElementById("formStatus");
  if (!exportBtn) {
    return;
  }

  exportBtn.addEventListener("click", () => {
    const root = document.getElementById("previewBox");
    const preview = root ? root.querySelector(".preview-browser") : null;
    if (!preview) {
      if (formStatus) {
        formStatus.textContent = tt("gen.errorNoPreview");
      }
      return;
    }

    const css = extractPreviewCss();
    const html = `<!doctype html>
<html lang="${document.documentElement.lang || "ro"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${preview.querySelector(".preview-site-nav span")?.textContent || "Preview"}</title>
  <style>${css}</style>
</head>
<body>
${preview.outerHTML}
</body>
</html>`;

    const siteName = document.getElementById("siteName");
    const base = siteName && siteName.value.trim() ? siteName.value.trim() : "preview";
    const safeName = base.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
    downloadHtml(`${safeName || "preview"}-site.html`, html);
    if (formStatus) {
      formStatus.textContent = "";
    }
  });
}

function setupRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function setupNavHighlight() {
  const links = document.querySelectorAll(".nav-main a[data-nav-target]");
  if (!links.length || !("IntersectionObserver" in window)) {
    return;
  }

  const sections = [
    document.getElementById("home"),
    document.getElementById("services"),
    document.getElementById("results"),
    document.getElementById("simulator")
  ].filter(Boolean);

  const idToKey = {
    home: "home",
    services: "services",
    results: "results",
    simulator: "simulator"
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) {
        return;
      }
      visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const key = idToKey[visible[0].target.id];
      if (!key) {
        return;
      }
      links.forEach((a) => {
        a.classList.toggle("is-active", a.dataset.navTarget === key);
      });
    },
    { threshold: [0.12, 0.22, 0.35, 0.55, 0.75, 1], rootMargin: "-18% 0px -32% 0px" }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function ensureFieldErrorNode(input) {
  const errorId = `${input.id}Error`;
  let node = document.getElementById(errorId);
  if (!node) {
    node = document.createElement("p");
    node.id = errorId;
    node.className = "form-status";
    node.style.textAlign = "left";
    node.style.marginTop = "0.25rem";
    input.insertAdjacentElement("afterend", node);
  }
  const describedBy = new Set((input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean));
  describedBy.add(errorId);
  input.setAttribute("aria-describedby", Array.from(describedBy).join(" "));
  return node;
}

function clearFieldError(input) {
  const error = document.getElementById(`${input.id}Error`);
  input.removeAttribute("aria-invalid");
  if (error) {
    error.textContent = "";
  }
}

function setFieldError(input, message) {
  const error = ensureFieldErrorNode(input);
  input.setAttribute("aria-invalid", "true");
  error.textContent = message;
}

function validateLeadForm(form) {
  let ok = true;
  FORM_FIELDS.forEach((fieldName) => {
    const input = form.elements[fieldName];
    if (!(input instanceof HTMLElement)) {
      return;
    }
    clearFieldError(input);
    const value = String(form.elements[fieldName].value || "").trim();
    if (!value) {
      setFieldError(input, tt("form.errorRequired"));
      ok = false;
      return;
    }
    if (fieldName === "email" && !EMAIL_REGEX.test(value)) {
      setFieldError(input, tt("form.errorEmail"));
      ok = false;
    }
  });
  return ok;
}

function parseFormspreeErrors(payload) {
  if (!payload || !Array.isArray(payload.errors)) {
    return [];
  }
  return payload.errors;
}

function setupLeadForm() {
  const form = document.getElementById("leadForm");
  const formStatus = document.getElementById("formStatus");
  if (!(form && formStatus)) {
    return;
  }

  FORM_FIELDS.forEach((fieldName) => {
    const input = form.elements[fieldName];
    if (input && typeof input.addEventListener === "function") {
      input.addEventListener("input", () => clearFieldError(input));
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.textContent = "";

    if (!validateLeadForm(form)) {
      formStatus.textContent = tt("form.error");
      return;
    }

    const action = form.getAttribute("action");
    if (!action) {
      formStatus.textContent = tt("form.error");
      return;
    }

    const formData = new FormData(form);
    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        form.reset();
        formStatus.textContent = tt("form.success");
        trackEvent("contact_form_submit", {
          form_id: "leadForm",
          method: "formspree",
          page_lang: document.documentElement.lang || "ro"
        });
        return;
      }

      const payload = await response.json().catch(() => null);
      const errors = parseFormspreeErrors(payload);
      let hasMappedError = false;
      errors.forEach((error) => {
        if (!Array.isArray(error.field) || !error.field.length) {
          return;
        }
        const fieldName = error.field[0];
        if (!FORM_FIELDS.includes(fieldName)) {
          return;
        }
        const input = form.elements[fieldName];
        if (input) {
          setFieldError(input, error.message || tt("form.error"));
          hasMappedError = true;
        }
      });
      formStatus.textContent = hasMappedError ? tt("form.error") : tt("form.error");
    } catch {
      formStatus.textContent = tt("form.error");
    }
  });
}

function setupConversionTracking() {
  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("a, button") : null;
    if (!trigger) {
      return;
    }

    if (trigger.matches("a[data-wa-link='true']")) {
      trackEvent("whatsapp_click", {
        source: trigger.className || "link",
        href: trigger.getAttribute("href") || "",
        page_lang: document.documentElement.lang || "ro"
      });
    }

    if (trigger.matches(".hero-actions a.btn:not(.btn-secondary)")) {
      trackEvent("primary_cta_click", {
        cta_target: trigger.getAttribute("href") || "",
        section: "hero",
        page_lang: document.documentElement.lang || "ro"
      });
    }

    if (trigger.matches("#pricing .btn")) {
      trackEvent("pricing_cta_click", {
        cta_target: trigger.getAttribute("href") || "",
        section: "pricing",
        page_lang: document.documentElement.lang || "ro"
      });
    }
  });
}

function setupLangRefreshPreview() {
  document.addEventListener("zyphero:langchange", () => {
    const previewBox = document.getElementById("previewBox");
    if (previewBox && previewBox.querySelector(".preview-browser")) {
      generateSite();
    }
  });
}

function setupFloatingActionGuards() {
  const floatingActions = Array.from(document.querySelectorAll(".whatsapp, .chat-ai"));
  const contactSection = document.getElementById("contact");
  const footer = document.querySelector("footer");
  const watchTargets = [contactSection, footer].filter(Boolean);
  if (!floatingActions.length || !watchTargets.length) {
    return;
  }

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
  const visibilityState = new Map(watchTargets.map((target) => [target, false]));

  const syncFloatingState = () => {
    if (!isMobile()) {
      floatingActions.forEach((node) => node.classList.remove("is-hidden"));
      return;
    }
    const shouldHide = Array.from(visibilityState.values()).some(Boolean);
    floatingActions.forEach((node) => node.classList.toggle("is-hidden", shouldHide));
  };

  if (!("IntersectionObserver" in window)) {
    window.addEventListener("resize", syncFloatingState);
    syncFloatingState();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        visibilityState.set(entry.target, entry.isIntersecting);
      });
      syncFloatingState();
    },
    { threshold: 0.08 }
  );

  watchTargets.forEach((target) => observer.observe(target));
  window.addEventListener("resize", syncFloatingState);
  syncFloatingState();
}

function setupSimulator(generatePreviewButton) {
  setupStylePills();
  setupColorSlider();
  setupPreviewToggle();
  setupRealTimeUpdates();
  setupExportButton();

  if (generatePreviewButton) {
    generatePreviewButton.addEventListener("click", generateSite);
  }
}

function initSimulatorWhenVisible() {
  const simulatorSection = document.getElementById("simulator");
  const generatePreviewButton = document.getElementById("generatePreviewBtn");
  if (!(simulatorSection && generatePreviewButton)) {
    return;
  }

  let initialized = false;
  const initOnce = () => {
    if (initialized) {
      return;
    }
    initialized = true;
    setupSimulator(generatePreviewButton);
  };

  if (!("IntersectionObserver" in window)) {
    initOnce();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initOnce();
          currentObserver.disconnect();
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "180px 0px"
    }
  );

  observer.observe(simulatorSection);
  ["focusin", "pointerdown", "touchstart"].forEach((eventName) => {
    simulatorSection.addEventListener(eventName, initOnce, { once: true, passive: true });
  });
}

function boot() {
  setupRevealOnScroll();
  setupLeadForm();
  setupConversionTracking();
  setupNavHighlight();
  setupLangRefreshPreview();
  setupFloatingActionGuards();
  initSimulatorWhenVisible();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
