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
let regiaoDao = new RegiaoDao();

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
ecossistema.push(new Advogados())
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
opcaoRegiao();
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
function criarOpcaoRegiaoMobile(regioes) {
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipoMobile");
  let listaOpcoes = document.querySelector("#listaOpcoesMobile");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()

  a.innerHTML = `<div style="width:inherit" class="d-flex justify-content-between align-items-center">
  <img style="height:36px; width:36px" src= "img/img-bl/31-regiao.png">
  <span data-i18n="categorias.regioes">Regiões</span>
  <span class="badge badge-secondary badge-pill">${regioes.length}</span>
  </div>
  <i style="padding-left:50px" class="fas fa-angle-right"></i>`;

  a.setAttribute("data-tipo", "Regioes");
  listaOpcoes.appendChild(document.importNode(template.content, true));
}
function criarOpcaoComunidade(comunidades) {
  console.log(comunidades)
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipo");
  let listaOpcoes = document.querySelector("#listaOpcoes");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()
  
  a.innerHTML = `<img style="height:36px; width:36px" src= "img/img-bl/27-comunidade.png">
  <span data-i18n="categorias.comunidades">${i18next.t("categorias.comunidades")}</span>
  <span class="badge badge-secondary badge-pill">${comunidades.length}</span>`;

  a.setAttribute("data-tipo", "Comunidades");
  listaOpcoes.appendChild(document.importNode(template.content, true));
}


function opcaoRegiao() {
  regiaoDao.varredura().then(function (regiao) {
    console.log(regiao);
    criarOpcaoRegiao(regiao);
    criarOpcaoRegiaoMobile(regiao);
  });
}

function criarOpcaoRegiao(comunidades) {
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipo");
  let listaOpcoes = document.querySelector("#listaOpcoes");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()

  a.innerHTML = `<img style="height:36px; width:36px" src= "img/img-bl/31-regiao.png">
  <span data-i18n="categorias.regioes">${i18next.t("categorias.regioes")}</span>
  <span class="badge badge-secondary badge-pill">${comunidades.length}</span>`;

  a.setAttribute("data-tipo", "Regiao");
  listaOpcoes.appendChild(document.importNode(template.content, true));
}



