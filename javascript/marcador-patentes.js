const modalListagemPatentes = document.getElementById("modalListagemPatentes");

let patentesCadastradas = [];

const patenteDAOMarcador = new PatenteDAO();
patenteDAOMarcador.listarTodasPatentes().then((patentes) => {
  patentesCadastradas = patentes;
});

async function mostrarModalListagemPatentes(elementoClicado) {
  const idDepositanteSelecionado = elementoClicado.dataset.key;

  const patentesDepositante = patentesCadastradas.filter(
    (patenteCadastrada) => {
      const idDepositantesPatente = patenteCadastrada.depositantes.map(
        (depositante) => depositante.id
      );

      return idDepositantesPatente.includes(idDepositanteSelecionado);
    }
  );

  gerarListaPatentesHtml(patentesDepositante);
  $("#modalListagemPatentes").modal("show");
}

const MAX_DESCRIPTION_LENGTH = 200;

function gerarListaPatentesHtml(patentes) {
  listarPatentesHtml(patentes);
  addEventoMostrarEsconderDescricao(patentes);
}

function listarPatentesHtml(patentes) {
  const elementoListaPatentes = document.querySelector("#listaPatentes");

  if (patentes.length === 0) {
    elementoListaPatentes.innerHTML = `<p>Aguardando validação de patentes pelo sistema...`;
    return;
  }

  const htmlItemsListaPatentes = patentes.map((patente) =>
    gerarHtmlPatenteLista(patente)
  );

  elementoListaPatentes.innerHTML = htmlItemsListaPatentes.join("");
}

function gerarHtmlPatenteLista(patente) {
  const htmlDescricaoPatente = gerarHtmlDescricaoPatente(patente);
  const depositantes = gerarTextoDepositantesPatenteModal(patente.depositantes);

  return `
  <div>
    <div>
      <div class="card-patente">
        <div class="card-patente-conteudo mb-3">
          <h5 id="titulo-patente">${patente.titulo}</h5>${htmlDescricaoPatente}
          <div>
            <div id="dados-patente-autoria">
              <div class="d-flex align-items-center justify-content-start dados-patente">
                <i class="fas fa-user" style="font-size: 16px"></i>
                <p id="data-horario-evento">${depositantes}</p>
              </div>

              <div
                style="margin-top: 8px"
                class="d-flex align-items-center justify-content-start dados-patente"
              >
                <i class="fas fa-calendar-alt" style="font-size: 16px"></i>
                <p id="endereco-evento" style="font-size: 11px">
                  Publicação - ${patente.dataPublicacao}
                </p>
              </div>

              <div
                style="margin-top: 8px"
                class="d-flex align-items-center justify-content-start dados-patente"
              >
                <i class="fas fa-key" style="font-size: 16px"></i>
                <p id="endereco-evento" style="font-size: 11px">
                  Nº de Pedido no INPI - ${patente.numeroPedidoInpi}
                </p>
              </div>
            </div>
          </div>

          <div 
            class="
              d-flex 
              align-items-center 
              justify-content-end 
              mt-2"
          >
            <button
              class="
                d-flex 
                align-items-center 
                justify-content-center 
                btn 
                btn-success 
                btn-ver-descricao-patente-modal
              "
            >
              <a href="/patentes.html?key=${patente.keyFirebase}">
                Ver Mais Informações
              </a>
            </button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
  `;
}

function gerarHtmlDescricaoPatente(patente) {
  const partesDescricao = gerarDescricaoCompacta(patente.descricao);
  const idPatente = patente.keyFirebase;

  if (partesDescricao.possuiDescricaoEscondida) {
    return gerarHtmlDescricaoDinamica(partesDescricao, idPatente);
  }

  return gerarHtmlDescricaoCompletaFixa(partesDescricao, idPatente);
}

function gerarHtmlDescricaoCompletaFixa(partesDescricao, idPatente) {
  return `
      <div class="container-descricao-patente" >
        <p 
          data-descricao-compacta-id=${idPatente}
          class="descricao-patente descricao-patente-escondida"
        >
          ${partesDescricao.descricaoCompacta}... 
          <button 
            data-btn-mostrar-desc-id=${idPatente}
            class="btn-manipular-visualizacao-desc"
            style="display: none"
          >
            <i class="fas fa-caret-down"> </i>
            Ver mais
          </button>
        </p>

        <p 
          data-descricao-completa-id=${idPatente}
          class="descricao-patente"
        >
          ${partesDescricao.descricaoCompleta}
          <button 
            data-btn-esconder-desc-id=${idPatente}
            class="btn-manipular-visualizacao-desc"
            style="display: none"
          >
            <i class="fas fa-caret-up"> </i>
            Ver menos
          </button>
        </p>
        
      </div>
    `;
}

function gerarHtmlDescricaoDinamica(partesDescricao, idPatente) {
  return `
      <div class="container-descricao-patente" >
        <p 
          data-descricao-compacta-id=${idPatente}
          class="descricao-patente"
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
          class="descricao-patente descricao-patente-escondida"
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

function gerarTextoDepositantesPatenteModal(depositantes) {
  return depositantes.map((depositante) => depositante.nome).join(", ");
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
