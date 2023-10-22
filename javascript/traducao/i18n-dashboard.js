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
                  titulo: "TUTORIAL",
                  subtitulo: "Colaborar é muito simples! Veja no vídeo abaixo como funciona:"
                },
                navEventos: "EVENTOS",
                navPatentes:{
                  titulo: "PATENTES",
                  subnavCadastro: "Cadastrar patentes",
                  subnavListar: "Ver lista de patentes"
                },
                btnUser:{
                  saudacao: "Olá, {{name}} !",
                  perfil: "MEU PERFIL",
                  sair: "SAIR"
                }
              },
              tituloPag:"Dashboard do Mapa do Ecossistema de Inovação Cearense",
              graficos:{
                grafico1:{
                  titulo:"Regiões por categoria",
                  select:{
                    todas: "Todas as categorias"
                  },
                  ajuda:"Esse gráfico mostra o total de categorias em cada região do Ceará, sendo possível escolher uma categoria específica através do filtro disponível. Os dados são obtidos pelos registros efetuados no mapa do ecossistema de inovação cearense."
                },
                categorias:{
                  comunidades: 'Comunidades',
                  aceleradora: 'Aceleradora',
                  catLocais: 'Catalisadores Locais',
                  comEMidia: 'Comunicação e Mídia',
                  coworking: 'Coworking',
                  escolas: 'Escolas',
                  espMakers: 'Espaços Makers',
                  eventos: 'Eventos',
                  fabApp: 'Fábrica de Aplicativos',
                  gov: 'Governo',
                  gEmpresas: 'Grandes Empresas',
                  incubadoras: 'Incubadoras',
                  iniUniversitarias: 'Iniciativas Universitárias',
                  investidores: 'Investidores',
                  nucInovacao: 'Núcleos de Inovação',
                  parquesTec: 'Parques Tecnológicos',
                  preAceleradoras: 'Pré Aceleradoras',
                  propIntelectual: 'Propriedade Intelectual',
                  mentoria: 'Mentoria',
                  startup: 'Startup',
                  patente: 'Patente'
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
                tituloPag:"Dashboard of the Mapa do Ecossistema de Inovação Cearense",
                graficos:{
                  grafico1:{
                    titulo:"Regions by category",
                    select:{
                      todas: "All categories"
                    },
                    ajuda:"This graph shows the total number of categories in each region of Ceará, making it possible to choose a specific category using the available filter. The data is obtained from records made on the Mapa do Ecossistema de Inovação Cearense."
                  },
                  categorias:{
                    comunidades: 'Communities',
                    aceleradora: 'Startup Accelerator',
                    catLocais: 'Local Catalysts',
                    comEMidia: 'Media and Communication',
                    coworking: 'Coworking',
                    escolas: 'Schools',
                    espMakers: 'Makers Space',
                    eventos: 'Events',
                    fabApp: 'App Factory',
                    gov: 'Government',
                    gEmpresas: 'Big Companies',
                    incubadoras: 'Business Incubators',
                    iniUniversitarias: 'University Initiatives',
                    investidores: 'Investors',
                    nucInovacao: 'Innovation Center',
                    parquesTec: 'Technology Parks',
                    preAceleradoras: 'Pre-seed Startup',
                    propIntelectual: 'Intellectual Properties',
                    mentoria: 'Mentorship',
                    startup: 'Startup',
                    patente: 'Patent'
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
  