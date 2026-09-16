import { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import type { Autor } from '../types/libro';

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
    <Card style={{ width: '18rem', margin: '1rem' }} className="shadow-sm">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{autor.nombre}</Card.Subtitle>
        <Card.Text>
          Precio: ${precio.toLocaleString('es-AR')}{' '}
          {!disponible && <Badge bg="secondary">Sin stock</Badge>}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" onClick={() => setLikes(likes + 1)}>
            Me gusta ({likes})
          </Button>
          <Link to={`/libros/${id}`} className="btn btn-outline-secondary">
            Ver más
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
