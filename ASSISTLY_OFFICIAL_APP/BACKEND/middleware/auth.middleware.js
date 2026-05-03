const jwt = require('jsonwebtoken');// Importa la librería jsonwebtoken para trabajar con tokens JWT (crear y verificar)


// Define la clave secreta para firmar/verificar tokens
// Usa la variable de entorno JWT_SECRET o un valor por defecto
const SECRET = process.env.JWT_SECRET || 'assistly_secret_2026';

// Protege las rutas que solo puede usar alguien logueado
function authMiddleware(req, res, next) {
  // Busca el token en el header Authorization
  const authHeader = req.headers.authorization; // Obtiene el header Authorization de la petición


  // Si no hay header o no tiene el formato "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {

    // Responde con error 401 (no autorizado)
    return res.status(401).json({ ok: false, error: 'Token de acceso requerido' });
  }

  // Extrae el token (la parte después de "Bearer ")
  const token = authHeader.split(' ')[1]; // saca el token después de "Bearer "

  try {
    // Verifica que el token sea válido usando la clave secreta
    // Si es válido, devuelve el contenido decodificado (payload)
    const decoded = jwt.verify(token, SECRET); // verifica que el token sea válido
    req.user = decoded; // guarda los datos del usuario para usarlos en la ruta
    next(); // deja pasar a la siguiente función
  } catch (err) {
    return res.status(401).json({ ok: false, error: 'Token inválido o expirado' });// Si el token es inválido, está corrupto o expiró
  }
}

// Exporta el middleware para usarlo en otras rutas
module.exports = authMiddleware;