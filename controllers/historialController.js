const db = require('../config/db');

exports.mostrarFormulario = (req, res) => {
    res.send('Aquí se mostraría el formulario para un nuevo historial clínico.');
};

exports.registrarHistorial = (req, res) => {
    // Aquí iría la lógica para guardar el historial clínico en la base de datos.
    res.send('Historial clínico registrado con éxito.');
};

exports.verHistoriales = (req, res) => {
    // Aquí iría la lógica para obtener todos los historiales clínicos.
    res.send('Lista de historiales clínicos.');
};

exports.listarHistorial = async (req, res) => {
    const [historial] = await db.query(`
        SELECT h.*, p.nombre_completo AS paciente, d.nombre_completo AS dentista
        FROM historial_dental h
        JOIN pacientes p ON h.id_paciente = p.id
        JOIN dentistas d ON h.id_dentista = d.id
        ORDER BY h.fecha_procedimiento DESC
    `);
    res.render('historial/lista', { title: 'Historial Dental', historial });
};