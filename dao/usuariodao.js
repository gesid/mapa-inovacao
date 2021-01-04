class usuarioDAO{

	cadastrar(nome, sexo, email, password, passwordrepetido){

		if(password === passwordrepetido){
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  	// Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;

	  	window.alert("Error: " + errorMessage);
		});

		}else{alert("As senhas estão diferentes")}
	}

	salvar(nome,sexo,email){
		//let storageRef = storage.ref('/arquivos/'+uploader1SelectedFile.name); // Define o caminho onde será guardada a imagem no storage
    	//let uploadTask = storageRef.put(uploader1SelectedFile); // guarda a imagem no storage
      
    	const rootRef = database.ref('/Usuario'); // define onse sera armazenada a imagem no database
     	//uploadTask.on('state_changed', function(snapshot){ //entra empre que o status mudar
        //uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {//Captura o URL da imagem upada no storage
          rootRef.child(firebase.auth().currentUser.uid).set({//guarda as nformações no database/
          	Nome: nome,
          	Sexo: sexo,
          	Email: email,
          })
          //window.location.href="index.html";
      		//});
    	//})

	}

	buscar(userId){
		let usuarioArray = []
		const rootRef = database.ref('/Usuario/'+ userId);
		return rootRef.once('value').then(function(snapshot){
			let usuario = new Usuario(snapshot.val().Nome, snapshot.val().Email, snapshot.val().Sexo)
			usuarioArray.push(usuario)
			return usuario
		})
	}

	enviarRelato(titulo, tipo, relato){

		if (titulo!=""&&tipo!=""&&relato!="") 
		{   

	      	const rootRef = database.ref('/relatos'); // define onse sera armazenada a imagem no database
	      	const autoId = rootRef.push().key //cria uma key

	        rootRef.child(autoId).set({//guarda as nformações no database/
	        	Titulo: titulo,
	        	Relato: relato,
	        	Tipo: tipo,
	        	Usuario: usuarioLogadoKey
	        })
	        alert("Relatorio enviado")
	    }
	}
}