const database = firebase.database();
const storage = firebase.storage();
//Objeto DAO

/**Tradução imagens */
i18next.on('languageChanged', function(lng){
  traducaoImagemProjeto();
  traducaoImagemVideo();
});

function traducaoImagemProjeto(){
  let imagem = document.getElementById("img5-prop");
  imagem.setAttribute("src", `${i18next.t("sectionDesenvolvimento2.imagemProjetoOnMouseOut")}`);
  imagem.setAttribute("onmouseout", `this.src = '${i18next.t("sectionDesenvolvimento2.imagemProjetoOnMouseOut")}';`);
  imagem.setAttribute("onmouseover", `this.src = '${i18next.t("sectionDesenvolvimento2.imagemProjetoOnMouseOver")}';`);
}

function traducaoImagemVideo(){
  let imagem = document.getElementById("img6-prop");
  imagem.setAttribute("src", `${i18next.t("sectionDesenvolvimento2.imagemVideoOnMouseOut")}`);
  imagem.setAttribute("onmouseout", `this.src = '${i18next.t("sectionDesenvolvimento2.imagemVideoOnMouseOut")}';`);
  imagem.setAttribute("onmouseover", `this.src = '${i18next.t("sectionDesenvolvimento2.imagemVideoOnMouseOver")}';`);
}


/////////MAIN//////////////////


///////////////////////////////

/*function buscarEventos(){
  eventodao.varredura().then(function(evento){
    for (var i = 0; i < 2; i++) {
      criarEventos(evento[i])
    }
  })
}

function criarEventos(evento){
  let template = document.querySelector('#templateEventos');
  let listaEventos = document.querySelector('#listaEventos');
  let data = template.content.querySelector("p");
  let titulo = template.content.querySelector("a");
  
  titulo.textContent = evento.getNome()
  titulo.setAttribute("href","https://"+evento.getSite());
  data.textContent = evento.getDia()

  listaEventos.appendChild(document.importNode(template.content,true));  
}*/