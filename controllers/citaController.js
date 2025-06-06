const db = require('../config/db'); // Ya no uses "connection", usa siempre db con promesas

// Formulario para crear cita
exports.formularioCita = async (req, res) => {
  try {
    const [pacientes] = await db.query('SELECT id, nombre_completo FROM pacientes');
    res.render('citas/nueva', { pacientes, error: null });
  } catch (err) {
    console.error('Error al cargar el formulario de cita:', err);
    res.status(500).send('Error al cargar el formulario de cita');
  }
};

// Registro de cita
exports.registrarCita = async (req, res) => {
  const { id_paciente, fecha_cita, motivo } = req.body;

  try {
    await db.query(
      'INSERT INTO citas (id_paciente, fecha_cita, motivo) VALUES (?, ?, ?)',
      [id_paciente, fecha_cita, motivo]
    );
    res.redirect('/citas');
  } catch (err) {
    console.error('Error al registrar la cita:', err);
    res.render('citas/nueva', { pacientes: [], error: 'Error al registrar la cita.' });
  }
};

// Listado de citas
exports.listarCitas = async (req, res) => {
  try {
    const [citas] = await db.query(`
      SELECT c.*, p.nombre_completo AS paciente, d.nombre_completo AS dentista
      FROM citas c
      JOIN pacientes p ON c.id_paciente = p.id
      JOIN dentistas d ON c.id_dentista = d.id
      ORDER BY c.fecha_cita DESC
    `);
    res.render('citas/lista', { title: 'Citas', citas });
  } catch (err) {
    console.error('Error al listar citas:', err);
    res.status(500).send('Error al listar citas');
  }
};

