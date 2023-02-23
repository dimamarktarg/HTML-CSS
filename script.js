"use strict";

///////////////////////////////////////
// Выбор элементов

// Прокрутка
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
// Модальное окно
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const btnsOpenModalWindow = document.querySelectorAll(
  ".btn--show-modal-window"
);
// Вкладки
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");
// Ссылки панели навигации
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
// Слайдер
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
// Имплементация lazy loading для изображений
const lazyImages = document.querySelectorAll("img[data-src]");

////////////////////////////////////////////////////
// Переменные для слайдера
let currentSlide = 0;
const slidesNumber = slides.length;

/* ------------------------------------------------------------ */
// Код приложения

// Сообщение Куки
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  'Мы используем на этом сайте cookie для улучшения функциональности. <button class="btn btn--close-cookie">Ok!</button>';
header.before(message);

document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    message.remove();
  });

// Modal window
const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModalWindow.forEach((button) =>
  button.addEventListener("click", openModalWindow)
);

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});

// Плавное прокручивание к элементу | Smooth page navigation
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

// Event Delegation | Делегирование событий
// 1. Добавляем addEventListener для ОБЩЕГО родителя
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  // 2. Определить target элемент, для которого оно произошло
  console.log(e.target);
  if (e.target.classList.contains("nav__link")) {
    const href = e.target.getAttribute("href");
    console.log(href);
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
  }
});

// Вкладки
tabContainer.addEventListener("click", function (e) {
  const clickedButton = e.target.closest(".operations__tab");
  console.log(clickedButton);
  // Guard clause - Пункт охраны
  if (!clickedButton) return;
  // Активная вкладка
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active")); //Удаляем класс у всех
  clickedButton.classList.add("operations__tab--active"); //Добавляем класс выбранному элементу
  // Активный контент
  tabContents.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clickedButton.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Анимация потускнения на панели навигации
const navLinksHoverAnimation = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkOver = e.target;
    const siblingLinks = linkOver
      .closest(".nav__links")
      .querySelectorAll(".nav__link");
    const logo = linkOver.closest(".nav").querySelector("img");
    const logoText = linkOver.closest(".nav").querySelector(".nav__text");

    siblingLinks.forEach((el) => {
      if (el !== linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};
// Работа с аргументами припомощи bind() / this
nav.addEventListener("mouseover", navLinksHoverAnimation.bind(0.4));
nav.addEventListener("mouseout", navLinksHoverAnimation.bind(1));

// Sticky navigation - Intersection Observer API | Наблюдатель пересечения
const navHeight = nav.getBoundingClientRect().height;
const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight + 10}px`,
});
headerObserver.observe(header);

// Появление частей сайта
const appearanceSection = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return; //Пункт охраны
  if (entry.target.contains(document.getElementById("section--1"))) {
    entry.target.classList.remove("section-1-hidden");
  }
  if (entry.target.contains(document.getElementById("section--2"))) {
    entry.target.classList.remove("section-2-hidden");
  }
  if (entry.target.contains(document.getElementById("section--3"))) {
    entry.target.classList.remove("section-3-hidden");
  }
  if (entry.target.contains(document.getElementById("section--4"))) {
    entry.target.classList.remove("section-4-hidden");
  }
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(appearanceSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  if (section.contains(document.getElementById("section--1"))) {
    section.classList.add("section-1-hidden");
  }
  if (section.contains(document.getElementById("section--2"))) {
    section.classList.add("section-2-hidden");
  }
  if (section.contains(document.getElementById("section--3"))) {
    section.classList.add("section-3-hidden");
  }
  if (section.contains(document.getElementById("section--4"))) {
    section.classList.add("section-4-hidden");
  }
});

// Имплементация lazy loading для изображений
const loadImages = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  // Меняем img на изображение с высоким разрешением
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const lazyImagesObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0.7,
});
lazyImages.forEach((image) => lazyImagesObserver.observe(image));

// Создание слайдера
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};
moveToSlide(0);

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  console.log(e);
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
