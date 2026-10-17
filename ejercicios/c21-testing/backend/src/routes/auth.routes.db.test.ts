// ⚠️ ESTOS TESTS NECESITAN LA BASE DE DATOS ⚠️
// Le pegan a PostgreSQL de verdad: antes de correrlos hace falta
//   docker compose up -d db   (con migraciones y seed cargados)
// Con Docker apagado fallan con "Can't reach database server"; el resto de la suite
// (los archivos sin ".db") sigue verde. Por eso están en un archivo aparte.
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

afterAll(() => prisma.$disconnect()); // cerrar la conexión al terminar

describe("POST /api/auth/login (con DB)", () => {
  it("credenciales del seed → 200 con token y usuario sin passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({ email: "cliente@libreria.test", rol: "CLIENTE" });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("password incorrecta → 401 'Credenciales inválidas'", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Incorrecta1" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });

  it("mail que no existe → el MISMO 401 (no revela si el mail existe)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nadie@libreria.test", password: "Cliente1234" });
    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});
