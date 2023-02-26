"use strict";
// Выбор элементов на странице
const section = document.querySelector(".section");
// Выбор элементов Modal window
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const modalHeader = document.querySelector(".modal__header");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
// Выбор элементов слайдера
const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
// Переменные для слайдера
let currentSlide = 0;
const slidesNumber = slides.length;
// Начальное описание картинки слайдера
modalHeader.textContent = slides[currentSlide].firstElementChild.alt;

// Modal window
const openModalWindow = function () {
  modalWindow.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modalWindow.appendChild(modalHeader);
  modalWindow.appendChild(slider);
  slider.removeEventListener("click", evente);
};

const closeModalWindow = function () {
  modalWindow.classList.add("hidden");
  overlay.classList.add("hidden");
  section.appendChild(modalHeader);
  section.appendChild(slider);
  slider.addEventListener("click", evente);
};

const evente = function (e) {
  if (e.target.classList.contains("img")) {
    openModalWindow();
    modalHeader.textContent = e.target.alt;
  }
};

slider.addEventListener("click", evente);

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});
///////////////////////////////////////
// Создание слайдера

// Создание точек перемещения по слайдеру
const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();
// Выделение активной точки
const activateCurrentDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
activateCurrentDot(0);
// Перемещение по слайдеру
const moveToSlide = function (slide) {
  slides.forEach((s, index) => {
    s.style.transform = `translateX(${(index - slide) * 100}%)`;
  });
};
moveToSlide(0);
// Перемещение по слайдеру в право
const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  modalHeader.textContent = slides[currentSlide].firstElementChild.alt;
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};
// Перемещение по слайдеру в лево
const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }
  modalHeader.textContent = slides[currentSlide].firstElementChild.alt;
  moveToSlide(currentSlide);
  activateCurrentDot(currentSlide);
};
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);
// Перемещение по слайдеру по нажатию клавиш
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});
// Перемещение по слайдеру по точкам
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
