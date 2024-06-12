var medidaModel = require("../models/medidaModel");

function listarKpi(req, res) {
    const idEstufa = req.query.idEstufaServer;
    
    medidaModel.listarKpi(idEstufa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasTemperatura(req, res) {
    const idEstufa = req.query.idEstufaServer;
    console.log(idEstufa);
    if (!idEstufa) {
        return res.status(400).send("idEstufaServer não fornecido");
    }

    medidaModel.buscarUltimasMedidasTemperatura(idEstufa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasUmidade(req, res) {
    const idEstufa = req.query.idEstufaServer;
    if (!idEstufa) {
        return res.status(400).send("idEstufaServer não fornecido");
    }

    medidaModel.buscarUltimasMedidasUmidade(idEstufa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMensal(req, res) {

    medidaModel.buscarMensal().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado)
        } else {
            res.status(204).send("nenhum resultado encontrado")
        }
    }).catch(function (erro) {
        console.log(erro)
        console.log("Houve um erro ao pegar as meidas.", erro.sqlMessage)
        res.status(500).json(erro.sqlMessage)
    })
}

function buscarMedidasEmTempoReal(req, res) {

    var idEstufa = req.params.idEstufa;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idEstufa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizacaoUmidade(req, res) {
    const idEstufa = req.query.idEstufaServer;
    
    medidaModel.atualizacaoUmidade(idEstufa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function atualizacaoTemperatura(req, res) {
    const idEstufa = req.query.idEstufaServer;
    
    medidaModel.atualizacaoTemperatura(idEstufa).then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    });
}

function mensalKpi(req, res) {
    medidaModel.buscarMensal().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado");
        }
    }).catch(function (erro) {
        console.log("Houve um erro ao pegar as medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function alertaBanco(req, res) {
    var temp = req.body.tempServer
    var descricao = req.body.descricaoServer

    if (temp == undefined) {
        res.status(400).send("temp está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("A descricao está undefined!");
    } else {

        medidaModel.alertaBanco(temp, descricao)
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


function alertaBancoUmi(req, res) {
    var umid = req.body.umidServer
    var descricao = req.body.descricaoServer

    if (umid == undefined) {
        res.status(400).send("umid está undefined!");
    } else if (descricao == undefined) {
        res.status(400).send("A descricao está undefined!");
    } else {

        medidaModel.alertaBanco(umid, descricao)
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
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade,
    listarKpi,
    buscarMensal,
    buscarMedidasEmTempoReal, 
    atualizacaoUmidade,
    atualizacaoTemperatura,
    mensalKpi,
    alertaBanco,
    alertaBancoUmi
}
