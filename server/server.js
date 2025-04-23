const express = require('express');
const path = require('path');
const router = require('./router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware para JSON
app.use(express.json());

// Usar las rutas del backend
app.use(router); // ✅ ESTA LÍNEA ES CLAVE

// Servir frontend
app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Plaxtilineas corriendo en http://localhost:${PORT}`);
});
