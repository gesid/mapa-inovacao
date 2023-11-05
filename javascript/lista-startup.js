const listaDeStartup = document.querySelector("#listaDeStartup");
const selecionadorPagina = document.querySelector("#selecionadorPagina");
const proximo = document.querySelector("#proximo");
const anterior = document.querySelector("#anterior");
const barraBuscaStartupMobile = document.querySelector(
  "#barraBuscaStartupMobile"
);
let uploader1SelectedFile = "";
let listaStartupStorage = firebase.storage();
let array = [];
let tipoDeBuscaStartup;
let paginaMaxima;
const numeroStartups = 24;
let pagina = window.location.href.split("=")[1];
let classificacao = "";
let titulo = undefined;
let fase = "";
let publico = "";
let receitas = "";

let traducao = document.getElementById("languageSwitcher");
translateSearchBox();

traducao.onchange = function(){
  translateSearchBox();
}

if (window.location.href.includes("titulo")) {
  titulo = window.location.href.split("?")[1].split("&")[0].split("=")[1] || 1;
} else if (window.location.href.includes("classificacao")) {
  classificacao =
    window.location.href.split("?")[1].split("&")[0].split("=")[1] || 1;
  fase = undefined;
  receitas = undefined;
} else if (window.location.href.includes("fase")) {
  fase = window.location.href.split("?")[1].split("&")[0].split("=")[1] || 1;
  console.log(fase);
  classificacao = undefined;
  receitas = undefined;
} else if (window.location.href.includes("publico")) {
  publico = window.location.href.split("?")[1].split("&")[0].split("=")[1] || 1;
  console.log(fase);
  classificacao = undefined;
  fase = undefined;
  receitas = undefined;
} else if (window.location.href.includes("receitas")) {
  receitas =
    window.location.href.split("?")[1].split("&")[0].split("=")[1] || 1;
  console.log(fase);
  classificacao = undefined;
  fase = undefined;
} else {
  classificacao = undefined;
}
if (titulo) {
  pagina = window.location.href.split("&")[1].split("=")[1];
  selecionado = parseInt(pagina);
  numeroTotalStartupsPorTitulo(titulo).then((valor) => {
    if (valor / numeroStartups >= 1 && valor / numeroStartups <= 2) {
      carregarNumeroPaginas(2);
      paginaMaxima = 2;
    } else if (valor / numeroStartups >= 0 && valor / numeroStartups <= 1) {
      carregarNumeroPaginas(1);
      paginaMaxima = 1;
    } else {
      carregarNumeroPaginas(Math.round(valor / numeroStartups));
      paginaMaxima = Math.round(valor / numeroStartups);
    }
    filtrarPorTitulo(selecionado, titulo);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else if (classificacao != undefined && pagina) {
  pagina = window.location.href.split("&")[1].split("=")[1];
  selecionado = parseInt(pagina);
  numeroTotalStartupsPorClassificacao(classificacao).then((valor) => {
    if (valor / numeroStartups >= 1 && valor / numeroStartups <= 2) {
      carregarNumeroPaginas(2);
      paginaMaxima = 2;
    } else if (valor / numeroStartups >= 0 && valor / numeroStartups <= 1) {
      carregarNumeroPaginas(1);
      paginaMaxima = 1;
    } else {
      carregarNumeroPaginas(Math.round(valor / numeroStartups));
      paginaMaxima = Math.round(valor / numeroStartups);
    }
    filtrarPorClassificacao(selecionado, classificacao);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else if (fase) {
  pagina = window.location.href.split("&")[1].split("=")[1];
  selecionado = parseInt(pagina);
  console.log("aqui");
  numeroTotalStartupsPorFase(fase).then((valor) => {
    console.log(valor);
    if (valor / numeroStartups >= 1 && valor / numeroStartups <= 2) {
      carregarNumeroPaginas(2);
      paginaMaxima = 2;
    } else if (valor / numeroStartups >= 0 && valor / numeroStartups <= 1) {
      carregarNumeroPaginas(1);
      paginaMaxima = 1;
    } else {
      carregarNumeroPaginas(Math.round(valor / numeroStartups));
      paginaMaxima = Math.round(valor / numeroStartups);
    }
    filtrarPorFase(selecionado, fase);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else if (publico) {
  pagina = window.location.href.split("&")[1].split("=")[1];
  selecionado = parseInt(pagina);
  console.log("aqui");
  numeroTotalStartupsPorPublico(publico).then((valor) => {
    console.log(valor);
    if (valor / numeroStartups >= 1 && valor / numeroStartups <= 2) {
      carregarNumeroPaginas(2);
      paginaMaxima = 2;
    } else if (valor / numeroStartups >= 0 && valor / numeroStartups <= 1) {
      carregarNumeroPaginas(1);
      paginaMaxima = 1;
    } else {
      carregarNumeroPaginas(Math.round(valor / numeroStartups));
      paginaMaxima = Math.round(valor / numeroStartups);
    }
    filtrarPorpublico(selecionado, publico);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else if (receitas) {
  pagina = window.location.href.split("&")[1].split("=")[1];
  selecionado = parseInt(pagina);
  console.log("aqui");
  numeroTotalStartupsPorReceitas(receitas).then((valor) => {
    console.log(valor);
    if (valor / numeroStartups >= 1 && valor / numeroStartups <= 2) {
      carregarNumeroPaginas(2);
      paginaMaxima = 2;
    } else if (valor / numeroStartups >= 0 && valor / numeroStartups <= 1) {
      carregarNumeroPaginas(1);
      paginaMaxima = 1;
    } else {
      carregarNumeroPaginas(Math.round(valor / numeroStartups));
      paginaMaxima = Math.round(valor / numeroStartups);
    }
    filtrarPorReceitas(selecionado, receitas);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else if (pagina) {
  selecionado = parseInt(pagina);

  numeroTotalStartups().then((valor) => {
    carregarNumeroPaginas(Math.round(valor / numeroStartups));
    carregarStartups(selecionado);
    translateSearchBox();

    paginaMaxima = Math.round(valor / numeroStartups);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
} else {
  pagina = "1";
  selecionado = parseInt(pagina);
  numeroTotalStartups().then((valor) => {
    carregarNumeroPaginas(Math.round(valor / numeroStartups));
    paginaMaxima = Math.round(valor / numeroStartups);
    for (let i = 0; i < selecionadorPagina.children.length; i++) {
      selecionadorPagina.children[i].children[0].className = " ";
    }
    selecionadorPagina.children[selecionado].children[0].className = "active";
  });
  carregarStartups(1);
}


function translateSearchBox(){
  let traducao = document.getElementById("languageSwitcher");

  if (traducao.value == "pt"){
    barraBuscaStartupMobile.placeholder = "Busca: Por título ex: Agenda Edu";
  }else{
    barraBuscaStartupMobile.placeholder = "Search: For title ex: Agenda Edu";
  }
}



function verificarPropriedades(startup) {
  if (!startup.startup.Receitas) {
    startup.startup.Receitas = "Não informado";
  }
  if (!startup.startup.Publico) {
    startup.startup.Publico = "Não informado";
  }
  if (!startup.startup.Fase) {
    startup.startup.Fase = "Não informado";
  }
  return startup;
}
function adiconarStartupNoCard(startup) {
  startup = verificarPropriedades(startup);
  return `<div class="card shadow-sm bg-white" style="width: 13rem;
    height: 10rem; margin-left: 40px; margin-right: 15px; border-radius: 10px;border: none; margin-bottom: 20px;" >
      
    <div class="card-body">
        <div class="row" style="justify-content:center;">
            <img class="card-img-center" src="${startup.startup.URL}" alt="Card image cap"  style="width: 65px;height: 65px;">  
        </div>
        
        
        <div class="row" style="width: 100px; margin-left: 25%; display: flex; flex-direction: column; align-items: center;">
        <div class="row" style="display: flex; flex-direction: column; align-items: center;"> 
            <div class="card-title" style="white-space: nowrap;">${startup.startup.Nome}</div>
            <div class="classificao">${startup.startup.Classificacao}</div>
        </div>
    </div>
    


            <div class="row" style="justify-content:center;">
                
          <p class="conteudo-startup"> </p>
    
            <div id=popupBtnContainer>

            <a class="btnProp popupBtnLocalizacao" style="color: white"data-key ="${startup.key}" onclick="localizacaoStartup(this)" title="Localização"></i>
            <img src= "./img/localizacao-popup.jpg"style="margin-top: 2px; margin-left:1px;width:16px;height:16px;display:block;"/>
         
            </a>
            
            <a class="btnProp popupBtnSaibaMais" title="Saiba Mais" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onclick="" style="color: #FC6A38;">
            <img src= "./img/saiba-mais-popup.jpg" class = "imgPop" />
           
            </a>

            <a class="btnProp popupBtnAtualizar" style="color: white" id="${startup.key}" data-key ="${startup.key}" onclick="atualizarStartup(this)" title="Atualizar Startup"></i>
            <img src= "./img/atualizar.png" class = "imgPop" style="margin-top: 1px"/>
          

            <div class="dropdown-menu bg-white" id="dropdown" style="width: 13rem; height: auto;">
            <div class="card-body">
                <div class="row" style="margin-left: 5px; display: flex; align-items: center;">
                    <div style="margin-right: 5px;">
                        <img src="img/site-startup.PNG" class="card-img-left" alt="" style="width: 25px; height: 20px;">
                    </div>
                    <div>
                        <p class="card-text" style="font-size: 10px; font-weight: 400;">
                            ${startup.startup.Site}
                        </p>
                    </div>
                </div>
                <div class="row" style="margin-left: 5px; display: flex; align-items: center;">
                    <div style="margin-right: 5px;">
                        <img src="img/público.png" class="card-img-left" alt="" style="width: 25px; height: 25px;">
                    </div>
                    <div>
                        <p class="card-text" style="font-size: 10px; font-weight: 400;">
                            Publico alvo: ${startup.startup.Publico}
                        </p>
                    </div>
                </div>
                <div class="row" style="margin-left: 5px; display: flex; align-items: center;">
                    <div style="margin-right: 5px;">
                        <img src="img/fase.png" class="card-img-left" alt="" style="width: 25px; height: 25px;">
                    </div>
                    <div>
                        <p class="card-text" style="font-size: 10px; font-weight: 400;">
                            Fase: ${startup.startup.Fase}
                        </p>
                    </div>
                </div>
                <div class="row" style="margin-left: 5px; display: flex; align-items: center;">
                    <div style="margin-right: 5px;">
                        <img src="img/modelo.png" class="card-img-left" alt="" style="width: 24px; height: 25px;">
                    </div>
                    <div>
                        <p class="card-text" style="font-size: 10px; font-weight: 400;">
                           Modelo de receitas: ${startup.startup.Receitas} 
                        </p>
                    </div>
                </div>
           
       
        
         
         
      
        </div>
        </div>
        
      </div>`;
}

function carregarStartups(paginacao) {
  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        key = element.key;
        if (startup.Validacao === true) {
          array.push({
            startup,
            key,
          });
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}

function carregarNumeroPaginas(total) {
  if (titulo) {
    for (let i = 0; i < total; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `?titulo=${titulo}&pagina=${i + 1}`;
      a.innerHTML = i + 1;

      li.append(a);

      selecionadorPagina.insertBefore(li, proximo);
    }
  } else if (classificacao) {
    for (let i = 0; i < total; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `?classificacao=${classificacao}&pagina=${i + 1}`;
      a.innerHTML = i + 1;

      li.append(a);

      selecionadorPagina.insertBefore(li, proximo);
    }
  } else {
    for (let i = 0; i < total; i++) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = `?pagina=${i + 1}`;
      a.innerHTML = i + 1;
      li.append(a);

      selecionadorPagina.insertBefore(li, proximo);
    }
  }
}
function atualizarStartup(startup) {
  const nomeInput = document.querySelector("#nomeAtt");
  const siteInput = document.querySelector("#siteAtt");
  const tipoInput = document.querySelector("#tipoAtt");
  const latitudeAtt = document.querySelector("#latitudeAtt");
  const longitudeAtt = document.querySelector("#longitudeAtt");
  const CepAtt = document.querySelector("#CepAtt");
  const longradouroAtt = document.querySelector("#longradouroAtt");
  const numeroAtt = document.querySelector("#numeroAtt");
  const complementoAtt = document.querySelector("#complementoAtt");
  const bairroAtt = document.querySelector("#bairroAtt");
  const cidadeAtt = document.querySelector("#cidadeAtt");
  const UFAtt = document.querySelector("#UFAtt");
  const publicoAlvoAtt = document.querySelector("#publicoAlvoAtt");
  const modeloReceitaAtt = document.querySelector("#modeloReceitaAtt");
 
  const faseAtt = document.querySelector("#faseAtt");
  const imageAtt = document.querySelector("#imageAtt");
  const classificacaoAtt = document.getElementById("classificacaoAtt");
  let chave = startup.getAttribute("data-key");

  $("#imageAtt").on("change", function (event) {
    uploader1SelectedFile = event.target.files[0];
    document.getElementById("uploaderLabelImage").innerHTML =
      uploader1SelectedFile.name;
  });
  firebase
    .database()
    .ref("marcadores")
    .on("value", (snapshot) => {
      snapshot.forEach((element) => {
        if (element.key == chave) {
          console.log(element.val().Complemento);
          nomeInput.value = element.val().Nome;
          siteInput.value = element.val().Site;
          tipoInput.value = element.val().Tipo;

        
            dropdownStartupAtt.style.display = "block";
        
          latitudeAtt.value = element.val().Latitude;
          longitudeAtt.value = element.val().Longitude;
          CepAtt.value = element.val().CEP;
          longradouroAtt.value = element.val().Logradouro;
          numeroAtt.value = element.val().Numero;
          complementoAtt.value = element.val().Complemento;
          bairroAtt.value = element.val().Bairro;
          publicoAlvoAtt.value = element.val().Publico || "";
          classificacaoAtt.value = element.val().Classificacao;
          faseAtt.value = element.val().Fase || "1";
          modeloReceitaAtt.value = element.val().Receitas || "1";
          cidadeAtt.value = element.val().Cidade;
          UFAtt.value = element.val().UF;
          document.getElementById("btn-enviarAtt").onclick = function () {
            const dados = {
              Nome: nomeInput.value,
              Site: siteInput.value,
              Tipo: tipoInput.value,
              Latitude: latitudeAtt.value,
              Longitude: longitudeAtt.value,
              CEP: CepAtt.value,
              Fase: faseAtt.value,
              Publico: publicoAlvoAtt.value,
              Classificacao : classificacaoAtt.value,
              Modelo: modeloReceitaAtt.value,
              Logradouro: longradouroAtt.value,
              Numero: numeroAtt.value,
              Complemento: complementoAtt.value,
              Bairro: bairroAtt.value,
              Cidade: cidadeAtt.value,
              UF: UFAtt.value,
              key: chave,
              Validacao: false,
              Usuario: element.val().Usuario,
            };

            let storageRef = listaStartupStorage.ref("/arquivos/" + uploader1SelectedFile.name); // Define o caminho onde será guardada a imagem no storage
            let uploadTask = storageRef.put(uploader1SelectedFile); // guarda a imagem no storage
            uploadTask.on("state_changed", function (snapshot) {
              //entra sempre que o status mudar
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(function (downloadURL) {
                   dados.URL = downloadURL
                  firebase
                    .database()
                    .ref("marcadores")
                    .push(dados)
                    .then(function () {
                      alert(
                        "as informações foram encaminhadas para a validação "
                      );
                    })
                    .catch(function (error) {
                      console.log("erro ", error);
                    });

                  console.log(dados);
                });
            });
          };
        }
      });
    });
  $("#ModalAtualizacao").modal("show");
}

function fazerArrayComBaseNaPaginacao(arrayPaginacao, paginacao) {
  inicio = 0;
  let arrayPaginacaoStartup = [];

  if (paginacao == 1) {
    inicio = 0;
  } else {
    inicio = numeroStartups * paginacao - numeroStartups;
  }

  for (let i = inicio; i < numeroStartups * paginacao; i++) {
    if (arrayPaginacao[i]) {
      arrayPaginacaoStartup.push(arrayPaginacao[i]);
    }
  }

  return arrayPaginacaoStartup;
}

function listaStartupHtml(startup) {
  //const elementoListastartup = document.querySelector("#istaDeStartup");
  const htmlItemsListastartup = startup.map((patente) =>
    adiconarStartupNoCard(patente)
  );

  htmlItemsListastartup.forEach((card) => {
    listaDeStartup.innerHTML += card;
  });
}

function adicionarStartupNaRow(htmlItemsListastartup) {
  let listaDeStartupHtml = document.createElement("");

  htmlItemsListastartup.forEach((startup) => {
    listaStartupHtml += new String(startup);
  });
  return listaDeStartupHtml;
}

function localizacaoStartup(startup) {
  chave = startup.getAttribute("data-key");

  window.open(`index.html?share?${chave}`, "_blank");
}
function saibaMais(entidade) {
  chave = entidade.getAttribute("data-key");

  ultimoCardClicado = chave;
  localStorage.setItem("saiba", chave);
  if (entidade.innerHTML == "Saiba mais") {
    document.getElementById(chave).innerHTML = "Mostrar menos";
    document.getElementById(chave).style.width = "90px";
    document.getElementById(chave).style.fontSize = "9.8px";
  } else if (entidade.innerHTML == "Mostrar menos") {
    document.getElementById(chave).innerHTML = "Saiba mais";
    document.getElementById(chave).style.width = "80px";
    document.getElementById(chave).style.fontSize = "10.5px";
  }
}
/*
document.onclick = function () {
  if (clique == 1) {
    var valores = document.getElementsByClassName("diminuir");
    clique = 0;

    for (var i = 0; valores[i]; i++) {
      valores[i].innerHTML = "Saiba mais";
      valores[i].style.width = "100px";
    }
  }
};
*/

proximo.onclick = () => {
  if (titulo && pagina != paginaMaxima) {
    colocarUrlTitulo(parseInt(pagina) + 1, titulo);
  } else if (classificacao && pagina != paginaMaxima) {
    colocarUrlClassificacao(parseInt(pagina) + 1, classificacao);
  } else if (pagina != paginaMaxima) {
    window.location = "?pagina=" + (parseInt(pagina) + 1);
  }
};

function anteriorPa() {
  if (titulo && pagina != 1) {
    colocarUrlTitulo(parseInt(pagina) - 1, titulo);
  } else if (classificacao && pagina != 1) {
    colocarUrlClassificacao(parseInt(pagina) - 1, classificacao);
  } else if (pagina != 1) {
    window.location = "?pagina=" + (parseInt(pagina) - 1);
  }
}

function traducaoPlaceHolderPrincipal(tipoDeBuscaStartup){
  barraBuscaStartupMobile.placeholder = `Busca: por ${tipoDeBuscaStartup}`;
  if (tipoDeBuscaStartup == "classificação") {
    barraBuscaStartupMobile.placeholder += ` ex: Fintech`;
  } else if (tipoDeBuscaStartup == "título") {
    barraBuscaStartupMobile.placeholder += ` ex: Selletiva`;
  } else if (tipoDeBuscaStartup == "fase") {
    barraBuscaStartupMobile.placeholder += ` ex: Tração`;
  } else if (tipoDeBuscaStartup == "Publico alvo") {
    barraBuscaStartupMobile.placeholder += ` ex: Mulheres`;
  } else if (tipoDeBuscaStartup == "modelo de receitas") {
    barraBuscaStartupMobile.placeholder += ` ex: baseado em receitas`;
  }
}

function traducaoPlaceHolderPrincipalIngles(tipoDeBuscaStartup){
  barraBuscaStartupMobile.placeholder = `Search: For `;
  if (tipoDeBuscaStartup == "classificação") {
    barraBuscaStartupMobile.placeholder += `classification ex: Fintech`;
  } else if (tipoDeBuscaStartup == "título") {
    barraBuscaStartupMobile.placeholder += `title ex: Selletiva`;
  } else if (tipoDeBuscaStartup == "fase") {
    barraBuscaStartupMobile.placeholder += `phase ex: Traction`;
  } else if (tipoDeBuscaStartup == "Publico alvo") {
    barraBuscaStartupMobile.placeholder += `public target ex: Womans`;
  } else if (tipoDeBuscaStartup == "modelo de receitas") {
    barraBuscaStartupMobile.placeholder += `model revenue ex: based in revenue`;
  }
}

function selecionarTipoBuscaStartup(escolha) {
  tipoDeBuscaStartup = escolha.getAttribute("data-texto");
  let traducao = document.getElementById("languageSwitcher");
  if (traducao.value == "pt"){
    traducaoPlaceHolderPrincipal(tipoDeBuscaStartup);  
  }else{
    traducaoPlaceHolderPrincipalIngles(tipoDeBuscaStartup)
  }
}

function filtrarStartupPorTipoBusca() {
  filtrarStartup(tipoDeBuscaStartup);
}

function filtrarStartup(tipoBusca, texto) {
  //alert(tipoBusca);
  switch (tipoBusca) {
    case "classificação":
      colocarUrlClassificacao(1, barraBuscaStartupMobile.value);
      break;
    case "fase":
      //alert("aqui");
      colocarUrlFase(1, barraBuscaStartupMobile.value);
      break;
    case "Publico alvo":
      //alert("aqui");
      colocarUrlPublico(1, barraBuscaStartupMobile.value);
      break;
    case "modelo de receitas":
      //alert("aqui");
      colocarUrlReceitas(1, barraBuscaStartupMobile.value);
      break;
    default:
      colocarUrlTitulo(1, barraBuscaStartupMobile.value);
      break;
  }
}

function filtrarPorClassificacao(paginacao, tipo) {
  tipo = tipo.toLowerCase();
  let classificacaoAtual = "";
  array = [];

  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        classificacaoAtual = startup.Classificacao.toLowerCase();

        if (classificacaoAtual.includes(tipo)) {
          key = element.key;
          array.push({
            startup,
            key,
          });
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}

function filtrarPorFase(paginacao, tipo) {
  tipo = tipo.toLowerCase();
  let faseAtual = "";
  array = [];

  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Fase) {
          faseAtual = startup.Fase.toLowerCase();

          if (faseAtual.includes(tipo)) {
            key = element.key;
            array.push({
              startup,
              key,
            });
          }
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}
function filtrarPorpublico(paginacao, tipo) {
  tipo = tipo.toLowerCase();
  let publicoAtual = "";
  array = [];

  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Publico) {
          publicoAtual = startup.Publico.toLowerCase();

          if (publicoAtual.includes(tipo)) {
            key = element.key;
            array.push({
              startup,
              key,
            });
          }
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}

function filtrarPorReceitas(paginacao, tipo) {
  tipo = tipo.toLowerCase();
  let receitaAtual = "";
  array = [];

  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Receitas) {
          receitaAtual = startup.Receitas.toLowerCase();

          if (receitaAtual.includes(tipo)) {
            key = element.key;
            array.push({
              startup,
              key,
            });
          }
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}
function filtrarPorTitulo(paginacao, nome) {
  nome = nome.toLowerCase();
  let tituloAtual = "";
  array = [];

  listaDeStartup.innerHTML = " ";
  firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        tituloAtual = startup.Nome.toLowerCase();

        if (tituloAtual.includes(nome) && startup.Validacao == true) {
          key = element.key;
          array.push({
            startup,
            key,
          });
        }
      });

      let arrayPaginacao = fazerArrayComBaseNaPaginacao(array, paginacao);

      listaStartupHtml(arrayPaginacao);
    });
}

function colocarUrlClassificacao(paginacao, tipo) {
  window.location = `?classificacao=${tipo}&pagina=${paginacao}`;
}

function colocarUrlFase(paginacao, tipo) {
  window.location = `?fase=${tipo}&pagina=${paginacao}`;
}
function colocarUrlTitulo(paginacao, nome) {
  window.location = `?titulo=${nome}&pagina=${paginacao}`;
}
function colocarUrlPublico(paginacao, nome) {
  window.location = `?publico=${nome}&pagina=${paginacao}`;
}
function colocarUrlReceitas(paginacao, nome) {
  window.location = `?receitas=${nome}&pagina=${paginacao}`;
}
async function numeroTotalStartups() {
  let numero = 0;
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((entidade) => {
        startup = entidade.val();
        if (startup.Validacao === true) {
          numero++;
        }
      });
    });

  return numero;
}

async function numeroTotalStartupsPorClassificacao(classificacaoStartup) {
  let numero = 0;
  classificacaoStartup = classificacaoStartup.toLowerCase();
  let classificacaoAtual = "";
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        classificacaoAtual = startup.Classificacao.toLowerCase();
        if (
          classificacaoAtual.includes(classificacaoStartup) &&
          startup.Validacao == true
        ) {
          numero += 1;
        }
      });
    });
  return numero;
}

async function numeroTotalStartupsPorFase(fase) {
  let numero = 0;
  fase = fase.toLowerCase();
  let faseAtual = "";
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Fase) {
          faseAtual = startup.Fase.toLowerCase();
          if (faseAtual.includes(fase) && startup.Validacao == true) {
            numero += 1;
          }
        }
      });
    });
  return numero;
}
async function numeroTotalStartupsPorReceitas(receitas) {
  let numero = 0;
  receitas = receitas.toLowerCase();
  let receitasAtual = "";
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Receitas) {
          receitasAtual = startup.Receitas.toLowerCase();
          if (receitasAtual.includes(receitas) && startup.Validacao == true) {
            numero += 1;
          }
        }
      });
    });
  return numero;
}

