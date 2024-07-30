(() => {
  const disclosures = document.querySelectorAll("details");
  // NOTE: 500px is about when the filter buttons wrap to three lines and pushes the project cards further down the page
  const mediaQueryNarrowViewports = window.matchMedia("(max-width: 500px)");
  // collapse disclosure elements on narrow viewports
  if (mediaQueryNarrowViewports.matches && disclosures.length) {
    disclosures.forEach((disclosure) => {
      disclosure.removeAttribute("open");
    });
  }
})();
