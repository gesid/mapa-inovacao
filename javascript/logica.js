//Variaveis e Constantes
let uploader1SelectedFile = ""
let uploader2SelectedFile = ""   
let lat
let lng
let cont = 0
let auxUser
let marker
let url
let diaEvento
let horaEvento
let permissao = true;
let marcador = [];
let ecossistema = []
let entidadeArray
let usuarioArray
let arrayteste = []
let markersLayer = new L.LayerGroup();
let escolhaLayer = new L.LayerGroup();
const database = firebase.database();
const storage = firebase.storage();

//Criando o DAO
let entidadedao = new entidadeDAO;
let eventodao = new eventoDAO;
let comunidadedao = new comunidadeDAO;
let usuariodao = new usuarioDAO;

let markerIcon = L.Icon.extend({
  options: {  
    shadowUrl:"img/img-marker/marker-shadow.png",
    iconSize:     [27, 40], // size of the icon
    shadowSize:   [41, 41], // size of the shadow
    iconAnchor:   [13, 39], // point of the icon which will correspond to marker's location
    shadowAnchor: [13, 39],  // the same for the shadow
    popupAnchor:  [0, -40] // point from which the popup should open relative to the iconAnchor
  }
});

//***********CÓDIGO LOGIN****************//
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    document.getElementById('log').innerHTML = `<i class="fas fa-sign-out-alt"></i>
    <p style="margin-bottom: 8px;"><small>Sair</small></p>`
    document.getElementById('log').setAttribute("data-status","logado");
    document.getElementById('btn_marker').setAttribute("data-status","logado");
    document.getElementById('perfil').setAttribute("data-key",user.uid);
    document.getElementById('perfil').setAttribute("onclick","telaUsuario(this)");
    localStorage.setItem('usuarioLogadoKey', user.uid)

  }else{
    document.getElementById('log').innerHTML = `<i class="fas fa-sign-in-alt"></i>
    <p style="margin-bottom: 8px;"><small>Entrar</small></p>`
    document.getElementById('log').setAttribute("data-status","deslogado");
    document.getElementById('btn_marker').setAttribute("data-status","deslogado");
    document.getElementById('perfil').setAttribute("href","login.html");
    //window.location.href="login.html";
  }
});
//***********CÓDIGO LOGIN FIM****************//

//Main

L.icon = function (options) {
  return new L.Icon(options);
};

ecossistema.push(new Aceleradora())
ecossistema.push(new Advogados())
ecossistema.push(new Catalisadores())
ecossistema.push(new Comunicacao())
ecossistema.push(new Conexao())
ecossistema.push(new Conteudo())
ecossistema.push(new Coworking())
ecossistema.push(new Creditos())
ecossistema.push(new Editais())
ecossistema.push(new Escolas())
ecossistema.push(new Makers())
ecossistema.push(new Eventos())
ecossistema.push(new FabricaApp())
ecossistema.push(new Governo())
ecossistema.push(new Empresas())
ecossistema.push(new Incubadoras())
ecossistema.push(new iniUniversitarias())
ecossistema.push(new Investidores())
ecossistema.push(new Missoes())
ecossistema.push(new Nucleo())
ecossistema.push(new Parques())
ecossistema.push(new preAceleradoras())
ecossistema.push(new propIntelectual())
ecossistema.push(new Provedores())
ecossistema.push(new Mentoria())
ecossistema.push(new Startups())

OpcaoComunidade()

entidadedao.varredura().then(function(entidade){
  entidadeArray = entidade
  exibirMarcadores(ecossistema, entidadeArray)
  ecossistema.forEach(criarListaOpcoes)
})

//Fim Main-------------------------------------------------------------

function OpcaoComunidade(){
  comunidadedao.varredura().then(function(comunidades){
    criarOpcaoComunidade(comunidades)
  })
}

function criarOpcaoComunidade(comunidades){
  let template = document.querySelector('#listaTipo');
  let listaOpcoes = document.querySelector('#listaOpcoes');
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");
  //imgLink.src = componente.getImagemBarra()

  a.innerHTML = 
  `<img style="height:36px; width:36px" src= "img/img-bl/27-comunidade.png">
  Comunidades
  <span class="badge badge-secondary badge-pill">${comunidades.length}</span>`

  a.setAttribute("data-tipo", "Comunidades");
  listaOpcoes.appendChild(document.importNode(template.content,true))
}

