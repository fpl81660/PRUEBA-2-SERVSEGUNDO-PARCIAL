const express = require('express');
const router = express.Router();
let {areas} = require('../data/areas');

// GET todos
router.get('/', (req, res) => res.json(areas));

// GET por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const area = areas.find(a => a.idArea === id);
  if (!area) return res.status(404).json({ mensaje: 'Área no encontrada' });
  res.json(area);
});

// POST
router.post('/', (req, res) => {
  const nueva = { idArea: areas.length + 1, ...req.body };
  areas.push(nueva);
  res.status(201).json(nueva);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = areas.findIndex(a => a.idArea === id);
  if (index === -1) return res.status(404).json({ mensaje: 'Área no encontrada' });
  areas[index] = { ...areas[index], ...req.body };
  res.json(areas[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  areas = areas.filter(a => a.idArea !== id);
  res.json({ mensaje: 'Área eliminada' });
});

module.exports = router;
