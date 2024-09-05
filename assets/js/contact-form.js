(() => {
  /** @type { HTMLFormElement} */
  const form = document.querySelector("form[action*='formspree.io']");
  /** @type { HTMLInputElement} */
  const inputName = document.querySelector("#full-name");
  /** @type { HTMLInputElement} */
  const inputEmail = document.querySelector("#email-address");
  /** @type { HTMLTextAreaElement} */
  const textAreaMessage = document.querySelector("#message");

  // prefer `aria-required` over `required` for enhanced accessibility and custom form validation
  [inputName, inputEmail, textAreaMessage].forEach((element) => {
    element.removeAttribute("required");
    element.setAttribute("aria-required", true);
  });

  /** @param {Event} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("submit!");

    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then((response) => {
      if (response.ok) {
        // form submit success
      } else {
        // TODO: handle errors
      }
    })
    .catch((error) => {
      // TODO: handle errors
    });
  }

  form.addEventListener("submit", handleFormSubmit);
})();