function criarListaOpcoes(tipoClasse){ // Cria lista da bara lateral
  let template = document.querySelector('#listaTipo');
  let listaOpcoes = document.querySelector('#listaOpcoes');
  let a = template.content.querySelector("a");
  let imgLink = document.createElement("imgLink");

  imgLink.src = tipoClasse.getImagemBarra()

  a.innerHTML = 
  `<img style="height:36px; width:36px" src= ${imgLink.src}>
  ${tipoClasse.getNome()}
  <span class="badge badge-secondary badge-pill">${tipoClasse.getBadge()}</span>`

  a.setAttribute("data-tipo", tipoClasse.getNome());
  
  if(tipoClasse.getNome()!="Eventos"){listaOpcoes.appendChild(document.importNode(template.content,true))}
    executarEventoKey()
}

function filtroSelect(componente){
  $(".card").remove();
  
  if(componente.getAttribute("data-tipo") ==="Comunidades"){
    filtroBuscaComunidade(componente.getAttribute("data-tipo"));
  }else{
    filtroBusca(componente.getAttribute("data-tipo"));
  }
}
//Criando a barra lateral
function chamaBarraOculta(componente){ //Abre a barra de cartões
  if (permissao === true) {
    permissao = false

    $(".card").remove(); 

    $('#location-map').removeClass('col-10')
    $('#location-map').addClass('col-7')
    $('#janela_oculta').attr('style', 'padding: 0; height:100%; display: all;')

    document.getElementById('contBusca').value = '' //Zera o valor da barra de busca
    document.getElementById('botaoBusca').setAttribute("data-tipo", componente.getAttribute("data-tipo")); // Atribui a tipo da opção selecionada ao botão de busca

    if(componente.getAttribute("data-tipo") != "Comunidades"){
      filtroBusca(componente.getAttribute("data-tipo"));//exibe os cartões do tipo de opção selecionada
    }
    else{
      filtroBuscaComunidade(componente.getAttribute("data-tipo"));
    }  
  }
}

function filtroBusca(tipo){
  let aux2 = false;
  let valBarra = document.getElementById('contBusca').value

  if(valBarra != ''){
    entidadedao.buscarPorNome(valBarra).then(function(entidade){
      verificarUsuarioEntidade(entidade)
    })  
  }else{
    for (let i = 0; i < entidadeArray.length; i++) {
      if (tipo === entidadeArray[i].getTipo()) {
        aux2 = true
        verificarUsuarioEntidade(entidadeArray[i])
      }
    }
  }
  if(!aux2){permissao = true}
}

function verificarUsuarioEntidade(entidade) {
  usuariodao.buscar(entidade.getUserId()).then(function(usuario){
    cartaoEntidade(entidade, usuario.getNome())
  })
}

function cartaoEntidade(entidade, nomeUser){
  let template = document.querySelector('#cartaoEmpresa');
  let cartao = document.querySelector('#cartao');
  let img = template.content.querySelector("img");
  let h5 = template.content.querySelector("h5");
  let p = template.content.querySelectorAll("p");
  let taga = template.content.querySelectorAll("a");

  let imgCartao = document.createElement("imgCartao");
  imgCartao.src = entidade.getURL()  

  img.setAttribute("src", imgCartao.src);
  h5.textContent = entidade.getNome();

  p[0].innerHTML = 
  `<small>
  ${entidade.getLogradouro()}, 
  ${entidade.getNumero()}, 
  ${entidade.getComplemento()}, 
  ${entidade.getBairro()}, 
  ${entidade.getCidade()}, 
  ${entidade.getUF()}, 
  ${entidade.getCEP()}
  </small>`

  taga[0].setAttribute("href", "https://" + entidade.getSite());
  taga[1].setAttribute("data-key", entidade.getMarkerKey());
  taga[1].setAttribute("onclick", "zoomMarcador(this)");
  taga[1].innerHTML = "Localização"

  p[1].innerHTML = `<small class="font-weight-bold" href="">Marcado por: </small>
  <small><a class="ml-1" href="javascript:void(0)" data-key="${entidade.getUserId()}" onclick="telaUsuario(this)">${nomeUser}</a></small>`

  cartao.appendChild(document.importNode(template.content,true));
  permissao = true
}

