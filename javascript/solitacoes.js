var nomeEnti;
firebase.auth().onAuthStateChanged(async function (user) {
  setTimeout(() => {}, 500);
  let usuario = user;
  console.log(usuario);
  if (usuario === null) {
    window.location.href = "index.html";
  }
  let ehAdmin;
  firebase
    .database()
    .ref("Usuario")
    .on("value", function (snapshot) {
      snapshot.forEach((element) => {
        if (
          element.val().Email == usuario.email &&
          element.val().Admin === true
        ) {
          ehAdmin = true;
        }
      });
      if (!ehAdmin) {
        window.location.href = "index.html";
      }
    });
});
//$("#patentes").modal("show");
function patentes() {
  firebase
    .database()
    .ref("patentes")
    .once("value", function (snapshot) {
      snapshot.forEach((item) => {
        var value = item.val();
        let divLista = document.createElement("tbody");
        divLista.id = "lista";

        divLista.style.cursor = "pointer";
        divLista.onclick = function () {
          $("#patentes").modal("show");

          const classificacao = document.querySelector("#classiPatente");
          const tituloPatente = document.getElementById("tituloPatente");
          const dataPatentes = document.querySelector("#dataPatentes");
          const depositantesPaten =
            document.querySelector("#depositantesPaten");
          const descri = document.querySelector("#descri");
          const inpi = document.querySelector("#inpi");
          const secoes = document.querySelector("#secoes");
          secoes.innerHTML = " ";
          for (let index = 0; index < value.Secoes.length; index++) {
            let option = document.createElement("option");

            option.innerHTML = value.Secoes[index];
            secoes.append(option);
          }
          depositantesPaten.innerHTML = " ";
          for (let index = 0; index < value.Depositantes.length; index++) {
            let option = document.createElement("option");
            option.innerHTML = value.Depositantes[index].nome;

            depositantesPaten.append(option);
          }

          tituloPatente.value = value.Titulo;
          classificacao.value = value.Classificacoes;
          dataPatentes.value = value.DataPublicacao;
          descri.value = value.Descricao;
          inpi.value = value.NumeroPedidoInpi;
          console.log(value.Observacao);
          if (value.Observacao != undefined) {
            let observacaoCasoTenha = document.getElementById("obP");

            observacaoCasoTenha.style.color = "black";
            document.getElementById("obsH5").style.display = "block";
            observacaoCasoTenha.innerHTML = value.Observacao;
            observacaoCasoTenha.style.display = "block";
          } else {
            let observacaoCasoTenha = document.getElementById("obP");

            document.getElementById("obsH5").style.display = "none";
            observacaoCasoTenha.style.display = "none";
          }

          document.getElementById("reprovadoPat").onclick = function () {
            let dados = {
              Classificacoes: classificacao.value,
              DataPublicacao: dataPatentes.value,
              Descricao: descri.value,
              NumeroPedidoInpi: inpi.value,
              Titulo: tituloPatente.value,
            };
            dados.Validacao = false;
            $("#modalPendencia").modal("show");
            document.getElementById("confirmarBTN").onclick = function () {
              dados.Observacao = document.getElementById("observacao").value;
              console.log(dados.Observacao);
              dados.Status = "reprovado";
              updatePatentes(item.key, dados);
            };
          };

          document.getElementById("aprovadoPat").onclick = function () {
            let dados = {
              Classificacoes: classificacao.value,
              DataPublicacao: dataPatentes.value,
              Descricao: descri.value,
              NumeroPedidoInpi: inpi.value,
              Titulo: tituloPatente.value,
            };
            dados.Validacao = true;
            dados.Observacao = document.getElementById("observacao").value;
            console.log(dados.Observacao);
            dados.Status = "aprovado";
            updatePatentes(item.key, dados);
          };
          document.getElementById("pendentePat").onclick = function () {
            let dados = {
              Classificacoes: classificacao.value,
              DataPublicacao: dataPatentes.value,
              Descricao: descri.value,
              NumeroPedidoInpi: inpi.value,
              Titulo: tituloPatente.value,
            };
            $("#patentes").modal("toggle");
            dados.Validacao = false;
            $("#modalPendencia").modal("show");
            document.getElementById("confirmarBTN").onclick = function () {
              dados.Observacao = document.getElementById("observacao").value;
              console.log(dados.Observacao);
              dados.Status = "pendente";
              updatePatentes(item.key, dados);
            };
          };
        };
        document.getElementById("paginasolitacao").appendChild(divLista);

        let tr = document.createElement("tr");
        divLista.appendChild(tr);

        let a = document.createElement("td");

        a.innerHTML = value.Titulo;
        a.className = "align-middle";
        tr.appendChild(a);

        let usuario = document.createElement("td");
        usuario.innerHTML = value.Usuario;
        usuario.className = "align-middle";
        usuario.id = "usuario";
        tr.appendChild(usuario);

        let data = document.createElement("td");

        usuario.innerHTML = "undefined";
        data.innerHTML = "undefined";

        data.className = "align-middle";
        data.id = "data";
        tr.appendChild(data);
        firebase
          .database()
          .ref("Usuario")
          .once("value", function (snapshot) {
            snapshot.forEach(function (item) {
              let usuarios = item.val();

              if (item.key == value.Usuario) {
                usuario.innerHTML = usuarios.Nome;
                data.innerHTML = usuarios.Email;
              }
            });
          });

        if (usuario.innerHTML.includes("@")) {
          usuario.innerHTML = "undefined";
          data.innerHTML = "undefined";
        }

        let categoria = document.createElement("td");
        categoria.innerHTML = "patentes";
        categoria.className = "align-middle";
        categoria.id = "categoria";
        tr.appendChild(categoria);

        let status = document.createElement("div");
        status.innerHTML = value.Status || "nova";
        status.className = "h-20 d-inline-block";

        if (value.Validacao == true) {
          status.id = "status-aprovado";
          status.innerHTML = "aprovada";
        } else if (value.Status === "reprovado") {
          status.id = "status-reprovado";
        } else if (value.Status == "pendente") {
          status.id = "status-pendente";
        } else {
          status.id = "status-novo";
          status.innerHTML = "novo";
        }

        tr.appendChild(status);
      });
    });
}

