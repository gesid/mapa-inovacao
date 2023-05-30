//Variaveis e Constantes
let uploader1SelectedFile = "";
let uploader2SelectedFile = "";
let lat;
let lng;
let cont = 0;
let contAux = 0;
let auxUser;
let marker;
let url;
let diaEvento;
let horaEvento;
let permissao = true;
let marcador = [];
let ecossistema = [];
let entidadeArray;
let usuarioArray;
let arrayteste = [];
let markersLayer = new L.LayerGroup();
let escolhaLayer = new L.LayerGroup();
const database = firebase.database();
const storage = firebase.storage();

//Criando o DAO
let entidadedao = new entidadeDAO();
let eventodao = new eventoDAO();
let comunidadedao = new comunidadeDAO();

let markerIcon = L.Icon.extend({
  options: {
    shadowUrl: "img/img-marker/marker-shadow.png",
    iconSize: [27, 40], // size of the icon
    shadowSize: [41, 41], // size of the shadow
    iconAnchor: [13, 39], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 39], // the same for the shadow
    popupAnchor: [0, -40], // point from which the popup should open relative to the iconAnchor
  },
});

let ceara = new Ceara();
marcarLimites();

function marcarLimites() {
  var Style = {
    color: ceara.getCor(),
    weight: 3,
    opacity: 0.65,
    fillOpacity: 0.0,
  };

  let area = ceara.getCoordenadas();

  let layer = L.geoJSON(area, { style: Style });

  map.addLayer(layer);
}

//Main

L.icon = function (options) {
  return new L.Icon(options);
};

ecossistema.push(new Aceleradora());
//ecossistema.push(new Advogados())
ecossistema.push(new Catalisadores());
ecossistema.push(new Comunicacao());
//ecossistema.push(new Conexao())
//ecossistema.push(new Conteudo())
ecossistema.push(new Coworking());
//ecossistema.push(new Creditos())
//ecossistema.push(new Editais())
ecossistema.push(new Escolas());
ecossistema.push(new Makers());
ecossistema.push(new Eventos());
ecossistema.push(new FabricaApp());
ecossistema.push(new Governo());
ecossistema.push(new Empresas());
ecossistema.push(new Incubadoras());
ecossistema.push(new iniUniversitarias());
ecossistema.push(new Investidores());
//ecossistema.push(new Missoes())
ecossistema.push(new Nucleo());
ecossistema.push(new Parques());
ecossistema.push(new preAceleradoras());
ecossistema.push(new propIntelectual());
//ecossistema.push(new Provedores())
ecossistema.push(new Mentoria());
ecossistema.push(new Startups());
ecossistema.push(new CategoriaPatente());

OpcaoComunidade();
//OpcaoComunidadeMobile()

entidadedao.varredura().then(function (entidade) {
  entidadeArray = entidade;

  exibirMarcadores(ecossistema, entidadeArray);
  ecossistema.forEach(criarListaOpcoes);

  const patenteDAO = new PatenteDAO();

  patenteDAO.listarTodasPatentes().then((patentes) => {
    const contadorPatentes = document.querySelector(".contador-patentes");
    contadorPatentes.innerHTML = patentes.length;
  });
});

//Fim Main-------------------------------------------------------------

function reload() {
  window.location.reload();
}

function OpcaoComunidade() {
  comunidadedao.varredura().then(function (comunidades) {
    criarOpcaoComunidade(comunidades);
    criarOpcaoComunidadeMobile(comunidades);
  });
}

function criarOpcaoComunidade(comunidades) {
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipo");
  let listaOpcoes = document.querySelector("#listaOpcoes");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()
  
  //a.setAttribute("data-i18n", "barraLateral.comunidades");
  a.innerHTML = `<img style="height:36px; width:36px" src= "img/img-bl/27-comunidade.png">
  Comunidades
  <span class="badge badge-secondary badge-pill">${comunidades.length}</span>`;

  a.setAttribute("data-tipo", "Comunidades");
  listaOpcoes.appendChild(document.importNode(template.content, true));
}

function criarListaOpcoes(tipoClasse) {
  // Cria lista da bara lateral
  let template = document.querySelector("#listaTipo");
  let listaOpcoes = document.querySelector("#listaOpcoes");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");

  imgLink.src = tipoClasse.getImagemBarra();

  a.innerHTML = `<img style="height:36px; width:36px" src= ${imgLink.src}>
  ${tipoClasse.getNome()}
  <span class="badge badge-secondary badge-pill ${
    tipoClasse.getNome() === "Patente" ? "contador-patentes" : ""
  }">${tipoClasse.getBadge()}</span>`;

  a.setAttribute("data-tipo", tipoClasse.getNome());
  
  if (tipoClasse.getNome() != "Eventos") {
    listaOpcoes.appendChild(document.importNode(template.content, true));
  }
  executarEventoKey();

  criarListaOpcoesMobile(tipoClasse);
}

