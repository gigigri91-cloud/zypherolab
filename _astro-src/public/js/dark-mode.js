(function () {
  const THEME_KEY = "theme";
  const toggles = Array.from(document.querySelectorAll(".dark-mode-toggle"));
  const icons = Array.from(document.querySelectorAll(".dark-mode-toggle-icon"));
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  if (!toggles.length) {
    return;
  }

  function isDark() {
    return document.body.classList.contains("dark-mode");
  }

  function updateIcons() {
    const icon = isDark() ? "☀️" : "🌙";
    icons.forEach((el) => {
      el.textContent = icon;
    });
  }

  function applyTheme(mode) {
    const enableDark = mode === "dark";
    document.body.classList.toggle("dark-mode", enableDark);
    toggles.forEach((toggle) => {
      toggle.setAttribute("aria-pressed", enableDark ? "true" : "false");
    });
    updateIcons();
  }

  function setTheme(mode) {
    applyTheme(mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      /* ignore storage failures */
    }
  }

  function preferredTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      /* ignore */
    }
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return media.matches ? "dark" : "light";
  }

  applyTheme(preferredTheme());

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      setTheme(isDark() ? "light" : "dark");
    });
  });

  media.addEventListener("change", (event) => {
    let saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch {
      /* ignore */
    }
    if (!saved) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });
})();
