import type { CSSProperties } from 'react';

// La DB guarda solo un nombre de archivo en `imagen` (ej. "1984.jpg") que no existe en
// ningún servidor. En vez de mostrar una imagen rota, se genera una portada con CSS:
// el color sale del id, así cada libro mantiene siempre la misma portada.
const PALETAS = [
  ['#1f3d34', '#2f6b58'],
  ['#7a2e2e', '#b5523b'],
  ['#2b3a67', '#4f6bb0'],
  ['#5a3d6e', '#8e65a8'],
  ['#8a5a1f', '#c88a3a'],
  ['#234e52', '#3d8a8f'],
  ['#3d3d3d', '#6b6b6b'],
];

type BookCoverProps = {
  id: number;
  titulo: string;
  autor: string;
  grande?: boolean;
};

export default function BookCover({ id, titulo, autor, grande = false }: BookCoverProps) {
  const [desde, hasta] = PALETAS[Math.abs(id) % PALETAS.length];
  const estilo = { '--cover-bg': `linear-gradient(150deg, ${desde}, ${hasta})` } as CSSProperties;

  return (
    <div className={`book-cover${grande ? ' book-cover-lg' : ''}`} style={estilo} aria-hidden="true">
      <div>
        <div className="book-cover-orn" />
        <div className="book-cover-title">{titulo}</div>
      </div>
      <div className="book-cover-author">{autor}</div>
    </div>
  );
}
