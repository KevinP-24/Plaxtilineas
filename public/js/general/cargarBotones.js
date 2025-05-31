// Cargar la sección de botones en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
  fetch("components/botones.html")
    .then(response => response.text())
    .then(data => {
      // Insertar al final del body el HTML de botones
      document.body.insertAdjacentHTML("beforeend", data);

      // Ahora que el HTML ya está en el DOM, seleccionamos el botón de ayuda
      const helpMessage = document.getElementById('helpMessage');

      if (!helpMessage) {
        console.warn('⚠️ El elemento #helpMessage no fue encontrado en el DOM.');
        return;
      }

      // Función para mostrar y ocultar el mensaje con efecto suave
      function toggleHelpMessage() {
        helpMessage.classList.add('show');
        setTimeout(() => {
          helpMessage.classList.remove('show');
        }, 3000); // Mostrar por 3 segundos
      }

      // Repetir cada 5 segundos
      setInterval(toggleHelpMessage, 5000);
    })
    .catch(error => {
      console.error("❌ Error cargando los botones:", error);
    });
});
