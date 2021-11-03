class usuarioDAO{
	
  salvar(objUsuario){

  }
  buscar(userId){
   const rootRef = database.ref('/Usuario/'+ userId);
   rootRef.once('value').then(function(snapshot){
    //console.log(snapshot.val().Nome)

  })
 }
}