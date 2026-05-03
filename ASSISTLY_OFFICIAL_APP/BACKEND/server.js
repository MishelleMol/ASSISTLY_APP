const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:61828'] }));
app.use(express.json());

// ── Conexión a MongoDB ───────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assistly';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// ── Rutas ────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/shoppers',    require('./routes/shoppers'));
app.use('/api/solicitudes', require('./routes/solicitudes'));

// ── Seed de shoppers ─────────────────────────────────────────
app.post('/api/seed', async (req, res) => {
  try {
    const Shopper = require('./models/Shopper');
    await Shopper.deleteMany({});
    await Shopper.insertMany([
      { nombre: 'Ana García',    iniciales: 'AG', especialidad: 'Moda y Outfits',       categorias: ['outfits','bodas','graduaciones'],       calificacion: 4.9, tarifa: 150, color: '🟣 #7c3bbc' },
      { nombre: 'Carlos López',  iniciales: 'CL', especialidad: 'Tecnología y Gadgets', categorias: ['tecnologia','corporativos'],             calificacion: 4.7, tarifa: 120, color: '🔵 #3b7cbc' },
      { nombre: 'María Pérez',   iniciales: 'MP', especialidad: 'Hogar y Decoración',   categorias: ['hogar','cumpleanos','san-valentin'],     calificacion: 4.8, tarifa: 130, color: '🟢 #3bbc7c' },
      { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Eventos Especiales',   categorias: ['bodas','graduaciones','corporativos'],   calificacion: 4.6, tarifa: 140, color: '🟠 #bc7c3b' },
    ]);
    res.json({ ok: true, message: '4 shoppers de prueba creados' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Servidor ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));