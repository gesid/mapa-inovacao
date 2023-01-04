const firebaseDatabase = firebase.database();

class PatenteDAO {
  async listarPatentesPorDepositante(idDepositante) {
    const patentesFirebase = await this.buscarPatentesFirebasePorDepositante(
      idDepositante
    );
    const patentes = patentesFirebase.map(this.converterItemFirebasePatente);
    return patentes;
  }

  async buscarPatentesFirebasePorDepositante(idDepositante) {
    const patentesFirebase = [];

    const rootRef = firebaseDatabase.ref("/patentes");
    const snapshot = await rootRef
      .orderByChild("IdDepositante")
      .equalTo(idDepositante)
      .once("value");

    snapshot.forEach((child) => {
      const patenteValidada = Boolean(child.val().Validacao);
      if (patenteValidada) {
        patentesFirebase.push(child);
      }
    });

    return patentesFirebase;
  }

  async listarTodasPatentes() {
    const patentesFirebase = await this.buscarTodasPatentesFirebase();
    const patentes = patentesFirebase.map(this.converterItemFirebasePatente);
    return patentes;
  }

  async buscarTodasPatentesFirebase() {
    const patentesFirebase = [];

    const rootRef = firebaseDatabase.ref("/patentes");
    const snapshot = await rootRef.orderByChild("Titulo").once("value");

    snapshot.forEach((child) => {
      const patenteValidada = Boolean(child.val().Validacao);
      if (patenteValidada) {
        patentesFirebase.push(child);
      }
    });

    return patentesFirebase;
  }

  converterItemFirebasePatente(patenteFirebase) {
    const patente = new Patente();

    patente.keyFirebase = patenteFirebase.key;
    patente.titulo = patenteFirebase.val().Titulo;
    patente.descricao = patenteFirebase.val().Descricao;
    patente.numeroPedidoInpi = patenteFirebase.val().NumeroPedidoInpi;
    patente.dataPublicacao = patenteFirebase.val().DataPublicacao;

    patente.secoes = patenteFirebase.val().Secoes;
    patente.classificacoes = patenteFirebase.val().Classificacoes;

    patente.depositantes = patenteFirebase.val().Depositantes;

    patente.userId = patenteFirebase.val().Usuario;
    patente.validacao = patenteFirebase.val().Validacao;

    return patente;
  }

  async salvarPatente(patente) {
    if (!patente) {
      window.alert("Preencha todas as informações");
      return;
    }

    const rootRef = firebaseDatabase.ref("/patentes");
    const autoId = rootRef.push().key;

    await rootRef.child(autoId).set({
      Titulo: patente.titulo,
      Descricao: patente.descricao,
      Secoes: patente.secoes,
      Classificacoes: patente.classificacoes,
      NumeroPedidoInpi: patente.numeroPedidoInpi,
      DataPublicacao: patente.dataPublicacoPatente,
      Depositantes: patente.depositantes,
      Validacao: false,
      Usuario: patente.userId,
    });
  }

  capitalizarTituloPatente(tituloPatente) {
    const palavrasString = tituloPatente.split(" ");
    const palavrasIgnoradas = ["0", "a", "os", "as", "das", "dos", "de", "do"];

    for (var i = 0; i < palavrasString.length; i++) {
      if (palavrasIgnoradas.includes(palavrasString[i].toLowerCase())) {
        palavrasString[i] = palavrasString[i].toLowerCase();
      } else {
        palavrasString[i] =
          palavrasString[i].charAt(0).toUpperCase() +
          palavrasString[i].slice(1).toLowerCase();
      }
    }

    const tituloPatenteCapitalizada = palavrasString.join(" ");
    return tituloPatenteCapitalizada;
  }
}
