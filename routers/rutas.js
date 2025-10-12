const express = require('express');

const empleadosRouter = require('./empleados');
const departamentosRouter = require('./departamentos');
const encargadosRouter = require('./encargados');
const areasRouter = require('./areas');

function routerApi(app) {
  // ya no hay "api/v1"
  app.use('/empleados', empleadosRouter);
  app.use('/departamentos', departamentosRouter);
  app.use('/encargados', encargadosRouter);
  app.use('/areas', areasRouter);
}

module.exports = routerApi;

