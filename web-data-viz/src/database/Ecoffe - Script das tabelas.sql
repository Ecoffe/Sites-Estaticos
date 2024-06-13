create database ecoffe;
use ecoffe;
-- CADASTRO DE EMPRESA
create table empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(45),
	nomeFantasia varchar(45),
    emailContato varchar(45) unique,
	cnpj char(18) unique,
	senhaEmpresa varchar(45),
	diaInscricao datetime default current_timestamp);

select * from empresa;


-- CADASTRO DE FUNCIONARIOS
create table funcionario(
	idFuncionario int primary key auto_increment,
	nomeFuncionario varchar(100),
	cpf char(18) unique,
    emailFuncionario varchar(90) unique,
	senhaFuncionario varchar(45),
	diaInscricao datetime default current_timestamp,
	fkEmpresa int,
		constraint fkFuncionarioEmpresa foreign key (fkEmpresa)
			references empresa(idEmpresa));

select * from funcionario;


-- TABELAS P/ ENDEREÇOS
create table endereco(
idEndereco int auto_increment,
cep char(9),
numero int,
complemento varchar(45),
fkEmpresa int, foreign key (fkEmpresa) references empresa(idEmpresa),
fkFuncionario int, foreign key (fkFuncionario) references funcionario(idFuncionario),
primary key(idEndereco, fkFuncionario)
);

select * from endereco;


-- TABLES P/ TELEFONES
create table telefone(
	idTelefone int primary key auto_increment,
    telCelular varchar(14) unique,
    telFixo varchar(13),
    fkEmpresa int,
    fkFuncionario int,
		constraint fkTelefoneFuncionario foreign key (fkFuncionario)
			references funcionario(idFuncionario),
		constraint fkTelefoneEmpresa foreign key (fkEmpresa)
			references empresa(idEmpresa));

select * from telefone;
         
         
-- CADASTRO DE ESTUFAS
create table estufa(
	idEstufa int primary key auto_increment,
    nomeEstufa varchar(45),
    tamanhoM2 float,
    descricao varchar(300),
    fkEmpresa int,
		constraint fkEstufaEmpresa foreign key (fkEmpresa)
			references empresa(idEmpresa));

select * from estufa;

-- CADASTRO DOS SENSORES
create table sensor(
	idSensor int primary key auto_increment,
    nomeSensor varchar(45),
    fkEstufa int,
		constraint fkSensorEstufa foreign key(fkEstufa)
			references estufa(idEstufa));

select * from sensor;


-- SETANDO AS MÉTRICAS DE MIN E MAX
create table metrica(
	idMetrica int primary key auto_increment,
	minTemp double,
    maxTemp double,
    minUmid double,
    maxUmid double,
    fkSensor int, foreign key (fkSensor) references sensor (idSensor));
    
select * from metrica;


-- ARMAZENANDO OS DADOS CAPTADOS (TABELA LINKADA AO DATACQUINO)
create table dados(
	idDados int auto_increment,
    fkSensor int,
		constraint pkDados primary key (idDados, fkSensor),
    temperatura double,
    umidade double,
    diaHora datetime default current_timestamp);

select * from dados;

-- ARMAZENAR AS NOTIFICAÇÕES REGISTRADAS
create table notificacoes(
idNotificacao int primary key auto_increment,
descricao varchar(300),
fkDado int,
	constraint fkNotificacaoSensor foreign key (fkDado) 
		references dados (idDados));

select * from notificacoes;


-- ARMAZENAR MENSAGENS VINDAS DA HOME P/ ATENDIMENTO
create table sachome (
idMensagem int primary key auto_increment,
email varchar (45),
assunto varchar(45),
mensagem varchar (300));

select * from sachome;
