const precios = require("../models/precios");

// GET /api/precios
async function list(req, res) {
  res.json(await precios.findAll());
}

module.exports = { list };
