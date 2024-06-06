var database = require("../database/config");

function buscarUltimasMedidasTemperatura(idEstufa, limite_linhas) {

    var instrucao = `select temperatura from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasUmidade(idEstufa, limite_linhas) {

    var instrucao = `select umidade from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa};`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade
}
