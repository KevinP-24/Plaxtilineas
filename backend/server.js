const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 🔌 Inicializar app
const app = express();
const PORT = process.env.PORT || 3000;

// 📦 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔁 Rutas API
const authRoutes = require('./routes/auth.routes');
const productoRoutes = require('./routes/producto.routes');
const subcategoriaRoutes = require('./routes/subcategoria.routes');
const categoriaRoutes = require('./routes/categoria.routes');

app.use('/api/auth', authRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);

// 🌐 Servir Angular compilado solo si existe (evita errores en desarrollo)
const angularPath = path.join(__dirname, '../frontend/dist/frontend');
app.use(express.static(angularPath));

// 🏠 Ruta SPA: solo si frontend existe
app.get('*', (req, res) => {
  try {
    res.sendFile(path.join(angularPath, 'index.html'));
  } catch (err) {
    res.status(404).json({ error: 'Vista no disponible (¿Angular no compilado?)' });
  }
});

// 🧱 Middleware global de manejo de errores (agregado)
app.use((err, req, res, next) => {
  console.error('🔥 Error global no controlado:');
  console.dir(err, { depth: null });
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
