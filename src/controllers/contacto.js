const mensajes = require("../models/mensajes");
const httpError = require("../utils/http-error");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function texto(value, min, max) {
  if (typeof value !== "string") {
    return null;
  }
  const limpio = value.trim();
  return limpio.length >= min && limpio.length <= max ? limpio : null;
}

// POST /api/contacto -> guarda el mensaje del formulario
async function create(req, res) {
  const nombre = texto(req.body.nombre, 2, 100);
  const correo = texto(req.body.correo, 5, 100);
  const asunto = texto(req.body.asunto, 3, 150);
  const mensaje = texto(req.body.mensaje, 10, 2000);

  if (!nombre || !correo || !EMAIL_REGEX.test(correo) || !asunto || !mensaje) {
    throw httpError(
      400,
      "Revisa los datos: nombre (2-100), correo válido, asunto (3-150) y mensaje (10-2000 caracteres)",
    );
  }

  const id = await mensajes.create({ nombre, correo, asunto, mensaje });
  res.status(201).json({ id, mensaje: "Mensaje recibido. ¡Gracias por escribirnos!" });
}

module.exports = { create };
