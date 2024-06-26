var express = require("express");
var router = express.Router();
var medidaController = require("../controllers/medidaController");

router.post("/lingua", function (req, res) {
    medidaController.lingua(req, res);
});

router.get("/listar", function (req, res) {
    medidaController.listar(req, res);
});

router.get("/ultimasTemperatura", function (req, res) {
    medidaController.buscarUltimasMedidasTemperatura(req, res);
});

router.get("/ultimasUmidade", function (req, res) {
    medidaController.buscarUltimasMedidasUmidade(req, res);
});

router.get("/listarKpi", function (req, res) {
    medidaController.listarKpi(req, res);
});

router.get("/buscarMensal", function (req, res) {
    medidaController.buscarMensal(req, res);
});

router.get("/tempo-real/:idEstufa", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.get("/AtualizacaoUmi", function (req, res) {
    medidaController.atualizacaoUmidade(req, res);
});

router.get("/AtualizacaoTemp", function (req, res) {
    medidaController.atualizacaoTemperatura(req, res);
});

router.get("/mensalKpi", function (req, res) {
    medidaController.mensalKpi(req, res)
})

router.post("/alertaBanco", function (req,res) {
    medidaController.alertaBanco(req, res)
})

router.post("/alertaBancoUmi", function (req,res) {
    medidaController.alertaBancoUmi(req, res)
})

module.exports = router;
