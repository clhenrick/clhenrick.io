/** script for progressively enhancing the /contact/ page form using custom form validation */
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

  // NOTE: matches <textarea> minlength attribute in /contact/index.njk
  const minMessageLengthChars = 120;

  init();

  function init() {
    // disable browser built-in form control validation messages
    form.setAttribute("novalidate", "");

    // prefer `aria-required` over `required` for enhanced accessibility and to prevent the browser's default form validation
    [inputName, inputEmail, textAreaMessage].forEach((element) => {
      element.removeAttribute("required");
      element.setAttribute("aria-required", true);
      element.setAttribute("aria-invalid", "false");
    });

    form.addEventListener("submit", handleFormSubmit);
  }

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

    const nameValue = data.get("name");
    const messageValue = data.get("message");
    const emailValue = data.get("_replyto");

    if (!nameValue) {
      isValid = false;
      showErrorMessage(inputName, errorMsgName, "Please provide your name.");
    } else {
      hideErrorMessage(inputName, errorMsgName);
    }

    if (!messageValue) {
      isValid = false;
      showErrorMessage(
        textAreaMessage,
        errorMsgNote,
        "Please tell me what you're writing me about."
      );
    } else if (
      textAreaMessage.validity.tooShort ||
      messageValue < minMessageLengthChars
    ) {
      isValid = false;
      showErrorMessage(
        textAreaMessage,
        errorMsgNote,
        "That's an awfully short message, you better not be spamming me!"
      );
    } else {
      hideErrorMessage(textAreaMessage, errorMsgNote);
    }

    if (!emailValue) {
      isValid = false;
      showErrorMessage(
        inputEmail,
        errorMsgEmail,
        "Please provide a valid email address."
      );
    } else if (!emailRegEx.test(emailValue)) {
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

  function handleInvalidFormState() {
    const invalidFormFields = document.querySelectorAll(
      "[aria-invalid='true']"
    );
    if (invalidFormFields.length) {
      invalidFormFields[0].focus();
    } else {
      formStatus.innerText =
        "Something went wrong when submitting the form. Please try submitting the form again or alternatively you may send me an email. Thanks!";
      formStatus.classList.add("error");
      formStatus.removeAttribute("hidden");
      formStatus.focus();
    }
  }

  function handleFormSubmitSuccess() {
    formStatus.classList.add("success");
    formStatus.removeAttribute("hidden");
    formStatus.innerText =
      "Thanks for reaching out! I'll get back to you as soon as I can.";
    formStatus.focus();
    form.reset();
  }

  function clearFormStatus() {
    formStatus.classList.value = "";
    formStatus.setAttribute("hidden", "");
  }

  /** @param {SubmitEvent} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    clearFormStatus();
    const data = new FormData(event.target);
    const isValid = validateForm(data);

    if (!isValid) {
      handleInvalidFormState();
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
          handleFormSubmitSuccess();
        } else {
          handleInvalidFormState();
        }
      })
      .catch(() => {
        handleInvalidFormState();
      });
  }
})();
