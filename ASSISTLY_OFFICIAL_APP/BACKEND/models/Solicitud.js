const mongoose = require('mongoose');

// Definimos cómo luce una solicitud en la base de datos
const solicitudSchema = new mongoose.Schema({
  descripcion:  { type: String, required: [true, 'La descripción es requerida'], minlength: [10, 'Mínimo 10 caracteres'] },
  categoria:    {
    type: String,
    required: [true, 'La categoría es requerida'],
    enum: ['bodas','graduaciones','cumpleanos','san-valentin','outfits','corporativos','hogar','tecnologia']
  },
  presupuesto:  { type: Number, required: true, min: 1 },
  tamano:       { type: String, enum: ['pequena','mediana','grande'], default: 'mediana' },
  estado:       {
    type: String,
    default: 'pendiente',
    enum: ['pendiente','en-proceso','completada','cancelada']
  },
  shopperAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopper', default: null },
  clienteEmail:    { type: String, default: '' },
  userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Solicitud', solicitudSchema);