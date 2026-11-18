const especialidades = require("../models/especialidades");

// GET /api/especialidades
async function list(req, res) {
  res.json(await especialidades.findAll());
}

module.exports = { list };
