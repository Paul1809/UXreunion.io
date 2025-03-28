let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];

document.addEventListener("DOMContentLoaded", mostrarReuniones);

function mostrarReuniones() {
    let listaReuniones = document.getElementById("lista-reuniones");
    listaReuniones.innerHTML = "";

    reuniones.forEach((reunion, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${reunion.id}</td>
            <td>${reunion.titulo}</td>
            <td>${reunion.fecha}</td>
            <td>
                <button onclick="verAcuerdos(${index})">📑 Ver</button>
            </td>
        `;
        listaReuniones.appendChild(fila);
    });
}

function verAcuerdos(index) {
    let acuerdosTexto = reuniones[index].acuerdos || "No hay acuerdos registrados.";

    // Mostrar el acuerdo en un párrafo en lugar de un campo editable
    document.getElementById("acuerdosTexto").textContent = acuerdosTexto;
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}
