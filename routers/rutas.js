const express = require("express");
const router = express.Router();

const areasRouter = require("./areas");
const departamentosRouter = require("./departamentos");
const empleadosRouter = require("./empleados");
const encargadosRouter = require("./encargados");

global.areas = areasRouter.areas;
global.departamentos = departamentosRouter.departamentos;
global.encargados = encargadosRouter.encargados;
global.empleados = empleadosRouter.empleados;

router.use("/areas", areasRouter);
router.use("/departamentos", departamentosRouter);
router.use("/empleados", empleadosRouter);
router.use("/encargados", encargadosRouter);

module.exports = router;
