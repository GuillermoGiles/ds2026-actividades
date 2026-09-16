import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Credenciales, Rol, Sesion, Usuario } from '../types/sesion';
import { apiFetch } from '../services/api';
import { obtenerToken, guardarToken, borrarToken } from '../services/sesion';

// Mismo patrón que BusquedaContext (C12): contexto + Provider + hook propio. Cambia el dato.
interface AuthContextType {
  usuario: Usuario | null;              // null = nadie logueado
  cargando: boolean;                    // true mientras averiguamos quién sos (/auth/yo)
  estaAutenticado: boolean;             // usuario !== null, para leer más cómodo
  tieneRol: (rol: Rol) => boolean;      // usuario?.rol === rol
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  // Si hay token guardado, arrancamos "cargando" hasta que el back confirme quién es.
  // Si no hay token, no hay nada que averiguar: arranca en false.
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  // Rehidratación al montar: F5 borra el estado de React pero no el token.
  // Se le pregunta al back (fuente de verdad: valida firma y vencimiento),
  // NO se decodifica el token en el front.
  useEffect(() => {
    if (!obtenerToken()) return;
    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(() => borrarToken())          // vencido o inválido: se limpia
      .finally(() => setCargando(false));
  }, []);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  // El token venció en medio de la sesión: apiFetch dispara 'sesion-expirada' y acá se cierra sola
  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);
    return () => window.removeEventListener('sesion-expirada', logout);
  }, []);

  // El POST /auth/login se hace ADENTRO del Provider: la página ya no toca el token
  const login = async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// El hook vive junto al Provider, como en C12. react-refresh prefiere un archivo por
// componente, pero acá seguimos el patrón de la materia.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return context;
}
