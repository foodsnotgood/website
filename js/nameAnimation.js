"use strict";

const toAnimate = document.querySelector("#name");
const nameContainer = document.querySelector("#name_container");
const underName = document.querySelector("#under_name");

const createElements = function (name) {
  const nameArr = name.dataset.name.split("").reverse();
  nameArr.forEach((element, i, arr) => {
    const letterDiv = (document.createElement("div").textContent = element);
    toAnimate.insertAdjacentHTML(
      "afterbegin",
      `<span class="animate" id="${i}">${element}</span>`
    );
  });
  return document.querySelectorAll(".animate");
};

const animateName = function (letters) {
  letters.forEach((e, i) => {
    const r = Math.trunc(Math.random() * 4) + 1;
    if (i % r === 0) {
      e.style.position = "relative";
      e.style.animation = `fromTop ease-out ${r}s`;
    }
    if (i % (r + 1) === 0) {
      e.style.position = "relative";
      e.style.animation = `fromBottom ease-out ${r}s`;
    }
  });
  setTimeout(() => {
    underName.style.opacity = "1";
  }, 1000);
};

animateName(createElements(toAnimate));
