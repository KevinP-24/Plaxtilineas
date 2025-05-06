document.addEventListener('DOMContentLoaded', async () => {
    const contenedor = document.getElementById('categoriasDestacadas');
  
    try {
      const res = await fetch('/api/categorias');
      const categorias = await res.json();
  
      categorias.forEach(c => {
        const card = document.createElement('div');
        card.classList.add('categoria-card');
        card.innerHTML = `
          <a href="/productos.html?categoria=${c.id}">
            <img src="${c.icono_url}" alt="${c.nombre}" />
            <p>${c.nombre}</p>
          </a>
        `;
        contenedor.appendChild(card);
      });
    } catch (err) {
      console.error('❌ Error al cargar categorías en index:', err);
    }
  });
  