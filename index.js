const express = require("express");
const app = express();
const routes = require("./routers/rutas");

app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Hola desde mi server express"
  );
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