function numeroEntidade(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  numeroEntidades.innerHTML = num + (num > 1 ? "" : "");
  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
  });
}

function numeroComunidade(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  let contador = 0;
  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
    if (value.Tipo == "Eventos") {
      console.log(value.Tipo);
      contador++;
      numeroComunidades.innerHTML = contador;
    }
  });
}
function usuarios(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  numeroUsuarios.innerHTML = num + (num > 1 ? "" : "");
  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
  });
}
function marcadores(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  let contador = 0;

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();
    if (value.Validacao == false) {
      contador++;
      numeroMarcadores.innerHTML = contador;
    }
  });
}
function update(key, value) {
  console.log(value);
  var data = {
    Cidade: value.Cidade,
    Bairro: value.Bairro,
    CEP: value.CEP,
    //Classificacao: value.Classificacao,
    Complemento: value.Complemento,
    Latitude: value.Latitude,
    Logradouro: value.Logradouro,
    Longitude: value.Longitude,
    Nome: value.Nome,
    Numero: value.Numero,
    Site: value.Site,
    Tipo: value.Tipo,
    UF: value.UF,
    Usuario: value.Usuario,
    Validacao: true,
  };
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .update(data)
    .then(function () {
      console.log('entidade "' + data.Nome + '" atualizada com sucesso');
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}

function updatePatentes(key, dados) {
  firebase
    .database()
    .ref("patentes")
    .child(key)
    .update(dados)
    .then(function () {
      console.log('Patente "' + dados.Titulo + '" atualizada com sucesso');
      document.location.reload(true);
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}

function carregaSolicitacoes(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Validacao === false) {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      /** 
      divLista.addEventListener("click", () => {
        window.location.href = "#abre";
      });*/

      document.getElementById("listagem").appendChild(divLista);
      let nome = document.createElement("td");

      nome.className = "align-middle";

      divLista.appendChild(nome);

      let div1 = document.createElement("div");
      div1.className = "d-flex align-items-center";
      nome.appendChild(div1);

      let div2 = document.createElement("div");
      div2.className = "ms-3 lh-1";
      div1.appendChild(div2);

      let h5 = document.createElement("h5");
      h5.className = "mb-1";
      div2.appendChild(h5);

      let a = document.createElement("text-inherit");
      a.className = "mb-1";
      a.innerHTML = value.Nome;
      h5.appendChild(a);

      let tipo = document.createElement("td");
      tipo.innerHTML = value.Tipo;
      tipo.className = "align-middle";
      tipo.id = "tipo";
      divLista.appendChild(tipo);
    }
  });
}

function carregaCategorias(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  let aceleradora = 0;
  let catalisadores = 0;
  let comunicacao = 0;
  let coworking = 0;
  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Tipo === "Aceleradora") {
      aceleradora++;
    }
    if (value.Tipo === "Comunidades") {
      comunidades++;
    }

    if (value.Tipo === "Catalisadores Locais") {
      catalisadores++;
    }
    if (value.Tipo === "Comunicação e Mídia") {
      comunicacao++;
    }
    if (value.Tipo === "Coworking") {
      coworking++;
    }
  });

  document.getElementById("totalAcele").innerHTML = aceleradora;
  document.getElementById("totalCata").innerHTML = catalisadores;
  document.getElementById("totalComuni").innerHTML = comunicacao;
  document.getElementById("totalCowo").innerHTML = coworking;
}

