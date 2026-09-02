import { z } from "zod";

const email = z.string().trim().toLowerCase().pipe(z.string().email("Email inválido"));

export const registroSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
  email,
  password: z.string()
    .min(8, "La contraseña necesita al menos 8 caracteres")
    .regex(/[A-Z]/, "Necesita al menos una mayúscula")
    .regex(/[0-9]/, "Necesita al menos un número"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type Registro = z.infer<typeof registroSchema>;
export type Login = z.infer<typeof loginSchema>;
