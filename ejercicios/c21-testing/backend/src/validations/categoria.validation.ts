import { z } from "zod";

export const categoriaCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre de la categoría es obligatorio"),
});

export const categoriaUpdateSchema = categoriaCreateSchema.partial();

export type CategoriaCreate = z.infer<typeof categoriaCreateSchema>;
export type CategoriaUpdate = z.infer<typeof categoriaUpdateSchema>;
