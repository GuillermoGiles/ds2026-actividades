import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LibroCard from '../components/LibroCard';
import type { Libro } from '../types/libro';
import { useFetch } from '../hooks/useFetch';

export function Catalogo() {
  const navigate = useNavigate();
  const { data: libros, loading, error } = useFetch<Libro[]>('/libros.json');

  if (loading) return <Container className="mt-4"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="flex-grow-1 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Catálogo de Libros Destacados</h2>
        <Button variant="primary" onClick={() => navigate('/libros/nuevo')}>Nuevo Libro</Button>
      </div>
      <Row>
        {(libros ?? []).map((libro) => (
          <Col key={libro.id} xs={12} md={6} lg={4} className="d-flex justify-content-center mb-4">
            <LibroCard 
              id={libro.id}
              titulo={libro.titulo} 
              autor={libro.autor} 
              precio={libro.precio} 
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
