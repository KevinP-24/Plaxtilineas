const express = require('express');
const router = express.Router();
const controller = require('../controllers/categorias.controller');
const verifyToken = require('../middleware/auth.middleware');

// Pública
router.get('/', controller.obtenerCategorias);

// Protegidas
router.post('/', verifyToken, controller.crearCategoria);
router.put('/:id', verifyToken, controller.actualizarCategoria);
router.delete('/:id', verifyToken, controller.eliminarCategoria);

module.exports = router;
