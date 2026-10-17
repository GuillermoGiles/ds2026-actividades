/// <reference types="vite/client" />

// Tipado de las variables de entorno que expone Vite (solo las que empiezan con VITE_)
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
