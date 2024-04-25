function criar(){
    var nomeEmp = inputNomeEmp.value;
    var nomeFant = inputNomeFant.value;
    var emailEmp = inputEmailEmp.value;
    var senhaEmp = inputSenha.value;

    if(nomeEmp.lenght <= 1){
        alert('inválido');
    } else if(nomeFant.lenght <= 1){
        alert('inválido');
    } else if(senhaEmp.lenght < 8){
        alert('inválido')
    }
}