const myBirthday = new Date("25 december 1988");
const today = new Date();

const calcAge = (tday, bday) => Math.floor((tday - bday) / 31536000000);

document.getElementById("age").innerHTML = calcAge(today, myBirthday);
