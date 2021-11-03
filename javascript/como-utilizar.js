//***********CÓDIGO LOGIN****************//
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
//***********CÓDIGO LOGIN FIM****************//

//Main
if(localStorage.getItem('comumKey')){  
    comumKey = localStorage.getItem('comumKey');
    localStorage.removeItem('comumKey');
    setTimeout(
    $('#divPrincipal').animate({scrollTop:$('#subtopico1').position().top},3000)
    , 2600);
}

/*const queryString = window.location.search;
if (queryString.slice(1)=="cadastro-comunidade"){
    setTimeout(
    $('#divPrincipal').animate({scrollTop:$('#subtopico1').position().top},3000)
    , 2500);
}*/

//Fim

function telaUsuario(componente){
  let status = $("#log").attr("data-status");
  if(status==="logado"){

    window.location = "usuario.html?"+ componente.getAttribute("data-key")
}
else{
    window.location.href="login.html"
}
}

$(document).ready(() => {

	$('#nl1').click(() => {//OBS: O comando position mostra relativo ao elemento pai o comando offset mostra em relação todo documento
        $('#divPrincipal').animate({scrollTop:$('#topico1').position().top},1000);
    })

    $('#nl2').click(() => {
    	$('#divPrincipal').animate({scrollTop:$('#topico2').position().top},1000);
    })

    $('#nl3').click(() => {
    	$('#divPrincipal').animate({scrollTop:$('#topico3').position().top},1000);
    })	

})