function filtroBuscaComunidade(tipo){

  let valBarra = document.getElementById('contBusca').value //Verificar se há algo na barra de busca
  
  if(valBarra != ''){
    comunidadedao.buscarPorNome(valBarra).then(function(comunidade){
      verificarUsuarioComunidade(comunidade)
    })
  }else{
    comunidadedao.varredura().then(function(comunidade){
     comunidade.forEach(verificarUsuarioComunidade)
   })  
  }
}

function verificarUsuarioComunidade(comunidade) {
  usuariodao.buscar(comunidade.getUserId()).then(function(usuario){
    cartaoComunidade(comunidade, usuario.getNome())
  })
}

function cartaoComunidade(entidade, nomeUser){
  let template = document.querySelector('#cartaoEmpresa');
  let cartao = document.querySelector('#cartao');
  let img = template.content.querySelector("img");
  let h5 = template.content.querySelector("h5");
  let p = template.content.querySelectorAll("p");
  let taga = template.content.querySelectorAll("a");

  let imgCartao = document.createElement("imgCartao");
  imgCartao.src = entidade.getURL();  

  p[0].innerHTML = `<small>${entidade.getDescricao()}</small>`

  img.setAttribute("src", imgCartao.src);
  h5.textContent = entidade.getNome();

  //p.textContent = child.val().Logradouro+", "+child.val().Numero+", "+child.val().Complemento+", "+ child.val().Bairro+", "+child.val().Cidade+"-"+child.val().UF+", "+child.val().CEP;
  taga[0].setAttribute("href", "https://" + entidade.getSite());
  taga[1].setAttribute("data-key", entidade.getMarkerKey());
  taga[1].setAttribute("name", entidade.getMarkerKey());
  taga[1].setAttribute("onclick", "exibirComunidade(this)");

  if (map.hasLayer(layerArray[entidade.getMarkerKey()])) {
    taga[1].innerHTML = "Desativar"
  } else {
    taga[1].innerHTML = "Ativar"  
  }

  p[1].innerHTML = `<small class="font-weight-bold" href="">Marcado por: </small>
  <small><a class="ml-1" href="javascript:void(0)" data-key="${entidade.getUserId()}" onclick="telaUsuario(this)">${nomeUser}</a></small>`

  cartao.appendChild(document.importNode(template.content,true));
  permissao = true
}

function executarEventoKey(){//Reconhece o evento que foi clicado na página de eventos e da um zoom no marcador
  if(localStorage.getItem('eventoMarker')){  
    let data = localStorage.getItem('eventoMarker');
    map.flyTo(marcador[data].getLatLng(), 19);
    marcador[data].openPopup();
    //Colocar o valor no input, ou seja lá o que quer fazer
    localStorage.removeItem('eventoMarker');
  }
}

//Funções do Sistema
function filtroMarcador(){
  let selecaoFiltro=[]
  markersLayer.clearLayers();

  if($('#CheckboxAcelerador').prop('checked') == true){selecaoFiltro.push(ecossistema[0])
  }
  if($('#CheckboxAdvogados').prop('checked') == true){selecaoFiltro.push(ecossistema[1])
  }
  if($('#CheckboxCatalisadores').prop('checked') == true){selecaoFiltro.push(ecossistema[2])
  }
  if($('#CheckboxComunicacao').prop('checked') == true){selecaoFiltro.push(ecossistema[3])
  }
  if($('#CheckboxConexao').prop('checked') == true){selecaoFiltro.push(ecossistema[4])
  }
  if($('#CheckboxConteudo').prop('checked') == true){selecaoFiltro.push(ecossistema[5])
  }
  if($('#CheckboxCoworking').prop('checked') == true){selecaoFiltro.push(ecossistema[6])
  }
  if($('#CheckboxCreditos').prop('checked') == true){selecaoFiltro.push(ecossistema[7])
  }
  if($('#CheckboxEditais').prop('checked') == true){selecaoFiltro.push(ecossistema[8])
  }
  if($('#CheckboxEscolas').prop('checked') == true){selecaoFiltro.push(ecossistema[9])
  }
  if($('#CheckboxMakers').prop('checked') == true){selecaoFiltro.push(ecossistema[10])
  }
  if($('#CheckboxEventos').prop('checked') == true){selecaoFiltro.push(ecossistema[11])
  }
  if($('#CheckboxFabricaApp').prop('checked') == true){selecaoFiltro.push(ecossistema[12])
  }
  if($('#CheckboxGoverno').prop('checked') == true){selecaoFiltro.push(ecossistema[13])
  }
  if($('#CheckboxEmpresas').prop('checked') == true){selecaoFiltro.push(ecossistema[14])
  }
  if($('#CheckboxIncubadoras').prop('checked') == true){selecaoFiltro.push(ecossistema[15])
  }
  if($('#CheckboxiniUniversitarias').prop('checked') == true){selecaoFiltro.push(ecossistema[16])
  }
  if($('#CheckboxInvestidores').prop('checked') == true){selecaoFiltro.push(ecossistema[17])
  }
  if($('#CheckboxMissoes').prop('checked') == true){selecaoFiltro.push(ecossistema[18])
  }
  if($('#CheckboxNucleos').prop('checked') == true){selecaoFiltro.push(ecossistema[19])
  }
  if($('#CheckboxParques').prop('checked') == true){selecaoFiltro.push(ecossistema[20])
  }
  if($('#CheckboxpreAceleradoras').prop('checked') == true){selecaoFiltro.push(ecossistema[21])
  }
  if($('#CheckboxpropIntelectuais').prop('checked') == true){selecaoFiltro.push(ecossistema[22])
  }
  if($('#CheckboxProvedores').prop('checked') == true){selecaoFiltro.push(ecossistema[23])
  }
  if($('#CheckboxMentoria').prop('checked') == true){selecaoFiltro.push(ecossistema[24])
  }
  if($('#CheckboxStartup').prop('checked') == true){selecaoFiltro.push(ecossistema[25])
  }
  exibirMarcadores(selecaoFiltro, entidadeArray)
}

