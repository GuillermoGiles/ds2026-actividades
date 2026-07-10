import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
