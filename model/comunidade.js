class Comunidade {
  constructor(nome, site, cor, descricao, coordenadas, url, markerKey, userId){
    this.nome = nome
    this.site = site
    this.cor = cor
    this.descricao = descricao
    this.coordenadas = coordenadas
    this.url = url
    this.markerKey = markerKey
    this.userId = userId
  }
  getNome(){
    return this.nome
  }
  getSite(){
    return this.site
  }
  getCor(){
    return this.cor
  }
  getDescricao(){
    return this.descricao
  }
  getCoordenadas(){
    return this.coordenadas
  }
  getURL(){
    return this.url
  }
  getMarkerKey(){
    return this.markerKey
  }
  getUserId(){
    return this.userId
  }
}