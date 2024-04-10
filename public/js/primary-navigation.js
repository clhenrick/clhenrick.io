(() => {
  // TODO:
  // when focus leaves list via tab, close list
  // when the user clicks outside the list, close the list
  // when the user hits the escape key, close the list, return focus to menu button

  const smallViewportQuery = window.matchMedia("(max-width: 42.9rem");
  const navigationMenuButton = document.querySelector("button.nav-button");
  const navList = document.querySelector("header nav > ul");
  const navLinks = Array.from(navList.querySelectorAll("li a"));

  smallViewportQuery.addEventListener("change", handleMediaQueryChange);
  handleMediaQueryChange(smallViewportQuery);

  function handleMediaQueryChange(event) {
    if (event.matches) {
      setUpNavMenuButton();
    } else {
      navList.classList.remove("hidden");
    }
  }

  function setUpNavMenuButton() {
    navList.classList.add("hidden");
    navigationMenuButton.addEventListener("click", toggleNavigation);
  }

  function toggleNavigation() {
    if (isNavigationHidden()) {
      openNavigation();
    } else {
      closeNavigation();
    }
  }

  function isNavigationHidden() {
    return navList.classList.contains("hidden");
  }

  function openNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", true);
    navList.classList.remove("hidden");
  }

  function closeNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", false);
    navList.classList.add("hidden");
  }

  // function handleBlur(event) {}
})();
