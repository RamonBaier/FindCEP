$("#busca-cep").on("click", () => {
    const cep = $("#cep").val().trim();

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((cep) => {
            console.log("o cep aqui", cep);

            delete cep.unidade;
            delete cep.complemento;
            delete cep.ibge;
            delete cep.gia;
            delete cep.siafi;
            delete cep.ddd;

            let lista = `<ul class="collection custom-collection cep">`;
            
            for (let prop in cep) {
                lista += `<li class="collection-item"><strong>${prop.toUpperCase()}:</strong> ${cep[prop]}</li>`;
            }
            
            
            $("#lista-cep").html(lista);
        })
        .catch((error) => console.error("Erro na requisição:", error));
});

$("#busca-rua").on("click", () => {
    const uf = $("#uf").val();
    const street = $("#street").val().trim();
    const city = $("#city").val().trim();

    fetch(`https://viacep.com.br/ws/${uf}/${city}/${street}/json/`)
        .then((res) => res.json())
        .then((ruas) => {
            let lista = "";

            for (let rua of ruas) {
                delete rua.unidade;
                delete rua.complemento;
                delete rua.ibge;
                delete rua.gia;
                delete rua.siafi;
                delete rua.ddd;

                lista += `<ul class="collection custom-collection">
                    <li class="collection-item"><strong>Estado:</strong> ${rua.uf}</li>
                    <li class="collection-item"><strong>Cidade:</strong> ${rua.localidade}</li>
                    <li class="collection-item"><strong>Bairro:</strong> ${rua.bairro}</li>
                    <li class="collection-item"><strong>Rua:</strong> ${rua.logradouro}</li>
                    <li class="collection-item"><strong>CEP:</strong> ${rua.cep}</li>
                    </ul> <div class="custom-footer">...</div>`;
            }

            $("#lista-ruas").html(lista);
        })
        .catch((error) => console.error("Erro na requisição:", error));
});


$(document).ready(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
        .then((res) => res.json())
        .then((ufs) => {
            let listaUf = `<option value="" disabled selected>Selecione um estado</option>`;

            for (let uf of ufs) {
                listaUf += `<option value="${uf.sigla}">${uf.nome}</option>`;
            }

            $("#uf").html(listaUf);
        })
        .catch((error) => console.error("Erro ao carregar estados:", error));
});

function listarCidade(e) {
    let uf = e.target.value; // identifica o clique do usuario e o referencia sendo alocado dinamicamente 

    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
        .then((res) => res.json())
        .then((cidades) => {
            let listaCidade = `<option value="" disabled selected>Selecione uma cidade</option>`;

            for (let cidade of cidades) {
                listaCidade += `<option value="${cidade.nome}">${cidade.nome}</option>`;
            }

            $("#city").html(listaCidade);
        })
        .catch((error) => console.error("Erro ao carregar cidades:", error));
}

document.addEventListener('DOMContentLoaded', function () {
    // Inicializa a sidenav
    var elems = document.querySelectorAll('#team-Info');
    var instances = M.Sidenav.init(elems);

    // Seleciona o link do logo
    var logoLink = document.getElementById('logo-container');

    // Quando o logo for clicado, abre a sidenav
    logoLink.addEventListener('click', function (e) {
        e.preventDefault(); // Impede o comportamento padrão de navegação
        var sidenav = M.Sidenav.getInstance(document.querySelector('.sidenav'));
        sidenav.open(); // Abre a sidenav
    });
});