import { partidaActual } from "./data.js"

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