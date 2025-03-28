
    function agregarComentario() {
        let comentario = document.getElementById("comentario").value;

        if (comentario === "") {
            alert("Por favor, escribe un comentario.");
            return;
        }

        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push(comentario);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        alert("Comentario agregado con éxito.");
        document.getElementById("comentario").value = "";  // Limpiar el campo
    }

