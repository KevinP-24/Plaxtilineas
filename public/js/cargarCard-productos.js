async function renderProductCard(producto) {
  const res = await fetch('/components/product-card.html');
  let template = await res.text();

  const imagen = producto.imagen_url && producto.imagen_url.trim() !== ''
    ? producto.imagen_url
    : 'https://via.placeholder.com/200x150?text=Sin+Imagen';
  
  const unidad = producto.unidad === 1 ? 'Metro' : 'Unidad';
  const precioFormateado = parseInt(producto.precio).toLocaleString('es-CO');

  template = template
    .replace(/{{imagen_url}}/g, imagen)
    .replace(/{{nombre_producto}}/g, producto.nombre)
    .replace(/{{precio}}/g, precioFormateado)
    .replace(/{{unidad}}/g, unidad)
    .replace(/{{descripcion}}/g, producto.descripcion || 'Sin descripción disponible') // 🔴 ESTA LÍNEA FALTABA
    .replace(/{{etiqueta_texto}}/g, producto.enLiquidacion ? 'Liquidación' : '')
    .replace(/{{etiqueta_clase}}/g, producto.enLiquidacion ? '' : 'hidden');

  template = template.replace(
    /<button class="select-btn">Seleccionar opciones<\/button>/,
    `<button class="info-btn"
      data-nombre="${producto.nombre}"
      data-precio="${precioFormateado}"
      data-descripcion="${producto.descripcion || 'Sin descripción disponible'}"
      data-imagen="${imagen}"
      data-unidad="${unidad}">
      Más información
    </button>`
  );

  document.getElementById('contenedor-productos')
    .insertAdjacentHTML('beforeend', template);
}
