const dns = require('dns');
dns.setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4']);

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/assistly', {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error:', err));

app.use('/api/auth',        require('./routes/auth'));
app.use('/api/shoppers',    require('./routes/shoppers'));
app.use('/api/solicitudes', require('./routes/solicitudes'));

app.get('/', (req, res) => {
  res.json({ ok: true, app: 'Assistly API v1.0' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});