class RegiaoDao {
  buscarPorNome(cmmNome) {
    const rootRef = database.ref("/Regiões");
    return rootRef
      .orderByChild("Nome")
      .equalTo(cmmNome)
      .once("child_added")
      .then(function (child) {
        // Filtragem da barra
        let comunidade = new Regiao(
          child.val().Nome,
          child.val().Site,
          child.val().Cor,
          child.val().Descricao,
          child.val().Coordenadas,
          child.val().URL,
          child.key,
          child.val().Usuario
        );
        return comunidade;
      });
  }

  buscarPorNome(cmmNome) {
    const rootRef = database.ref("/Regiões");
    return rootRef
      .orderByChild("Nome")
      .equalTo(cmmNome)
      .once("child_added")
      .then(function (child) {
        // Filtragem da barra
        let comunidade = new Regiao(
          child.val().Nome,
          child.val().Site,
          child.val().Cor,
          child.val().Descricao,
          child.val().Coordenadas,
          child.val().URL,
          child.key,
          child.val().Usuario
        );
        return comunidade;
      });
  }
  varredura() {
    //Testar se eu consigo salvar todos as entides do banco de dados em variáveis locais;
    let regiaoArray = [];
    const rootRef = database.ref("/Regiões");

    return rootRef.once("value").then(function (snapshot) {
      snapshot.forEach(function (child) {
        let comunidade = new Regiao(
          child.val().Nome,
          child.val().Site,
          child.val().Cor,
          child.val().Descricao,
          child.val().Coordenadas,
          child.val().URL,
          child.key,
          child.val().Usuario
        );
        regiaoArray.push(comunidade);
      });
      return regiaoArray;
    });
  }
}