function filtroSelect(componente) {
  $(".template-cartao").remove();

  const textoBuscado = document.getElementById("contBusca").value;
  const tipoListagem = componente.getAttribute("data-tipo");

  if (tipoListagem === "Comunidades") {
    filtroBuscaComunidade(tipoListagem);
    return;
  }

  if (tipoListagem === "Patente") {
    mostrarPatentesListaOculta(textoBuscado);
    return;
  }

  filtroBusca(tipoListagem);
}
//Criando a barra lateral
async function chamaBarraOculta(componente) {
  const tipoSelecionado = componente.getAttribute("data-tipo");
  const listaOculta = document.getElementById("cartao");
  listaOculta.innerHTML = gerarTemplateCard();

  //Abre a barra de cartões
  if (permissao === true) {
    permissao = false;

    //$(".card").remove();
    $(".template-cartao").remove();
    $("#janela_oculta").attr("style", "display: all;");

    document.getElementById("contBusca").value = ""; //Zera o valor da barra de busca
    document
      .getElementById("botaoBusca")
      .setAttribute("data-tipo", tipoSelecionado); // Atribui a tipo da opção selecionada ao botão de busca

    if (tipoSelecionado === "Comunidades") {
      filtroBuscaComunidade(tipoSelecionado);
      return;
    }

    if (tipoSelecionado === "Patente") {
      await mostrarPatentesListaOculta();
    }

    filtroBusca(tipoSelecionado); //exibe os cartões do tipo de opção selecionada
  }
}

function gerarTemplateCard() {
  return `<template id="cartaoEmpresa">

  <div id="divImagemCartao" class="template-cartao">
    <div id="div-card-superior" class="d-flex justify-content-center">

      <div id="div-superior-imagem">
        <img id="img-card-prop" src="img/image.jpg" alt="">
      </div>

      <div id="div-superior-conteudo">
        <div id="div-conteudo-titulo">
          <p id="txt-titulo-card">NOME</p>
        </div>

        <div id="div-conteudo-descricao">
          <p id="txt-descricao-card">DESCRIÇÃO</p>
        </div>
      </div>

    </div>

    <div id="div-card-inferior">

      <div id="div-inferior-btns" class="d-flex align-items-end texto-btn-evento1">
        <a id="btn-card1" class="d-flex align-items-center justify-content-center texto-btn-card1"
          href="javascript:void(0)">
          -
        </a>

        <a id="btn-card2" class="d-flex align-items-center justify-content-center texto-btn-card2"
          href="index.html" target="_blank">
          -
        </a>
      </div>

      <div id="div-inferior-txt" class="d-flex">
        <p id="txt-marcadopor">Marcado por:</p>
        <a id="txt-marcadopor-nome">Sicrano</a>
      </div>

    </div>
  </div>
</template>`;
}

async function mostrarPatentesListaOculta(filtroBuscaNome = "") {
  // Função implementada no arquivo relacionado à barra oculta de patentes
  await gerarListaPatentesOculta(filtroBuscaNome);
}

function filtroBusca(tipo) {
  let aux2 = false;
  let valBarra = document.getElementById("contBusca").value;

  if (valBarra != "") {
    entidadedao.buscarPorNome(valBarra).then(function (entidade) {
      verificarUsuarioEntidade(entidade);
    });
  } else {
    for (let i = 0; i < entidadeArray.length; i++) {
      if (tipo === entidadeArray[i].getTipo()) {
        aux2 = true;
        verificarUsuarioEntidade(entidadeArray[i]);
      }
    }
  }
  if (!aux2) {
    permissao = true;
  }
}

function verificarUsuarioEntidade(entidade) {
  usuariodao.buscar(entidade.getUserId()).then(function (usuario) {
    cartaoEntidade(entidade, usuario.getNome());
  });
}

function cartaoEntidade(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresa");
  let cartao = document.querySelector("#cartao");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let btn1 = template.content.querySelector("#btn-card1");
  let btn2 = template.content.querySelector("#btn-card2");
  let imgCartao = document.createElement("imgCartao");

  imgCartao.src = entidade.getURL();
  img.setAttribute("src", imgCartao.src);

  titulo.textContent = entidade.getNome();

  descricao.textContent = `${entidade.getLogradouro()}, 
  ${entidade.getNumero()}, 
  ${entidade.getComplemento()}, 
  ${entidade.getBairro()}, 
  ${entidade.getCidade()}, 
  ${entidade.getUF()}, 
  ${entidade.getCEP()}`;

  btn1.innerHTML = "Localização";

  if (entidade.tipo === "Patente") {
    btn2.classList.add("btn-oculto");
  } else {
    btn2.innerHTML = "Visitar Site";
    btn2.setAttribute("href", entidade.getSite());
  }

  btn1.setAttribute("data-key", entidade.getMarkerKey());
  btn1.setAttribute("onclick", "zoomMarcador(this)");

  criador.textContent = nomeUser;
  criador.setAttribute("href", "javascript:void(0)");
  criador.setAttribute("data-key", entidade.getUserId());
  criador.setAttribute("onclick", "telaUsuario(this)");

  cartao.appendChild(document.importNode(template.content, true));
  permissao = true;
}

function filtroBuscaComunidade(tipo) {
  let valBarra = document.getElementById("contBusca").value; //Verificar se há algo na barra de busca

  if (valBarra != "") {
    comunidadedao.buscarPorNome(valBarra).then(function (comunidade) {
      verificarUsuarioComunidade(comunidade);
    });
  } else {
    comunidadedao.varredura().then(function (comunidade) {
      comunidade.forEach(verificarUsuarioComunidade);
    });
  }
}

function verificarUsuarioComunidade(comunidade) {
  usuariodao.buscar(comunidade.getUserId()).then(function (usuario) {
    cartaoComunidade(comunidade, usuario.getNome());
  });
}

