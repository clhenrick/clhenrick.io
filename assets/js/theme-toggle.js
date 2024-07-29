// TODO: consider moving homepage specific JS to separate script?
/** handles the logic for the theme toggle radio group in themeToggle.njk */
(() => {
  const documentEl = document.documentElement;
  const themePicker = document.querySelector("#site-theme-toggle");
  const bannerPicture = document.querySelector("#home-banner-picture");
  const darkSources = bannerPicture?.querySelectorAll(
    "source.oakland-map-dark"
  );
  const lightSources = bannerPicture?.querySelectorAll(
    "source.oakland-map-light"
  );
  const mediaPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const mediaPrefersLight = window.matchMedia("(prefers-color-scheme: light)");

  document.addEventListener("DOMContentLoaded", initThemeToggle);

  // handles an edge case where a theme override is selected that matches prefers-color-scheme and then the user updates prefers-color-scheme to the opposite theme. This currently only affects the home page banner image
  mediaPrefersDark.addEventListener("change", handleMediaQueryChange);
  mediaPrefersLight.addEventListener("change", handleMediaQueryChange);

  function initThemeToggle() {
    // NOTE: theme is initially set on the <html> element in a separate script in the <head> to avoid a flash of un-themed content. See head.njk
    const theme = localStorage.getItem("theme") || "auto";
    themePicker.addEventListener("change", handleThemePickerChange);
    setInitialTheme(theme);
    maybeUpdateHomeBannerImage(theme);
  }

  function handleMediaQueryChange() {
    const theme = documentEl.dataset.theme;
    maybeUpdateHomeBannerImage(theme);
  }

  /** handles setting the initial theme radio buttons checked state and home page banner image media override */
  function setInitialTheme(theme) {
    themePicker
      .querySelector(`input[value="${theme}"]`)
      .setAttribute("checked", "");
  }

  /** handles responding to a theme radio button change event */
  function handleThemePickerChange(event) {
    const theme = event.target.value;
    // prevent outline from showing on theme-toggle legend
    event.stopPropagation();
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
      (theme === "dark" && mediaPrefersLight.matches);
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
