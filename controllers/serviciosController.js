const db = require('../config/db');

exports.listarServicios = async (req, res) => {
    const [servicios] = await db.query('SELECT * FROM servicios WHERE estado = "activo"');
    res.render('servicios/lista', { title: 'Servicios', servicios });
};

exports.formNuevoServicio = (req, res) => {
    res.render('servicios/nuevo', { title: 'Nuevo Servicio', error: null });
};

exports.crearServicio = async (req, res) => {
    const { nombre, descripcion, duracion_estimada, costo, categoria } = req.body;
    try {
        await db.query(
            'INSERT INTO servicios (nombre, descripcion, duracion_estimada, costo, categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, duracion_estimada, costo, categoria]
        );
        res.redirect('/servicios');
    } catch (err) {
        res.render('servicios/nuevo', { title: 'Nuevo Servicio', error: 'Error al crear el servicio.' });
    }
};