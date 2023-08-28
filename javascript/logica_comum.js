/* CODIGO DE CRIAÇÃO DO BOTAO LOGIN/USUÁRIO */
let usuariodao = new usuarioDAO();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    usuariodao.buscar(user.uid).then(function (usuario) {
      nome = usuario.getNome().split(" ");
      document.getElementById("btn-user").setAttribute("data-status", "logado");
      document.getElementById(
        "btn-user"
      ).innerHTML = `<button class="btn-dropdown-header dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        ${i18next.t("navBar1.btnUser.saudacao", {name: nome[0].toUpperCase()})}
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenu2">

        <a class="dropdown-item-list d-flex align-items-center justify-content-start" 
        type="button" data-key="${user.uid}" onclick="telaUsuario(this)">
          <i class="fas fa-user-circle icon-prop-usuario"></i>
          <p class="texto-usuario" data-i18n="navBar1.btnUser.perfil">${i18next.t("navBar1.btnUser.perfil")}</p>
        </a>

        <a class="dropdown-item-list d-flex align-items-center justify-content-start" type="button" onclick="gerenciarEntradaSaida()">
          <i class="fas fa-sign-in-alt icon-prop-usuario"></i>
          <p class="texto-usuario" data-i18n="navBar1.btnUser.sair">${i18next.t("navBar1.btnUser.sair")}</p>
        </a>
      </div>`;
        console.log(`${i18next.t("navBar1.btnUser.saudacao")}`)
      localStorage.setItem("usuarioLogadoKey", user.uid);

      i18next.reloadResources();
      /**Realiza a tradução do texto da saudação*/ 
      i18next.on('languageChanged', function(lng){
        document.getElementById('dropdownMenu2').innerText = i18next.t("navBar1.btnUser.saudacao", {name: nome[0].toUpperCase()});
      });

    });
  } else {
    localStorage.removeItem("usuarioLogadoKey");
    document
      .getElementById("btn-user")
      .setAttribute("data-status", "deslogado");
    document.getElementById(
      "btn-user"
    ).innerHTML = ` <a type="button" href="login.html" class="d-flex align-items-center justify-content-center btn-login">
        <i class="fas fa-sign-in-alt icon-prop"></i>
        <p class="texto-btn-login">LOGIN</p>
      </a>`;
  }
});

/*CÓDIGO DA PAGINA DO USUÁRIO*/

function telaUsuario(componente) {
  let status = $("#btn-user").attr("data-status");

  if (status === "logado") {
    window.location = "usuario.html?" + componente.getAttribute("data-key");
  } else {
    window.location.href = "login.html";
  }
}


