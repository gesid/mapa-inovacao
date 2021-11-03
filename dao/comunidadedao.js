class comunidadeDAO{

	salvar(objComunidade, uploader){
		//Capturando os valores do formulário
		if (objComunidade.getNome()!=""&&objComunidade.getSite()!=""&&objComunidade.getCoordenadas()!=""&&objComunidade.getCor()!=""&&objComunidade.getDescricao()!="") {
		    let storageRef = storage.ref('/arquivos/'+uploader.name); // Define o caminho onde será guardada a imagem no storage
		    let uploadTask = storageRef.put(uploader); // guarda a imagem no storage

		    const rootRef = database.ref('/Comunidades'); // define onse sera armazenada a imagem no database
		    const autoId = rootRef.push().key //cria uma key

		    uploadTask.on('state_changed', function(snapshot){ //entra empre que o status mudar
		    	uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {//Captura o URL da imagem upada no storage
		        	rootRef.child(autoId).set({//guarda as nformações no database/
		        		URL:downloadURL,
		        		Nome: objComunidade.getNome(),
		        		Site: objComunidade.getSite(),
		        		Cor: objComunidade.getCor(),
		        		Descricao: objComunidade.getDescricao(),
		        		Coordenadas: JSON.parse(objComunidade.getCoordenadas()),
		        		Usuario: objComunidade.getUserId(),
		        	})
		        	window.location.reload()
		        });
		    })
		}else{
			alert("Cadastro não finalizado, preencha todos os campos.")
		}
	}

	buscarPorID(commID){
		let comunidade = []
		const rootRef = database.ref('/Usuario/'+ commID);
		rootRef.once('value').then(function(snapshot){
			comunidade.push(snapshot.val())
		})
		return comunidade
	}

	buscarPorNome(cmmNome){
		const rootRef = database.ref('/Comunidades');
		return rootRef.orderByChild("Nome").equalTo(cmmNome).once('child_added').then(function(child){ // Filtragem da barra
			let comunidade = new Comunidade(
				child.val().Nome,
				child.val().Site,
				child.val().Cor,
				child.val().Descricao,
				child.val().Coordenadas,
				child.val().URL,
				child.key,
				child.val().Usuario,
				)
			return comunidade
		})
	}

	varredura(){
	//Testar se eu consigo salvar todos as entides do banco de dados em variáveis locais;
	let comunidadeArray = []
	const rootRef = database.ref('/Comunidades');

	return rootRef.once('value').then(function(snapshot){
		snapshot.forEach(function(child){
			let comunidade = new Comunidade(
				child.val().Nome,
				child.val().Site,
				child.val().Cor,
				child.val().Descricao,
				child.val().Coordenadas,
				child.val().URL,
				child.key,
				child.val().Usuario,
				)
			comunidadeArray.push(comunidade)
		})
		return comunidadeArray
	})
}
}