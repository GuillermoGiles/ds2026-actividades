import { z } from 'zod';

// El login NO valida fortaleza de la contraseña: eso es del registro.
// Acá solo se chequea que los campos vengan.
export const loginSchema = z.object({
  email: z.email('Ingresá un email válido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
