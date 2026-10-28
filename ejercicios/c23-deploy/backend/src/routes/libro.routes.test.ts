import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

// La matriz de permisos SIN base de datos: todos estos requests se cortan en
// authenticate / authorize / validate, antes de llegar a Prisma.
// Los tokens se firman acá con el secret de test: no hace falta login ni usuarios en la DB.
const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

const libroNuevo = { titulo: "Rayuela", precio: 7000, imagen: "https://img/r.jpg", autorId: 1 };

describe("matriz de permisos de /api/libros (sin DB)", () => {
  it("POST sin token → 401 'Falta el token'", async () => {
    const res = await request(app).post("/api/libros").send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Falta el token" });
  });

  it("POST con token de CLIENTE → 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send(libroNuevo);
    expect(res.status).toBe(403);
  });

  it("POST de ADMIN con body inválido → 400, no 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({ ...libroNuevo, precio: -5 });
    expect(res.status).toBe(400);
    expect(res.body.detalles).toContainEqual({ campo: "precio", mensaje: "El precio debe ser mayor a 0" });
  });

  it("POST con token adulterado → 401 'Token inválido'", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}x`)
      .send(libroNuevo);
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Token inválido" });
  });

  it("DELETE /api/libros/1 con token de CLIENTE → 403", async () => {
    const res = await request(app).delete("/api/libros/1").set("Authorization", `Bearer ${tokenCliente}`);
    expect(res.status).toBe(403);
  });

  it("GET /api/no-existe → 404 en JSON", async () => {
    const res = await request(app).get("/api/no-existe");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Ruta no encontrada: GET /api/no-existe" });
  });
});
