var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");

router.get("/:empresaId", function (req, res) {
  estufaController.buscarestufasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  estufaController.cadastrar(req, res);
})

module.exports = router;