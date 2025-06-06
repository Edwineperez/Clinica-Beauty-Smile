const db = require('../config/db');

// Listar dentistas
exports.listarDentistas = async (req, res) => {
    const [dentistas] = await db.query('SELECT * FROM dentistas WHERE estado = "activo"');
    res.render('dentistas/lista', { title: 'Dentistas', dentistas });
};

// Formulario para agendar cita
exports.formAgendarCita = async (req, res) => {
    const { id } = req.params;
    const [[dentista]] = await db.query('SELECT * FROM dentistas WHERE id = ?', [id]);
    const [pacientes] = await db.query('SELECT id, nombre_completo, documento_identidad FROM pacientes WHERE estado = "activo"');
    res.render('dentistas/agenda', { title: 'Agendar Cita', dentista, pacientes, error: null });
};

// Procesar agendamiento de cita
exports.agendarCita = async (req, res) => {
    const { id } = req.params;
    const { id_paciente, fecha_cita, tipo_procedimiento, motivo } = req.body;
    try {
        await db.query(
            'INSERT INTO citas (id_paciente, id_dentista, fecha_cita, tipo_procedimiento, motivo) VALUES (?, ?, ?, ?, ?)',
            [id_paciente, id, fecha_cita, tipo_procedimiento, motivo]
        );
        res.redirect('/citas');
    } catch (err) {
        const [[dentista]] = await db.query('SELECT * FROM dentistas WHERE id = ?', [id]);
        const [pacientes] = await db.query('SELECT id, nombre_completo, documento_identidad FROM pacientes WHERE estado = "activo"');
        res.render('dentista/agenda', { title: 'Agendar Cita', dentista, pacientes, error: 'Error al agendar la cita.' });
    }
};

// Mostrar formulario para nuevo dentista
exports.formNuevoDentista = (req, res) => {
    res.render('dentistas/nuevo', { title: 'Registrar Dentista', error: null });
};

// Procesar registro de nuevo dentista
exports.crearDentista = async (req, res) => {
    const { nombre_completo, especialidad, telefono, correo, id_usuario } = req.body;
    try {
        await db.query(
            'INSERT INTO dentistas (id_usuario, nombre_completo, especialidad, telefono, correo) VALUES (?, ?, ?, ?, ?)',
            [id_usuario || 1, nombre_completo, especialidad, telefono, correo] // id_usuario puede ser fijo o dinámico
        );
        res.redirect('/dentistas');
    } catch (err) {
        res.render('dentistas/nuevo', { title: 'Registrar Dentista', error: 'Error al registrar el dentista.' });
    }
};