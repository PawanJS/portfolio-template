import "../sass/main.scss";
import { submitForm } from "./model.js";
import { addClass, toggleClass, removeClass } from "./helper.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const btnMenu = document.querySelector(".js-menu");
const menuLink = document.querySelectorAll(".js-menu-link");
const form = document.querySelector(".js-form");
const nav = document.querySelector(".js-nav");
const allSection = document.querySelectorAll("section");
const scrollToTopBtn = document.querySelector(".js-scrollToTop");

// Navigation

const menuToggler = function () {
  const menuBox = document.querySelector(".js-list");
  const body = document.body;
  toggleClass(nav, "navigation-active");
  toggleClass(btnMenu, "navigation--icon-active");
  toggleClass(menuBox, "navigation__link-container-active");
  toggleClass(body, "overflow-handler");
};

btnMenu.addEventListener("click", menuToggler);
for (let link of menuLink) {
  link.addEventListener("click", menuToggler);
}
// form
form.addEventListener("submit", submitForm);

// Reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  removeClass(entry.target, "hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

for (let section of allSection) {
  sectionObserver.observe(section);
  addClass(section, "hidden");
}

// scroll to top on  refresh
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
} else {
  window.addEventListener("beforeunload", function () {
    window.scrollTo(0, 0);
  });
}

// reveal scroll to top button
const revealScrollToTopBtn = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    removeClass(scrollToTopBtn, "hide");
    return;
  }

  addClass(scrollToTopBtn, "hide");
};

const navObserver = new IntersectionObserver(revealScrollToTopBtn, {
  root: null,
  threshold: 0,
});

navObserver.observe(nav);

scrollToTopBtn.addEventListener("click", function () {
  window.scroll({ top: 0, left: 0, behavior: "smooth" });
});

// loading animation
window.addEventListener("load", function () {
  addClass(document.querySelector(".loader-wrapper"), "hide");
});
