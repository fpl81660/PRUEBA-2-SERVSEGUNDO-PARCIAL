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
let nextId = 11;

router.get("/", (req, res) => res.json(areas));

router.get("/:id", (req, res) => {
  const area = areas.find(area => area.id == req.params.id);
  if (!area) return res.status(404).json({ message: "Área no encontrada" });
  res.json(area);
});

router.post("/", (req, res) => {
  const { nombre, edificio } = req.body;
    if (!nombre) {
    return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
  }
  const nueva = { id: nextId++, nombre, edificio };
  areas.push(nueva);
  res.status(201).json({ message: "Área creada", data: nueva });
});

router.put("/:id", (req, res) => {
  const area = areas.find(area => area.id == req.params.id);
  if (!area) return res.status(404).json({ message: "Área no encontrada" });

  const { nombre, edificio } = req.body;
  if (nombre) area.nombre = nombre;
  if (edificio) area.edificio = edificio;

  res.json({ message: "Área actualizada", data: area });
});

router.delete("/:id", (req, res) => {
  const { departamentos } = require("./departamentos");
  const id = parseInt(req.params.id);

  const areaIndex = areas.findIndex(area => area.id == id);

  if (areaIndex === -1) {
    return res.status(404).json({ message: "Área no encontrada" });
  }

  const usada = departamentos.some(departamento => departamento.idArea == id);
  if (usada) {
    return res.status(400).json({ message: "No se puede eliminar: área vinculada a departamentos" });
  }

  areas.splice(areaIndex, 1);
  res.json({ message: "Área eliminada correctamente" });
});

module.exports = router;
module.exports.areas = areas;