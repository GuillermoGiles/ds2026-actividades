import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { AuthContext, type AuthContextType } from '../../context/AuthContext';
import type { Usuario } from '../../types/sesion';

// Header usa useNavigate (router) y useAuth (context): se los damos.
// El auth es FALSO (un mock): no hay back, ni token, ni login.
function renderHeader(usuario: Usuario | null) {
  const auth: AuthContextType = {
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={auth}>
        <Header />
      </AuthContext.Provider>
    </MemoryRouter>,
  );
}

describe('Header según el rol', () => {
  it('sin sesión: muestra "Ingresar" y NO ve "Nuevo Libro"', () => {
    renderHeader(null);
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.queryByText('Nuevo Libro')).not.toBeInTheDocument();
  });

  it('CLIENTE: saluda por nombre y NO ve "Nuevo Libro"', () => {
    renderHeader({ id: 2, email: 'cliente@libreria.test', nombre: 'Cliente', rol: 'CLIENTE' });
    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Salir' })).toBeInTheDocument();
    expect(screen.queryByText('Nuevo Libro')).not.toBeInTheDocument();
  });

  it('ADMIN: ve el link "Nuevo Libro"', () => {
    renderHeader({ id: 1, email: 'admin@libreria.test', nombre: 'Admin', rol: 'ADMIN' });
    expect(screen.getByRole('link', { name: 'Nuevo Libro' })).toHaveAttribute('href', '/libros/nuevo');
  });
});
