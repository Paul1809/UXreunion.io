function mostrarComentarios() {
    let lista = document.getElementById("lista-comentarios");
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];

    if (comentarios.length === 0) {
        lista.innerHTML = "<p>No hay comentarios registrados.</p>";
        return;
    }

    lista.innerHTML = "";
    comentarios.forEach((comentario, index) => {
        let div = document.createElement("div");
        div.classList.add("comentario-box");

        let texto = document.createElement("span");
        texto.textContent = `${comentario}`;

        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = () => eliminarComentario(index);

        div.appendChild(texto);
        div.appendChild(botonEliminar);
        lista.appendChild(div);
    });
}

function eliminarComentario(index) {
    let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentarios.splice(index, 1);  // Eliminar el comentario
    localStorage.setItem("comentarios", JSON.stringify(comentarios));

    mostrarComentarios();
}

window.onload = mostrarComentarios;
