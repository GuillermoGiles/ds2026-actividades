import { existsSync } from "node:fs";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// Lee backend/.env (expande ${POSTGRES_USER} como Compose).
const env = loadEnv("test", process.cwd(), "");

// En el .env el host de la base es "db" (la red de Docker).
// Corriendo en el host (npm test), la base de Docker se ve en localhost.
const enDocker = existsSync("/.dockerenv");
const databaseUrl = enDocker ? env.DATABASE_URL : env.DATABASE_URL?.replace("@db:", "@localhost:");

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests", // nunca el real
      DATABASE_URL: databaseUrl ?? "",
    },
  },
});
