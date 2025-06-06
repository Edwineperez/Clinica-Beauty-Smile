const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/historial/nuevo', protegerRuta, historialController.mostrarFormulario);
router.post('/historial/nuevo', protegerRuta, historialController.registrarHistorial);
router.get('/historial', protegerRuta, historialController.verHistoriales);

module.exports = router;
