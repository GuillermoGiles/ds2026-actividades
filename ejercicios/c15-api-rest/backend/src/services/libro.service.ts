import { Libro } from "../types/libro.types";

let libros: Libro[] = [
  { id: 1, titulo: "El principito", autor: "Antoine de Saint-Exupéry", precio: 4500, imagen: "https://images.cdn1.buscalibre.com/fit-in/360x360/e8/35/e8354c3cf7b2b07e59f471e956bc5693.jpg", disponible: true },
  { id: 2, titulo: "1984", autor: "George Orwell", precio: 6200, imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/cb/54/cb541eb20c02e1bdfc08f44ff53e8dd2.jpg", disponible: true },
  { id: 3, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", precio: 7800, imagen: "https://images.cdn2.buscalibre.com/fit-in/360x360/bf/4e/bf4e8c1569cefa92025edca4c6bd2dc0.jpg", disponible: false }
];

let proximoId = 4;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(l => l.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(l => l.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Libro, "id">): Libro | undefined {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return undefined;
  libros[index] = { id, ...datos };
  return libros[index];
}

export function remove(id: number): boolean {
  const index = libros.findIndex(l => l.id === id);
  if (index === -1) return false;
  libros.splice(index, 1);
  return true;
}
