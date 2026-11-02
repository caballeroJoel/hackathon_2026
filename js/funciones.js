import {  partidaActual, difi  } from "./data.js";

const iniciar = document.querySelector("#iniciar")
const panelInicio = document.querySelector("#panel-inicio")
const dificultad = document.querySelector("#dificultad")
const verPartidas = document.querySelector("#ver-historial")

iniciar.addEventListener("click", function(){
    panelInicio.classList.add("desaparecer");
    dificultad.disabled = true;
    verPartidas.disabled = true;
})

function guardarPartida(){
    const guardar = document.querySelector("#guardar");
    const inputNombre = document.querySelector("#nombre");
    const estado = document.querySelector("#estado-guardado");
    
    guardar.addEventListener("click", function(e){
        e.preventDefault();
        const nombre = inputNombre.value.trim();

        if(nombre.length > 0){
            partidaActual.user = nombre;
            estado.innerHTML = "Partida guardada correctamente";
            console.log(partidaActual);
        } else {
            estado.innerHTML = "Debes escribir un nombre para guardar la partida";
        }
    });
}

guardarPartida();

// console.log(partidaActual);
// console.log(difi);

export function diffi(){
    let dif = document.querySelector("#dificultad").value
    partidaActual.dificultad = dif
    console.log(partidaActual.dificultad)
}

iniciarPartida("facil");

function iniciarPartida(dificultad) {
    console.log("Iniciando partida con dificultad:", dificultad);
    console.log(difi[dificultad]);

    aparicionRecur(difi[dificultad].ratioAparicion, difi[dificultad].velocidadMax, 50);
}

function aparicionRecur(ratioAparicion, velocidadMax, cantidad) {
    
    // Lógica para la aparición de paracaidistas de manera recursiva

    if(cantidad != 0) {
        console.log("Aparece el paracaidista numero:", cantidad);
        
        let velocidadCaida = randomVelocidad(velocidadMax, velocidadMax + 20);
        
        aparicion(velocidadCaida, cantidad);

        setTimeout(() => {
            aparicionRecur(ratioAparicion, velocidadMax, cantidad - 1);
        }, ratioAparicion);
    }

}

function aparicion(velocidadCaida, id) {
    // Lógica para la aparición de paracaidistas

    console.log("Aparece el paracaidista a velocidad:", velocidadMax);

    const escenario = document.querySelector("#personajes");

    const xParaca = xAleatorio();

    console.log("Aparece el paracaidista a velocidad:", velocidadCaida, " en la posición X:", xParaca);

    let html = `
        <img style="left: ${xParaca}px;" id="p${id}" src="img/cayendo.gif" alt="" aria-hidden="true">
    `;
    escenario.innerHTML += html;

    let cayendo = true;
    let activo = true;

    let caida = setInterval(() => {

        let paracaidista = escenario.querySelector("#p"+id);
        let posicionActual = parseInt(paracaidista.style.top) || 0;

        paracaidista.style.top = (posicionActual + 10) + "px";

        function salvar() {
            if(!activo) return;
            cayendo = false;
            paracaidista.src = "img/paracaidas.gif";
        }

        paracaidista.addEventListener("click", salvar);

        if(posicionActual >= escenario.offsetHeight - 140) {
            activo = false;
            clearInterval(caida);
            paracaidista.removeEventListener("click", salvar);   

            if(cayendo) {
                paracaidista.src = "img/estrellado.gif";
            } else {
                paracaidista.src = "img/salvado.gif";
            }

            console.log("El paracaidista ha llegado al suelo.");
        }

    }, velocidadCaida);

}

function randomVelocidad(velocidadMax, velocidadMin) {
    // Devuleve un número aleatorio entre velocidadMin y velocidadMax
    // Devulve la velocidad a la que caerá el paracaidista

    let randomVelocidad = Math.floor(Math.random() * (velocidadMax - velocidadMin + 1)) + velocidadMin;

    return randomVelocidad;
}

function habilitarBotones(){
    panelInicio.classList.add("aparecer");
    dificultad.disabled = false;
    verPartidas.disabled = false;
}
function xAleatorio() {
    // Devuelve un número aleatorio entre 0 y el ancho del escenario

    const escenario = document.querySelector("#escenario");
    const anchoEscenario = escenario.offsetWidth;
    
    let randomX = Math.floor(Math.random() * anchoEscenario);

    return randomX;

}
