import { z } from "zod";

export const libroCreateSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().min(1, "La imagen es obligatoria"),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio"),
  categorias: z.array(z.number().int()).optional()
});

export const libroUpdateSchema = libroCreateSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});

export type LibroCreate = z.infer<typeof libroCreateSchema>;
export type LibroUpdate = z.infer<typeof libroUpdateSchema>;
