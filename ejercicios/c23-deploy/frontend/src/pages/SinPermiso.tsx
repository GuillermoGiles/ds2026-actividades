import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// La cara del 403: estás logueado, pero tu rol no alcanza. La sesión sigue abierta.
export function SinPermiso() {
  const { usuario } = useAuth();

  return (
    <Container className="section d-flex justify-content-center">
      <div className="panel text-center w-100" style={{ maxWidth: 520 }}>
        <div className="feature-icon mx-auto" style={{ color: 'var(--accent-2)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
        </div>
        <h1 className="h3">No tenés permiso para ver esta página</h1>
        {usuario && (
          <p className="section-sub mb-0">
            Estás logueado como <strong>{usuario.nombre}</strong> con rol{' '}
            <strong>{usuario.rol}</strong>, y esta sección requiere otro rol.
          </p>
        )}
        <Link to="/catalogo" className="btn btn-primary mt-4">Volver al catálogo</Link>
      </div>
    </Container>
  );
}
