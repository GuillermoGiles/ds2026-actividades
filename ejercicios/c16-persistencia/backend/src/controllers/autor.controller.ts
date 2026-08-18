import { Request, Response } from "express";
import * as autorService from "../services/autor.service";

export async function getAll(_req: Request, res: Response) {
  const autores = await autorService.findAll();
  return res.json(autores);
}

export async function getById(req: Request, res: Response) {
  const autor = await autorService.findById(Number(req.params.id));
  if (!autor) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(autor);
}

export async function create(req: Request, res: Response) {
  const nuevo = await autorService.create(req.body);
  return res.status(201).json(nuevo);
}

export async function update(req: Request, res: Response) {
  const actualizado = await autorService.update(Number(req.params.id), req.body);
  if (!actualizado) return res.status(404).json({ error: "Autor no encontrado" });
  return res.json(actualizado);
}

export async function remove(req: Request, res: Response) {
  const eliminado = await autorService.remove(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ error: "Autor no encontrado" });
  return res.status(204).send();
}
