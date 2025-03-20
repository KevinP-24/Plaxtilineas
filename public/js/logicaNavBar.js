document.querySelector('.menu-toggle').addEventListener('click', function () {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('show');
});

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        navbar.classList.toggle("active");
    });
});
