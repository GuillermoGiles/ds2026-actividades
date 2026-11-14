# [AI-C23] Deploy en la Librería

Continuación de `c21-testing`: la misma Librería (back Express + Prisma, front React), ahora en producción.
El código no cambia: cambia dónde corre, quién la arranca, con qué variables y cómo se construye.

## URLs

| Servicio | URL |
|---|---|
| Frontend (Render › Static Site) | https://libreria-guille.onrender.com |
| Backend (Render › Web Service, Docker) | https://libreria-api-guille.onrender.com |
| Base de datos | Neon (PostgreSQL), región AWS us-east-1 |

> El back está en la capa gratuita: sin tráfico se duerme y el primer request tarda ~1 minuto. No es un error.

## Qué se hizo

| # | Checklist | Dónde |
|---|---|---|
| 1 | El back se compila: `build` = `tsc -p tsconfig.build.json`, `start` = `node dist/index.js` (los `*.test.ts` no van a `dist/`) | `backend/package.json`, `backend/tsconfig.build.json` |
| 2 | Imagen de producción multi-stage: etapa 1 compila, etapa 2 se queda sólo con `dist/`, `node_modules` y `prisma/`. Sin secretos en `ARG`/`ENV` | `backend/Dockerfile.prod` |
| 3 | Migraciones al arrancar: `prisma migrate deploy && node dist/index.js` (aplica lo commiteado, no inventa) | `backend/Dockerfile.prod` |
| 4 | `PORT` y `FRONTEND_URL` desde `process.env` con default local. CORS ignora una `/` final en `FRONTEND_URL` | `backend/src/index.ts`, `backend/src/app.ts` |
| 5 | `.env.example` documenta todas las variables (sin valores reales) y qué valor toma cada una en prod | `backend/.env.example`, `frontend/.env.example` |
| 6 | El front llega a la API sólo por `VITE_API_URL` (ningún `localhost:3000` suelto en `src/`) | `frontend/src/services/api.ts` |
| 7 | `Dockerfile` de dev y `docker-compose.yml` sin cambios: se sigue programando igual | — |

## Variables por entorno

| Variable | Servicio | Dev (`.env`) | Prod (panel de Render) | Quién pone el valor |
|---|---|---|---|---|
| `PORT` | back | `3000` | la inyecta Render | Render |
| `DATABASE_URL` | back | Postgres de Docker (`@db:5432`) | connection string **directa** de Neon, `?sslmode=require` | Neon |
| `JWT_SECRET` | back | una de mentira | botón *Generate* | Render |
| `FRONTEND_URL` | back | `http://localhost:5173` | URL exacta del Static Site, sin `/` final | yo |
| `VITE_API_URL` | front | `http://localhost:3000/api` | `https://libreria-api-guille.onrender.com/api` (queda embebida en el build) | yo |

`VITE_` = público: cualquiera la ve con F12. Ningún secreto va en el front.

## Cómo está deployada (orden de creación)

1. **Neon** → proyecto nuevo en AWS us-east-1 → copiar la `DATABASE_URL` directa (no *pooled*).
2. **Render › Web Service** → repo `ds2026-actividades`, runtime Docker, root directory `ejercicios/c23-deploy/backend`, Dockerfile `./Dockerfile.prod`, branch `main`.
   Env: `DATABASE_URL`, `JWT_SECRET` (generado), `FRONTEND_URL=http://localhost:5173` (provisorio). Health check: `/`.
3. **Render › Static Site** → root directory `ejercicios/c23-deploy/frontend`, build `npm ci && npm run build`, publish `dist`.
   Env: `VITE_API_URL=https://libreria-api-guille.onrender.com/api`. Redirects/Rewrites: `/*` → `/index.html`, **Rewrite** (sin esto, F5 en `/catalogo` da 404).
4. **Render › back** → cambiar `FRONTEND_URL` a la URL del front (cambiar una variable redeploya).
5. **Seed** (una vez, desde mi compu, contra Neon):
   ```bash
   docker compose run --rm -e DATABASE_URL="<url de Neon>" api npx prisma db seed
   ```
6. **Probar** en la URL pública: login, alta de un libro, F5 en `/catalogo`.

Auto-deploy: cada push a `main` que toque el back rebuildea la imagen y corre `migrate deploy`; si algo falla, queda la versión anterior.

## Cómo correrla local

Igual que en C21:

```bash
cp backend/.env.example backend/.env
docker compose up --build          # back en :3000 + Postgres
cd frontend && cp .env.example .env && npm install && npm run dev   # front en :5173
```

Build de producción a mano:

```bash
cd backend && npm run build && npm start
cd frontend && npm run build       # → dist/
```

## Resultado

- `npm test` del front: 6 verdes. `npm run build` del front limpio, con `VITE_API_URL` embebida en `dist/assets/index-*.js`.
- Back: 12 tests unitarios verdes; `tsconfig.build.json` deja los `*.test.ts` fuera de `dist/`.
