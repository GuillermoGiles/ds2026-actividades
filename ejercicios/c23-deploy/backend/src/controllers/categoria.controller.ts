import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(_req: Request, res: Response) {
  const categorias = await categoriaService.findAll();
  return res.json(categorias);
}

export async function getById(req: Request, res: Response) {
  const categoria = await categoriaService.findById(req.params.id as any);
  if (!categoria) return res.status(404).json({ error: "Categoría no encontrada" });
  return res.json(categoria);
}

export async function create(req: Request, res: Response) {
  const nuevo = await categoriaService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const actualizado = await categoriaService.update(req.params.id as any, req.body);
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  await categoriaService.remove(req.params.id as any);
  return res.status(204).send();
}
