const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();

const app = express();

// Permisos para que Angular pueda hablar con este servidor
app.use(cors());

// Para que el servidor entienda JSON en las peticiones
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/assistly')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error:', err));

// Rutas
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/shoppers',    require('./routes/shoppers'));
app.use('/api/solicitudes', require('./routes/solicitudes'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ ok: true, app: 'Assistly API v1.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});