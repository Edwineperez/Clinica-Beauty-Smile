const express = require('express');
const router = express.Router();
const dentistaController = require('../controllers/dentistaController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/', protegerRuta, dentistaController.listarDentistas);
router.get('/nuevo', protegerRuta, dentistaController.formNuevoDentista);
router.post('/nuevo', protegerRuta, dentistaController.crearDentista);   
router.get('/agendar/:id', protegerRuta, dentistaController.formAgendarCita);
router.post('/agendar/:id', protegerRuta, dentistaController.agendarCita);

module.exports = router;