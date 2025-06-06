const express = require('express');
const router = express.Router();
const serviciosController = require('../controllers/serviciosController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/', protegerRuta, serviciosController.listarServicios);
router.get('/nuevo', protegerRuta, serviciosController.formNuevoServicio);
router.post('/nuevo', protegerRuta, serviciosController.crearServicio);

module.exports = router;