//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PT-BR" },
    en: { nativeName: "EN-US" },
  };
  
  $(function () {
    i18next
    .use(i18nextBrowserLanguageDetector)
    .init(
      {
        debug: true,
        fallbackLng: "pt",
        resources: {
          pt: {
            translation: {
              navBar1:{
                navMap: "MAPA",
                navEcossistema: "ECOSSISTEMA",
                navTutorial:{
                    titulo: "COMO UTILIZAR",
                    subtitulo: "Colaborar é muito simples! Veja no vídeo abaixo como funciona:"
                },
                navEventos: "EVENTOS",
                navPatentes:{
                    titulo: "PATENTES",
                    subnavCadastro: "Cadastrar patente",
                    subnavListar: "Ver lista de patentes"
                },
                btnUser:{
                    saudacao: "Olá, {{name}} !",
                    perfil: "MEU PERFIL",
                    sair: "SAIR"
                }
              },
              ecossistema: {
                sectionRodape: {
                    titulo: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                    descricao: "Versão 0.2 (Beta)",
                    politicaPrivacidade: "TERMOS DE PRIVACIDADE",
                    termoUso: "TERMOS DE USO",
                    termoConsentimento: "TERMOS DE CONSENTIMENTO"
                  },
              },  
              login: {
                sectionHoldBar: {
                   placeholderEmail: "Digite seu e-mail",
                   placeholderSenha: "Digite sua senha",
                   senha2: "SENHA",
                   esqueceu: "Esqueceu a senha?",
                   naoPossui: "Não possui cadastro?",
                   registro: "Cadastre-se",
                   buttonEnter: "ENTRAR",
                }
              },
              alert:{
                  usuarioOuSenhaIncorretos: "Usuário e/ou senha incorretos",
                  loginRealizadoComSucesso: "Login realizado com sucesso",
                  emailNaoValidado: "E-mail não validado! Verifique sua caixa de e-mail.",
                  voceEstaDeslogado: "Você está deslogado"
              },
            },
          },
          en: {
            translation: {
                navBar1:{
                  navMap: "MAP",
                  navEcossistema: "ABOUT US",
                  navTutorial:{
                      titulo: "TUTORIAL",
                      subtitulo: "It is very simple to collaborate! Watch the video bellow to see how it works:"
                  },
                  navEventos: "EVENTS",
                  navPatentes:{
                      titulo: "PATENTS",
                      subnavCadastro: "Register Patents",
                      subnavListar: "List Patents"
                  },
                  btnUser:{
                      saudacao: "Hello, {{name}} !",
                      perfil: "MY PROFILE",
                      sair: "LOGOUT"
                  }
              },
              ecossistema: {
                sectionRodape: {
                  titulo: "For more information, contact us through of mapainovacao@ufc.br",
                  descricao: "Version 0.2 (Beta)",
                  politicaPrivacidade: "PRIVACY POLICIES",
                  termoUso: "TERMS OF USE",
                  termoConsentimento: "TERMS OF CONSENT"
                },
              },
              login: {
                sectionHoldBar: {
                    placeholderEmail: "Type your e-mail",
                    placeholderSenha: "Type your password",
                    senha2: "PASSWORD",
                    esqueceu: "Forgot your password?",
                    naoPossui: "Don’t have an account?",
                    registro: "Sign up.",
                    buttonEnter: "ENTER",
                }
              },
              alert:{
                  usuarioOuSenhaIncorretos: "Incorrect username and/or password.",
                  loginRealizadoComSucesso: "Login successful",
                  emailNaoValidado: "E-mail not validated! Check your email box.",
                  voceEstaDeslogado: "You're logged out."
              }
            },
          },
        },
      },
      (err, t) => {
        if (err) console.log(err);
  
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });
  
        Object.keys(lngs).map((lng) => {
          let optSelect = new Option(lngs[lng].nativeName, lng);
          if (lng === i18next.resolvedLanguage) {
            optSelect.setAttribute("selected", "selected");
          }
          //console.log(optSelect);
          $("#languageSwitcher").append(optSelect);
        });
  
        $("#languageSwitcher").change(() => {
          let chooseLng = $(this).find("option:selected").attr("value");
          i18next.changeLanguage(chooseLng, () => {
            $("body").localize();
          });
        });
  
        $("body").localize();
      }
    );
  });
  