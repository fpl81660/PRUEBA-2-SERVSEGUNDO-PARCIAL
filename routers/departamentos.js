const express = require('express');
const router = express.Router();
let departamentos = require('../data/departamentos');

// GET todos
router.get('/', (req, res) => res.json(departamentos));

// GET por ID
router.get('/:id', (req, res) => {
  const {id} = req.params; // Cambiado de req.params.numDepartamento a req.params.id
  const departament = departamentos.find((departament) => dep.numDepartamento == id);
  if (!departament) return res.status(404).json({ mensaje: 'Departamento no encontrado' });
  res.json(departament);
});


// POST
router.post('/', (req, res) => {
  const nuevo = { id: departamentos.length + 1, ...req.body };
  departamentos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = departamentos.findIndex(dep => dep.id === id);
  if (index === -1) return res.status(404).json({ mensaje: 'Departamento no encontrado' });
  departamentos[index] = { ...departamentos[index], ...req.body };
  res.json(departamentos[index]);
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  departamentos = departamentos.filter(dep => dep.id !== id);
  res.json({ mensaje: 'Departamento eliminado' });
});

module.exports = router;
