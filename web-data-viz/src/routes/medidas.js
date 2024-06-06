var express = require("express");
var router = express.Router();
var medidaController = require("../controllers/medidaController");

router.get("/ultimasTemperatura", function (req, res) {
    medidaController.buscarUltimasMedidasTemperatura(req, res);
});

router.get("/ultimasUmidade", function (req, res) {
    medidaController.buscarUltimasMedidasUmidade(req, res);
});

router.get("/listarKpi", function (req, res) {
    funcionarioController.listarKpi(req, res);
});

module.exports = router;