function comunidades(dataSnapshot) {
  var num = dataSnapshot.numChildren();
  document.getElementById("totalComu").innerHTML = num + (num > 1 ? "" : "");
}

function apagarPaiEntidade(key) {
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .remove()
    .then((valor) => {
      alert("a entidade pai foi removida");
    });
}

function paginasolitacao(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Validacao === false) {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            reprovar(item.key, value, dados);
          };

          //document.location.reload(true);
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            pendente(item.key, value, dados);
            updateObservacacao(item.key, txtArea.value);
          };
        };

        //aprovar
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };
          if (value.key) {
            apagarPaiEntidade(value.key);
          }
          update(item.key, value, "aprovado", dados);
          document.location.reload(true);
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      let data = document.createElement("td");

      data.className = "align-middle";
      data.id = "data";

      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
              data.innerHTML = usuarios.Email;
            }
          });
        });

      tr.appendChild(data);

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";
      if (value.Status === "reprovado") {
        status.id = "status-reprovado";
      } else if (value.Status == "pendente") {
        status.id = "status-pendente";
      } else {
        status.id = "status-novo";
        status.innerHTML = "novo";
      }

      tr.appendChild(status);

      //operações no modal
    }
  });
}

//$(window).on('modal', function(){ ...});

function update(key, value, status, dados) {
  var data = {
    Validacao: true,
    Status: status,
    Nome: dados.Nome,
    Bairro: dados.Bairro,

    Cidade: dados.Cidade,
    Classificacao: dados.Classificacao,
    Complemento: dados.Complemento,
    Latitude: dados.Latitude,
    Longitude: dados.Longitude,

    Site: dados.Site,
    Tipo: dados.Tipo,
    UF: dados.UF,
  };
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .update(data)
    .then(function () {
      console.log('entidade "' + data.Nome + '" atualizada com sucesso');
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}
function updateObservacacao(key, obervacao) {
  var data = {
    Observacao: obervacao,
  };
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .update(data)
    .then(function () {
      console.log('entidade "' + data.Nome + '" atualizada com sucesso');
      document.location.reload(true);
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}
function reprovar(key, value, dados) {
  var data = {
    Validacao: false,
    Status: "reprovado",
    Nome: dados.Nome,
    Bairro: dados.Bairro,

    Cidade: dados.Cidade,
    Classificacao: dados.Classificacao,
    Complemento: dados.Complemento,
    Latitude: dados.Latitude,
    Longitude: dados.Longitude,

    Site: dados.Site,
    Tipo: dados.Tipo,
    UF: dados.UF,
  };
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .update(data)
    .then(function () {
      console.log('entidade "' + data.Nome + '" atualizada com sucesso');
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}

function pendente(key, value, dados) {
  var data = {
    Validacao: false,
    Status: "pendente",
    Nome: dados.Nome,
    Bairro: dados.Bairro,

    Cidade: dados.Cidade,
    Classificacao: dados.Classificacao,
    Complemento: dados.Complemento,
    Latitude: dados.Latitude,
    Longitude: dados.Longitude,

    Site: dados.Site,
    Tipo: dados.Tipo,
    UF: dados.UF,
  };
  firebase
    .database()
    .ref("marcadores")
    .child(key)
    .update(data)
    .then(function () {
      console.log('entidade "' + data.Nome + '" atualizada com sucesso');
    })
    .catch(function (error) {
      showError("falha ao atualizar entidade" + error);
      alert();
    });
}

function novasNoBanco(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (
      (value.Status == undefined || value.Status == null) &&
      value.Validacao == false
    ) {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            reprovar(item.key, value, dados);
          };
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            pendente(item.key, value, dados);
            updateObservacacao(item.key, txtArea.value);
          };
        };
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };
          update(item.key, value, "aprovado", dados);
          if (value.key) {
            apagarPaiEntidade(value.key);
          }
          document.location.reload(true);
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
            }
          });
        });

      let data = document.createElement("td");
      data.innerHTML = "";
      data.className = "align-middle";
      data.id = "data";
      tr.appendChild(data);

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";
      if (value.Status === "reprovado") {
        status.id = "status-reprovado";
      } else if (value.Status == "pendente") {
        status.id = "status-pendente";
      } else {
        status.id = "status-novo";
        status.innerHTML = "novo";
      }

      tr.appendChild(status);

      //operações no modal
    }
  });
}

