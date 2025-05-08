async function cargarCategoriasConSubcategorias() {
    const contenedor = document.getElementById('menu-categorias');
  
    try {
      const res = await fetch('/api/categorias/con-subcategorias');
      const categorias = await res.json();
  
      categorias.forEach(cat => {
        const contenedorCategoria = document.createElement('div');
        contenedorCategoria.classList.add('categoria');
  
        // Botón para la categoría
        const btn = document.createElement('button');
        btn.textContent = cat.nombre;
        btn.dataset.target = `cat-${cat.id}`;
        btn.classList.add('toggle-subcategorias');
  
        // Lista de subcategorías
        const ul = document.createElement('ul');
        ul.id = `cat-${cat.id}`;
        ul.style.display = 'none';
  
        cat.subcategorias.forEach(sub => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = '#';
          a.textContent = `${sub.nombre} (${sub.cantidad})`;
          a.onclick = () => {
            cargarProductosPorSubcategoria(sub.id);
            return false;
          };
          li.appendChild(a);
          ul.appendChild(li);
        });
  
        contenedorCategoria.appendChild(btn);
        contenedorCategoria.appendChild(ul);
        contenedor.appendChild(contenedorCategoria);
      });
  
      // Lógica de colapso simple
      document.querySelectorAll('.toggle-subcategorias').forEach(btn => {
        btn.addEventListener('click', () => {
          const ul = document.getElementById(btn.dataset.target);
          ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
        });
      });
  
    } catch (error) {
      console.error('Error cargando categorías:', error);
      contenedor.innerHTML = '<p style="color:red;">Error al cargar menú de categorías.</p>';
    }
  }
  
  // Ejecutar al cargar la página
  document.addEventListener('DOMContentLoaded', cargarCategoriasConSubcategorias);
  