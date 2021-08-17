"use strict";

const button = document.querySelector("#btn");
const body = document.querySelector("body");
const colorCode = document.querySelector(".colorCodes");
const title = document.querySelector("h1");
const bgText = document.querySelector(".bgText");
const colorField1 = document.querySelector(".color1");
const colorField2 = document.querySelector(".color2");

const hex = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const colorMaker = function () {
  const newColor = [];
  for (let i = 0; i < 6; i++) {
    newColor[i] = hex[Math.floor(Math.random() * 16)];
  }
  return "#" + newColor.join("");
};

button.addEventListener("click", () => {
  const color1 = colorMaker().toUpperCase();
  const color2 = colorMaker().toUpperCase();
  body.style.backgroundImage = `linear-gradient(to left, ${color1}, ${color2}`;
  colorField1.textContent = color1;
  colorField2.textContent = color2;

  bgText.textContent = "Color";
  bgText.style.backgroundColor = `${color1}50`;
  bgText.style.webkitBackgroundClip = `text`;
  bgText.style.webkitTextFillColor = `transparent`;

  button.style.backgroundColor = `${color2}50`;
});
