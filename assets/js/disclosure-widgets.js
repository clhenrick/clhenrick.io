(() => {
  const disclosures = document.querySelectorAll("details");
  // NOTE: matches media query breakpoint in primary-navigation
  const mediaQueryNarrowViewports = window.matchMedia("(max-width: 747px");
  // collapse disclosure elements on narrow viewports
  if (mediaQueryNarrowViewports.matches && disclosures.length) {
    disclosures.forEach((disclosure) => {
      disclosure.removeAttribute("open");
    });
  }
})();
