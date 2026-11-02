import {  partidaActual  } from "./data.js";

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

iniciarPartida("dificil");

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
        
        aparicion(ratioAparicion, velocidadCaida);

        setTimeout(() => {
            aparicionRecur(ratioAparicion, velocidadMax, cantidad - 1);
        }, ratioAparicion);
    }

}

function aparicion(ratioAparicion, velocidadMax) {
    // Lógica para la aparición de paracaidistas

    console.log("Aparece el paracaidista a velocidad:", velocidadMax);

    

}

function randomVelocidad(velocidadMax, velocidadMin) {
    // Devuleve un número aleatorio entre velocidadMin y velocidadMax
    // Devulve la velocidad a la que caerá el paracaidista

    let randomVelocidad = Math.floor(Math.random() * (velocidadMax - velocidadMin + 1)) + velocidadMin;

    return randomVelocidad;
}
