import { useParams, Link } from 'react-router-dom';
import { Container, Card, Spinner, Alert, Badge } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import type { LibroDetalle as LibroDetalleTipo } from '../types/libro';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  // GET /libros/:id trae autor y categorías anidados
  const { data: libro, loading, error } = useFetch<LibroDetalleTipo>(`/libros/${id}`);

  if (loading) return <Container className="mt-4"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!libro) return null;

  return (
    <Container className="flex-grow-1 mt-4">
      <h2>Detalle del Libro</h2>
      <Card>
        <Card.Body>
          <Card.Title>{libro.titulo}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {libro.autor.nombre} · {libro.autor.nacionalidad}
          </Card.Subtitle>
          <Card.Text>
            Precio: ${libro.precio.toLocaleString('es-AR')}<br />
            Estado: {libro.disponible ? 'Disponible' : 'Sin stock'}
          </Card.Text>
          <div className="mb-3">
            {libro.categorias.map((c) => (
              <Badge key={c.id} bg="secondary" className="me-1">{c.nombre}</Badge>
            ))}
          </div>
          <Link to="/catalogo" className="btn btn-outline-secondary">Volver al catálogo</Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
