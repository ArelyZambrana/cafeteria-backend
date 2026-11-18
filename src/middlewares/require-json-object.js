// En POST/PUT/PATCH el cuerpo debe ser un objeto JSON
function requireJsonObject(req, res, next) {
  if (!["POST", "PUT", "PATCH"].includes(req.method)) {
    return next();
  }

  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return res
      .status(400)
      .json({ error: "El cuerpo debe ser un objeto JSON (Content-Type: application/json)" });
  }

  return next();
}

module.exports = requireJsonObject;
