import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <div className="brand">Mi Librería</div>
          <small>Desarrollo de Software 2026 · UTN FRLP · Guillermo Giles</small>
        </div>
        <nav className="d-flex gap-4">
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <a href="https://github.com/GuillermoGiles/ds2026-actividades" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </Container>
    </footer>
  );
}
