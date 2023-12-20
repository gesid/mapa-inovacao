//Objeto DAO
let regiaoDaoat = new RegiaoDao();

regiaoDaoat.varredura().then(function (regiao) {
  regiao.forEach(criarRegiao);
});

function limparRegiao() {
  let status = $("#btn-user").attr("data-status");
  if (status === "logado") {
    document.getElementById("validacaoNomeComu").value = "";
    document.getElementById("validacaoSiteComu").value = "";
    document.getElementById("validacaoCorComu").value = "#FFFFF";
    document.getElementById("areatextoComu").value = "";
    document.getElementById("areatextoDescComu").value = "";

    $("#ModalComunidade").modal("show");
  } else {
    window.location.href = "login.html";
  }
}

function exibirRegiao(componente) {
  console.log(componente);
  let aux = document.getElementsByName(componente.getAttribute("data-key"));

  if (map.hasLayer(layerArray[componente.getAttribute("data-key")])) {
    map.removeLayer(layerArray[componente.getAttribute("data-key")]);
    aux[0].innerHTML = i18next.t('barraLateral.cards.cardsComunidade.btnAtivar');
    aux[0].setAttribute("Style", "background: #FC6A38;");
  } else {
    map.addLayer(layerArray[componente.getAttribute("data-key")]);
    aux[0].innerHTML = i18next.t('barraLateral.cards.cardsComunidade.btnDesativar');
    aux[0].setAttribute("Style", "background: #CF5B15;");
  }
}

function criarRegiao(Comm) {
  var Style = {
    color: Comm.getCor(),
    weight: 1,
    opacity: 0.65,
  };

  let area = Comm.getCoordenadas();

  let layer = L.geoJSON(area, { style: Style });
  layerArray[Comm.getMarkerKey()] = layer;
}
