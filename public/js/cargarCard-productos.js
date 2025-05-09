// Muestra un mensaje de carga mientras se obtienen los productos
function mostrarLoader() {
  const contenedor = document.getElementById('contenedor-productos');
  contenedor.innerHTML = '<p style="text-align:center;">Cargando productos...</p>';
}

// Renderiza la tarjeta del producto desde la plantilla HTML
async function renderProductCard(producto) {
  const res = await fetch('/components/product-card.html');
  let template = await res.text();

  const imagen = producto.imagen_url && producto.imagen_url.trim() !== ''
    ? producto.imagen_url
    : 'https://via.placeholder.com/200x150?text=Sin+Imagen';
  //Deinir las unidades
  const unidad = producto.unidad === 1 ? 'Metro' : 'Unidad';
  const precioFormateado = parseInt(producto.precio).toLocaleString('es-CO');

  template = template
    .replace(/{{imagen_url}}/g, imagen)
    .replace(/{{nombre_producto}}/g, producto.nombre)
    .replace(/{{precio}}/g, precioFormateado)
    .replace(/{{unidad}}/g, unidad)
    .replace(/{{etiqueta_texto}}/g, producto.enLiquidacion ? 'Liquidación' : '')
    .replace(/{{etiqueta_clase}}/g, producto.enLiquidacion ? '' : 'hidden');

  document.getElementById('contenedor-productos')
    .insertAdjacentHTML('beforeend', template);
}

// Lógica para cargar los productos según la subcategoría seleccionada
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
      await renderProductCard(producto);
    }

  } catch (error) {
    console.error('Error al cargar productos:', error);
    document.getElementById('contenedor-productos').innerHTML =
      '<p style="text-align:center;color:red;">No se pudieron cargar los productos.</p>';
  }
}
