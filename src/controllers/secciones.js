const secciones = require("../models/secciones");

// GET /api/secciones
async function list(req, res) {
  res.json(await secciones.findAll());
}

module.exports = { list };
