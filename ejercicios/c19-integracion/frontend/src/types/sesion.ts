export type Rol = 'ADMIN' | 'CLIENTE';

export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

// Lo que devuelve POST /auth/login
export type Sesion = {
  token: string;
  usuario: Usuario;
};