function exibirMarcadores(tipoClasse, entidade){ //Função responsável para Marcar os pontos no mapa
  for (var m = 0; m < tipoClasse.length; m++) {
    for (var n = 0; n < entidade.length; n++) {

      if(entidade[n].getTipo() === tipoClasse[m].getNome()){

        tipoClasse[m].setBadge(tipoClasse[m].getBadge()+1)

        let Icone = new markerIcon({iconUrl:tipoClasse[m].getImagemMarcador()});

        let imgPop = document.createElement("imgPop");
        imgPop.src = entidade[n].getURL()

        marcador[entidade[n].getMarkerKey()] = L.marker([entidade[n].getLat(), entidade[n].getLng()],{icon: Icone})
        .bindPopup("<div><img src='"+imgPop.src+"' style='width: 70px;height: 70px;display:block;position: relative; left: 50%;transform: translate(-50%);'></img> <h6 style='font-weight: bold; margin-top:5px; margin-bottom:0;text-align: center;'>"+entidade[n].getNome()+"</h6><p style='margin:0;text-align: center;'>"+entidade[n].getTipo()+"</p><a class='btn btn-secondary btn-sm btn-block' href='https://"+entidade[n].getSite()+"' target='_blank' style='margin-top:5px;color:white;'>Conheça Mais</a></div>") 
        markersLayer.addLayer(marcador[entidade[n].getMarkerKey()]);

        markersLayer.addTo(map);
      }  
    }
  }
}

function zoomMarcador(componente){
  let key = componente.getAttribute("data-key");
  map.flyTo(marcador[key].getLatLng(), 19);
  marcador[key].openPopup();
}

function gravarFormulario(){
  if(document.getElementById('local-tab').getAttribute("aria-selected") === "true"){
    gravarCadastroLocal()
  }
  else if(document.getElementById('evento-tab').getAttribute("aria-selected") === "true"){
    gravarCadastroEvento()
  }
}

//Gravando Cadastro dos locais
function gravarCadastroLocal(){
  //Capturando os valores do formulário e passando para um objeto entidade
  let entidade = new Entidade(
    document.getElementById('validacaoNomeLocal').value, 
    document.getElementById('validacaoSiteLocal').value, 
    document.getElementById('validacaoTipoLocal').value,
    null,
    document.getElementById('validacaoLatLocal').value,
    document.getElementById('validacaoLngLocal').value,
    document.getElementById('validacaoLogradouroLocal').value,
    document.getElementById('validacaoNumeroLocal').value,
    document.getElementById('validacaoComplementoLocal').value,
    document.getElementById('validacaoBairroLocal').value,
    document.getElementById('validacaoCidadeLocal').value,
    document.getElementById('validacaoUFLocal').value,
    document.getElementById('validacaoCEPLocal').value,
    null,
    firebase.auth().currentUser.uid,
    )
  entidadedao.salvar(entidade, uploader1SelectedFile)
}

