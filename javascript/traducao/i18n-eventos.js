//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PORTUGUÊS" },
    en: { nativeName: "INGLÊS" },
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
                      tutorial: "TUTORIAL",
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
                events: {
                    sectionEvents: {
                      barraDeBusca: "Tipo de Busca: por nome",
                      botaoBusca: "Buscar",
                      tituloEvent: "PRÓXIMOS EVENTOS",
                      toggleDown: "Search Type",
                      porNomeToggleDown: "Por nome",
                      porCategoriaToggleDown: "Por categoria",
                      botaoSiteDoEvento: "Site do Evento",
                      botaoVerNoMapa: "Ver no mapa"
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
                events: {
                    sectionEvents: {
                        barraDeBusca: "Search Type: by name",
                        botaoBusca: "Search",
                        tituloEvento: "NEXT EVENTS",
                        tituloPatente: "PATENTS",
                        toggleDown: "Search Type",
                        porNomeToggleDown: "By name",
                        porCategoriaToggleDown: "By Category",
                        botaoSiteDoEvento: "Event website",
                        botaoVerNoMapa: "See on Map"
                    }
              },
              alert:{
                voceEstaDeslogado: "You're logged out.",
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
  