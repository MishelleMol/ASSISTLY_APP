const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');

const SECRET = process.env.JWT_SECRET || 'assistly_secret_2026';

// POST /api/auth/register — crear cuenta nueva
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ ok: false, error: 'Ya existe una cuenta con ese email' });
    }
    const user = new User({ nombre, email, password, rol: rol || 'user' });
    await user.save();
    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      SECRET,
      { expiresIn: '8h' }
    );
    res.status(201).json({
      ok: true, token,
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/auth/login — iniciar sesión real con MongoDB
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: 'Email y contraseña son requeridos' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    }
    const esCorrecta = await user.compararPassword(password);
    if (!esCorrecta) {
      return res.status(401).json({ ok: false, error: 'Credenciales inválidas' });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, rol: user.rol },
      SECRET,
      { expiresIn: '8h' }
    );
    res.json({
      ok: true, token,
      user: { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol }
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/auth/me — ver datos del usuario logueado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    res.json({ ok: true, user });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/auth/historial — ver historial de compras
router.get('/historial', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('historial');
    if (!user) return res.status(404).json({ ok: false, error: 'Usuario no encontrado' });
    res.json({ ok: true, historial: user.historial });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/auth/seed-admin — crear primer admin (llamar solo una vez)
router.post('/seed-admin', async (req, res) => {
  try {
    const existe = await User.findOne({ rol: 'admin' });
    if (existe) return res.status(400).json({ ok: false, error: 'Ya existe un administrador' });
    const admin = new User({
      nombre: 'Administrador Assistly',
      email: 'admin@assistly.com',
      password: 'admin123',
      rol: 'admin'
    });
    await admin.save();
    res.status(201).json({ ok: true, message: 'Admin creado', email: admin.email });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;