//Gravando cadastro de Eventos
function gravarCadastroEvento(){
  //Capturando os valores do formulário
  let evento = new Evento(
    document.getElementById('validacaoNomeEvento').value, 
    document.getElementById('validacaoSiteEvento').value,
    "Eventos", 
    document.getElementById('validacaoTipoEvento').value,
    document.getElementById('areatextoEvento').value,
    diaEvento,
    horaEvento,
    null,
    document.getElementById('validacaoLatEvento').value,
    document.getElementById('validacaoLngEvento').value,
    document.getElementById('validacaoLogradouroEvento').value,
    document.getElementById('validacaoNumeroEvento').value,
    document.getElementById('validacaoComplementoEvento').value,
    document.getElementById('validacaoBairroEvento').value,
    document.getElementById('validacaoCidadeEvento').value,
    document.getElementById('validacaoUFEvento').value,
    document.getElementById('validacaoCEPEvento').value,
    null,
    firebase.auth().currentUser.uid,
    )
  eventodao.salvar(evento, uploader2SelectedFile)
}

function incializarSistema(){
  exibirList.forEach(marcarPontos)      
}

function telaCadastroComunidade(){
  localStorage.setItem('comumKey', "cadastro-comunidade");
  window.open('como-utilizar.html', '_blank')
}

function telaUsuario(componente){
  let status = $("#btn_marker").attr("data-status");
  if(status==="logado"){

    window.location = "usuario.html?"+ componente.getAttribute("data-key")
  }
  else{
    window.location.href="login.html"
  }
}

function deletarMarcador(){
  map.removeLayer(marker)
}

function receberDiaHora(dia,hora){
  diaEvento = dia;
  horaEvento = hora;
}

function selecionarLocal(){
  lat = null
  lng = null

  escolhaLayer.clearLayers();
  let status = $("#btn_marker").attr("data-status");
  if(status==="logado"){
    $('#marcar_info').attr('style', 'display: all;');

    map.on('click', function(e){
      if(marker){
        map.removeLayer(marker)
    //escolhaLayer.clearLayers();
  }
  marker = L.marker(e.latlng).addTo(map)
  //marker = L.marker(e.latlng)
  .bindPopup(`<div class="row d-flex justify-content-center">
    <h6 class="col-12 font-weight-bold">Confirmar</h6>
    <button class="btn btn-submit btn-sm col-6 font-weight-bold" onclick="chamarModalCadastro()">Aqui!</button>
    </div>`)
  .openPopup();
  //escolhaLayer.addLayer(marker).addTo(map);

  //marker = L.marker([latitude, longitude]).addTo(mymap);

  lat = e.latlng.lat
  lng = e.latlng.lng
  document.getElementById('validacaoLatLocal').value = lat
  document.getElementById('validacaoLngLocal').value = lng
  document.getElementById('validacaoLatEvento').value = lat
  document.getElementById('validacaoLngEvento').value = lng
})

  }else{
    window.location.href="login.html";
  }
}

function chamarModalCadastro(){
  if(lat===null||lng===null){
    alert("Selecione um local no mapa")
  }else{
    map.off('click')

    document.getElementById('validacaoNomeLocal').value = ''
    document.getElementById('validacaoSiteLocal').value = ''
    document.getElementById('validacaoTipoLocal').value = 1
    document.getElementById('validacaoLogradouroLocal').value = ''
    document.getElementById('validacaoNumeroLocal').value = ''
    document.getElementById('validacaoComplementoLocal').value = ''
    document.getElementById('validacaoBairroLocal').value = ''
    document.getElementById('validacaoCidadeLocal').value = ''
    document.getElementById('validacaoUFLocal').value = 1
    document.getElementById('validacaoCEPLocal').value = ''
    document.getElementById('uploaderLabel1').innerHTML = 'Logo'
    document.getElementById('uploader1').value = ''
    uploader1SelectedFile = ''

    document.getElementById('validacaoNomeEvento').value = ''
    document.getElementById('validacaoSiteEvento').value = ''
    document.getElementById('validacaoTipoEvento').value = 1
    document.getElementById('areatextoEvento').value = ''
    document.getElementById('validacaoLogradouroEvento').value = ''
    document.getElementById('validacaoNumeroEvento').value = ''
    document.getElementById('validacaoComplementoEvento').value = ''
    document.getElementById('validacaoBairroEvento').value = ''
    document.getElementById('validacaoCidadeEvento').value = ''
    document.getElementById('validacaoUFEvento').value = 1
    document.getElementById('validacaoCEPEvento').value = ''
    document.getElementById('uploaderLabel2').innerHTML = 'Logo'
    document.getElementById('uploader2').value = ''
    document.getElementById('dtpicker').value = ''
    uploader2SelectedFile = ''

    $('#ModalCadastro').modal('show');

    $('#marcar_info').attr('style', 'display: none;');
  }
}

