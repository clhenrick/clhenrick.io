// handles filtering project cards in /content/work/index.njk
(() => {
  const cards = Array.from(document.querySelectorAll(".card"));
  const cardsContainer = document.querySelector(".cards-container");

  // reference to the aria-live container
  const announce = document.querySelector("#announce");

  const filterButtons = Array.from(
    document.querySelectorAll("button.filter")
  ).filter((button) => button.value !== "shuffle");
  const shuffleButton = document.querySelector("button.shuffle");

  filterButtons.forEach((button) => {
    button.addEventListener("click", onFilterButtonClick);
  });

  shuffleButton.addEventListener("click", onShuffleButtonClick);

  function onFilterButtonClick(event) {
    const value = event.target.value;

    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", "false");
    });

    event.target.setAttribute("aria-pressed", "true");

    cards.forEach((card) => {
      const tags = Array.from(card.querySelectorAll(".tag")).map(
        (tag) => tag.innerText
      );

      if (tags.includes(value)) {
        card.hidden = false;
      } else if (value === "all") {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });

    announce.innerText = `Filtered the projects list to show ${value} projects.`;
  }

  function onShuffleButtonClick() {
    const shuffled = shuffle(cards);
    cardsContainer.innerHTML = "";
    shuffled.forEach((card) => {
      cardsContainer.appendChild(card);
    });
    announce.innerText = `Shuffled the order of the projects list.`;
  }

  // code credit: https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    let m = array.length,
      t,
      i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
})();
