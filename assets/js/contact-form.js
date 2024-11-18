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
    formField.removeAttribute("aria-describedby");
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
    formField.setAttribute("aria-invalid", "false");
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

  /** @returns {NodeListOf<HTMLElement>} */
  function getInvalidFormFields() {
    return form.querySelectorAll("[aria-invalid='true']");
  }

  /**
   * - handles a client or server side form validation error
   * @param {(HTMLInputElement | HTMLTextAreaElement)[] | string} errors either a string of error text that should be shown or an array of form fields that are in an invalid state. Note that the array is permitted to be empty.
   * @param {boolean} shouldFocus whether to focus the form status field after updating its text content; defaults to true
   */
  function handleInvalidFormState(errors, shouldFocus = true) {
    // default error message
    let errorMessage =
      "Something went wrong when submitting the form. Please try submitting the form again or alternatively you may send me an email. Thanks!";

    // errors from Formspree server validation
    if (typeof errors === "string") {
      errorMessage = errors;
    }

    // client side form validation errors
    if (Array.isArray(errors) && errors.length) {
      const pluralHandler = errors.length > 1 ? "s" : "";
      const fieldTypes = errors
        .map((element) => (element.type === "email" ? "email" : element.name))
        .join(" and ");
      errorMessage = `Please correct the error${pluralHandler} in the ${fieldTypes} form field${pluralHandler}.`;
    }

    // if an empty array is passed from a result of no form fields with aria-invalid="true", truncate the errorMessage as to reset the form status to empty
    if (!errors?.length) {
      errorMessage = "";
    }

    if (errorMessage) {
      formStatus.innerText = errorMessage;
      formStatus.classList = "error";
      formStatus.removeAttribute("hidden");
      shouldFocus && formStatus.focus();
    } else {
      formStatus.innerText = "";
      formStatus.classList = "";
      formStatus.setAttribute("hidden", "");
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

  /**
   * {% raw %}
   * an single server side validation error JSON datum returned by Formspree
   * @typedef {{ code: string; field: string; message: string; }} FormspreeErrorDatum
   * {% endraw %}
   */

  /**
   * {% raw %}
   * the full error JSON data returned by Formspree when a server validation error occurs
   * @typedef {{ error: string; errors: FormspreeErrorDatum[] }} FormspreeErrorData
   * {% endraw %}
   */

  /**
   * attempts to handle errors returned by Formspree from server side validation.
   * @param {FormspreeErrorData} [data]
   */
  function handleFormspreeErrors(data) {
    if (data && Object.hasOwn(data, "errors") && Array.isArray(data.errors)) {
      const errorMessages = data.errors
        .map(({ field, message }) => `${field}: ${message}`)
        .join(".\n");
      const errorMessageFinal = `There were one or more problems in your form submission: \n ${errorMessages}`;
      handleInvalidFormState(errorMessageFinal);
    } else {
      handleInvalidFormState();
    }
  }

  /** @param {SubmitEvent} event */
  function handleFormSubmit(event) {
    event.preventDefault();
    clearFormStatus();

    const data = new FormData(event.target);
    validateForm(data);

    const invalidFormFields = getInvalidFormFields();

    if (invalidFormFields.length) {
      handleInvalidFormState(Array.from(invalidFormFields));
      return;
    }

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          handleFormSubmitSuccess();
        } else {
          const data = await response.json();
          handleFormspreeErrors(data);
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
      default:
      // NOTE: else, do nothing.
      // The only other interactive form element a blur event would come from
      // is the submit button, which we don't need to validate, nor disable,
      // since disabled buttons aren't the best for a11y (poor color contrast,
      // removed from tab order, etc).
    }

    // update the form status message
    const invalidFormFields = getInvalidFormFields();
    handleInvalidFormState(Array.from(invalidFormFields), false);
  }
})();
