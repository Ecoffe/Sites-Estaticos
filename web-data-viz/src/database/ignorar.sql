create database ecoffe;
use ecoffe;
-- CADASTRO DE EMPRESA
create table empresa(
	idEmpresa int primary key auto_increment,
    razaoSocial varchar(45),
	nomeFantasia varchar(45),
    emailContato varchar(45),
	cnpj char(18),
	senhaEmpresa varchar(45),
	diaInscricao datetime default current_timestamp);

select * from empresa;


-- CADASTRO DE FUNCIONARIOS
create table funcionario(
	idFuncionario int primary key auto_increment,
	nomeFuncionario varchar(100),
	cpf char(14),
    emailFuncionario varchar(90),
	senhaFuncionario varchar(45),
	diaInscricao datetime default current_timestamp,
	fkEmpresa int,
		constraint fkFuncionarioEmpresa foreign key (fkEmpresa)
			references empresa(idEmpresa));

select * from funcionario;
select nomeFuncionario, cpf, emailFuncionario, senhaFuncionario, date_format(diaInscricao,"%d/%m/%y") from funcionario where idFuncionario = 1 and fkEmpresa = 1;


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
    telCelular varchar(14),
    telFixo varchar(13),
    fkEmpresa int,
    fkFuncionario int,
		constraint fkTelefoneFuncionario foreign key (fkFuncionario)
			references funcionario(idFuncionario),
		constraint fkTelefoneEmpresa foreign key (fkEmpresa)
			references empresa(idEmpresa));

select * from endereco;
         
         
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

insert into sensor values
(2, 'teste2', 2);

select * from sensor;



-- SETANDO AS MÉTRICAS DE MIN E MAX
create table metrica(
	idMetrica int primary key auto_increment,
	minTemp double,
    maxTemp double,
    minUmid double,
    maxUmid double,
    fkSensor int, foreign key (fkSensor) references sensor (idSensor));
    
insert into metrica values
(default, 0, 50, 30, 60, 2);
    
select * from metrica;


-- ARMAZENANDO OS DADOS CAPTADOS (TABELA LINKADA AO DATACQUINO)
create table dados(
	idDados int auto_increment,
    fkSensor int,
		constraint pkDados primary key (idDados, fkSensor),
    temperatura double,
    umidade double,
    diaHora datetime default current_timestamp);

insert into dados values
(default, 2, 35, 55, default);

select * from dados;

SELECT 
    e.nomeEstufa,
    CASE
        WHEN d.temperatura < m.minTemp THEN CONCAT('Temperatura muito baixa: ', d.temperatura, '°C')
        WHEN d.temperatura > m.maxTemp THEN CONCAT('Temperatura muito alta: ', d.temperatura, '°C')
        ELSE CONCAT('Temperatura normal: ', d.temperatura, '°C')
    END AS nivelDeRisco,
    d.diaHora
FROM 
    dados d
JOIN 
    sensor s ON d.fkSensor = s.idSensor
JOIN 
    estufa e ON s.fkEstufa = e.idEstufa
JOIN 
    metrica m ON d.fkSensor = m.fkSensor;


select estufa.nome as Estufa;

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

SELECT nomeEstufa, umidade, temperatura 
FROM estufa 
JOIN sensor ON idEstufa = fkEstufa 
JOIN dados ON idSensor = fkSensor 
WHERE fkEmpresa = 1 
group by nomeEstufa, umidade, temperatura;

-- ARMAZENAR MENSAGENS VINDAS DA HOME P/ ATENDIMENTO
create table sacdashboard (
idMensagem int primary key auto_increment,
email varchar (45),
assunto varchar(45),
mensagem varchar (300));

select * from sacdashboard;

-- Exibir as empresas com respectivos CNPJs e os funcionários com respectivo CPF.
select empresa.nomeFantasia as 'Empresa',
	empresa.cnpj as 'CNPJ',
    funcionario.nomeFuncionario as 'Funcionário',
    funcionario.cpf as 'CPF'
    from empresa join funcionario on funcionario.fkEmpresa = empresa.idEmpresa;

-- Exibir os telefones dos funcionários e empreas, caso seja necessário entrar em contato. 
select 	empresa.nomeFantasia as 'Empresa',
	telefone.telCelular as 'Telefone Celular',
	telefone.telFixo as 'Telefone Fixo'
    from telefone join empresa on telefone.fkEmpresa = empresa.idEmpresa;

select funcionario.nomeFuncionario as 'Funcionário',
telefone.telCelular as 'Telefone Celular',
	telefone.telFixo as 'Telefone Fixo'
    from telefone join funcionario on telefone.fkFuncionario = funcionario.idFuncionario;

-- Exibir as estufas das empresas, junto as descrições.
select empresa.nomeFantasia as 'Empresa',
	estufa.nomeEstufa as 'Estufa',
    estufa.descricao as 'Descrição'
    from empresa left join estufa on estufa.fkEmpresa = empresa.idEmpresa;

-- Exibir as temperaturas minimas e máximas juntamente ao dado atual que foi coletado
select estufa.nomeEstufa as 'Estufa',
	sensor.nomeSensor as 'Sensor',
    metrica.minTemp as 'Temperatura Mínima (°C)',
    metrica.maxTemp as 'Temperatura Máxima (°C)',
    dados.temperatura as 'Temperatura Captada (°C)',
    metrica.minUmid as 'Umidade Mínima (%)',
    metrica.maxUmid as 'Umidade Máxima (%)',
    dados.umidade as 'Umidade Captada (%)',
    dados.diaHora as 'Momento de captação'
    from estufa join sensor on sensor.fkEstufa = estufa.idEstufa
    join metrica on metrica.fkSensor = sensor.idSensor
    join dados on dados.fkSensor = sensor.idSensor;

-- Exibir as mensagens vindas da tela inicial para entrarmos em contato
select sachome.idMensagem as 'ID Mensagem',
		sachome.email as 'Email',
        sachome.assunto as 'Assunto',
		sachome.mensagem as 'Mensagem:'
        from sachome;

-- Exibir as mensagens vindas da tela da dashboard para entrarmos em contato
select sacdashboard.idMensagem as 'ID Mensagem',
		sacdashboard.email as 'Email',
        sacdashboard.assunto as 'Assunto',
		sacdashboard.mensagem as 'Mensagem:'
        from sacdashboard;

-- Visualizar as notificações conforme estufa
select estufa.nomeEstufa as 'Estufa',
	sensor.nomeSensor as 'Sensor',
    dados.temperatura as 'Temperatura Captada (°C)',
    dados.umidade as 'Umidade Captada (%)',
    notificacoes.descricao as 'Notificação'
    from estufa join sensor on sensor.fkEstufa = estufa.idEstufa
		join dados on dados.fkSensor = sensor.idSensor
		join notificacoes on notificacoes.fkDado = dados.idDados;