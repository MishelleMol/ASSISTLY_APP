// Importa la librería mongoose para trabajar con MongoDB
const mongoose = require('mongoose');

// Importa bcryptjs para encriptar contraseñas
const bcrypt   = require('bcryptjs');

// Definimos cómo luce un usuario en la base de datos (estructura del documento)
const userSchema = new mongoose.Schema({

  // Campo nombre: tipo texto, obligatorio, y elimina espacios al inicio/final
  nombre:   { type: String, required: [true, 'El nombre es requerido'], trim: true },

  // Campo email: contiene varias validaciones
  email:    {
    type: String, // tipo texto
    required: [true, 'El email es requerido'], // obligatorio
    unique: true, // no se puede repetir en la base de datos
    lowercase: true, // se guarda siempre en minúsculas
    match: [/^\S+@\S+\.\S+$/, 'Formato de email inválido'] // valida formato de correo
  },

  // Campo password: tipo texto, obligatorio y mínimo 6 caracteres
  password: { type: String, required: [true, 'La contraseña es requerida'], minlength: 6 },

  // Campo rol: define el tipo de usuario
  rol:      { 
    type: String, 
    enum: ['admin', 'user', 'shopper'], // solo permite estos valores
    default: 'user' // valor por defecto
  },

  // Campo historial: arreglo de objetos que guarda acciones del usuario
  historial: [{

    // ID de la solicitud relacionada (referencia a otra colección)
    solicitudId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Solicitud' },

    // Categoría de la solicitud
    categoria:    String,

    // Descripción de la solicitud
    descripcion:  String,

    // Presupuesto asignado
    presupuesto:  Number,

    // Shopper asignado (quien atiende la solicitud)
    shopper:      String,

    // Estado de la solicitud (ej: pendiente, completado, etc.)
    estado:       String,

    // Fecha de la solicitud, por defecto la fecha actual
    fecha:        { type: Date, default: Date.now }
  }]

// timestamps: true agrega automáticamente createdAt y updatedAt
}, { timestamps: true });


// Middleware que se ejecuta antes de guardar un usuario en la base de datos
userSchema.pre('save', async function (next) {

  // Si la contraseña NO fue modificada, sigue sin hacer nada
  if (!this.isModified('password')) return next();

  // Si fue modificada, la encripta usando bcrypt con 10 rondas
  this.password = await bcrypt.hash(this.password, 10);

  // Continúa con el proceso de guardado
  next();
});


// Método personalizado del modelo para comparar contraseñas en login
userSchema.methods.compararPassword = function (pass) {

  // Compara la contraseña ingresada con la almacenada (encriptada)
  return bcrypt.compare(pass, this.password);
};


// Exporta el modelo "User" basado en el schema creado
module.exports = mongoose.model('User', userSchema);