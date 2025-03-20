// Cargar la barra de navegación dinámicamente en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
    fetch("components/navbar.html") // Ruta del archivo navbar.html
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data); // Insertar al inicio del body
        })
        .catch(error => console.error("Error cargando la navegación:", error));
});
