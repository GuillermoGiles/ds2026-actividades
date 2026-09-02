import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Seeding database...");

  const autores = [
    { nombre: "Gabriel García Márquez", nacionalidad: "Colombiano" },
    { nombre: "J.K. Rowling", nacionalidad: "Británica" },
    { nombre: "George Orwell", nacionalidad: "Británico" },
  ];

  const categorias = [
    { nombre: "Realismo mágico" },
    { nombre: "Fantasía" },
    { nombre: "Ciencia Ficción" },
    { nombre: "Distopía" }
  ];

  const libros = [
    {
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      cats: ["Realismo mágico"],
      precio: 15000,
      imagen: "cien-anos.jpg",
      disponible: true,
    },
    {
      titulo: "Harry Potter",
      autor: "J.K. Rowling",
      cats: ["Fantasía"],
      precio: 18000,
      imagen: "harry-potter.jpg",
      disponible: true,
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      cats: ["Ciencia Ficción", "Distopía"],
      precio: 12000,
      imagen: "1984.jpg",
      disponible: false,
    },
  ];

  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map(nombre => ({ nombre })) },
      }
    });
  }

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
