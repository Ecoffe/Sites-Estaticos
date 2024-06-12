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

    select monthname(diaHora) as mes, round(avg(temperatura)) as 'mediaTemp', round(avg(umidade)) as 'mediaUmi', month(diaHora) as mes1 from dados join sensor where fkSensor = 1 and fkEstufa = 1 group by mes, mes1 order by mes1;
    `
    return database.executar(instrucaoSql);
}


function buscarMedidasEmTempoReal(idEstufa) {

    var instrucaoSql = `SELECT temperatura, umidade, DATE_FORMAT(diaHora,'%H:%i') AS momento, DATE_FORMAT(diaHora, '%d/%m/%y') AS dia, fkSensor FROM dados WHERE fkSensor = 1 order by idDados desc limit 1;`;
    
    console.log("Executando a instrução SQL dos alertas: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    }
    
    function atualizacaoUmidade(idEstufa) {
        var instrucaoSql = `select umidade, DATE_FORMAT(diaHora, '%H:%i') as diaHora from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa} order by idDados desc limit 1;`;
        
        return database.executar(instrucaoSql);
}

function atualizacaoTemperatura(idEstufa) {
    var instrucaoSql = `select temperatura, DATE_FORMAT(diaHora, '%H:%i') as diaHora from dados join sensor on fkSensor = idSensor where fkSensor = 1 and fkEstufa = ${idEstufa} order by idDados desc limit 1;`;
    
    return database.executar(instrucaoSql);
    
}
    
function mensalKpi() {
    var instrucaoSql = `
        SELECT MONTHNAME(diaHora) AS mes, ROUND(MAX(temperatura)) AS tempMax, ROUND(MIN(umidade)) AS umidMin 
        FROM dados 
        JOIN sensor ON dados.fkSensor = sensor.idSensor 
        WHERE fkSensor = 1
        GROUP BY mes 
        ORDER BY tempMax DESC, umidMin ASC 
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function alertaBanco(temp, descricao) {
    var instrucaoSql = `
    insert into notificacoes(descricao, temperatura) values ('${descricao}', ${temp});
    `

    return database.executar(instrucaoSql)
}

function alertaBancoUmi(umid, descricao) {
    var instrucaoSql = `
    insert into notificacoes(descricao, umidade) values ('${descricao}', ${umid});
    `

    return database.executar(instrucaoSql)
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
