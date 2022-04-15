"use strict";

const images = [...document.querySelectorAll(".slider_image")];
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const indicatorsList = document.querySelector("#indicators");
let currentImage;
let indicators;

const initializeSlider = function () {
  currentImage = images[0];
  currentImage.style.left = "0";

  images.forEach((img, i) => {
    img.dataset.sliderNumber = i + 1;
    indicatorsList.innerHTML += "<li class='ind'></li>";
  });

  for (let i = 1; i < images.length; i++) {
    images[i].style.left = "-100%";
  }

  indicators = [...document.querySelectorAll(".ind")];
  indicators.forEach((ind, i) => (ind.dataset.sliderNumber = i + 1));
  toggleIndicator(indicators[0]);
};

const moveImage = function (cImg, newImg, leftOrRight) {
  if (leftOrRight == "right") {
    cImg.style.animation = "rightOut 1s";
    cImg.style.left = "-100%";
    newImg.style.animation = "leftIn 1s";
    newImg.style.left = "0";
  }
  if (leftOrRight == "left") {
    cImg.style.animation = "leftOut 1s";
    cImg.style.left = "100%";
    newImg.style.animation = "rightIn 1s";
    newImg.style.left = "0";
  }
};

const setCurrentImage = function (dataSliderNumber) {
  const newImage = images[dataSliderNumber - 1];
  const leftOrRight =
    newImage.dataset.sliderNumber < currentImage.dataset.sliderNumber
      ? "left"
      : "right";
  if (currentImage) {
    moveImage(currentImage, newImage, leftOrRight);
    toggleIndicator(getIndicator(currentImage));
  }
  currentImage = newImage;
  toggleIndicator(getIndicator(currentImage));
};

const getSliderNumber = function (i) {
  return Number(i.dataset.sliderNumber);
};

const toggleIndicator = function (ind) {
  ind.classList.toggle("indicator_active");
};

const getIndicator = function (img) {
  return indicators.find((i) => getSliderNumber(i) === getSliderNumber(img));
};

////////////////////  Buttons left and right/////////////////////////

left.addEventListener("click", function () {
  if (getSliderNumber(currentImage) > 1) {
    setCurrentImage(getSliderNumber(currentImage) - 1);
  }
});

right.addEventListener("click", function () {
  const currentNumber = getSliderNumber(currentImage);
  if (currentNumber < images.length) {
    setCurrentImage(currentNumber + 1);
  }
});

initializeSlider();
