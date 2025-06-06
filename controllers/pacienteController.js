const db = require('../config/db');

exports.listarPacientes = async (req, res) => {
    const [pacientes] = await db.query('SELECT * FROM pacientes WHERE estado = "activo"');
    res.render('pacientes/lista', { title: 'Pacientes', pacientes });
};

exports.formNuevoPaciente = (req, res) => {
    res.render('pacientes/nuevo', { title: 'Nuevo Paciente', error: null });
};

exports.crearPaciente = async (req, res) => {
    const { nombre_completo, documento_identidad, telefono, telefono_emergencia, correo, direccion, fecha_nacimiento, genero, alergias, antecedentes_medicos } = req.body;
    try {
        await db.query(
            'INSERT INTO pacientes (nombre_completo, documento_identidad, telefono, telefono_emergencia, correo, direccion, fecha_nacimiento, genero, alergias, antecedentes_medicos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [nombre_completo, documento_identidad, telefono, telefono_emergencia, correo, direccion, fecha_nacimiento, genero, alergias, antecedentes_medicos]
        );
        res.redirect('/pacientes');
    } catch (err) {
        res.render('pacientes/nuevo', { title: 'Nuevo Paciente', error: 'Error al registrar el paciente.' });
    }
};
