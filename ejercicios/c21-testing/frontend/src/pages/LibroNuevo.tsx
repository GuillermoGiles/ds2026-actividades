import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroFormInput, LibroValidado } from '../schemas/libroSchema';
import { apiFetch, ApiError } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import type { Autor, Libro } from '../types/libro';

export function LibroNuevo() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);
  // Los autores salen de la API: el back exige autorId, no un nombre suelto
  const { data: autores, loading: cargandoAutores } = useFetch<Autor[]>('/autores');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LibroFormInput, unknown, LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      titulo: '',
      autorId: 0,
      precio: 0,
      imagen: '',
      disponible: true,
    }
  });

  const onSubmit = async (data: LibroValidado) => {
    try {
      setErrorApi(null);
      // El token lo manda apiFetch solo. Sin token: 401. Con CLIENTE: 403. Con ADMIN: 201.
      await apiFetch<Libro>('/libros', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      navigate('/catalogo');
    } catch (e) {
      // Con el status se distingue "sin permiso" de "error del server"
      if (e instanceof ApiError && e.status === 403) {
        setErrorApi('Tu rol no permite agregar libros.');
      } else {
        setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
      }
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      {errorApi && <Alert variant="danger">{errorApi}</Alert>}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control {...register('titulo')} isInvalid={!!errors.titulo} />
          <Form.Control.Feedback type="invalid">{errors.titulo?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Select {...register('autorId')} isInvalid={!!errors.autorId} disabled={cargandoAutores}>
            <option value={0}>Elegí un autor...</option>
            {(autores ?? []).map((a) => (
              <option key={a.id} value={a.id}>{a.nombre}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.autorId?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" {...register('precio')} isInvalid={!!errors.precio} />
          <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen (nombre de archivo)</Form.Label>
          <Form.Control {...register('imagen')} isInvalid={!!errors.imagen} placeholder="portada.jpg" />
          <Form.Control.Feedback type="invalid">{errors.imagen?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Check className="mb-3" label="Disponible" {...register('disponible')} />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : 'Agregar libro'}
        </Button>
      </Form>
    </Container>
  );
}