function cartaoComunidade(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresa");
  let cartao = document.querySelector("#cartao");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let btn1 = template.content.querySelector("#btn-card1");
  let btn2 = template.content.querySelector("#btn-card2");

  let imgCartao = document.createElement("imgCartao");
  imgCartao.src = entidade.getURL();

  img.setAttribute("src", imgCartao.src);

  titulo.textContent = entidade.getNome();
  descricao.textContent = `${entidade.getDescricao()}`;

  btn2.setAttribute("href", entidade.getSite());
  btn1.setAttribute("data-key", entidade.getMarkerKey());
  btn1.setAttribute("name", entidade.getMarkerKey());
  btn1.setAttribute("onclick", "exibirComunidade(this)");

  btn1.innerHTML = "Ativar no mapa";
  btn2.innerHTML = "Visitar site";

  criador.textContent = nomeUser;
  criador.setAttribute("href", "javascript:void(0)");
  criador.setAttribute("data-key", entidade.getUserId());
  criador.setAttribute("onclick", "telaUsuario(this)");

  /*
  p[1].innerHTML = `<small class="font-weight-bold" href="">Marcado por: </small>
  <small><a class="ml-1" href="javascript:void(0)" data-key="${entidade.getUserId()}" onclick="telaUsuario(this)">${nomeUser}</a></small>`
  */

  cartao.appendChild(document.importNode(template.content, true));
  permissao = true;
}

function executarEventoKey() {
  //Reconhece o evento que foi clicado na página de eventos e da um zoom no marcador
  if (localStorage.getItem("eventoMarker")) {
    let data = localStorage.getItem("eventoMarker");
    map.flyTo(marcador[data].getLatLng(), 19);
    marcador[data].openPopup();
    //Colocar o valor no input, ou seja lá o que quer fazer
    localStorage.removeItem("eventoMarker");
  }
}

function executarShareEvent() {
  //é Ativado quando a página inicia
  const key = window.location.search.slice(7);

  //window.history.pushState("object or string", "Title", "/new-url");

  if (key !== "") {
    map.flyTo(marcador[key].getLatLng(), 19);
    marcador[key].openPopup();
  }
}

//Modal Mobile-----------------------------------------------------------------------------------------

function OpcaoComunidadeMobile() {
  comunidadedao.varredura().then(function (comunidades) {
    criarOpcaoComunidadeMobile(comunidades);
  });
}

function criarOpcaoComunidadeMobile(comunidades) {
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipoMobile");
  let listaOpcoes = document.querySelector("#listaOpcoesMobile");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()

  a.innerHTML = `<div style="width:inherit" class="d-flex justify-content-between align-items-center">
  <img style="height:36px; width:36px" src= "img/img-bl/27-comunidade.png">
  Comunidades
  <span class="badge badge-secondary badge-pill">${comunidades.length}</span>
  </div>
  <i style="padding-left:50px" class="fas fa-angle-right"></i>`;

  a.setAttribute("data-tipo", "Comunidades");
  listaOpcoes.appendChild(document.importNode(template.content, true));
}

function criarListaOpcoesMobile(tipoClasse) {
  // Cria lista da bara lateral
  let template = document.querySelector("#listaTipoMobile");
  let listaOpcoes = document.querySelector("#listaOpcoesMobile");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");

  imgLink.src = tipoClasse.getImagemBarra();

  a.innerHTML = `<div style="width:inherit" class="d-flex justify-content-between align-items-center">
  <img style="height:36px; width:36px" src= ${imgLink.src}>
  ${tipoClasse.getNome()}
  <span class="badge badge-secondary badge-pill">${tipoClasse.getBadge()}</span>
  </div> 
  <i style="padding-left:50px" class="fas fa-angle-right"></i>`;

  a.setAttribute("data-tipo", tipoClasse.getNome());

  if (tipoClasse.getNome() != "Eventos") {
    listaOpcoes.appendChild(document.importNode(template.content, true));
  }

  executarEventoKey();

  executarShareEvent();
}

//Criando modal de cartões mobile
function chamarModalCard(componente) {
  //Abre o modal de cartões

  contAux = 0;
  while (contAux <= ecossistema.length) {
    if ("Comunidades" == componente.getAttribute("data-tipo")) {
      document
        .getElementById("img-categoria")
        .setAttribute("src", "img/img-bl/27-comunidade.png");
      document.getElementById("nome-categoria").innerHTML = "Comunidades";
      break;
    }

    if (
      ecossistema[contAux].getNome() == componente.getAttribute("data-tipo")
    ) {
      document
        .getElementById("img-categoria")
        .setAttribute("src", ecossistema[contAux].getImagemBarra());
      document.getElementById("nome-categoria").innerHTML =
        ecossistema[contAux].getNome();
      break;
    }
    contAux = contAux + 1;
  }

  $(".template-cartao").remove();

  if (componente.getAttribute("data-tipo") != "Comunidades") {
    filtroBuscaMobile(componente.getAttribute("data-tipo")); //exibe os cartões do tipo de opção selecionada
  } else {
    filtroBuscaComunidadeMobile(componente.getAttribute("data-tipo"));
  }
}
//Cartões de entidades Mobile
function filtroBuscaMobile(tipo) {
  for (let i = 0; i < entidadeArray.length; i++) {
    if (tipo === entidadeArray[i].getTipo()) {
      aux2 = true;
      verificarUsuarioEntidadeMobile(entidadeArray[i]);
    }
  }
}

