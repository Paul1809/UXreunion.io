
    function openModal() {
        document.getElementById("editModal").style.display = "flex";
    }

    function closeModal() {
        document.getElementById("editModal").style.display = "none";
    }

    function saveChanges() {
        let newName = document.getElementById("edit-name").value;
        let newLocation = document.getElementById("edit-location").value;

        document.getElementById("user-name").textContent = newName;
        document.getElementById("user-name-table").textContent = newName;
        document.getElementById("user-location").textContent = newLocation;

        closeModal();
        alert("Perfil actualizado correctamente.");
    }
