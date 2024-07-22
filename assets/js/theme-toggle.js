(() => {
  const documentEl = document.documentElement;
  const themePicker = document.querySelector("fieldset#site-theme-toggle");

  document.addEventListener("DOMContentLoaded", initThemeToggle);

  function initThemeToggle() {
    themePicker.addEventListener("change", handleChange);
    setInitialTheme();
  }

  function setInitialTheme() {
    const theme = localStorage.getItem("theme") || "auto";
    // NOTE: theme is set on the <html> element in a separate script in the <head> to avoid a flash of un-themed content, see head.njk
    themePicker.querySelector(`input[value="${theme}"]`).setAttribute("checked", "");
  }

  function handleChange(event) {
    const theme = event.target.value;
    if (theme === "auto") {
      delete documentEl.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      documentEl.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
  }
})();
