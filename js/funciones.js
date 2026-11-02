
"use strict";
// Guardar una partida
export function PushHistorial() {

    // Recuperamos las partidas anteriores
    let partidas = CargarHistorial();

    if (partidas == null) {
        return false;
    }

    // Copiamos la partida actual
    let partida = {
        user: partidaActual.user,
        fechaPartida: new Date().toISOString(),
        salvados: partidaActual.salvados,
        muertos: partidaActual.muertos,
        dificultad: partidaActual.dificultad
    };

    // Añadimos la nueva partida
    partidas.push(partida);

    // Guardamos el historial en el navegador
    try {
        localStorage.setItem("historial", JSON.stringify(partidas));
        return true;
    } catch (error) {
        return false;
    }
}

// Recuperar partidas
export function CargarHistorial() {

    let datos = localStorage.getItem("historial");

    // Si no hay partidas guardadas
    if (datos == null) {
        return [];
    }

    let partidas = JSON.parse(datos);

    return partidas;


}


// Mostrar las partidas en la tabla
export function MostrarHistorial() {

    let tabla = document.getElementById("filas-historial");
    let mensaje = document.getElementById("estado-historial");
    let orden = document.getElementById("orden-historial").value;

    let partidas = CargarHistorial();

    // Limpiamos la tabla
    tabla.innerHTML = "";
    mensaje.textContent = "";

    if (partidas == null) {
        mensaje.textContent = "Error al cargar el historial";
        return;
    }

    // Ordenamos por fecha o puntuacion
    if (orden == "fecha") {
        partidas.sort((a, b) => new Date(b.fechaPartida) - new Date(a.fechaPartida));
    } else {
        partidas.sort((a, b) => b.salvados - a.salvados);
    }

    // Mostramos todas las partidas
    for (let i = 0; i < partidas.length; i++) {

        // tabla.appendChild(fila);

        tabla.innerHTML += "<tr>";

        let datos = [
            partidas[i].user,
            new Date(partidas[i].fechaPartida).toLocaleString("es-ES"),
            partidas[i].salvados,
            partidas[i].muertos,
            partidas[i].dificultad
        ];

        for (let j = 0; j < datos.length; j++) {
            tabla.innerHTML += `
                    <td>
                        ${datos[j]}
                    </td>
                <tr>
            `;
        }


    }

    if (partidas.length == 0) {
        mensaje.textContent = "No hay partidas";
    }
}
import { partidaActual, difi  } from "./data.js";

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

function iniciarPartida(dificultad) {
    console.log("Iniciando partida con dificultad:", dificultad);
    console.log(difi[dificultad]);


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
    // Lógica para la aparición de paracaidistas

    console.log("Aparece el paracaidista a velocidad:", velocidadCaida);


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