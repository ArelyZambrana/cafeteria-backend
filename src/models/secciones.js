const database = require("../config/database");

async function findAll() {
  const [rows] = await database.query(
    "SELECT id, clave, menu, antetitulo, titulo, descripcion FROM secciones ORDER BY orden, id",
  );
  return rows;
}

module.exports = { findAll };