$(document).ready(() => {

  $("#validacaoCEPLocal").focusout(function(){
    let cep = $("#validacaoCEPLocal").val()

    if(cep.length<9&&cep.length!=0){cepLocalInvalido()}
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response =>{
      return response.json();
    })
    .then(data =>{
      if(data.erro){cepLocalInvalido();}
      else{
        $("#validacaoLogradouroLocal").val(data.logradouro)
        $("#validacaoComplementoLocal").val(data.complemento)
        $("#validacaoBairroLocal").val(data.bairro) 
        $("#validacaoCidadeLocal").val(data.localidade) 
        $("#validacaoUFLocal").val(data.uf)
      }         
    })
    function cepLocalInvalido(){alert("CEP Inválido");$("#validacaoCEPLocal").val("");}
  });

  $("#validacaoCEPEvento").focusout(function(){
    let cep = $("#validacaoCEPEvento").val()

    if(cep.length<9&&cep.length!=0){cepEventoInvalido()}
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response =>{
      return response.json();
    })
    .then(data =>{

      if(data.erro){cepEventoInvalido();}
      else{
        $("#validacaoLogradouroEvento").val(data.logradouro)
        $("#validacaoComplementoEvento").val(data.complemento)
        $("#validacaoBairroEvento").val(data.bairro) 
        $("#validacaoCidadeEvento").val(data.localidade) 
        $("#validacaoUFEvento").val(data.uf)
      }         
    })
    function cepEventoInvalido(){alert("CEP Inválido");$("#validacaoCEPEvento").val("");}
  });

  $("#validacaoCEPLocal").mask("00000-000");
  $("#validacaoCEPEvento").mask("00000-000");

  $('#btn_sair').click(() => {
    $('#location-map').removeClass('col-7');
    $('#location-map').addClass('col-10');
    $('#janela_oculta').attr('style', 'padding: 0; height:100%; display: none;');
    aux = false;
  })

  $('#map_button2').click(() => {
    $('#marcar_info').attr('style', 'display: none;');
    map.off('click');
    map.removeLayer(marker);
  })

  $("#uploader1").on("change", function(event){ // Recebe o arquivo upado no cadastro sempre que há mudanças
    uploader1SelectedFile = event.target.files[0]
    document.getElementById('uploaderLabel1').innerHTML = uploader1SelectedFile.name //Atualiza  nome do arquivo no campo
  })

  $("#uploader2").on("change", function(event){ // Recebe o arquivo upado no cadastro sempre que há mudanças
    uploader2SelectedFile = event.target.files[0]
    document.getElementById('uploaderLabel2').innerHTML = uploader2SelectedFile.name //Atualiza  nome do arquivo no campo
  })

  $(function () { //Controla o Data Timer Picker

    $('#datetimepicker1').datetimepicker({
      format:"DD-MM-YYYY HH:mm",
      //defaultDate: moment([]),
    });

    $('#datetimepicker1').on("change.datetimepicker", function(e){
     receberDiaHora(e.date.format("DD/MM/YYYY"), e.date.format("LT")) ;
   })

  }); 
  //Inicializar Checkbox
  $('#CheckboxTodos').prop('checked', true)
  $('#CheckboxAcelerador').prop('checked', true);
  $('#CheckboxCatalisadores').prop('checked', true);  
  $('#CheckboxAdvogados').prop('checked', true); 
  $('#CheckboxComunicacao').prop('checked', true); 
  $('#CheckboxConexao').prop('checked', true); 
  $('#CheckboxConteudo').prop('checked', true); 
  $('#CheckboxCoworking').prop('checked', true);
  $('#CheckboxCreditos').prop('checked', true); 
  $('#CheckboxEditais').prop('checked', true);
  $('#CheckboxEscolas').prop('checked', true);  
  $('#CheckboxMakers').prop('checked', true); 
  $('#CheckboxEventos').prop('checked', true); 
  $('#CheckboxFabricaApp').prop('checked', true); 
  $('#CheckboxGoverno').prop('checked', true); 
  $('#CheckboxEmpresas').prop('checked', true); 
  $('#CheckboxIncubadoras').prop('checked', true);
  $('#CheckboxiniUniversitarias').prop('checked', true);  
  $('#CheckboxInvestidores').prop('checked', true); 
  $('#CheckboxMissoes').prop('checked', true); 
  $('#CheckboxNucleos').prop('checked', true); 
  $('#CheckboxParques').prop('checked', true); 
  $('#CheckboxpreAceleradoras').prop('checked', true); 
  $('#CheckboxpropIntelectuais').prop('checked', true); 
  $('#CheckboxProvedores').prop('checked', true);
  $('#CheckboxMentoria').prop('checked', true);
  $('#CheckboxStartup').prop('checked', true);  

  $('#CheckboxTodos').change(function() {//Implementa a função do checkbok "Tudo"
    if ($(this).prop('checked') == true) {
      $('#CheckboxTodos').prop('checked', true)
      $('#CheckboxAcelerador').prop('checked', true);
      $('#CheckboxCatalisadores').prop('checked', true);  
      $('#CheckboxAdvogados').prop('checked', true); 
      $('#CheckboxComunicacao').prop('checked', true); 
      $('#CheckboxConexao').prop('checked', true); 
      $('#CheckboxConteudo').prop('checked', true); 
      $('#CheckboxCoworking').prop('checked', true);
      $('#CheckboxCreditos').prop('checked', true); 
      $('#CheckboxEditais').prop('checked', true);
      $('#CheckboxEscolas').prop('checked', true);  
      $('#CheckboxMakers').prop('checked', true); 
      $('#CheckboxEventos').prop('checked', true); 
      $('#CheckboxFabricaApp').prop('checked', true); 
      $('#CheckboxGoverno').prop('checked', true); 
      $('#CheckboxEmpresas').prop('checked', true); 
      $('#CheckboxIncubadoras').prop('checked', true);
      $('#CheckboxiniUniversitarias').prop('checked', true);  
      $('#CheckboxInvestidores').prop('checked', true); 
      $('#CheckboxMissoes').prop('checked', true); 
      $('#CheckboxNucleos').prop('checked', true); 
      $('#CheckboxParques').prop('checked', true); 
      $('#CheckboxpreAceleradoras').prop('checked', true); 
      $('#CheckboxpropIntelectuais').prop('checked', true); 
      $('#CheckboxProvedores').prop('checked', true);
      $('#CheckboxMentoria').prop('checked', true);
      $('#CheckboxStartup').prop('checked', true); 
    }
    if ($(this).prop('checked') == false) {
      $('#CheckboxTodos').prop('checked', false)
      $('#CheckboxAcelerador').prop('checked', false);
      $('#CheckboxCatalisadores').prop('checked', false);  
      $('#CheckboxAdvogados').prop('checked', false); 
      $('#CheckboxComunicacao').prop('checked', false); 
      $('#CheckboxConexao').prop('checked', false); 
      $('#CheckboxConteudo').prop('checked', false); 
      $('#CheckboxCoworking').prop('checked', false);
      $('#CheckboxCreditos').prop('checked', false); 
      $('#CheckboxEditais').prop('checked', false);
      $('#CheckboxEscolas').prop('checked', false);  
      $('#CheckboxMakers').prop('checked', false); 
      $('#CheckboxEventos').prop('checked', false); 
      $('#CheckboxFabricaApp').prop('checked', false); 
      $('#CheckboxGoverno').prop('checked', false); 
      $('#CheckboxEmpresas').prop('checked', false); 
      $('#CheckboxIncubadoras').prop('checked', false);
      $('#CheckboxiniUniversitarias').prop('checked', false);  
      $('#CheckboxInvestidores').prop('checked', false); 
      $('#CheckboxMissoes').prop('checked', false); 
      $('#CheckboxNucleos').prop('checked', false); 
      $('#CheckboxParques').prop('checked', false); 
      $('#CheckboxpreAceleradoras').prop('checked', false); 
      $('#CheckboxpropIntelectuais').prop('checked', false); 
      $('#CheckboxProvedores').prop('checked', false);
      $('#CheckboxMentoria').prop('checked', false);
      $('#CheckboxStartup').prop('checked', false); 
    }
  });
})