const httpError = require("../utils/http-error");

const OLLAMA_URL = () =>
  (process.env.OLLAMA_URL || "http://localhost:11434").replace(/\/+$/, "");
const OLLAMA_MODEL = () => process.env.OLLAMA_MODEL || "gemma3:4b";
// La primera respuesta puede tardar si el modelo aún se está cargando en memoria
const OLLAMA_TIMEOUT_MS = 120000;

// Envía la conversación a Ollama (/api/chat) y devuelve el texto de la respuesta
async function chat(messages) {
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, OLLAMA_TIMEOUT_MS);

  let data;
  try {
    const response = await fetch(`${OLLAMA_URL()}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL(),
        messages,
        stream: false,
        options: { temperature: 0.4, num_predict: 400 },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw httpError(502, "El servicio de IA no pudo procesar la solicitud");
    }
    data = await response.json();
  } catch (error) {
    if (error.status) {
      throw error;
    }
    if (timedOut) {
      throw httpError(504, "El servicio de IA excedió el tiempo de espera");
    }
    throw httpError(
      502,
      "No se pudo conectar con Ollama. ¿Está abierto y con el modelo descargado?",
    );
  } finally {
    clearTimeout(timeout);
  }

  const respuesta = data?.message?.content;
  if (typeof respuesta !== "string" || !respuesta.trim()) {
    throw httpError(502, "El servicio de IA devolvió una respuesta no válida");
  }
  return respuesta.trim();
}

module.exports = { chat };
