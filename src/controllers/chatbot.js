const { obtenerContexto } = require("../chatbot/contexto");
const { chat } = require("../chatbot/ollama");
const httpError = require("../utils/http-error");

const MAX_PROMPT_LENGTH = 1000;
const MAX_HISTORIAL = 10; // últimos mensajes que se reenvían al modelo

// Limpia el historial que manda el frontend (solo user/assistant, con límites)
function limpiarHistorial(historial) {
  if (historial === undefined) {
    return [];
  }
  if (!Array.isArray(historial)) {
    throw httpError(400, "historial debe ser un arreglo");
  }
  return historial
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim(),
    )
    .slice(-MAX_HISTORIAL)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_PROMPT_LENGTH) }));
}

// POST /api/chatbot  { prompt: "...", historial?: [{ role, content }] }
async function prompt(req, res) {
  const { prompt: pregunta, historial } = req.body;

  if (
    typeof pregunta !== "string" ||
    !pregunta.trim() ||
    pregunta.length > MAX_PROMPT_LENGTH
  ) {
    throw httpError(
      400,
      `prompt debe ser un texto no vacío de hasta ${MAX_PROMPT_LENGTH} caracteres`,
    );
  }

  const system = await obtenerContexto();
  const respuesta = await chat([
    { role: "system", content: system },
    ...limpiarHistorial(historial),
    { role: "user", content: pregunta.trim() },
  ]);

  res.json({ response: respuesta });
}

module.exports = { prompt };
