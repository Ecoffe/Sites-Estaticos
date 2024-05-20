var database = require("../database/config");

function listar(fkEmpresa) {
  var instrucao = `
      SELECT * FROM estufa WHERE fkEmpresa = ${fkEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrar(nomeEstufa, tamEstufa, descEstufa, idEmpresa) {
  
  var instrucaoSql = `INSERT INTO estufa (nomeEstufa, tamanhoM2, descricao, fkEmpresa) VALUES ('${nomeEstufa}', ${tamEstufa}, '${descEstufa}', ${idEmpresa})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  listar,
  cadastrar
}
