const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// Ruta para obtener todas las citas en formato FullCalendar
router.get('/citas', (req, res) => {
    const sql = `
    SELECT c.id, p.nombre_completo AS title, c.fecha_cita AS start
    FROM citas c
    JOIN pacientes p ON c.id_paciente = p.id;
  `;

    connection.query(sql, (err, resultados) => {
        if (err) return res.status(500).json({ error: 'Error al consultar citas' });

        res.json(resultados);
    });
});

module.exports = router;
