var estufaModel = require("../models/estufaModel");

function buscarestufasPorEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  estufaModel.buscarestufasPorEmpresa(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os estufas: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


function cadastrar(req, res) {
  var descricao = req.body.descricao;
  var idEmpresa = req.body.idEmpresa;

  if (descricao == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idEmpresa == undefined) {
    res.status(400).send("idEmpresa está undefined!");
  } else {


    estufaModel.cadastrar(descricao, idEmpresa)
      .then((resultado) => {
        res.status(201).json(resultado);
      }
      ).catch((erro) => {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  buscarestufasPorEmpresa,
  cadastrar
}