const express = require('express');// Importa la librería Express para crear rutas y manejar peticiones HTTP
const router  = express.Router();// Crea un objeto Router para organizar las rutas de autenticación
const jwt     = require('jsonwebtoken');// Importa la librería jsonwebtoken para crear y verificar tokens JWT
const User    = require('../models/User');// Importa el modelo User para interactuar con la colección de usuarios en MongoDB
const authMiddleware = require('../middleware/auth.middleware');// Importa el middleware que protege rutas verificando el token JWT

const SECRET = process.env.JWT_SECRET || 'assistly_secret_2026';// Define la clave secreta para firmar tokens JWT

// POST /api/auth/register — crear cuenta nueva
router.post('/register', async (req, res) => {// Crea una ruta POST para registrar nuevos usuarios
  try {  // Bloque try/catch para manejar errores
    const { nombre, email, password, rol } = req.body;// Extrae nombre, email, password y rol enviados desde el frontend
    const existe = await User.findOne({ email });// Busca si ya existe un usuario con el mismo email
    if (existe) {// Si el usuario ya existe, devuelve error 400
      return res.status(400).json({ ok: false, error: 'Ya existe una cuenta con ese email' });// Envía respuesta indicando que el email ya está registrado
    }
    const user = new User({ nombre, email, password, rol: rol || 'user' }); // Crea un nuevo usuario usando los datos enviados
    await user.save();// Guarda el usuario en la base de datos
    const token = jwt.sign(// Genera un token JWT con información básica del usuario
      { id: user._id, email: user.email, rol: user.rol },// Datos que irán dentro del token
      SECRET,// Clave secreta usada para firmar el token
      { expiresIn: '8h' }// El token expira en 8 horas
    );
    res.status(201).json({// Devuelve respuesta exitosa con token y datos del usuario
      ok: true, token,// Indica que todo salió bien, envía el token
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol }// Envía información básica del usuario
    });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });// Si ocurre un error de validación de Mongoose
    res.status(500).json({ ok: false, error: err.message });// Devuelve error 500 para errores internos del servidor
  }
});

// POST /api/auth/login — iniciar sesión real con MongoDB
router.post('/login', async (req, res) => {// Ruta POST para iniciar sesión
  try {// Bloque para manejar errores
    const { email, password } = req.body;// Extrae email y password enviados desde el frontend
    if (!email || !password) {// Verifica que ambos campos existan
      return res.status(400).json({ ok: false, error: 'Email y contraseña son requeridos' });// Devuelve error si faltan datos
    }
    const user = await User.findOne({ email });// Busca el usuario por email en la base de datos
    if (!user) {// Si no encuentra usuario, devuelve error
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });// Error de credenciales inválidas
    }
    const esCorrecta = await user.compararPassword(password);// Compara la contraseña ingresada con la guardada en la base de datos
    if (!esCorrecta) {// Si la contraseña no coincide
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });// Devuelve error de autenticación
    }
    const token = jwt.sign(// Genera un nuevo token JWT para el usuario
      { id: user._id, email: user.email, rol: user.rol },// Información guardada dentro del token
      SECRET,
      { expiresIn: '8h' }// Configuración del token
    );
    res.json({// Envía respuesta exitosa
      ok: true, token,// Indica éxito
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol }// Envía datos básicos del usuario
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

// GET /api/auth/me — ver datos del usuario logueado
router.get('/me', authMiddleware, async (req, res) => {// Ruta GET protegida para obtener información del usuario actual
  try {// Manejo de errores
    const user = await User.findById(req.user.id).select('-password');// Busca el usuario usando el ID guardado en el token
                                                 // .select('-password') excluye el campo password
    if (!user) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });// Si no encuentra usuario
    res.json({ ok: true, user });// Devuelve los datos del usuario
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Error interno del servidor
  }
});

// GET /api/auth/historial — ver historial de compras
router.get('/historial', authMiddleware, async (req, res) => {// Ruta GET protegida para obtener el historial del usuario
  try {// Bloque para manejar errores
    const user = await User.findById(req.user.id).select('historial');// Busca el usuario y selecciona únicamente el historial
    if (!user) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });// Devuelve error 404
    res.json({ ok: true, historial: user.historial });// Devuelve el historial del usuario
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Error interno del servidor
  }
});

// POST /api/auth/seed-admin — crear primer admin (llamar solo una vez)
router.post('/seed-admin', async (req, res) => {// Ruta POST para crear el primer administrador del sistema
  try {// Bloque de manejo de errores
    const existe = await User.findOne({ rol: 'admin' });// Busca si ya existe un administrador
    if (existe) return res.status(400).json({ ok: false, error: 'Ya existe un administrador' });// Devuelve error
    const admin = new User({// Crea un nuevo usuario administrador
      nombre: 'Administrador Assistly',// Nombre del administrador
      email: 'admin@assistly.com',// Email del administrador
      password: 'admin123',// Contraseña inicial
      rol: 'admin'// Rol de administrador
    });
    await admin.save();// Guarda el admin en la base de datos
    res.status(201).json({ ok: true, message: 'Admin creado', email: admin.email });// Devuelve respuesta exitosa
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

// Exporta el router para poder usarlo en otros archivos
module.exports = router;