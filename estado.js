// Función de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Guardar el correo del usuario logueado en sessionStorage
        sessionStorage.setItem("loggedInEmail", user.email);

        if (user.isAdmin) {
            window.location.href = "perfiladmin.html"; // Redirigir al perfil de administrador
        } else {
            window.location.href = "perfilusuario.html"; // Redirigir al perfil de usuario
        }
    } else {
        alert("⚠️ Credenciales incorrectas.");
    }
});
