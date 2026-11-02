"use strict";

import { partidaActual, difi } from "./data.js";

const panelInicio = document.querySelector("#panel-inicio");
const dificultad = document.querySelector("#dificultad");
const verPartidas = document.querySelector("#ver-historial");
const panelFinal = document.querySelector("#panel-final");

let resueltosCont = 0;
let vivosCont = 0;
let muertosCont = 0;

/* ---------- Dificultad ---------- */

export function diffi() {
    const dif = document.querySelector("#dificultad").value;
    partidaActual.dificultad = dif;
    console.log(partidaActual.dificultad);
}

/* ---------- Guardar partida ---------- */

function guardarPartida() {
    const guardar = document.querySelector("#guardar");
    const inputNombre = document.querySelector("#nombre");
    const estado = document.querySelector("#estado-guardado");

    if (!guardar || !inputNombre || !estado) return;

    guardar.addEventListener("click", function (e) {
        e.preventDefault();
        const nombre = inputNombre.value.trim();

        if (nombre.length > 0) {
            partidaActual.user = nombre;
            partidaActual.salvados = vivosCont;
            partidaActual.muertos = muertosCont;
            partidaActual.fechaPartida = new Date().toLocaleString();
            estado.innerHTML = "Partida guardada correctamente";
            console.log(partidaActual);
        } else {
            estado.innerHTML = "Debes escribir un nombre para guardar la partida";
        }
    });
}



guardarPartida();

/* ---------- Partida ---------- */

export function iniciarPartida(nivel) {
    console.log("Iniciando partida con dificultad:", nivel);

    const config = difi[nivel];
    if (!config) {
        console.error("Dificultad no válida:", nivel, "→ revisa que coincida con las claves de difi en data.js");
        return;
    }

    console.log(config);
    aparicionRecur(config.ratioAparicion, config.velocidadMax, 50);
}

function aparicionRecur(ratioAparicion, velocidadMax, cantidad) {
    // Aparición recursiva de paracaidistas
    if (cantidad !== 0) {
        console.log("Aparece el paracaidista numero:", cantidad);

        const velocidadCaida = randomVelocidad(velocidadMax, velocidadMax + 20);

        aparicion(velocidadCaida, cantidad);

        if(resueltosCont == 50 || muertosCont == 3) {
            finPartida();
            return;
        }

        let part = setTimeout(() => {
            aparicionRecur(ratioAparicion, velocidadMax, cantidad - 1);
        }, ratioAparicion);
    }
}

function aparicion(velocidadCaida, id) {
    const escenario = document.querySelector("#personajes");
    const xParaca = xAleatorio();

    console.log("Aparece el paracaidista a velocidad:", velocidadCaida, "en la posición X:", xParaca);

    escenario.insertAdjacentHTML("beforeend", `
        <img style="left: ${xParaca}px; top: 0px;" id="p${id}" src="img/cayendo.gif" alt="" aria-hidden="true">
    `);

    const paracaidista = escenario.querySelector("#p" + id);

    let cayendo = true;
    let activo = true;

    function salvar() {
        if (!activo) return;
        cayendo = false;
        paracaidista.src = "img/paracaidas.gif";
    }

    paracaidista.addEventListener("click", salvar);

    const caida = setInterval(() => {
        const posicionActual = parseInt(paracaidista.style.top) || 0;

        paracaidista.style.top = (posicionActual + 10) + "px";

        if (posicionActual >= escenario.offsetHeight - 140) {
            activo = false;
            clearInterval(caida);
            paracaidista.removeEventListener("click", salvar);

            paracaidista.src = cayendo ? "img/estrellado.gif" : "img/salvado.gif";

            let resueltos = document.querySelector("#resueltos");

            resueltosCont++;
            resueltos.innerHTML = resueltosCont;

            if(cayendo && muertosCont < 3) {
                muertosCont++;
                let estrellados = document.querySelector("#estrellados");
                estrellados.innerHTML = muertosCont;
            } else if(!cayendo) {
                vivosCont++;
                let salvados = document.querySelector("#salvados");
                salvados.innerHTML = vivosCont;
            }

            
            console.log("El paracaidista ha llegado al suelo.");
        }
    }, velocidadCaida);
}

/* ---------- Utilidades ---------- */

function randomVelocidad(min, max) {
    // Número aleatorio entre min y max (ambos incluidos)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function xAleatorio() {
    // Número aleatorio entre 0 y el ancho del escenario (menos el ancho de la imagen)
    const escenario = document.querySelector("#escenario");
    const anchoEscenario = escenario.offsetWidth;

    return Math.floor(Math.random() * (anchoEscenario - 60));
}

function finPartida() {
    // Lógica para finalizar la partida
    
    console.log("La partida ha terminado.");
    panelFinal.removeAttribute("hidden");


}



export function habilitarBotones() {
    panelInicio.classList.remove("desaparecer");
    panelInicio.classList.add("aparecer");
    dificultad.disabled = false;
    verPartidas.disabled = false;
}