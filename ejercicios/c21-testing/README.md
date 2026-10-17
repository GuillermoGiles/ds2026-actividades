# [AI-C21] Testing en la Librería

Continuación de `c20-autorizacion`: lo que antes se probaba a mano (api.http, el navegador, la matriz de permisos) ahora lo corre Vitest, cada vez, en segundos.

## Qué se hizo

| # | Consigna | Dónde |
|---|---|---|
| 1 | Vitest en el back con `JWT_SECRET` de test y `DATABASE_URL` a localhost | `backend/vitest.config.mts` |
| 1 | Vitest en el front: `jsdom` + `setupTests.ts` con jest-dom | `frontend/vite.config.ts`, `frontend/src/setupTests.ts` |
| 2 | `app.ts` arma Express y lo exporta; `index.ts` solo hace `listen` | `backend/src/app.ts`, `backend/src/index.ts` |
| 3 | Scripts `test` (`vitest run`) y `test:watch` (`vitest`) | `backend/package.json`, `frontend/package.json` |
| 4 | Unitario puro (schemas Zod) | `backend/src/validations/*.test.ts` |
| 4 | Mocks con `vi.fn()` (`authorize` y `authenticate`) | `backend/src/middlewares/auth.middleware.test.ts` |
| 4 | Integración con supertest: la matriz de permisos sin DB (401 · 403 · 400 · 404) | `backend/src/routes/libro.routes.test.ts` |
| 4 | Componente con Testing Library: Header según el rol | `frontend/src/components/Layout/Header.test.tsx` |
| 4 | Extra: kata TDD `formatearPrecio` (LibroCard ahora muestra `$ 4.500`) | `frontend/src/utils/formatearPrecio*.ts` |
| 5 | Tests que necesitan DB en un archivo aparte (`*.db.test.ts`) con un comentario arriba | `backend/src/routes/auth.routes.db.test.ts` |
| 6 | `npx tsc --noEmit` (back) y `npx tsc -p tsconfig.app.json --noEmit` (front) limpios. Cero dependencias nuevas de runtime: todo lo agregado es `devDependencies` | — |

Para que `tsc` del back quede limpio con TypeScript 6 se agregó `"ignoreDeprecations": "6.0"` en `tsconfig.json` y un cast en `validateParams` (`req.params`), dos errores que venían de C20.
`AuthContext` ahora se exporta para poder inyectar un usuario falso en los tests.

## Cómo correrlo

```bash
# Backend (desde backend/)
npm install
npm test          # 18 tests sin DB siempre verdes; los 3 de auth.routes.db.test.ts necesitan la base
npm run test:watch

# Para los tests con DB: levantar la base de Docker con migraciones y seed
docker compose up -d db

# Frontend (desde frontend/)
npm install
npm test          # 6 tests
npm run test:watch
```

## Resultado

| Dónde | Archivo | Tests | Necesita |
|---|---|---|---|
| back | `validations/libro.validation.test.ts` | 3 | nada |
| back | `validations/auth.validation.test.ts` | 2 | nada |
| back | `middlewares/auth.middleware.test.ts` | 7 | nada |
| back | `routes/libro.routes.test.ts` | 6 | nada |
| back | `routes/auth.routes.db.test.ts` | 3 | DB de Docker con seed |
| front | `utils/formatearPrecio.test.ts` | 3 | nada |
| front | `components/Layout/Header.test.tsx` | 3 | nada |

**27 tests verdes** (24 sin Docker).
