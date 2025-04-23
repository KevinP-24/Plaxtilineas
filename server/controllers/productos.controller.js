const db = require('../db');

exports.obtenerProductos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.id, p.nombre, p.descripcion, p.cantidad, p.precio, p.imagen_url,
             s.nombre AS subcategoria, c.nombre AS categoria
      FROM productos p
      JOIN subcategorias s ON p.subcategoria_id = s.id
      JOIN categorias c ON s.categoria_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al obtener productos:', err);
    res.status(500).json({ error: 'No se pudieron obtener los productos' });
  }
};

exports.crearProducto = async (req, res) => {
  const { nombre, descripcion, cantidad, precio, imagen_url, subcategoria_id } = req.body;
  try {
    await db.query(`
      INSERT INTO productos (nombre, descripcion, cantidad, precio, imagen_url, subcategoria_id)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, cantidad, precio, imagen_url, subcategoria_id]
    );
    res.status(201).json({ mensaje: 'Producto creado con éxito' });
  } catch (err) {
    console.error('❌ Error al crear producto:', err);
    res.status(500).json({ error: 'No se pudo crear el producto' });
  }
};

exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, cantidad, precio, imagen_url, subcategoria_id } = req.body;
  try {
    await db.query(`
      UPDATE productos SET nombre = ?, descripcion = ?, cantidad = ?, precio = ?, imagen_url = ?, subcategoria_id = ?
      WHERE id = ?`,
      [nombre, descripcion, cantidad, precio, imagen_url, subcategoria_id, id]
    );
    res.json({ mensaje: 'Producto actualizado' });
  } catch (err) {
    console.error('❌ Error al actualizar producto:', err);
    res.status(500).json({ error: 'No se pudo actualizar el producto' });
  }
};

exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM productos WHERE id = ?', [id]);
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    console.error('❌ Error al eliminar producto:', err);
    res.status(500).json({ error: 'No se pudo eliminar el producto' });
  }
};
