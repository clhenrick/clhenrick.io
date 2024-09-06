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

  /** @type { HTMLParagraphElement } */
  const errorMsgName = document.querySelector("#full-name-error-msg");

  /** @type { HTMLParagraphElement} */
  const errorMsgEmail = document.querySelector("#email-address-error-msg");

  /** @type { HTMLParagraphElement } */
  const errorMsgNote = document.querySelector("#note-error-msg");

  // prefer `aria-required` over `required` for enhanced accessibility and custom form validation
  [inputName, inputEmail, textAreaMessage].forEach((element) => {
    element.removeAttribute("required");
    element.setAttribute("aria-required", true);
    element.setAttribute("aria-invalid", "false");
  });

  form.addEventListener("submit", handleFormSubmit);

  /**
   * @param {FormData} data
   * @returns {boolean}
   * */
  function validateForm(data) {
    let isValid = true;

    if (!data.name) {
      // require name
      isValid = false;
      errorMsgName.innerText = "Please provide your name.";
      errorMsgName.removeAttribute("hidden");
      inputName.setAttribute(
        "aria-describedby",
        errorMsgName.getAttribute("id")
      );
    }

    if (!data.message) {
      // require message
      isValid = false;
      errorMsgNote.innerText = "Please tell me what you're writing me about.";
      errorMsgNote.removeAttribute("hidden");
      textAreaMessage.setAttribute(
        "aria-describedby",
        errorMsgNote.getAttribute("id")
      );
    }

    if (!data["_replyto"]) {
      // require email
      isValid = false;
      errorMsgEmail.innerText = "Please provide a valid email address.";
      errorMsgEmail.removeAttribute("hidden");
      inputEmail.setAttribute(
        "aria-describedby",
        errorMsgEmail.getAttribute("id")
      );
    }

    return isValid;
  }

  /** @param {SubmitEvent} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    console.log("submit!");

    const data = new FormData(event.target);
    console.log(data);

    const isValid = validateForm(data);
    console.log(isValid);

    if (!isValid) {
      return;
    }

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
})();
