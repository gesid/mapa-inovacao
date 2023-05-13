const carregarBackoffice = document.getElementById("carregar");
firebase.auth().onAuthStateChanged(async function (user) {
  setTimeout(() => {}, 500);
  let usuario = user;
  console.log(usuario);
  if (usuario === null) {
    window.location.href = "index.html";
  }
  let ehAdmin = false;
  firebase
    .database()
    .ref("Usuario")
    .on("value", function (snapshot) {
      snapshot.forEach((element) => {
        if (
          element.val().Email == usuario.email &&
          element.val().Admin === true
        ) {
          carregarBackoffice.style.display = "block";
          document.getElementById("spinner").innerHTML = " ";
          ehAdmin = true;
        }
      });
      if (!ehAdmin) {
        window.location.href = "index.html";
      }
    });
});
