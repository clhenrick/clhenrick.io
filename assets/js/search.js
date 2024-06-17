(() => {
  const form = document.querySelector('form[role="search"]');
  const textInput = document.querySelector('input[type="text"]');
  const site = "clhenrick.io";

  // clear the prepopulated site:clhenrick.io (we add it back later)
  textInput.value = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(formData);

    const query = formData.get('q');
    formData.set('q', `site:${site}+${query}`);

    console.log(formData);

    // maybe do something like window.navigate here with correct url?

    // see: https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript#associating_a_formdata_object_and_a_form
  });
})();
