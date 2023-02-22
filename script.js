"use strict";

///////////////////////////////////////
// Выбор элементов

// Прокрутка
const section1 = document.querySelector("#section--1");
const btnScrollTo = document.querySelector(".btn--scroll-to");
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
