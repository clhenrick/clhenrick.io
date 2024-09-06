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

  const emailRegEx = /^\S+@\S+\.\S+$/;

  // prefer `aria-required` over `required` for enhanced accessibility and to prevent the browser's default form validation
  [inputName, inputEmail, textAreaMessage].forEach((element) => {
    element.removeAttribute("required");
    element.setAttribute("aria-required", true);
    element.setAttribute("aria-invalid", "false");
  });

  form.addEventListener("submit", handleFormSubmit);

  /**
   * shows an error message for a form field and relates it to the field using aria-describedby
   * @param {HTMLInputElement | HTMLTextAreaElement} formField
   * @param {HTMLElement} msgContainer
   * @param {string} errorMsg
   */
  function showErrorMessage(formField, msgContainer, errorMsg) {
    msgContainer.innerText = errorMsg;
    msgContainer.removeAttribute("hidden");
    formField.setAttribute("aria-invalid", "true");
    formField.setAttribute("aria-describedby", msgContainer.getAttribute("id"));
  }

  /**
   * hides an error message and removes the aria-describedby on the field
   * @param {HTMLInputElement | HTMLTextAreaElement} formField
   * @param {HTMLElement} msgContainer
   */
  function hideErrorMessage(formField, msgContainer) {
    formField.removeAttribute("aria-invalid");
    formField.removeAttribute("aria-describedby");
    msgContainer.innerText = "";
    msgContainer.setAttribute("hidden", "");
  }

  /**
   * @param {FormData} data
   * @returns {boolean}
   * */
  function validateForm(data) {
    let isValid = true;

    const name = data.get("name");
    const message = data.get("message");
    const email = data.get("_replyto");

    if (!name) {
      isValid = false;
      showErrorMessage(inputName, errorMsgName, "Please provide your name.");
    } else {
      hideErrorMessage(inputName, errorMsgName);
    }

    if (!message) {
      isValid = false;
      showErrorMessage(
        textAreaMessage,
        errorMsgNote,
        "Please tell me what you're writing me about."
      );
    } else {
      hideErrorMessage(textAreaMessage, errorMsgNote);
    }

    if (!email) {
      isValid = false;
      showErrorMessage(
        inputEmail,
        errorMsgEmail,
        "Please provide a valid email address."
      );
    } else if (email && !emailRegEx.test(email)) {
      isValid = false;
      showErrorMessage(
        inputEmail,
        errorMsgEmail,
        "Is your email spelled correctly?"
      );
    } else {
      hideErrorMessage(inputEmail, errorMsgEmail);
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

    return;

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
