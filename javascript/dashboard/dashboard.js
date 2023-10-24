//variaveis
const dbMarcadores = firebase.database().ref("marcadores");
const dbPatentes = firebase.database().ref("patentes");
const selectRegioesPorCategoria = document.getElementById(
  "selectRegioesPorCategoria"
);

let arrayRegioes = [];
let arrayComunidades = [];
let arrayCategoriaDeEntidade = [];
let arrayPatentes = [];
let arraySegmentosStartup = [];

let arrayStartupsFases = [];
//chamada de funções
carregarTabaleCategoriasDeEntidade(0, 4);
carregarDadosGraficos();
ajudaModal();
async function carregarDadosGraficos() {
  arrayCategoriaDeEntidade = await contarTotalEntidade();
  arrayCategoriaDeEntidade = adicionarDadosNaMatrizCategoriaDeEntidade(
    arrayCategoriaDeEntidade
  );
  arrayPatentes = await adicionarDadosMatrizPatentes();

  arraySegmentosStartup = await carregarClassificacoesStartup();
  arraySegmentosStartup = await adicionarDadosMatrizSegmentosStartup(
    arraySegmentosStartup
  );

  arrayStartupsFases = await adicionarDadosMatrizFasesStartups();
  mudarSelectParaSegmentos();

  carregarDadosMapa().then((entidades) => {
    let quantidadeEntidadesPorRegiao = atribuirQuantidade(entidades);

    arrayRegioes.push(["Regiões", "Total"]);
    arrayRegioes = adicionarDadosNaMatriz(
      quantidadeEntidadesPorRegiao,
      arrayRegioes
    );

    arrayComunidades.push(["Comunidade", "Total"]);
    arrayComunidades = adicionarDadosMatrizComunidade(
      quantidadeEntidadesPorRegiao,
      arrayComunidades
    );

    //arrayCategoriaDeEntidade;
    carregarTodosGraficos();
    $("#selectRegioesPorCategoria").change(function () {
      verificarSelectGraficoRegioesPorCategoria(
        quantidadeEntidadesPorRegiao,
        entidades
      );
    });
    $("#selectComunidadesPorRegiao").change(function () {
      verificarSelectGraficoComunidadesPorCategoria(
        quantidadeEntidadesPorRegiao,
        entidades
      );
    });
    $("#selectSegmentosStartups").change(function () {
      verificarSelectGraficoSegmentosStartups();
    });
    $("#selectCategoriasDeEntidade").change(async function () {
      await verificarSelectGraficoCategoriasDeEntidade();
    });
    $("#selectStartupsTipos").change(async function () {
      await verificarSelectStartups();
    });
    $("#selectStartupsFases").change(async function () {
      const selectStartupsFases = document.querySelector(
        "#selectStartupsFases"
      );
      if (selectStartupsFases.value === "Receitas") {
        document
          .getElementById("ajudaStartup")
          .setAttribute("data-target", ".modalreceitas");
        arrayStartupsFases = await adicionarDadosMatrizFasesPorReceitas();
        mudarSelectParaReceitas();
      } else if (selectStartupsFases.value === "Segmentos") {
        document
          .getElementById("ajudaStartup")
          .setAttribute("data-target", ".modalsegmentos");
        arrayStartupsFases = await adicionarDadosMatrizFasesStartups();
        mudarSelectParaSegmentos();
      } else if (selectStartupsFases.value === "Negocio") {
        arrayStartupsFases = await adicionarDadosMatrizFasesPorModeloDeNegocio();

        mudarSelectParaModeloDeNegocio();
      }
      google.charts.setOnLoadCallback(graficoStartup);
    });
  });
}

document.body.onresize = function () {
  if (document.body.clientWidth < 800 || document.body.clientWidth > 800) {
    carregarTodosGraficos();
  }
};
function carregarTodosGraficos() {
  google.charts.load("current", { packages: ["corechart"] });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(graficoComunidadesPorCategoria);
  google.charts.setOnLoadCallback(regioes);
  google.charts.setOnLoadCallback(graficoDepositantesPatentes);
  google.charts.setOnLoadCallback(graficoCategoriasDeEntidade);
  google.charts.setOnLoadCallback(graficoStartup);

  google.charts.load("current", { packages: ["treemap"] });
  google.charts.setOnLoadCallback(graficoSegmentosStartup);
  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
}

function graficoSegmentosStartup() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "ID");
  data.addColumn("string", "Parent");
  data.addColumn("number", "Valor");
  data.addRows(arraySegmentosStartup);

  var options = {
    highlightOnMouseOver: true,
    maxDepth: 1,
    maxPostDepth: 2,
    minColor: "#00b57f",
    midColor: "#00865e",
    maxColor: "#005c41",
    headerHeight: 15,
    fontColor: "white",
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    showScale: true,
    height: 400,
    useWeightedAverageForAggregation: true,
  };

  var chart = new google.visualization.TreeMap(
    document.getElementById("graficoSegmentosStartup")
  );
  chart.draw(data, options);
}

