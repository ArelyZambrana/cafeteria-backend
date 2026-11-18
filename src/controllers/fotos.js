const fotos = require("../models/fotos");

// GET /api/fotos
async function list(req, res) {
  res.json(await fotos.findAll());
}

module.exports = { list };