function verificarUsuarioEntidadeMobile(entidade) {
  usuariodao.buscar(entidade.getUserId()).then(function (usuario) {
    cartaoEntidadeMobile(entidade, usuario.getNome());
  });
}

function cartaoEntidadeMobile(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresaMobile");
  let cartao = document.querySelector("#cartaoMobile");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let btn1 = template.content.querySelector("#btn-card1");
  let btn2 = template.content.querySelector("#btn-card2");
  let imgCartao = document.createElement("imgCartao");

  imgCartao.src = entidade.getURL();
  img.setAttribute("src", imgCartao.src);

  titulo.textContent = entidade.getNome();

  descricao.textContent = `${entidade.getLogradouro()}, 
  ${entidade.getNumero()}, 
  ${entidade.getComplemento()}, 
  ${entidade.getBairro()}, 
  ${entidade.getCidade()}, 
  ${entidade.getUF()}, 
  ${entidade.getCEP()}`;

  btn1.innerHTML = "Localização";
  btn2.innerHTML = "Visitar Site";

  btn2.setAttribute("href", entidade.getSite());
  btn1.setAttribute("data-key", entidade.getMarkerKey());
  btn1.setAttribute("onclick", "zoomMarcador(this)");
  btn1.setAttribute("data-dismiss", "modal");

  criador.textContent = nomeUser;
  criador.setAttribute("href", "javascript:void(0)");
  criador.setAttribute("data-key", entidade.getUserId());
  criador.setAttribute("onclick", "telaUsuario(this)");

  cartao.appendChild(document.importNode(template.content, true));
  permissao = true;
}

//Cartões de comunidade Mobile
function filtroBuscaComunidadeMobile(tipo) {
  comunidadedao.varredura().then(function (comunidade) {
    comunidade.forEach(verificarUsuarioComunidadeMobile);
  });
}

function verificarUsuarioComunidadeMobile(comunidade) {
  usuariodao.buscar(comunidade.getUserId()).then(function (usuario) {
    cartaoComunidadeMobile(comunidade, usuario.getNome());
  });
}

function cartaoComunidadeMobile(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresaMobile");
  let cartao = document.querySelector("#cartaoMobile");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let btn1 = template.content.querySelector("#btn-card1");
  let btn2 = template.content.querySelector("#btn-card2");

  let imgCartao = document.createElement("imgCartao");
  imgCartao.src = entidade.getURL();

  img.setAttribute("src", imgCartao.src);

  titulo.textContent = entidade.getNome();
  descricao.textContent = `${entidade.getDescricao()}`;

  btn2.setAttribute("href", entidade.getSite());
  btn1.setAttribute("data-key", entidade.getMarkerKey());
  btn1.setAttribute("name", entidade.getMarkerKey());
  btn1.setAttribute("onclick", "exibirComunidade(this)");
  btn1.setAttribute("data-dismiss", "");

  if (map.hasLayer(layerArray[entidade.getMarkerKey()])) {
    btn1.innerHTML = "Desativar do mapa";
    btn1.setAttribute("Style", "background: #CF5B15;");
  } else {
    btn1.innerHTML = "Ativar no mapa";
    btn1.setAttribute("Style", "background: #FC6A38;");
  }

  btn2.innerHTML = "Visitar site";

  criador.textContent = nomeUser;
  criador.setAttribute("href", "javascript:void(0)");
  criador.setAttribute("data-key", entidade.getUserId());
  criador.setAttribute("onclick", "telaUsuario(this)");

  /*
  p[1].innerHTML = `<small class="font-weight-bold" href="">Marcado por: </small>
  <small><a class="ml-1" href="javascript:void(0)" data-key="${entidade.getUserId()}" onclick="telaUsuario(this)">${nomeUser}</a></small>`
  */

  cartao.appendChild(document.importNode(template.content, true));
  permissao = true;
}

//Fim Modal Mobile-----------------------------------------------------------------------------------------------

function inicializarFiltragem() {
  document.getElementById("filtroStartup").value = 1;
}

//Funções do Sistema
function startupCheck() {
  if ($("#CheckboxStartup").prop("checked")) {
    $("#startupType").attr("style", "display: all;");
  } else {
    $("#startupType").attr("style", "display: none;");

    document.getElementById("filtroStartup").value = 1;
  }
}

function filtroMarcador() {
  let selecaoFiltro = [];
  markersLayer.clearLayers();

  if ($("#CheckboxAcelerador").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[0]);
  }
  if ($("#CheckboxAdvogados").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxCatalisadores").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[1]);
  }
  if ($("#CheckboxComunicacao").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[2]);
  }
  if ($("#CheckboxConexao").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxConteudo").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxCoworking").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[3]);
  }
  if ($("#CheckboxCreditos").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxEditais").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxEscolas").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[4]);
  }
  if ($("#CheckboxMakers").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[5]);
  }
  if ($("#CheckboxEventos").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[6]);
  }
  if ($("#CheckboxFabricaApp").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[7]);
  }
  if ($("#CheckboxGoverno").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[8]);
  }
  if ($("#CheckboxEmpresas").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[9]);
  }
  if ($("#CheckboxIncubadoras").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[10]);
  }
  if ($("#CheckboxiniUniversitarias").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[11]);
  }
  if ($("#CheckboxInvestidores").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[12]);
  }
  if ($("#CheckboxMissoes").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxNucleos").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[13]);
  }
  if ($("#CheckboxParques").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[14]);
  }
  if ($("#CheckboxpreAceleradoras").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[15]);
  }
  if ($("#CheckboxpropIntelectuais").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[16]);
  }
  if ($("#CheckboxProvedores").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[100]);
  }
  if ($("#CheckboxMentoria").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[17]);
  }
  if ($("#CheckboxStartup").prop("checked") == true) {
    selecaoFiltro.push(ecossistema[18]);
  }

  exibirMarcadores(selecaoFiltro, entidadeArray);
}

