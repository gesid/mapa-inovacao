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
            patents:{
              sectionPatents:{
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
                  botaoBusca: "Buscar",
                },
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
              },
              alert:{
                voceEstaDeslogado: "Você está deslogado." ,
              }
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
            patents:{
              sectionPatents:{
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
                  botaoBusca: "Search",
                },
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
              },
              alert:{
                voceEstaDeslogado: "You're logged out.",
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
        //let optSelect = new Option(lngs[lng].nativeName, lng);
        let optSelect = `<option value="${lng}" class="option-traducao">${lngs[lng].nativeName}</option>`;

        if(lng === i18next.resolvedLanguage){
            optSelect = `<option value="${lng}" class="option-traducao" selected="selected">${lngs[lng].nativeName}</option>`;
        }
        $('#languageSwitcher').append(optSelect);
        console.log(optSelect)
      })


      $('#languageSwitcher').change(() => {
          let chooseLng = $(this).find("option:selected").attr('value');
          i18next.changeLanguage(chooseLng, () => {
              $("body").localize()
          })
      })

      $("body").localize();
    }
  );
});
