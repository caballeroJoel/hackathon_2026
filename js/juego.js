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
import { diffi, PushHistorial, MostrarHistorial } from "./funciones.js";




let guardada = false;

// Guardar resultado al pulsar el boton
document.getElementById("guardar-partida").addEventListener("submit", function(e) {
    e.preventDefault();

    if (guardada) {
        return;
    }

    partidaActual.user = document.getElementById("nombre").value.trim();

    if (partidaActual.user.length < 1 || partidaActual.user.length > 40) {
        document.getElementById("estado-guardado").textContent = "Nombre incorrecto";
        return;
    }

    if (PushHistorial()) {
        guardada = true;
        document.getElementById("guardar").disabled = true;
        document.getElementById("estado-guardado").textContent = "Partida guardada";
    } else {
        document.getElementById("estado-guardado").textContent = "Error al guardar";
    }
});

// Abrir historial
document.getElementById("ver-historial").addEventListener("click", function() {
    MostrarHistorial();
    document.getElementById("historial").showModal();
});

// Cerrar historial
document.getElementById("cerrar-historial").addEventListener("click", function() {
    document.getElementById("historial").close();
});

// Cambiar orden
document.getElementById("orden-historial").addEventListener("change", MostrarHistorial);



let dificultad = document.querySelector("#dificultad");

dificultad.addEventListener("change", function() {
    diffi()
    console.log("Dificultad seleccionada: " + partidaActual.dificultad)
});
