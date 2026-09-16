import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, Button, Container, Alert, Card } from 'react-bootstrap';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';
import type { Sesion } from '../types/sesion';

// Es el formulario de C10 con otro schema y otro submit
export function Login() {
  const navigate = useNavigate();
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (datos: LoginFormData) => {
    try {
      setErrorApi(null);
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(datos),
      });
      guardarToken(sesion.token);
      navigate('/catalogo');
    } catch (e) {
      // El mensaje real del back: "Credenciales inválidas", "Datos inválidos", etc.
      setErrorApi(e instanceof Error ? e.message : 'Error desconocido');
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: 400 }} className="shadow-sm">
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Iniciar sesión</h2>

          {errorApi && <Alert variant="danger">{errorApi}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...register('email')} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" {...register('password')} isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
