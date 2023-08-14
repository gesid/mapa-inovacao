//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PT-BR" },
    en: { nativeName: "EN-US" },
  };
  
  $(function () {
    i18next.init(
      {
        debug: true,
        fallbackLng: "pt",
        resources: {
          pt: {
            translation: {
                ecossistema: {
                    sectionHeader:{
                      mapa: "MAPA",
                      ecossistema2: "ECOSSISTEMA",
                      tutorial: "TUTORIA",
                      eventos: "EVENTOS",
                      patente: "PATENTE",
                      cadastrarPatente: "Cadastrar patente",
                      verListaPatente: "Ver lista de patentes"
                    },
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
                   holdBar1: "Digite seu e-mail",
                   holdBar2: "Digite sua senha",
                   senha2: "SENHA",
                   esqueceu: "Esqueceu a senha?",
                   registro: "Registro",
                   buttonEnter: "ENTRAR",
                   comoUtilizar: "COMO UTILIZAR"
                }
              },
            },
          },
          en: {
            translation: {
                ecossistema: {
                    sectionHeader:{
                      mapa: "MAP",
                      ecossistema2: "ECOSYSTEM",
                      eventos: "EVENTS",
                      patente: "PATENT",
                      cadastrarPatente: "Register patent",
                      verListaPatente: "View list of patents"
                    },
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
                   holdBar1: "Type your e-mail",
                   holdBar2: "Type your password",
                   senha2: "PASSWORD",
                   esqueceu: "Forgot password?",
                   naoPossui: "Don't have a registration?",
                   registro: "Register",
                   buttonEnter: "ENTER",
                   comoUtilizar: "TUTORIAL"
                }
              },
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
          console.log(optSelect);
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
  