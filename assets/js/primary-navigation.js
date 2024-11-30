(() => {
  // NOTE: corresponds to `min-width: 748px` breakpoint in header.css
  const smallViewportQuery = window.matchMedia("(max-width: 747px");
  const navigationMenuButton = document.querySelector("button.nav-button");
  const navList = document.querySelector("header nav > ul");
  const navLinks = Array.from(navList.querySelectorAll("li a"));

  window.addEventListener("DOMContentLoaded", init);

  function init() {
    smallViewportQuery.addEventListener("change", handleMediaQueryChange);
    handleMediaQueryChange(smallViewportQuery);
  }

  function handleMediaQueryChange(event) {
    if (event.matches) {
      setUpNavMenuButton();
      setUpNavigation();
      document.body.addEventListener("click", handleClickOutside);
    } else {
      navList.classList.remove("expanded");
      document.body.removeEventListener("click", handleClickOutside);
      undoNavMenuButtonSetup();
      undoNavigationSetup();
    }
  }

  function setUpNavMenuButton() {
    navigationMenuButton.addEventListener("click", toggleNavigation);
  }

  function undoNavMenuButtonSetup() {
    navigationMenuButton.removeEventListener("click", toggleNavigation);
  }

  function setUpNavigation() {
    navList.addEventListener("keydown", handleKeyboardEvent);
  }

  function undoNavigationSetup() {
    navList.removeEventListener("keydown", handleKeyboardEvent);
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
        goFirst();
        flag = true;
        break;
      case "End":
        goLast();
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
    if (curIndex > 0) {
      navLinks[curIndex - 1].focus();
    }
  }

  function goNext() {
    const curIndex = navLinks.indexOf(document.activeElement);
    if (curIndex !== -1 && curIndex < navLinks.length - 1) {
      navLinks[curIndex + 1].focus();
    }
  }

  function goFirst() {
    navLinks[0].focus();
  }

  function goLast() {
    navLinks[navLinks.length - 1].focus();
  }

  function toggleNavigation(event) {
    if (isNavigationOpen()) {
      closeNavigation();
    } else {
      openNavigation();
    }
    event.stopPropagation();
  }

  function isNavigationOpen() {
    return navList.classList.contains("expanded");
  }

  function openNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", true);
    navList.classList.add("expanded");
  }

  function closeNavigation() {
    navigationMenuButton.setAttribute("aria-expanded", false);
    navList.classList.remove("expanded");
  }

  function handleClickOutside() {
    if (isNavigationOpen()) {
      closeNavigation();
    }
  }
})();
