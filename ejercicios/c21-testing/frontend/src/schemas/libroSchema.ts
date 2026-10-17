import { z } from 'zod';

// Alineado con libroCreateSchema del backend: el autor se manda por id, el precio es entero
export const libroSchema = z.object({
  titulo: z.string().trim().min(1, 'El título es obligatorio').max(200),
  autorId: z.coerce.number().int().positive('Elegí un autor'),
  precio: z.coerce.number().int('El precio debe ser un número entero').positive('El precio debe ser mayor a 0'),
  imagen: z.string().trim().min(1, 'La imagen es obligatoria'),
  disponible: z.boolean(),
});

// Entrada: lo que escribe el usuario (strings de los inputs). Salida: ya convertido por coerce.
export type LibroFormInput = z.input<typeof libroSchema>;
export type LibroValidado = z.output<typeof libroSchema>;
