const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'assistly_secret_2026';

// Protege las rutas que solo puede usar alguien logueado
function authMiddleware(req, res, next) {
  // Busca el token en el header Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ ok: false, error: 'Token de acceso requerido' });
  }

  const token = authHeader.split(' ')[1]; // saca el token después de "Bearer "

  try {
    const decoded = jwt.verify(token, SECRET); // verifica que el token sea válido
    req.user = decoded; // guarda los datos del usuario para usarlos en la ruta
    next(); // deja pasar a la siguiente función
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;