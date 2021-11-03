function envioEmail(){

    Email.send({
        Host : "smtp.gmail.com",
        Username : "ecin.ecossitemadb@gmail.com",
        Password : "ecinceecossistema",
        To : "rommelc4stro@hotmail.com",
        From : "ecin.ecossitemadb@gmail.com",
        Subject : "This is the subject",
        Body : '<a href="https://www.google.com">Clique aqui para validar seu cadastro</a>'
        
    }).then(
      message => alert(message)
    );

}
