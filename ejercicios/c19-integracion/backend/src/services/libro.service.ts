import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import { LibroCreate, LibroUpdate } from "../validations/libro.validation";

export type LibroConAutor = Prisma.LibroGetPayload<{ include: { autor: true } }>;

export async function findAll(filtros: { disponible?: boolean, categoria?: string } = {}): Promise<LibroConAutor[]> {
  const where: Prisma.LibroWhereInput = {};
  if (filtros.disponible !== undefined) where.disponible = filtros.disponible;
  if (filtros.categoria) where.categorias = { some: { nombre: filtros.categoria } };

  return prisma.libro.findMany({
    where,
    include: { autor: true }
  });
}

export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true }
}>;

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true }
  });
}

export async function create(datos: LibroCreate): Promise<LibroDetalle> {
  const { categorias, ...resto } = datos;

  const autorExiste = await prisma.autor.findUnique({ where: { id: resto.autorId } });
  if (!autorExiste) {
    throw { status: 400, message: "El autor no existe" };
  }

  return prisma.libro.create({
    data: {
      ...resto,
      categorias: categorias ? { connect: categorias.map(id => ({ id })) } : undefined
    },
    include: { autor: true, categorias: true }
  });
}

export async function update(id: number, datos: LibroUpdate): Promise<LibroDetalle> {
  const { categorias, ...resto } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...resto,
      categorias: categorias ? { set: categorias.map(id => ({ id })) } : undefined
    },
    include: { autor: true, categorias: true }
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.libro.delete({ where: { id } });
}
