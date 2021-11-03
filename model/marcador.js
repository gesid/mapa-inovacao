class componenteEco{
  constructor(nome,imgBarra,imgMarcador){
    this.nome = nome
    this.caminhoBarra = "img/img-bl/"
    this.caminhoMarcador = "img/img-marker/"
    this.caminhoSombra = "img/img-marker/marker-shadow.png"
    this.imgBarra = imgBarra
    this.imgMarcador = imgMarcador
    this.badge = 0;
  }
  getNome(){
    return this.nome
  }
  getImagemBarra(){
    return this.caminhoBarra + this.imgBarra
  }
  getImagemMarcador(){
    return this.caminhoMarcador + this.imgMarcador
  }
  getImagemSombra(){
    return this.caminhoSombra
  }
  setBadge(badge){
    this.badge = badge
  }
  getBadge(){
    return this.badge
  }
}