const express = require("express");
const router = express.Router();
let { empleados } = require("./empleados");
let { areas } = require("./areas");
let { encargados } = require("./encargados");

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
let nextId = 11;

// CRUD
router.get("/", (req, res) => res.json(departamentos));
router.get("/:id", (req, res) => {
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });
  res.json(dep);
});

// routers/departamentos.js

router.post("/", (req, res) => {
  const { nombre, idArea, idEncargado } = req.body;

  // Validar que el nombre no esté vacío
  if (!nombre) {
    return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
  }

  // 1. Validar idArea solo si se proporciona
  if (idArea && !areas.some(a => a.id === idArea)) {
    return res.status(400).json({ message: "El idArea proporcionado no existe." });
  }

  // 2. Validar idEncargado solo si se proporciona
  if (idEncargado && !encargados.some(e => e.id === idEncargado)) {
    return res.status(400).json({ message: "El idEncargado proporcionado no existe." });
  }

  // 3. Crear el nuevo objeto, asignando null si los IDs no vienen
  const nuevo = {
    id: nextId++,
    nombre,
    idArea: idArea || null,
    idEncargado: idEncargado || null,
  };

  departamentos.push(nuevo);
  res.status(201).json({ message: "Departamento creado", data: nuevo });
});

// routers/departamentos.js

router.put("/:id", (req, res) => {
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });

  const { id: nuevoId, nombre, idArea, idEncargado } = req.body;

  // Validar idArea solo si se proporciona y no es null
  if (idArea && !areas.some(a => a.id === idArea)) {
    return res.status(400).json({ message: "El idArea no existe" });
  }
  
  // Validar idEncargado solo si se proporciona y no es null
  if (idEncargado && !encargados.some(e => e.id === idEncargado)) {
    return res.status(400).json({ message: "El idEncargado no existe" });
  }

  // Lógica para actualizar el ID del departamento (se mantiene igual)
  if (nuevoId && nuevoId !== dep.id) {
    if (departamentos.some(d => d.id === nuevoId)) {
      return res.status(400).json({ message: "El ID ya existe" });
    }
    empleados.forEach(e => { if(e.idDepartamento === dep.id) e.idDepartamento = nuevoId; });
    dep.id = nuevoId;
  }

  // Actualizar los campos
  if (nombre) dep.nombre = nombre;
  
  // Usamos hasOwnProperty para permitir explícitamente asignar `null`
  if (req.body.hasOwnProperty('idArea')) {
    dep.idArea = idArea;
  }
  if (req.body.hasOwnProperty('idEncargado')) {
    dep.idEncargado = idEncargado;
  }

  res.json({ message: "Departamento actualizado", data: dep });
});
// routers/departamentos.js

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const depIndex = departamentos.findIndex(d => d.id == id);

  // 1. Verificar si el departamento existe
  if (depIndex === -1) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  const dep = departamentos[depIndex];

  // 2. Verificar si tiene empleados asignados
  const usadoPorEmpleado = empleados.some(e => e.idDepartamento == id);
  if (usadoPorEmpleado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento tiene empleados asignados." });
  }

  // 3. ¡Nueva Verificación! Verificar si tiene un encargado
  // Si 'idEncargado' tiene un valor (no es null o undefined), no se puede borrar.
  if (dep.idEncargado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento ya tiene un encargado." });
  }

  // 4. Si pasa todas las validaciones, se elimina
  departamentos.splice(depIndex, 1);
  res.json({ message: "Departamento eliminado correctamente" });
});

module.exports = router;
module.exports.departamentos = departamentos;