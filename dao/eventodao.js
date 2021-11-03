class eventoDAO {

	salvar(objEvento, uploader) {
		//Capturando os valores do formulário
		if (uploader === "") {
			alert("Adicione a logo")
		}
		if (objEvento.getNome() != "" && objEvento.getSite() != "" && objEvento.getSubtipo() != "" && objEvento.getDia() != "" && objEvento.getHora() != "" && objEvento.getLat() != "" && objEvento.getLng() != "" && objEvento.getLogradouro() != "" && objEvento.getNumero() != "" && objEvento.getCidade() != "" && objEvento.getUF() != "" && objEvento.getCEP() != "") {
			let storageRef = storage.ref('/arquivos/' + uploader.name); // Define o caminho onde será guardada a imagem no storage
			let uploadTask = storageRef.put(uploader); // guarda a imagem no storage

			const rootRef = database.ref('/marcadores'); // define onse sera armazenada a imagem no database
			const autoId = rootRef.push().key //cria uma key

			uploadTask.on('state_changed', function (snapshot) { //entra empre que o status mudar
				uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {//Captura o URL da imagem upada no storage
					rootRef.child(autoId).set({//guarda as nformações no database/
						URL: downloadURL,
						Nome: objEvento.getNome(),
						Site: objEvento.getSite(),
						Tipo: objEvento.getTipo(),
						Subtipo: objEvento.getSubtipo(),
						Descricao: objEvento.getDescricao(),
						Latitude: objEvento.getLat(),
						Longitude: objEvento.getLng(),
						Dia: objEvento.getDia(),
						Hora: objEvento.getHora(),
						Logradouro: objEvento.getLogradouro(),
						Numero: objEvento.getNumero(),
						Complemento: objEvento.getComplemento(),
						Bairro: objEvento.getBairro(),
						Cidade: objEvento.getCidade(),
						UF: objEvento.getUF(),
						CEP: objEvento.getCEP(),
						Usuario: objEvento.getUserId(),
						Validacao: false
					})

					$('#ModalCadastro').modal('hide');

					document.getElementById("instituicaoEvento").innerHTML = "Obrigado por cadastrar seu Evento!"

					document.getElementById("instituicaoEventoTx2").innerHTML = `As informações estão <b><font color="green">em análise</font></b>, em breve seu evento será adicionado ao mapa!`

					$('#modalAgradecimento').modal('show');

				});
			})
		}
		else {

			alert("Preencha todos os campos obrigatórios")
		}
	}

	buscar(eventoId) {
		let evento = []
		const rootRef = database.ref('/marcadores/' + userId);
		rootRef.once('value').then(function (snapshot) {
			usuario.push(snapshot.val())
		})
		return evento
	}

	buscarPorNome(tipoBusca, eventoNome) {
		let eventosArray = []
		const rootRef = database.ref('/marcadores');

		return rootRef.once('value').then(function (snapshot) { // Filtragem da barra
			snapshot.forEach(function (child) {
				let evento = new Evento(
					child.val().Nome,
					child.val().Site,
					child.val().Tipo,
					child.val().Subtipo,
					child.val().Descricao,
					child.val().Dia,
					child.val().Hora,
					child.val().URL,
					child.val().Latitude,
					child.val().Longitude,
					child.val().Logradouro,
					child.val().Numero,
					child.val().Complemento,
					child.val().Bairro,
					child.val().Cidade,
					child.val().UF,
					child.val().CEP,
					child.key,
					child.val().Usuario,

				)

				if (tipoBusca === "Nome") {
					if (evento.getNome() === eventoNome) {
						eventosArray.push(evento)
					}
				}
				else {
					if (evento.getSubtipo() === eventoNome) {
						eventosArray.push(evento)
					}
				}
			})
			return eventosArray
		})

	}

	varredura() {
		//Testar se eu consigo salvar todos as entides do banco de dados em variáveis locais;
		let eventosArray = []
		const rootRef = database.ref('/marcadores');

		return rootRef.once('value').then(function (snapshot) {
			snapshot.forEach(function (child) {
				let evento = new Evento(
					child.val().Nome,
					child.val().Site,
					child.val().Tipo,
					child.val().Subtipo,
					child.val().Descricao,
					child.val().Dia,
					child.val().Hora,
					child.val().URL,
					child.val().Latitude,
					child.val().Longitude,
					child.val().Logradouro,
					child.val().Numero,
					child.val().Complemento,
					child.val().Bairro,
					child.val().Cidade,
					child.val().UF,
					child.val().CEP,
					child.key,
					child.val().Usuario,
					child.val().Validacao,
				)

				if (evento.getTipo() === "Eventos" && evento.getValidacao() === true) { eventosArray.push(evento) }

			})
			return eventosArray
		})
	}
}