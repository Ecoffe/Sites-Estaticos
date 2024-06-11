var alertas = [];

function obterdados(idEstufa) {
    fetch(`/medidas/tempo-real/${idEstufa}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idEstufa);
                    alertar2(resposta, idEstufa);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idEstufa} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do estufa p/ gráfico: ${error.message}`);
        });
}

function alertar(resposta, idEstufa) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    //temperatura
    var limites = {
        muito_quente: 31,
        quente: 24,
        idealmax: 23,
        idealmin: 18,
        frio: 17,
        muito_frio: 10
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'crítico'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'perigoso'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.idealmax && temp > limites.idealmin) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idEstufa);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'perigoso'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'crítico'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idEstufa, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_estufa_${idEstufa}`) != null) {
        document.getElementById(`temp_estufa_${idEstufa}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idEstufa}`)) {
        card = document.getElementById(`card_${idEstufa}`)
        card.className = classe_temperatura;
    }
}

function exibirAlerta(temp, idEstufa, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idEstufa == idEstufa);

    if (indice >= 0) {
        alertas[indice] = { idEstufa, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idEstufa, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idEstufa) {
    alertas = alertas.filter(item => item.idEstufa != idEstufa);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML = transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({idEstufa, temp, grauDeAviso, grauDeAvisoCor}) {
    // var teste = document.getElementById(`teste${idEstufa}`);
    // teste.style.backgroundColor = "blue";

    var nomeEstufa = sessionStorage.NOME_ESTUFA;
    // var descricao = JSON.parse(sessionStorage.ID_ESTUFA).find(item => item.idEstufa == idEstufa).descricao;
    
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${nomeEstufa.toUpperCase()} está em estado ${grauDeAviso} de temperatura!</h3>
            <small>Temperatura capturada: ${temp}°C.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}



//UMIDADE ABAIXO ------------------------------------

var alertasUmi = [];

function alertar2(resposta, idEstufa) {
    var umid = resposta[0].umidade;

    var grauDeAviso = '';
    var grauDeAvisoCor = '';

    //umidade
    var limitesUmi = {
        muito_quente: 91,
        quente: 90,
        idealmax: 80,
        idealmin: 61,
        frio: 60,
        muito_frio: 40
    };

    var classe_umidade = 'cor-alerta';

    if (umid >= limitesUmi.muito_quente) {
        classe_umidade = 'cor-alerta perigo-quente';
        grauDeAviso = 'crítico'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlertaUmi(umid, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid < limitesUmi.muito_quente && umid >= limitesUmi.quente) {
        classe_umidade = 'cor-alerta alerta-quente';
        grauDeAviso = 'perigoso'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlertaUmi(umid, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid < limitesUmi.idealmax && umid > limitesUmi.idealmin) {
        classe_umidade = 'cor-alerta ideal';
        removerAlertaUmi(idEstufa);
    }
    else if (umid <= limitesUmi.frio && umid > limitesUmi.muito_frio) {
        classe_umidade = 'cor-alerta alerta-frio';
        grauDeAviso = 'perigoso'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlertaUmi(umid, idEstufa, grauDeAviso, grauDeAvisoCor)
    }
    else if (umid <= limitesUmi.muito_frio) {
        classe_umidade = 'cor-alerta perigo-frio';
        grauDeAviso = 'crítico'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlertaUmi(umid, idEstufa, grauDeAviso, grauDeAvisoCor)
    }

    var cardumi;

    // if (document.getElementById(`temp_estufa_${idEstufa}`) != null) {
    //     document.getElementById(`temp_estufa_${idEstufa}`).innerHTML = temp + "°C";
    // }

    if (document.getElementById(`card_umi_${idEstufa}`)) {
        cardumi = document.getElementById(`card_umi_${idEstufa}`)
        cardumi.className = classe_umidade;
    }
}




function exibirAlertaUmi(umid, idEstufa, grauDeAviso, grauDeAvisoCor) {
    var indiceUmi = alertasUmi.findIndex(item => item.idEstufa == idEstufa);

    if (indiceUmi >= 0) {
        alertasUmi[indiceUmi] = { idEstufa, umid, grauDeAviso, grauDeAvisoCor }
    } else {
        alertasUmi.push({ idEstufa, umid, grauDeAviso, grauDeAvisoCor });
    }

    exibirCardsUmi();
}

function removerAlertaUmi(idEstufa) {
    alertasUmi = alertasUmi.filter(item => item.idEstufa != idEstufa);
    exibirCardsUmi();
}


function exibirCardsUmi() {
    var alertaUmi = document.getElementById('alertaUmi');
    alertaUmi.innerHTML = '';

    for (var i = 0; i < alertasUmi.length; i++) {
        var mensagem = alertasUmi[i];
        alertaUmi.innerHTML = transformarEmDivUmi(mensagem);
    }
}

function transformarEmDivUmi({idEstufa, umid, grauDeAviso, grauDeAvisoCor}) {

    var nomeEstufa = sessionStorage.NOME_ESTUFA;
    // var descricao = JSON.parse(sessionStorage.ID_ESTUFA).find(item => item.idEstufa == idEstufa).descricao;
    
    return `
    <div class="mensagem-alarmeumi">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${nomeEstufa.toUpperCase()} está em estado ${grauDeAviso} de umidade! </h3>
            <small>Umidade capturada: ${umid}%.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}

function atualizacaoPeriodica() {
    JSON.parse(sessionStorage.ID_ESTUFA).forEach(item => {
        obterdados(item.idEstufa)
    });
    setTimeout(atualizacaoPeriodica, 2000);
}

