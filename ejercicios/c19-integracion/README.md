# [AI-C19] Integración en la Librería

Continuación de `c18-autenticacion`: el frontend deja de leer el mock (`public/libros.json`) y consume la API real.

## Qué se hizo

| # | Consigna | Dónde |
|---|---|---|
| 1 | `.env.example` con `FRONTEND_URL`; `cors` con `origin` como lista (no `"*"`) | `backend/.env.example`, `backend/src/index.ts` |
| 2 | `frontend/.env` con `VITE_API_URL` (fuera de Git) y `frontend/.env.example` (dentro) | `frontend/.env.example`, `frontend/.gitignore` |
| 3 | `ImportMetaEnv` tipado | `frontend/src/vite-env.d.ts` |
| 4 | `apiFetch`: arma la URL desde la env, manda el token si existe, preserva el mensaje de error de la API | `frontend/src/services/api.ts`, `services/sesion.ts` |
| 5 | Catálogo leyendo de la API real. `public/libros.json` borrado | `frontend/src/pages/Catalogo.tsx`, `hooks/useFetch.ts` |
| 6 | Tipos alineados con el JSON real (`autor` es un objeto, no un string). `tsc` sin errores | `frontend/src/types/libro.ts`, `LibroCard.tsx`, `LibroDetalle.tsx` |
| 7 | Login con Zod que guarda el token y muestra el error real del back | `frontend/src/pages/Login.tsx`, `schemas/loginSchema.ts` |
| 8 | Alta que manda el token: 401 sin token, 403 con CLIENTE, 201 con ADMIN | `frontend/src/pages/LibroNuevo.tsx` (el back exige `autorId` e `imagen`, el form se adaptó al contrato) |
| 9 | Middleware 404 en JSON | `backend/src/index.ts` |

## Cómo correrlo

```bash
# backend (Docker)
cp backend/.env.example backend/.env    # completar valores
docker compose up -d --build            # --build para que la imagen instale cors
docker compose exec api npx prisma migrate deploy
docker compose exec api npx prisma db seed

# frontend
cd frontend
cp .env.example .env
npm install
npm run dev                             # http://localhost:5173
```

Usuarios del seed: `admin@libreria.test / Admin1234` · `cliente@libreria.test / Cliente1234`

## Verificación

- `npx tsc -p tsconfig.app.json --noEmit` → sin errores
- `npx eslint .` → sin errores
- Alta de libro: sin loguear → *Falta el token* (401) · como CLIENTE → *No tenés permiso para esta operación* (403) · como ADMIN → 201 y vuelve al catálogo con el libro nuevo
