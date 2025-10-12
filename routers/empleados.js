const express = require('express');
const router = express.Router();
const { empleados } = require('../data/empleados');

// GET todos
router.get('/', (req, res) => {
  res.json(empleados);
});

// GET por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const empleado = empleados.find(e => e.id === id);
  if (!empleado) return res.status(404).json({ mensaje: 'Empleado no encontrado' });
  res.json(empleado);
});

// POST
router.post('/', (req, res) => {
  const nuevo = { id: empleados.length + 1, ...req.body };
  empleados.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = empleados.findIndex(e => e.id === id);
  if (index === -1) return res.status(404).json({ mensaje: 'Empleado no encontrado' });
  empleados[index] = { ...empleados[index], ...req.body };
  res.json(empleados[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  empleados = empleados.filter(e => e.id !== id);
  res.json({ mensaje: 'Empleado eliminado' });
});

module.exports = router;