async function numeroTotalStartupsPorPublico(publico) {
  let numero = 0;
  console.log(publico);
  publico = publico.toLowerCase();
  let publicoAtual = "";
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        if (startup.Publico) {
          console.log("oi");
          console.log(startup.Publico);
          publicoAtual = startup.Publico.toLowerCase();
          if (publicoAtual.includes(publico) && startup.Validacao == true) {
            console.log("aqui");
            numero += 1;
          }
        }
      });
    });
  return numero;
}
async function numeroTotalStartupsPorTitulo(titulo) {
  let numero = 0;
  titulo = titulo.toLowerCase();
  let tituloAtual = "";
  await firebase
    .database()
    .ref("marcadores")
    .orderByChild("Tipo")
    .startAt("Startup")
    .once("value")
    .then((results) => {
      results.forEach((element) => {
        startup = element.val();
        tituloAtual = startup.Nome.toLowerCase();
        if (tituloAtual.includes(titulo) && startup.Validacao == true) {
          numero += 1;
        }
      });
    });
  return numero;
}

/**Tradução placeholder barra de busca ao mudar o idioma*/
i18next.on('languageChanged', function(lng) {
  traducaoDoPlaceHolderBarraBuscaListaStartups();
  traducaoDoPlaceHolderLogradouro();
  traducaoDoPlaceHolderNome();
  traducaoDoPlaceHolderPublicoAlvo();
  traducaoDoPlaceHolderNumero();
  traducaoDoPlaceHolderBairro();
  traducaoDoPlaceHolderCidade();
  traducaoDoPlaceHolderComplemento();
})

