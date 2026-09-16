// El token vive en localStorage. Solo lo leen apiFetch y (desde C20) el AuthProvider.
const CLAVE = 'token';

export function guardarToken(token: string) {
  localStorage.setItem(CLAVE, token);
}

export function obtenerToken(): string | null {
  return localStorage.getItem(CLAVE);
}

export function borrarToken() {
  localStorage.removeItem(CLAVE);
}
