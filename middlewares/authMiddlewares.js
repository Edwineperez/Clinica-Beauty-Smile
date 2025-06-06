exports.protegerRuta = (req, res, next) => {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
};

exports.requireRole = function(roles) {
  return function(req, res, next) {
    if (!req.session.usuario || !roles.includes(req.session.usuario.tipo_usuario)) {
      return res.status(403).send('Acceso denegado');
    }
    next();
  };
};