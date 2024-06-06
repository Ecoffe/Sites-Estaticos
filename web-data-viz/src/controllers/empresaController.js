var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}


function inserirAdicional(req, res) {
   
  var cep = req.body.cepServer
  var numero = req.body.numeroServer
  var complemento = req.body.complementoServer
  var fkEmpresa = req.body.FkEmpresaServer 

  if (cep == undefined) {
      res.status(400).send("Seu cep está undefined!");
  } else if (numero == undefined) {
      res.status(400).send("Seu numero está undefined!");
  } else if (complemento == undefined) {
      res.status(400).send("Seu complemento está undefined!");
  } else if (fkEmpresa == undefined) {
      res.status(400).send("Seu fkFunc está undefined!");
  } else {

      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      empresaModel.inserirAdicional(cep, numero, complemento, fkEmpresa)
          .then(
              function (resultado) {
                  res.json(resultado);
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log(
                      "\nHouve um erro ao realizar o cadastro! Erro: ",
                      erro.sqlMessage
                  );
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }

}

function inserirTelefone(req, res) {

  var telC = req.body.telCServer
  var telF = req.body.telFServer
  var fkEmpresa = req.body.FkEmpresaServer


  if (telC == undefined) {
    res.status(400).send("Seu telCell está undefined!");
} else if (telF == undefined) {
    res.status(400).send("Seu telFixo está undefined!");
} else if (fkEmpresa == undefined) {
  res.status(400).send("Seu fkEmpresa está undefined!");
} else {

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    empresaModel.inserirTelefone(telC, telF, fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  inserirAdicional,
  inserirTelefone
};
