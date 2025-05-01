const express = require('express');
const router = express.Router();

const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const productosRoutes = require('./routes/productos');
const authRoutes = require('./routes/auth');



router.use('/api/categorias', categoriasRoutes);
router.use('/api/subcategorias', subcategoriasRoutes);
router.use('/api/productos', productosRoutes);
router.use('/api', authRoutes);



module.exports = router;

