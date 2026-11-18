const path = require("node:path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

const allowedMethods = "GET,HEAD,POST,OPTIONS";
const allowedHeaders = "Content-Type,Authorization";

// Orígenes del frontend autorizados (variable CORS_ORIGINS del .env)
function getAllowedOrigins() {
  const value =
    process.env.CORS_ORIGINS || "http://localhost:4200,http://127.0.0.1:4200";
  return new Set(
    value
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

const allowedOrigins = getAllowedOrigins();

function cors(req, res, next) {
  const origin = req.get("Origin");

  // Llamadas sin Origin (Postman, curl) no necesitan CORS
  if (!origin) {
    return next();
  }

  res.vary("Origin");
  if (!allowedOrigins.has(origin)) {
    return res.status(403).json({ error: "Origen no permitido" });
  }

  res.set("Access-Control-Allow-Origin", origin);
  res.set("Access-Control-Allow-Methods", allowedMethods);
  res.set("Access-Control-Allow-Headers", allowedHeaders);

  // Respuesta rápida a la petición "preflight" del navegador
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  return next();
}

module.exports = cors;
