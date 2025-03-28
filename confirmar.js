
    let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
    let asistencias = JSON.parse(localStorage.getItem("asistencias")) || {}; 

    document.addEventListener("DOMContentLoaded", mostrarReuniones);

    function mostrarReuniones() {
        let listaReuniones = document.getElementById("lista-reuniones");
        listaReuniones.innerHTML = "";

        reuniones.forEach((reunion, index) => {
            let confirmada = asistencias[reunion.id] || false;
            let fila = document.createElement("tr");
            fila.className = confirmada ? "confirmado" : "";

            fila.innerHTML = `
                <td>${reunion.id}</td>
                <td>${reunion.titulo}</td>
                <td>${reunion.fecha}</td>
                <td>${confirmada ? "✅ Confirmado" : "Pendiente"}</td>
                <td>
                    <button class="btn-confirmar" onclick="confirmarAsistencia(${reunion.id})" ${confirmada ? "disabled" : ""}>
                        ${confirmada ? "Asistirás" : "Confirmar"}
                    </button>
                </td>
            `;
            listaReuniones.appendChild(fila);
        });
    }

    function confirmarAsistencia(id) {
        if (confirm("¿Seguro que deseas confirmar tu asistencia a esta reunión?")) {
            asistencias[id] = true;
            localStorage.setItem("asistencias", JSON.stringify(asistencias));
            mostrarReuniones();
        }
    }

    // Función para regresar al perfil
    function regresarAlPerfil() {
        window.location.href = 'indexusua.html'; // Cambia 'perfil.html' por la URL de tu página de perfil
    }
