const express  = require('express');// Importa el framework Express para crear el servidor backend
const cors     = require('cors');// Importa CORS para permitir conexiones desde el frontend
const mongoose = require('mongoose');// Importa Mongoose para conectarse a MongoDB
require('dotenv').config();// Carga variables de entorno desde un archivo .env

const app = express();// Crea la aplicación de Express

// ── Middlewares ──────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:4200', 'http://localhost:61828'] }));// Permite peticiones desde esos orígenes (frontend Angular en local)
app.use(express.json());// Permite recibir datos en formato JSON en las peticiones

// ── Conexión a MongoDB ───────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assistly';// Toma la URI desde .env o usa una local por defecto
mongoose.connect(MONGO_URI)// Intenta conectarse a la base de datos
  .then(() => console.log('✅ MongoDB conectado'))// Si conecta correctamente
  .catch(err => console.error('❌ Error MongoDB:', err)); // Si hay error

// ── Rutas ────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'));// Define las rutas de autenticación (login, registro, etc.)
app.use('/api/shoppers',    require('./routes/shoppers'));// Define las rutas para manejar shoppers
app.use('/api/solicitudes', require('./routes/solicitudes'));// Define las rutas para manejar solicitudes

// ── Seed de shoppers ─────────────────────────────────────────
// Endpoint POST para insertar datos de prueba en la base de datos
app.post('/api/seed', async (req, res) => {
  try {
    const Shopper = require('./models/Shopper');// Importa el modelo Shopper
    await Shopper.deleteMany({});// Borra todos los shoppers existentes
    await Shopper.insertMany([
      { nombre: 'Ana García',    iniciales: 'AG', especialidad: 'Moda y Outfits',       categorias: ['outfits','bodas','graduaciones'],       calificacion: 4.9, tarifa: 150, color: '🟣 #7c3bbc' },
      { nombre: 'Carlos López',  iniciales: 'CL', especialidad: 'Tecnología y Gadgets', categorias: ['tecnologia','corporativos'],             calificacion: 4.7, tarifa: 120, color: '🔵 #3b7cbc' },
      { nombre: 'María Pérez',   iniciales: 'MP', especialidad: 'Hogar y Decoración',   categorias: ['hogar','cumpleanos','san-valentin'],     calificacion: 4.8, tarifa: 130, color: '🟢 #3bbc7c' },
      { nombre: 'Luis Ramírez',  iniciales: 'LR', especialidad: 'Eventos Especiales',   categorias: ['bodas','graduaciones','corporativos'],   calificacion: 4.6, tarifa: 140, color: '🟠 #bc7c3b' },
    ]);
    res.json({ ok: true, message: '4 shoppers de prueba creados' });// Respuesta exitosa al cliente
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Si ocurre error, responde con código 500
  }
});

// ── Servidor ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;// Define el puerto (usa el de entorno o 3000 por defecto)
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));// Inicia el servidor y muestra en consola la URL