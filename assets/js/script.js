$(document).ready(function () {
    apiBase();
});

var dep;
var detalhe;


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
        console.log(dep)
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
        let getid = $(this).attr('data-id');
        let url = 'https://dadosabertos.camara.leg.br/api/v2/deputados/' + getid
        console.log(url)
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (response) {
                let dado = response.dados
                detalhe = dado;
                createperfil();
            })
    })
}


function createperfil(){
    let div = document.getElementById('perfil-box');
    let div_container = ''
    div_container = div.innerHTML
    let html = `<div class="box-perfil">
    <span class="email">Email:${detalhe.email = 'undefined' ? 'Não preenchido' : detalhe.email}</span>
    <span class="data">Data:${detalhe.data = 'undefined' ? 'Não preenchido' : detalhe.data}</span>
    <span class="escolaridade">Escolaridade:${detalhe.escolaridade = 'undefined' ? 'Não preenchido' : detalhe.escolaridade}</span>
    <span class="cpf">CPF:${detalhe.cpf = 'undefined' ? 'Não preenchido' : detalhe.cpf}</span></div>`
    div.innerHTML = div_container + html
}