import { Request, Response } from "express";
import * as libroService from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const disponible = req.query.disponible === 'true' ? true : req.query.disponible === 'false' ? false : undefined;
  const libros = libroService.findAll(disponible);
  res.json(libros);
}

export function getById(req: Request, res: Response) {
  const libro = libroService.findById(Number(req.params.id));
  if (!libro) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevo = libroService.create(req.body);
  res.status(201).json(nuevo);
}

export function update(req: Request, res: Response) {
  const actualizado = libroService.update(Number(req.params.id), req.body);
  if (!actualizado) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.json(actualizado);
}

export function remove(req: Request, res: Response) {
  const ok = libroService.remove(Number(req.params.id));
  if (!ok) {
    res.status(404).json({ error: "Libro no encontrado" });
    return;
  }
  res.status(204).send();
}
