// Función para crear una cuenta (registro)
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Comprobar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        alert("⚠️ Ya existe una cuenta con ese correo.");
        return;
    }

    // Crear un nuevo usuario con el correo y la contraseña
    const newUser = {
        email,
        password,
        isAdmin: false, // Por defecto, no es administrador
    };

    // Guardar el nuevo usuario
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Guardar el correo del usuario logueado para redirigirlo a su perfil
    localStorage.setItem("currentUser", email);

    alert("✔️ Cuenta creada con éxito.");
    window.location.href = "perfilusuario.html"; // Redirige al perfil de usuario
});
