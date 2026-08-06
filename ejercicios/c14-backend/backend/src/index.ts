import express from "express";

const app = express();
const PORT = 3000;

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

const libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/e8/35/e8354c3cf7b2b07e59f471e956bc5693.jpg", disponible: true },
  { id: 2, titulo: "1984", autor: "George Orwell", precio: 6200, imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/cb/54/cb541eb20c02e1bdfc08f44ff53e8dd2.jpg", disponible: true },
  { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 7800, imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/bf/4e/bf4e8c1569cefa92025edca4c6bd2dc0.jpg", disponible: false }
];

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de la Librería — ¡hola desde un contenedor! 🐳" });
});

const autores = [
  { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francesa" },
  { id: 2, nombre: "George Orwell", nacionalidad: "Británica" },
  { id: 3, nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" }
];

app.get("/libros", (req, res) => {
  if (req.query.disponible === 'true') {
    res.json(libros.filter(l => l.disponible === true));
  } else {
    res.json(libros);
  }
});

app.get("/autores", (_req, res) => {
  res.json(autores);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
