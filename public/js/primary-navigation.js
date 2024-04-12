(() => {
  // NOTE: corresponds to `min-width: 46.75rem` breakpoint in primary-navigation.css
  const smallViewportQuery = window.matchMedia("(max-width: 46.74rem");
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
    }
  }

  function setUpNavMenuButton() {
    navigationMenuButton.addEventListener("click", toggleNavigation);
  }

  function setUpNavigation() {
    navList.addEventListener("keydown", handleKeyboardEvent);
    navLinks[navLinks.length - 1].addEventListener("blur", handleLastLinkBlur);
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
    if (isNavigationOpen()) {
      closeNavigation();
    } else {
      openNavigation();
    }
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

  function handleLastLinkBlur(event) {
    if (!event.relatedTarget || navLinks.indexOf(event.relatedTarget) === -1) {
      closeNavigation();
    }
  }

  function handleClickOutside(event) {
    if (
      event.target === navigationMenuButton ||
      event.target === navList ||
      navLinks.indexOf(event.target) > -1
    ) {
      return;
    }
    if (isNavigationOpen()) {
      closeNavigation();
    }
  }
})();
