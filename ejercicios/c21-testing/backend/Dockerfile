# Backend Dockerfile
FROM node:22-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo archivos de dependencias
COPY package*.json ./

# Instalar dependencias en la imagen
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer puerto del servidor
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "run", "dev"]

