import {partidaActual, difi} from './data.js';

// console.log(partidaActual);
// console.log(difi);

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