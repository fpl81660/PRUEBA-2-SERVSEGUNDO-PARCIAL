const express = require("express");
const router = express.Router();

let departamentos = [
  { id: 1, nombre: "Sistemas", idArea: 5, idEncargado: 1 },
  { id: 2, nombre: "Finanzas", idArea: 4, idEncargado: 2 },
  { id: 3, nombre: "Recursos Humanos", idArea: 10, idEncargado: 3 },
  { id: 4, nombre: "Administración", idArea: 3, idEncargado: 4 },
  { id: 5, nombre: "Compras", idArea: 8, idEncargado: 5 },
  { id: 6, nombre: "Producción", idArea: 7, idEncargado: 6 },
  { id: 7, nombre: "Investigación", idArea: 9, idEncargado: 7 },
  { id: 8, nombre: "Comunicaciones", idArea: 6, idEncargado: 8 },
  { id: 9, nombre: "Laboratorios", idArea: 2, idEncargado: 9 },
  { id: 10, nombre: "Central", idArea: 1, idEncargado: 10 },
];

// CRUD completo
router.get("/", (req, res) => res.json(departamentos));
router.get("/:id", (req, res) => {
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });
  res.json(dep);
});

router.post("/", (req, res) => {
  const id = departamentos.length + 1;
  const nuevo = { id, ...req.body };
  departamentos.push(nuevo);
  res.status(201).json({ message: "Departamento creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });

  const { id: nuevoId, nombre, idArea, idEncargado } = req.body;

  if (nuevoId && nuevoId !== dep.id) {
    const existe = departamentos.some(d => d.id === nuevoId);
    if (existe) return res.status(400).json({ message: "El ID ya existe" });

    // actualizar relación en empleados
    const { empleados } = require("./empleados");
    empleados.forEach(e => { if(e.idDepartamento === dep.id) e.idDepartamento = nuevoId; });

    dep.id = nuevoId;
  }

  if (nombre) dep.nombre = nombre;
  if (idArea) dep.idArea = idArea;
  if (idEncargado) dep.idEncargado = idEncargado;

  res.json({ message: "Departamento actualizado", data: dep });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dep = departamentos.find(d => d.id == id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });

  const { empleados } = require("./empleados");
  const usado = empleados.some(e => e.idDepartamento == id);
  if (usado) return res.status(400).json({ message: "No se puede eliminar: departamento tiene empleados" });

  departamentos = departamentos.filter(d => d.id != id);
  res.json({ message: "Departamento eliminado correctamente" });
});

module.exports = router;
module.exports.departamentos = departamentos;
