const express = require("express");
const router = express.Router();
let { departamentos } = require("./departamentos");

let empleados = [
  { id: 1, nombre: "Ana", apellido: "Gómez", edad: 30, genero: "F", idDepartamento: [1, 2, null] },
  { id: 2, nombre: "Luis", apellido: "Pérez", edad: 25, genero: "M", idDepartamento: [2, 3] },
  { id: 3, nombre: "Marta", apellido: "Luna", edad: 28, genero: "F", idDepartamento: [3] },
  { id: 4, nombre: "Carlos", apellido: "Reyes", edad: 35, genero: "M", idDepartamento: [4, 5, 6] },
  { id: 5, nombre: "Lucía", apellido: "Ruiz", edad: 29, genero: "F", idDepartamento: [5] },
  { id: 6, nombre: "Hugo", apellido: "Flores", edad: 32, genero: "M", idDepartamento: [6, null, null] },
  { id: 7, nombre: "Rosa", apellido: "Díaz", edad: 27, genero: "F", idDepartamento: [7] },
  { id: 8, nombre: "Andrés", apellido: "Salas", edad: 31, genero: "M", idDepartamento: [8] },
  { id: 9, nombre: "Paula", apellido: "López", edad: 33, genero: "F", idDepartamento: [9, 10] },
  { id: 10, nombre: "David", apellido: "Ortiz", edad: 26, genero: "M", idDepartamento: [10] },
];
let nextId = 11;

router.get("/", (req, res) => res.status(200).json(empleados));

router.get("/:id", (req, res) => {
  const empleado = empleados.find(empleado => empleado.id == req.params.id);
  if (!empleado) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json(empleado);
});

router.post("/", (req, res) => {
  const { nombre, apellido, edad, genero, idDepartamento } = req.body;

  if (!nombre || !apellido || !edad || !genero) {
    return res.status(400).json({ message: "Los campos 'nombre', 'apellido', 'edad' y 'genero' son obligatorios." });
  }
  if (idDepartamento) {
    const DepartamentosExistentes = idDepartamento
      .filter(id => id !== null) 
      .every(id => departamentos.some(departamento => departamento.id === id));

    if (!DepartamentosExistentes) {
      return res.status(400).json({ message: "Uno o más de los idDepartamento no existen." });
    }
  }

  if (idDepartamento.length > 3) {
    return res.status(400).json({ message: "Un empleado no puede estar asignado a más de 3 departamentos." });
  }

  const nuevo = {
    id: nextId++,
    nombre: nombre,
    apellido: apellido,
    edad: edad,
    genero: genero,
    idDepartamento: idDepartamento
  };

  empleados.push(nuevo);
  res.status(201).json({ message: "Empleado creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const empleado = empleados.find(empleado => empleado.id == req.params.id);
  if (!empleado) return res.status(404).json({ message: "Empleado no encontrado" });

  const { nombre, apellido, edad, genero, idDepartamento } = req.body;

  


  if (idDepartamento) {
    const DepartamentosExistentes = idDepartamento
      .filter(id => id !== null) 
      .every(id => departamentos.some(departamento => departamento.id === id));

    if (!DepartamentosExistentes) {
      return res.status(400).json({ message: "Uno o más de los idDepartamento no existen." });
    }
  }
  
  if (idDepartamento.length > 3) {
    return res.status(400).json({ message: "Un empleado no puede estar asignado a más de 3 departamentos." });
  }

  if (nombre) empleado.nombre = nombre;
  if (apellido) empleado.apellido = apellido;
  if (edad) empleado.edad = edad;
  if (genero) empleado.genero = genero;
  if (idDepartamento) empleado.idDepartamento = idDepartamento;

  res.json({ message: "Empleado actualizado", data: empleado });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const empleadoIndex = empleados.findIndex(empleado => empleado.id == id);

  if (empleadoIndex > -1) {
    empleados.splice(empleadoIndex, 1);
    res.json({ message: "Empleado eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Empleado no encontrado" });
  }
});

module.exports = router;
module.exports.empleados = empleados;