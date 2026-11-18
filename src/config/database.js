const path = require("node:path");
const mysql = require("mysql2/promise");

require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  quiet: true,
});

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME es obligatorio y debe configurarse en el archivo .env");
}

// Pool de conexiones compartido por todos los modelos
const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME,
  charset: "utf8mb4",
  decimalNumbers: true, // DECIMAL llega como número, no como texto
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
