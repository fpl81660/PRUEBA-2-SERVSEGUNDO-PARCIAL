const express = require('express');
const router = express.Router();
let {encargados} = require('../data/encargados');

// GET todos
router.get('/', (req, res) => res.json(encargados));

// GET por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const encargado = encargados.find(e => e.idEncargado === id);
  if (!encargado) return res.status(404).json({ mensaje: 'Encargado no encontrado' });
  res.json(encargado);
});

// POST
router.post('/', (req, res) => {
  const nuevo = { idEncargado: encargados.length + 1, ...req.body };
  encargados.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = encargados.findIndex(e => e.idEncargado === id);
  if (index === -1) return res.status(404).json({ mensaje: 'Encargado no encontrado' });
  encargados[index] = { ...encargados[index], ...req.body };
  res.json(encargados[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  encargados = encargados.filter(e => e.idEncargado !== id);
  res.json({ mensaje: 'Encargado eliminado' });
});

module.exports = router;
