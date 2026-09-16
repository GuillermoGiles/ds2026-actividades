import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import libroRoutes from "./routes/libro.routes";
import autorRoutes from "./routes/autor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// CORS: el origen del front viene por variable de entorno. Lista explícita, nunca "*":
// con "*" el navegador no deja mandar el header Authorization.
// Va ANTES de express.json() y de las rutas, si no no agrega los headers.
const corsOptions = {
  origin: [process.env.FRONTEND_URL ?? "http://localhost:5173"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

app.use("/api/auth", authRoutes);
app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/categorias", categoriaRoutes);

// 404 en JSON: después de las rutas y antes del errorHandler.
// Sin esto, Express contesta un 404 en HTML y el res.json() del front explota.
app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

app.use(errorHandler as express.ErrorRequestHandler);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
