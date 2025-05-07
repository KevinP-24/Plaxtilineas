const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });
const controller = require('../controllers/productos.controller');

// Rutas públicas
router.get('/', controller.obtenerProductos);

// Rutas protegidas
router.post('/', verifyToken, upload.single('imagen'), controller.crearProductoDesdeRuta);
router.put('/:id', verifyToken, upload.single('imagen'), controller.actualizarProducto);
router.delete('/:id', verifyToken, controller.eliminarProducto);

module.exports = router;
