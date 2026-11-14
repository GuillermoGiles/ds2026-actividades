import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  // La sesión es estado de React: cuando cambia, el Header se re-renderiza solo.
  // Ya no se lee localStorage acá.
  const { usuario, logout, tieneRol } = useAuth();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar variant="dark" expand="lg" sticky="top" className="site-nav">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <span className="brand-mark">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <path d="M2 5c3.5-1.3 7-1 10 1 3-2 6.5-2.3 10-1v14c-3.5-1.3-7-1-10 1-3-2-6.5-2.3-10-1z" />
              <path d="M12 6v14" />
            </svg>
          </span>
          Mi Librería
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav-principal" />
        <Navbar.Collapse id="nav-principal">
          <Nav className="me-auto ms-lg-4">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
            {/* Esconder no es proteger: el link se esconde acá Y la ruta se protege en App.tsx */}
            {tieneRol('ADMIN') && (
              <Nav.Link as={NavLink} to="/libros/nuevo">Nuevo Libro</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-lg-center gap-3">
            {usuario && <Navbar.Text>Hola, {usuario.nombre}</Navbar.Text>}
            <Button variant={usuario ? 'outline-light' : 'accent'} size="sm" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
