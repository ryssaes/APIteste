$(document).ready(function () {
    apiBase();
});

var dep;
var detalhe;
var despesas;
var profissao;


function apiBase() {
    let url = 'https://dadosabertos.camara.leg.br/api/v2/deputados?ordem=ASC&ordenarPor=nome';
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
    })

        .done(function (response) {
            let dado = response.dados
            let filtrados = filterCountry(dado)
            dep = filtrados
            createDeputados();
        })
}


function filterCountry(e) {
    let fil = e.filter(function (e) {
        return e.siglaUf == "CE"
    })

    return fil
}


function createDeputados() {
    let div = document.getElementById('deputados-box')
    dep.forEach(element => {
        let div_container = ''
        div_container = div.innerHTML
        let html = `<div class="box-dep" data-id="${element.id}">
        <figure>
        <img src="${element.urlFoto}" alt="imagem do candidato">
        </figure>
        <span class="nome">${element.nome}</span>
        <span class="partido">${element.siglaPartido}</span>
        </div>`
        div.innerHTML = div_container + html
        getperfil();
    });
}


function getperfil() {
    $('.box-dep').click(function () {
        $('.overlay').css('height','4000px');
        let getid = $(this).attr('data-id');
        let url = 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + getid
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (response) {
                let dado = response.dados
                detalhe = dado;
                createperfil();
                closeBox();
                // getDespesas();
                // createDespesas();
            })
    })
}


function createperfil() {
    let div = document.getElementById('perfil-box');
    div.innerHTML = '';
    let div_container = ''

    let regxcpf = /(\d{3})(\d{3})(\d{3})(\d{2})/;
    let cpf = detalhe.cpf
    let tratarcpf = cpf.match(regxcpf)
    let cpftratado = tratarcpf[1] + '.' + tratarcpf[2] + '.' + tratarcpf[3] + '-' + tratarcpf[4];
    // regx para cpf

    let regx = /[^a-zA-Z0-9]/g; //Regx Remover Espaçoes
    let regdata = /(\d{4})(\d{2})(\d{2})/;
    let datanascimento = detalhe.dataNascimento;
    let tratardatanascimento = datanascimento.replace(regx, "");
    let secondatanascimento = tratardatanascimento.match(regdata);
    let datamontada = secondatanascimento[3] + '/' + secondatanascimento[2] + '/' + secondatanascimento[1];
    // regex para data de nascimento


    div_container = div.innerHTML
    let html = `<div class="box-perfil">
    <span class="btn-close" id="btn-close"></span>
    <figure>
    <img src="${detalhe.ultimoStatus.urlFoto}"></figure>
    <span>${detalhe.nomeCivil}</span>
    <span class="email">Email:${detalhe.email = 'undefined' ? 'Não preenchido' : detalhe.email}</span>
    <span class="data">Data:${detalhe.data = 'undefined' ? 'Não preenchido' : detalhe.data}</span>
    <span class="escolaridade">Escolaridade:${detalhe.escolaridade}</span>
    <span class="cpf">CPF:${cpftratado}</span>
    <span>Data de nascimento: ${datamontada}</span></div>`
    div.innerHTML = div_container + html
}

// function getDespesas() {
//     $('.box-dep').click(function () {
//         let getid = $(this).attr('data-id')
//         let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${getid}/despesas?itens=10&ordem=ASC&ordenarPor=ano`

//         $.ajax({
//             url: url,
//             type: 'GET',
//             dataType: 'json'
//         })
//             .done(function (response) {
//                 let dado = response.dados
//                 despesas = dado;
//             })
//     })
// }

// function createDespesas() {
//     let div = document.getElementById('despesas')
//     let div_container = ''
//     let regx = /[^a-zA-Z0-9]/g; //Regx Remover Espaçoes
//     let regdata = /(\d{4})(\d{2})(\d{2})/;

//     despesas.forEach(function (index) {
//         let datanascimento = index.dataDocumento;
//         let tratardatanascimento = datanascimento.replace(regx, "");
//         let secondatanascimento = tratardatanascimento.match(regdata);
//         let datamontada = secondatanascimento[3] + '/' + secondatanascimento[2] + '/' + secondatanascimento[1];
//         div_container = div.innerHTML
//         let html = `<div class="box-despesas">
//         <h3 class="valor">${index.valorDocumento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<h3>
//         <p class="tipo-despesas">${index.tipoDespesa}</p>
//         <span class="data-despesa">${datamontada}</span>
//         </div>`
//         div.innerHTML = div_container + html
//     })
// }

function getProfissao(){
    $('.box-dep').click(function(){
        let getid = $(this).attr('data-id')
        let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${getid}/profissoes`

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (response) {
                let dado = response.dados
                profissao = dado;
                console.log(profissao)
            })
    })
}

function closeBox() {
    $('#btn-close').click(function () {
        $('.box-perfil').remove();
        $('.box-despesas').remove();
        $('.title-section').remove();
        $('.overlay').css('height','0px');
    })
}
