const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { protegerRuta } = require('../middlewares/authMiddlewares');

router.get('/dashboard', protegerRuta, dashboardController.verDashboard);

module.exports = router;