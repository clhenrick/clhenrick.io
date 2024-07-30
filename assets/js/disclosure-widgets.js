(() => {
  const disclosures = document.querySelectorAll("details");
  const mediaQueryNarrowViewports = window.matchMedia("(max-width: 400px)");
  // collapse disclosure elements on narrow viewports
  if (mediaQueryNarrowViewports.matches && disclosures.length) {
    disclosures.forEach((disclosure) => {
      disclosure.removeAttribute("open");
    });
  }
})();
