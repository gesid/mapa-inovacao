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
              sectionRodape: {
                titulo: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                descricao: "Versão 0.2 (Beta)",
                politicaPrivacidade: "TERMOS DE PRIVACIDADE",
                termoUso: "TERMOS DE USO",
                termoConsentimento: "TERMOS DE CONSENTIMENTO"
              },  
              events: {
                sectionEvents: {
                  barraDeBusca: "Tipo de Busca: por nome",
                  botaoBusca: "Buscar",
                  tituloEvent: "PRÓXIMOS EVENTOS",
                  toggleDown: "Tipo de busca",
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
                  subnavCadastro: "Register patent",
                  subnavListar: "View list of patents"
                },
                btnUser:{
                  saudacao: "Hello, {{name}} !",
                  perfil: "MY PROFILE",
                  sair: "LOGOUT"
                }
              },
              sectionRodape: {
                titulo: "For more information, contact us through of mapainovacao@ufc.br",
                descricao: "Version 0.2 (Beta)",
                politicaPrivacidade: "PRIVACY POLICIES",
                termoUso: "TERMS OF USE",
                termoConsentimento: "TERMS OF CONSENT"
              },
              events: {
                  sectionEvents: {
                    barraDeBusca: "Search Type: by name",
                    botaoBusca: "Search",
                    tituloEvent: "UPCOMING EVENTS",
                    tituloPatente: "PATENTS",
                    toggleDown: "Search Type",
                    porNomeToggleDown: "By name",
                    porCategoriaToggleDown: "By Category",
                    botaoSiteDoEvento: "Event website",
                    botaoVerNoMapa: "View on Map"
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
          //let optSelect = new Option(lngs[lng].nativeName, lng);
          let optSelect = `<option value="${lng}" class="option-traducao">${lngs[lng].nativeName}</option>`;
  
          if(lng === i18next.resolvedLanguage){
              optSelect = `<option value="${lng}" class="option-traducao" selected="selected">${lngs[lng].nativeName}</option>`;
          }
          $('#languageSwitcher').append(optSelect);
          console.log(optSelect)
        });
  
  
        $('#languageSwitcher').change(() => {
            let chooseLng = $(this).find("option:selected").attr('value');
            i18next.changeLanguage(chooseLng, () => {
                $("body").localize()
            })
        });
  
        $("body").localize();
      }
    );
  });
  