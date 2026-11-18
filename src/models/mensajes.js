const database = require("../config/database");

async function create({ nombre, correo, asunto, mensaje }) {
  const [result] = await database.execute(
    "INSERT INTO mensajes_contacto (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)",
    [nombre, correo, asunto, mensaje],
  );
  return result.insertId;
}

module.exports = { create };
