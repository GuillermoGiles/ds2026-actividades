// Tipos alineados con el JSON real que devuelve la API (Prisma con include: { autor: true })

export type Autor = {
  id: number;
  nombre: string;
  nacionalidad: string;
};

export type Categoria = {
  id: number;
  nombre: string;
};

// GET /libros devuelve el autor anidado como objeto, no como string
export type Libro = {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autorId: number;
  autor: Autor;
};

// GET /libros/:id además trae las categorías
export type LibroDetalle = Libro & {
  categorias: Categoria[];
};
