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
                <button class="btn-ver" onclick="verAcuerdos(${index})">📑 Ver</button>
            </td>
        `;
        listaReuniones.appendChild(fila);
    });
}

function verAcuerdos(index) {
    let modalContenido = document.getElementById("acuerdosContenido");
    
    // Mostrar el seguimiento de acuerdos solo como texto (sin edición)
    modalContenido.textContent = reuniones[index].acuerdos || "No hay acuerdos registrados.";
    
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}
