// Array original de productos
const productos = [
  { nombre: 'Producto 1', categoria: 'A' },
  { nombre: 'Producto 2', categoria: 'B' },
  { nombre: 'Producto 3', categoria: 'C' },
  { nombre: 'Producto 4', categoria: 'A' },
  { nombre: 'Producto 5', categoria: 'B' },
  { nombre: 'Producto 6', categoria: 'C' },
  { nombre: 'Producto 7', categoria: 'A' },
];

// Paso 1: Obtener lista de categorías distintas
const categorias = [...new Set(productos.map(p => p.categoria))];

// Paso 2: Crear objeto vacío
const productosPorCategoria = {};
categorias.forEach(c => {
  productosPorCategoria[c] = [];
});

// Paso 3: Organizar productos por categoría
productos.forEach(p => {
  productosPorCategoria[p.categoria].push(p);
});

// Paso 4: Devolver objeto con productos organizados por categoría
console.log(productosPorCategoria);