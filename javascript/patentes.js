const database = firebase.database();
const storage = firebase.storage();

let patentesCarregadas = [];

let tipoBuscaSelecionado = "TITULO";

let refBarraBuscaMobile;
let refBarraBuscaDesktop;

function definirRefsBarrasBusca() {
  refBarraBuscaMobile = document.getElementById("barraBuscaPatentesMobile");
  refBarraBuscaDesktop = document.getElementById("barraBuscaPatentesDesktop");
}

async function listarTodasPatentes() {
  const patenteDAO = new PatenteDAO();
  patentesCarregadas = await patenteDAO.listarTodasPatentes();

  const parametroIdPatenteBuscada = findGetParameter("key");

  if (parametroIdPatenteBuscada) {
    const patenteBuscada = patentesCarregadas.find(
      (patente) => patente.keyFirebase === parametroIdPatenteBuscada
    );

    gerarListaPatentesHtml([patenteBuscada]);
    return;
  }

  gerarListaPatentesHtml(patentesCarregadas);
}

function limparBarrasDeBusca() {
  refBarraBuscaMobile.setAttribute("value", "");
  // refBarraBuscaDesktop.setAttribute("value", "");
}

async function filtrarPatentesPorTipoBusca() {
  const palavraChave = refBarraBuscaMobile.value.toLowerCase();
  await filtrarPatentes(tipoBuscaSelecionado, palavraChave);
}

async function selecionarTipoBusca(opcaoBuscaSelecionada) {
  tipoBuscaSelecionado = opcaoBuscaSelecionada.getAttribute("data-texto");
  const tipoBuscaLabel = opcaoBuscaSelecionada.getAttribute("data-label");
  refBarraBuscaMobile.setAttribute("tipo-barra", tipoBuscaLabel);
  console.log(refBarraBuscaMobile)

  let tipoBuscaLabelTraducao = traducaoTipoBuscaLabel(tipoBuscaLabel);
  let labelPreTipo = i18next.t("patents.sectionPatents.barraDeBusca.labelPreTitulo");

  const rotuloBarraBusca = `${labelPreTipo} ${tipoBuscaLabelTraducao}`;
  refBarraBuscaMobile.setAttribute("placeholder", rotuloBarraBusca);

  // refBarraBuscaDesktop.setAttribute("placeholder", rotuloBarraBusca);
}

function traducaoTipoBuscaLabel(label){
  if(label == "título"){
    return i18next.t("patents.sectionPatents.barraDeBusca.tipo.titulo");
  } 
  else if(label == "depositante"){
    return i18next.t("patents.sectionPatents.barraDeBusca.tipo.depositante");
  }
  else if(label == "seção"){
    return i18next.t("patents.sectionPatents.barraDeBusca.tipo.secao");
  }
}

async function filtrarPatentes(tipoBusca, palavraChave) {
  console.log(tipoBusca, palavraChave);

  if (!palavraChave) {
    gerarListaPatentesHtml(patentesCarregadas);
    return;
  }

  switch (tipoBusca) {
    case "TITULO":
      filtrarPorTitulo(palavraChave);
      break;
    case "DEPOSITANTE":
      filtrarPorDepositante(palavraChave);
      break;

    case "SECAO":
      filtrarPorSecao(palavraChave);
      break;

    default:
      gerarListaPatentesHtml(patentesCarregadas);
      break;
  }
}

function filtrarPorTitulo(palavraChave) {
  const patentesFiltradas = patentesCarregadas.filter((patente) =>
    patente.titulo.toLowerCase().includes(palavraChave)
  );
  gerarListaPatentesHtml(patentesFiltradas);
}

function filtrarPorDepositante(palavraChave) {
  const patentesFiltradas = patentesCarregadas.filter((patente) => {
    const depositantesEncontrados = obterDepositantesQueIncluemPalavraChave(
      patente,
      palavraChave
    );
    return depositantesEncontrados.length > 0;
  });

  gerarListaPatentesHtml(patentesFiltradas);
}

function obterDepositantesQueIncluemPalavraChave(patente, palavraChave) {
  const depositantesEncontrados = patente.depositantes.filter((depositante) =>
    depositante.nome.toLowerCase().includes(palavraChave)
  );

  return depositantesEncontrados;
}

function filtrarPorSecao(palavraChave) {
  const patentesFiltradas = patentesCarregadas.filter((patente) => {
    const secoesEncontradas = obterSecoesQueIncluemPalavraChave(
      patente.secoes,
      palavraChave
    );

    return secoesEncontradas.length > 0;
  });

  gerarListaPatentesHtml(patentesFiltradas);
}

function obterSecoesQueIncluemPalavraChave(secoes, palavraChave) {
  const secoesEncontradas = secoes.filter((secao) =>
    secao.toLowerCase().includes(palavraChave)
  );

  return secoesEncontradas;
}

window.onload = async function () {
  definirRefsBarrasBusca();
  limparBarrasDeBusca();
  await listarTodasPatentes();
};

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substring(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

/**Tradução placeholder barra de busca */
i18next.on('languageChanged', function(lng) {
  traducaoDoPlaceHolderBarraBuscaPatentesMobile();
})

function traducaoDoPlaceHolderBarraBuscaPatentesMobile() {
  let tipoBarra = refBarraBuscaMobile.getAttribute("tipo-barra");
  let placeholderBuscaPatentes =  document.getElementsByName("barraBuscaPatentesMobile")[0];
  if (tipoBarra == "título") {
    placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.titulo");
  }
  else if(tipoBarra == "depositante"){
    placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.depositante");
  }
  else if(tipoBarra == "seção"){
    placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.secao");
  }
 }