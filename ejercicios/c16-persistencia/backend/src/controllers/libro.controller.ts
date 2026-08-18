import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export async function getAll(_req: Request, res: Response) {
  const libros = await libroService.findAll();
  return res.json(libros);
}

export async function getById(req: Request, res: Response) {
  const libro = await libroService.findById(Number(req.params.id));
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(libro);
}

export async function create(req: Request, res: Response) {
  const nuevo = await libroService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const actualizado = await libroService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const eliminado = await libroService.remove(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: "Libro no encontrado" });
  return res.status(204).send();
}
