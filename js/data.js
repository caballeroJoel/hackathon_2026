/* DATOS */

// let usuario = "";

export let partidaActual = {
    user: "",
    dificultad: "medio",
    fechaPartida: "",
    salvados: 0,
    muertos: 0,
}

export const difi = {
    facil: {
        ratioAparicion: 2000,
        velocidadMax: 50,   
    },
    normal: {
        ratioAparicion: 1000,
        velocidadMax: 20,
    },
    dificil: {
        ratioAparicion: 500,
        velocidadMax: 10,   
    }
}


// Array donde almacenamos las partidas del historial
// Empieza vacío porque todavía no hemos cargado ninguna partida
// Hay una funcion que se llama PushHistroial que guardara los datos en el array de historial
export let historial = [];