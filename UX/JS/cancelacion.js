let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];

document.addEventListener("DOMContentLoaded", mostrarReuniones);

function mostrarReuniones() {
    let listaReuniones = document.getElementById("lista-reuniones");
    listaReuniones.innerHTML = "";

    reuniones.forEach((reunion, index) => {
        let fila = document.createElement("tr");
        fila.className = reunion.estado === "Cancelada" ? "cancelada" : reunion.estado === "Confirmada" ? "confirmada" : "";

        fila.innerHTML = `
            <td>${reunion.id}</td>
            <td>${reunion.titulo}</td>
            <td>${reunion.fecha}</td>
            <td>${reunion.estado}</td>
            <td>
                ${reunion.estado === "Pendiente" ? `  
                    <button class="btn-confirmar" onclick="cambiarEstado(${index}, 'Confirmada')">✅ Confirmar</button>
                    <button class="btn-cancelar" onclick="cambiarEstado(${index}, 'Cancelada')">❌ Cancelar</button>
                ` : reunion.estado === "Confirmada" ? "✅ Confirmada" : "❌ Cancelada" }
            </td>
        `;
        listaReuniones.appendChild(fila);
    });
}

function cambiarEstado(index, nuevoEstado) {
    if (confirm(`¿Seguro que deseas marcar esta reunión como "${nuevoEstado}"?`)) {
        reuniones[index].estado = nuevoEstado;
        localStorage.setItem("reuniones", JSON.stringify(reuniones));
        mostrarReuniones();
    }
}