function entidadePertenceCategoria(categoria, entidade) {
  return categoria.getNome() === entidade.getTipo();
}

function entidadeEhStartup(entidade) {
  return entidade.getTipo() === "Startup";
}

function startupEhDaClassificacaoSelecionada(startup) {
  const filtroStartupSelecionado =
    document.getElementById("filtroStartup").value;

  return startup.getClassificacao() === filtroStartupSelecionado;
}

function exibirMarcadores(categorias, entidades) {
  //Função responsável para Marcar os pontos no mapa
  const filtroStartupSelecionado =
    document.getElementById("filtroStartup").value;

  categorias.forEach((categoria) => {
    entidades.forEach((entidade) => {
      const entidadeAtualPertenceCategoria = entidadePertenceCategoria(
        categoria,
        entidade
      );

      const classificacaoStartupValidada =
        (entidadeEhStartup(entidade) &&
          startupEhDaClassificacaoSelecionada(entidade)) ||
        filtroStartupSelecionado == 1 ||
        entidade.getClassificacao() == null;

      if (entidadeAtualPertenceCategoria && classificacaoStartupValidada) {
        categoria.setBadge(categoria.getBadge() + 1);

        let Icone = new markerIcon({
          iconUrl: categoria.getImagemMarcador(),
        });

        const coordenadasMarcador = [entidade.getLat(), entidade.getLng()];
        const configMarcador = {
          icon: Icone,
        };

        const elementoPopup = gerarElementoPopup(entidade);

        marcador[entidade.getMarkerKey()] = L.marker(
          coordenadasMarcador,
          configMarcador
        ).bindPopup(elementoPopup);

        markersLayer.addLayer(marcador[entidade.getMarkerKey()]);
        markersLayer.addTo(map);
      }
    });
  });
}

function gerarElementoPopup(entidade) {
  let imgPop = document.createElement("imgPop");
  imgPop.src = entidade.getURL();

  const btnVerPatentes =
    entidade.getTotalPatentes() > 0
      ? `<a class="btnProp popupBtnVerPatentes" style="color: white" data-key="${entidade.getMarkerKey()}" onclick="mostrarModalListagemPatentes(this)">Ver patentes</a>`
      : "";

  return `
  <div id="popupContainer">
    <img class="popupImg" src="${imgPop.src}"></img> 
    <p class="popupNome" style="margin: 0px"> ${entidade.getNome()} </p>
    <p class="popupTipo" style="margin: 0px"> ${entidade.getTipo()} </p>
    <div id=popupBtnContainer>
      <a class="btnProp popupBtnConheca" style="color: #FC6A38;" href=" ${entidade.getSite()}" target='_blank'>Visitar Site</a>
      <a class="btnProp popupBtnCompartilhar" style="color: white" data-key ="${entidade.getMarkerKey()}" onclick="criarURLCompartilhamento(this)" title="Compartilhar">Link da Localização</i></a>
      ${btnVerPatentes}
    </div>
  </div>`;
}

function criarURLCompartilhamento(componente) {
  //alert(componente.getAttribute("data-key"))
  let URL =
    location.href.split("?", 1) +
    "?share?" +
    componente.getAttribute("data-key");

  let inputURL = document.getElementById("inputCompartilhamento");
  inputURL.value = URL;

  $("#modalCompartilhamento").modal("show");

  document
    .getElementById("btnInputCompartilhamento")
    .addEventListener("click", function () {
      Copiar();
    });

  function Copiar() {
    let inputURL = document.getElementById("inputCompartilhamento");
    inputURL.select();
    document.execCommand("copy");
  }
}

function zoomMarcador(componente) {
  let key = componente.getAttribute("data-key");
  map.flyTo(marcador[key].getLatLng(), 19);
  marcador[key].openPopup();
}

function gravarFormulario() {
  const tabLocais = document.getElementById("local-tab");
  const tabEventos = document.getElementById("evento-tab");
  const tabPatentes = document.getElementById("patentes-tab");

  if (tabLocais.classList.contains("active")) {
    gravarCadastroLocal();
    return;
  }

  if (tabEventos.classList.contains("active")) {
    gravarCadastroEvento();
    return;
  }

  if (tabPatentes.classList.contains("active")) {
    salvarPatente();
    return;
  }
}

function dropdownStartup() {
  document.getElementById("validacaoClassificacao").value = 1; //Inicializando o dropdown de classificação
  if (document.getElementById("validacaoTipoLocal").value === "Startup") {
    $("#dropdownStartup").attr("style", "display: all;");
    $("#uploaderLabel1").attr("style", "top: 32px");
  } else {
    $("#dropdownStartup").attr("style", "display: none;");
    $("#uploaderLabel1").attr("style", "top: 0px");
  }
}

