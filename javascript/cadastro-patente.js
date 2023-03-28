const instanciaEntidadeDAO = new entidadeDAO();
const patenteDAO = new PatenteDAO();

const database = firebase.database();

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}/${
  currentDate.getMonth() + 1
}/${currentDate.getFullYear()}`;

let dataPublicacoPatente = formattedDate;

let depositantesCarregados = [];
let depositantesSelecionados = [];

$(document).ready(() => {
  $("#datetimePickerPatente").datetimepicker({
    format: "DD/MM/YYYY",
    defaultDate: new Date(),
  });

  $("#datetimePickerPatente").on("change.datetimepicker", function (e) {
    dataPublicacoPatente = e.date.format("DD/MM/YYYY");
  });
});

const selectTipoDepositate = document.getElementById(
  "selectTipoDepositantePatente"
);

const selectOpcoesDepositante = document.getElementById(
  "selectOpcoesDepositantePatente"
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

function desabilitarSelectOpcoesDepositante() {
  selectOpcoesDepositante.disabled = true;
}

function habilitarSelectOpcoesDepositante() {
  selectOpcoesDepositante.disabled = false;
}

async function carregarDepositatesPorTipo(tipoEntidadeSelecionado) {
  const depositantes = await instanciaEntidadeDAO.buscarPorTipo(
    tipoEntidadeSelecionado
  );

  depositantesCarregados = depositantes;

  return depositantes;
}

const btnAdicionarPatente = document.getElementById("btnAddPatente");
btnAdicionarPatente.addEventListener("click", () => {
  const idDepositanteSelecionado = selectOpcoesDepositante.value;
  addNovoDepositanteSelecionado(idDepositanteSelecionado);
});

function addNovoDepositanteSelecionado(idDepositante) {
  const depositanteJaSelecionado = depositantesSelecionados.find(
    (depositanteSelecionado) =>
      depositanteSelecionado.getMarkerKey() === idDepositante
  );

  if (depositanteJaSelecionado) {
    alert("Este depositante já foi selecionado");
    limparSelecaoDepositantes();
    return;
  }

  const depositante = depositantesCarregados.find(
    (depositanteCarregado) =>
      depositanteCarregado.getMarkerKey() === idDepositante
  );

  addCardDepositante(depositante);
}

function addCardDepositante(depositante) {
  const containerCardsDepositante = document.getElementById(
    "containerDepositantes"
  );

  const card = gerarCardDepositante(depositante);

  if (depositantesSelecionados.length === 0) {
    containerCardsDepositante.innerHTML = "";
  }

  containerCardsDepositante.appendChild(card);
  depositantesSelecionados.push(depositante);

  limparSelecaoDepositantes();
}

function gerarCardDepositante(depositante) {
  const card = document.createElement("div");
  card.classList.add("depositante-selecionado");
  card.classList.add("col-12");

  const titulo = document.createElement("p");
  titulo.classList.add("m-0");
  titulo.innerText = depositante.getNome();

  const btnRemove = gerarBtnRemoverDepositanteSelecionado(depositante);

  card.appendChild(titulo);
  card.appendChild(btnRemove);

  return card;
}

function gerarBtnRemoverDepositanteSelecionado(depositante) {
  const btnRemove = document.createElement("button");
  btnRemove.classList.add("btn");
  btnRemove.classList.add("btn-ghost");
  btnRemove.classList.add("btn-remove-depositante");

  btnRemove.setAttribute("type", "button");
  btnRemove.setAttribute("data-id", depositante.getMarkerKey());

  btnRemove.addEventListener("click", function () {
    const idDepositante = this.dataset.id;

    const depositantesSelecionadosRestantes = depositantesSelecionados.filter(
      (depositanteSelecionado) =>
        depositanteSelecionado.getMarkerKey() !== idDepositante
    );

    atualizarListaDepositantesSelecionados(depositantesSelecionadosRestantes);
  });

  const btnIcon = document.createElement("i");
  btnIcon.classList.add("fas");
  btnIcon.classList.add("fa-trash");

  btnRemove.appendChild(btnIcon);

  return btnRemove;
}

function atualizarListaDepositantesSelecionados(
  depositantesSelecionadosRestantes
) {
  const containerCardsDepositante = document.getElementById(
    "containerDepositantes"
  );

  depositantesSelecionados = depositantesSelecionadosRestantes;
  containerCardsDepositante.innerHTML = "";

  if (depositantesSelecionados.length > 0) {
    depositantesSelecionados.forEach((depositante) => {
      const card = gerarCardDepositante(depositante);
      containerCardsDepositante.appendChild(card);
    });
    return;
  }

  containerCardsDepositante.innerHTML =
    "<p>Nenhum depositante adicionado...</p>";
}

const btnSalvarPatente = document.getElementById("btnSalvarPatente");
btnSalvarPatente.addEventListener("click", async function () {
  this.disabled = true;
  await salvarPatente();
  this.disabled = false;
});

async function salvarPatente() {
  try {
    await trySalvarPatente();
  } catch (error) {
    alert(error.message);
  }
}

async function trySalvarPatente() {
  const dadosPatente = obterDadosPatenteForm();
  validarDadosPatente(dadosPatente);
  await patenteDAO.salvarPatente(dadosPatente);

  depositantesSelecionados.forEach(async (depositante) => {
    depositante.totalPatentes += 1;
    await instanciaEntidadeDAO.atualizarEntidade(depositante);
  });

  $("#modalAgradecimento").modal("show");
  limparFormulario();
}

function obterDadosPatenteForm() {
  const titulo = obterValorInputPorId("tituloPatente");
  const descricao = obterValorInputPorId("descricaoPatente");
  const secoes = obterSecoesPatenteForm();
  const classificacoes = obterValorInputPorId("classificacoesPatente");
  const numeroPedidoInpi = obterValorInputPorId("numeroPedidoInpi");

  const dadosPatente = {
    titulo,
    descricao,
    secoes,
    classificacoes,
    numeroPedidoInpi,
    dataPublicacoPatente,
    depositantes: gerarDepositanteParaSalvar(depositantesSelecionados),
    userId: firebase.auth().currentUser.uid,
  };

  return dadosPatente;
}

function validarDadosPatente(dadosPatente) {
  Object.keys(dadosPatente).forEach((propertyKey) => {
    if (
      propertyKey !== "classificacoes" &&
      propertyKey !== "depositantes" &&
      !dadosPatente[propertyKey]
    ) {
      throw new Error("Preencha todas as informações obrigatórias");
    }
  });

  if (dadosPatente.secoes.length === 0) {
    throw new Error("Selecione pelo menos uma seção para a patente");
  }

  if (dadosPatente.depositantes.length === 0) {
    throw new Error("Selecione pelo menos um depositante da patente");
  }
}

function obterValorInputPorId(id) {
  return document.getElementById(id).value;
}

function obterSecoesPatenteForm() {
  const checkboxesSecaoPatente = document.querySelectorAll(
    "[name='checkboxSecaoPatente']"
  );

  const secoesSelecionadas = [];
  checkboxesSecaoPatente.forEach((checkbox) => {
    if (checkbox.checked) {
      secoesSelecionadas.push(checkbox.value);
    }
  });

  return secoesSelecionadas;
}

function gerarDepositanteParaSalvar(depositantes) {
  if (depositantes.length === 0) {
    return [];
  }

  return depositantes.map((depositante) => ({
    id: depositante.getMarkerKey(),
    nome: depositante.getNome(),
  }));
}

function limparFormulario() {
  limparInputById("tituloPatente");
  limparInputById("descricaoPatente");

  limparCheckboxSecoes();

  limparInputById("classificacoesPatente");
  limparInputById("numeroPedidoInpi");

  dataPublicacoPatente = formattedDate;
  depositantesSelecionados = [];

  limparSelecaoDepositantes();
  limparDepositantesSelecionados();
}

function limparInputById(id) {
  document.getElementById(id).value = "";
}

function limparCheckboxSecoes() {
  const checkboxesSecaoPatente = document.querySelectorAll(
    "[name='checkboxSecaoPatente']"
  );

  checkboxesSecaoPatente.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

function limparSelecaoDepositantes() {
  limparSelectOpcoesDepositante();
  selectTipoDepositate.value = "NAO_SELECIONADO";
}

function limparDepositantesSelecionados() {
  const containerCardsDepositante = document.getElementById(
    "containerDepositantes"
  );

  containerCardsDepositante.innerHTML =
    "<p>Nenhum depositante adicionado...</p>";
}

document.onreadystatechange = function () {
  verificarUsuarioLogado();
  if (document.readyState === "complete") {
  }
};

function verificarUsuarioLogado() {
  const usuarioLogadoKey = localStorage.getItem("usuarioLogadoKey");

  if (!usuarioLogadoKey) {
    location.href = "login.html";
  }
}
