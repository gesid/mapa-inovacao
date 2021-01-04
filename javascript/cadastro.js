//Variaveis
const database = firebase.database();
const storage = firebase.storage();
//Objeto DAO
let usuariodao = new usuarioDAO


firebase.auth().onAuthStateChanged(function(user) {
	let nome = document.getElementById('cadastroNome').value
	let sexo = document.getElementById('cadastroSexo').value
	let email = document.getElementById('cadastroEmail').value
	let password = document.getElementById('cadastroPassword').value
	let passwordrepetido = document.getElementById('cadastroRepeatPassword').value

	if (user) { 	
		user.updateProfile({
			displayName: nome,
			sexo: sexo,
		}).then(function() {
			alert("Usuário cadastrado com sucesso")
			usuariodao.salvar(nome,sexo,email);
			window.location.href="index.html";
		}).catch(function(error) {
			alert("Erro ao cadastrar usuário")
		});  
	}else {
	}
});

function Cadastro(){
	let nome = document.getElementById('cadastroNome').value
	let sexo = document.getElementById('cadastroSexo').value
	let email = document.getElementById('cadastroEmail').value
	let password = document.getElementById('cadastroPassword').value
	let passwordrepetido = document.getElementById('cadastroRepeatPassword').value

	usuariodao.cadastrar(nome, sexo, email, password, passwordrepetido)
}