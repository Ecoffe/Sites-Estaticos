var database = require("../database/config");

function lingua() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        SET lc_time_names = 'pt_BR';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

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

async function buscarMensal(idEstufa) {
    try {
        // Executa a instrução SET para definir a configuração de local
        await database.executar("SET lc_time_names = 'pt_BR';");

        // Em seguida, executa a instrução SQL para buscar os dados desejados
        var instrucaoSql = `
            SELECT 
                MONTHNAME(diaHora) AS mes, 
                ROUND(AVG(temperatura)) AS 'mediaTemp', 
                ROUND(AVG(umidade)) AS 'mediaUmi', 
                MONTH(diaHora) AS mes1 
            FROM 
                dados 
            JOIN 
                sensor 
            WHERE 
                fkSensor = 1 AND fkEstufa = ${idEstufa} 
            GROUP BY 
                mes, mes1 
            ORDER BY 
                mes1;
        `;
        
        return await database.executar(instrucaoSql);
    } catch (error) {
        // Lidar com erros, como um problema de conexão com o banco de dados
        console.error("Erro ao executar consulta:", error);
        throw error;
    }
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

function mensalKpi(idEstufa) {

    var instrucaoSql = `

        SELECT MONTHNAME(diaHora) AS mes, ROUND(MAX(temperatura)) AS tempMax, ROUND(MIN(umidade)) AS umidMin 
        FROM dados 
        JOIN sensor ON dados.fkSensor = sensor.idSensor 
        WHERE fkEstufa = ${idEstufa}
        GROUP BY mes 
        ORDER BY tempMax DESC, umidMin ASC 
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

<<<<<<< HEAD
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
=======

module.exports = {
    lingua,
    buscarUltimasMedidasTemperatura,
    buscarUltimasMedidasUmidade,
    listarKpi,
>>>>>>> 70c46899a28eb709a91e1b33d4d44e41182f231a
    buscarMensal,
    buscarMedidasEmTempoReal,
    atualizacaoUmidade,
    atualizacaoTemperatura,
    mensalKpi,
    alertaBanco,
    alertaBancoUmi
}
