var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

// Recebendo os dados do html e direcionando para a função cadastrar de funcionarioController.js
router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrarFunc(req, res);
})

router.post("/autenticar", function (req, res) {
    funcionarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    funcionarioController.listar(req, res);
});

router.post("/inserirAdicional", function (req, res) {
    funcionarioController.inserirAdicional(req, res);
});

router.post("/inserirTelefone", function (req, res) {
    funcionarioController.inserirTelefone(req, res);
  });

router.get("/pegarDados", function (req, res) {
    funcionarioController.pegarDados(req, res);
})
  

module.exports = router;
