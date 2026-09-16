import { prisma } from "../config/prisma";
import { AutorCreate, AutorUpdate } from "../validations/autor.validation";
import { Prisma } from "@prisma/client";

export type AutorModel = Prisma.AutorGetPayload<{}>;

export async function findAll(): Promise<AutorModel[]> {
  return prisma.autor.findMany();
}

export async function findById(id: number): Promise<AutorModel | null> {
  return prisma.autor.findUnique({
    where: { id },
  });
}

export async function findLibrosByAutor(id: number) {
  return prisma.libro.findMany({
    where: { autorId: id },
    include: { categorias: true }
  });
}

export async function create(datos: AutorCreate): Promise<AutorModel> {
  return prisma.autor.create({
    data: datos,
  });
}

export async function update(id: number, datos: AutorUpdate): Promise<AutorModel> {
  return prisma.autor.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.autor.delete({ where: { id } });
}
