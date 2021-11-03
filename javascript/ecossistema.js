const database = firebase.database();
const storage = firebase.storage();
//Objeto DAO


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