//Gravando Cadastro dos locais
function gravarCadastroLocal() {
  //Fazendo com que seja passado null para classificação caso não seja uma Startup (Conveniencia...)
  if (document.getElementById("validacaoTipoLocal").value !== "Startup") {
    document.getElementById("validacaoClassificacao").value = null;
  }

  //Capturando os valores do formulário e passando para um objeto entidade
  let entidade = new Entidade(
    document.getElementById("validacaoNomeLocal").value,
    document.getElementById("validacaoSiteLocal").value,
    document.getElementById("validacaoTipoLocal").value,
    null,
    document.getElementById("validacaoLatLocal").value,
    document.getElementById("validacaoLngLocal").value,
    document.getElementById("validacaoLogradouroLocal").value,
    document.getElementById("validacaoNumeroLocal").value,
    document.getElementById("validacaoComplementoLocal").value,
    document.getElementById("validacaoBairroLocal").value,
    document.getElementById("validacaoCidadeLocal").value,
    document.getElementById("validacaoUFLocal").value,
    document.getElementById("validacaoCEPLocal").value,
    null,
    firebase.auth().currentUser.uid,
    false,
    document.getElementById("validacaoClassificacao").value
  );

  entidadedao.salvar(entidade, uploader1SelectedFile);
}

//Gravando cadastro de Eventos
function gravarCadastroEvento() {
  //Capturando os valores do formulário
  let evento = new Evento(
    document.getElementById("validacaoNomeEvento").value,
    document.getElementById("validacaoSiteEvento").value,
    "Eventos",
    document.getElementById("validacaoTipoEvento").value,
    document.getElementById("areatextoEvento").value,
    diaEvento,
    horaEvento,
    null,
    document.getElementById("validacaoLatEvento").value,
    document.getElementById("validacaoLngEvento").value,
    document.getElementById("validacaoLogradouroEvento").value,
    document.getElementById("validacaoNumeroEvento").value,
    document.getElementById("validacaoComplementoEvento").value,
    document.getElementById("validacaoBairroEvento").value,
    document.getElementById("validacaoCidadeEvento").value,
    document.getElementById("validacaoUFEvento").value,
    document.getElementById("validacaoCEPEvento").value,
    null,
    firebase.auth().currentUser.uid
  );
  eventodao.salvar(evento, uploader2SelectedFile);
}

function incializarSistema() {
  exibirList.forEach(marcarPontos);
}

function telaCadastroComunidade() {
  localStorage.setItem("comumKey", "cadastro-comunidade");
  window.open("como-utilizar.html", "_blank");
}

function deletarMarcador() {
  map.removeLayer(marker);
}

function receberDiaHora(dia, hora) {
  diaEvento = dia;
  horaEvento = hora;
}

function selecionarLocal() {
  /*Inicializando o Modal*/
  document.getElementById("validacaoTipoLocal").value = 1; //Inicializando o dropdown do tipo de entidade
  dropdownStartup();

  lat = null;
  lng = null;

  escolhaLayer.clearLayers();
  let status = $("#btn-user").attr("data-status");
  if (status === "logado") {
    $("#marcar_info").attr("style", "display: all;");

    map.on("click", function (e) {
      if (marker) {
        map.removeLayer(marker);
        //escolhaLayer.clearLayers();
      }
      marker = L.marker(e.latlng)
        .addTo(map)
        //marker = L.marker(e.latlng)
        .bindPopup(
          `<div class="row d-flex justify-content-center">
    <h6 class="col-12 font-weight-bold">Confirmar</h6>
    <button class="btn btn-submit btn-sm col-6 font-weight-bold" onclick="chamarModalCadastro()" >Aqui!</button>
    </div>`
        )
        .openPopup();
      //escolhaLayer.addLayer(marker).addTo(map);

      //marker = L.marker([latitude, longitude]).addTo(mymap);

      lat = e.latlng.lat;
      lng = e.latlng.lng;
      document.getElementById("validacaoLatLocal").value = lat;
      document.getElementById("validacaoLngLocal").value = lng;

      document.getElementById("validacaoLatEvento").value = lat;
      document.getElementById("validacaoLngEvento").value = lng;

      document.getElementById("validacaoLatPatente").value = lat;
      document.getElementById("validacaoLngPatente").value = lng;
    });
  } else {
    window.location.href = "login.html";
  }
}

