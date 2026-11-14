import { useState } from 'react';
import { Container, Row, Col, Spinner, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';
import { useFetch } from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';

export function Catalogo() {
  const { tieneRol } = useAuth();
  const [busqueda, setBusqueda] = useState('');
  // Antes: '/libros.json' (mock en public/). Ahora la API real: GET {VITE_API_URL}/libros
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

  const filtrados = (libros ?? []).filter((l) => {
    const q = busqueda.toLowerCase();
    return l.titulo.toLowerCase().includes(q) || l.autor.nombre.toLowerCase().includes(q);
  });

  return (
    <>
      <header className="page-header">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-3">
            <div>
              <span className="eyebrow">Catálogo</span>
              <h1>Todos nuestros libros</h1>
            </div>
            {/* Solo el ADMIN ve el acceso; igual la ruta está protegida en App.tsx */}
            {tieneRol('ADMIN') && (
              <Link to="/libros/nuevo" className="btn btn-primary">+ Nuevo Libro</Link>
            )}
          </div>
          <div className="search-box mt-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            <Form.Control
              placeholder="Buscar por título o autor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar libros"
            />
          </div>
        </Container>
      </header>

      <Container className="section pt-4">
        {loading && <div className="cargando"><Spinner animation="border" /></div>}
        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && (
          <>
            <p className="section-sub mb-4">
              {filtrados.length} {filtrados.length === 1 ? 'libro' : 'libros'}
              {busqueda && <> para “{busqueda}”</>}
            </p>
            {filtrados.length === 0 && <Alert variant="info">No hay libros para mostrar.</Alert>}
            <Row className="g-4">
              {filtrados.map((libro) => (
                <Col key={libro.id} xs={6} md={4} lg={3}>
                  <LibroCard
                    id={libro.id}
                    titulo={libro.titulo}
                    autor={libro.autor}
                    precio={libro.precio}
                    disponible={libro.disponible}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
