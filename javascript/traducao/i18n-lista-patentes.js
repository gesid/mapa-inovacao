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
                patents: {
                    sectionPatents: {
                        barraDeBuscaPatentes: "Tipo de busca: por título",
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
                    barraDeBuscaPatentes: "Search Type: by title",
                    botaoBusca: "Search",
                    tituloPatente: "PATENTS",
                    toggleDown: "Search Type",
                    porTituloToggleDown: "By title",
                    porDepositanteToggleDown: "By Depositor",
                    porSecaoToggleDown: "By Section",
                    botaoSiteDoEvento: "Event website",
                    botaoVerMais: "See more",
                    botaoVerMenos: "See less",
                    botaoDepositante: "See",
                    botaoDepositante2: "depositor on the map",
                    secoesCard: "Sections:",
                    classificacoesCard: "Classifications:",
                    depositantesCard: "Applicant",
                    publicacoesCard: "Publications",
                    numeroCard: "INPI Application No"                
                }
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
  