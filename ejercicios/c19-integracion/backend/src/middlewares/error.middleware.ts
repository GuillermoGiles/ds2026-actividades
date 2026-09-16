import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: unknown, _req: Request, res: Response, _next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues.map(i => ({ campo: i.path.join("."), mensaje: i.message }))
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return res.status(409).json({ error: "Ya existe un registro con ese valor" });
    if (err.code === "P2025") return res.status(404).json({ error: "No encontrado" });
    if (err.code === "P2003") return res.status(409).json({ error: "Hay registros relacionados" });
  }

  if (err && typeof err === 'object' && 'status' in err && 'message' in err) {
    return res.status((err as any).status).json({ error: (err as any).message });
  }

  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
};
