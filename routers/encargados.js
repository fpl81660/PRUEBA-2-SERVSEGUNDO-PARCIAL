const express = require("express");
const router = express.Router();

let encargados = [
  { id: 1, nombre: "Luis", estudio: "Ingeniero", turno: "Matutino" },
  { id: 2, nombre: "María", estudio: "Licenciada", turno: "Vespertino" },
  { id: 3, nombre: "Pedro", estudio: "Técnico", turno: "Nocturno" },
  { id: 4, nombre: "Lucía", estudio: "Ingeniera", turno: "Matutino" },
  { id: 5, nombre: "Carlos", estudio: "Licenciado", turno: "Vespertino" },
  { id: 6, nombre: "Andrea", estudio: "Técnica", turno: "Nocturno" },
  { id: 7, nombre: "Hugo", estudio: "Ingeniero", turno: "Matutino" },
  { id: 8, nombre: "Rosa", estudio: "Licenciada", turno: "Vespertino" },
  { id: 9, nombre: "Ernesto", estudio: "Ingeniero", turno: "Nocturno" },
  { id: 10, nombre: "Mónica", estudio: "Técnica", turno: "Matutino" },
];
let nextId = 11; // 👈 Variable para el siguiente ID

// CRUD completo
router.get("/", (req, res) => res.json(encargados));

router.get("/:id", (req, res) => {
  const enc = encargados.find(e => e.id == req.params.id);
  if (!enc) return res.status(404).json({ message: "Encargado no encontrado" });
  res.json(enc);
});

router.post("/", (req, res) => {
  const nuevo = { id: nextId++, ...req.body }; // 👈 Lógica de ID autoincremental
  encargados.push(nuevo);
  res.status(201).json({ message: "Encargado creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const enc = encargados.find(e => e.id == req.params.id);
  if (!enc) return res.status(404).json({ message: "Encargado no encontrado" });

  const { id: nuevoId, nombre, estudio, turno } = req.body;
  if (nuevoId && nuevoId !== enc.id) {
    const existe = encargados.some(e => e.id === nuevoId);
    if (existe) return res.status(400).json({ message: "El ID ya existe" });
    enc.id = nuevoId;
  }
  if (nombre) enc.nombre = nombre;
  if (estudio) enc.estudio = estudio;
  if (turno) enc.turno = turno;

  res.json({ message: "Encargado actualizado", data: enc });
});

router.delete("/:id", (req, res) => {
  const { departamentos } = require("./departamentos");
  const id = parseInt(req.params.id);
  const enc = encargados.find(e => e.id == id);

  if (!enc) return res.status(404).json({ message: "Encargado no encontrado" });
  const usado = departamentos.some(d => d.idEncargado == id);
  if (usado) return res.status(400).json({ message: "No se puede eliminar: encargado vinculado a un departamento" });

  encargados = encargados.filter(e => e.id != id);
  res.json({ message: "Encargado eliminado correctamente" });
});

module.exports = router;
module.exports.encargados = encargados;