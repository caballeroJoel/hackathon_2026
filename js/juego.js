"use strict";

import { partidaActual } from "./data.js";
import { diffi, iniciarPartida } from "./funciones.js";

const dificultad = document.querySelector("#dificultad");
const iniciar = document.querySelector("#iniciar");
const panelInicio = document.querySelector("#panel-inicio");
const verPartidas = document.querySelector("#ver-historial");
const reiniciar = document.querySelector("#reiniciar");

dificultad.addEventListener("change", function () {
    diffi();
    console.log("Dificultad seleccionada: " + partidaActual.dificultad);
});

iniciar.addEventListener("click", function () {
    diffi(); // asegura que partidaActual.dificultad tenga valor aunque no se toque el select
    panelInicio.classList.add("desaparecer");
    dificultad.disabled = true;
    verPartidas.disabled = true;
    iniciarPartida(partidaActual.dificultad);

});

reiniciar.addEventListener("click", function () {

    location.reload();
});




