(() => {
  const documentEl = document.documentElement;
  const fieldset = document.querySelector("fieldset.color-scheme-toggle");
  const radios = Array.from(fieldset.querySelectorAll('input[type="radio"]'));

  radios.forEach(function(radio) {
    radio.addEventListener("change", handleChange);
  });

  // TODO: set from localStorage
  radios[radios.length - 1].setAttribute("checked", true);

  function handleChange(event) {
    const theme = event.target.value;
    if (theme === "auto") {
      delete documentEl.dataset.theme;
    } else {
      documentEl.dataset.theme = theme;
    }
  }
})();
