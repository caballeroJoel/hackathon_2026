
import {  partidaActual  } from "./data.js";

export function diffi(){
    let dif = document.querySelector("#dificultad").value
    partidaActual.dificultad = dif
    console.log(partidaActual.dificultad)
}