function pendenteNoBanco(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Status == "pendente") {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            reprovar(item.key, value);
          };
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            pendente(item.key, value);
            updateObservacacao(item.key, txtArea.value);
          };
        };
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };
          update(item.key, value, "aprovado", dados);
          if (value.key) {
            apagarPaiEntidade(value.key);
          }
          document.location.reload(true);
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      let data = document.createElement("td");

      data.className = "align-middle";
      data.id = "data";
      tr.appendChild(data);
      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
              data.innerHTML = usuarios.Email;
            }
          });
        });

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";
      if (value.Status === "reprovado") {
        status.id = "status-reprovado";
      } else if (value.Status == "pendente") {
        status.id = "status-pendente";
      } else {
        status.id = "status-novo";
        status.innerHTML = "novo";
      }

      tr.appendChild(status);

      //operações no modal
    }
  });
}
function reprovadoNoBanco(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Status == "reprovado") {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            reprovar(item.key, value, dados);
          };
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            pendente(item.key, value, dados);
            updateObservacacao(item.key, txtArea.value);
          };
        };
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };
          update(item.key, value, "aprovado", dados);
          if (value.key) {
            apagarPaiEntidade(value.key);
          }
          document.location.reload(true);
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      let data = document.createElement("td");

      data.className = "align-middle";
      data.id = "data";
      tr.appendChild(data);
      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
              data.innerHTML = usuarios.Email;
            }
          });
        });

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";
      if (value.Status === "reprovado") {
        status.id = "status-reprovado";
      } else if (value.Status == "pendente") {
        status.id = "status-pendente";
      } else {
        status.id = "status-novo";
        status.innerHTML = "novo";
      }

      tr.appendChild(status);

      //operações no modal
    }
  });
}

