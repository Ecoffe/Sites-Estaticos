var funcionarioModel = require("../models/funcionarioModel");
var estufaModel = require("../models/estufaModel");

function listar(req, res) {
    var fkEmpresa = req.query.fkEmpresaServer; // Corrigido para req.query
    if (!fkEmpresa) {
        return res.status(400).json({ error: "fkEmpresaServer não fornecido" });
    }
    funcionarioModel.listar(fkEmpresa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}



function autenticar(req, res) {
    var cpf = req.body.cpfServer;
    var senha = req.body.senhaServer;

    if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        funcionarioModel.autenticar(cpf, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            id: resultadoAutenticar[0].idFuncionario,
                            nome: resultadoAutenticar[0].nomeFuncionario,
                            email: resultadoAutenticar[0].emailFuncionario,
                            cpf: resultadoAutenticar[0].cpf,
                            senha: resultadoAutenticar[0].senha,
                            fkEmpresa: resultadoAutenticar[0].fkEmpresa
                        });

                    } else if (resultadoAutenticar.length == 0) {
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

}

function cadastrarFunc(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeFunc = req.body.nomeFuncServer;
    var emailFunc = req.body.emailServer;
    var cpfFunc = req.body.cpfServer;
    var senhaFunc = req.body.senhaServer;
    var fkEmpresa = req.body.fkEmpresaServer;

    // Faça as validações dos valores
    if (nomeFunc == undefined) {
        res.status(400).send("Seu nome Fantasia está undefined!");
    } else if (emailFunc == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpfFunc == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (senhaFunc == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.cadastrarFunc(nomeFunc, emailFunc, cpfFunc, senhaFunc, fkEmpresa)
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

function inserirAdicional(req, res) {
   
    var cep = req.body.cepServer
    var numero = req.body.numeroServer
    var complemento = req.body.complementoServer
    var fkFunc = req.body.FkFuncionarioServer 
    var fkEmpresa = req.body.FkEmpresaServer

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
    } else if (fkFunc == undefined) {
        res.status(400).send("Seu fkFunc está undefined!");
    } else if (fkEmpresa == undefined){
        res.status(400).send("Seu fkEmpresa está undefined");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        funcionarioModel.inserirAdicional(cep, numero, complemento, fkFunc, fkEmpresa)
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
    var fkFunc = req.body.FkFuncServer
  
    if (telC == undefined) {
      res.status(400).send("Seu telCell está undefined!");
  } else if (telF == undefined) {
      res.status(400).send("Seu telFixo está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Seu fkEmpresa está undefined!");
  } else if (fkFunc == undefined) {
    res.status(400).send("Seu fkFunc está undefined!");
  } else {
  
      // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
      funcionarioModel.inserirTelefone(telC, telF, fkEmpresa, fkFunc)
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

  function pegarDados(req, res) {
    var idFunc = req.query.idFuncServer;
    var fkEmpresa = req.query.fkEmpresaServer

    if (idFunc == undefined) {
        res.status(400).send("idFunc esta undefined")
    } else if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa esta undefined")
    } else {

        funcionarioModel.pegarDados(idFunc, fkEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro)
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: erro.sqlMessage"
                    );
                    res.status(500).json(erro.sqlMessage)
                }
            )
    }
  }

module.exports = {
    autenticar,
    listar,
    cadastrarFunc,
    inserirAdicional,
    inserirTelefone,
    pegarDados
}