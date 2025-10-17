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
let nextId = 11;

router.get("/", (req, res) => res.json(encargados));

router.get("/:id", (req, res) => {
  const encargado = encargados.find(encargado => encargado.id == req.params.id);
  if (!encargado) return res.status(404).json({ message: "Encargado no encontrado" });
  res.json(encargado);
});

router.post("/", (req, res) => {
    const { nombre, estudio, turno } = req.body;
    if (!nombre || !estudio || !turno) {
        return res.status(400).json({ message: "Los campos 'nombre', 'estudio' y 'turno' son obligatorios." });
    }
  const nuevo = {
    id: nextId++,
    nombre: nombre,
    estudio: estudio,
    turno: turno
  };
  encargados.push(nuevo);
  res.status(201).json({ message: "Encargado creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const encargado = encargados.find(encargado => encargado.id == req.params.id);
  if (!encargado) return res.status(404).json({ message: "Encargado no encontrado" });

  const { nombre, estudio, turno } = req.body;

  if (nombre) encargado.nombre = nombre;
  if (estudio) encargado.estudio = estudio;
  if (turno) encargado.turno = turno;

  res.json({ message: "Encargado actualizado", data: encargado });
});

router.delete("/:id", (req, res) => {
  const { departamentos } = require("./departamentos");
  const id = parseInt(req.params.id);

  const encargadoIndex = encargados.findIndex(encargado => encargado.id == id);

  if (encargadoIndex === -1) {
    return res.status(404).json({ message: "Encargado no encontrado" });
  }

  const usado = departamentos.some(departamento => departamento.idEncargado == id);
  if (usado) {
    return res.status(400).json({ message: "No se puede eliminar: encargado vinculado a un departamento" });
  }

  encargados.splice(encargadoIndex, 1);
  res.json({ message: "Encargado eliminado correctamente" });
});

module.exports = router;
module.exports.encargados = encargados;