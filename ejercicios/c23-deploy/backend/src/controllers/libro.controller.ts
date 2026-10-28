import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(req: Request, res: Response) {
  let disponible;
  if (req.query.disponible === 'true') disponible = true;
  if (req.query.disponible === 'false') disponible = false;
  
  const categoria = req.query.categoria as string | undefined;

  const libros = await libroService.findAll({ disponible, categoria });
  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const libro = await libroService.findById(req.params.id as any);
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const actualizado = await libroService.update(req.params.id as any, req.body);
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  await libroService.remove(req.params.id as any);
  return res.status(204).send();
}
