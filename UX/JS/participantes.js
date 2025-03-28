let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
let reunionSeleccionada = null;

document.addEventListener("DOMContentLoaded", mostrarReuniones);

function agendarReunion() {
    let titulo = document.getElementById("titulo").value;
    let fecha = document.getElementById("fecha").value;

    if (titulo.trim() === "" || fecha.trim() === "") {
        alert("Por favor, ingrese un título y una fecha para la reunión.");
        return;
    }

    let nuevaReunion = {
        id: reuniones.length + 1,
        titulo: titulo,
        fecha: fecha,
        estado: "Pendiente",
        participantes: []
    };

    reuniones.push(nuevaReunion);
    localStorage.setItem("reuniones", JSON.stringify(reuniones));

    document.getElementById("titulo").value = "";
    document.getElementById("fecha").value = "";

    mostrarReuniones();
}

function mostrarReuniones() {
    let listaReuniones = document.getElementById("lista-reuniones");
    listaReuniones.innerHTML = "";

    reuniones.forEach((reunion, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reunion.id}</td>
            <td><input type="text" value="${reunion.titulo}" onchange="actualizarReunion(${index}, this.value, 'titulo')"></td>
            <td><input type="date" value="${reunion.fecha}" onchange="actualizarReunion(${index}, this.value, 'fecha')"></td>
            <td>${reunion.estado}</td>
            <td>
                <button onclick="gestionarParticipantes(${index})">👥 Ver</button>
            </td>
            <td><button onclick="eliminarReunion(${index})" style="background-color:#d9534f;">Eliminar</button></td>
        `;
        listaReuniones.appendChild(fila);
    });
}

function actualizarReunion(index, valor, campo) {
    reuniones[index][campo] = valor;
    localStorage.setItem("reuniones", JSON.stringify(reuniones));
    mostrarReuniones();
}

function eliminarReunion(index) {
    if (confirm("¿Seguro que deseas eliminar esta reunión?")) {
        reuniones.splice(index, 1);
        localStorage.setItem("reuniones", JSON.stringify(reuniones));
        mostrarReuniones();
    }
}

function gestionarParticipantes(index) {
    reunionSeleccionada = index;
    document.getElementById("participantesInput").value = reuniones[index].participantes.join(", ");
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function guardarParticipantes() {
    let inputParticipantes = document.getElementById("participantesInput").value;
    reuniones[reunionSeleccionada].participantes = inputParticipantes.split(",").map(p => p.trim());
    localStorage.setItem("reuniones", JSON.stringify(reuniones));
    cerrarModal();
    mostrarReuniones();
}
