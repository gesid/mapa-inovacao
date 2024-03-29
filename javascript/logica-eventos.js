//Variaveis e Constantes
let selectedFile;
const database = firebase.database();
const storage = firebase.storage();

let diaEvento;
let horaEvento;
let opcaoBusca = "Nome";
let usuarioAtual;
let nome = [];

//Objetos DAO
eventodao = new eventoDAO();

//MAIN

//***********CÓDIGO LOGIN FIM****************//

document.getElementById("barraBusca").value = "";
filtroBusca();
//criarCartoesEventos();

//FUNÇÕES DA PAGINA

function passarEventoKey(datakey) {
  console.table(datakey);
  localStorage.setItem("eventoMarker", datakey.getAttribute("data-key"));
}

function escolhaBusca(escolha) {
  opcaoBusca = escolha.getAttribute("data-tipo");
  document
    .getElementById("barraBusca")
    .setAttribute(
      "placeholder",
     `Tipo de Busca: by ${escolha.getAttribute("data-texto")}`
    );
}


function filtroBusca() {
  $(".card-remove").remove();

  let valBarra = document.getElementById("barraBusca").value;

  if (valBarra != "") {
    $("#eventoNaoEncontrado").attr("style", "display: none;");

    eventodao.buscarPorNome(opcaoBusca, valBarra).then(function (evento) {
      if (evento.length == 0) {
        //Mostar o aviso que não há eventos
        $("#eventoNaoEncontrado").attr("style", "display: grid;");
        document.getElementById("textoEventoNaoEncontrado").innerHTML =
          "Não há eventos agendados com este nome.";
      }

      evento.forEach(criarCartoesEventos);
    });
  } else {
    $("#eventoNaoEncontrado").attr("style", "display: none;");

    eventodao.varredura().then(function (evento) {
      if (evento.length == 0) {
        //Mostar o aviso que não há eventos
        $("#eventoNaoEncontrado").attr("style", "display: grid;");
        document.getElementById("textoEventoNaoEncontrado").innerHTML =
          "Não há eventos agendados.";
      }

      evento.forEach(criarCartoesEventos);
    });
  }
}

function criarCartoesEventos(evento) {
  let template = document.querySelector("#teplate-eventos");
  let listaEventos = document.querySelector("#lista-eventos");
  let img = template.content.querySelectorAll("#img-evento");
  let titulo = template.content.querySelector("h5");
  let descricao = template.content.querySelector("#descricao-evento");
  let datahorario = template.content.querySelector("#data-horario-evento");
  let endereco = template.content.querySelector("#endereco-evento");
  let btn = template.content.querySelectorAll("a");
  let btn_text = template.content.querySelectorAll("a > p");

  let imgLink = document.createElement("imgLink");
  imgLink.src = evento.getURL();

  img[0].setAttribute("src", evento.getURL());
  titulo.textContent = evento.getNome();
  descricao.textContent = evento.getDescricao();
  datahorario.textContent = `${evento.getDia()} - ${evento.getHora()}`;

  let textoComplemento = "";
  if (evento.getComplemento() !== "") {
    textoComplemento = `${evento.getComplemento()},`;
  }

  endereco.textContent = `${evento.getLogradouro()}, ${evento.getNumero()}, ${textoComplemento} ${evento.getBairro()},  ${evento.getCidade()}, ${evento.getUF()}, ${evento.getCEP()}`;
  
  /**tradução textos */
  btn_text[0].textContent = i18next.t("events.sectionEvents.botaoVerNoMapa");
  btn_text[1].textContent = i18next.t("events.sectionEvents.botaoSiteDoEvento");
  
  btn[0].setAttribute("data-key", evento.getMarkerKey());
  
  btn[1].setAttribute("href", "https://" + evento.getSite());

  listaEventos.appendChild(document.importNode(template.content, true));
}


/**Tradução */
i18next.on('languageChanged', function(lng) {
  traducaoDoPlaceHolderBarraBuscaMobile();
})

function traducaoDoPlaceHolderBarraBuscaMobile() {
  let placeholderchange =  document.getElementsByName("barraBuscaMobile")[0]
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("events.sectionEvents.barraDeBusca")
   }
 }
 

/*function telaUsuario(componente) {
  let status = $("#log").attr("data-status");
  if (status === "logado") {

    window.location = "usuario.html?" + componente.getAttribute("data-key")
  }
  else {
    window.location.href = "login.html"
  }
}*/
