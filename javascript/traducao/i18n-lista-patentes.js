//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PORTUGUÊS" },
    en: { nativeName: "INGLÊS" },
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
                ecossistema: {
                    sectionHeader:{
                      mapa: "MAPA",
                      ecossistema2: "ECOSSISTEMA",
                      tutorial: "COMO UTILIZAR",
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
                patents: {
                    sectionPatents: {
                        barraDeBusca:{
                          labelPreTitulo: "Tipo de busca: por",
                          tipo:{
                            titulo: "título",
                            depositante: "depositante",
                            secao: "seção"
                          },
                          labelPlaceholderCompleta:{
                            titulo: "Tipo de busca: por título",
                            depositante: "Tipo de busca: por depositante",
                            secao: "Tipo de busca: por seção",
                          },
                        },
                        botaoBusca: "Buscar",
                        tituloPatente: "PATENTES",
                        toggleDown: "Tipo de busca",
                        porTituloToggleDown: "Por título",
                        porDepositanteToggleDown: "Por depositante",
                        porSecaoToggleDown: "Por seção",
                        botaoVerMais: "Ver mais",
                        botaoVerMenos: "Ver menos",
                        botaoDepositante: "Ver",
                        botaoDepositante2: "depositante no mapa",
                        secoesCard: "Seções:",
                        classificacoesCard: "Classificações:",
                        depositantesCard: "Depositantes",
                        publicacoesCard: "Publicações",
                        numeroCard: "Nº de Pedido no INPI"   
                    }
                  },
                  alert:{
                    voceEstaDeslogado: "Você está deslogado." ,
                  }
            },
          },
          en: {
            translation: {
                ecossistema: {
                    sectionHeader:{
                      mapa: "MAP",
                      ecossistema2: "ECOSYSTEM",
                      tutorial: "TUTORIAL",
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
                patents: {
                  sectionPatents: {
                    barraDeBusca:{
                      labelPreTitulo: "Search Type: by",
                      tipo:{
                        titulo: "title",
                        depositante: "applicant",
                        secao: "section"
                      },
                      labelPlaceholderCompleta:{
                        titulo: "Search Type: by title",
                        depositante: "Search Type: by applicant",
                        secao: "Search Type: by section",
                      },
                    },
                    botaoBusca: "Search",
                    tituloPatente: "PATENTS",
                    toggleDown: "Search Type",
                    porTituloToggleDown: "By title",
                    porDepositanteToggleDown: "By Depositor",
                    porSecaoToggleDown: "By Section",
                    botaoSiteDoEvento: "Event website",
                    botaoVerMais: "Show more",
                    botaoVerMenos: "Show less",
                    botaoDepositante: "See",
                    botaoDepositante2: "depositor on the map",
                    secoesCard: "Sections:",
                    classificacoesCard: "Classifications:",
                    depositantesCard: "Applicant",
                    publicacoesCard: "Publications",
                    numeroCard: "INPI Application No"                
                }
              },
              alert:{
                voceEstaDeslogado: "You're logged out.",
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
