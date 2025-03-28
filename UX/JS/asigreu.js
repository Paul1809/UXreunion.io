let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
let participantes = JSON.parse(localStorage.getItem("participantes")) || [];

document.addEventListener("DOMContentLoaded", mostrarReuniones);

function mostrarReuniones() {
    let listaReuniones = document.getElementById("lista-reuniones");
    listaReuniones.innerHTML = "";

    reuniones.forEach((reunion, index) => {
        let fila = document.createElement("tr");
        let participantesHtml = reunion.participantes ? reunion.participantes.join(", ") : "Ninguno";

        fila.innerHTML = `
            <td>${reunion.id}</td>
            <td>${reunion.titulo}</td>
            <td>${reunion.fecha}</td>
            <td>${participantesHtml}</td>
            <td>
                <select id="participante-${index}">
                    ${participantes.map(participante => `<option value="${participante}">${participante}</option>`).join("")}
                </select>
                <button onclick="asignarParticipante(${index})">Asignar</button>
            </td>
        `;
        listaReuniones.appendChild(fila);
    });
}

function agregarParticipante() {
    let nombre = document.getElementById("nombre-participante").value.trim();
    if (nombre === "") {
        alert("Ingrese un nombre válido.");
        return;
    }
    participantes.push(nombre);
    localStorage.setItem("participantes", JSON.stringify(participantes));
    document.getElementById("nombre-participante").value = "";
    mostrarReuniones();
}

function asignarParticipante(index) {
    let select = document.getElementById(`participante-${index}`);
    let participanteSeleccionado = select.value;

    if (!reuniones[index].participantes) {
        reuniones[index].participantes = [];
    }

    if (!reuniones[index].participantes.includes(participanteSeleccionado)) {
        reuniones[index].participantes.push(participanteSeleccionado);
        localStorage.setItem("reuniones", JSON.stringify(reuniones));
        mostrarReuniones();
    } else {
        alert("El participante ya está asignado a esta reunión.");
    }
}
