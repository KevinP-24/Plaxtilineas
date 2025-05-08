document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Cargar dinámicamente el navbar
    fetch("components/navbar.html")
      .then(response => response.text())
      .then(data => {
        document.body.insertAdjacentHTML("afterbegin", data);
  
        // 2️⃣ Esperar a que el HTML del navbar esté insertado y luego seleccionar los elementos
        const menuToggle = document.querySelector(".menu-toggle");
        const navbar = document.querySelector(".navbar");
  
        if (menuToggle && navbar) {
          // Botón hamburguesa
          menuToggle.addEventListener("click", () => {
            const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", !isExpanded);
            navbar.classList.toggle("active");
          });
  
          // Opcional: cerrar menú al hacer clic en cualquier enlace (para móvil)
          navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
              navbar.classList.remove("active");
              menuToggle.setAttribute("aria-expanded", "false");
            });
          });
        }
      })
      .catch(error => console.error("Error cargando la navegación:", error));
  });
  