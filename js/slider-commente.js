"use strict"; // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

const togTB = document.getElementById("toolbar-toggle"); // Le lien d'affichage de la nav
const TB = document.querySelector(".toolbar"); // La nav elle-même
const btn1 = document.getElementById("slider-previous"); // Le bouton "précédent"
const btn2 = document.getElementById("slider-next"); // Le bouton "suivant"
const btn3 = document.getElementById("slider-toggle"); // Le bouton "play"
const btn4 = document.getElementById("slider-random"); // Le bouton "random"
const img = document.querySelector("img"); // La balise image dont la source change
const capt = document.querySelector("figcaption"); // La description de l'image qui change également
let interval = false; // Le booléen true si "play" est enclenché
let random = false; // Le booléen true si "random" est enclenché
let intervalID; // La variable qui capture l'ID de l'intervalle lancé par "play"
let i = 1; // L'index pointant la photographie à afficher

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

// La fonction permettant d'afficher et de cacher la nav
// Rajoute ou enlève la classe "hidden", dont la position est absolue, left:-9999px
function TBappear() {
  TB.classList.toggle("hidden");
}

// La fonction associée au bouton "play"
function toggleSlide() {
  if (!interval) {
    // On vérifie si le bouton n'est pas déjà enclenché, càd si le booléen associé à "play" n'est pas true
    sliding(); // Le cas échéant on lance la fonction de slide
    interval = true; // Le booléen associé à "play" devient true
    btn3.innerHTML = '<i class="fas fa-pause"></i>'; // L'icône Font Awesome change pour deux barres représentant "pause"
    btn3.classList.toggle("pushed"); // Le bouton "play" se voit attribué la classe "pushed", son background-color change
  } else {
    // Dans tous les autres cas (il n'y en a qu'un), càd si le booléen associé à "play" est true
    clearInterval(intervalID); // L'intervalle lancé précédemment est supprimé grâce à la variable contenant son ID
    interval = false; // Le booléen associé à "play" redevient false
    random = false; // Le booléen associé à "random" devient false, utile s'il était enclenché
    btn3.innerHTML = '<i class="fas fa-play"></i>'; // L'icône Font Awesome retourne à ce qu'elle était précédemment
    btn3.classList.toggle("pushed"); // Le bouton "play" se voit enlever la classe "pushed"
    btn4.classList.remove("pushed"); // Le bouton "random" se voit enlever la classe "pushed", utile s'il était enclenché
  }
}

// La fonction associée au bouton "random"
function randomSlide() {
  if (interval && !random) {
    // On vérifie si "play" est enclenché et que "random" ne l'est pas encore
    random = true; // Random devient true
    btn4.classList.add("pushed"); // Le bouton est "pushed"
  } else {
    // Dans l'autre cas
    random = false; // Random redevient false
    btn4.classList.remove("pushed"); // Le bouton n'est plus "pushed"
  }
}

// La fonction associée au bouton "previous"
function previous() {
  if (i > 1) {
    i--; // Décrémentation de l'index i
  } else {
    i = 6; // Si i est égal à 1 alors il retourne à 6 (= photo 6)
  }
  transition(); // Appel de transition
}

// La fonction associée au bouton "next"
function next() {
  if (i < 6) {
    i++; // Incrémentation de i
  } else {
    i = 1; // Si i est égal à 6 alors il retourne à 1
  }
  transition(); // Appel de transition
}

// La fonction pour slider
function sliding() {
  // Lorsqu'elle est appelée,
  intervalID = setInterval(function() {
    // La fonction sliding définit un intervalle
    if (random) {
      // Qui, si random est true
      let shuffle = Math.ceil(Math.random() * 6); // Appelle un Math.random entre 1 et 6,
      while (i == shuffle) {
        // Vérifie qu'il n'est pas égal à l'index de la photo actuelle,
        shuffle = Math.ceil(Math.random() * 6);
      }
      i = shuffle; // Le cas échéant l'attribue à i notre index
    } else if (i < 6) {
      // Et sinon
      i++; // Incrémente i notre index,
    } else {
      i = 1; // Et le remet à 1 une fois 6 atteint
    }
    transition(); // Appel de transition
  }, 1000); // Tout cela toutes les 1000 millisecondes
}

// La fonction de transition entre les photos
function transition() {
  img.style.opacity = "0"; // L'opacity à 0, la transition sur l'opacité étant fixée à 1 seconde dans le CSS
  capt.style.opacity = "0"; // Itou
  setTimeout(function() {
    // Timeout qui modifie l'attribut src de l'image, son figcaption, et remet leurs opacités au maximum, au bout de 1000ms
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
  }, 1000); // 1000ms
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
