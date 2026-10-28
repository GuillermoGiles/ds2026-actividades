import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// La cara del 403: estás logueado, pero tu rol no alcanza. La sesión sigue abierta.
export function SinPermiso() {
  const { usuario } = useAuth();

  return (
    <Container className="py-5" style={{ maxWidth: 560 }}>
      <Alert variant="warning">
        <Alert.Heading>No tenés permiso para ver esta página</Alert.Heading>
        {usuario && (
          <p className="mb-0">
            Estás logueado como <strong>{usuario.nombre}</strong> con rol{' '}
            <strong>{usuario.rol}</strong>, y esta sección requiere otro rol.
          </p>
        )}
      </Alert>
      <Link to="/catalogo" className="btn btn-outline-secondary">Volver al catálogo</Link>
    </Container>
  );
}
