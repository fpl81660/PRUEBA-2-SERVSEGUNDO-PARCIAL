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


router.get("/", (req, res) => res.json(departamentos));
router.get("/:id", (req, res) => {
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });
  res.json(dep);
});



router.post("/", (req, res) => {
  const  { nombre, idArea, idEncargado } = req.body;


  if (!nombre) {
    return res.status(400).json({ message: "El campo 'nombre' es obligatorio." });
  }

  if (idArea && !areas.some(a => a.id === idArea)) {
    return res.status(400).json({ message: "El idArea proporcionado no existe." });
  }

 
  if (idEncargado && !encargados.some(e => e.id === idEncargado)) {
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
  const dep = departamentos.find(d => d.id == req.params.id);
  if (!dep) return res.status(404).json({ message: "Departamento no encontrado" });

  const { id: nuevoId, nombre, idArea, idEncargado } = req.body;

  if (idArea && !areas.some(a => a.id === idArea)) {
    return res.status(400).json({ message: "El idArea no existe" });
  }
  
  if (idEncargado && !encargados.some(e => e.id === idEncargado)) {
    return res.status(400).json({ message: "El idEncargado no existe" });
  }

  if (nuevoId && nuevoId !== dep.id) {
    if (departamentos.some(d => d.id === nuevoId)) {
      return res.status(400).json({ message: "El ID ya existe" });
    }
    empleados.forEach(e => { if(e.idDepartamento === dep.id) e.idDepartamento = nuevoId; });
    dep.id = nuevoId;
  }

  if (nombre) dep.nombre = nombre;
  
  if (req.body.hasOwnProperty('idArea')) {
    dep.idArea = idArea;
  }
  if (req.body.hasOwnProperty('idEncargado')) {
    dep.idEncargado = idEncargado;
  }

  res.json({ message: "Departamento actualizado", data: dep });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const depIndex = departamentos.findIndex(d => d.id == id);

  if (depIndex === -1) {
    return res.status(404).json({ message: "Departamento no encontrado" });
  }

  const dep = departamentos[depIndex];

  const usadoPorEmpleado = empleados.some(e => e.idDepartamento.includes(id));
  if (usadoPorEmpleado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento tiene empleados asignados." });
  }

 
  if (dep.idEncargado) {
    return res.status(400).json({ message: "No se puede eliminar: el departamento ya tiene un encargado." });
  }

  departamentos.splice(depIndex, 1);
  res.json({ message: "Departamento eliminado correctamente" });
});

module.exports = router;
module.exports.departamentos = departamentos;