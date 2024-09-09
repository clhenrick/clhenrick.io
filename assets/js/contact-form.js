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

  // fairly non-restrictive regex for validating email address
  const emailRegEx = /^\S+@\S+\.\S+$/;

  // NOTE: matches <textarea> minlength attribute in /contact/index.njk
  const MIN_MSG_LENGTH_CHARS = 120;

  init();

  function init() {
    // disable browser built-in form control validation messages
    form.setAttribute("novalidate", "");

    // prefer `aria-required` over `required` for improved accessibility UX. With `required` screen readers may announce an input as being invalid when first focused. Using `aria-required` avoids this.
    [inputName, inputEmail, textAreaMessage].forEach((element) => {
      element.removeAttribute("required");
      element.setAttribute("aria-required", true);
      element.setAttribute("aria-invalid", "false");
    });

    form.addEventListener("submit", handleFormSubmit);

    form.addEventListener("blur", handleFormBlur, true);
  }

  /**
   * shows an error message for a form field and relates it to the field using aria-describedby
   * @param {HTMLInputElement | HTMLTextAreaElement} formField
   * @param {string} errorMsg
   */
  function showErrorMessage(formField, errorMsg) {
    const errorMsgContainer =
      formField.parentElement.querySelector(".form-error-msg");
    errorMsgContainer.innerText = errorMsg;
    errorMsgContainer.removeAttribute("hidden");
    formField.setAttribute("aria-invalid", "true");
    formField.setAttribute(
      "aria-describedby",
      errorMsgContainer.getAttribute("id")
    );
  }

  /**
   * hides an error message and removes the aria-describedby on the field
   * @param {HTMLInputElement | HTMLTextAreaElement} formField
   */
  function hideErrorMessage(formField) {
    const errorMsgContainer =
      formField.parentElement.querySelector(".form-error-msg");
    errorMsgContainer.innerText = "";
    errorMsgContainer.setAttribute("hidden", "");
    formField.removeAttribute("aria-invalid");
    formField.removeAttribute("aria-describedby");
  }

  /** @param {string} value */
  function validateName(value) {
    if (!value) {
      showErrorMessage(inputName, "Please provide your name.");
    } else {
      hideErrorMessage(inputName);
    }
  }

  /** @param {string} value */
  function validateEmail(value) {
    if (!value) {
      showErrorMessage(inputEmail, "Please provide a valid email address.");
    } else if (!emailRegEx.test(value)) {
      showErrorMessage(inputEmail, "Is your email spelled correctly?");
    } else {
      hideErrorMessage(inputEmail);
    }
  }

  /** @param {string} value */
  function validateNote(value) {
    if (!value) {
      showErrorMessage(
        textAreaMessage,
        "Please tell me what you're writing me about."
      );
    } else if (
      textAreaMessage.validity.tooShort ||
      value < MIN_MSG_LENGTH_CHARS
    ) {
      showErrorMessage(
        textAreaMessage,
        "That's an awfully short message, you better not be spamming me!"
      );
    } else {
      hideErrorMessage(textAreaMessage);
    }
  }

  /**
   * @param {FormData} data
   * */
  function validateForm(data) {
    const nameValue = data.get("name");
    const noteValue = data.get("message");
    const emailValue = data.get("_replyto");
    validateName(nameValue);
    validateNote(noteValue);
    validateEmail(emailValue);
  }

  /** @returns {boolean} */
  function getInvalidFormFields() {
    return form.querySelectorAll("[aria-invalid='true']");
  }

  /**
   *
   * @param {NodeListOf<HTMLInputElement | HTMLTextAreaElement>} [invalidFormFields]
   */
  function handleInvalidFormState(invalidFormFields) {
    if (invalidFormFields?.length) {
      invalidFormFields[0].focus();
    } else {
      formStatus.innerText =
        "Something went wrong when submitting the form. Please try submitting the form again or alternatively you may send me an email. Thanks!";
      formStatus.classList = "error";
      formStatus.removeAttribute("hidden");
      formStatus.focus();
    }
  }

  function handleFormSubmitSuccess() {
    formStatus.classList = "success";
    formStatus.removeAttribute("hidden");
    formStatus.innerText =
      "Thanks for reaching out! I'll get back to you as soon as I can.";
    formStatus.focus();
    form.reset();
  }

  function clearFormStatus() {
    formStatus.classList = "";
    formStatus.setAttribute("hidden", "");
  }

  /** @param {SubmitEvent} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    clearFormStatus();

    const data = new FormData(event.target);
    validateForm(data);

    const invalidFormFields = getInvalidFormFields();

    if (invalidFormFields.length) {
      handleInvalidFormState(invalidFormFields);
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

  /**
   * when a form field is invalid and a user corrects the error, remove the invalid state and hide the error message
   * @param {FocusEvent} event
   */
  function handleFormBlur(event) {
    /** @type {HTMLInputElement | HTMLTextAreaElement | HTMLButtonElement} */
    const element = event.target;
    const value = element.value;
    const isInvalid = element.getAttribute("aria-invalid") === "true";

    if (!isInvalid) {
      return;
    }

    switch (element.type) {
      case "text":
        validateName(value);
        break;
      case "email":
        validateEmail(value);
        break;
      case "textarea":
        validateNote(value);
        break;
    }
  }
})();