function chamarModalCadastro() {
  if (lat === null || lng === null) {
    alert("Selecione um local no mapa");
  } else {
    map.off("click");

    document.getElementById("validacaoNomeLocal").value = "";
    document.getElementById("validacaoSiteLocal").value = "";
    document.getElementById("validacaoTipoLocal").value = 1;
    document.getElementById("validacaoLogradouroLocal").value = "";
    document.getElementById("validacaoNumeroLocal").value = "";
    document.getElementById("validacaoComplementoLocal").value = "";
    document.getElementById("validacaoBairroLocal").value = "";
    document.getElementById("validacaoCidadeLocal").value = "";
    document.getElementById("validacaoUFLocal").value = 1;
    document.getElementById("validacaoCEPLocal").value = "";
    document.getElementById("uploaderLabel1").innerHTML =
      "Logo (Tamanho sugerido: 80 x 80 px)";
    document.getElementById("uploader1").value = "";
    uploader1SelectedFile = "";

    document.getElementById("validacaoNomeEvento").value = "";
    document.getElementById("validacaoSiteEvento").value = "";
    document.getElementById("validacaoTipoEvento").value = 1;
    document.getElementById("areatextoEvento").value = "";
    document.getElementById("validacaoLogradouroEvento").value = "";
    document.getElementById("validacaoNumeroEvento").value = "";
    document.getElementById("validacaoComplementoEvento").value = "";
    document.getElementById("validacaoBairroEvento").value = "";
    document.getElementById("validacaoCidadeEvento").value = "";
    document.getElementById("validacaoUFEvento").value = 1;
    document.getElementById("validacaoCEPEvento").value = "";
    document.getElementById("uploaderLabel2").innerHTML =
      "Logo (Tamanho sugerido: 80 x 80 px)";
    document.getElementById("uploader2").value = "";
    document.getElementById("dtpicker").value = "";
    uploader2SelectedFile = "";

    $("#ModalCadastro").modal("show");

    $("#marcar_info").attr("style", "display: none;");
  }
}

// function onChangeDataPublicacaoPatente(dataPublicacao) {
//   dataPublicacaoPatente = dataPublicacao;
// }

