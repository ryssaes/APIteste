var url = "https://dadosabertos.camara.leg.br/api/v2/deputados?siglaUf=CE&ordem=ASC&ordenarPor=nome"

$.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
})
.done(function(response)
{
    const dado = response.dados
    dado.forEach(element => {
        let dep = document.getElementById('deputados')
        let div_content = "";
        div_content = dep.innerHTML;
        let html = `<img src="${element.urlFoto}">
        <span class="nome">${element.nome}</span><span class="partido">${element.siglaPartido}</span>`;
        dep.innerHTML = div_content+html;

    });
})
.fail(function(error){
    console.log(error)
})