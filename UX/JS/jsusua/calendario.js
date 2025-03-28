    let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
    let fechaActual = new Date();
    let mesActual = fechaActual.getMonth();
    let añoActual = fechaActual.getFullYear();
    let minutaActual = "";

    function cambiarMes(cambio) {
        mesActual += cambio;
        if (mesActual < 0) {
            mesActual = 11;
            añoActual--;
        } else if (mesActual > 11) {
            mesActual = 0;
            añoActual++;
        }
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

                    if (reunion.estado === "Pendiente") {
                        divDia.classList.add("reunion-pendiente");
                    } else if (reunion.estado === "Confirmada") {
                        divDia.classList.add("reunion-confirmada");
                    } else if (reunion.estado === "Cancelada") {
                        divDia.classList.add("reunion-cancelada");
                    }

                    divDia.appendChild(reunionDiv);
                });
            }

            calendario.appendChild(divDia);
        }
    }

    function abrirModal(fecha) {
        let detalles = "";
        let reunionEncontrada = reuniones.find(r => r.fecha === fecha);

        if (reunionEncontrada) {
            detalles = `<strong>Título:</strong> ${reunionEncontrada.titulo} <br>
                        <strong>Fecha:</strong> ${reunionEncontrada.fecha} <br>
                        <strong>Estado:</strong> ${reunionEncontrada.estado} <br><br>`;
            minutaActual = reunionEncontrada.minuta || "";

            let btnMinuta = document.getElementById("btn-minuta");
            let divMinuta = document.getElementById("minuta-texto");

            if (reunionEncontrada.estado !== "Cancelada" && minutaActual) {
                btnMinuta.style.display = "block";
                divMinuta.style.display = "none";
            } else {
                btnMinuta.style.display = "none";
            }
        }

        document.getElementById("modal-detalle").innerHTML = detalles;
        document.getElementById("modal").style.display = "flex";
    }

    function mostrarMinuta() {
        document.getElementById("minuta-texto").innerText = minutaActual;
        document.getElementById("minuta-texto").style.display = "block";
    }

    // Función para redirigir al perfil del usuario
    function volverAlPerfil() {
        window.location.href = "indexusua.html";  // Cambia a la URL de tu página de perfil
    }

    document.addEventListener("DOMContentLoaded", mostrarCalendario);
