let dataPublicacaoPatente;
let depositantesCarregados = [];
const instanciaEntidadeDao = new entidadeDAO();

$(document).ready(() => {
  $("#datetimePickerPatente").on("change.datetimepicker", function (e) {
    dataPublicacaoPatente = e.date.format("DD/MM/YYYY");
  });
});

const marcadoresCollection = firebaseDatabase.ref("/marcadores");

const selectTipoDepositate = document.getElementById(
  "selectTipoDepositantePatente"
);
selectTipoDepositate.onchange = async function (event) {
  const tipoEntidadeSelecionado = event.target.value;

  if (
    tipoEntidadeSelecionado !== "NAO_SELECIONADO" &&
    tipoEntidadeSelecionado
  ) {
    limparSelectOpcoesDepositante();
    habilitarSelectOpcoesDepositante();
    await adicionarOpcoesDepositantesSelect(tipoEntidadeSelecionado);
  }
};

const selectOpcoesDepositante = document.getElementById(
  "selectOpcoesDepositantePatente"
);

const inputTitulo = document.getElementById("validacaoTituloPatente");
const selectClassificacao = document.getElementById(
  "validacaoClassificacaoPatente"
);
const inputDescricao = document.getElementById("areaTextoDescricaoPatente");
const inputDepositante = document.getElementById("validacaoDepositantePatente");
const inputNumeroPedidoInpi = document.getElementById(
  "validacaoNumeroPedidoInpi"
);

async function adicionarOpcoesDepositantesSelect(tipoEntidadeSelecionado) {
  depositantesCarregados = await carregarDepositatesPorTipo(
    tipoEntidadeSelecionado
  );

  if (depositantesCarregados.length === 0) {
    alert("Não existe nenhuma entidade cadastrada nesta categoria");
    desabilitarSelectOpcoesDepositante();
    return;
  }

  depositantesCarregados.forEach((entidade) => {
    const opcaoSelect = document.createElement("option");
    opcaoSelect.setAttribute("value", entidade.getMarkerKey());
    opcaoSelect.setAttribute("data-total-patentes", 0);

    opcaoSelect.innerText = entidade.nome;
    selectOpcoesDepositante.appendChild(opcaoSelect);
  });
}

async function carregarDepositatesPorTipo(tipoEntidadeSelecionado) {
  const depositantes = await instanciaEntidadeDao.buscarPorTipo(
    tipoEntidadeSelecionado
  );

  depositantesCarregados = depositantes;

  return depositantes;
}

function gravarCadastroPatenteRegistro() {
  const patente = new Patente();
  const patenteDAO = new PatenteDAO();

  patente.titulo = inputTitulo.value;
  patente.classificacao = selectClassificacao.value;
  patente.descricao = inputDescricao.value;
  patente.depositante = inputDepositante.value;

  patente.numeroPedidoInpi = inputNumeroPedidoInpi.value;
  patente.dataPublicacao = dataPublicacaoPatente;

  patente.userId = firebase.auth().currentUser.uid;
  patente.validacao = false;

  patenteDAO.salvarPatente(patente);
}

function limparFormularioPatente() {
  inputTitulo.value = "";

  selectTipoDepositate.value = "NAO_SELECIONADO";
  selectClassificacao.value = "NAO_SELECIONADO";
  limparSelectOpcoesDepositante();

  document.getElementById("areaTextoDescricaoPatente").value = "";
  document.getElementById("validacaoNumeroPedidoInpi").value = "";
}

function limparSelectOpcoesDepositante() {
  entidadesCarregadas = [];

  selectOpcoesDepositante.innerHTML = "";
  desabilitarSelectOpcoesDepositante();

  const opcaoPadrao = document.createElement("option");
  opcaoPadrao.value = "NAO_SELECIONADO";
  opcaoPadrao.innerText = "Selecionar...";

  selectOpcoesDepositante.appendChild(opcaoPadrao);
  selectOpcoesDepositante.value = "NAO_SELECIONADO";
}

function desabilitarSelectOpcoesDepositante() {
  selectOpcoesDepositante.disabled = true;
}

function habilitarSelectOpcoesDepositante() {
  selectOpcoesDepositante.disabled = false;
}

async function salvarPatente() {
  try {
    const patenteDAO = new PatenteDAO();
    const novaPatente = gerarObjetoNovaPatente();
    await patenteDAO.salvarPatente(novaPatente);
    atualizarTotalPatentesEntidade(novaPatente.idDepositante);
  } catch (error) {
    window.alert(error.message);
  }
}

function gerarObjetoNovaPatente() {
  const titulo = inputTitulo.value;
  const classificao = selectClassificacao.value;
  const descricao = inputDescricao.value;
  const numeroPedidoInpi = inputNumeroPedidoInpi.value;
  const idDepositante = selectOpcoesDepositante.value;

  const entidadeSelecionada = depositantesCarregados.find(
    (entidade) => entidade.getMarkerKey() === idDepositante
  );

  if (!entidadeSelecionada) {
    throw new Error("Depositante não selecionado");
  }

  const novaPatente = new Patente();
  novaPatente.titulo = titulo;
  novaPatente.descricao = descricao;
  novaPatente.idDepositante = idDepositante;
  novaPatente.numeroPedidoInpi = numeroPedidoInpi;
  novaPatente.dataPublicacao = dataPublicacaoPatente;
  novaPatente.classificacao = classificao;

  novaPatente.nomeDepositante = entidadeSelecionada.getNome();
  novaPatente.userId = firebase.auth().currentUser.uid;

  if (patenteTemCamposInvalidos(novaPatente)) {
    throw new Error("Campos inválidos");
  }

  return novaPatente;
}

function patenteTemCamposInvalidos(patente) {
  let temCamposInvalidos = false;

  const propriedadesIgnoradas = ["keyFirebase"];

  Object.keys(patente).forEach((propriedade) => {
    if (propriedadesIgnoradas.includes(propriedade)) {
      return;
    }

    if (patente[propriedade] === "") {
      temCamposInvalidos = true;
    }
  });

  return temCamposInvalidos;
}

function atualizarTotalPatentesEntidade(idDepositante) {
  const elementoOptionSelecionado =
    selectOpcoesDepositante.options[selectOpcoesDepositante.selectedIndex];

  const totalPatentes =
    Number(elementoOptionSelecionado.dataset.totalPatentes) + 1;

  const entidadeSelecionada = depositantesCarregados.find(
    (entidade) => entidade.getMarkerKey() === idDepositante
  );
  entidadeSelecionada.totalPatentes = totalPatentes;
  instanciaEntidadeDao.atualizarEntidade(entidadeSelecionada);
}
