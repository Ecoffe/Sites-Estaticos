var database = require("../database/config");

function buscarestufasPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM estufa WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fkEmpresa) estufa VALUES (${descricao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarestufasPorEmpresa,
  cadastrar
}