function criarListaOpcoes(tipoClasse) {
  // Cria lista da bara lateral
  let template = document.querySelector("#listaTipo");
  let listaOpcoes = document.querySelector("#listaOpcoes");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");

  let tipoI18n = getTipoClasseI18n(tipoClasse.getNome());
  let dataI18n = "categorias." + tipoI18n;

  imgLink.src = tipoClasse.getImagemBarra();

  a.innerHTML = `<img style="height:36px; width:36px" src= ${imgLink.src}>
  <span data-i18n="${dataI18n}"> ${i18next.t(dataI18n)}</span>
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

//Função para retornar valor equivalente ao tipoClasse no i18n
function getTipoClasseI18n(tipo){
  
  if(tipo == 'Aceleradora')
    return 'aceleradora'
  if(tipo == 'Advogados')
    return 'advogados'
  else if(tipo == 'Catalisadores Locais')
    return 'catLocais'
  else if(tipo == 'Comunicação e Mídia')
    return 'comEMidia'
  else if(tipo == 'Coworking')
    return 'coworking'
  else if(tipo == 'Escolas')
    return 'escolas'
  else if(tipo == 'Espaços Makers')
    return 'espMakers'
  else if(tipo == 'Eventos')
    return 'eventos'
  else if(tipo == 'Fábrica de Aplicativos')
    return 'fabApp'
  else if(tipo == 'Governo')
    return 'gov'
  else if(tipo == 'Grandes Empresas')
    return 'gEmpresas'
  else if(tipo == 'Incubadoras')
    return 'incubadoras'
  else if(tipo == 'Iniciativas Universitárias')
    return 'iniUniversitarias'
  else if(tipo == 'Investidores')
    return 'investidores'
  else if(tipo == 'Núcleos de Inovação')
    return 'nucInovacao'
  else if(tipo == 'Parques Tecnológicos')
    return 'parquesTec'
  else if(tipo == 'Pré Aceleradoras')
    return 'preAceleradoras'
  else if(tipo == 'Propriedade Intelectual')
    return 'propIntelectual'
  else if(tipo == 'Mentoria')
    return 'mentoria'
  else if(tipo == 'Startup')
    return 'startup'
  else if(tipo == 'Patente')
    return 'patente'
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

  if (tipoListagem === "Regiao") {
    filtroBuscaRegiao(textoBuscado);
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
    if (tipoSelecionado === "Regiao") {
      filtroBuscaRegiao(tipoSelecionado);
      return;
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

/**Tradução barra de busca*/
i18next.on('languageChanged', function(lng) {
  const INPUT_BUSCA = document.getElementsByName("contBusca");
  INPUT_BUSCA[0].placeholder = i18next.t("barraLateral.busca")
})

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
  let txtMarcadoPor = template.content.querySelector("#txt-marcadopor");
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

  btn1.classList.add("cardEntidade-i18n");
  btn2.classList.add("cardEntidade-i18n");
  txtMarcadoPor.classList.add("cardEntidade-i18n");
  console.log(btn1)
  btn1.innerHTML = i18next.t('barraLateral.cards.cardsEntidades.btnLocalizacao'); 
  txtMarcadoPor.innerHTML = i18next.t('barraLateral.cards.cardsEntidades.txtMarcadoPor'); 

  if (entidade.tipo === "Patente") {
    btn2.classList.add("btn-oculto");
  } else {
    btn2.innerHTML = i18next.t('barraLateral.cards.cardsEntidades.btnVisitarSite'); 
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

/**Tradução elementos cards Empresas */
i18next.on('languageChanged', function(lng) {
  const BOTOES_LOCALIZACAO_CARD_ENTIDADE = document.getElementsByClassName("cardEntidade-i18n");
  const ARRAY_BOTOES_LOCALIZACAO_CARD_ENTIDADE = Array.from(BOTOES_LOCALIZACAO_CARD_ENTIDADE)

  ARRAY_BOTOES_LOCALIZACAO_CARD_ENTIDADE.forEach(element => {
    if(element.id == "btn-card1"){
      element.innerText = i18next.t('barraLateral.cards.cardsEntidades.btnLocalizacao'); 
    } 
    else if(element.id == "btn-card2"){
      element.innerText = i18next.t('barraLateral.cards.cardsEntidades.btnVisitarSite'); 
    }
    else if(element.id == "txt-marcadopor"){
      element.innerHTML = i18next.t('barraLateral.cards.cardsEntidades.txtMarcadoPor'); 
    }
  });
});

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

function filtroBuscaRegiao(tipo) {
  let valBarra = document.getElementById("contBusca").value; //Verificar se há algo na barra de busca

  if (valBarra != "") {
    regiaoDao.buscarPorNome(valBarra).then(function (comunidade) {
      verificarUsuarioRegiao(comunidade);
    });
  } else {
    regiaoDao.varredura().then(function (regiao) {
      regiao.forEach(verificarUsuarioRegiao);
    });
  }
}

function verificarUsuarioComunidade(comunidade) {
  usuariodao.buscar(comunidade.getUserId()).then(function (usuario) {
    cartaoComunidade(comunidade, usuario.getNome());
  });
}

function verificarUsuarioRegiao(regiao) {
  usuariodao.buscar(regiao.getUserId()).then(function (usuario) {
    cartaoRegiao(regiao, usuario.getNome());
  });
}

function cartaoRegiao(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresa");
  let cartao = document.querySelector("#cartao");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let txtMarcadoPor = template.content.querySelector("#txt-marcadopor");
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
  btn1.setAttribute("onclick", "exibirRegiao(this)");

  btn1.classList.add("cardRegiao-i18n");
  btn2.classList.add("cardRegiao-i18n");
  txtMarcadoPor.classList.add("cardRegiao-i18n");

  btn1.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnAtivar");
  btn2.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnVisitar");
  txtMarcadoPor.innerHTML = i18next.t('barraLateral.cards.cardsComunidade.txtMarcadoPor'); 

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

/**Tradução elementos cards Regiões */
i18next.on('languageChanged', function(lng) {
  const BOTOES_LOCALIZACAO_CARD_REGIAO = document.getElementsByClassName("cardRegiao-i18n");
  const ARRAY_BOTOES_LOCALIZACAO_CARD_REGIAO = Array.from(BOTOES_LOCALIZACAO_CARD_REGIAO)

  ARRAY_BOTOES_LOCALIZACAO_CARD_REGIAO.forEach(element => {
    if(element.id == "btn-card1"){
      element.innerText = i18next.t('barraLateral.cards.cardsComunidade.btnAtivar'); 
    } 
    else if(element.id == "btn-card2"){
      element.innerText = i18next.t('barraLateral.cards.cardsComunidade.btnVisitar'); 
    }
    else if(element.id == "txt-marcadopor"){
      element.innerHTML = i18next.t('barraLateral.cards.cardsComunidade.txtMarcadoPor'); 
    }
  });
});

function cartaoComunidade(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresa");
  let cartao = document.querySelector("#cartao");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let criador = template.content.querySelector("#txt-marcadopor-nome");
  let txtMarcadoPor = template.content.querySelector("#txt-marcadopor");
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

  btn1.classList.add("cardComunidade-i18n");
  btn2.classList.add("cardComunidade-i18n");
  txtMarcadoPor.classList.add("cardComunidade-i18n");

  btn1.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnAtivar");
  btn2.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnVisitar");
  txtMarcadoPor.innerHTML = i18next.t('barraLateral.cards.cardsComunidade.txtMarcadoPor'); 

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

/**Tradução elementos cards Comunidades */
i18next.on('languageChanged', function(lng) {
  const BOTOES_LOCALIZACAO_CARD_COMUNIDADE = document.getElementsByClassName("cardComunidade-i18n");
  const ARRAY_BOTOES_LOCALIZACAO_CARD_COMUNIDADE = Array.from(BOTOES_LOCALIZACAO_CARD_COMUNIDADE)

  ARRAY_BOTOES_LOCALIZACAO_CARD_COMUNIDADE.forEach(element => {
    if(element.id == "btn-card1"){
      element.innerText = i18next.t('barraLateral.cards.cardsComunidade.btnAtivar'); 
    } 
    else if(element.id == "btn-card2"){
      element.innerText = i18next.t('barraLateral.cards.cardsComunidade.btnVisitar'); 
    }
    else if(element.id == "txt-marcadopor"){
      element.innerHTML = i18next.t('barraLateral.cards.cardsComunidade.txtMarcadoPor'); 
    }
  });
});


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
function opcaoRegiaoMobile() {
  regiaoDao.varredura().then(function (regiao) {
    criarOpcaoRegiaoMobile(regiao);
  });
}
function criarOpcaoComunidadeMobile(comunidades) {
  // Cria botão de comunidade
  let template = document.querySelector("#listaTipoMobile");
  let listaOpcoes = document.querySelector("#listaOpcoesMobile");
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()

  a.innerHTML = `<div style="width:inherit" class="d-flex justify-content-between align-items-center" id="div-comunidades-mobile">
  <img style="height:36px; width:36px" src= "img/img-bl/27-comunidade.png">
  <span data-i18n="categorias.comunidades">Comunidades</span>
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

  let tipoI18n = getTipoClasseI18n(tipoClasse.getNome());
  let dataI18n = "categorias." + tipoI18n;

  a.innerHTML = `<div style="width:inherit" class="d-flex justify-content-between align-items-center">
  <img style="height:36px; width:36px" src= ${imgLink.src} >
  <span data-i18n="${dataI18n}">${tipoClasse.getNome()}</span>
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
  console.log(componente);
  contAux = 0;
  while (contAux <= ecossistema.length) {
    if ("Comunidades" == componente.getAttribute("data-tipo")) {
      document
        .getElementById("img-categoria")
        .setAttribute("src", "img/img-bl/27-comunidade.png");
      document.getElementById("nome-categoria").innerHTML = i18next.t("categorias.comunidades");
      break;
    }
    if ("Regioes" == componente.getAttribute("data-tipo")) {
      document
        .getElementById("img-categoria")
        .setAttribute("src", "img/img-bl/31-regiao.png");
      document.getElementById("nome-categoria").innerHTML = "Regioes";
      break;
    }
    if (
      ecossistema[contAux].getNome() == componente.getAttribute("data-tipo")
    ) {
      /**Elementos de traducao */
      let tipoI18n = getTipoClasseI18n( ecossistema[contAux].getNome());
      let dataI18n = "categorias." + tipoI18n;

      document
        .getElementById("img-categoria")
        .setAttribute("src", ecossistema[contAux].getImagemBarra());
      document.getElementById("nome-categoria").innerHTML =
        i18next.t(dataI18n);
        
      break;
    }
    contAux = contAux + 1;
  }

  $(".template-cartao").remove();
  if (componente.getAttribute("data-tipo") == "Regioes") {
    filtroBuscaRegiaoMobile(componente.getAttribute("data-tipo"));
  } else if (componente.getAttribute("data-tipo") != "Comunidades") {
    filtroBuscaMobile(componente.getAttribute("data-tipo")); //exibe os cartões do tipo de opção selecionada
  } else if (componente.getAttribute("data-tipo") == "Comunidades") {
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
  let txtMarcadoPor = template.content.querySelector("#txt-marcadopor");
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

  btn1.innerHTML = i18next.t("barraLateral.cards.cardsEntidades.btnLocalizacao");
  btn2.innerHTML = i18next.t("barraLateral.cards.cardsEntidades.btnVisitarSite");

  btn2.setAttribute("href", entidade.getSite());
  btn1.setAttribute("data-key", entidade.getMarkerKey());
  btn1.setAttribute("onclick", "zoomMarcador(this)");
  btn1.setAttribute("data-dismiss", "modal");

  txtMarcadoPor.innerText = i18next.t("barraLateral.cards.cardsEntidades.txtMarcadoPor");

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
function filtroBuscaRegiaoMobile(tipo) {
  regiaoDao.varredura().then(function (regiao) {
    regiao.forEach(verificarUsuarioRegiaoMobile);
  });
}
function verificarUsuarioComunidadeMobile(comunidade) {
  usuariodao.buscar(comunidade.getUserId()).then(function (usuario) {
    cartaoComunidadeMobile(comunidade, usuario.getNome());
  });
}
function verificarUsuarioRegiaoMobile(regiao) {
  usuariodao.buscar(regiao.getUserId()).then(function (usuario) {
    cartaoRegiaoMobile(regiao, usuario.getNome());
  });
}

function cartaoComunidadeMobile(entidade, nomeUser) {
  let template = document.querySelector("#cartaoEmpresaMobile");
  let cartao = document.querySelector("#cartaoMobile");
  let img = template.content.querySelector("img");
  let titulo = template.content.querySelector("#txt-titulo-card");
  let descricao = template.content.querySelector("#txt-descricao-card");
  let txtMarcadoPor = template.content.querySelector("#txt-marcadopor");
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
    btn1.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnDesativar");
    btn1.setAttribute("Style", "background: #CF5B15;");
  } else {
    btn1.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnAtivar");
    btn1.setAttribute("Style", "background: #FC6A38;");
  }

  btn2.innerHTML = i18next.t("barraLateral.cards.cardsComunidade.btnVisitar");
  txtMarcadoPor.innerText = i18next.t("barraLateral.cards.cardsEntidades.txtMarcadoPor");

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

function cartaoRegiaoMobile(entidade, nomeUser) {
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
  btn1.setAttribute("onclick", "exibirRegiao(this)");
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

  let tipo = getTipoClasseI18n(entidade.getTipo());
  let traducao_tipo = "categorias." + tipo; 

  const btnVerPatentes =
    entidade.getTotalPatentes() > 0
      ? `<a class="btnProp popupBtnVerPatentes" style="color: white" data-key="${entidade.getMarkerKey()}" onclick="mostrarModalListagemPatentes(this)">Ver patentes</a>`
      : "";

  return `
  <div id="popupContainer">
    <img class="popupImg" src="${imgPop.src}"></img> 
    <p class="popupNome" style="margin: 0px"> ${entidade.getNome()} </p>
    <p class="popupTipo i18n-popupContainer-tipo" style="margin: 0px data-i18n="${traducao_tipo}">${entidade.getTipo()} </p>
    <div id=popupBtnContainer>
      <a class="btnProp popupBtnConheca i18n-popupContainer-btnVisitar" 
        style="color: #FC6A38;" href=" ${entidade.getSite()}" 
        target='_blank' data-i18n="popupBtnContainer.btnVisitar">Visitar Site</a>

      <a class="btnProp popupBtnCompartilhar i18n-popupContainer-btnLink"
        style="color: white" data-key ="${entidade.getMarkerKey()}" 
        onclick="criarURLCompartilhamento(this)" 
        title="Compartilhar" data-i18n="popupBtnContainer.btnLink">Link da Localização</i></a>
      ${btnVerPatentes}
    </div>
  </div>`;
}

/**Tradução popup container*/
map.on('popupopen', async function(e) {
  const POPUP_CONTAINER = document.getElementById("popupContainer");
  if(POPUP_CONTAINER){
    const BOTOES_VISITAR = document.getElementsByClassName("i18n-popupContainer-btnVisitar");
    const BOTOES_LINK = document.getElementsByClassName("i18n-popupContainer-btnLink");
    const TXT_TIPOS = document.getElementsByClassName("i18n-popupContainer-tipo");
    //console.log(TXT_TIPOS[0].innerHTML)

    const ARRAY_BOTOES_VISITAR = Array.from(BOTOES_VISITAR);
    const ARRAY_BOTOES_LINK = Array.from(BOTOES_LINK);
    const ARRAY_TXT_TIPOS = Array.from(TXT_TIPOS);

    ARRAY_BOTOES_VISITAR.forEach((btn) =>{
      btn.innerText = i18next.t("popupBtnContainer.btnVisitar");
    });

    ARRAY_BOTOES_LINK.forEach((btn) =>{
      btn.innerText = i18next.t("popupBtnContainer.btnLink");
    });

    ARRAY_TXT_TIPOS.forEach((label) => {
      let tipo = getTipoClasseI18n(label.innerText);
      let traducao_tipo = "categorias." + tipo; 
      label.innerText = i18next.t(traducao_tipo);
    })
  }
  
});

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

    $("#CheckboxStartup").attr("style", "display: all;");
    $("#faseStartup").attr("style", "display: all;");

  } else {
    $("#dropdownStartup").attr("style", "display: none;");
    $("#uploaderLabel1").attr("style", "top: 0px");

    $("#CheckboxStartup").attr("style", "display: none;");
    $("#faseStartup").attr("style", "display: none;");
  }
}
function checckboxStartup(){
  const receitas = document.querySelectorAll(".receitas")
  let arrayReceitas = []
  const negocios = document.querySelectorAll(".negocio")
  let arrayNegocios = []

 

  console.log(arrayNegocios)
  console.log(arrayReceitas)
  Array.from(receitas, (receita=>{
  
    if(receita.checked){
      arrayReceitas.push(receita.value)
    }
  }))
  Array.from(negocios, (negocio=>{
  
    if(negocio.checked){
      arrayNegocios.push(negocio.value)
    }
  }))


  return [arrayReceitas, arrayNegocios];
}
//Gravando Cadastro dos locais
function gravarCadastroLocal() {
  let receitas  = checckboxStartup()[0];

  let modeloNegocio = checckboxStartup()[1];
  let fase = document.getElementById("faseStartupSelect").value;
  //Fazendo com que seja passado null para classificação caso não seja uma Startup (Conveniencia...)
  if (document.getElementById("validacaoTipoLocal").value !== "Startup") {
    document.getElementById("validacaoClassificacao").value = null;
    receitas = null;
    modeloNegocio = null;
    fase = null;
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
    document.getElementById("validacaoClassificacao").value,
    false,
    modeloNegocio,
    receitas,
    fase
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
      }

      marker = L.marker(e.latlng)
        .addTo(map)
        .bindPopup(
          `<div class="row d-flex justify-content-center" id="divPopup">
              <h6 class="col-12 font-weight-bold text-center">
                <span id="confirm">${i18next.t("navBar1.cadastro.marcador.legenda")}</span>
              </h6>
              <button class="btn btn-submit btn-sm font-weight-bold" onclick="chamarModalCadastro()">
                <span id="btn-popup">${i18next.t("navBar1.cadastro.marcador.btn")}</span>
              </button>
          </div>`
        )
        .openPopup();

      lat = e.latlng.lat;
      lng = e.latlng.lng;

      document.getElementById("validacaoLatLocal").value = lat;
      document.getElementById("validacaoLngLocal").value = lng;

      document.getElementById("validacaoLatEvento").value = lat;
      document.getElementById("validacaoLngEvento").value = lng;
    });
  } else {
    window.location.href = "login.html";
  }
} 

//permite a tradução do popup
map.on('popupopen', async function(e) {

  var marker = e.popup._source;
  //await loadPopupTranslation()
  atualizarTraducaoPopup()
});

/**Tradução do popup do cadastro */
i18next.on('languageChanged', function(lng) {
  atualizarTraducaoPopup();
  atualizarTraducaoModalCadastro();
})

function atualizarTraducaoPopup(){
  const DIVPOPUP = document.getElementById('divPopup')
  if(DIVPOPUP){
    document.getElementById('confirm').innerText = i18next.t("navBar1.cadastro.marcador.legenda");
    document.getElementById('btn-popup').innerText = i18next.t("navBar1.cadastro.marcador.btn");
  }
}

/** Tradução do modalCadastro */

function atualizarTraducaoModalCadastro(){
  traducaoModalInstituicao();
  traducaoSelectTipoLocal();
  traducaoPlaceholderModalInsittuicao();
  traducaoModalEventos();
  traducaoModalAgradecimento();
}

function traducaoModalInstituicao(){
  document.getElementById('exampleModalLabel').innerText = i18next.t('navBar1.cadastro.modal.legenda');
  document.getElementById('local-tab').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.instituicao');
  document.getElementById('evento-tab').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.evento');
  document.getElementById('labelValidacaoNomeLocal').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.nome');
  document.getElementById('labelValidacaoSiteLocal').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.site');
  document.getElementById('labelvalidacaoTipoLocal').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.tipoDeLocal');
  document.getElementById('labelvalidacaoCep').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.cep');
  document.getElementById('labelvalidacaoLogradouro').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.logradouro');
  document.getElementById('labelvalidacaoNumero').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.numero');
  document.getElementById('labelvalidacaoComplemento').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.complemento');
  document.getElementById('labelvalidacaoBairro').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.bairro');
  document.getElementById('labelvalidacaoCidade').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.cidade');
  document.getElementById('labelvalidacaoUF').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.uf');
  document.getElementById('labelValidacaoClassificaocao').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.label.startup');

  //botões
  document.getElementById('btn-fechar-modal-cadastro').innerHTML = i18next.t('navBar1.cadastro.modal.btn.fechar');
  document.getElementById('btn-enviar-modal-cadastro').innerHTML = i18next.t('navBar1.cadastro.modal.btn.enviar')

}

function traducaoPlaceholderModalInsittuicao(){
  document.getElementsByName('inputNome')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.nome');
  document.getElementsByName('inputSite')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.site');
  //O placeholder do input da logo é traduzido na função chamarModalCadastro()
  document.getElementsByName('inputCep')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.cep');
  document.getElementsByName('inputLogradouro')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.logradouro');
  document.getElementsByName('inputNumero')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.numero');
  document.getElementsByName('inputComplemento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.complemento');
  document.getElementsByName('inputBairro')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.bairro');
  document.getElementsByName('inputCidade')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.cidade');
  document.getElementById('validacaoClassificaocaoOption').innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.startup');
}

function traducaoSelectTipoLocal(){
  let optionsTipoLocal = document.querySelector('#validacaoTipoLocal')
  for(let i = 0; i < optionsTipoLocal.length; i++){
    if(i == 0){
      optionsTipoLocal[i].innerText = i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.categoria');
    } else {
      console.log(getTipoClasseI18nSelectTipoLocal(i))
      let classe = getTipoClasseI18nSelectTipoLocal(i);
      let texto = 'categorias.'+ classe;
      optionsTipoLocal[i].innerText = i18next.t(texto);
    }
  }
}

function getTipoClasseI18nSelectTipoLocal(indice){
  if(indice == 1)
    return 'aceleradora';
  else if(indice == 2)
    return 'catLocais';
  else if(indice == 3)
    return 'comEMidia'
  else if(indice == 4)
    return 'coworking';
  else if(indice == 5)
    return 'escolas';
  else if(indice == 6)
    return 'espMakers';
  else if(indice == 7)
    return 'eventos';
  else if(indice == 8)
    return 'fabApp';
  else if(indice == 9)
    return 'gEmpresas';
  else if(indice == 10)
    return 'incubadoras';
  else if(indice == 11)
    return 'iniUniversitarias';
  else if(indice == 12)
    return 'investidores';
  else if(indice == 13)
    return 'nucInovacao';
  else if(indice == 14)
    return 'parquesTec';
  else if(indice == 15)
    return 'preAceleradoras';
  else if(indice == 16)
    return 'propIntelectual';
  else if(indice == 17)
    return 'mentoria';
  else if(indice == 18)
    return 'startup';
}

function traducaoModalEventos(){
  document.getElementById('labelValidacaoNomeEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.nome');
  document.getElementById('labelValidacaoSiteEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.site');
  document.getElementById('labelValidacaoTipoEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.tipoDeLocal');
  document.getElementById('labelAreaTextoEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.descricao');
  document.getElementById('labelValidacaoCEPEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.cep');
  document.getElementById('labelValidacaoLogradouroEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.logradouro');
  document.getElementById('labelValidacaoNumeroEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.numero');
  document.getElementById('labelValidacaoComplementoEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.complemento');
  document.getElementById('labelValidacaoBairroEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.bairro');
  document.getElementById('labelValidacaoCidadeEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.cidade');
  document.getElementById('labelValidacaoUFEvento').innerText = i18next.t('navBar1.cadastro.modal.modalEventos.label.uf');


  //placeholder
  document.getElementsByName('inputNomeEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.nome');
  document.getElementsByName('inputSiteEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.site');

  traducaoSelectTipoDeEvento();

  document.getElementsByName('inputCEPEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.cep');
  document.getElementsByName('inputLogradouroEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.logradouro');
  document.getElementsByName('inputNumeroEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.numero');
  document.getElementsByName('inputComplementoEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.complemento');
  document.getElementsByName('inputBairroEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.bairro');
  document.getElementsByName('inputCidadeEvento')[0].placeholder = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.cidade');

}

function traducaoSelectTipoDeEvento(){
  let optionTipoEvento = document.querySelector('#validacaoTipoEvento')

  for(let i = 0; i < optionTipoEvento.length; i++){
    if(i == 0){
      optionTipoEvento[i].innerText = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.select.label');
    } else if (i == 1){
      optionTipoEvento[i].innerText = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.select.empreendedorismo');
    } else if (i == 2){
      optionTipoEvento[i].innerText = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.select.tecnologia');
    } else if (i == 3){
      optionTipoEvento[i].innerText = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.select.inovacao');
    } else if (i == 4){
      optionTipoEvento[i].innerText = i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.select.negocios');
    }
  }
}

function traducaoModalAgradecimento(){
  let txtTitulo = document.getElementById("textoLegendaModalAgradecimento");
  let txtAgradecimento = document.getElementById("instituicaoEventoAgradecimento");
  let txtAnalise1 = document.getElementById("subTxt1");
  let txtAnalise2 = document.getElementById("subTxt2");
  let txtAnalise3 = document.getElementById("subTxt3");
  let txtPendencia = document.getElementById("instituicaoEventoTx3");
  let btn = document.getElementById("btn-modalAgradecimento");

  txtTitulo.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.legenda");
  txtAgradecimento.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.texto1");
  txtAnalise1.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.texto2.sub1");
  txtAnalise2.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.texto2.sub2");
  txtAnalise3.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.texto2.sub3");
  txtPendencia.innerText = i18next.t("navBar1.cadastro.modal.modalSolicitacao.texto3");
  btn.innerText = i18next.t("navBar1.cadastro.modal.btn.fechar");
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
      i18next.t('navBar1.cadastro.modal.modalInstituicao.placeholder.logo')
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
      i18next.t('navBar1.cadastro.modal.modalEventos.placeholder.logo')
    document.getElementById("uploader2").value = "";
    document.getElementById("dtpicker").value = "";
    uploader2SelectedFile = "";

    $("#ModalCadastro").modal("show");

    $("#marcar_info").attr("style", "display: none;");

    const latitudeDoLocalSelecionado =
      document.getElementById("validacaoLatLocal").value;
    const longitudeDoLocalSelecionado =
      document.getElementById("validacaoLngLocal").value;

    buscarEnderecoPorLatitudeLongitude(
      latitudeDoLocalSelecionado,
      longitudeDoLocalSelecionado
    ).then((endereco) => {
      preencherInformacoesDoEndereco(endereco);
    });
  }
}

async function buscarEnderecoPorLatitudeLongitude(latitude, longitude) {
  const URL = `http://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const resultado = await fetch(URL);
    const resultadoConvertidoParaJson = await resultado.json();

    return converterObjetoBuscaEnderecoPorLatitudeLongitudeParaFormatoPadrao(
      resultadoConvertidoParaJson
    );
  } catch (error) {
    console.log("Erro ao buscar endereço usando latitude e longitude");
  }
}

