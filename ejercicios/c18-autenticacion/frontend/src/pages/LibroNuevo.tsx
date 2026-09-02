import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Container } from 'react-bootstrap';
import { libroSchema } from '../schemas/libroSchema';
import type { LibroValidado } from '../schemas/libroSchema';
export function LibroNuevo() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      titulo: '',
      autor: '',
      precio: 0,
      disponible: true,
    }
  });

  const onSubmit = (data: LibroValidado) => {
    console.log("Nuevo libro (sin backend):", data);
    navigate('/catalogo');
  };

  return (
    <Container className="py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control 
            {...register('titulo')} 
            isInvalid={!!errors.titulo} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.titulo?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control 
            {...register('autor')} 
            isInvalid={!!errors.autor} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.autor?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control 
            type="number"
            {...register('precio')} 
            isInvalid={!!errors.precio} 
          />
          <Form.Control.Feedback type="invalid">
            {errors.precio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check 
          className="mb-3" 
          label="Disponible"
          {...register('disponible')}
        />

        <Button type="submit">Agregar libro</Button>
      </Form>
    </Container>
  );
}
