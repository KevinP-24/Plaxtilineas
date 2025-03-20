// Cargar el footer dinámicamente en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
    fetch("components/footer.html") // Cargar el footer desde la carpeta components
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data); // Insertarlo al final del body
        })
        .catch(error => console.error("Error cargando el footer:", error));
});
