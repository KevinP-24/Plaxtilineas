// cargarModal.js
async function cargarModal() {
  try {
    console.log('🔄 Cargando HTML del modal...');
    const modalHTML = await fetch('/components/modal-producto.html');
    const modalContent = await modalHTML.text();

    console.log('✅ HTML del modal cargado. Insertando en el DOM...');
    document.body.insertAdjacentHTML('beforeend', modalContent);

    agregarEventosModal();
    console.log('📌 Eventos del modal agregados.');
  } catch (error) {
    console.error('❌ Error al cargar el modal:', error);
  }
}

function abrirModal(producto) {
  console.log('📥 Abriendo modal con producto:', producto);

  const unidad = parseInt(producto.cantidad) === 1 ? 'Metro' : 'Unidad';
  const precioFormateado = parseInt(producto.precio).toLocaleString('es-CO');

  document.getElementById('modal-nombre').textContent = producto.nombre;
  document.getElementById('modal-unidad-precio').textContent = `💰 ${unidad} $${precioFormateado}`;
  document.getElementById('modal-descripcion').textContent = producto.descripcion || 'Sin descripción disponible';
  document.getElementById('modal-imagen').src = producto.imagen_url && producto.imagen_url.trim() !== ''
    ? producto.imagen_url
    : 'https://via.placeholder.com/200x150?text=Sin+Imagen';

  document.getElementById('modal-producto').style.display = 'flex';
  console.log('✅ Modal mostrado.');
}

function cerrarModal() {
  console.log('🔒 Cerrando modal...');
  document.getElementById('modal-producto').style.display = 'none';
}

function agregarEventosModal() {
  const botonesInfo = document.querySelectorAll('.info-btn');
  console.log(`🎯 ${botonesInfo.length} botones "Más información" encontrados.`);

  botonesInfo.forEach((boton, index) => {
    boton.addEventListener('click', (e) => {
      console.log(`🖱️ Click en botón ${index + 1}`);

      const producto = {
        nombre: e.target.getAttribute('data-nombre'),
        precio: e.target.getAttribute('data-precio').replace(/[^\d]/g, ''),
        descripcion: e.target.getAttribute('data-descripcion'),
        imagen_url: e.target.getAttribute('data-imagen'),
        cantidad: e.target.getAttribute('data-unidad') === 'Metro' ? 1 : 0
      };

      abrirModal(producto);
    });
  });

  const cerrarModalBtn = document.getElementById('cerrar-modal');
  if (cerrarModalBtn) {
    cerrarModalBtn.addEventListener('click', cerrarModal);
    console.log('✅ Botón de cerrar modal listo.');
  }

  window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-producto')) {
      console.log('🖱️ Click fuera del modal');
      cerrarModal();
    }
  });
}

// Iniciar al cargar
cargarModal();
