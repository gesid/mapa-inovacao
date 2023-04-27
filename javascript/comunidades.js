//Variáveis
let ecossistemaLayer = new L.LayerGroup();
let layerArray = [];
//Objeto DAO
let comunidadeDaoComunidades = new comunidadeDAO();
//let Layer = L.geoJSON();
//var kaririLayer = L.geoJSON()

//incio-----------------------------------------------
comunidadeDaoComunidades.varredura().then(function (comunidade) {
  comunidade.forEach(criarComunidade);
});
//Fim Inicio-------------------------------------------

function limparComunidade() {
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

function exibirComunidade(componente) {
  let aux = document.getElementsByName(componente.getAttribute("data-key"));

  if (map.hasLayer(layerArray[componente.getAttribute("data-key")])) {
    map.removeLayer(layerArray[componente.getAttribute("data-key")]);
    aux[0].innerHTML = "Ativar no mapa";
    aux[0].setAttribute("Style", "background: #FC6A38;");
  } else {
    map.addLayer(layerArray[componente.getAttribute("data-key")]);
    aux[0].innerHTML = "Desativar do mapa";
    aux[0].setAttribute("Style", "background: #CF5B15;");
  }
}

function criarComunidade(Comm) {
  var Style = {
    color: Comm.getCor(),
    weight: 1,
    opacity: 0.65,
  };

  let area = Comm.getCoordenadas();

  let layer = L.geoJSON(area, { style: Style });
  layerArray[Comm.getMarkerKey()] = layer;
}

function gravarCadastroComunidade() {
  //Capturando os valores do formulário
  let comunidade = new Comunidade(
    document.getElementById("validacaoNomeComu").value,
    document.getElementById("validacaoSiteComu").value,
    document.getElementById("validacaoCorComu").value,
    document.getElementById("areatextoDescComu").value,
    document.getElementById("areatextoComu").value,
    null,
    null,
    firebase.auth().currentUser.uid
  );
  comunidadeDaoComunidades.salvar(comunidade, uploader3SelectedFile);
}

$("#uploader3").on("change", function (event) {
  // Recebe o arquivo upado no cadastro sempre que há mudanças
  uploader3SelectedFile = event.target.files[0];
  document.getElementById("uploaderLabel3").innerHTML =
    uploader3SelectedFile.name; //Atualiza  nome do arquivo no campo
});
