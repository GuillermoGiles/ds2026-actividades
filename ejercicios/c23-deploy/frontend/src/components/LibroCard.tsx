import { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Autor } from '../types/libro';
import { formatearPrecio } from '../utils/formatearPrecio';
import BookCover from './BookCover';

// Las props siguen el contrato real: el autor es un objeto, no un string
type LibroCardProps = {
  id: number;
  titulo: string;
  autor: Autor;
  precio: number;
  disponible: boolean;
};

export default function LibroCard({ id, titulo, autor, precio, disponible }: LibroCardProps) {
  // Estado local para los "Me gusta"
  const [likes, setLikes] = useState<number>(0);

  return (
    <article className="libro-card">
      <Link to={`/libros/${id}`} className="cover-link" tabIndex={-1}>
        {!disponible && <Badge bg="secondary" className="badge-stock">Sin stock</Badge>}
        <BookCover id={id} titulo={titulo} autor={autor.nombre} />
      </Link>

      <h3><Link to={`/libros/${id}`}>{titulo}</Link></h3>
      <div className="autor">{autor.nombre}</div>

      <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
        <span className="precio">{formatearPrecio(precio)}</span>
        <button
          type="button"
          className={`btn-like${likes > 0 ? ' liked' : ''}`}
          onClick={() => setLikes(likes + 1)}
          aria-label={`Me gusta (${likes})`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={likes > 0 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
          {likes}
        </button>
      </div>
      <Link to={`/libros/${id}`} className="btn btn-outline-secondary btn-sm mt-3">
        Ver más
      </Link>
    </article>
  );
}
