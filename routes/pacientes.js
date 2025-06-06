const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/pacientes/nuevo', protegerRuta, pacienteController.formNuevoPaciente);
router.post('/pacientes/nuevo', protegerRuta, pacienteController.crearPaciente);
router.get('/pacientes', protegerRuta, pacienteController.listarPacientes);

module.exports = router;
