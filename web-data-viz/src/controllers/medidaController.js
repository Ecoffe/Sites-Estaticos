var medidaModel = require("../models/medidaModel");

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

module.exports = {
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade
}
