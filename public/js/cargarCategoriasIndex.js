async function cargarCategoriasDestacadas() {
  const contenedor = document.getElementById('categoriasDestacadas');

  try {
    const res = await fetch('/api/categorias'); // o /api/categorias/con-subcategorias
    const categorias = await res.json();

    categorias.forEach(cat => {
      const card = document.createElement('a');
      card.href = `productos.html?categoria_id=${cat.id}`;
      card.classList.add('categoria-card');
      card.innerHTML = `
        <div class="icono">
          <img src="${cat.icono_url}" alt="${cat.nombre}">
        </div>
        <h4>${cat.nombre}</h4>
      `;
      contenedor.appendChild(card);
    });
  } catch (err) {
    console.error('❌ Error cargando categorías destacadas:', err);
  }
}

document.addEventListener('DOMContentLoaded', cargarCategoriasDestacadas);
