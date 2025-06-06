const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/citas/nueva', protegerRuta, citaController.formularioCita);
router.post('/citas/nueva', protegerRuta, citaController.registrarCita);
router.get('/citas', protegerRuta, citaController.listarCitas);

module.exports = router;
