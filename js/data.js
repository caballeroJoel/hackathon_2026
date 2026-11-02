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
    medio: {
        ratioAparicion: 1000,
        velocidadMax: 20,
    },
    dificil: {
        ratioAparicion: 500,
        velocidadMax: 10,   
    }
}