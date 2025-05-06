const db = require('../db');
const { cloudinary } = require('../config/cloudinary');

// 🔍 Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categorias');
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al obtener categorías:', err);
    res.status(500).json({ error: 'No se pudieron obtener las categorías' });
  }
};

// ✅ Crear categoría sin ícono
exports.crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  try {
    const [result] = await db.query('INSERT INTO categorias (nombre) VALUES (?)', [nombre]);
    res.status(201).json({ mensaje: 'Categoría creada con éxito', id: result.insertId });
  } catch (err) {
    console.error('❌ Error al crear categoría:', err);
    res.status(500).json({ error: 'No se pudo crear la categoría' });
  }
};

// ✅ Crear categoría con ícono (Cloudinary)
exports.crearCategoriaConIcono = async (req, res) => {
  const { nombre } = req.body;
  const icono_url = req.file?.path || null;
  const icono_public_id = req.file?.filename || null;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO categorias (nombre, icono_url, icono_public_id) VALUES (?, ?, ?)',
      [nombre, icono_url, icono_public_id]
    );

    res.status(201).json({
      mensaje: 'Categoría creada con icono con éxito',
      id: result.insertId,
      icono_url
    });
  } catch (err) {
    console.error('❌ Error al crear categoría con icono:', err);
    res.status(500).json({ error: 'No se pudo crear la categoría' });
  }
};

// 📝 Actualizar nombre e ícono (opcional)
exports.actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const nuevoIcono = req.file?.path;
  const nuevoPublicId = req.file?.filename;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }

  try {
    // Obtener el public_id anterior
    const [rows] = await db.query('SELECT icono_public_id FROM categorias WHERE id = ?', [id]);
    if (!rows.length) return res.status(404).json({ error: 'Categoría no encontrada' });

    const oldPublicId = rows[0].icono_public_id;

    // Si hay nuevo ícono, elimina el anterior
    if (nuevoIcono && oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    // Armar query dinámica
    let query = 'UPDATE categorias SET nombre = ?';
    const values = [nombre];

    if (nuevoIcono) {
      query += ', icono_url = ?, icono_public_id = ?';
      values.push(nuevoIcono, nuevoPublicId);
    }

    query += ' WHERE id = ?';
    values.push(id);

    await db.query(query, values);

    res.json({ mensaje: '✅ Categoría actualizada correctamente' });
  } catch (err) {
    console.error('❌ Error al actualizar categoría:', err);
    res.status(500).json({ error: 'No se pudo actualizar la categoría' });
  }
};

// 🗑️ Eliminar categoría (NO elimina imagen aún)
exports.eliminarCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    // Obtener el public_id para eliminar imagen
    const [rows] = await db.query('SELECT icono_public_id FROM categorias WHERE id = ?', [id]);
    const iconoPublicId = rows[0]?.icono_public_id;

    if (iconoPublicId) {
      await cloudinary.uploader.destroy(iconoPublicId);
    }

    await db.query('DELETE FROM categorias WHERE id = ?', [id]);
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (err) {
    console.error('❌ Error al eliminar categoría:', err);
    res.status(500).json({ error: 'No se pudo eliminar la categoría' });
  }
};
