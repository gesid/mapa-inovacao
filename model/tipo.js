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

class Aceleradora extends componenteEco{
  constructor(){
    super('Aceleradora','01-aceleradora.png','01-aceleradora.png')
  }
}
class Advogados extends componenteEco{
  constructor(){
    super('Advogados','02-advogado.png','02-advogado.png')
  }
}
class Comunicacao extends componenteEco{
  constructor(){
    super('Comunicação e Mídia','03-comunicacao-e-midia.png','03-comunicacao-e-midia.png')
  }
}
class Conexao extends componenteEco{
  constructor(){
    super('Conexão com Mercado','04-conexao-com-mercado.png','04-conexao-com-mercado.png')
  }
}
class Conteudo extends componenteEco{
  constructor(){
    super('Conteúdo','05-conteudo.png','05-conteudo.png')
  }
}
class Coworking extends componenteEco{
  constructor(){
    super('Coworking','06-coworking.png','06-coworking.png')
  }
}
class Creditos extends componenteEco{
  constructor(){
    super('Créditos','07-credito.png','07-credito.png')
  }
}
class Editais extends componenteEco{
  constructor(){
    super('Editais','08-editais.png','08-editais.png')
  }
}
class Makers extends componenteEco{
  constructor(){
    super('Espaços Makers','09-espaco-maker.png','09-espaco-maker.png')
  }
}
class Eventos extends componenteEco{
  constructor(){
    super('Eventos','10-eventos.png','10-eventos.png')
  }
}
class FabricaApp extends componenteEco{
  constructor(){
    super('Fábrica de Aplicativos','11-fabrica-de-aplicativos.png','11-fabrica-de-aplicativos.png')
  }
}
class Governo extends componenteEco{
  constructor(){
    super('Governo','12-governo.png','12-governo.png')
  }
}
class Empresas extends componenteEco{
  constructor(){
    super('Grandes Empresas','13-grandes-empresas.png','13-grandes-empresas.png')
  }
}
class Incubadoras extends componenteEco{
  constructor(){
    super('Incubadoras','14-incubadora.png','14-incubadora.png')
  }
}
class Investidores extends componenteEco{
  constructor(){
    super('Investidores','15-investidores.png','15-investidores.png')
  }
}
class Missoes extends componenteEco{
  constructor(){
    super('Missões de Negócios','16-missoes-de-negocios.png','16-missoes-de-negocios.png')
  }
}
class Nucleo extends componenteEco{
  constructor(){
    super('Núcleos de Inovação','17-nucleo-de-inovacoes.png','17-nucleo-de-inovacoes.png')
  }
}
class Parques extends componenteEco{
  constructor(){
    super('Parques Tecnológicos','18-parques-tecnologicos.png','18-parques-tecnologicos.png')
  }
}
class preAceleradoras extends componenteEco{
  constructor(){
    super('Pré Aceleradoras','19-pre-aceleradoras.png','19-pre-aceleradoras.png')
  }
}
class propIntelectual extends componenteEco{
  constructor(){
    super('Propriedade Intelectual','20-propriedade-intelectual.png','20-propriedade-intelectual.png')
  }
}
class Provedores extends componenteEco{
  constructor(){
    super('Provedores de Serviços','21-provedores-de-servicos.png','21-provedores-de-servicos.png')
  }
}
class Mentoria extends componenteEco{
  constructor(){
    super('Mentoria','22-rede-de-mentoria.png','22-rede-de-mentoria.png')
  }
}

class Catalisadores extends componenteEco{
  constructor(){
    super('Catalisadores Locais','23-catalisadores-locais.png','23-catalisadores-locais.png')
  }
}

class Escolas extends componenteEco{
  constructor(){
    super('Escolas','24-escola.png','24-escolas.png')
  }
}

class iniUniversitarias extends componenteEco{
  constructor(){
    super('Iniciativas Universitárias','25-iniciativa-universitaria.png','25-iniciativa-universitaria.png')
  }
}

class Startups extends componenteEco{
  constructor(){
    super('Startup','26-startup.png','26-startup.png')
  }
}