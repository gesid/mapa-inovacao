let arrayDedados = {};
let objetoNumeroRegiao = {};
async function carregaFirebase() {
  await firebase
    .database()
    .ref("marcadores")
    .once("value", async function (snapshot) {
      arrayDedados = await carregaCategoriasDeEntidade(snapshot);
      objetoNumeroRegiao = await carregaNumeroDeTodasEntidades(snapshot);

      carregarDados();
    });
}
carregaFirebase();

let tipoRegiao = "Total";
//filtrar tipo de região
let filtro = $("#filtroRegiao");

filtro.on("change", async function () {
  if (filtro.val() == "catalisadores") {
    tipoRegiao = "Catalisadores Locais";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Catalisadores Locais",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "aceleradora") {
    tipoRegiao = "Aceleradora";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Aceleradora",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "startup") {
    tipoRegiao = "Startup";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Startup",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "comunicacao") {
    tipoRegiao = "Comunicação e Mídia";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Comunicação e Mídia",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "coworking") {
    tipoRegiao = "Coworking";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Coworking",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "escolas") {
    tipoRegiao = "escolas";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Escolas",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Fábrica de Aplicativos") {
    tipoRegiao = "Fábrica de Aplicativos";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Fábrica de Aplicativos",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Grandes Empresas") {
    tipoRegiao = "Grandes Empresas";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Grandes Empresas",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Incubadoras") {
    tipoRegiao = "Incubadoras";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Incubadoras",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Iniciativas Universitárias") {
    tipoRegiao = "Iniciativas Universitárias";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Iniciativas Universitárias",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Investidores") {
    tipoRegiao = "Investidores";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Investidores",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Núcleos de Inovação") {
    tipoRegiao = "Núcleos de Inovação";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Núcleos de Inovação",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Parques Tecnológicos") {
    tipoRegiao = "Parques Tecnológicos";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Parques Tecnológicos",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Propriedade Intelectual") {
    tipoRegiao = "Propriedade Intelectual";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Propriedade Intelectual",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Mentoria") {
    tipoRegiao = "Mentoria";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Mentoria",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "Pré Aceleradoras") {
    tipoRegiao = "Pré Aceleradoras";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroEntidadesPorRegiao(
          "Pré Aceleradoras",
          snapshot
        );
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  } else if (filtro.val() == "todas") {
    tipoRegiao = "Todas";

    await firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);
        objetoNumeroRegiao = carregaNumeroDeTodasEntidades(snapshot);
      });
    setTimeout(() => {
      document.getElementById("column").innerHTML = "";
      google.charts.setOnLoadCallback(regioes);
    }, 500);
  }
});

function regioes() {
  var data = google.visualization.arrayToDataTable([
    ["Regiões", tipoRegiao],
    ["Kariri Valley", objetoNumeroRegiao.kaririValley],
    ["Rapadura Valley", objetoNumeroRegiao.rapaduraValley],
    ["Região Norte", objetoNumeroRegiao.regiaoNorte],
    ["Sertão de Crateús", objetoNumeroRegiao.sertaoCrateus],
    ["Sertão Central", objetoNumeroRegiao.sertaoCentral],
    ["Chapada da Ibiapara", objetoNumeroRegiao.chapadaDaIbiapaba],
    ["Metropolitano", objetoNumeroRegiao.metropolitano],
    ["Jaguaribe", objetoNumeroRegiao.jaguaribe],
    ["Centro Sul", objetoNumeroRegiao.centroSul],
    ["Maciço do Baturité", objetoNumeroRegiao.macico],
    ["Itapipoca", objetoNumeroRegiao.itapipoca],
    ["Litoral Leste", objetoNumeroRegiao.litoral],
  ]);

  var options = {
    title: "Gráfico de comunidades por categoria",
    chartArea: { width: "40%", height: "90%" },
    colors: ["#C2FF7C", "#C2FF7C"],

    hAxis: {
      title: "Numeros Entidades",
      minValue: 0,
    },
    vAxis: {},
  };
  var chart = new google.visualization.BarChart(
    document.getElementById("column")
  );
  chart.draw(data, options);
}

