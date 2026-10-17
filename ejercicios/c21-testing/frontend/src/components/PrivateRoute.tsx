import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import type { Rol } from '../types/sesion';

/**
 * Layout route (sin path) que protege a todas sus rutas hijas.
 * Tres preguntas, en este orden (authenticate antes de authorize, como en el back):
 *   1. ¿Ya sé quién sos?  -> cargando: Spinner, no decido nada todavía
 *   2. ¿Sos alguien?      -> sin usuario: /login  (el 401 anticipado)
 *   3. ¿Podés?            -> sin el rol: /sin-permiso (el 403 anticipado)
 * Si pasa las tres, la hija se renderiza en el <Outlet />.
 */
export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  // 1. Sin este estado, en el primer render usuario es null (todavía no llegó
  //    /auth/yo) y PrivateRoute decidiría con datos viejos: el "flash" a /login.
  if (cargando) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Verificando sesión...</span>
        </Spinner>
      </Container>
    );
  }

  // 2. `replace` reemplaza la entrada del historial: "atrás" no vuelve a la ruta
  //    protegida (que redirigiría de nuevo y atraparía al usuario).
  //    Se guarda de dónde venía para que el login lo devuelva ahí.
  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  // 3. Logueado pero sin el rol: no se cierra la sesión, solo se avisa
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}
