
import { partidaActual, historial } from "./data.js";

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

