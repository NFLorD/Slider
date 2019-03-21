"use strict"; // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

const togTB = document.getElementById("toolbar-toggle");
const TB = document.querySelector(".toolbar");
const btn1 = document.getElementById("slider-previous");
const btn2 = document.getElementById("slider-next");
const btn3 = document.getElementById("slider-toggle");
const btn4 = document.getElementById("slider-random");
const img = document.querySelector("img");
const capt = document.querySelector("figcaption");
let interval = false;
let random = false;
let intervalID;
let i = 1;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

function TBappear() {
  TB.classList.toggle("hidden");
}

function toggleSlide() {
  if (!interval) {
    sliding();
    interval = true;
    btn3.innerHTML = '<i class="fas fa-pause"></i>';
    btn3.classList.toggle("pushed");
  } else {
    clearInterval(intervalID);
    interval = false;
    random = false;
    btn3.innerHTML = '<i class="fas fa-play"></i>';
    btn3.classList.toggle("pushed");
    btn4.classList.remove("pushed");
  }
}

function randomSlide() {
  if (interval && !random) {
    random = true;
    btn4.classList.add("pushed");
  } else {
    random = false;
    btn4.classList.remove("pushed");
  }
}

function previous() {
  if (i > 1) {
    i--;
  } else {
    i = 6;
  }
  transition();
}

function next() {
  if (i < 6) {
    i++;
  } else {
    i = 1;
  }
  transition();
}

function sliding() {
  intervalID = setInterval(function() {
    if (random) {
      let shuffle = Math.ceil(Math.random() * 6);
      while (i == shuffle) {
        shuffle = Math.ceil(Math.random() * 6);
      }
      i = shuffle;
    } else if (i < 6) {
      i++;
    } else {
      i = 1;
    }
    transition();
  }, 1000);
}

function transition() {
  img.style.opacity = "0";
  capt.style.opacity = "0";
  setTimeout(function() {
    img.setAttribute("src", `images/` + i + `.jpg`);
    switch (i) {
      case 1:
        capt.textContent = "I'm a street artist";
        break;
      case 2:
        capt.textContent = "Rolling";
        break;
      case 3:
        capt.textContent = "Colourful Building";
        break;
      case 4:
        capt.textContent = "Sky-scrapping";
        break;
      case 5:
        capt.textContent = "Ghost in the Shell ?";
        break;
      case 6:
        capt.textContent = "Paris by night";
        break;
    }
    img.style.opacity = "1";
    capt.style.opacity = "1";
  }, 1000);
}

/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/

togTB.addEventListener("click", TBappear);

btn1.addEventListener("click", previous);
btn2.addEventListener("click", next);
btn3.addEventListener("click", toggleSlide);
btn4.addEventListener("click", randomSlide);

window.addEventListener("keydown", function(e) {
  if (e.keyCode === 37) {
    previous();
  } else if (e.keyCode === 39) {
    next();
  }
});

const images = [
  { source: "images/1.jpg", title: "1" },
  { source: "images/2.jpg", title: "2" },
  { source: "images/3.jpg", title: "3" },
  { source: "images/4.jpg", title: "4" },
  { source: "images/5.jpg", title: "5" },
  { source: "images/6.jpg", title: "6" }
];

console.table(images);
