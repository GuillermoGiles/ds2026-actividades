import { useState } from 'react';
import { Container, Row, Col, Button, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';
import { useFetch } from '../hooks/useFetch';

export function Catalogo() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  // Antes: '/libros.json' (mock en public/). Ahora la API real: GET {VITE_API_URL}/libros
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros');

  if (loading) return <Container className="mt-4"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  const filtrados = (libros ?? []).filter((l) => {
    const q = busqueda.toLowerCase();
    return l.titulo.toLowerCase().includes(q) || l.autor.nombre.toLowerCase().includes(q);
  });

  return (
    <Container className="flex-grow-1 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Catálogo de Libros</h2>
        <Button variant="primary" onClick={() => navigate('/libros/nuevo')}>Nuevo Libro</Button>
      </div>
      <Form.Control
        className="mb-4"
        placeholder="Buscar por título o autor..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      {filtrados.length === 0 && <Alert variant="info">No hay libros para mostrar.</Alert>}
      <Row>
        {filtrados.map((libro) => (
          <Col key={libro.id} xs={12} md={6} lg={4} className="d-flex justify-content-center mb-4">
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
    </Container>
  );
}
