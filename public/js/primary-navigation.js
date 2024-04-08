(() => {
  // TODO:
  // when focus leaves list via tab, close list?
  // when the user clicks outside the list, close the list?
  // when the user hits the escape key, close the list, return focus to menu button

  const smallViewportQuery = window.matchMedia("(max-width: 42.9rem");
  const header = document.querySelector("header.primary");
  const navigationMenuButton = document.querySelector("button.nav-button");

  smallViewportQuery.addEventListener("change", handleMediaQueryChange);
  handleMediaQueryChange(smallViewportQuery);

  function handleMediaQueryChange(event) {
    if (event.matches) {
      setUpNavMenuButton();
    } else {
      if (header.classList.contains("expanded")) {
        header.classList.remove("expanded");
      }
    }
  }

  function setUpNavMenuButton() {
    navigationMenuButton.addEventListener("click", toggleNavigation);
  }

  function toggleNavigation() {
    if (header.classList.contains("expanded")) {
      closeNavigation();
    } else {
      openNavigation();
    }
  }

  function openNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", true);
    header.classList.add("expanded");
  }

  function closeNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", false);
    header.classList.remove("expanded");
  }
})();
