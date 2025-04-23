const express = require('express');
const router = express.Router();
const controller = require('../controllers/subcategorias.controller');

router.get('/', controller.obtenerSubcategorias);
router.post('/', controller.crearSubcategoria);
router.put('/:id', controller.actualizarSubcategoria);
router.delete('/:id', controller.eliminarSubcategoria);

module.exports = router;
