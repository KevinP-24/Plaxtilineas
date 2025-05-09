const params = new URLSearchParams(window.location.search);
const categoriaIdSeleccionada = parseInt(params.get('categoria_id'));


async function cargarCategoriasConSubcategorias() {
  const contenedor = document.getElementById('menu-categorias');

  try {
    const res = await fetch('/api/categorias/con-subcategorias');
    const categorias = await res.json();

    categorias.forEach(cat => {
      const contenedorCategoria = document.createElement('div');
      contenedorCategoria.classList.add('categoria');

      // Crear lista de subcategorías
      const ul = document.createElement('ul');
      ul.id = `cat-${cat.id}`;
      ul.classList.add('subcategorias');
      ul.style.height = '0px';
      ul.style.overflow = 'hidden';
      ul.style.transition = 'height 0.3s ease';

      // Subcategorías internas
      cat.subcategorias.forEach(sub => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = `${sub.nombre} (${sub.cantidad})`;
        span.classList.add('subcat-item');
        span.onclick = () => cargarProductosPorSubcategoria(sub.id);
        li.appendChild(span);
        ul.appendChild(li);
      });

      // Crear botón con flecha
      const btn = document.createElement('button');
      btn.classList.add('toggle-subcategorias');
      btn.dataset.target = `cat-${cat.id}`;
      btn.innerHTML = `
        ${cat.nombre}
        <span class="flecha">▸</span>
      `;

      // Agregar elementos al contenedor de categoría
      contenedorCategoria.appendChild(btn);
      contenedorCategoria.appendChild(ul);
      contenedor.appendChild(contenedorCategoria);

      // Desplegar automáticamente si coincide con la categoría seleccionada
      if (categoriaIdSeleccionada && categoriaIdSeleccionada === cat.id) {
        ul.style.height = ul.scrollHeight + 'px';
        ul.classList.add('abierta');
        const flecha = btn.querySelector('.flecha');
        if (flecha) flecha.classList.add('abierta');
        ul.addEventListener('transitionend', () => {
          ul.style.height = 'auto';
        }, { once: true });
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    // Activar lógica de toggle + animación de flecha
    document.querySelectorAll('.toggle-subcategorias').forEach(btn => {
      btn.addEventListener('click', () => {
        const ul = document.getElementById(btn.dataset.target);
        const flecha = btn.querySelector('.flecha');
        const isOpen = ul.classList.contains('abierta');

        if (isOpen) {
          ul.style.height = ul.scrollHeight + 'px';
          requestAnimationFrame(() => {
            ul.style.height = '0px';
            ul.classList.remove('abierta');
            flecha.classList.remove('abierta');
          });
        } else {
          ul.style.height = ul.scrollHeight + 'px';
          ul.classList.add('abierta');
          flecha.classList.add('abierta');

          ul.addEventListener('transitionend', () => {
            if (ul.classList.contains('abierta')) {
              ul.style.height = 'auto';
            }
          }, { once: true });
        }
      });
    });

  } catch (error) {
    console.error('Error cargando categorías:', error);
    contenedor.innerHTML = '<p style="color:red;">Error al cargar menú de categorías.</p>';
  }
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', cargarCategoriasConSubcategorias);
