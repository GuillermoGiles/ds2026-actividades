import { prisma } from "../config/prisma";
import type { Libro } from "../types/libro.types";

export async function findAll(): Promise<Libro[]> {
  return prisma.libro.findMany();
}

export async function findById(id: number): Promise<Libro | null> {
  return prisma.libro.findUnique({
    where: { id },
  });
}

export async function create(datos: Omit<Libro, "id">): Promise<Libro> {
  return prisma.libro.create({
    data: datos,
  });
}

export async function update(id: number, datos: Omit<Libro, "id">): Promise<Libro | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;

  return prisma.libro.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;

  await prisma.libro.delete({ where: { id } });
  return true;
}
