const express = require("express");
const router = express.Router();

let areas = [
  { id: 1, nombre: "Edificio Central", edificio: "A" },
  { id: 2, nombre: "Laboratorios", edificio: "B" },
  { id: 3, nombre: "Administración", edificio: "C" },
  { id: 4, nombre: "Finanzas", edificio: "D" },
  { id: 5, nombre: "Sistemas", edificio: "E" },
  { id: 6, nombre: "Comunicaciones", edificio: "F" },
  { id: 7, nombre: "Producción", edificio: "G" },
  { id: 8, nombre: "Compras", edificio: "H" },
  { id: 9, nombre: "Investigación", edificio: "I" },
  { id: 10, nombre: "Recursos Humanos", edificio: "J" },
];
let nextId = 11; // 👈 Variable para el siguiente ID

// GET todas
router.get("/", (req, res) => res.json(areas));

// GET por ID
router.get("/:id", (req, res) => {
  const area = areas.find(a => a.id == req.params.id);
  if (!area) return res.status(404).json({ message: "Área no encontrada" });
  res.json(area);
});

// POST crear
router.post("/", (req, res) => {
  const { nombre, edificio } = req.body;
  const nueva = { id: nextId++, nombre, edificio }; // 👈 Lógica de ID autoincremental
  areas.push(nueva);
  res.status(201).json({ message: "Área creada", data: nueva });
});

// PUT actualizar (puede cambiar id y datos)
router.put("/:id", (req, res) => {
  const area = areas.find(a => a.id == req.params.id);
  if (!area) return res.status(404).json({ message: "Área no encontrada" });

  const { id: nuevoId, nombre, edificio } = req.body;
  if (nuevoId && nuevoId !== area.id) {
    const existe = areas.some(a => a.id === nuevoId);
    if (existe) return res.status(400).json({ message: "El ID ya existe" });
    area.id = nuevoId;
  }

  if (nombre) area.nombre = nombre;
  if (edificio) area.edificio = edificio;

  res.json({ message: "Área actualizada", data: area });
});

// DELETE solo si no afecta departamentos
router.delete("/:id", (req, res) => {
  const { departamentos } = require("./departamentos");
  const id = parseInt(req.params.id);
  const area = areas.find(a => a.id == id);

  if (!area) return res.status(404).json({ message: "Área no encontrada" });
  const usada = departamentos.some(d => d.idArea == id);
  if (usada) return res.status(400).json({ message: "No se puede eliminar: área vinculada a departamentos" });

  areas = areas.filter(a => a.id != id);
  res.json({ message: "Área eliminada correctamente" });
});

module.exports = router;
module.exports.areas = areas;