function converterObjetoBuscaEnderecoPorLatitudeLongitudeParaFormatoPadrao(
  resultadoBuscaEnderecoPorLatitudeLongitude
) {
  const {
    road: rua,
    municipality: municipalidade,
    state_district: distritoEstadual,
    state: estado,
    "ISO3166-2-lvl4": identificaoPaisEstado,
    region: regiao,
    postcode: cep,
    country: pais,
    country_code: siglaPais,
    city: cidade,
    suburb: bairro,
  } = resultadoBuscaEnderecoPorLatitudeLongitude.address;

  const siglaEstado = identificaoPaisEstado.split("-")[1];

  return {
    rua:  rua || "",
    cidade: cidade || "",
    municipalidade,
    distritoEstadual,
    estado,
    identificaoPaisEstado,
    regiao,
    cep: cep || "",
    pais,
    siglaPais,
    siglaEstado,
    bairro: bairro || "",
  };
}

function preencherInformacoesDoEndereco(endereco) {
  const { rua, bairro, cidade, siglaEstado, cep } = endereco;
  
  document.getElementById("validacaoLogradouroLocal").value = rua;
  document.getElementById("validacaoNumeroLocal").value = "";
  document.getElementById("validacaoComplementoLocal").value = "";
  document.getElementById("validacaoBairroLocal").value = bairro;
  document.getElementById("validacaoCidadeLocal").value = cidade;
  document.getElementById("validacaoUFLocal").value = siglaEstado;
  document.getElementById("validacaoCEPLocal").value = cep;

  document.getElementById("validacaoLogradouroEvento").value = rua;
  document.getElementById("validacaoNumeroEvento").value = "";
  document.getElementById("validacaoComplementoEvento").value = "";
  document.getElementById("validacaoBairroEvento").value = bairro;
  document.getElementById("validacaoCidadeEvento").value = cidade;
  document.getElementById("validacaoUFEvento").value = siglaEstado;
  document.getElementById("validacaoCEPEvento").value = cep;
}

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
      alert(i18next.t("alert.cepInvalidoCadastro"));
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
      alert(i18next.t("alert.cepInvalidoCadastro"));
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
      alert(i18next.t("alert.cepInvalidoCadastro"));
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


