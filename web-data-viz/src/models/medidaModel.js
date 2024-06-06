var database = require("../database/config");

function buscarUltimasMedidasTemperatura(idEstufa) { 
    var instrucao = `select temperatura, DATE_FORMAT(diaHora, '%H:%i') as diaHora from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa} order by idDados desc limit 7;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUltimasMedidasUmidade(idEstufa) {
    var instrucao = `select umidade, DATE_FORMAT(diaHora, '%H:%i') as diaHora from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa} order by idDados desc limit 7;`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade
}
