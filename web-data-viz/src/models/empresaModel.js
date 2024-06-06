const { inserirTelCell, inserirTelFixo } = require("../controllers/empresaController");
var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE id = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT * FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj) {
  var instrucaoSql = `INSERT INTO empresa (razao_social, cnpj) VALUES ('${razaoSocial}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

function inserirAdicional(cep, numero, complemento, fkEmpresa) {
  var instrucaoSql = `
  insert into endereco (cep, numero, complemento, fkEmpresa) values ('${cep}', '${numero}', '${complemento}', '${fkEmpresa}');
  `

  return database.executar(instrucaoSql)
}

function inserirTelefone(telC, telF, fkEmpresa) {
  var instrucaoSql = `
  insert into telefone (telCelular, telFixo, fkEmpresa) values ('${telC}', '${telF}', '${fkEmpresa}');
  `

  return database.executar(instrucaoSql)
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar, inserirAdicional, inserirTelefone };
