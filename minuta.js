
    let minutas = JSON.parse(localStorage.getItem("minutas")) || [];

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

    // Función para regresar al perfil
    function regresarAlPerfil() {
        window.location.href = 'indexusua.html'; // Cambia 'perfil.html' por la URL de tu página de perfil
    }

    document.addEventListener("DOMContentLoaded", mostrarMinutas);
