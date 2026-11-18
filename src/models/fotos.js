const database = require("../config/database");

async function findAll() {
  const [rows] = await database.query(
    "SELECT id, titulo, archivo FROM fotos_tienda ORDER BY orden, id",
  );
  return rows;
}

module.exports = { findAll };
