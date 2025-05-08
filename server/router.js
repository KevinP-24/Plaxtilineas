const express = require('express');
const router = express.Router();

const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');
const categoriasController = require('./controllers/categorias.controller');

router.use('/api/categorias', categoriasRoutes);
router.use('/api/subcategorias', subcategoriasRoutes);
router.use('/api/productos', productosRoutes);
router.use('/api', authRoutes);
router.get('/api/categorias', categoriasController.obtenerCategoriasConSubcategorias);

module.exports = router;
