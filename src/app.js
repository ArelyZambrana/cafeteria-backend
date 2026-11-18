const express = require("express");
const cors = require("./middlewares/cors");
const requireJsonObject = require("./middlewares/require-json-object");
const errorHandler = require("./middlewares/error-handler");
const routes = require("./routes");

const app = express();

app.disable("x-powered-by");
app.use(cors); // CORS para que Angular pueda consumir la API
app.use(express.json({ limit: "1mb" }));
app.use(requireJsonObject);

app.use("/api", routes);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});
app.use(errorHandler);

module.exports = app;
