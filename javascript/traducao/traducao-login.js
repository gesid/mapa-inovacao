i18next.on('languageChanged', function(lng) {
    traducaoPlaceholderEmail();
    traducaoPlaceholderSenha();
  });
  
  function traducaoPlaceholderEmail() {
    let placeholderchange =  document.getElementsByName("email_field")[0]
    placeholderchange.placeholder = i18next.t("login.sectionHoldBar.placeholderEmail")
  }
  
  function traducaoPlaceholderSenha() {
    let placeholderchange =  document.getElementsByName("password_field")[0]
    placeholderchange.placeholder = i18next.t("login.sectionHoldBar.placeholderSenha")
  }