const express    = require('express');
const router     = express.Router();
const Solicitud  = require('../models/Solicitud');
const Shopper    = require('../models/Shopper');
const User       = require('../models/User');
const authMiddleware = require('../middleware/auth.middleware');

// POST /api/solicitudes — crear solicitud (público)
router.post('/', async (req, res) => {
  try {
    const solicitud = new Solicitud(req.body);
    await solicitud.save();

    // Busca un shopper disponible y lo asigna
    const shoppers = await Shopper.find({ disponible: true, categorias: req.body.categoria });
    if (shoppers.length > 0) {
      const idx = Math.floor(Math.random() * shoppers.length);
      solicitud.shopperAsignado = shoppers[idx]._id;
      solicitud.estado = 'en-proceso';
      await solicitud.save();
    }

    // Si hay userId guarda en historial del usuario
    if (req.body.userId) {
      await User.findByIdAndUpdate(req.body.userId, {
        $push: {
          historial: {
            solicitudId: solicitud._id,
            categoria:   solicitud.categoria,
            descripcion: solicitud.descripcion,
            presupuesto: solicitud.presupuesto,
            shopper:     shoppers[0]?.nombre || '',
            estado:      solicitud.estado,
          }
        }
      });
    }

    const populated = await solicitud.populate('shopperAsignado', 'nombre iniciales calificacion tarifa color');
    res.status(201).json({ ok: true, data: populated });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/solicitudes — ver todas (solo admin)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find()
      .populate('shopperAsignado', 'nombre iniciales calificacion')
      .sort({ createdAt: -1 });
    res.json({ ok: true, total: solicitudes.length, data: solicitudes });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PATCH /api/solicitudes/:id — cambiar estado (solo admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Solicitud.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ ok: false, error: 'Solicitud no encontrada' });
    res.json({ ok: true, data: updated });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// DELETE /api/solicitudes/:id — eliminar (solo admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Solicitud.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, error: 'Solicitud no encontrada' });
    res.json({ ok: true, message: 'Solicitud eliminada' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;