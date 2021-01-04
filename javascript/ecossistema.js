const database = firebase.database();
const storage = firebase.storage();
//Objeto DAO
let eventodao = new eventoDAO;

/////////MAIN//////////////////
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    document.getElementById('log').innerHTML = `<i class="fas fa-sign-out-alt"></i>
    <p style="margin-bottom: 8px;"><small>Sair</small></p>`
    document.getElementById('log').setAttribute("data-status","logado");
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

buscarEventos();

///////////////////////////////

function buscarEventos(){
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
}

function telaUsuario(componente){
  let status = $("#log").attr("data-status");
  if(status==="logado"){
    
    window.location = "usuario.html?"+ componente.getAttribute("data-key")
  }
  else{
    window.location.href="login.html"
  }
}