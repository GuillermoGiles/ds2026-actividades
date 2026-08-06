import { Autor } from "../types/autor.types";

let autores: Autor[] = [
  { id: 1, nombre: "Antoine de Saint-Exupéry", nacionalidad: "Francesa" },
  { id: 2, nombre: "George Orwell", nacionalidad: "Británica" },
  { id: 3, nombre: "Gabriel García Márquez", nacionalidad: "Colombiana" }
];

let proximoId = 4;

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find(a => a.id === id);
}

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = { id: proximoId++, ...datos };
  autores.push(nuevo);
  return nuevo;
}

export function update(id: number, datos: Omit<Autor, "id">): Autor | undefined {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) return undefined;
  autores[index] = { id, ...datos };
  return autores[index];
}

export function remove(id: number): boolean {
  const index = autores.findIndex(a => a.id === id);
  if (index === -1) return false;
  autores.splice(index, 1);
  return true;
}
