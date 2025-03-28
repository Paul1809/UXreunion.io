let minutas = JSON.parse(localStorage.getItem("minutas")) || [];

function guardarMinuta() {
    let titulo = document.getElementById("titulo").value;
    let fecha = document.getElementById("fecha").value;
    let descripcion = document.getElementById("descripcion").value;

    if (titulo.trim() === "" || fecha.trim() === "" || descripcion.trim() === "") {
        alert("Todos los campos son obligatorios.");
        return;
    }

    let nuevaMinuta = {
        id: minutas.length + 1,
        titulo: titulo,
        fecha: fecha,
        descripcion: descripcion
    };

    minutas.push(nuevaMinuta);
    localStorage.setItem("minutas", JSON.stringify(minutas));
    document.getElementById("titulo").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("descripcion").value = "";
    mostrarMinutas();
}

function mostrarMinutas() {
    let listaMinutas = document.getElementById("lista-minutas");
    listaMinutas.innerHTML = "";

    minutas.forEach((minuta, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${minuta.id}</td>
            <td>${minuta.titulo}</td>
            <td>${minuta.fecha}</td>
            <td>
                <button onclick="verMinuta(${index})">📄 Ver</button>
                <button onclick="eliminarMinuta(${index})" style="background-color:#d9534f;">🗑 Eliminar</button>
            </td>
        `;
        listaMinutas.appendChild(fila);
    });
}

function verMinuta(index) {
    let minuta = minutas[index];
    document.getElementById("modal-detalle").innerHTML = ` 
        <strong>Título:</strong> ${minuta.titulo} <br>
        <strong>Fecha:</strong> ${minuta.fecha} <br>
        <strong>Resumen:</strong> ${minuta.descripcion}
    `;
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() {
    document.getElementById("modal").style.display = "none";
}

function eliminarMinuta(index) {
    if (confirm("¿Seguro que deseas eliminar esta minuta?")) {
        minutas.splice(index, 1);
        localStorage.setItem("minutas", JSON.stringify(minutas));
        mostrarMinutas();
    }
}

document.addEventListener("DOMContentLoaded", mostrarMinutas);
