var database = require("../database/config")

function listar(fkEmpresa) {
    var instrucao = `
        SELECT * FROM funcionario WHERE fkEmpresa = ${fkEmpresa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(cpf, senha) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, senha)
    var instrucaoSql = `
        SELECT idFuncionario, nomeFuncionario, emailFuncionario, cpf FROM funcionario WHERE cpf = '${cpf}' AND senhaFuncionario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarFunc(nome, email, cpf, senha, fkEmpresa) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO funcionario (nomeFuncionario, cpf, emailFuncionario, senhaFuncionario, diaInscricao, fkEmpresa) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', default, '${fkEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function inserirAdicional(cep, numero, complemento, fkFunc) {
    var instrucaoSql = `
    insert into endereco (cep, numero, complemento, fkFuncionario) values ('${cep}', '${numero}', '${complemento}', '${fkFunc}');
    `

    return database.executar(instrucaoSql)
}

module.exports = {
    autenticar,
    listar,
    cadastrarFunc,
    inserirAdicional
};