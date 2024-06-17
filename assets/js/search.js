// Progressively enhanced search form for /search/index.njk
// This still works without JavaScript; here we remove the prepopulated "site:clhenrick.io" from the text input's value so that it doesn't distract the user when they enter a search query.
(() => {
  const form = document.querySelector('form[role="search"]');
  const textInput = document.querySelector('input[type="text"]');
  const siteName = window.websiteName || "clhenrick.io";

  // clear the prepopulated site:clhenrick.io (we add it back later)
  textInput.value = "";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const query = formData.get("q");
    formData.set("q", `site:${siteName} ${query}`);

    const searchParams = new URLSearchParams(formData);
    const searchResultsUrl = `https://duckduckgo.com/?${searchParams.toString()}`;

    window.location.href = searchResultsUrl;
  });
})();
