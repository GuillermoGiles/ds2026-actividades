import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Librería</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            {/* Esconder no es proteger: el link se esconde acá Y la ruta se protege en App.tsx */}
            {tieneRol('ADMIN') && (
              <Nav.Link as={Link} to="/libros/nuevo">Nuevo Libro</Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-lg-center gap-2">
            {usuario && <Navbar.Text>Hola, {usuario.nombre}</Navbar.Text>}
            <Button variant={usuario ? 'outline-light' : 'light'} size="sm" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
