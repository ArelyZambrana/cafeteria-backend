# Café Aroma · Backend

API REST en **Node.js + Express** con **MySQL** y un **chatbot** que usa **Ollama** (`gemma3:4b`).
Todo el contenido del sitio web (servicios, especialidades, precios, fotos, datos de la tienda)
sale de esta API.

## Estructura

```
├── app.js                  # Entrada (equivale a src/index.js)
├── .env.example            # Variables de entorno de ejemplo
├── database/cafeteria.sql  # CREATE TABLE + datos de ejemplo
└── src/
    ├── index.js            # Arranque del servidor
    ├── app.js              # Express, CORS y rutas
    ├── config/database.js  # Pool de MySQL
    ├── routes/             # Definición de rutas
    ├── controllers/        # Lógica de cada endpoint
    ├── models/             # Consultas a MySQL
    ├── middlewares/        # cors, errores, validación de JSON
    └── chatbot/            # Cliente de Ollama + contexto del negocio
```

## Requisitos

- Node.js 20 o superior
- MySQL o MariaDB (por ejemplo, el de XAMPP)
- [Ollama](https://ollama.com) con el modelo `gemma3:4b` (`ollama pull gemma3:4b`)

## Instalación

```bash
npm install
copy .env.example .env      # en Windows (cmd/PowerShell)
```

Edita `.env` si tu MySQL tiene otro usuario o contraseña.

Crea la base de datos y carga los datos de ejemplo:

```bash
mysql -u root < database/cafeteria.sql
```

Inicia la API:

```bash
npm start        # producción
npm run dev      # desarrollo (reinicia al guardar)
```

Quedará en `http://127.0.0.1:3000`.

## Variables de entorno

| Variable | Valor por defecto | Descripción |
| --- | --- | --- |
| `DB_HOST` | `127.0.0.1` | Host de MySQL |
| `DB_PORT` | `3306` | Puerto de MySQL |
| `DB_USER` | `root` | Usuario de MySQL |
| `DB_PASSWORD` | vacío | Contraseña de MySQL |
| `DB_NAME` | — (obligatoria) | Nombre de la base (`cafeteria`) |
| `HOST` / `PORT` | `127.0.0.1` / `3000` | Dónde escucha la API |
| `CORS_ORIGINS` | `http://localhost:4200,http://127.0.0.1:4200` | Orígenes del frontend permitidos |
| `OLLAMA_URL` | `http://localhost:11434` | Servidor de Ollama |
| `OLLAMA_MODEL` | `gemma3:4b` | Modelo del chatbot |

> El archivo `.env` real **no se sube a GitHub** (está en `.gitignore`).

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/health` | Estado del servidor |
| GET | `/api/cafeteria` | Datos de la cafetería + horarios |
| GET | `/api/secciones` | Títulos de secciones y menú |
| GET | `/api/servicios` | Servicios |
| GET | `/api/especialidades` | Especialidades |
| GET | `/api/precios` | Lista de precios |
| GET | `/api/fotos` | Fotos de la tienda |
| POST | `/api/contacto` | Guarda un mensaje: `{ nombre, correo, asunto, mensaje }` |
| POST | `/api/chatbot` | Chatbot: `{ prompt, historial? }` → `{ response }` |

## Base de datos

Tablas: `cafeteria_info`, `secciones`, `horarios`, `servicios`, `especialidades`, `precios`,
`fotos_tienda` y `mensajes_contacto`. Ver [`database/cafeteria.sql`](database/cafeteria.sql).

## Chatbot

`POST /api/chatbot` arma un contexto con los datos reales de MySQL (menú, precios, horarios,
servicios) y lo envía a Ollama (`/api/chat`) junto con las últimas preguntas del cliente. El
modelo responde solo sobre la cafetería. Si Ollama no está abierto, la API responde `502`.

Prueba rápida:

```bash
curl -X POST http://127.0.0.1:3000/api/chatbot -H "Content-Type: application/json" -d "{\"prompt\":\"¿Cuánto cuesta un capuchino?\"}"
```
