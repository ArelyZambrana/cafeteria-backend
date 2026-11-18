const database = require("../config/database");

// Ordenados por categoría (según su primera aparición) y luego por producto
async function findAll() {
  const [rows] = await database.query(
    `SELECT p.id, p.categoria, p.producto, p.descripcion, p.precio
       FROM precios p
       JOIN (SELECT categoria, MIN(id) AS primero FROM precios GROUP BY categoria) c
         ON c.categoria = p.categoria
      ORDER BY c.primero, p.orden, p.id`,
  );
  return rows;
}

module.exports = { findAll };
