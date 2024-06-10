var database = require("../database/config");


function listarKpi(idEstufa) {
    var instrucao = `
        select temperatura, umidade from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa} order by idDados desc limit 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

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

function buscarMensal() {
    var instrucaoSql = `
    select monthname(diaHora) as 'Mês', round(avg(temperatura)) as 'MédiaTemp', round(avg(umidade)) as 'MédiaUmi'from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = 1 group by diaHora order by diaHora;
    `
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idEstufa) {

    var instrucaoSql = `SELECT temperatura, umidade, DATE_FORMAT(diaHora,'%H:%i:%s') AS momento, fkSensor FROM dados WHERE fkSensor = 1 order by idDados desc limit 1;`;

    console.log("Executando a instrução SQL dos alertas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade,
    listarKpi,
    buscarMensal,
    buscarMedidasEmTempoReal
}
