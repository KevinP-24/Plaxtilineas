document.addEventListener("valorAgreCargado", function () {
    console.log("🚀 Evento valorAgreCargado recibido, esperando que .seccion-valorAgre aparezca...");

    function insertarAliados() {
        const valorAgreSection = document.querySelector(".seccion-valorAgre");

        if (valorAgreSection) {
            console.log("✅ .seccion-valorAgre encontrada, cargando aliados.html...");

            fetch("components/aliados.html") // Ruta del archivo HTML
                .then(response => {
                    if (!response.ok) throw new Error("No se pudo cargar la sección de aliados.");
                    return response.text();
                })
                .then(data => {
                    valorAgreSection.insertAdjacentHTML("beforebegin", data); // 📌 Inserta antes de valores agregados
                    console.log("✅ Sección de aliados insertada correctamente antes de valores agregados.");
                })
                .catch(error => console.error("❌ Error cargando aliados.html:", error));
        } else {
            console.warn("⚠️ No se encontró '.seccion-valorAgre', reintentando en 500ms...");
            setTimeout(insertarAliados, 500); // Reintenta cada 500ms hasta encontrar la sección
        }
    }

    insertarAliados(); // Iniciar la espera para insertar aliados
});
