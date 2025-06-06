const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

// Configuración Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesión
app.use(session({
    secret: 'beauty-smile-secret',
    resave: false,
    saveUninitialized: false
}));

// Middleware para variables locales
app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    res.locals.esDashboard = false;
    next();
});

// Importar rutas
const authRoutes = require('./routes/auth');
const pacienteRoutes = require('./routes/pacientes');
const citaRoutes = require('./routes/citas');
const dashboardRoutes = require('./routes/dashboard');
const historialRoutes = require('./routes/historial');
const apiRoutes = require('./routes/api');
const dentistasRoutes = require('./routes/dentistas');
const serviciosRoutes = require('./routes/servicios');

// Rutas base
app.get('/', (req, res) => {
    res.redirect('/login');
});

// Usar rutas
app.use(authRoutes);
app.use(pacienteRoutes);
app.use(citaRoutes);
app.use(dashboardRoutes);
app.use(historialRoutes);
app.use('/api', apiRoutes);
app.use('/dentistas', dentistasRoutes);
app.use('/servicios', serviciosRoutes);

// Servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});



