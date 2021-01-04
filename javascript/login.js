//Variáveis do script
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

function login(){
	let userEmail = document.getElementById('email_field').value
	let userPassword = document.getElementById('password_field').value

	firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;

	  window.alert("Error: " + errorMessage);
	});
}

function logout(){
	firebase.auth().signOut().then(function() {
  }).catch(function(error) {
  });
}

function usuarioLogado(){
	let user = firebase.auth().currentUser;
	let nome, email, sexo, uid;
	alert(user)
	if (user != null) {
	  nome = user.displayName;
	  email = user.email;
	  sexo = user.sexo;
	  uid = user.uid;
	}	
}

function gerenciarEntradaSaida(){
  document.getElementById('log').getAttribute("data-status");
  if (document.getElementById('log').getAttribute("data-status")==="logado"){
    logout()
    alert("Você está deslogado")
  }else{
    window.location.href="login.html"
  }
}