import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookCover from '../components/BookCover';
import LibroCard from '../components/LibroCard';
import { useFetch } from '../hooks/useFetch';
import type { Libro } from '../types/libro';

const BENEFICIOS = [
  {
    titulo: 'Catálogo curado',
    texto: 'Clásicos y novedades elegidos uno por uno, con autor y categorías.',
    icono: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5zM20 17v4H6.5" />,
  },
  {
    titulo: 'Precios claros',
    texto: 'Ves el precio final y si hay stock antes de entrar al detalle.',
    icono: <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01" />,
  },
  {
    titulo: 'Cuenta segura',
    texto: 'Ingresás con tu cuenta y cada rol ve solo lo que le corresponde.',
    icono: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
];

export function Home() {
  const { data: libros, loading } = useFetch<Libro[]>('/libros');
  const destacados = (libros ?? []).slice(0, 4);
  const portadas = destacados.length >= 3 ? destacados.slice(0, 3) : null;

  return (
    <>
      <section className="hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className="eyebrow">Librería online</span>
              <h1 className="mb-3">
                Tu próxima <em>gran lectura</em> te está esperando
              </h1>
              <p className="lead mb-4">
                Explorá nuestro catálogo, encontrá a tus autores favoritos y descubrí
                historias nuevas para cada momento.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/catalogo" className="btn btn-accent btn-lg">Ver catálogo</Link>
                <Link to="/login" className="btn btn-outline-light btn-lg">Ingresar</Link>
              </div>
            </Col>
            <Col lg={6} className="d-none d-lg-block">
              <div className="hero-stack">
                {portadas
                  ? portadas.map((l) => (
                      <BookCover key={l.id} id={l.id} titulo={l.titulo} autor={l.autor.nombre} />
                    ))
                  : (
                    <>
                      <BookCover id={0} titulo="Cien años de soledad" autor="García Márquez" />
                      <BookCover id={2} titulo="Rayuela" autor="Julio Cortázar" />
                      <BookCover id={1} titulo="Ficciones" autor="Jorge Luis Borges" />
                    </>
                  )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
            <div>
              <h2 className="section-title">Destacados</h2>
              <p className="section-sub">Algunos de los libros que más se están leyendo.</p>
            </div>
            <Link to="/catalogo" className="btn btn-outline-secondary">Ver todos →</Link>
          </div>

          {loading ? (
            <div className="cargando"><Spinner animation="border" /></div>
          ) : (
            <Row className="g-4">
              {destacados.map((libro) => (
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
          )}
        </Container>
      </section>

      <section className="pb-2">
        <Container>
          <Row className="g-4">
            {BENEFICIOS.map((b) => (
              <Col key={b.titulo} md={4}>
                <div className="feature">
                  <div className="feature-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {b.icono}
                    </svg>
                  </div>
                  <h3>{b.titulo}</h3>
                  <p>{b.texto}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
