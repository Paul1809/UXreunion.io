let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
let fechaActual = new Date();
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();
let reunionActual = null;

function cambiarMes(cambio) {
    mesActual += cambio;
    if (mesActual < 0) { mesActual = 11; añoActual--; }
    else if (mesActual > 11) { mesActual = 0; añoActual++; }
    mostrarCalendario();
}

function mostrarCalendario() {
    let calendario = document.getElementById("calendario");
    let mesNombre = document.getElementById("mes-actual");
    let nombresMeses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    mesNombre.innerText = `${nombresMeses[mesActual]} ${añoActual}`;

    calendario.innerHTML = "";
    let primerDia = new Date(añoActual, mesActual, 1).getDay();
    let diasEnMes = new Date(añoActual, mesActual + 1, 0).getDate();

    for (let i = 0; i < primerDia; i++) {
        let diaVacio = document.createElement("div");
        diaVacio.classList.add("day");
        calendario.appendChild(diaVacio);
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
        let divDia = document.createElement("div");
        divDia.classList.add("day");
        divDia.innerText = dia;

        let fechaString = `${añoActual}-${(mesActual + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
        let reunionesDia = reuniones.filter(r => r.fecha === fechaString);

        if (reunionesDia.length > 0) {
            divDia.addEventListener("click", () => abrirModal(fechaString));

            reunionesDia.forEach(reunion => {
                let reunionDiv = document.createElement("div");
                reunionDiv.innerText = reunion.titulo;

                if (reunion.estado === "Pendiente") divDia.classList.add("reunion-pendiente");
                else if (reunion.estado === "Confirmada") divDia.classList.add("reunion-confirmada");
                else if (reunion.estado === "Cancelada") divDia.classList.add("reunion-cancelada");

                divDia.appendChild(reunionDiv);
            });
        } else {
            divDia.innerHTML = `${dia}<br><small>No hay reuniones</small>`;
        }

        calendario.appendChild(divDia);
    }
    document.getElementById("mes-anterior").disabled = (mesActual === 0);
    document.getElementById("mes-siguiente").disabled = (mesActual === 11);
}

function abrirModal(fecha) {
    reunionActual = reuniones.find(r => r.fecha === fecha);
    document.getElementById("modal-detalle").innerHTML = reunionActual ? `<strong>Título:</strong> ${reunionActual.titulo} <br> <strong>Fecha:</strong> ${reunionActual.fecha} <br> <strong>Estado:</strong> ${reunionActual.estado}` : "No hay reuniones este día.";
    document.getElementById("minuta-text").value = reunionActual?.minuta || "";

    document.getElementById("minuta-container").style.display = reunionActual?.estado === "Cancelada" ? "none" : "block";
    document.getElementById("estado-reunion").value = reunionActual?.estado || "Pendiente";
    document.getElementById("modal").style.display = "flex";
}

function cerrarModal() { document.getElementById("modal").style.display = "none"; }

function guardarMinuta() {
    reunionActual.minuta = document.getElementById("minuta-text").value;
    localStorage.setItem("reuniones", JSON.stringify(reuniones));
    alert("Minuta guardada correctamente.");
    cerrarModal();
}

function cambiarEstadoReunion() {
    if (reunionActual) {
        reunionActual.estado = document.getElementById("estado-reunion").value;
        localStorage.setItem("reuniones", JSON.stringify(reuniones));
        mostrarCalendario();
    }
}

document.addEventListener("DOMContentLoaded", mostrarCalendario);
