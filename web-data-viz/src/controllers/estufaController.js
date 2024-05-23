var estufaModel = require("../models/estufaModel");


function listar(req, res) {
  var fkEmpresa = req.query.fkEmpresaServer; // Corrigido para req.query
  if (!fkEmpresa) {
    return res.status(400).json({ error: "fkEmpresaServer não fornecido" });
  }
  estufaModel.listar(fkEmpresa).then(function (resultado) {
    res.status(200).json(resultado);
  }).catch(function (erro) {
    res.status(500).json(erro.sqlMessage);
  });
}

function cadastrar(req, res) {

  var nomeEstufa = req.body.nomeEstufalServer;
  var tamEstufa = req.body.tamEstufaServer;
  var descEstufa = req.body.descServer;
  var idEmpresa = req.body.idEmpresaServer;

  if (descEstufa == undefined) {
    res.status(400).send("descricao está undefined!");
  } else if (idEmpresa == undefined) {
    res.status(400).send("idEmpresa está undefined!");
  } else {


    estufaModel.cadastrar(nomeEstufa, tamEstufa, descEstufa, idEmpresa)
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

function consultar(req, res) {
  var fkEmpresa = req.query.fkEmpresaServer;
  var idEstufa = req.query.idEstufaServer;

      estufaModel.consultar(idEstufa, fkEmpresa)
          .then(
              function (resultadoconsultar) {
                  console.log(`\nResultados encontrados: ${resultadoconsultar.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultadoconsultar)}`); // transforma JSON em String

                  if (resultadoconsultar.length == 1) {
                      console.log(resultadoconsultar);
                      res.json({
                          idEstufa: resultadoconsultar[0].idEstufa,
                          nomeEstufa: resultadoconsultar[0].nomeEstufa,
                          tamEstufa: resultadoconsultar[0].tamanhoM2,
                          descEstufa: resultadoconsultar[0].descricao
                      });

                  } else if (resultadoconsultar.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }


module.exports = {
  consultar,
  listar,
  cadastrar
}