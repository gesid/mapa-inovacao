class Patente {
  keyFirebase = "";
  titulo = "";
  descricao = "";
  numeroPedidoInpi = "";

  secoes = [];
  classificacoes = "";

  dataPublicacao = "";

  depositantes = [];

  userId = "";
  validacao = false;

  gerarLinkMapa() {
    return `https://mapainovacao.ufc.br/?share?${this.idFirebase}`;
  }
}
