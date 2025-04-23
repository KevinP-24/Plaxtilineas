const db = require('../db');

exports.obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al obtener categorías:', err);
    res.status(500).json({ error: 'No se pudieron obtener las categorías' });
  }
};

exports.crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    await db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ mensaje: 'Categoría creada con éxito' });
  } catch (err) {
    console.error('❌ Error al crear categoría:', err);
    res.status(500).json({ error: 'No se pudo crear la categoría' });
  }
};

exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
    res.json({ mensaje: 'Categoría actualizada' });
  } catch (err) {
    console.error('❌ Error al actualizar categoría:', err);
    res.status(500).json({ error: 'No se pudo actualizar la categoría' });
  }
};

exports.eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    console.error('❌ Error al eliminar categoría:', err);
    res.status(500).json({ error: 'No se pudo eliminar la categoría' });
  }
};
