const database = require("./config/database");
const app = require("./app");

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";

async function start() {
  try {
    // Verifica la conexión a MySQL antes de abrir el puerto
    await database.query("SELECT 1");
    app.listen(port, host, () => {
      console.log(`API de Café Aroma disponible en http://${host}:${port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar la API:", error.message);
    await database.end();
    process.exitCode = 1;
  }
}

start();
