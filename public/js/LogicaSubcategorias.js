document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const form = document.getElementById('formSubcategoria');
    const selectCategoria = document.getElementById('selectCategoria');
    const tabla = document.getElementById('tablaSubcategorias');
    let categoriasDisponibles = [];
  
    if (!token) {
      alert('No autorizado');
      window.location.href = '/login.html';
      return;
    }
  
    // 🔄 Cargar categorías para el <select>
    async function cargarCategorias() {
      try {
        const res = await fetch('/api/categorias');
        const categorias = await res.json();
        categoriasDisponibles = categorias;
        categorias.forEach(cat => {
          const option = document.createElement('option');
          option.value = cat.id;
          option.textContent = cat.nombre;
          selectCategoria.appendChild(option);
        });
      } catch (err) {
        console.error('❌ Error al cargar categorías:', err);
      }
    }
  
    // 🔄 Cargar subcategorías en tabla
    async function cargarSubcategorias() {
      try {
        const res = await fetch('/api/subcategorias');
        const subcategorias = await res.json();
        tabla.innerHTML = '';
  
        subcategorias.forEach(sub => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${sub.id}</td>
            <td>
              <input type="text" value="${sub.nombre}" class="input-nombre" data-id="${sub.id}">
            </td>
            <td>
              <select class="select-categoria" data-id="${sub.id}">
                ${categoriasDisponibles.map(cat => `
                  <option value="${cat.id}" ${cat.id === sub.categoria_id ? 'selected' : ''}>${cat.nombre}</option>
                `).join('')}
              </select>
            </td>
            <td class="actions">
              <button class="edit" onclick="actualizarSubcategoria(${sub.id})">Actualizar</button>
              <button class="delete" onclick="eliminarSubcategoria(${sub.id})">Eliminar</button>
            </td>
          `;
          tabla.appendChild(fila);
        });
      } catch (err) {
        console.error('❌ Error al cargar subcategorías:', err);
      }
    }
  
    // ✅ Crear subcategoría
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombreSubcategoria').value;
      const categoria_id = selectCategoria.value;
  
      try {
        const res = await fetch('/api/subcategorias', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ nombre, categoria_id })
        });
  
        const data = await res.json();
        if (res.ok) {
          alert('✅ Subcategoría creada');
          form.reset();
          cargarSubcategorias();
        } else {
          alert(data.error || 'Error al crear subcategoría');
        }
      } catch (err) {
        console.error('❌ Error al crear subcategoría:', err);
      }
    });
  
    // ✏️ Actualizar subcategoría (nombre y categoría)
    window.actualizarSubcategoria = async (id) => {
      const input = document.querySelector(`input[data-id="${id}"]`);
      const select = document.querySelector(`select[data-id="${id}"]`);
      const nombre = input.value.trim();
      const categoria_id = select.value;
  
      if (!nombre) return alert('El nombre no puede estar vacío');
  
      try {
        const res = await fetch(`/api/subcategorias/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ nombre, categoria_id })
        });
  
        if (res.ok) {
          alert('✅ Subcategoría actualizada');
          cargarSubcategorias();
        } else {
          alert('❌ Error al actualizar');
        }
      } catch (err) {
        console.error('❌ Error al actualizar subcategoría:', err);
      }
    };
  
    // 🗑️ Eliminar subcategoría
    window.eliminarSubcategoria = async (id) => {
      if (!confirm('¿Eliminar esta subcategoría?')) return;
  
      try {
        const res = await fetch(`/api/subcategorias/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (res.ok) {
          alert('✅ Subcategoría eliminada');
          cargarSubcategorias();
        } else {
          alert('❌ No se pudo eliminar');
        }
      } catch (err) {
        console.error('❌ Error al eliminar subcategoría:', err);
      }
    };
  
    // 🚀 Inicialización
    cargarCategorias().then(() => {
      cargarSubcategorias();
    });
  });
  