//Variáveis do script
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

function login() {
  let userEmail = document.getElementById("email_field").value;
  let userPassword = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = i18next.t("alert.usuarioOuSenhaIncorretos");
      window.alert("Error: " + errorMessage);
    })
    .then(() => {
      if (firebase.auth().currentUser.emailVerified) {
        window.alert(i18next.t("alert.loginRealizadoComSucesso"));
        usuarioAdmin(userEmail);
      } else {
        window.alert(i18next.t("alert.emailNaoValidado"));
        firebase.auth().signOut();
      }
    });
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {})
    .catch(function (error) {});
}

function usuarioLogado() {
  let user = firebase.auth().currentUser;
  let nome, email, sexo, uid;

  alert(user);

  if (user != null) {
    nome = user.displayName;
    email = user.email;
    sexo = user.sexo;
    uid = user.uid;
  }
}

function gerenciarEntradaSaida() {
  document.getElementById("btn-user").getAttribute("data-status");

  if (
    document.getElementById("btn-user").getAttribute("data-status") === "logado"
  ) {
    logout();
    alert(i18next.t("alert.voceEstaDeslogado"));
  } else {
    window.location.href = "login.html";
  }
}

function usuarioAdmin(email) {
  let ehAdmin = false;
  firebase
    .database()
    .ref("Usuario")
    .on("value", function (snapshot) {
      snapshot.forEach((element) => {
        if (element.val().Email == email && element.val().Admin === true) {
          ehAdmin = true;
          window.location.href = "backoffice.html";
        }
      });
      console.log(ehAdmin);
      if (ehAdmin === false) {
        window.location.href = "index.html";
      }
    });
}
