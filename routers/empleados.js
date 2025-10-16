
const express = require("express");
const router = express.Router(); 

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

// CRUD completo
router.get("/", (req, res) => res.json(empleados));


router.get("/:id", (req, res) => {
  const emp = empleados.find(e => e.id == req.params.id);
  if (!emp){ return res.status(404).json({ message: "Empleado no encontrado" });
  }
   res.json(emp); 
});

//empleados.find(e => e.idDepartamento == idDepartamento==null
router.post("/", (req, res) => {
  const id = empleados.length + 1;
  const nuevo = { id, ...req.body };
  empleados.push(nuevo);
  res.status(201).json({ message: "Empleado creado", data: nuevo });
});

router.put("/:id", (req, res) => {
  const emp = empleados.find(e => e.id == req.params.id);
  if (!emp) return res.status(404).json({ message: "Empleado no encontrado" });

  const { nombre, apellido, edad, genero, idDepartamento } = req.body;
  if (nombre) emp.nombre = nombre;
  if (apellido) emp.apellido = apellido;
  if (edad) emp.edad = edad;
  if (genero) emp.genero = genero;
  if (idDepartamento) emp.idDepartamento = idDepartamento;

  res.json({ message: "Empleado actualizado", data: emp });
});


router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employeeIndex = empleados.findIndex(e => e.id == id);

  if (employeeIndex > -1) {
    empleados.splice(employeeIndex, 1);
    res.json({ message: "Empleado eliminado correctamente" });
  } else {
    res.status(404).json({ message: "Empleado no encontrado" });
  }
});

module.exports = router;
module.exports.empleados = empleados;
