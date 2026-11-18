// Manejo central de errores: devuelve JSON y no filtra detalles internos
function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  // JSON mal formado enviado por el cliente
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON no válido" });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "El cuerpo es demasiado grande" });
  }

  const status = error.status || 500;
  if (status >= 500 && !error.status) {
    console.error(error);
  }

  const message = error.status ? error.message : "Error interno del servidor";
  return res.status(status).json({ error: message });
}

module.exports = errorHandler;
