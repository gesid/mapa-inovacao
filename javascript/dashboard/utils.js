let numeroEntidades = document.getElementById("numeroEntidades");

let numeroComunidades = document.getElementById("numeroComunidades");
let numeroPatentes = document.getElementById("numeroPatentes");

var database = firebase.database();
var dbRefUsers = database.ref("marcadores");
let numeroMarcadores = document.getElementById("numeroMarcadores");

firebase
  .database()
  .ref("marcadores")
  .once("value", function (snapshot) {
    numeroEntidade(snapshot);
  });

firebase
  .database()
  .ref("marcadores")
  .once("value", function (snapshot) {
    numeroComunidade(snapshot);
  });

//futuramento será patente
firebase
  .database()
  .ref("patentes")
  .once("value", function (snapshot) {
    numeroDePatentes(snapshot);
  });

firebase
  .database()
  .ref("marcadores")
  .once("value", function (snapshot) {
    marcadores(snapshot);
  });

let clicou = 1;

let bool = true;
async function carregar() {
  let vetorEntidades = [];
  let aux = [];
  await firebase
    .database()
    .ref("Comunidades")
    .once("value", function (snapshot) {
      var num = snapshot.numChildren();
      aux.push({
        nome: "Comunidades",
        imagem: "img/img-bl/27-comunidade.png",
        quantidade: num,
      });
    });
  console.log(aux);
  await firebase
    .database()
    .ref("marcadores")
    .once("value", function (snapshot) {
      //usuarios(snapshot)
      console.log(clicou++);

      vetorEntidades = carregaTodasCategorias(snapshot);
      vetorEntidades.push({
        nome: aux[0].nome,
        imagem: aux[0].imagem,
        quantidade: aux[0].quantidade,
      });

      for (let i = 0; i < vetorEntidades.length; i++) {
        for (let j = 0; j < vetorEntidades.length; j++) {
          if (vetorEntidades[i].quantidade > vetorEntidades[j].quantidade) {
            let aux = vetorEntidades[i];
            vetorEntidades[i] = vetorEntidades[j];
            vetorEntidades[j] = aux;
          }
        }
      }
      document.getElementById("animacaoInicio").remove();
      for (let index = 0; index < 4; index++) {
        let tabela = document.getElementById("tabela");

        let tr = document.createElement("tr");
        let td = document.createElement("td");

        let div1 = document.createElement("div");
        div1.className = "d-flex align-items-center";
        let div2 = document.createElement("div");
        let img = document.createElement("img");
        img.src = vetorEntidades[index].imagem;
        img.className = "avatar-md avatar rounded-circle";

        td.append(div1);
        div1.append(div2);
        div2.append(img);
        tr.append(td);

        let tdNome = document.createElement("td");
        tdNome.innerHTML = vetorEntidades[index].nome;
        tdNome.className = "align-middle";
        tr.append(tdNome);

        let tdQuanti = document.createElement("td");
        tdQuanti.innerHTML = vetorEntidades[index].quantidade;
        tdQuanti.className = "align-middle";
        tr.append(tdQuanti);
        tabela.append(tr);
      }
    });
  let ver = document.getElementById("todasCat");
  ver.onclick = () => {
    console.log("clicado");
    document.getElementById("tabela").innerHTML = " ";
    bool = !bool;
    let tamanh = bool == false ? vetorEntidades.length : 4;

    for (let index = 0; index < tamanh; index++) {
      let tabela = document.getElementById("tabela");

      let tr = document.createElement("tr");
      let td = document.createElement("td");

      let div1 = document.createElement("div");
      div1.className = "d-flex align-items-center";
      let div2 = document.createElement("div");
      let img = document.createElement("img");
      img.src = vetorEntidades[index].imagem;
      img.className = "avatar-md avatar rounded-circle";

      td.append(div1);
      div1.append(div2);
      div2.append(img);
      tr.append(td);

      let tdNome = document.createElement("td");
      tdNome.innerHTML = vetorEntidades[index].nome;
      tdNome.className = "align-middle";
      tr.append(tdNome);

      let tdQuanti = document.createElement("td");
      tdQuanti.innerHTML = vetorEntidades[index].quantidade;
      tdQuanti.className = "align-middle";
      tr.append(tdQuanti);
      tabela.append(tr);
    }
    tamanh == 4 ? window.scroll({ top: 200 }) : null;
    tamanh == 4
      ? (ver.innerHTML = "mostrar mais categorias")
      : (ver.innerHTML = "mostrar menos categorias");
  };
}

carregar();
