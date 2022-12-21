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

  const rotuloBarraBusca = `Tipo de Busca: por ${tipoBuscaLabel}`;
  refBarraBuscaMobile.setAttribute("placeholder", rotuloBarraBusca);

  // refBarraBuscaDesktop.setAttribute("placeholder", rotuloBarraBusca);
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
