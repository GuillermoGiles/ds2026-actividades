export type Rol = 'ADMIN' | 'CLIENTE';

// El mismo objeto que devuelve el back en POST /auth/login y GET /auth/yo
export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

// Lo que el usuario escribe en el formulario de login
export type Credenciales = {
  email: string;
  password: string;
};

// Lo que devuelve POST /auth/login
export type Sesion = {
  token: string;
  usuario: Usuario;
};
