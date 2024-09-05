// TODO: "In order to submit via AJAX, you need to set a custom key or reCAPTCHA must be disabled in this form's settings page."
/** script for custom form validation in the /contact/ page */
(() => {
  /** @type { HTMLFormElement} */
  const form = document.querySelector("form[action*='formspree.io']");

  /** @type { HTMLDivElement} */
  const formStatus = document.querySelector("#form-status");

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

  /** @param {SubmitEvent} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("submit!");

    const data = new FormData(event.target);

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // form submit success
          formStatus.innerText = "Thanks for your submission!";
          form.reset();
          // TODO: move focus to #form-status
        } else {
          // TODO: handle errors
          formStatus.innerText = "There was an error";
          // TODO: move focus to #form-status
        }
      })
      .catch((error) => {
        // TODO: handle errors
        formStatus.innerText = "There was an error";
        // TODO: move focus to #form-status
      });
  }

  form.addEventListener("submit", handleFormSubmit);
})();
