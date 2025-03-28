document.addEventListener("DOMContentLoaded", function () {
    let reuniones = JSON.parse(localStorage.getItem("reuniones")) || [];
    mostrarReuniones();

    window.agendarReunion = function () {
        let titulo = document.getElementById("titulo").value;
        let fecha = document.getElementById("fecha").value;

        if (titulo.trim() === "" || fecha.trim() === "") {
            alert("Por favor, ingrese un título y una fecha.");
            return;
        }

        let nuevaReunion = {
            id: reuniones.length + 1,
            titulo: titulo,
            fecha: fecha,
            estado: "Pendiente"
        };

        reuniones.push(nuevaReunion);
        localStorage.setItem("reuniones", JSON.stringify(reuniones));

        document.getElementById("titulo").value = "";
        document.getElementById("fecha").value = "";

        mostrarReuniones();
    };

    function mostrarReuniones() {
        let listaReuniones = document.getElementById("lista-reuniones");
        listaReuniones.innerHTML = "";

        reuniones.forEach((reunion, index) => {
            let fila = document.createElement("tr");
            fila.className = reunion.estado === "Cancelada" ? "cancelada" : 
                             reunion.estado === "Confirmada" ? "confirmada" : "";

            fila.innerHTML = `
                <td>${reunion.id}</td>
                <td><input type="text" value="${reunion.titulo}" onchange="actualizarReunion(${index}, this.value, 'titulo')"></td>
                <td><input type="date" value="${reunion.fecha}" onchange="actualizarReunion(${index}, this.value, 'fecha')"></td>
                <td>${reunion.estado}</td>
                <td>
                    <button class="confirmar" onclick="confirmarReunion(${index})">Confirmar</button>
                    <button class="cancelar" onclick="cancelarReunion(${index})">Cancelar</button>
                    <button onclick="eliminarReunion(${index})">Eliminar</button>
                </td>
            `;
            listaReuniones.appendChild(fila);
        });
    }

    window.actualizarReunion = function (index, valor, campo) {
        reuniones[index][campo] = valor;
        localStorage.setItem("reuniones", JSON.stringify(reuniones));
        mostrarReuniones();
    };

    window.confirmarReunion = function (index) {
        if (confirm("¿Deseas confirmar esta reunión?")) {
            reuniones[index].estado = "Confirmada";
            localStorage.setItem("reuniones", JSON.stringify(reuniones));
            mostrarReuniones();
        }
    };

    window.cancelarReunion = function (index) {
        if (confirm("¿Seguro que deseas cancelar esta reunión?")) {
            reuniones[index].estado = "Cancelada";
            localStorage.setItem("reuniones", JSON.stringify(reuniones));
            mostrarReuniones();
        }
    };

    window.eliminarReunion = function (index) {
        if (confirm("¿Seguro que deseas eliminar esta reunión?")) {
            reuniones.splice(index, 1);
            localStorage.setItem("reuniones", JSON.stringify(reuniones));
            mostrarReuniones();
        }
    };
});
