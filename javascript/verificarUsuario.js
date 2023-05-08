firebase.auth().onAuthStateChanged(function (usuario) {
  if (usuario) {
    usuarioAdmin(usuario.email);
  }
});
