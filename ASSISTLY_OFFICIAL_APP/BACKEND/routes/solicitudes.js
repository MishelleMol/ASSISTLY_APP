const express    = require('express');
const router     = express.Router();
const Solicitud  = require('../models/Solicitud');
const Shopper    = require('../models/Shopper');
const User       = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/solicitudes — crear solicitud (público, cualquiera puede crear)
router.post('/', async (req, res) => {
  try {
    /* Crea una nueva solicitud con los datos del body */
    const solicitud = new Solicitud(req.body);
    /* Guarda la solicitud en la base de datos */
    await solicitud.save();

    /* Busca un shopper disponible que maneje la categoría solicitada */
    const shoppers = await Shopper.find({ disponible: true, categorias: req.body.categoria });
    if (shoppers.length > 0) {
      /* Elige un shopper al azar entre los disponibles */
      const idx = Math.floor(Math.random() * shoppers.length);
      /* Asigna el shopper a la solicitud */
      solicitud.shopperAsignado = shoppers[idx]._id;
      /* Cambia el estado a en-proceso porque ya tiene shopper */
      solicitud.estado = 'en-proceso';
      /* Guarda los cambios */
      await solicitud.save();
    }

    /* Si el cliente está logueado, guarda la solicitud en su historial */
    if (req.body.userId) {
      await User.findByIdAndUpdate(req.body.userId, {
        $push: {
          historial: {
            solicitudId: solicitud._id,        /* ID de la solicitud */
            categoria:   solicitud.categoria,   /* Categoría de la solicitud */
            descripcion: solicitud.descripcion, /* Descripción de lo que necesita */
            presupuesto: solicitud.presupuesto, /* Presupuesto del cliente */
            shopper:     shoppers[0]?.nombre || '', /* Nombre del shopper asignado */
            estado:      solicitud.estado,      /* Estado actual de la solicitud */
          }
        }
      });
    }

    /* Trae los datos completos del shopper asignado para devolver al frontend */
    const populated = await solicitud.populate('shopperAsignado', 'nombre iniciales calificacion tarifa color');
    /* Devuelve la solicitud creada con código 201 */
    res.status(201).json({ ok: true, data: populated });
  } catch (err) {
    /* Si hay error de validación devuelve 400 */
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });
    /* Si hay otro error devuelve 500 */
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/solicitudes/disponibles — ver solicitudes pendientes (solo shoppers logueados)
router.get('/disponibles', authMiddleware, async (req, res) => {
  try {
    /* Busca solo las solicitudes que están pendientes (sin shopper asignado aún) */
    const solicitudes = await Solicitud.find({ estado: 'pendiente' })
      /* Trae datos básicos del shopper asignado si lo tiene */
      .populate('shopperAsignado', 'nombre iniciales calificacion')
      /* Ordena de más reciente a más antiguo */
      .sort({ createdAt: -1 });
    /* Devuelve las solicitudes disponibles */
    res.json({ ok: true, total: solicitudes.length, data: solicitudes });
  } catch (err) {
    /* Si hay error devuelve 500 */
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/solicitudes — ver todas las solicitudes (solo admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    /* Trae todas las solicitudes sin filtro */
    const solicitudes = await Solicitud.find()
      /* Trae datos básicos del shopper asignado */
      .populate('shopperAsignado', 'nombre iniciales calificacion')
      /* Ordena de más reciente a más antiguo */
      .sort({ createdAt: -1 });
    /* Devuelve todas las solicitudes con el total */
    res.json({ ok: true, total: solicitudes.length, data: solicitudes });
  } catch (err) {
    /* Si hay error devuelve 500 */
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PATCH /api/solicitudes/:id — cambiar estado de una solicitud (solo admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    /* Busca la solicitud por ID y la actualiza con los datos del body */
    const updated = await Solicitud.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true } /* new:true devuelve el documento actualizado */
    );
    /* Si no encuentra la solicitud devuelve 404 */
    if (!updated) return res.status(404).json({ ok: false, error: 'Solicitud no encontrada' });
    /* Devuelve la solicitud actualizada */
    res.json({ ok: true, data: updated });
  } catch (err) {
    /* Si hay error de validación devuelve 400 */
    res.status(400).json({ ok: false, error: err.message });
  }
});

// DELETE /api/solicitudes/:id — eliminar una solicitud (solo admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    /* Busca la solicitud por ID y la elimina */
    const deleted = await Solicitud.findByIdAndDelete(req.params.id);
    /* Si no encuentra la solicitud devuelve 404 */
    if (!deleted) return res.status(404).json({ ok: false, error: 'Solicitud no encontrada' });
    /* Devuelve mensaje de éxito */
    res.json({ ok: true, message: 'Solicitud eliminada' });
  } catch (err) {
    /* Si hay error devuelve 500 */
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;