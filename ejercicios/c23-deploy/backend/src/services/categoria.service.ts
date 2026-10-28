import { prisma } from "../config/prisma";
import { Prisma } from "@prisma/client";
import { CategoriaCreate, CategoriaUpdate } from "../validations/categoria.validation";

export type CategoriaModel = Prisma.CategoriaGetPayload<{}>;

export async function findAll(): Promise<CategoriaModel[]> {
  return prisma.categoria.findMany();
}

export async function findById(id: number): Promise<CategoriaModel | null> {
  return prisma.categoria.findUnique({
    where: { id },
  });
}

export async function create(datos: CategoriaCreate): Promise<CategoriaModel> {
  return prisma.categoria.create({
    data: datos,
  });
}

export async function update(id: number, datos: CategoriaUpdate): Promise<CategoriaModel> {
  return prisma.categoria.update({
    where: { id },
    data: datos,
  });
}

export async function remove(id: number): Promise<void> {
  await prisma.categoria.delete({ where: { id } });
}