let filtroRegiaoEntidade = $("#filtroRegiaoEntidade");
filtroRegiaoEntidade.on("change", function () {
  if (filtroRegiaoEntidade.val() == "Rapadura") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Rapadura Valley");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Kariri Valley") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Kariri Valley");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Região Norte") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Região Norte");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Sertão de Crateús") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Sertão de Crateús");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Sertão Central") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Sertão Central");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Chapadan da Ibiapara") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(
          snapshot,
          "Chapadan da Ibiapara"
        );
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Metropolitano") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Metropolitano");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Jaguaribe") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Jaguaribe");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Centro Sul") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Centro Sul");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Maciço do Baturité") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(
          snapshot,
          "Maciço do Baturité"
        );
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Itapipoca") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Itapipoca");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "Litoral Leste") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Litoral Leste");
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  } else if (filtroRegiaoEntidade.val() == "nenhuma") {
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoComunidade").innerHTML = "";
      google.charts.setOnLoadCallback(graficoComunidade);
    }, 500);
  }
});

function graficoComunidade() {
  var data = google.visualization.arrayToDataTable([
    ["Tipo Entidade", "Numeros"],
    ["Fábrica de Aplicativos", arrayDedados.fabrica],
    ["Aceleradora", arrayDedados.aceleradora],
    ["Iniciativas Universitárias", arrayDedados.iniciativas],
    ["Investidores", arrayDedados.investidores],
    ["Coworking", arrayDedados.coworking],
    ["Startup", arrayDedados.startup],
    ["Escolas", arrayDedados.escolas],
    ["Espaços Makers", arrayDedados.markers],
    ["Grandes Empresas", arrayDedados.grandesEmpresas],
    ["Incubadoras", arrayDedados.incubadoras],
    ["Núcles de Inovação", arrayDedados.nucleos],
    ["Parques Tecnológicos", arrayDedados.parques],
    ["Propriedade Intelectual", arrayDedados.propriedadeIntelectual],
    ["Mentoria", arrayDedados.mentoria],
    ["Pré Aceleradoras", arrayDedados.preAceleradora],
    ["Espaços Makers", arrayDedados.markers],
    ["Comunicação  e Mídia", arrayDedados.comunicacao],
    ["Catalisadores Locais", arrayDedados.catalisadores],
  ]);

  var options = {
    title: "",
    chartArea: { width: "100%", height: "100%" },

    colors: [
      "#D2B8D9",
      "#F2CCB6",
      "#2E8B57",
      "#9ACD32",
      "#B8860B",
      "#D2B48C",
      "#8A2BE2",
      "#F08080",
      "#FF4500",
      "#FFFF00",
      "#FFE4C4",
      "#D8BFD8",
      "#D3D3D3",
      "#ADD8E6",
      "#008B8B",
      "#8FBC8F",
      "#32CD32",
      "#32AA32",
    ],
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("graficoComunidade")
  );

  chart.draw(data, options);
}
let filtroTipoStartup = $("#filtroTipoStartup");
filtroTipoStartup.on("change", function () {
  if (filtroTipoStartup.val() == "Rapadura") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Rapadura Valley");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Região Norte") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Região Norte");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Kariri Valley") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Kariri Valley");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Sertão de Crateús") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Sertão de Crateús");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Sertão Central") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Sertão Central");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Chapadan da Ibiapara") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(
          snapshot,
          "Chapadan da Ibiapara"
        );

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Metropolitano") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Metropolitano");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Jaguaribe") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Jaguaribe");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Centro Sul") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Centro Sul");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Maciço do Baturité") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(
          snapshot,
          "Maciço do Baturité"
        );

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Itapipoca") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Itapipoca");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "Litoral Leste") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = condicaoEntidadesEstartup(snapshot, "Litoral Leste");

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
  if (filtroTipoStartup.val() == "nenhuma") {
    console.log("alterado");
    firebase
      .database()
      .ref("marcadores")
      .once("value", function (snapshot) {
        arrayDedados = carregaCategoriasDeEntidade(snapshot);

        console.log(arrayDedados);
      });
    setTimeout(() => {
      document.getElementById("graficoTipoStartup").innerHTML = "";
      google.charts.setOnLoadCallback(graficoTipoStartup);
    }, 500);
  }
});
function graficoTipoStartup() {
  var data = google.visualization.arrayToDataTable([
    ["Classificacao", "Numeros"],
    ["Fintech", arrayDedados.fintech],
    ["Proptech", arrayDedados.proptech],
    ["Agtech", arrayDedados.agtech],
    ["Edtech", arrayDedados.edtech],
    ["Healthtech", arrayDedados.healthtech],
    ["Adtech - Martech", arrayDedados.Adtech_Martech],
    ["1", arrayDedados.um],
    ["Insurtech", arrayDedados.insurtech],
    ["Sem Classificacao", arrayDedados.semClassificacao],
    ["retailtech", arrayDedados.retailtech],
    ["Legaltech", arrayDedados.legaltech],
  ]);

  var options = {
    title: "",
    chartArea: { width: "100%", height: "100%" },

    colors: [
      "#009932",
      "#8AC6A0",
      "#006200",
      "#00BFFF",
      "#7FFFD4",
      "#A0522D",
      "#191970",
      "#00CED1",
      "#2F4F4F",
      "#7CFC00",
      "#7CFC11",
    ],
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("graficoTipoStartup")
  );

  chart.draw(data, options);
}

