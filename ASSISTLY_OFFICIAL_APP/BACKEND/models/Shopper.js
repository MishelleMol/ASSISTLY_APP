const mongoose = require('mongoose');

// Definimos cómo luce un shopper en la base de datos
const shopperSchema = new mongoose.Schema({
  nombre:       { type: String, required: [true, 'El nombre es requerido'], trim: true },
  iniciales:    { type: String, required: true, maxlength: 2, uppercase: true },
  especialidad: { type: String, required: true },
  categorias:   { type: [String], default: [] },
  calificacion: { type: Number, default: 4.5, min: 1, max: 5 },
  resenas:      { type: Number, default: 0 },
  tarifa:       { type: Number, required: [true, 'La tarifa es requerida'], min: 1 },
  disponible:   { type: Boolean, default: true },
  verificado:   { type: Boolean, default: false },
  color:        { type: String, default: '#3bbc7c' },
  zona:         { type: String, default: 'Ciudad de Guatemala' },
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Shopper', shopperSchema);