"use strict";


/* Todo el JavaScript del juego va aquí.
 * Acordad en el equipo quién programa cada parte (ver EMPIEZA_AQUI.md).
 * Podéis dejarlo en un solo archivo o partirlo en varios si os resulta más fácil con Git.
 */

import { partidaActual } from "./data.js";
import { PushHistorial, MostrarHistorial } from "./funciones.js";



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

