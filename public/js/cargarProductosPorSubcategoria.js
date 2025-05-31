function mostrarLoader() {
  const contenedor = document.getElementById('contenedor-productos');
  contenedor.innerHTML = '<p style="text-align:center;">Cargando productos...</p>';
}

async function cargarProductosPorSubcategoria(subcategoriaId) {
  mostrarLoader();

  try {
    const response = await fetch(`/api/productos?subcategoria_id=${subcategoriaId}`);
    if (!response.ok) throw new Error('Error de red o servidor');

    const productos = await response.json();
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
      contenedor.innerHTML = '<p style="text-align:center;">No hay productos disponibles para esta subcategoría.</p>';
      return;
    }

    for (const producto of productos) {
      await renderProductCard(producto); // Usa la función que ya tienes
    }

    // ✅ Una vez cargadas todas las tarjetas, conectar el modal con los botones
    if (typeof agregarEventosModal === 'function') {
      agregarEventosModal();
      console.log('🔁 Eventos del modal re-asignados tras cargar tarjetas.');
    }

  } catch (error) {
    console.error('Error al cargar productos:', error);
    document.getElementById('contenedor-productos').innerHTML =
      '<p style="color:red; text-align:center;">Error cargando productos.</p>';
  }
}
