const database = require("../config/database");

// Datos generales de la cafetería (una sola fila)
async function getInfo() {
  const [rows] = await database.query(
    `SELECT nombre, eslogan, titulo_inicio AS tituloInicio,
            subtitulo_inicio AS subtituloInicio, video_inicio AS videoInicio,
            direccion, ciudad, telefono, correo, historia,
            latitud, longitud, saludo_chatbot AS saludoChatbot
       FROM cafeteria_info ORDER BY id LIMIT 1`,
  );
  return rows[0] || null;
}

async function getHorarios() {
  const [rows] = await database.query(
    "SELECT dia, horario FROM horarios ORDER BY orden, id",
  );
  return rows;
}

module.exports = { getInfo, getHorarios };
