const express = require("express");
const app = express();
const routes = require("./routes/rutas");

app.use(express.json());
app.use("/", routes);

// ✅ Ruta raíz con mensaje visible en el navegador
app.get("/", (req, res) => {
  res.send(`
    <body style="font-family: Arial; text-align: center; margin-top: 50px; background: #f0f0f0;">
      <h1 style="color: #2d89ef;">🚀 Servidor corriendo correctamente</h1>
      <h2 style="color: #333;">🌐 URL: <a href="http://localhost:3000" style="color:#2d89ef;">http://localhost:3000</a></h2>
      <p style="color: #666;">✅ Puedes acceder a las rutas:
        <br>/areas | /departamentos | /encargados | /empleados
      </p>
    </body>
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("==========================================");
  console.log("🚀  Servidor corriendo correctamente");
  console.log(`🌐  URL: http://localhost:${PORT}`);
  console.log("✅  Presiona CTRL + C para detenerlo");
  console.log("==========================================");
});
