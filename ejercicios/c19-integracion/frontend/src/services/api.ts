import { obtenerToken } from './sesion';

// La única puerta de salida hacia la API: base URL, token y el mensaje real del error.
const BASE = import.meta.env.VITE_API_URL;

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

  if (!res.ok) {
    throw new Error(cuerpo?.error ?? `Error ${res.status}`);
  }

  return cuerpo as T;
}
