class Usuario {
  constructor(nome, email, sexo){
    this.nome = nome
    this.email = email
    this.sexo = sexo
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