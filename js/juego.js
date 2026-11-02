"use strict";

import { partidaActual } from "./data.js";
import { diffi } from "./funciones.js";

/* Todo el JavaScript del juego va aquí.
 * Acordad en el equipo quién programa cada parte (ver EMPIEZA_AQUI.md).
 * Podéis dejarlo en un solo archivo o partirlo en varios si os resulta más fácil con Git.
 */


let dificultad = document.querySelector("#dificultad");

dificultad.addEventListener("change", function() {
    diffi()
    console.log("Dificultad seleccionada: " + partidaActual.dificultad)
});