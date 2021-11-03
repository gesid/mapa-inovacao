class Usuario {
  constructor(nome, email){
    this.nome = nome
    this.email = email
    //this.imgUsuario = imgUsuario
  }
  getNome(){
    return this.nome
  }
  getEmail(){
    return this.email
  }
  getImagemBarra(){
    return this.imgUsuario
  }
}