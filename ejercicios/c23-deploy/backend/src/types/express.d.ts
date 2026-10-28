export {};

declare global {
  namespace Express {
    interface Request {
      usuario?: { id: number; rol: "ADMIN" | "CLIENTE" };
    }
  }
}
