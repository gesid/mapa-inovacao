//Variáveis do script
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

function login() {

	let userEmail = document.getElementById('email_field').value
	let userPassword = document.getElementById('password_field').value

	firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {

		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = "Usuário e/ou senha icorretos";

		window.alert("Error: " + errorMessage);

	}).then(() => {

		if (firebase.auth().currentUser.emailVerified) {

			window.alert("Login realizado com sucesso")
			window.location.href = "index.html"

		}

		else{

			window.alert("E-mail não validado! Verifique sua caixa de e-mail.")
			firebase.auth().signOut()

		}
	})
}

function logout() {

	firebase.auth().signOut().then(function () {
	}).catch(function (error) {
	});

}

function usuarioLogado() {

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

function gerenciarEntradaSaida() {

	document.getElementById('btn-user').getAttribute("data-status");

	if (document.getElementById('btn-user').getAttribute("data-status") === "logado") {
		logout()
		alert("Você está deslogado")
	}

	else {
		window.location.href = "login.html"
	}

}