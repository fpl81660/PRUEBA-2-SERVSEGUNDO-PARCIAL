const express = require("express");
const app = express();
const routerApi = require('./routers/rutas'); // 👈 CAMBIADO a "routers"
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola desde mi server de express 3");
});

app.get("/nuevaruta", (req, res) => {
  res.send("Hola este es el segundo endpoint");
});

// Montar rutas API
routerApi(app);

app.listen(port, () => {
  console.log("My port is working on: " + port);
});
