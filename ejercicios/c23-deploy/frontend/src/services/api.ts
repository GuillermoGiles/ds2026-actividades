import { obtenerToken } from './sesion';

// La única puerta de salida hacia la API: base URL, token y el mensaje real del error.
const BASE = import.meta.env.VITE_API_URL;

// Error con status: las páginas pueden distinguir "sin permiso" (403) de "error del server" (500)
export class ApiError extends Error {
  status: number;

  constructor(status: number, mensaje: string) {
    super(mensaje);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiFetch<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  // Se lee ADENTRO de la función: si se leyera al importar el módulo, el token
  // guardado después del login no viajaría hasta recargar la página.
  const token = obtenerToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  };

  const res = await fetch(`${BASE}${ruta}`, { ...opciones, headers });

  // Un 404 de ruta o un error del dev server pueden venir en HTML: res.json() explotaría
  const cuerpo = await res.json().catch(() => null);

  // 401 habiendo mandado token = la sesión venció (o el token es inválido).
  // apiFetch no es un componente y no puede usar useAuth(): avisa al mundo con un evento,
  // y el AuthProvider, que sí sabe qué hacer, escucha y cierra la sesión.
  // El "&& token" importa: el 401 de un login fallido (sin token) NO es una sesión vencida.
  if (res.status === 401 && token) {
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!res.ok) {
    throw new ApiError(res.status, cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}
