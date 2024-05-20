var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");


router.post("/cadastrar", function (req, res) {
  estufaController.cadastrar(req, res);
})

// Ajuste a rota de listagem para aceitar query string
router.get("/listar", function (req, res) {
  estufaController.listar(req, res);
});

module.exports = router;
