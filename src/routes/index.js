const express = require("express");
const cafeteria = require("../controllers/cafeteria");
const secciones = require("../controllers/secciones");
const servicios = require("../controllers/servicios");
const especialidades = require("../controllers/especialidades");
const precios = require("../controllers/precios");
const fotos = require("../controllers/fotos");
const contacto = require("../controllers/contacto");
const chatbot = require("../controllers/chatbot");

const router = express.Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

router.get("/cafeteria", cafeteria.get);
router.get("/secciones", secciones.list);
router.get("/servicios", servicios.list);
router.get("/especialidades", especialidades.list);
router.get("/precios", precios.list);
router.get("/fotos", fotos.list);

router.post("/contacto", contacto.create);
router.post("/chatbot", chatbot.prompt);

module.exports = router;
