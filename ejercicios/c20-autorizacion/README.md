# [AI-C20] Autorización en la Librería

Continuación de `c19-integracion`: la UI ahora sabe quién sos y qué podés hacer. La regla sigue viviendo en el back (401 / 403); el front la anticipa para no mostrar puertas que no podés abrir.

## Qué se hizo

| # | Consigna | Dónde |
|---|---|---|
| 1 | `AuthContext` con el patrón de C12: `usuario`, `cargando`, `login`, `logout`, `estaAutenticado`, `tieneRol`. `useAuth()` tira si falta el Provider | `frontend/src/context/AuthContext.tsx` |
| 2 | Rehidratación al recargar con `GET /auth/yo`. El token **no** se decodifica en el front | `AuthContext.tsx` (primer `useEffect`) |
| 3 | `Login.tsx` usa `login()` del context. Ningún componente importa `sesion.ts` (solo `api.ts` y el context) | `frontend/src/pages/Login.tsx` |
| 4 | Navbar: "Ingresar" / "Hola, {nombre} · Salir" según la sesión | `frontend/src/components/Layout/Header.tsx` |
| 5 | `PrivateRoute` como layout route con `<Outlet />`, `Navigate replace` y Spinner mientras `cargando`. Prop `rol` opcional | `frontend/src/components/PrivateRoute.tsx` |
| 6 | Página `/sin-permiso`. `/libros/nuevo` solo ADMIN: sin login → `/login`, CLIENTE → `/sin-permiso`, ADMIN entra | `frontend/src/pages/SinPermiso.tsx`, `App.tsx` |
| 7 | Link "Nuevo libro" visible solo para ADMIN | `Header.tsx` (`tieneRol('ADMIN') && ...`) |
| 8 | `apiFetch` tira `ApiError` con `status`. Un 401 **con token** dispara `sesion-expirada`; el Provider escucha y hace `logout()` | `frontend/src/services/api.ts`, `AuthContext.tsx` (segundo `useEffect`) |
| 9 | `tsc` sin errores. Cero dependencias nuevas | — |

Extra: `PrivateRoute` guarda en `state.desde` la ruta que el usuario quería ver, y el login lo devuelve ahí (extensión 1 de la clase).

## Cómo correrlo

Igual que C19 (`docker compose up -d --build` para el back, `npm run dev` para el front).

## Verificación (la matriz, ahora con la UI)

| Situación | Rol | Qué ves |
|---|---|---|
| Sin login, mirás la navbar | – | "Ingresar". Sin "Nuevo libro" |
| Sin login, `/libros/nuevo` a mano | – | → `/login`. Network: nada |
| Logueado, mirás la navbar | CLIENTE | "Hola, Cliente · Salir". Sin "Nuevo libro" |
| Logueado, `/libros/nuevo` a mano | CLIENTE | → `/sin-permiso`. Network: nada |
| Logueado, mirás la navbar | ADMIN | "Hola, Admin · Nuevo libro · Salir" |
| F5 en `/libros/nuevo` | ADMIN | Spinner → `GET /auth/yo` → sigue en el formulario |
| Token editado a mano + F5 | – | `GET /auth/yo` 401 → token borrado → "Ingresar" |
| Token vencido en medio de la sesión + POST | ADMIN | 401 → evento → sesión cerrada sola → `/login` |
