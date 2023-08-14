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
                  subnavCadastro: "Cadastrar Patentes",
                  subnavListar: "Listar Patentes"
                },
                btnUser:{
                  saudacao: "Olá, {{name}} !",
                  perfil: "MEU PERFIL",
                  sair: "SAIR"
                }
              },

              sectionMotivacao: {
                titulo: "Motivação",
                descricaoParte1:
                  "No Ceará existem várias",
                descricaoParte2: 
                  "iniciativas de inovação tecnológica",
                descricaoParte3:
                  "surgindo em diversas regiões do estado. Dentre os principais ecossistemas de inovação existentes, pode-se destacar o ecossistema de Fortaleza, o Rapadura Valley, e o ecossistema do Cariri, o Kariri Valley, porém também existem outras iniciativas surgindo em outras regiões do estado, como o ecossistema de Sobral, de Quixadá, de Crateús, entre outros. Na região nordeste, o ecossistema cearense concentra 16% das startups ativas, sendo o terceiro maior da região. Constata-se, assim, a oportunidade em prover uma solução intrinsecamente", 
                descricaoParte4:
                  "colaborativa, open source e de abrangência estadual",
                descricaoParte5:
                  "para geovisualização dos agentes que compõem o ecossistema cearense, tendo em vista o potencial em aproximar os agentes envolvidos e, consequentemente, catalisar parcerias inovadoras no estado.",
              },
              sectionProposta: {
                titulo: "Proposta",
                descricaoParte1:
                  "Sob o escopo de um projeto de extensão da Universidade Federal do Ceará (UFC), o",
                descricaoParte2:
                    "Mapa do Ecossistema de Inovação Cearense",
                descricaoParte3:
                    "é uma ",
                descricaoParte4: "plataforma",
                descricaoParte5:
                    "colaborativa",
                descricaoParte6: "",
                descricaoParte7:
                  ", tanto do ponto de vista do desenvolvimento, quanto do seu uso, que objetiva reunir de forma integrada informações sobre",
                descricaoParte8:   
                  "entidades, eventos",
                descricaoParte9:  
                  "e",
                descricaoParte10:
                  "patentes",
                descricaoParte11:  
                  ", proporcionando a todos que tem interesse na comunidade cearense uma visão geral do ecossistema de inovação por meio de um",
                descricaoParte12:  
                  "mapa interativo e colaborativo.",
              },
              sectionDesenvolvimento: {
                titulo: "Desenvolvimento",
                descricaoParte1: "Este projeto (atualmente em versão 0.2 Beta) pressupõe sua evolução e manutenção como uma iniciativa",
                descricaoParte2:
                  "colaborativa, open source e sem fins lucrativos",
                descricaoParte3:  
                  ", inicialmente sob",
                linkColaboradores: 'Conheça nossos colaboradores',
                saibaMais: 'Saiba mais sobre o projeto Mapa do Ecossistema de Inovação Cearense:'
              },
              sectionDesenvolvimento2: {
                titulo: "ORGANIZAÇÕES DOS NOSSOS COLABORADORES",
              },
              sectionModalNossosColaboradores:{
                titulo: "Nossos Colaboradores",
                subtitulo: "Mantenedores",
                btn: "Fechar"
              },
              sectionReferencias: {
                titulo: "Referências",
                descricao: "Como material de apoio para a realização da categorização dos agentes que fazem parte deste ecossistema, foi utilizado o documento \"Mapeamento do Ambiente de Incentivo ao Empreendedorismo no Ceará\" elaborado pelo Instituto de Inovação, organizado por Moisés Santos. Além disso, utilizamos também o Mapeamento de Atores da",
                linkAssociacao: "Associação Brasileira de Startups (Abstartups).",
                continuacaoDescricao: "Para as demarcações das comunidades existentes no mapa, foi utilizado o material do",
                linkSebrae: "Sebrae/CE",
                continuacaoDescricao2: "Dentre as diversas iniciativas de mapeamento do ecossistema local que são encontradas no Brasil, pode-se destacar três referências os quais serviram de inspiração para o desenvolvimento deste projeto:",
                primeiroItem: "Mapa da inovação de Minas Gerais, desenvolvido pelo",
                linkPrimeiroItem: "Sistema Mineiro de Inovação (SIMI)",
                segundoItem: "Mapa do ecossistema de inovação de Santa Catarina, mapeado pela",
                linkSegundoItem: "VIA",
                linkSegundoItem2: "e",
                terceiroItem: "Mapa do ecossistema de inovação de Alagoas, desenvolvido pela",
                linkTerceiroItem: "Secretaria de Estado da Ciência, da Tecnologia e da Inovação (SECTI) de Alagoas"
              },
              sectionRodape: {
                titulo: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                descricao: "Versão 0.2 (Beta)",
                politicaPrivacidade: "TERMOS DE PRIVACIDADE",
                termoUso: "TERMOS DE USO",
                termoConsentimento: "TERMOS DE CONSENTIMENTO"
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
                    subnavCadastro: "Register Patents",
                    subnavListar: "List Patents"
                  },
                  btnUser:{
                    saudacao: "Hello, {{name}} !",
                    perfil: "MY PROFILE",
                    sair: "LOGOUT"
                  }
                },
                
                sectionMotivacao: {
                  titulo: "Motivation",
                  descricaoParte1:
                    "In Ceará there are several ",
                  descricaoParte2:
                    "technological innovations initiatives",
                  descricaoParte3:
                    "emerging in different regions of the state. Among the main existing innovation ecosystems, we can highlight the ecosystem of Fortaleza, the Rapadura Valley, and the ecosystem of Cariri, the Kariri Valley, however there are others initiatives emerging in others regions of the state, such as the ecosystem of Sobral, Quixadá, Crateús, among others. In the Northeast region, Ceara’s ecosystem concentrates 16% of active startups, being the third largest of the region. Thus, there is an opportunity to provide an intrinsically",
                  descricaoParte4:
                    "collaborative, open source, statewide solution",
                  descricaoParte5:
                    "for geovisualization of agents that are part of this ecosystem, in view of the potential to bring the agents involved closer and, consequently, catalyze innovator partnerships in the state.",
                },
                sectionProposta: {
                  titulo: "Proposal",
                  descricaoParte1:
                    "Under the scope of extension projet of the Federal University of Ceara (UFC) , the ",
                  descricaoParte2:
                    "Mapa do Ecossistema de Inovação Cearense",
                  descricaoParte3:
                    "it is a ",
                  descricaoParte4:"",
                  descricaoParte5: "collaborative",
                  descricaoParte6: "platform",
                  descricaoParte7:
                    ", both from the development point of views, and its use, which aims to gather in an integrated way, informations about",
                  descricaoParte8:
                    "entities, events",
                  descricaoParte9:
                    "and",
                  descricaoParte10:
                    "patents",
                  descricaoParte11:
                    ", providing to all that are interested in the Ceará community an overview of the innovation ecosystem thought an",
                  descricaoParte12:
                    "interactive and collaborative map.",
                  },
                  sectionDesenvolvimento: {
                    titulo: "Development",
                    descricaoParte1: "This project (currently in version 0.2 Beta) assumes its evolution and maintenance as a",
                    descricaoParte2:
                     "collaborative, open source and non-profit initiative",
                    descricaoParte3: 
                      "originally under the ",
                    linkColaboradores: 'Meet our collaborators',
                    saibaMais: 'Learn more about the Cearense Innovation Ecosystem Map project:'
                  },
                  sectionDesenvolvimento2: {
                    titulo: "ORGANIZATIONS OF OUR COLLABORATORS",
                  },
                  sectionModalNossosColaboradores:{
                    titulo: "Our Collaborators",
                    subtitulo: "Maintainers",
                    btn: "Close"
                  },
                  sectionReferencias: {
                    titulo: "References",
                    descricao: "As support material for the categorization of agents that are part of this ecosystem, it was used the document “Mapeamento do Ambiente de Incentivo ao Empreendedorismo no Ceará” elaborated by the Innovation Institute, organized by Moisés Santos. In addition, we also used the “Mapeamento de Atores” from the",
                    linkAssociacao: "Associação Brasileira de Startups(Abstartups).",
                    continuacaoDescricao: "For the demarcation of the existing communities on the map, it was used a material from",
                    linkSebrae: "Sebrae/CE.",
                    continuacaoDescricao2: "Among the various local ecosystem mapping initiatives that are found in Brazil, we can emphasize three references that served as inspiration for the development of this project:",
                    primeiroItem: "Mapa da inovação de Minas Gerais, developed by ",
                    linkPrimeiroItem: "Sistema Mineiro de Inovação(SIMI)",
                    segundoItem: "Mapa do ecossistema de inovação de Santa Catarina, mapped by",
                    linkSegundoItem: " VIA; ",
                    linkSegundoItem2: "and",
                    terceiroItem: "Mapa do ecossistema de inovação de Alagoas, developed by ",
                    linkTerceiroItem: "Secretaria do Estado de Ciência, da Tecnologia e da Inovação (SECTI) de Alagoas"
                  },
                  sectionRodape: {
                    titulo: "For more information, contact us through of mapainovacao@ufc.br",
                    descricao: "Version 0.2 (Beta)",
                    politicaPrivacidade: "PRIVACY POLICIES",
                    termoUso: "TERMS OF USE",
                    termoConsentimento: "TERMS OF CONSENT"
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
  