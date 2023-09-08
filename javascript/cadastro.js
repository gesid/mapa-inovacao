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

			alert(i18next.t("alert.usuarioCadastradoComSucesso"))
			usuariodao.salvar(nome, email);

			enviar_verificação()

			//Envio para a página
			//window.location.href = "index.html";

		}).catch(function (error) {
			alert(i18next.t("alert.erroAoCadrastrarUsuario"))
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

		} else { alert(i18next.t("alert.lerOsTermosParaCadastro")) }

	} else { alert(i18next.t("alert.asSenhasSaoDiferentes")) }

	
}

function enviar_verificação() {
	firebase.auth().currentUser.sendEmailVerification()
		.then(() => {
			// Email verification sent!

			window.alert(i18next.t("alert.emailDeVerificacaoEnviado"));

		}).catch((error) => {

			window.alert("Erro: " + error.message);

		}).then(() => {
			firebase.auth().signOut()
		})
		.then(() => {
			window.location.href = "login.html"
		})
}

/**Tradução placeholders */
i18next.on('languageChanged', function(lng) {
	const INPUTS = document.getElementsByClassName("card-login-form");
	INPUTS[0].placeholder = i18next.t("cadastro.placeholders.nomeCompleto");
	INPUTS[1].placeholder = i18next.t("cadastro.placeholders.email");
	INPUTS[2].placeholder = i18next.t("cadastro.placeholders.senha");
	INPUTS[3].placeholder = i18next.t("cadastro.placeholders.repetirSenha");	
});