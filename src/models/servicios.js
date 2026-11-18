const database = require("../config/database");

async function findAll() {
  const [rows] = await database.query(
    "SELECT id, nombre, descripcion, icono FROM servicios ORDER BY orden, id",
  );
  return rows;
}

module.exports = { findAll };