function regioes() {
  var data = google.visualization.arrayToDataTable(arrayRegioes);

  var options = {
    chartArea: { width: "40%", height: "90%" },
    colors: ["#019267", "#019267"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    hAxis: {
      minValue: 0,
      ticks: [],
    },
    vAxis: {},
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("graficoRegioesCategoria")
  );
  chart.draw(data, options);
}

function graficoComunidadesPorCategoria() {
  var data = google.visualization.arrayToDataTable(arrayComunidades);
  //var view = new google.visualization.DataView(data);
  var options = {
    title: "",
    width: "30%",
    height: "90%",
    colors: ["#019267"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    hAxis: { ticks: [] },
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("graficoComunidadesPorCategoria")
  );
  chart.draw(data, options);
}
function graficoStartup() {
  var data = google.visualization.arrayToDataTable(arrayStartupsFases);

  var options = {
    title: "",
    chartArea: { width: "40%", height: "90%" },
    colors: ["#019267", "#019267"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    hAxis: {
      title: "",
      minValue: 0,
      ticks: [],
    },
    vAxis: {},
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("graficoStartup")
  );
  chart.draw(data, options);
}
function graficoDepositantesPatentes() {
  var data = google.visualization.arrayToDataTable(arrayPatentes);

  var options = {
    title: "",
    width: "30%",
    height: "90%",
    colors: ["#019267"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    bar: { groupWidth: "95%" },
    legend: { position: "none" },
    hAxis: { ticks: [] },
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("graficoDepositantesPatentes")
  );
  chart.draw(data, options);
}

function graficoCategoriasDeEntidade() {
  var data = google.visualization.arrayToDataTable(arrayCategoriaDeEntidade);

  var options = {
    title: "",
    chartArea: { width: "40%", height: "90%" },
    colors: ["#019267", "#019267"],
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    hAxis: {
      title: "",
      minValue: 0,
      ticks: [],
    },
    vAxis: {},
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("graficoCategoriasDeEntidade")
  );
  chart.draw(data, options);
}

function adicionarQuantidade() {
  let quantidadeEntidadesPorRegiao = [];
  for (let i = 0; i < regioesArray.length; i++) {
    quantidadeEntidadesPorRegiao.push({
      regiao: regioesArray[i].regiao,
      quantidade: 0,
    });
  }
  return quantidadeEntidadesPorRegiao;
}
function contarQuantidadeEntidadesPorRegiao(
  entidade,
  quantidadeEntidadesPorRegiao
) {
  for (let i = 0; i < regioesArray.length; i++) {
    for (let j = 0; j < regioesArray[i].cidades.length; j++) {
      if (entidade.Cidade == regioesArray[i].cidades[j]) {
        quantidadeEntidadesPorRegiao[i].quantidade += 1;
      }
    }
  }
  return quantidadeEntidadesPorRegiao;
}
function carregarDadosMapa() {
  return new Promise((resolve, reject) => {
    dbMarcadores.on("value", (snapshot) => {
      resolve(snapshot);
    });
  });
}
function carregarDadosPatente() {
  return new Promise((resolve, reject) => {
    dbPatentes.on("value", (snapshot) => {
      resolve(snapshot);
    });
  });
}
function atribuirQuantidade(snapshot) {
  let quantidadeEntidadesPorRegiao = adicionarQuantidade();
  snapshot.forEach((data) => {
    entidade = data.val();
    if (entidade.Validacao == true) {
      quantidadeEntidadesPorRegiao = contarQuantidadeEntidadesPorRegiao(
        entidade,
        quantidadeEntidadesPorRegiao
      );
    }
  });
  return quantidadeEntidadesPorRegiao;
}

function contarTipoDeEntidadePorRegiao(snapshot, tipo) {
  let quantidadeEntidadesPorRegiao = adicionarQuantidade();
  snapshot.forEach((data) => {
    entidade = data.val();
    if (entidade.Tipo.includes(tipo) && entidade.Validacao == true) {
      quantidadeEntidadesPorRegiao = contarQuantidadeEntidadesPorRegiao(
        entidade,
        quantidadeEntidadesPorRegiao
      );
    }
  });
  return quantidadeEntidadesPorRegiao;
}

function adicionarDadosNaMatriz(quantidadeEntidadesPorRegiao, arrayRegioes) {
  for (let i = 0; i < quantidadeEntidadesPorRegiao.length; i++) {
    arrayRegioes.push([
      quantidadeEntidadesPorRegiao[i].regiao,
      quantidadeEntidadesPorRegiao[i].quantidade,
    ]);
  }
  return arrayRegioes;
}

function adicionarDadosMatrizComunidade(
  quantidadeEntidadesPorRegiao,
  arrayComunidades
) {
  arrayComunidades.push([
    "Rapadura Valley",
    quantidadeEntidadesPorRegiao[0].quantidade,
  ]);

  arrayComunidades.push([
    "Kariri Valley",
    quantidadeEntidadesPorRegiao[5].quantidade,
  ]);

  return arrayComunidades;
}

async function adicionarDadosMatrizPatentes() {
  let depositantes = await contarPatentesPorDepositante();
  let matriz = [];
  matriz.push(["nome", `${i18next.t("graficos.grafico7.quantidade")}`]);
  for (let i = 0; i < depositantes.length; i++) {
    matriz.push([depositantes[i].nome, depositantes[i].quantidade]);
  }
  return matriz;
}
async function adicionarDadosMatrizFasesStartups() {
  let fases = await contarQuantidadesDeFase();
  let matriz = [];
  let traducao = "";
  matriz.push(["Fase", `${i18next.t("graficos.grafico5.quantidade")}`]);
  for (let i = 0; i < fases.length; i++) {
    traducao = traducaoFasesStartups(fases[i].nome);
    matriz.push([`${i18next.t(`graficos.grafico5.fases.${traducao}`)}`, fases[i].quantidade]);
  }
  return matriz;
}
async function adicionarDadosMatrizFasesPorReceitas() {
  let fases = await contarQuantidadeDeFaseTodasReceitas();
  let matriz = [];
  let traducao = "";
  matriz.push(["Fase", `${i18next.t("graficos.grafico5.quantidade")}`]);
  for (let i = 0; i < fases.length; i++) {
    traducao = traducaoFasesStartups(fases[i].nome);
    matriz.push([`${i18next.t(`graficos.grafico5.fases.${traducao}`)}`, fases[i].quantidade]);
  }
  return matriz;
}
async function adicionarDadosMatrizFasesPorModeloDeNegocio() {
  let fases = await contarQuantidadeDeModeloDeReceitasDasFases();
  let matriz = [];
  let traducao = "";
  matriz.push(["Fase", `${i18next.t("graficos.grafico5.quantidade")}`]);
  for (let i = 0; i < fases.length; i++) {
    traducao = traducaoFasesStartups(fases[i].nome);
    matriz.push([`${i18next.t(`graficos.grafico5.fases.${traducao}`)}`, fases[i].quantidade]);
  }
  return matriz;
}
function traducaoFasesStartups(nome){
  if(nome == "Operação")
    return "operacao"
  else if(nome == "Validação")
    return "validacao"
  else if(nome == "Ideação")
    return "idedacao"
  else if(nome == "Tração")
    return "tracao"
  else if(nome == "Scale Up")
    return "scaleup"
}

async function adicionarDadosMatrizFasesPorTipoModeloDeNegocio(modelo) {
  let fases = await contarQuantidadeFasesDeUmModeloDeNegocio(modelo);
  let matriz = [];
  matriz.push(["Fase", "Quantidade"]);
  for (let i = 0; i < fases.length; i++) {
    matriz.push([fases[i].nome, fases[i].quantidade]);
  }
  return matriz;
}
async function adicionarDadosMatrizFasesPorTipoDeReceitas(receita) {
  let fases = await contarQuantidadeDeFasePorReceitas(receita);
  let matriz = [];
  matriz.push(["Fase", "Quantidade"]);
  for (let i = 0; i < fases.length; i++) {
    matriz.push([fases[i].nome, fases[i].quantidade]);
  }
  return matriz;
}

async function adicionarDadosMatrizFasesStartupsClassificacao(classificacao) {
  let fases = await contarQuantidadesDeFasePorClassificacao(classificacao);
  let matriz = [];
  matriz.push(["Fase", "Quantidade"]);
  for (let i = 0; i < fases.length; i++) {
    matriz.push([fases[i].nome, fases[i].quantidade]);
  }
  return matriz;
}

async function adicionarDadosMatrizSegmentosStartup(startups) {
  let matriz = [];
  matriz.push(["Root", null, 0]);
  for (let i = 0; i < startups.length; i++) {
    matriz.push([startups[i].classe, "Root", startups[i].quantidade]);
  }

  return matriz;
}
function adicionarDadosNaMatrizCategoriaDeEntidade(arrayObjetosComunidades) {
  let matriz = [];
  matriz.push(["Tipo de Entidade", "Total"]);
  for (let i = 0; i < arrayObjetosComunidades.length; i++) {
    matriz.push([
      arrayObjetosComunidades[i].nome,
      arrayObjetosComunidades[i].quantidade,
    ]);
  }
  return matriz;
}

function verificarSelectGraficoRegioesPorCategoria(
  quantidadeEntidadesPorRegiao,
  entidades
) {
  let valor = $("#selectRegioesPorCategoria").val();
  if (valor == "Todas") {
    quantidadeEntidadesPorRegiao = atribuirQuantidade(entidades);
  } else {
    quantidadeEntidadesPorRegiao = contarTipoDeEntidadePorRegiao(
      entidades,
      valor
    );
  }

  arrayRegioes = [];
  arrayRegioes.push(["Regiões", "Total"]);
  arrayRegioes = adicionarDadosNaMatriz(
    quantidadeEntidadesPorRegiao,
    arrayRegioes
  );

  google.charts.setOnLoadCallback(regioes);
}

function verificarSelectGraficoComunidadesPorCategoria(
  quantidadeEntidadesPorRegiao,
  entidades
) {
  let valor = $("#selectComunidadesPorRegiao").val();

  if (valor == "Todas") {
    quantidadeEntidadesPorRegiao = atribuirQuantidade(entidades);
  } else {
    quantidadeEntidadesPorRegiao = contarTipoDeEntidadePorRegiao(
      entidades,
      valor
    );
  }

  arrayComunidades = [];
  arrayComunidades.push(["Regiões", "Total"]);
  arrayComunidades = adicionarDadosMatrizComunidade(
    quantidadeEntidadesPorRegiao,
    arrayComunidades
  );

  google.charts.setOnLoadCallback(graficoComunidadesPorCategoria);
}

async function verificarSelectGraficoCategoriasDeEntidade() {
  let valor = $("#selectCategoriasDeEntidade").val();

  if (valor == "Todas") {
    arrayCategoriaDeEntidade = await contarTotalEntidade();
    arrayCategoriaDeEntidade = adicionarDadosNaMatrizCategoriaDeEntidade(
      arrayCategoriaDeEntidade
    );
  } else {
    arrayCategoriaDeEntidade = await contarTodosAsDeEntidadeDaRegiao(valor);
  }

  google.charts.setOnLoadCallback(graficoCategoriasDeEntidade);
}
async function verificarSelectGraficoSegmentosStartups() {
  let valor = $("#selectSegmentosStartups").val();

  if (valor === "Todas") {
    arraySegmentosStartup = await carregarClassificacoesStartup();
    arraySegmentosStartup = await adicionarDadosMatrizSegmentosStartup(
      arraySegmentosStartup
    );
  } else {
    arraySegmentosStartup = await contarTodosAsDeEntidadeDaRegiaoStartup(valor);
  }

  google.charts.setOnLoadCallback(graficoSegmentosStartup);
}
async function verificarSelectStartups() {
  const selectStartupsFases = document.querySelector("#selectStartupsFases");
  const selectStartupsTipos = document.querySelector("#selectStartupsTipos");

  if (selectStartupsFases.value == "Segmentos") {
    if (selectStartupsTipos.value == "Todas") {
      arrayStartupsFases = await adicionarDadosMatrizFasesStartups();
    } else {
      arrayStartupsFases = await adicionarDadosMatrizFasesStartupsClassificacao(
        selectStartupsTipos.value
      );
    }
  } else if (selectStartupsFases.value == "Negocio") {
    console.log(selectStartupsTipos.value)
    if (selectStartupsTipos.value == "Todas") {
      console.log("aqui")
      arrayStartupsFases = await adicionarDadosMatrizFasesPorModeloDeNegocio();

    } else {
      arrayStartupsFases = await adicionarDadosMatrizFasesPorTipoModeloDeNegocio(selectStartupsTipos.value)
    }
  }
  else if (selectStartupsFases.value == "Receitas") {
    if (selectStartupsTipos.value == "Todas") {
      arrayStartupsFases = await adicionarDadosMatrizFasesPorReceitas();
    } else {
      arrayStartupsFases = await adicionarDadosMatrizFasesPorTipoDeReceitas(
        selectStartupsTipos.value
      );
    }
  }
  google.charts.setOnLoadCallback(graficoStartup);
}
async function carregarTodosOsTiposDeEntidade() {
  const entidades = await carregarDadosMapa();

  let arrayObjetos = [];
  entidades.forEach((valor) => {
    valor = valor.val();
    let boolVerifica = true;
    for (let i = 0; i < arrayObjetos.length; i++) {
      if (arrayObjetos[i].nome == valor.Tipo) {
        boolVerifica = false;
      }
    }
    if (boolVerifica == true) {
      arrayObjetos.push({
        nome: valor.Tipo,
        quantidade: 0,
      });
    }
  });
  return arrayObjetos;
}
async function carregarTodasStartup() {
  const entidades = await carregarDadosMapa();
  let startup = [];
  entidades.forEach((entidade) => {
    entidade = entidade.val();
    if (entidade.Tipo === "Startup" && entidade.Validacao === true) {
      startup.push(entidade);
    }
  });
  return startup;
}
async function carregarStartupsPorClassificacao(classificacao) {
  const entidades = await carregarDadosMapa();
  let startup = [];
  entidades.forEach((entidade) => {
    entidade = entidade.val();
    if (
      entidade.Tipo === "Startup" &&
      entidade.Validacao === true &&
      entidade.Classificacao === classificacao
    ) {
      startup.push(entidade);
    }
  });

  return startup;
}

async function carregarClassificacoesStartup() {
  const startups = await carregarTodasStartup();
  let classficacoes = [];
  for (let i = 0; i < startups.length; i++) {
    let boolVerifica = true;
    for (let j = 0; j < classficacoes.length; j++) {
      if (startups[i].Classificacao == classficacoes[j].classe) {
        boolVerifica = false;
        classficacoes[j].quantidade++;
      }
    }
    if (boolVerifica) {
      classficacoes.push({
        classe: startups[i].Classificacao,
        quantidade: 1,
        cidade: startups[i].Cidade,
      });
    }
  }

  return classficacoes;
}

async function contarTotalEntidade() {
  let valor = await carregarTodosOsTiposDeEntidade();
  const entidades = await carregarDadosMapa();
  entidades.forEach((dados) => {
    dados = dados.val();

    for (let i = 0; i < valor.length; i++) {
      if (valor[i].nome == dados.Tipo && dados.Validacao == true) {
        valor[i].quantidade += 1;
      }
    }
  });

  return valor;
}

function retornarCidadesDeUmaRegiao(regiao) {
  for (let i = 0; i < regioesArray.length; i++) {
    if (regiao == regioesArray[i].regiao) {
      return regioesArray[i].cidades;
    }
  }
}

async function contarTodosAsDeEntidadeDaRegiao(regiao) {
  const entidades = await carregarDadosMapa();
  const cidades = retornarCidadesDeUmaRegiao(regiao);
  const todasEntidades = await carregarTodosOsTiposDeEntidade();
  entidades.forEach((valor) => {
    valor = valor.val();
    for (let i = 0; i < cidades.length; i++) {
      if (cidades[i] == valor.Cidade && valor.Validacao == true) {
        for (let j = 0; j < todasEntidades.length; j++) {
          if (todasEntidades[j].nome == valor.Tipo) {
            todasEntidades[j].quantidade += 1;
          }
        }
      }
    }
  });
  return adicionarDadosNaMatrizCategoriaDeEntidade(todasEntidades);
}

async function contarTodosAsDeEntidadeDaRegiaoStartup(regiao) {
  const startups = await carregarTodasStartup();
  const classficacoes = await carregarClassificacoesStartup();

  const cidades = retornarCidadesDeUmaRegiao(regiao);
  for (let i = 0; i < classficacoes.length; i++) {
    classficacoes[i].quantidade = 0;
  }

  for (let i = 0; i < startups.length; i++) {
    for (let j = 0; j < cidades.length; j++) {
      for (let k = 0; k < classficacoes.length; k++) {
        if (
          startups[i].Cidade === cidades[j] &&
          startups[i].Classificacao === classficacoes[k].classe
        ) {
          classficacoes[k].quantidade++;
        }
      }
    }
  }

  return adicionarDadosMatrizSegmentosStartup(classficacoes);
}

async function carregarDepositantesPatentes() {
  let valor = await carregarDadosPatente();
  let arrayDepositantes = [];
  valor.forEach((patentes) => {
    patentes = patentes.val();
    for (let i = 0; i < patentes.Depositantes.length; i++) {
      arrayDepositantes.push(patentes.Depositantes[i].nome);
    }
  });

  return filtrarPatentes(arrayDepositantes);
}

function filtrarPatentes(arrayDepositantes) {
  let arrayNaoRepetidos = [];
  let boolVerifica = true;
  for (let i = 0; i < arrayDepositantes.length; i++) {
    for (let j = 0; j < arrayNaoRepetidos.length; j++) {
      if (arrayNaoRepetidos[j].nome == arrayDepositantes[i]) {
        boolVerifica = false;
      }
    }
    if (boolVerifica == true) {
      arrayNaoRepetidos.push({
        nome: arrayDepositantes[i],
        quantidade: 0,
      });
    }
    boolVerifica = true;
  }
  return arrayNaoRepetidos;
}

async function contarPatentesPorDepositante() {
  const depositantes = await carregarDepositantesPatentes();
  const patentes = await carregarDadosPatente();
  let matrizPatentes = [];
  patentes.forEach((valor) => {
    valor = valor.val();
    for (let i = 0; i < valor.Depositantes.length; i++) {
      for (let j = 0; j < depositantes.length; j++) {
        if (valor.Depositantes[i].nome == depositantes[j].nome) {
          depositantes[j].quantidade += 1;
        }
      }
    }
  });
  return depositantes;
}

async function carregarDadosCategoriasDeEntidade() {
  const quantidadeEntidades = await contarTotalEntidade();
  const patentes = await carregarDadosPatente();
  const numPatentes = patentes.numChildren();

  for (let i = 0; i < quantidadeEntidades.length; i++) {
    index = vetorEntidadesComImagem.findIndex((object) => {
      return object.nome.includes(quantidadeEntidades[i].nome);
    });
    if (vetorEntidadesComImagem[index] != undefined) {
      quantidadeEntidades[i].img = vetorEntidadesComImagem[index].imagem;
    }
  }
  quantidadeEntidades.push({
    nome: "Patentes",
    quantidade: numPatentes,
    img: "img/img-bl/28-patentes.png",
  });
  return quantidadeEntidades;
}

async function paginacaoTabelaCategoriasDeEntidade(inicio, fim, tabela, tipos) {
  //oredenação
  tipos.sort(function (a, b) {
    if (a.quantidade > b.quantidade) {
      return -1;
    } else {
      return true;
    }
  });
  let dados = "";
  let traducao = "";
  for (let i = inicio; i < fim; i++) {
    traducao = traducaoCategoriasDeEntidades(tipos[i].nome)
    if (tipos[i].img) {
      dados += `
     <tr >
       <td>
         <div class="d-flex align-items-center">
           <div>
             <img src="${tipos[i].img}" alt="" srcset="" style=" width: 38px; heigth: 38px">
           </div>
         </div>
       </td>
         <td class="categoriaDeEntidades-nome" prop-traducao=${traducao}>${i18next.t(`graficos.categorias.${traducao}`)}</td>
         <td >${tipos[i].quantidade}</td>
     </tr>`;
    }
  }

  tabela.innerHTML = dados;
}

i18next.on('languageChanged', function(lng){
  const NOMES_LISTA_CATEGORIAS_DE_ENTIDADES = document.getElementsByClassName('categoriaDeEntidades-nome');
  const ARRAY_NOMES_LISTA_CATEGORIAS_DE_ENTIDADES = Array.from(NOMES_LISTA_CATEGORIAS_DE_ENTIDADES);
  let traducao = "";

  ARRAY_NOMES_LISTA_CATEGORIAS_DE_ENTIDADES.forEach(element => {
    traducao = element.getAttribute('prop-traducao');
    element.innerHTML = i18next.t(`graficos.categorias.${traducao}`);
  })
});

function traducaoCategoriasDeEntidades(nome){
  if(nome == "Aceleradora")
    return "aceleradora"
  else if(nome == "Catalisadores Locais")
    return "catLocais"
  else if(nome == "Comunicação e Mídia")
    return "comEMidia"
  else if(nome == "Coworking")
    return "coworking"
  else if(nome == "Escolas")
    return "escolas"
  else if(nome == "Espaços Makers")
    return "espMakers"
  else if(nome == "Eventos")
    return "eventos"
  else if(nome == "Fábrica de Aplicativos")
    return "fabApp"
  else if(nome == "Governo")
    return "gov"
  else if(nome == "Grandes Empresas")
    return "gEmpresas"
  else if(nome == "Incubadoras")
    return "incubadoras"
  else if(nome == "Iniciativas Universitárias")
    return "iniUniversitarias"
  else if(nome == "Investidores")
    return "investidores"
  else if(nome == "Núcleos de Inovação")
    return "nucInovacao"
  else if(nome == "Parques Tecnológicos")
    return "parquesTec"
  else if(nome == "Pré Aceleradoras")
    return "preAceleradoras"
  else if(nome == "Propriedade Intelectual")
    return "propIntelectual"
  else if(nome == "Mentoria")
    return "mentoria"
  else if(nome == "Startup")
    return "startup"
  else if(nome == "Patentes")
    return "patente"
}

function gerenciarSelecionadorPagina(tamanho, inicio, id) {
  const selecionadorPagina = document.querySelector(id);
  selecionadorPagina.innerHTML += `
  <li id="anterior"><p style="cursor: pointer;" >«</a></li>
  
  `;
  for (let i = 0; i < tamanho / 5; i++) {
    if (inicio / 5 == i) {
      selecionadorPagina.innerHTML += `<p style="margin-right: 10px;margin-left: 10px;" href="" class="paginacao selecionado">${i + 1
        }</a>`;
    } else {
      selecionadorPagina.innerHTML += `<p style="margin-right: 10px;margin-left: 10px;" href="" class="paginacao">${i + 1
        }</a>`;
    }
  }
  selecionadorPagina.innerHTML += `<li id="proximo"><p style="cursor: pointer;" >»</a></li>`;
}
async function carregarTabaleCategoriasDeEntidade(inicio, fim) {
  const tabela = document.querySelector("#tabela");
  const tipos = await carregarDadosCategoriasDeEntidade();

  gerenciarSelecionadorPagina(tipos.length, inicio, "#selecionadorPagina");
  document.querySelector("#anterior").addEventListener("click", () => {
    gerenciarAnteriorProximo(inicio - 5);
  });
  document.querySelector("#proximo").addEventListener("click", () => {
    gerenciarAnteriorProximo(inicio + 5);
  });
  paginacaoTabelaCategoriasDeEntidade(inicio, fim, tabela, tipos);
  cliquePaginacao();
}

function cliquePaginacao() {
  const paginacao = document.querySelectorAll(".paginacao");

  Array.from(paginacao).forEach((el) => {
    el.addEventListener("click", () => {
      let inicio = parseInt(el.innerHTML);

      el.className = "paginacao selecionado";
      if (inicio) {
        //

        limparTabelaCategoriasDeEntidade();
        inicio = (inicio - 1) * 5;
        fim = parseInt(inicio + 4);

        carregarTabaleCategoriasDeEntidade(inicio, fim);
      }
    });
  });
}

function gerenciarAnteriorProximo(inicio) {
  //alert("clicado");
  fim = parseInt(inicio + 4);

  if (inicio != -5 && inicio != 20) {
    limparTabelaCategoriasDeEntidade();
    carregarTabaleCategoriasDeEntidade(inicio, fim);
  }
}

function limparTabelaCategoriasDeEntidade() {
  const tabela = document.querySelector("#tabela");
  tabela.innerHTML = " ";
  const selecionadorPagina = document.querySelector("#selecionadorPagina");
  selecionadorPagina.innerHTML = " ";
}

async function carregarTabelaSecoesPatentes() {
  const patentes = await carregarDadosPatente();

  const tabelaPatentes = document.querySelector("#tabelaPatentes");

  let htmlPatentes = adiconarPatentesTabelaSecoesPatentes(patentes, 0, 4);
  tabelaPatentes.innerHTML = htmlPatentes;

}
carregarTabelaSecoesPatentes();

function adiconarPatentesTabelaSecoesPatentes(
  dadosBrutosPatentes,
  inicio,
  fim
) {
  let dadosHtml = " ";
  const patente = transformarDadosBrutosEmArray(dadosBrutosPatentes);
  const secoes = buscarSecoes(patente)
  let dadosSecoes = contarSecoes(secoes, patente)

  //ordenar os elementos

  dadosSecoes = ordenarDescrescente('quantidade', dadosSecoes)
  let traducao = "";

  gerenciarSelecionadorPagina(dadosSecoes.length, 0, "#selecionadorPaginaPatentes");
  for (let i = inicio; i < fim; i++) {
    traducao = traducaoDadosSecoes(dadosSecoes[i].secao);
    dadosHtml += `
    <tr>
      <td>${i18next.t(`graficos.grafico8.${traducao}`)}</td>
      <td>${dadosSecoes[i].quantidade}</td>                     
    </tr>
    `;
  }
  return dadosHtml;
}
function traducaoDadosSecoes(nome){
  if(nome == "Seção A - Necessidade Humanas")
    return "secaoA"
  else if(nome == "Seção B - Operações de Processameto, Transporte")
    return "secaoB"
  else if(nome == "Seção C - Química e Metalurgia")
    return "secaoC"
  else if(nome == "Seção D - Têxteis e Papel")
    return "secaoD"
  else if(nome == "Seção E - Construções Fixas")
    return "secaoE"
  else if(nome == "Seção F - Eng. Mecânica, Iluminação, Aquecimento, Armas, Explosão")
    return "secaoF"
  else if(nome == "Seção G - Física")
    return "secaoG"
  else if(nome == "Seção H - Eletricidade")
    return "secaoH"
}

function ordenarDescrescente(propriedade, array) {
  return array.sort(function (a, b) {
    if (a[propriedade] < b[propriedade]) {
      return 1;
    }
    if (a[propriedade] > b[propriedade]) {
      return -1
    }
    return 0;
  })
}
function buscarSecoes(patentes) {
  let secoes = []
  for (let i = 0; i < patentes.length; i++) {
    for (let k = 0; k < patentes[i].Secoes.length; k++) {
      secoes.push(patentes[i].Secoes[k])

    }

  }
  //remover dados repetidos
  const arrayNaoRepetido = [...new Set(secoes)];
  return arrayNaoRepetido;
}
function contarSecoes(secoes, patentes) {

  let arraySecoes = []
  for (let i = 0; i < secoes.length; i++) {
    arraySecoes.push({
      secao: secoes[i],
      quantidade: 0
    })

  }

  for (let i = 0; i < patentes.length; i++) {
    for (let k = 0; k < patentes[i].Secoes.length; k++) {
      for (let j = 0; j < arraySecoes.length; j++) {
        if (patentes[i].Secoes[k] == arraySecoes[j].secao && patentes[i].Validacao == true) {
          arraySecoes[j].quantidade++;
        }

      }

    }

  }


  return arraySecoes
}
function transformarDadosBrutosEmArray(dadosBrutos) {
  let arrayDados = [];
  dadosBrutos.forEach((dadosAjeitados) => {
    dadosAjeitados = dadosAjeitados.val();

    arrayDados.push(dadosAjeitados);
  });

  return arrayDados;
}

function ajudaModal() {
  const ajudaSvg = document.querySelectorAll(".ajudaSvg");
  Array.from(ajudaSvg).forEach((el) => { });
}
async function carregarTodasAsFasesStartup() {
  const startups = await carregarTodasStartup();
  let fases = [];
  startups.forEach((startup) => {
    let boolVerifica = true;
    for (let i = 0; i < fases.length; i++) {
      if (startup.Fase) {
        if (startup.Fase == fases[i].nome) {
          boolVerifica = false;
        }
      }
    }
    if (boolVerifica == true && startup.Fase) {
      fases.push({
        nome: startup.Fase,
        quantidade: 0,
      });
    }
  });
  return fases;
}
async function carregarTodasReceitasStartup() {
  const startups = await carregarTodasStartup();
  let receitas = [];
  startups.forEach((startup) => {
    if (startup.Receitas) {

      for (let j = 0; j < startup.Receitas.length; j++) {

        receitas.push({
          nome: startup.Receitas[j],
          quantidade: 0,
        });

      }
    }
  });

  return removerElementosRepetidos(receitas, "nome");
}
function removerElementosRepetidos(arrayDeObjeto, propriedade) {
  const map = new Map();
  arrayDeObjeto.forEach(item => {
    map.set(item[propriedade], item)
  })
  const dadosNaoRepetidos = Array.from(map.values())

  return dadosNaoRepetidos;
}
async function contarQuantidadesDeFase() {
  const startups = await carregarTodasStartup();
  const fases = await carregarTodasAsFasesStartup();

  for (let i = 0; i < startups.length; i++) {
    for (let j = 0; j < fases.length; j++) {
      if (startups[i].Fase) {
        if (startups[i].Fase == fases[j].nome) {
          fases[j].quantidade++;
        }
      }
    }
  }

  return fases;
}

async function contarQuantidadesDeFasePorClassificacao(classificacao) {
  const startups = await carregarStartupsPorClassificacao(classificacao);
  const fases = await carregarTodasAsFasesStartup();

  for (let i = 0; i < startups.length; i++) {
    for (let j = 0; j < fases.length; j++) {
      if (startups[i].Fase) {
        if (startups[i].Fase == fases[j].nome) {
          fases[j].quantidade++;
        }
      }
    }
  }

  return fases;
}
async function contarQuantidadeDeFaseTodasReceitas() {
  const startups = await carregarTodasStartup();

  const fases = await carregarTodasAsFasesStartup();

  startups.forEach(startup => {


    for (let k = 0; k < fases.length; k++) {
      if (startup.Receitas) {

        if (
          startup.Fase === fases[k].nome

        ) {
          fases[k].quantidade += 1;
        }


      }
    }



  })


  return fases;
}
async function contarQuantidadeDeFasePorReceitas(receita) {
  const startups = await carregarTodasStartup();

  const fases = await carregarTodasAsFasesStartup();

  for (let i = 0; i < startups.length; i++) {
    for (let k = 0; k < fases.length; k++) {
      if (startups[i].Receitas) {
        for (let n = 0; n < startups[i].Receitas.length; n++) {

          if (
            startups[i].Fase === fases[k].nome &&
            startups[i].Receitas[n] === receita
          ) {
            fases[k].quantidade += 1;
          }

        }
      }
    }
  }
  console.log(fases)
  return fases;
}
async function carregarTodasOsModelosDeNegocio() {
  const startups = await carregarTodasStartup();
  let modelo = [];
  startups.forEach(startup => {
    if (startup.ModeloNegocio) {
      startup.ModeloNegocio.forEach(modelos => {
        modelo.push({
          nome: modelos,
          quantidade: 0
        })
      })
    }
  })
  console.log(modelo)
  modelo = removerElementosRepetidos(modelo, "nome")
  console.log(modelo)
  return modelo;
}

async function contarQuantidadeDeModeloDeReceitasDasFases() {
  const fases = await carregarTodasAsFasesStartup();
  const startups = await carregarTodasStartup();

  startups.forEach(startup => {
    for (let i = 0; i < fases.length; i++) {

      if (startup.ModeloNegocio) {
        if (fases[i].nome == startup.Fase) {
          fases[i].quantidade += 1;
        }
      }



    }
  })
  return fases
}
async function contarQuantidadeFasesDeUmModeloDeNegocio(modelo) {
  const fases = await carregarTodasAsFasesStartup();
  const startups = await carregarTodasStartup();

  startups.forEach(startup => {
    for (let i = 0; i < fases.length; i++) {

      if (startup.ModeloNegocio) {
        startup.ModeloNegocio.forEach(modelos => {
          if (modelos == modelo) {
            if (fases[i].nome == startup.Fase) {
              fases[i].quantidade += 1;
            }
          }
        })
      }



    }
  })

  return fases
}

async function mudarSelectParaSegmentos() {
  const selectStartupsTipos = document.querySelector("#selectStartupsTipos");
  const classificacoes = await carregarClassificacoesStartup();

  selectStartupsTipos.innerHTML = `<option value="Todas" class="optionSelect1StartupPorFase" data-18n="graficos.grafico5.select1.todosSegmentos" value-traducao="todosSegmentos">${i18next.t("graficos.grafico5.select1.todosSegmentos")}</option>`;
  for (let i = 0; i < classificacoes.length; i++) {
    selectStartupsTipos.innerHTML += `<option value="${classificacoes[i].classe}">${classificacoes[i].classe}</option>`;
  }
}
async function mudarSelectParaModeloDeNegocio() {
  const selectStartupsTipos = document.querySelector("#selectStartupsTipos");
  const modelos = await carregarTodasOsModelosDeNegocio();

  selectStartupsTipos.innerHTML = `<option value="Todas" class="optionSelect1StartupPorFase" data-18n="graficos.grafico5.select1.todosModelos" value-traducao="todosModelos">${i18next.t("graficos.grafico5.select1.todosModelos")}</option>`;
  for (let i = 0; i < modelos.length; i++) {
    selectStartupsTipos.innerHTML += `<option value="${modelos[i].nome}">${modelos[i].nome}</option>`;
  }
}
async function mudarSelectParaReceitas() {
  const selectStartupsTipos = document.querySelector("#selectStartupsTipos");
  const receitas = await carregarTodasReceitasStartup();
  let traducaoOption = "";

  selectStartupsTipos.innerHTML = `<option value="Todas" class="optionSelect1StartupPorFase" data-18n="graficos.grafico5.select1.todasReceitas" value-traducao="todasReceitas">${i18next.t("graficos.grafico5.select1.todasReceitas")}</option>`;
  for (let i = 0; i < receitas.length; i++) {
    console.log(receitas[i].nome)
    traducaoOption = traducaoModelosDeNegocio(receitas[i].nome);
    if(traducaoOption != null)
      selectStartupsTipos.innerHTML += `<option value="${receitas[i].nome}" class="optionSelect1StartupPorFase" value-traducao=${traducaoOption}>${i18next.t(`graficos.grafico5.select1.${traducaoOption}`)}</option>`;
    else 
      selectStartupsTipos.innerHTML += `<option value="${receitas[i].nome}">${receitas[i].nome}</option>`;
  }
}

i18next.on('languageChanged', function(lng){
  const LISTA_MODELOS_STARTUPS_POR_FASE = document.getElementsByClassName('optionSelect1StartupPorFase');
  const ARRAY_LISTA_MODELOS_STARTUPS_POR_FASE = Array.from(LISTA_MODELOS_STARTUPS_POR_FASE);
  let traducao = "";

  ARRAY_LISTA_MODELOS_STARTUPS_POR_FASE.forEach(element => {
    traducao = element.getAttribute('value-traducao');
    element.innerHTML = i18next.t(`graficos.grafico5.select1.${traducao}`);
  })
});


/*ira mudar*/
function traducaoModelosDeNegocio(nome){
  if(nome == "Assinatura")
    return "assinatura"
  else if(nome == "Venda direta")
    return "vendaDireta"
  else if(nome == "Serviços sob demanda")
    return "sobDemanda"
  else if(nome == "Afiliados")
    return "afiliados"
  else if(nome == "Licenciamento")
    return "licenciamnto"
  else if(nome == "Advertising (Propaganda)")
    return "ad"
  else return null
}


document.getElementById("languageSwitcher").addEventListener("change", ()=>{
  window.location.reload()
})