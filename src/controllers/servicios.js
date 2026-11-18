const servicios = require("../models/servicios");

// GET /api/servicios
async function list(req, res) {
  res.json(await servicios.findAll());
}

module.exports = { list };
