const express = require('express');
const router  = express.Router();
const Shopper = require('../models/Shopper');
const authMiddleware = require('../middleware/auth.middleware');

// GET /api/shoppers — ver todos los shoppers (público)
router.get('/', async (req, res) => {
  try {
    const { categoria, disponible } = req.query;
    const filtro = {};
    if (categoria)  filtro.categorias = { $in: [categoria] };
    if (disponible) filtro.disponible = disponible === 'true';
    const shoppers = await Shopper.find(filtro).sort({ calificacion: -1 });
    res.json({ ok: true, total: shoppers.length, data: shoppers });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// GET /api/shoppers/:id — ver un shopper específico (público)
router.get('/:id', async (req, res) => {
  try {
    const shopper = await Shopper.findById(req.params.id);
    if (!shopper) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' });
    res.json({ ok: true, data: shopper });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// POST /api/shoppers — crear shopper (solo admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const shopper = new Shopper(req.body);
    await shopper.save();
    res.status(201).json({ ok: true, data: shopper });
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ ok: false, error: err.message });
    res.status(500).json({ ok: false, error: err.message });
  }
});

// PATCH /api/shoppers/:id — actualizar shopper (solo admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Shopper.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' });
    res.json({ ok: true, data: updated });
  } catch (err) {
    res.status(400).json({ ok: false, error: err.message });
  }
});

// DELETE /api/shoppers/:id — eliminar shopper (solo admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Shopper.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, error: 'Shopper no encontrado' });
    res.json({ ok: true, message: 'Shopper eliminado' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

module.exports = router;