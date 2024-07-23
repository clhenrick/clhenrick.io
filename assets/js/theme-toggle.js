// TODO: respond to matchMedia change for prefers-color-scheme dark & light
// TODO: consider moving homepage specific JS to separate script

/** handles the logic for the theme toggle radio group in themeToggle.njk */
(() => {
  const documentEl = document.documentElement;
  const themePicker = document.querySelector("fieldset#site-theme-toggle");
  const bannerPicture = document.querySelector("#home-banner-picture");
  const darkSources = document.querySelectorAll("#home-banner-picture source.oakland-map-dark");
  const lightSources = document.querySelectorAll("#home-banner-picture source.oakland-map-light");
  const mediaPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  document.addEventListener("DOMContentLoaded", initThemeToggle);

  function initThemeToggle() {
    themePicker.addEventListener("change", handleChange);
    setInitialTheme();
  }

  /** handles setting the initial theme radio buttons checked state and home page banner image media override */
  function setInitialTheme() {
    const theme = localStorage.getItem("theme") || "auto";
    // NOTE: theme is set on the <html> element in a separate script in the <head> to avoid a flash of un-themed content, see head.njk
    themePicker
      .querySelector(`input[value="${theme}"]`)
      .setAttribute("checked", "");
    maybeUpdateHomeBannerImage(theme);
  }

  /** handles responding to a theme radio button change event */
  function handleChange(event) {
    const theme = event.target.value;
    if (theme === "auto") {
      delete documentEl.dataset.theme;
      localStorage.removeItem("theme");
    } else {
      documentEl.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
    maybeUpdateHomeBannerImage(theme);
  }

  /** handles updating the home page's banner image for theme overrides  */
  function maybeUpdateHomeBannerImage(theme) {
    if (!bannerPicture) return;
    const shouldSwitchSourceMedia =
      (theme === "light" && mediaPrefersDark.matches) ||
      (theme === "dark" && !mediaPrefersDark.matches);
    if (shouldSwitchSourceMedia) {
      flipHomepageBannerSourceMedia();
    } else {
      resetHomepageBannerSourceMedia();
    }
  }

  /** switches the media queries on the picture's source elements so that they display correctly in a theme override */
  function flipHomepageBannerSourceMedia() {
    lightSources.forEach((source) => {
      source.setAttribute("media", "(prefers-color-scheme: dark)");
    });
    darkSources.forEach((source) => {
      source.setAttribute("media", "(prefers-color-scheme: light)");
    });
  }

  /** resets the media queries on the picture's source elements so that they display correctly when not overriding the theme */
  function resetHomepageBannerSourceMedia() {
    darkSources.forEach((source) => {
      source.setAttribute("media", "(prefers-color-scheme: dark)");
    });
    lightSources.forEach((source) => {
      source.setAttribute("media", "(prefers-color-scheme: light)");
    });
  }
})();
