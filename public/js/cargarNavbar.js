const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

// Cargar la barra de navegación dinámicamente en todas las páginas
document.addEventListener("DOMContentLoaded", function () {
    fetch("components/navbar.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data); // Insertar navbar al inicio del body
  
        // ✅ Lógica del botón hamburguesa después de insertar el navbar
        const toggleButton = document.querySelector(".menu-toggle");
        const navbar = document.querySelector(".navbar");
  
        if (toggleButton && navbar) {
          toggleButton.addEventListener("click", function () {
            navbar.classList.toggle("active");
            const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
            toggleButton.setAttribute("aria-expanded", !isExpanded);
          });
  
          // Opcional: cerrar el menú al hacer clic en un enlace (móvil)
          navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
              navbar.classList.remove("active");
              toggleButton.setAttribute("aria-expanded", false);
            });
          });
        }
      })
      .catch(error => console.error("Error cargando la navegación:", error));
  });

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });