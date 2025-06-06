const connection = require('../config/db');
const bcrypt = require('bcrypt');

exports.mostrarLogin = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        ocultarHeader: true,
        error: null
    });
};

exports.procesarLogin = async (req, res) => {
    const { nombre_usuario, contrasena } = req.body;

    if (!nombre_usuario || !contrasena) {
        return res.render('auth/login', { error: 'Todos los campos son obligatorios.' });
    }

    try {
        // Consulta con Promesa
        const [results] = await connection.query(
            'SELECT * FROM usuarios WHERE nombre_usuario = ?',
            [nombre_usuario]
        );

        if (results.length === 0) {
            return res.render('auth/login', { error: 'Usuario no encontrado.' });
        }

        const usuario = results[0];

        if (!usuario.contrasena) {
            return res.render('auth/login', { error: 'Error: contraseña no encontrada.' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!match) {
            return res.render('auth/login', { error: 'Contraseña incorrecta.' });
        }

        // Autenticación exitosa
        req.session.usuario = usuario;
        res.redirect('/dashboard');

    } catch (err) {
        console.error('Error al procesar login:', err);
        res.status(500).render('auth/login', { error: 'Error interno del servidor.' });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};




