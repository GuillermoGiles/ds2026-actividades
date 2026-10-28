// Precio en pesos con separador de miles argentino: 4500 → "$ 4.500"
export const formatearPrecio = (precio: number) =>
  `$ ${new Intl.NumberFormat('es-AR').format(precio)}`;
