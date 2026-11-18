const cafeteria = require("../models/cafeteria");
const httpError = require("../utils/http-error");

// GET /api/cafeteria -> datos generales + horarios
async function get(req, res) {
  const [info, horarios] = await Promise.all([
    cafeteria.getInfo(),
    cafeteria.getHorarios(),
  ]);
  if (!info) {
    throw httpError(404, "No hay datos de la cafetería");
  }
  res.json({ ...info, horarios });
}

module.exports = { get };
