document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const form = document.getElementById('formProducto');
  const filtroSubcategoria = document.getElementById('selectFiltroSubcategoria');
  const selectSubcategoria = document.getElementById('subcategoriaProducto');
  const tabla = document.getElementById('tablaProductos');

  if (!token) {
    alert('No autorizado');
    window.location.href = '/login.html';
    return;
  }

  // 🔄 Cargar subcategorías para select de filtro y formulario
  async function cargarSubcategorias() {
    try {
      const res = await fetch('/api/subcategorias');
      const subcategorias = await res.json();
      console.log('📋 Subcategorías recibidas:', subcategorias);
      subcategorias.forEach(s => {
        const option1 = document.createElement('option');
        option1.value = s.id;
        option1.textContent = `${s.nombre} (${s.categoria})`;
        filtroSubcategoria.appendChild(option1);
        const option2 = option1.cloneNode(true);
        selectSubcategoria.appendChild(option2);
      });
    } catch (err) {
      console.error('❌ Error al cargar subcategorías:', err);
    }
  }

  //Cargar productos en tabla
  async function cargarProductos() {
    try {
      const [resProductos, resSubcategorias] = await Promise.all([
        fetch('/api/productos'),
        fetch('/api/subcategorias')
      ]);
  
      const productos = await resProductos.json();
      const subcategorias = await resSubcategorias.json();
  
      console.log('📦 Productos recibidos del backend:', productos);
      console.log('📋 Subcategorías disponibles:', subcategorias);
  
      const subcategoriaId = filtroSubcategoria.value;
      tabla.innerHTML = '';
  
      const filtrados = productos.filter(p => {
        const coincide = String(p.subcategoria_id) === String(subcategoriaId);
        console.log(`¿${p.nombre} (${p.subcategoria_id}) coincide con ${subcategoriaId}?`, coincide);
        return !subcategoriaId || coincide;
      });
  
      console.log('🟢 Productos filtrados:', filtrados);
  
      filtrados.forEach(p => {
        const fila = document.createElement('tr');
        fila.setAttribute('data-id', p.id);
  
        const selectHTML = `
          <select class="input-subcategoria" data-id="${p.id}">
            ${subcategorias.map(s => `
              <option value="${s.id}" ${s.id === p.subcategoria_id ? 'selected' : ''}>
                ${s.nombre} (${s.categoria})
              </option>
            `).join('')}
          </select>
        `;
  
        fila.innerHTML = `
          <td>${p.id}</td>
          <td>
            <img src="${p.imagen_url}" class="producto-img" id="img-${p.id}" />
            <label class="img-edit-label">🖉
              <input type="file" class="img-edit" data-id="${p.id}" style="display: none;" accept="image/*">
            </label>
          </td>
          <td><input type="text" value="${p.nombre}" class="input-nombre" data-id="${p.id}" /></td>
          <td><input type="number" value="${p.precio}" class="input-precio" data-id="${p.id}" /></td>
          <td><input type="text" value="${p.descripcion || ''}" class="input-desc" data-id="${p.id}" /></td>
          <td>${selectHTML}</td>
          <td class="actions">
            <button class="edit" onclick="actualizarProducto(${p.id})">Actualizar</button>
            <button class="delete" onclick="eliminarProducto(${p.id})">Eliminar</button>
          </td>
        `;
        tabla.appendChild(fila);
      });
  
    } catch (err) {
      console.error('❌ Error al cargar productos:', err);
    }
  }
  

  window.actualizarProducto = async (id) => {
    const nombre = document.querySelector(`.input-nombre[data-id="${id}"]`)?.value.trim();
    const precio = document.querySelector(`.input-precio[data-id="${id}"]`)?.value.trim();
    const descripcion = document.querySelector(`.input-desc[data-id="${id}"]`)?.value.trim();
    const subcategoria_id = document.querySelector(`.input-subcategoria[data-id="${id}"]`)?.value;
    const fileInput = document.querySelector(`.img-edit[data-id="${id}"]`);
    const imagen = fileInput?.files[0];
    const botonActualizar = document.querySelector(`button.edit[data-id="${id}"]`);
  
    // ✅ Validaciones básicas
    if (!nombre || isNaN(precio) || !subcategoria_id || isNaN(subcategoria_id)) {
      alert('⚠️ Por favor completa todos los campos correctamente.');
      if (botonActualizar) botonActualizar.disabled = true;
      return;
    }
  
    if (botonActualizar) botonActualizar.disabled = false;
  
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('cantidad', 0);
    formData.append('subcategoria_id', subcategoria_id);
    if (imagen) formData.append('imagen', imagen);
  
    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
  
      if (res.ok) {
        alert('✅ Producto actualizado');
        cargarProductos();
      } else {
        const errorText = await res.text();
        console.warn('⚠️ Error de respuesta:', errorText);
        alert('❌ Error al actualizar producto');
      }
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err);
      alert('❌ Error de red o servidor');
    }
  };   
  
  // ✅ Crear producto
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const precio = document.getElementById('precioProducto').value;
    const subcategoria_id = selectSubcategoria.value;
    const imagen = document.getElementById('imagenProducto').files[0];

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio);
    formData.append('cantidad', 0);
    formData.append('subcategoria_id', subcategoria_id);
    if (imagen) formData.append('imagen', imagen);

    try {
      const res = await fetch('/api/productos', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Producto creado');
        form.reset();
        cargarProductos();
      } else {
        alert(data.error || 'Error al crear producto');
      }
    } catch (err) {
      console.error('❌ Error al crear producto:', err);
    }
  });

  // 🗑️ Eliminar producto
  window.eliminarProducto = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;

    try {
      const res = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.ok) {
        alert('✅ Producto eliminado');
        cargarProductos();
      } else {
        alert('❌ No se pudo eliminar');
      }
    } catch (err) {
      console.error('❌ Error al eliminar producto:', err);
    }
  };

  // Recargar al cambiar subcategoría
  filtroSubcategoria.addEventListener('change', () => {
    console.log('🔁 Subcategoría seleccionada (evento):', filtroSubcategoria.value);
    cargarProductos();
  });

  // 🚀 Inicialización
  cargarSubcategorias().then(() => {
    cargarProductos();
  });
});
