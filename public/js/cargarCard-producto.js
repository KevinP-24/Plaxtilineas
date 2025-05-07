// Muestra un loader mientras se carga contenido
function mostrarLoader() {
  const contenedor = document.getElementById('contenedor-productos');
  contenedor.innerHTML = '<p style="text-align:center;">Cargando productos...</p>';
}

// Renderiza la tarjeta del producto desde la plantilla
async function renderProductCard(producto) {
  const res = await fetch('/components/product-card.html');
  let template = await res.text();

  template = template
    .replace(/{{imagen_url}}/g, producto.imagen)
    .replace(/{{nombre_producto}}/g, producto.nombre)
    .replace(/{{precio}}/g, producto.precio)
    .replace(/{{unidad}}/g, producto.unidad)
    .replace(/{{etiqueta_texto}}/g, producto.enLiquidacion ? 'Liquidación' : '')
    .replace(/{{etiqueta_clase}}/g, producto.enLiquidacion ? '' : 'hidden');

  document.getElementById('contenedor-productos').innerHTML += template;
}

// Carga productos desde la base de datos según subcategoría
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

    productos.forEach(renderProductCard);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    document.getElementById('contenedor-productos').innerHTML =
      '<p style="text-align:center;color:red;">No se pudieron cargar los productos.</p>';
  }
}

// Puedes invocar esta función desde eventos de clic o al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const subcategoriaId = 1; // ⚠️ Cambia este valor según tu lógica
  cargarProductosPorSubcategoria(subcategoriaId);
});
