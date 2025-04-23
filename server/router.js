const express = require('express');
const router = express.Router();

const categoriasRoutes = require('./routes/categorias');
const subcategoriasRoutes = require('./routes/subcategorias');
const productosRoutes = require('./routes/productos');


router.use('/api/categorias', categoriasRoutes);
router.use('/api/subcategorias', subcategoriasRoutes);
router.use('/api/productos', productosRoutes);


module.exports = router;