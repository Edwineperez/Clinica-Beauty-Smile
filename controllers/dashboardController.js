const db = require('../config/db');

exports.verDashboard = async (req, res) => {
    // Citas pendientes (para la lista)
    const [citas] = await db.query(`
        SELECT c.*, p.nombre_completo 
        FROM citas c
        JOIN pacientes p ON c.id_paciente = p.id
        WHERE c.estado = 'Programada'
        ORDER BY c.fecha_cita ASC
        LIMIT 5
    `);

    // Formatea las fechas para la lista de pendientes
    const citasFormateadas = citas.map(cita => {
        const fecha = new Date(cita.fecha_cita);
        return {
            ...cita,
            fecha_formateada: fecha.toLocaleDateString('es-ES'),
            hora_formateada: fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
        };
    });

    res.render('dashboard', {
        title: 'Panel de Administración',
        usuario: req.session.usuario,
        citas: citasFormateadas
    });
};




