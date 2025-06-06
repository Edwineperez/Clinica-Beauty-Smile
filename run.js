// Ejecuta este archivo una sola vez con: node run.js
const bcrypt = require('bcrypt');
const connection = require('./config/db');

const crearUsuarioAdmin = async () => {
    const hash = await bcrypt.hash('admin123', 10);
    const usuario = {
        nombre_usuario: 'admin1',
        contrasena: hash,
        tipo_usuario: 'admin',
        estado: 'activo'
    };
    connection.query(
        'INSERT INTO usuarios (nombre_usuario, contrasena, estado) VALUES (?, ?, ?)',
        [usuario.nombre_usuario, usuario.contrasena, usuario.estado],
        (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.log('El usuario administrador ya existe.');
                } else {
                    console.error('Error al crear el usuario:', err);
                }
            } else {
                console.log('Usuario administrador creado correctamente.');
            }
            connection.end();
        }
    );
};

crearUsuarioAdmin();