function carregaCategoriasDeEntidade(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  let aceleradora = 0;
  let catalisadores = 0;
  let comunicacao = 0;
  let coworking = 0;
  let escolas = 0;
  let markers = 0;
  let fabrica = 0;
  let grandesEmpresas = 0;
  let incubadoras = 0;
  let iniciativas = 0;
  let investidores = 0;
  let nucleos = 0;
  let parques = 0;
  let preAceleradora = 0;
  let propriedadeIntelectual = 0;
  let mentoria = 0;
  let startup = 0;

  //tipos startups
  let fintech = 0;
  let proptech = 0;
  let agtech = 0;
  let edtech = 0;
  let healthtech = 0;
  let legaltech = 0;
  let Adtech_Martech = 0;
  let um = 0;
  let semClassificacao = 0;
  let insurtech = 0;
  let retailtech = 0;

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Validacao == true) {
      if (value.Tipo === "Aceleradora") {
        aceleradora++;
      }
      if (value.Tipo === "Comunidades") {
        comunidades++;
      }

      if (value.Tipo === "Catalisadores Locais") {
        catalisadores++;
      }
      if (value.Tipo === "Comunicação e Mídia") {
        comunicacao++;
      }
      if (value.Tipo === "Coworking") {
        coworking++;
      }
      if (value.Tipo === "Escolas") {
        escolas++;
      }
      if (value.Tipo === "Espaços Makers") {
        markers++;
      }
      if (value.Tipo === "Fábrica de Aplicativos") {
        fabrica++;
      }
      if (value.Tipo === "Grandes Empresas") {
        grandesEmpresas++;
      }
      if (value.Tipo === "Incubadoras") {
        incubadoras++;
      }
      if (value.Tipo === "Iniciativas Universitárias") {
        iniciativas++;
      }
      if (value.Tipo === "Investidores") {
        investidores++;
      }
      if (value.Tipo === "Núcleos de Inovação") {
        nucleos++;
      }
      if (value.Tipo === "Pré Aceleradoras") {
        preAceleradora++;
      }
      if (value.Tipo === "Parques Tecnológicos") {
        parques++;
      }
      if (value.Tipo === "Propriedade Intelectual") {
        propriedadeIntelectual++;
      }
      if (value.Tipo === "Mentoria") {
        mentoria++;
      }
      if (value.Tipo === "Startup") {
        startup++;
        if (value.Classificacao == "Fintech") {
          fintech++;
        } else if (value.Classificacao == "Proptech") {
          proptech++;
        } else if (value.Classificacao == "Agtech") {
          agtech++;
        } else if (value.Classificacao == "Edtech") {
          edtech++;
        } else if (value.Classificacao == "Healthtech") {
          healthtech++;
        } else if (value.Classificacao == "Legaltech") {
          legaltech++;
        } else if (value.Classificacao == "Adtech – Martech") {
          Adtech_Martech++;
        } else if (value.Classificacao == "1") {
          um++;
        } else if (value.Classificacao == "Insurtech") {
          insurtech++;
        } else if (value.Classificacao == "") {
          semClassificacao++;
        } else if (value.Classificacao == "Retailtech") {
          retailtech++;
        }
      }
    }
  });

  let arrayDedados = {
    aceleradora: aceleradora,
    catalisadores: catalisadores,
    comunicacao: comunicacao,
    coworking: coworking,
    escolas: escolas,
    markers: markers,
    fabrica: fabrica,
    grandesEmpresas: grandesEmpresas,
    incubadoras: incubadoras,
    iniciativas: iniciativas,
    investidores: investidores,
    nucleos: nucleos,
    parques: parques,
    preAceleradora: preAceleradora,
    propriedadeIntelectual: propriedadeIntelectual,
    mentoria: mentoria,
    startup: startup,
    fintech: fintech,
    proptech: proptech,
    agtech: agtech,
    edtech: edtech,
    healthtech: healthtech,
    Adtech_Martech: Adtech_Martech,
    um: um,
    insurtech: insurtech,
    semClassificacao: semClassificacao,
    retailtech: retailtech,
    legaltech: legaltech,
  };
  console.log(arrayDedados);

  return arrayDedados;
}
function carregarDados() {
  setTimeout(() => {
    console.log("carregando");
    google.charts.load("current", { packages: ["corechart", "bar"] });
    google.charts.setOnLoadCallback(regioes);
    google.charts.setOnLoadCallback(graficoComunidade);
    google.charts.setOnLoadCallback(graficoTipoStartup);
  }, 1);
}

