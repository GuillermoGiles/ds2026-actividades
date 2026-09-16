import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { obtenerToken, borrarToken } from '../../services/sesion';

export default function Header() {
  const navigate = useNavigate();
  // C19: se lee localStorage en cada render. Funciona "de casualidad" porque el
  // navigate() después del login re-renderiza. En C20 esto pasa a un AuthContext.
  const estaLogueado = !!obtenerToken();

  const manejarSesion = () => {
    if (estaLogueado) {
      borrarToken();
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
            <Nav.Link as={Link} to="/libros/nuevo">Nuevo Libro</Nav.Link>
          </Nav>
          <Button variant={estaLogueado ? 'outline-light' : 'light'} size="sm" onClick={manejarSesion}>
            {estaLogueado ? 'Salir' : 'Ingresar'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
