const express = require('express');
const router = express.Router();
const controller = require('../controllers/subcategorias.controller');
const verifyToken = require('../middleware/auth.middleware');

// Pública
router.get('/', controller.obtenerSubcategorias);

// Protegidas
router.post('/', verifyToken, controller.crearSubcategoria);
router.put('/:id', verifyToken, controller.actualizarSubcategoria);
router.delete('/:id', verifyToken, controller.eliminarSubcategoria);

module.exports = router;
