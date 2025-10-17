const express = require("express");
const router = express.Router();
let { empleados } = require("./empleados");
let { areas } = require("./areas");
let { encargados } = require("./encargados");

let departamentos = [
  { id: 1, nombre: "Sistemas", idArea: 5, idEncargado: 1 },
  { id: 2, nombre: "Finanzas", idArea: 4, idEncargado: 2 },
  { id: 3, nombre: "Recursos Humanos", idArea: 9, idEncargado: 3 },
  { id: 4, nombre: "Administración", idArea: 3, idEncargado: 4 },
  { id: 5, nombre: "Compras", idArea: 8, idEncargado: 5 },
  { id: 6, nombre: "Producción", idArea: 7, idEncargado: 6 },
  { id: 7, nombre: "Investigación", idArea: 9, idEncargado: 7 },
  { id: 8, nombre: "Comunicaciones", idArea: 6, idEncargado: 8 },
  { id: 9, nombre: "Laboratorios", idArea: 2, idEncargado: 9 },
  { id: 10, nombre: "Central", idArea: 1, idEncargado: 10 },
];
let nextId = 11;

router.get("/", (req, res) => res.json(departamentos));

router.get("/:id", (req, res) => {
  const departamento = departamentos.find(departamento => departamento.id == req.params.id);
  if (!departamento) return res.status(404).json({ message: "Departamento no encontrado" });
  res.json(departamento);
});

router.post("/", (req, res) => {
  const { nombre, idArea, idEncargado } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
  }

  if (idArea && !areas.some(area => area.id === idArea)) {
    return res.status(400).json({ message: "El idArea proporcionado no existe." });
  }

  if (idEncargado && !encargados.some(encargado => encargado.id === idEncargado)) {
    return res.status(400).json({ message: "El idEncargado proporcionado no existe." });
  }

  const nuevo = {
    id: nextId++,
    nombre,
    idArea: idArea || null,
    idEncargado: idEncargado || null,
  };

  departamentos.push(nuevo);
  res.status(201).json({ message: "Departamento creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const departamento = departamentos.find(departamento => departamento.id == req.params.id);
  if (!departamento) return res.status(404).json({ message: "Departamento no encontrado" });

  const { nombre, idArea, idEncargado } = req.body;

  if (idArea && !areas.some(area => area.id === idArea)) {
    return res.status(400).json({ message: "El idArea no existe" });
  }

  if (idEncargado && !encargados.some(encargado => encargado.id === idEncargado)) {
    return res.status(400).json({ message: "El idEncargado no existe" });
  }

  if (nombre) departamento.nombre = nombre;



  if (req.body.hasOwnProperty('idArea')) {
    departamento.idArea = idArea;
  }
  if (req.body.hasOwnProperty('idEncargado')) {
    departamento.idEncargado = idEncargado;
  }

  res.json({ message: "Departamento actualizado", data: departamento });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const departamentoIndex = departamentos.findIndex(departamento => departamento.id == id);

  if (departamentoIndex === -1) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  const departamento = departamentos[departamentoIndex];

  const usadoPorEmpleado = empleados.some(empleado => empleado.idDepartamento.includes(id));
  if (usadoPorEmpleado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento tiene empleados asignados." });
  }

  if (departamento.idEncargado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento ya tiene un encargado." });
  }

  departamentos.splice(departamentoIndex, 1);
  res.json({ message: "Departamento eliminado correctamente" });
});

module.exports = router;
module.exports.departamentos = departamentos;