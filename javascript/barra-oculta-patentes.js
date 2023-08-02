let patentesListaOculta = [];

async function gerarListaPatentesOculta(filtroBuscaNome = "") {
  const patenteDAO = new PatenteDAO();
  patentesListaOculta = await patenteDAO.listarTodasPatentes();
  gerarHtmlListaOcultaPatentes(filtroBuscaNome);
}

function gerarHtmlListaOcultaPatentes(filtroBuscaNome) {
  const listaPatentesOculta = document.querySelector("#cartao");
  const patentesFiltradas = patentesListaOculta.filter((patente) =>
    patente.titulo.toLowerCase().includes(filtroBuscaNome.toLowerCase())
  );
  const itemsPatente = patentesFiltradas.map((patente) => {
    return gerarHtmlPatenteListaOculta(patente);
  });

  listaPatentesOculta.innerHTML = itemsPatente.join(" ");
  addEventoMostrarEsconderDescricao(patentesFiltradas);
}

function gerarHtmlPatenteListaOculta(patente) {
  const htmlDescricaoPatente = gerarHtmlDescricaoPatente(patente);
  const depositantes = gerarTextoDepositantesPatente(patente.depositantes);

  return `
  <div class="card-patente-barra" id="card-patente">
    <h5 class="card-patente-titulo">${patente.titulo}</h5>
    ${htmlDescricaoPatente}

    <div class="d-flex align-items-center justify-content-start info-patente mt-3">
      <i class="fas fa-user"></i>
      <p class="mb-0 ml-2">
        <span class="patente-depositante">${i18next.t("barraLateral.cards.cardsPatentes.depositantes")}</span>
        : ${depositantes}
      </p>
    </div>

    <div
      style="margin-top: 8px"
      class="d-flex align-items-center justify-content-start  info-patente"
    >
      <i class="fas fa-calendar-alt "></i>
      <p class="mb-0 ml-2">
        <span class="patente-publicacao">${i18next.t("barraLateral.cards.cardsPatentes.publicacao")}</span> 
        - ${patente.dataPublicacao}
      </p>
    </div>

    <div
      style="margin-top: 8px"
      class="d-flex align-items-center justify-content-start  info-patente"
    >
      <i class="fas fa-key"></i>
      <p class="mb-0 ml-2">
        <span class="patente-numeroDoPedido">${i18next.t("barraLateral.cards.cardsPatentes.numeroDoPedido")}</span> 
          - ${patente.numeroPedidoInpi}
      </p>
    </div>

    <button 
      class="
        d-flex 
        align-items-center 
        justify-content-center 
        btn btn-success 
        btn-ver-descricao-patente
        mt-3
      "
    >
      <a href="/patentes.html?key=${patente.keyFirebase}" 
        class="patente-btnVerMais">
        ${i18next.t("barraLateral.cards.cardsPatentes.btnVerMais")}
      </a>
    </button>
  </div>
  `;
}

/**Tradução card Patente */
i18next.on('languageChanged', function(lng) {
  const CARD_PATENTE = document.getElementById("card-patente");
  if (CARD_PATENTE){
    const TXT_DEPOSITANTE = document.querySelectorAll(".patente-depositante");
    const TXT_PUBLICAOCAO = document.querySelectorAll(".patente-publicacao");
    const TXT_NUMERO_DO_PEDIDO = document.querySelectorAll(".patente-numeroDoPedido");
    const TXT_BTN_PATENTE = document.querySelectorAll(".patente-btnVerMais");
    const TXT_BTN_VER_MAIS = document.querySelectorAll(".patente-ver-mais");
    const TXT_BTN_VER_MENOS = document.querySelectorAll(".patente-ver-menos");

    TXT_DEPOSITANTE.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.depositantes");
    });

    TXT_PUBLICAOCAO.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.publicacao");
    });

    TXT_NUMERO_DO_PEDIDO.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.numeroDoPedido");
    });

    TXT_BTN_PATENTE.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.btnVerMais");
    });

    TXT_BTN_VER_MAIS.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.verMais");
    });

    TXT_BTN_VER_MENOS.forEach((element) => {
      element.innerHTML = i18next.t("barraLateral.cards.cardsPatentes.verMenos");
    });
  }
});

function gerarHtmlDescricaoPatente(patente) {
  const partesDescricao = gerarDescricaoCompacta(patente.descricao);
  const idPatente = patente.keyFirebase;

  if (partesDescricao.possuiDescricaoEscondida) {
    return `
    <div class="container-descricao-patente" >
      <p 
        data-descricao-compacta-id=${idPatente}
        class="descricao-patente m-0"
        style="font-size: 12px;"
      >
        ${partesDescricao.descricaoCompacta}... 
        <button 
          data-btn-mostrar-desc-id=${idPatente}
          class="btn-manipular-visualizacao-desc"
        >
          <i class="fas fa-caret-down"> </i>
          <span 
            class="patente-ver-mais"
            data-18n="barraLateral.cards.cardsPatentes.verMais">
            Ver mais
          </span>
        </button>
      </p>


      <p 
        data-descricao-completa-id=${idPatente}
        class="descricao-patente descricao-patente-escondida m-0"
        style="font-size: 12px;"
      >
        ${partesDescricao.descricaoCompleta}
        <button 
          data-btn-esconder-desc-id=${idPatente}
          class="btn-manipular-visualizacao-desc"
        >
          <i class="fas fa-caret-up"> </i>
          <span class="patente-ver-menos"
            data-18n="barraLateral.cards.cardsPatentes.verMenos">
            Ver menos
          </span>
        </button>
      </p>
      
    </div>
  `;
  }

  return `
  <div class="container-descricao-patente"  >
    <p 
      data-descricao-compacta-id=${idPatente}
      class="descricao-patente descricao-patente-escondida  m-0"
      style="font-size: 12px;"
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
      style="font-size: 12px;"
    >
      ${partesDescricao.descricaoCompleta}
    </p>
    
  </div>`;
}

function gerarDescricaoCompacta(descricaoPatente) {
  const partesDescricao = {
    descricaoCompleta: descricaoPatente,
    descricaoCompacta: "",
    possuiDescricaoEscondida: false,
  };

  const MAX_DESCRIPTION_LENGTH = 100;

  if (descricaoPatente.length > MAX_DESCRIPTION_LENGTH) {
    partesDescricao.descricaoCompacta = descricaoPatente.substring(
      0,
      MAX_DESCRIPTION_LENGTH
    );
    partesDescricao.possuiDescricaoEscondida = true;
  }

  return partesDescricao;
}

function gerarTextoDepositantesPatente(depositantes) {
  const primeiroDepositante = depositantes[0].nome;

  if (depositantes.length === 1) {
    return primeiroDepositante;
  }

  return `${primeiroDepositante} e +${depositantes.length - 1}`;
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

    if (btnEsconderDesc) {
      btnEsconderDesc.addEventListener("click", () => {
        elementoDescricaoCompacta.classList.remove(
          "descricao-patente-escondida"
        );
        elementoDescricaoCompleta.classList.add("descricao-patente-escondida");
      });
    }

    if (btnMostrarDesc) {
      btnMostrarDesc.addEventListener("click", () => {
        elementoDescricaoCompacta.classList.add("descricao-patente-escondida");
        elementoDescricaoCompleta.classList.remove(
          "descricao-patente-escondida"
        );
      });
    }
  });
}