function carregaNumeroEntidadesPorRegiao(entidade, dataSnapshot) {
  let sertaoCentral = 0;
  let sertaoCrateus = 0;
  let regiaoNorte = 0;
  let rapaduraValley = 0;
  let kaririValley = 0;
  let chapadaDaIbiapaba = 0;
  let metropolitano = 0;
  let jaguaribe = 0;
  let centroSul = 0;
  let macico = 0;
  let itapipoca = 0;
  let litoral = 0;

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
    if (value.Tipo == entidade && value.Validacao == true) {
      if (value.Cidade == "Fortaleza") {
        rapaduraValley++;
      } else if (value.Cidade == "Juazeiro do Norte") {
        kaririValley++;
      } else if (value.Cidade == "Sobral") {
        regiaoNorte++;
      } else if (value.Cidade == "Crateús") {
        sertaoCrateus++;
      } else if (value.Cidade == "Quixadá") {
        sertaoCentral++;
      } else if (value.Cidade == "Guaraciaba do Norte") {
        chapadaDaIbiapaba++;
      } else if (
        value.Cidade == "Caucaia" ||
        value.Cidade == "Pentecoste" ||
        value.Cidade == "Caridade" ||
        value.Cidade == "Maranguape" ||
        value.Cidade == "Horizonte"
      ) {
        metropolitano++;
      } else if (
        value.Cidade == "Russas" ||
        value.Cidade == "Morada Nova" ||
        value.Cidade == "Jaguaretema" ||
        value.Cidade == "Quixere" ||
        value.Cidade == "Palhano" ||
        value.Cidade == "Limoeiro do Norte" ||
        value.Cidade == "Tabuleiro do Norte" ||
        value.Cidade == "Alto Santo" ||
        value.Cidade == "Iracema" ||
        value.Cidade == "Poriretema" ||
        value.Cidade == "Ererê" ||
        value.Cidade == "Jaguaribe" ||
        value.Cidade == "Pereiro" ||
        value.Cidade == "Jaguaribara" ||
        value.Cidade == "S.J do Guararibe"
      ) {
        jaguaribe++;
      } else if (
        value.Cidade == "Iguatu" ||
        value.Cidade == "Icó" ||
        value.Cidade == "Jucás" ||
        value.Cidade == "Acopiara" ||
        value.Cidade == "Baixio" ||
        value.Cidade == "Cariús" ||
        value.Cidade == "Catarina" ||
        value.Cidade == "Cedro" ||
        value.Cidade == "Ipaumirim" ||
        value.Cidade == "Lavras da Mangabeira*" ||
        value.Cidade == "Orós" ||
        value.Cidade == "Quixelô" ||
        value.Cidade == "Saboeiro" ||
        value.Cidade == "Umari" ||
        value.Cidade == "Várzea Alegre"
      ) {
        centroSul++;
      } else if (
        value.Cidade == "Acarape" ||
        value.Cidade == "Aracoiaba" ||
        value.Cidade == "Aratuba" ||
        value.Cidade == "Barreira" ||
        value.Cidade == "Baturité" ||
        value.Cidade == "Capistrano" ||
        value.Cidade == "Guaramiranga" ||
        value.Cidade == "Itapiúna" ||
        value.Cidade == "Mulungu" ||
        value.Cidade == "Ocara" ||
        value.Cidade == "Pacoti" ||
        value.Cidade == "Palmácia" ||
        value.Cidade == "Redenção"
      ) {
        macico++;
      } else if (
        value.Cidade == "Itapipoca" ||
        value.Cidade == "Bela Cruz" ||
        value.Cidade == "Acaraú" ||
        value.Cidade == "Itarema" ||
        value.Cidade == "Amontada" ||
        value.Cidade == "Miraíma" ||
        value.Cidade == "Trairí" ||
        value.Cidade == "Paraipaba" ||
        value.Cidade == "Tururu" ||
        value.Cidade == "Uruburetama" ||
        value.Cidade == "Umirim" ||
        value.Cidade == "Itapajé"
      ) {
        itapipoca++;
      } else if (
        value.Cidade == "Aracati" ||
        value.Cidade == "Beberibe" ||
        value.Cidade == "Cascavel" ||
        value.Cidade == "Fortim" ||
        value.Cidade == "Icapuí" ||
        value.Cidade == "Itaiçaba" ||
        value.Cidade == "Pindoretama"
      ) {
        litoral++;
      }
    }
  });
  let data = {
    sertaoCrateus: sertaoCrateus,
    sertaoCentral: sertaoCentral,
    regiaoNorte: regiaoNorte,
    rapaduraValley: rapaduraValley,
    kaririValley: kaririValley,
    chapadaDaIbiapaba: chapadaDaIbiapaba,
    metropolitano: metropolitano,
    jaguaribe: jaguaribe,
    centroSul: centroSul,
    macico: macico,
    itapipoca: itapipoca,
    litoral: litoral,
  };

  return data;
}
function condicaoEntidadesEstartup(dataSnapshot, regiao) {
  var num = dataSnapshot.numChildren();
  let aceleradora = 0;
  let catalisadores = 0;
  let comunicacao = 0;
  let coworking = 0;
  let escolas = 0;
  let markers = 0;
  let fabrica = 0;
  let grandesEmpresas = 0;
  let incubadoras = 0;
  let iniciativas = 0;
  let investidores = 0;
  let nucleos = 0;
  let parques = 0;
  let preAceleradora = 0;
  let propriedadeIntelectual = 0;
  let mentoria = 0;
  let startup = 0;

  //tipos startups
  let fintech = 0;
  let proptech = 0;
  let agtech = 0;
  let edtech = 0;
  let healthtech = 0;
  let legaltech = 0;
  let Adtech_Martech = 0;
  let um = 0;
  let semClassificacao = 0;
  let insurtech = 0;
  let retailtech = 0;

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (regiao == "Rapadura Valley") {
      if (value.Cidade == "Fortaleza") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            }
          }
        }
      }
    } else if (regiao == "Kariri Valley") {
      if (value.Cidade == "Juazeiro do Norte") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Região Norte") {
      if (value.Cidade == "Sobral") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Sertão de Crateús") {
      if (value.Cidade == "Crateús") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Sertão Central") {
      if (value.Cidade == "Quixadá") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Chapadan da Ibiapara") {
      if (value.Cidade == "Guaraciaba do Norte") {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Metropolitano") {
      if (
        value.Cidade == "Caucaia" ||
        value.Cidade == "Pentecoste" ||
        value.Cidade == "Caridade" ||
        value.Cidade == "Maranguape" ||
        value.Cidade == "Horizonte"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Jaguaribe") {
      if (
        value.Cidade == "Russas" ||
        value.Cidade == "Morada Nova" ||
        value.Cidade == "Jaguaretema" ||
        value.Cidade == "Quixere" ||
        value.Cidade == "Palhano" ||
        value.Cidade == "Limoeiro do Norte" ||
        value.Cidade == "Tabuleiro do Norte" ||
        value.Cidade == "Alto Santo" ||
        value.Cidade == "Iracema" ||
        value.Cidade == "Poriretema" ||
        value.Cidade == "Ererê" ||
        value.Cidade == "Jaguaribe" ||
        value.Cidade == "Pereiro" ||
        value.Cidade == "Jaguaribara" ||
        value.Cidade == "S.J do Guararibe"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Centro Sul") {
      if (
        value.Cidade == "Iguatu" ||
        value.Cidade == "Icó" ||
        value.Cidade == "Jucás" ||
        value.Cidade == "Acopiara" ||
        value.Cidade == "Baixio" ||
        value.Cidade == "Cariús" ||
        value.Cidade == "Catarina" ||
        value.Cidade == "Cedro" ||
        value.Cidade == "Ipaumirim" ||
        value.Cidade == "Lavras da Mangabeira*" ||
        value.Cidade == "Orós" ||
        value.Cidade == "Quixelô" ||
        value.Cidade == "Saboeiro" ||
        value.Cidade == "Umari" ||
        value.Cidade == "Várzea Alegre"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Maciço do Baturité") {
      if (
        value.Cidade == "Acarape" ||
        value.Cidade == "Aracoiaba" ||
        value.Cidade == "Aratuba" ||
        value.Cidade == "Barreira" ||
        value.Cidade == "Baturité" ||
        value.Cidade == "Capistrano" ||
        value.Cidade == "Guaramiranga" ||
        value.Cidade == "Itapiúna" ||
        value.Cidade == "Mulungu" ||
        value.Cidade == "Ocara" ||
        value.Cidade == "Pacoti" ||
        value.Cidade == "Palmácia" ||
        value.Cidade == "Redenção"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Itapipoca") {
      if (
        value.Cidade == "Itapipoca" ||
        value.Cidade == "Bela Cruz" ||
        value.Cidade == "Acaraú" ||
        value.Cidade == "Itarema" ||
        value.Cidade == "Amontada" ||
        value.Cidade == "Miraíma" ||
        value.Cidade == "Trairí" ||
        value.Cidade == "Paraipaba" ||
        value.Cidade == "Tururu" ||
        value.Cidade == "Uruburetama" ||
        value.Cidade == "Umirim" ||
        value.Cidade == "Itapajé"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
    if (regiao == "Litoral Leste") {
      if (
        value.Cidade == "Aracati" ||
        value.Cidade == "Beberibe" ||
        value.Cidade == "Cascavel" ||
        value.Cidade == "Fortim" ||
        value.Cidade == "Icapuí" ||
        value.Cidade == "Itaiçaba" ||
        value.Cidade == "Pindoretama"
      ) {
        if (value.Validacao == true) {
          if (value.Tipo === "Aceleradora") {
            aceleradora++;
          }
          if (value.Tipo === "Comunidades") {
            comunidades++;
          }

          if (value.Tipo === "Catalisadores Locais") {
            catalisadores++;
          }
          if (value.Tipo === "Comunicação e Mídia") {
            comunicacao++;
          }
          if (value.Tipo === "Coworking") {
            coworking++;
          }
          if (value.Tipo === "Escolas") {
            escolas++;
          }
          if (value.Tipo === "Espaços Makers") {
            markers++;
          }
          if (value.Tipo === "Fábrica de Aplicativos") {
            fabrica++;
          }
          if (value.Tipo === "Grandes Empresas") {
            grandesEmpresas++;
          }
          if (value.Tipo === "Incubadoras") {
            incubadoras++;
          }
          if (value.Tipo === "Iniciativas Universitárias") {
            iniciativas++;
          }
          if (value.Tipo === "Investidores") {
            investidores++;
          }
          if (value.Tipo === "Núcleos de Inovação") {
            nucleos++;
          }
          if (value.Tipo === "Pré Aceleradoras") {
            preAceleradora++;
          }
          if (value.Tipo === "Parques Tecnológicos") {
            parques++;
          }
          if (value.Tipo === "Propriedade Intelectual") {
            propriedadeIntelectual++;
          }
          if (value.Tipo === "Mentoria") {
            mentoria++;
          }
          if (value.Tipo === "Startup") {
            startup++;
            if (value.Classificacao == "Fintech") {
              fintech++;
            } else if (value.Classificacao == "Proptech") {
              proptech++;
            } else if (value.Classificacao == "Agtech") {
              agtech++;
            } else if (value.Classificacao == "Edtech") {
              edtech++;
            } else if (value.Classificacao == "Healthtech") {
              healthtech++;
            } else if (value.Classificacao == "Legaltech") {
              legaltech++;
            } else if (value.Classificacao == "Adtech – Martech") {
              Adtech_Martech++;
            } else if (value.Classificacao == "1") {
              um++;
            } else if (value.Classificacao == "Insurtech") {
              insurtech++;
            } else if (value.Classificacao == "") {
              semClassificacao++;
            } else if (value.Classificacao == "Retailtech") {
              retailtech++;
            }
          }
        }
      }
    }
  });

  let arrayDedados = {
    aceleradora: aceleradora,
    catalisadores: catalisadores,
    comunicacao: comunicacao,
    coworking: coworking,
    escolas: escolas,
    markers: markers,
    fabrica: fabrica,
    grandesEmpresas: grandesEmpresas,
    incubadoras: incubadoras,
    iniciativas: iniciativas,
    investidores: investidores,
    nucleos: nucleos,
    parques: parques,
    preAceleradora: preAceleradora,
    propriedadeIntelectual: propriedadeIntelectual,
    mentoria: mentoria,
    startup: startup,
    fintech: fintech,
    proptech: proptech,
    agtech: agtech,
    edtech: edtech,
    healthtech: healthtech,
    Adtech_Martech: Adtech_Martech,
    um: um,
    insurtech: insurtech,
    semClassificacao: semClassificacao,
    retailtech: retailtech,
    legaltech: legaltech,
  };

  return arrayDedados;
}
//carrega o numero total de todas as entidades
function carregaNumeroDeTodasEntidades(dataSnapshot) {
  let sertaoCentral = 0;
  let sertaoCrateus = 0;
  let regiaoNorte = 0;
  let rapaduraValley = 0;
  let kaririValley = 0;
  let chapadaDaIbiapaba = 0;
  let metropolitano = 0;
  let jaguaribe = 0;
  let centroSul = 0;
  let macico = 0;
  let itapipoca = 0;
  let litoral = 0;
  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
    if (value.Validacao == true) {
      if (value.Cidade == "Fortaleza") {
        rapaduraValley++;
      } else if (value.Cidade == "Juazeiro do Norte") {
        kaririValley++;
      } else if (value.Cidade == "Sobral") {
        regiaoNorte++;
      } else if (value.Cidade == "Crateús") {
        sertaoCrateus++;
      } else if (value.Cidade == "Quixadá") {
        sertaoCentral++;
      } else if (value.Cidade == "Guaraciaba do Norte") {
        chapadaDaIbiapaba++;
      } else if (
        value.Cidade == "Caucaia" ||
        value.Cidade == "Pentecoste" ||
        value.Cidade == "Caridade" ||
        value.Cidade == "Maranguape" ||
        value.Cidade == "Horizonte"
      ) {
        metropolitano++;
      } else if (
        value.Cidade == "Russas" ||
        value.Cidade == "Morada Nova" ||
        value.Cidade == "Jaguaretema" ||
        value.Cidade == "Quixere" ||
        value.Cidade == "Palhano" ||
        value.Cidade == "Limoeiro do Norte" ||
        value.Cidade == "Tabuleiro do Norte" ||
        value.Cidade == "Alto Santo" ||
        value.Cidade == "Iracema" ||
        value.Cidade == "Poriretema" ||
        value.Cidade == "Ererê" ||
        value.Cidade == "Jaguaribe" ||
        value.Cidade == "Pereiro" ||
        value.Cidade == "Jaguaribara" ||
        value.Cidade == "S.J do Guararibe"
      ) {
        jaguaribe++;
      } else if (
        value.Cidade == "Iguatu" ||
        value.Cidade == "Icó" ||
        value.Cidade == "Jucás" ||
        value.Cidade == "Acopiara" ||
        value.Cidade == "Baixio" ||
        value.Cidade == "Cariús" ||
        value.Cidade == "Catarina" ||
        value.Cidade == "Cedro" ||
        value.Cidade == "Ipaumirim" ||
        value.Cidade == "Lavras da Mangabeira*" ||
        value.Cidade == "Orós" ||
        value.Cidade == "Quixelô" ||
        value.Cidade == "Saboeiro" ||
        value.Cidade == "Umari" ||
        value.Cidade == "Várzea Alegre"
      ) {
        centroSul++;
      } else if (
        value.Cidade == "Acarape" ||
        value.Cidade == "Aracoiaba" ||
        value.Cidade == "Aratuba" ||
        value.Cidade == "Barreira" ||
        value.Cidade == "Baturité" ||
        value.Cidade == "Capistrano" ||
        value.Cidade == "Guaramiranga" ||
        value.Cidade == "Itapiúna" ||
        value.Cidade == "Mulungu" ||
        value.Cidade == "Ocara" ||
        value.Cidade == "Pacoti" ||
        value.Cidade == "Palmácia" ||
        value.Cidade == "Redenção"
      ) {
        macico++;
      } else if (
        value.Cidade == "Itapipoca" ||
        value.Cidade == "Bela Cruz" ||
        value.Cidade == "Acaraú" ||
        value.Cidade == "Itarema" ||
        value.Cidade == "Amontada" ||
        value.Cidade == "Miraíma" ||
        value.Cidade == "Trairí" ||
        value.Cidade == "Paraipaba" ||
        value.Cidade == "Tururu" ||
        value.Cidade == "Uruburetama" ||
        value.Cidade == "Umirim" ||
        value.Cidade == "Itapajé"
      ) {
        itapipoca++;
      } else if (
        value.Cidade == "Aracati" ||
        value.Cidade == "Beberibe" ||
        value.Cidade == "Cascavel" ||
        value.Cidade == "Fortim" ||
        value.Cidade == "Icapuí" ||
        value.Cidade == "Itaiçaba" ||
        value.Cidade == "Pindoretama"
      ) {
        litoral++;
      }
    }
  });
  let data = {
    sertaoCrateus: sertaoCrateus,
    sertaoCentral: sertaoCentral,
    regiaoNorte: regiaoNorte,
    rapaduraValley: rapaduraValley,
    kaririValley: kaririValley,
    chapadaDaIbiapaba: chapadaDaIbiapaba,
    metropolitano: metropolitano,
    jaguaribe: jaguaribe,
    centroSul: centroSul,
    macico: macico,
    itapipoca: itapipoca,
    litoral: litoral,
  };

  return data;
}
