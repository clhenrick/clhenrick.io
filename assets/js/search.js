// Progressively enhanced search form for /search/index.njk
// NOTE: the search form still works without this JavaScript; here we just remove the pre-populated "site:clhenrick.io" from the text input's value so that it doesn't distract the user when they enter a search query.
(() => {
  const form = document.querySelector('form[role="search"]');
  const textInput = document.querySelector('input[type="text"]');
  const queryPrefix = textInput.getAttribute("value");

  // clear the prepopulated "site:clhenrick.io" value (we add it back later)
  textInput.setAttribute("value", "");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const query = formData.get("q");
    formData.set("q", `${queryPrefix} ${query}`);

    const searchParams = new URLSearchParams(formData);
    const searchResultsUrl = `https://duckduckgo.com/?${searchParams.toString()}`;

    window.location.href = searchResultsUrl;
  });
})();
