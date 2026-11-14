import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import BookCover from '../components/BookCover';
import { formatearPrecio } from '../utils/formatearPrecio';
import type { LibroDetalle as LibroDetalleTipo } from '../types/libro';

export function LibroDetalle() {
  const { id } = useParams<{ id: string }>();
  // GET /libros/:id trae autor y categorías anidados
  const { data: libro, loading, error } = useFetch<LibroDetalleTipo>(`/libros/${id}`);

  if (loading) return <div className="cargando"><Spinner animation="border" /></div>;
  if (error) return <Container className="section"><Alert variant="danger">{error}</Alert></Container>;
  if (!libro) return null;

  return (
    <Container className="section">
      <Link to="/catalogo" className="d-inline-block mb-4 text-decoration-none">← Volver al catálogo</Link>
      <div className="panel">
        <Row className="g-5 align-items-center">
          <Col md={5} lg={4}>
            <div style={{ maxWidth: 300 }} className="mx-auto">
              <BookCover id={libro.id} titulo={libro.titulo} autor={libro.autor.nombre} grande />
            </div>
          </Col>
          <Col md={7} lg={8}>
            <span className="eyebrow">Detalle del libro</span>
            <h1 className="mb-2">{libro.titulo}</h1>
            <p className="text-secondary mb-3">
              por <strong className="text-body">{libro.autor.nombre}</strong> · {libro.autor.nacionalidad}
            </p>
            <div className="mb-4">
              {libro.categorias.map((c) => (
                <span key={c.id} className="chip">{c.nombre}</span>
              ))}
            </div>
            <div className="detalle-precio mb-1">{formatearPrecio(libro.precio)}</div>
            <div className={`estado mb-4 ${libro.disponible ? 'ok' : 'no'}`}>
              {libro.disponible ? 'Disponible' : 'Sin stock'}
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button type="button" className="btn btn-accent btn-lg" disabled={!libro.disponible}>
                Comprar
              </button>
              <Link to="/catalogo" className="btn btn-outline-secondary btn-lg">Volver al catálogo</Link>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
