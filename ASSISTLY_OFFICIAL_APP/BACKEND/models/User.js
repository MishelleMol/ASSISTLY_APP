const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// Definimos cómo luce un usuario en la base de datos
const userSchema = new mongoose.Schema({
  nombre:   { type: String, required: [true, 'El nombre es requerido'], trim: true },
  email:    {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido']
  },
  password: { type: String, required: [true, 'La contraseña es requerida'], minlength: 6 },
  rol:      { type: String, enum: ['admin', 'user', 'shopper'], default: 'user' },
  historial: [{
    solicitudId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud' },
    categoria:    String,
    descripcion:  String,
    presupuesto:  Number,
    shopper:      String,
    estado:       String,
    fecha:        { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Encripta la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compara la contraseña al hacer login
userSchema.methods.compararPassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model('User', userSchema);