$(document).ready(() => {
  $("#validacaoCEPLocal").focusout(function () {
    let cep = $("#validacaoCEPLocal").val();

    if (cep.length < 9 && cep.length != 0) {
      cepLocalInvalido();
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          cepLocalInvalido();
        } else {
          $("#validacaoLogradouroLocal").val(data.logradouro);
          $("#validacaoComplementoLocal").val(data.complemento);
          $("#validacaoBairroLocal").val(data.bairro);
          $("#validacaoCidadeLocal").val(data.localidade);
          $("#validacaoUFLocal").val(data.uf);
        }
      });
    function cepLocalInvalido() {
      alert("CEP Inválido");
      $("#validacaoCEPLocal").val("");
    }
  });

  $("#validacaoCEPEvento").focusout(function () {
    let cep = $("#validacaoCEPEvento").val();

    if (cep.length < 9 && cep.length != 0) {
      cepEventoInvalido();
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          cepEventoInvalido();
        } else {
          $("#validacaoLogradouroEvento").val(data.logradouro);
          $("#validacaoComplementoEvento").val(data.complemento);
          $("#validacaoBairroEvento").val(data.bairro);
          $("#validacaoCidadeEvento").val(data.localidade);
          $("#validacaoUFEvento").val(data.uf);
        }
      });
    function cepEventoInvalido() {
      alert("CEP Inválido");
      $("#validacaoCEPEvento").val("");
    }
  });

  $("#validacaoCEPPatente").focusout(function () {
    let cep = $("#validacaoCEPPatente").val();

    if (cep.length < 9 && cep.length != 0) {
      cepEventoInvalido();
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.erro) {
          cepEventoInvalido();
        } else {
          $("#validacaoLogradouroPatente").val(data.logradouro);
          $("#validacaoComplementoPatente").val(data.complemento);
          $("#validacaoBairroPatente").val(data.bairro);
          $("#validacaoCidadePatente").val(data.localidade);
          $("#validacaoUFPatente").val(data.uf);
        }
      });
    function cepEventoInvalido() {
      alert("CEP Inválido");
      $("#validacaoCEPEvento").val("");
    }
  });

  $("#validacaoCEPLocal").mask("00000-000");
  $("#validacaoCEPEvento").mask("00000-000");
  $("#validacaoCEPPatente").mask("00000-000");

  $("#btn_sair").click(() => {
    $("#janela_oculta").attr("style", "display: none;");
    aux = false;
  });

  $("#map_button2").click(() => {
    $("#marcar_info").attr("style", "display: none;");
    map.off("click");
    map.removeLayer(marker);
  });

  $("#uploader1").on("change", function (event) {
    // Recebe o arquivo upado no cadastro sempre que há mudanças
    uploader1SelectedFile = event.target.files[0];
    document.getElementById("uploaderLabel1").innerHTML =
      uploader1SelectedFile.name; //Atualiza  nome do arquivo no campo
  });

  $("#uploader2").on("change", function (event) {
    // Recebe o arquivo upado no cadastro sempre que há mudanças
    uploader2SelectedFile = event.target.files[0];
    document.getElementById("uploaderLabel2").innerHTML =
      uploader2SelectedFile.name; //Atualiza  nome do arquivo no campo
  });

  $(function () {
    //Controla o Data Timer Picker

    $("#datetimepicker1").datetimepicker({
      format: "DD-MM-YYYY HH:mm",
      //defaultDate: moment([]),
    });

    $("#datetimePickerPatente").datetimepicker({
      format: "DD/MM/YYYY",
      //defaultDate: moment([]),
    });

    $("#datetimepicker1").on("change.datetimepicker", function (e) {
      receberDiaHora(e.date.format("DD/MM/YYYY"), e.date.format("LT"));
    });

    // $("#datetimePickerPatente").on("change.datetimepicker", function (e) {
    //   onChangeDataPublicacaoPatente(e.date.format("DD/MM/YYYY"));
    // });
  });

  //Inicializar Checkbox
  $("#CheckboxTodos").prop("checked", true);
  $("#CheckboxAcelerador").prop("checked", true);
  $("#CheckboxCatalisadores").prop("checked", true);
  $("#CheckboxAdvogados").prop("checked", true);
  $("#CheckboxComunicacao").prop("checked", true);
  $("#CheckboxConexao").prop("checked", true);
  $("#CheckboxConteudo").prop("checked", true);
  $("#CheckboxCoworking").prop("checked", true);
  $("#CheckboxCreditos").prop("checked", true);
  $("#CheckboxEditais").prop("checked", true);
  $("#CheckboxEscolas").prop("checked", true);
  $("#CheckboxMakers").prop("checked", true);
  $("#CheckboxEventos").prop("checked", true);
  $("#CheckboxFabricaApp").prop("checked", true);
  $("#CheckboxGoverno").prop("checked", true);
  $("#CheckboxEmpresas").prop("checked", true);
  $("#CheckboxIncubadoras").prop("checked", true);
  $("#CheckboxiniUniversitarias").prop("checked", true);
  $("#CheckboxInvestidores").prop("checked", true);
  $("#CheckboxMissoes").prop("checked", true);
  $("#CheckboxNucleos").prop("checked", true);
  $("#CheckboxParques").prop("checked", true);
  $("#CheckboxpreAceleradoras").prop("checked", true);
  $("#CheckboxpropIntelectuais").prop("checked", true);
  $("#CheckboxProvedores").prop("checked", true);
  $("#CheckboxMentoria").prop("checked", true);
  $("#CheckboxStartup").prop("checked", true);
  $("#CheckboxPatentes").prop("checked", true);

  $("#CheckboxTodos").change(function () {
    //Implementa a função do checkbok "Tudo"
    if ($(this).prop("checked") == true) {
      $("#CheckboxTodos").prop("checked", true);
      $("#CheckboxAcelerador").prop("checked", true);
      $("#CheckboxCatalisadores").prop("checked", true);
      $("#CheckboxAdvogados").prop("checked", true);
      $("#CheckboxComunicacao").prop("checked", true);
      $("#CheckboxConexao").prop("checked", true);
      $("#CheckboxConteudo").prop("checked", true);
      $("#CheckboxCoworking").prop("checked", true);
      $("#CheckboxCreditos").prop("checked", true);
      $("#CheckboxEditais").prop("checked", true);
      $("#CheckboxEscolas").prop("checked", true);
      $("#CheckboxMakers").prop("checked", true);
      $("#CheckboxEventos").prop("checked", true);
      $("#CheckboxFabricaApp").prop("checked", true);
      $("#CheckboxGoverno").prop("checked", true);
      $("#CheckboxEmpresas").prop("checked", true);
      $("#CheckboxIncubadoras").prop("checked", true);
      $("#CheckboxiniUniversitarias").prop("checked", true);
      $("#CheckboxInvestidores").prop("checked", true);
      $("#CheckboxMissoes").prop("checked", true);
      $("#CheckboxNucleos").prop("checked", true);
      $("#CheckboxParques").prop("checked", true);
      $("#CheckboxpreAceleradoras").prop("checked", true);
      $("#CheckboxpropIntelectuais").prop("checked", true);
      $("#CheckboxProvedores").prop("checked", true);
      $("#CheckboxMentoria").prop("checked", true);
      $("#CheckboxStartup").prop("checked", true);
      $("#CheckboxPatentes").prop("checked", true);
      $("#startupType").attr("style", "display: all;");
    }
    if ($(this).prop("checked") == false) {
      $("#CheckboxTodos").prop("checked", false);
      $("#CheckboxAcelerador").prop("checked", false);
      $("#CheckboxCatalisadores").prop("checked", false);
      $("#CheckboxAdvogados").prop("checked", false);
      $("#CheckboxComunicacao").prop("checked", false);
      $("#CheckboxConexao").prop("checked", false);
      $("#CheckboxConteudo").prop("checked", false);
      $("#CheckboxCoworking").prop("checked", false);
      $("#CheckboxCreditos").prop("checked", false);
      $("#CheckboxEditais").prop("checked", false);
      $("#CheckboxEscolas").prop("checked", false);
      $("#CheckboxMakers").prop("checked", false);
      $("#CheckboxEventos").prop("checked", false);
      $("#CheckboxFabricaApp").prop("checked", false);
      $("#CheckboxGoverno").prop("checked", false);
      $("#CheckboxEmpresas").prop("checked", false);
      $("#CheckboxIncubadoras").prop("checked", false);
      $("#CheckboxiniUniversitarias").prop("checked", false);
      $("#CheckboxInvestidores").prop("checked", false);
      $("#CheckboxMissoes").prop("checked", false);
      $("#CheckboxNucleos").prop("checked", false);
      $("#CheckboxParques").prop("checked", false);
      $("#CheckboxpreAceleradoras").prop("checked", false);
      $("#CheckboxpropIntelectuais").prop("checked", false);
      $("#CheckboxProvedores").prop("checked", false);
      $("#CheckboxMentoria").prop("checked", false);
      $("#CheckboxStartup").prop("checked", false);
      $("#CheckboxPatentes").prop("checked", false);
      /*Inicializando o filtro do tipo de Startup*/
      $("#startupType").attr("style", "display: none;");
    }
  });
});
