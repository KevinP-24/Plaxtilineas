document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const form = document.getElementById('categoriaForm');
  const tabla = document.querySelector('#tablaCategorias tbody');

  if (!token) {
    alert('No autorizado');
    window.location.href = '/login.html';
    return;
  }

  // 🔄 Cargar Categorías
  async function cargarCategorias() {
    try {
      const res = await fetch('/api/categorias');
      const categorias = await res.json();
      tabla.innerHTML = '';
      categorias.forEach(c => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${c.id}</td>
          <td>
            <input type="text" value="${c.nombre}" data-id="${c.id}" class="input-nombre" />
          </td>
          <td>
            <img src="${c.icono_url}" width="30" height="30" />
            <label class="icono-label" title="Cambiar icono">
              🖉
              <input type="file" accept="image/*" style="display:none;" data-id="${c.id}" class="input-icono" />
            </label>
          </td>
          <td class="actions">
            <button class="edit" onclick="actualizarCategoria(${c.id})">Actualizar</button>
            <button class="delete" onclick="eliminarCategoria(${c.id})">Eliminar</button>
          </td>
        `;
        tabla.appendChild(fila);
      });
    } catch (err) {
      console.error('❌ Error al cargar categorías:', err);
    }
  }

  cargarCategorias();

  // ✅ Crear categoría con ícono
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreCategoria').value;
    const icono = document.getElementById('iconoCategoria').files[0];

    const formData = new FormData();
    formData.append('nombre', nombre);
    if (icono) formData.append('icono', icono);

    try {
      const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Categoría creada');
        form.reset();
        cargarCategorias();
      } else {
        alert(data.error || 'Error al crear categoría');
      }
    } catch (err) {
      console.error('❌ Error al crear categoría:', err);
    }
  });

  // 🧨 Eliminar categoría
  window.eliminarCategoria = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return;

    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('✅ Categoría eliminada');
        cargarCategorias();
      } else {
        alert('❌ No se pudo eliminar');
      }
    } catch (err) {
      console.error('❌ Error al eliminar:', err);
    }
  };

  // ✏️ Editar nombre de categoría
  window.actualizarCategoria = async (id) => {
    const nombreInput = document.querySelector(`input.input-nombre[data-id="${id}"]`);
    const iconoInput = document.querySelector(`input.input-icono[data-id="${id}"]`);
    const nuevoNombre = nombreInput.value.trim();
    const nuevoIcono = iconoInput.files[0];
  
    if (!nuevoNombre) return alert('El nombre no puede estar vacío');
  
    const formData = new FormData();
    formData.append('nombre', nuevoNombre);
    if (nuevoIcono) formData.append('icono', nuevoIcono);
  
    try {
      const res = await fetch(`/api/categorias/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
  
      const data = await res.json();
      if (res.ok) {
        alert('✅ Categoría actualizada');
        cargarCategorias();
      } else {
        alert(data.error || '❌ Error al actualizar');
      }
    } catch (err) {
      console.error('❌ Error al actualizar categoría:', err);
    }
  };
});
