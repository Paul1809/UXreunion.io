// Función para crear una cuenta (registro)
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value; // Obtenemos el nombre
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Comprobar si el correo ya está registrado
    if (users.some(user => user.email === email)) {
        alert("⚠️ Ya existe una cuenta con ese correo.");
        return;
    }

    // Crear un nuevo usuario con el nombre, correo y la contraseña
    const newUser = {
        name,
        email,
        password,
        isAdmin: false, // Por defecto, no es administrador
    };

    // Guardar el nuevo usuario
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✔️ Cuenta creada con éxito.");

    // Mostrar el perfil del usuario después de crear la cuenta
    showUserProfile(newUser); // Llamamos a la función que muestra el perfil
});

// Función para mostrar el perfil del usuario después del registro
function showUserProfile(user) {
    // Mostrar el contenedor del perfil
    document.getElementById("user-profile").style.display = "block";

    // Mostrar los datos del usuario en el perfil
    document.getElementById("userName").textContent = `Nombre: ${user.name}`;
    document.getElementById("userEmail").textContent = `Correo: ${user.email}`;
}

// Función para cerrar sesión
function logout() {
    // Limpiar los datos del usuario en la sesión
    sessionStorage.removeItem("loggedInEmail"); // Eliminar el correo del usuario logueado
    window.location.href = "login.html"; // Redirigir al inicio de sesión
}
