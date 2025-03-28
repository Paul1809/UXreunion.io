document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Obtener valores de los campos
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var role = document.querySelector('input[name="role"]:checked');

    if (!role) {
        alert("⚠️ Por favor, selecciona un rol antes de continuar.");
        return;
    }

    if (email && password) {
        if (role.value === "admin") {
            window.location.href = "../PAGES/perfiladmin.html";
        } else if (role.value === "usuario") {
            window.location.href = "../usuario/perfilusuario.html";
        }
    } else {
        alert("⚠️ Todos los campos son obligatorios.");
    }
});
