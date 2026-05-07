const express = require('express');// Importa la librería Express para crear rutas y manejar peticiones HTTP
const router  = express.Router();// Crea un objeto Router para organizar las rutas relacionadas con shoppers
const Shopper = require('../models/Shopper');// Importa el modelo Shopper para interactuar con la colección de shoppers en MongoDB
const authMiddleware = require('../middleware/auth.middleware');// Importa el middleware que verifica autenticación mediante JWT

// GET /api/shoppers — ver todos los shoppers (público)
router.get('/', async (req, res) => {// Crea una ruta GET para obtener todos los shoppers
  try {// Bloque try/catch para manejar errores
    const { categoria, disponible } = req.query;// Extrae categoria y disponible desde los parámetros de la URL
    const filtro = {};// Crea un objeto vacío para guardar filtros de búsqueda
    if (categoria)  filtro.categorias = { $in: [categoria] };// Filtra shoppers que tengan esa categoría en su arreglo categorias
    if (disponible) filtro.disponible = disponible === 'true';// Convierte el texto "true" o "false" en booleano
    const shoppers = await Shopper.find(filtro).sort({ calificacion: -1 });// Busca shoppers usando los filtros y los ordena por calificación descendente
    res.json({ ok: true, total: shoppers.length, data: shoppers });// Devuelve respuesta exitosa con total y lista de shoppers
                                                                  // Cantidad total de shoppers encontrados
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

// GET /api/shoppers/:id — ver un shopper específico (público)
router.get('/:id', async (req, res) => {
  try { // Manejo de errores
    const shopper = await Shopper.findById(req.params.id);// Busca un shopper por el ID enviado en la URL
    if (!shopper) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' });// Devuelve error 404
    res.json({ ok: true, data: shopper });// Devuelve el shopper encontrado
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

// POST /api/shoppers — crear shopper (solo admin)
router.post('/', authMiddleware, async (req, res) => {// Ruta POST para crear un nuevo shopper
                                                      // authMiddleware protege la ruta y verifica el token JWT
  try {// Bloque para manejo de errores
    const shopper = new Shopper(req.body);// Crea un nuevo shopper usando los datos enviados desde el frontend
    await shopper.save();// Guarda el shopper en la base de datos
    res.status(201).json({ ok: true, data: shopper });// Devuelve el shopper creado
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });// Si ocurre un error de validación de Mongoose
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

// PATCH /api/shoppers/:id — actualizar shopper (solo admin)
router.patch('/:id', authMiddleware, async (req, res) => {// Ruta PATCH para actualizar parcialmente un shopper
                                                          // authMiddleware protege la ruta
  try {// Manejo de errores
    const updated = await Shopper.findByIdAndUpdate(// Busca el shopper por ID y actualiza los datos enviados
      req.params.id, req.body,// ID recibido desde la URL // Nuevos datos enviados desde el frontend
      { new: true, runValidators: true }// Ejecuta validaciones del esquema
    );
    if (!updated) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' });// Devuelve error 404
    res.json({ ok: true, data: updated }); // Devuelve el shopper actualizado
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });// Devuelve error 400 si hay problema en la actualización
  }
});

// DELETE /api/shoppers/:id — eliminar shopper (solo admin)
router.delete('/:id', authMiddleware, async (req, res) => {// Ruta DELETE para eliminar un shopper/ authMiddleware protege la ruta
  try {// Bloque de manejo de errores
    const deleted = await Shopper.findByIdAndDelete(req.params.id);// Busca el shopper por ID y lo elimina
    if (!deleted) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' }); // Devuelve error 404
    res.json({ ok: true, message: 'Shopper eliminado' });// Devuelve respuesta exitosa indicando que fue eliminado
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });// Devuelve error interno del servidor
  }
});

module.exports = router;// Exporta el router para poder usarlo en otros archivos