function carregarTodasEntidades(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (true) {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);
        //aprovar
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };
          update(item.key, value, "aprovado", dados);
          if (value.key) {
            apagarPaiEntidade(value.key);
          }
          document.location.reload(true);
        };

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");

          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            let dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            reprovar(item.key, value, dados);
          };
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            pendente(item.key, value, dados);
            updateObservacacao(item.key, txtArea.value);
          };
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      let data = document.createElement("td");

      data.className = "align-middle";
      data.id = "data";
      tr.appendChild(data);
      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
              data.innerHTML = usuarios.Email;
            }
          });
        });

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";

      if (value.Validacao == true) {
        status.id = "status-aprovado";
        status.innerHTML = "aprovada";
      } else if (value.Status === "reprovado") {
        status.id = "status-reprovado";
      } else if (value.Status == "pendente") {
        status.id = "status-pendente";
      } else {
        status.id = "status-novo";
        status.innerHTML = "novo";
      }

      tr.appendChild(status);

      //operações no modal
    }
  });
}
function carregarAprovadasNoBanco(dataSnapshot) {
  var num = dataSnapshot.numChildren();

  dataSnapshot.forEach(function (item) {
    //percorre todos os elementos
    var value = item.val();

    if (value.Validacao == true) {
      console.log(value);
      let divLista = document.createElement("tbody");
      divLista.id = "lista";
      divLista.style.cursor = "pointer";
      divLista.onclick = function () {
        $("#myModal").modal("show");
        let nomeModal = document.getElementById("nomeModal");
        nomeModal.value = value.Nome;

        let siteModal = document.getElementById("siteModal");
        siteModal.value = value.Site;

        let tipoModal = document.getElementById("tipoModal");
        tipoModal.value = value.Tipo;

        let uploader1 = document.getElementById("imgModal");
        uploader1.src = value.URL;
        //alert(`${uploader1.naturalWidth} x ${uploader1.naturalHeight}`); //alerta para mostrar às dimensões da imagem
        setTimeout(() => {
          if (uploader1.naturalWidth == 200 && uploader1.naturalHeight == 200) {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está correto");
            document.getElementById("dimensoes").style.color = "green";
          } else {
            let dimensoes = (document.getElementById("dimensoes").innerHTML =
              "o tamanho está incorreto");
            document.getElementById("dimensoes").style.color = "red";
          }
        }, 1000);
        // uploader1.value = value.URL;

        let classiModal = document.getElementById("classiModal");
        classiModal.value = value.Classificacao;

        let latidudeModal = document.getElementById("latidudeModal");
        latidudeModal.value = value.Latitude;

        let longitudeModal = document.getElementById("longitudeModal");
        longitudeModal.value = value.Longitude;

        let complementoModal = document.getElementById("complementoModal");
        complementoModal.value = value.Complemento;

        let bairroModal = document.getElementById("bairroModal");
        bairroModal.value = value.Bairro;

        let cidadeModal = document.getElementById("cidadeModal");
        cidadeModal.value = value.Cidade;

        let ufModal = document.getElementById("ufModal");
        ufModal.value = value.UF;
        console.log(value);
        //aprovar
        let aprovado = document.getElementById("aprovado");
        aprovado.onclick = function () {
          dados = {
            Nome: nomeModal.value,
            Bairro: bairroModal.value,

            Cidade: cidadeModal.value,
            Classificacao: classiModal.value,
            Complemento: complementoModal.value,
            Latitude: latidudeModal.value,
            Longitude: longitudeModal.value,

            Site: siteModal.value,
            Tipo: tipoModal.value,
            UF: ufModal.value,
          };

          update(item.key, value, "aprovado", dados);

          document.location.reload(true);
        };

        let reprovado = document.getElementById("reprovado");
        reprovado.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            updateObservacacao(item.key, txtArea.value);
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            reprovar(item.key, value, dados);
          };
        };

        if (value.Observacao != undefined) {
          let observacaoCasoTenha = document.getElementById("ober");
          observacaoCasoTenha.style.color = "black";
          document.getElementById("obsH5").style.display = "block";
          observacaoCasoTenha.innerHTML = value.Observacao;
          observacaoCasoTenha.style.display = "block";
        } else {
          let observacaoCasoTenha = document.getElementById("ober");
          console.log(observacaoCasoTenha);
          document.getElementById("obsH5").style.display = "none";
          observacaoCasoTenha.style.display = "none";
        }
        let penden = document.getElementById("pendente");
        penden.onclick = function () {
          $("#modalPendencia").modal("show");
          let txtArea = document.getElementById("observacao");
          document.getElementById("confirmarBTN").onclick = function () {
            dados = {
              Nome: nomeModal.value,
              Bairro: bairroModal.value,

              Cidade: cidadeModal.value,
              Classificacao: classiModal.value,
              Complemento: complementoModal.value,
              Latitude: latidudeModal.value,
              Longitude: longitudeModal.value,

              Site: siteModal.value,
              Tipo: tipoModal.value,
              UF: ufModal.value,
            };
            pendente(item.key, value, dados);
            updateObservacacao(item.key, txtArea.value);
          };
        };
      };

      document.getElementById("paginasolitacao").appendChild(divLista);

      let tr = document.createElement("tr");
      divLista.appendChild(tr);

      let a = document.createElement("td");

      a.innerHTML = value.Nome;
      a.className = "align-middle";
      tr.appendChild(a);

      let usuario = document.createElement("td");
      usuario.innerHTML = value.Usuario;
      usuario.className = "align-middle";
      usuario.id = "usuario";
      tr.appendChild(usuario);

      let data = document.createElement("td");

      data.className = "align-middle";
      data.id = "data";
      tr.appendChild(data);
      firebase
        .database()
        .ref("Usuario")
        .once("value", function (snapshot) {
          snapshot.forEach(function (item) {
            let usuarios = item.val();

            if (item.key == value.Usuario) {
              usuario.innerHTML = usuarios.Nome;
              data.innerHTML = usuarios.Email;
            }
          });
        });

      if (!data.textContent.includes("@")) {
        usuario.innerHTML = "undefined";
        data.innerHTML = "undefined";
      }

      let categoria = document.createElement("td");
      categoria.innerHTML = value.Tipo;
      categoria.className = "align-middle";
      categoria.id = "categoria";
      tr.appendChild(categoria);

      let status = document.createElement("div");
      status.innerHTML = value.Status;
      status.className = "h-20 d-inline-block";

      status.id = "status-aprovado";
      status.innerHTML = "aprovada";

      tr.appendChild(status);

      //operações no modal
    }
  });
}
