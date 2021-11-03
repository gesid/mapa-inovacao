//Variaveis
const database = firebase.database();
const storage = firebase.storage();

//Objeto DAO
/*var imported = document.createElement('script');
imported.src = 'usuariodao.js';
document.head.appendChild(imported);*/

let usuariodao = new usuarioDAO

firebase.auth().onAuthStateChanged(function (user) {
	let nome = document.getElementById('cadastroNome').value
	let email = document.getElementById('cadastroEmail').value
	let password = document.getElementById('cadastroPassword').value
	let passwordrepetido = document.getElementById('cadastroRepeatPassword').value

	if (user) {
		user.updateProfile({
			displayName: nome,
		}).then(function () {

			alert("Usuário cadastrado com sucesso")
			usuariodao.salvar(nome, email);

			enviar_verificação()

			//Envio para a página
			//window.location.href = "index.html";

		}).catch(function (error) {
			alert("Erro ao cadastrar usuário")
		})
	} else {
	}
});

function cadastro() {
	let nome = document.getElementById('cadastroNome').value
	let email = document.getElementById('cadastroEmail').value
	let password = document.getElementById('cadastroPassword').value
	let passwordrepetido = document.getElementById('cadastroRepeatPassword').value
	let checkTermos = document.getElementById('termos').checked

	if (password === passwordrepetido) {

		if (checkTermos) {

			usuariodao.cadastrar(email, password)

		} else { alert("É necessário ler os termos e aceita-los para realizar o cadastro") }

	} else { alert("As senhas estão diferentes") }

	
}

function enviar_verificação() {
	firebase.auth().currentUser.sendEmailVerification()
		.then(() => {
			// Email verification sent!

			window.alert("E-mail de verificação enviado");

		}).catch((error) => {

			window.alert("Erro: " + error.message);

		}).then(() => {
			firebase.auth().signOut()
		})
		.then(() => {
			window.location.href = "login.html"
		})
}