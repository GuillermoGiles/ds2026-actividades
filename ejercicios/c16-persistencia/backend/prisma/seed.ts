import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Seeding database...");

  // Autores
  await prisma.autor.createMany({
    data: [
      { nombre: "Gabriel García Márquez", nacionalidad: "Colombiano" },
      { nombre: "J.K. Rowling", nacionalidad: "Británica" },
      { nombre: "George Orwell", nacionalidad: "Británico" },
    ],
    skipDuplicates: true,
  });

  // Libros
  await prisma.libro.createMany({
    data: [
      {
        titulo: "Cien Años de Soledad",
        autor: "Gabriel García Márquez",
        precio: 15000,
        imagen: "cien-anos.jpg",
        disponible: true,
      },
      {
        titulo: "Harry Potter",
        autor: "J.K. Rowling",
        precio: 18000,
        imagen: "harry-potter.jpg",
        disponible: true,
      },
      {
        titulo: "1984",
        autor: "George Orwell",
        precio: 12000,
        imagen: "1984.jpg",
        disponible: false,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
