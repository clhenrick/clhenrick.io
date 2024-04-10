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
  handleClickOutside();

  function handleMediaQueryChange(event) {
    if (event.matches) {
      setUpNavMenuButton();
      setUpNavigation();
    } else {
      navList.classList.remove("hidden");
    }
  }

  function setUpNavMenuButton() {
    navigationMenuButton.addEventListener("click", toggleNavigation);
  }

  function setUpNavigation() {
    navList.classList.add("hidden");
    navList.addEventListener("keydown", handleKeyboardEvent);
  }

  function handleKeyboardEvent(event) {
    let flag = false;
    switch (event.key) {
      case "Escape":
        closeNavigation();
        navigationMenuButton.focus();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        goPrevious();
        flag = true;
        break;
      case "ArrowDown":
      case "ArrowRight":
        goNext();
        flag = true;
        break;
      case "Home":
        navLinks[0].focus();
        flag = true;
        break;
      case "End":
        navLinks[navLinks.length - 1].focus();
        flag = true;
        break;
    }
    if (flag) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function goPrevious() {
    const curIndex = navLinks.indexOf(document.activeElement);
    if (curIndex > 0) navLinks[curIndex - 1].focus();
  }

  function goNext() {
    const curIndex = navLinks.indexOf(document.activeElement);
    if (curIndex < navLinks.length - 1) navLinks[curIndex + 1].focus();
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
