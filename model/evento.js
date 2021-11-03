class Evento {
  constructor(nome, site, tipo, subtipo, descricao, dia, hora, url, latitude, longitude, logradouro, numero, complemento, bairro, cidade, uf, cep, markerKey, userId, validacao) {
    this.nome = nome
    this.site = site
    this.tipo = tipo
    this.subtipo = subtipo
    this.descricao = descricao
    this.dia = dia
    this.hora = hora
    this.url = url
    this.latitude = latitude
    this.longitude = longitude
    this.logradouro = logradouro
    this.numero = numero
    this.complemento = complemento
    this.bairro = bairro
    this.cidade = cidade
    this.uf = uf
    this.cep = cep
    this.markerKey = markerKey
    this.userId = userId
    this.validacao = validacao
  }
  getNome() {
    return this.nome
  }
  getSite() {
    return this.site
  }
  getTipo() {
    return this.tipo
  }
  getSubtipo() {
    return this.subtipo
  }
  getDescricao() {
    return this.descricao
  }
  getDia() {
    return this.dia
  }
  getHora() {
    return this.hora
  }
  getURL() {
    return this.url
  }
  getLat() {
    return this.latitude
  }
  getLng() {
    return this.longitude
  }
  getLogradouro() {
    return this.logradouro
  }
  getNumero() {
    return this.numero
  }
  getComplemento() {
    return this.complemento
  }
  getBairro() {
    return this.bairro
  }
  getCidade() {
    return this.cidade
  }
  getUF() {
    return this.uf
  }
  getCEP() {
    return this.cep
  }
  getMarkerKey() {
    return this.markerKey
  }
  getUserId() {
    return this.userId
  }
  getValidacao() {
    return this.validacao
  }
}