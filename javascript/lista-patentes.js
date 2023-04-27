const MAX_DESCRIPTION_LENGTH = 360;

function gerarListaPatentesHtml(patentes) {
  listarPatentesHtml(patentes);
  addEventoMostrarPatentesNoMapa();
  addEventoMostrarEsconderDescricao(patentes);
}

function listarPatentesHtml(patentes) {
  const elementoListaPatentes = document.querySelector("#lista-patentes");
  const htmlItemsListaPatentes = patentes.map((patente) =>
    gerarHtmlPatenteLista(patente)
  );

  elementoListaPatentes.innerHTML = htmlItemsListaPatentes;
}

function gerarHtmlPatenteLista(patente) {
  const htmlDescricaoPatente = gerarHtmlDescricaoPatente(patente);
  const htmlSecoesPatente = gerarHtmlSecoes(patente.secoes);
  const htmlClassificaoesPatente = gerarHtmlClassificacoes(
    patente.classificacoes
  );
  const htmlDepositantesPatente = gerarHtmlDepositantes(patente.depositantes);
  const htmlBtnsDepositantes = gerarBtnsVerDepositantesMapa(
    patente.depositantes
  );

  return `
  <div
    class="d-flex align-items-center justify-content-center card-remove"
    style="margin-bottom: 15.2px"
  >
    <div class="card-patente ">
      <div class="card-patente-conteudo m-0">
        <h5 id="titulo-patente" class="m-0 mb-3">
          ${patente.titulo}
        </h5>
        ${htmlDescricaoPatente}
        
        ${htmlSecoesPatente}

        ${htmlClassificaoesPatente}
        
        <div class="mt-4 d-flex align-items-end ">
          <div id="dados-patente-autoria" class="m-0">

            ${htmlDepositantesPatente}

            <div
              style="margin-top: 8px"
              class="d-flex align-items-center justify-content-start dados-patente"
            >
              <i class="fas fa-calendar-alt" style="font-size: 16px"></i>
              <p id="endereco-evento" style="font-size: 11px" class="m-0">
                Publicação - ${patente.dataPublicacao}
              </p>
            </div>
            <div
              style="margin-top: 8px"
              class="d-flex align-items-center justify-content-start dados-patente"
            >
              <i class="fas fa-key" style="font-size: 16px"></i>
              <p id="endereco-evento" style="font-size: 11px" class="m-0">
                Nº de Pedido no INPI - ${patente.numeroPedidoInpi}
              </p>
            </div>
          </div>

          <div
            id="conteudo-evento-B"
            class="d-flex align-items-end texto-btn-evento1 justify-content-end w-100"
          >
            ${htmlBtnsDepositantes}
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}

function gerarHtmlSecoes(secoes) {
  return `
    <div class="mt-4">
      <p class="m-0 titulo-secoes">Seções: </p>

        <div class="ml-1">
          ${secoes
            .map((secao) => `<p class="m-0 secao">* ${secao}</p>`)
            .join("")}
        </div>
    </div>
  `;
}

function gerarHtmlClassificacoes(classificacoes) {
  return `
  <div class="mt-2">
    <p class="m-0 label-classificacoes">Classificações: <span class="classificacoes">${classificacoes}</span></p>
  </div>  
  `;
}

function gerarHtmlDepositantes(depositantes) {
  const nomeDepositantes = depositantes
    .map((depositante) => depositante.nome)
    .join(", ");

  return `<div
    class="d-flex align-items-center justify-content-start dados-patente"
  >
    <i class="fas fa-user" style="font-size: 16px"></i>
    <p id="data-horario-evento" style="font-size: 12px">
      Depositantes - ${nomeDepositantes}
    </p>
  </div>`;
}

function gerarHtmlDescricaoPatente(patente) {
  const partesDescricao = gerarDescricaoCompacta(patente.descricao);
  const idPatente = patente.keyFirebase;

  if (partesDescricao.possuiDescricaoEscondida) {
    return `
    <div class="container-descricao-patente" >
      <p 
        data-descricao-compacta-id=${idPatente}
        class="descricao-patente m-0"
      >
        ${partesDescricao.descricaoCompacta}... 
        <button 
          data-btn-mostrar-desc-id=${idPatente}
          class="btn-manipular-visualizacao-desc"
        >
          <i class="fas fa-caret-down"> </i>
          Ver mais
        </button>
      </p>


      <p 
        data-descricao-completa-id=${idPatente}
        class="descricao-patente descricao-patente-escondida m-0"
      >
        ${partesDescricao.descricaoCompleta}
        <button 
          data-btn-esconder-desc-id=${idPatente}
          class="btn-manipular-visualizacao-desc"
        >
          <i class="fas fa-caret-up"> </i>
          Ver menos
        </button>
      </p>
      
    </div>
  `;
  }

  return `
  <div class="container-descricao-patente" >
    <p 
      data-descricao-compacta-id=${idPatente}
      class="descricao-patente descricao-patente-escondida  m-0"
    >
      ${partesDescricao.descricaoCompacta}... 
      <button 
        data-btn-mostrar-desc-id=${idPatente}
        class="btn-manipular-visualizacao-desc "
      >
        <i class="fas fa-caret-down"> </i>
        Ver mais
      </button>
    </p>


    <p 
      data-descricao-completa-id=${idPatente}
      class="descricao-patente  m-0"
    >
      ${partesDescricao.descricaoCompleta}
      <button 
        data-btn-esconder-desc-id=${idPatente}
        class="btn-manipular-visualizacao-desc btn-escondido"
      >
        <i class="fas fa-caret-up"> </i>
        Ver menos
      </button>
    </p>
    
  </div>`;
}

function gerarDescricaoCompacta(descricaoPatente) {
  const partesDescricao = {
    descricaoCompleta: descricaoPatente,
    descricaoCompacta: "",
    possuiDescricaoEscondida: false,
  };

  if (descricaoPatente.length > MAX_DESCRIPTION_LENGTH) {
    partesDescricao.descricaoCompacta = descricaoPatente.substring(
      0,
      MAX_DESCRIPTION_LENGTH
    );
    partesDescricao.possuiDescricaoEscondida = true;
  }

  return partesDescricao;
}

function gerarBtnsVerDepositantesMapa(depositantes) {
  return depositantes
    .map((depositante, index) => {
      return `
        <a
          id="btn-evento1"
          class="d-flex align-items-center justify-content-center btn-ver-mapa ml-2"
          href="index.html"
          target="_blank"
          data-key="${depositante.id}"
        >
          <p class="texto-btn-evento1">Ver ${index + 1}º depositante no mapa</p>
        </a>
        `;
    })
    .join("");
}

function addEventoMostrarEsconderDescricao(patentes) {
  patentes.forEach((patente) => {
    const idPatente = patente.keyFirebase;

    const btnMostrarDesc = document.querySelector(
      `[data-btn-mostrar-desc-id=${idPatente}]`
    );
    const btnEsconderDesc = document.querySelector(
      `[data-btn-esconder-desc-id=${idPatente}]`
    );
    const elementoDescricaoCompleta = document.querySelector(
      `[data-descricao-completa-id=${idPatente}]`
    );
    const elementoDescricaoCompacta = document.querySelector(
      `[data-descricao-compacta-id=${idPatente}]`
    );

    btnEsconderDesc.addEventListener("click", () => {
      elementoDescricaoCompacta.classList.remove("descricao-patente-escondida");
      elementoDescricaoCompleta.classList.add("descricao-patente-escondida");
    });

    btnMostrarDesc.addEventListener("click", () => {
      elementoDescricaoCompacta.classList.add("descricao-patente-escondida");
      elementoDescricaoCompleta.classList.remove("descricao-patente-escondida");
    });
  });
}

function addEventoMostrarPatentesNoMapa() {
  const patentesGeradas = document.querySelectorAll(".btn-ver-mapa");
  patentesGeradas.forEach((patenteGerada) => {
    const keyFirebase = patenteGerada.getAttribute("data-key");
    patenteGerada.addEventListener("click", () => mostrarNoMapa(keyFirebase));
  });
}

function mostrarNoMapa(keyFirebase) {
  localStorage.setItem("eventoMarker", keyFirebase);
}
