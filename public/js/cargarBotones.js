// Cargar la sección de botones en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
    fetch("components/botones.html") // Ruta del archivo botones.html
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("beforeend", data); // Insertar al final del body
        })
        .catch(error => console.error("Error cargando los botones:", error));
});
// Seleccionamos el elemento del mensaje emergente
const helpMessage = document.getElementById('helpMessage');

// Función para mostrar y ocultar el mensaje
function toggleHelpMessage() {
    // Mostrar el mensaje
    helpMessage.classList.add('show');

    // Ocultar el mensaje después de 4 segundos
    setTimeout(() => {
        helpMessage.classList.remove('show');
    }, 2000);
}
// Repetir cada 5 segundos
setInterval(toggleHelpMessage, 5000);