function traducaoDoPlaceHolderComplemento() {
  let placeholderchange = document.getElementById("complementoAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.complemento")
   }
 }

function traducaoDoPlaceHolderCidade() {
  let placeholderchange = document.getElementById("cidadeAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.cidade")
   }
 }

function traducaoDoPlaceHolderBairro() {
  let placeholderchange = document.getElementById("bairroAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.bairro")
   }
 }

function traducaoDoPlaceHolderNumero() {
  let placeholderchange = document.getElementById("numeroAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.numero")
   }
 }

function traducaoDoPlaceHolderPublicoAlvo() {
  let placeholderchange = document.getElementById("publicoAlvoAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.publicoAlvo")
   }
 }

function traducaoDoPlaceHolderNome() {
  let placeholderchange = document.getElementById("nomeAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.nome")
   }
 }
function traducaoDoPlaceHolderLogradouro() {
  let placeholderchange = document.getElementById("longradouroAtt")
   if (placeholderchange) {
     placeholderchange.placeholder = i18next.t("navBar1.sectionFormulario.logradouro")
   }
 }

function traducaoDoPlaceHolderBarraBuscaListaStartups() {
  const DIV_DROPDOWN_MENU_OPCOES_DE_BUSCA = document.getElementsByClassName("form-control");

  if(DIV_DROPDOWN_MENU_OPCOES_DE_BUSCA){
    let tipoBarra = document.getElementById("barraBuscaStartupMobile").getAttribute("tipo-barra");
    //let tipoBarra = refBarraBuscaMobile.getAttribute("tipo-barra");
    let placeholderBuscaPatentes =  document.getElementsByName("barraBuscaStartupMobile")[0];
    if(tipoBarra == "titulo"){
      placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.depositante");
    }
    else if(tipoBarra == "classificacao"){
      placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.secao");
    }
    else if(tipoBarra == "fase"){
      placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.fase");
    }
    else if(tipoBarra == "publicoAlvo"){
      placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.publicoAlvo");
    }
    else if(tipoBarra == "receita"){
      placeholderBuscaPatentes.placeholder = i18next.t("patents.sectionPatents.barraDeBusca.labelPlaceholderCompleta.revenue");
    }
  }

  
 }