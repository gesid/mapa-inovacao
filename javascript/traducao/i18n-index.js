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
            navBar1: {
              navEcossistema: "ECOSSISTEMA",
              navTutorial: {
                titulo: "TUTORIAL",
                subtitulo:
                  "Colaborar é muito simples! Veja no vídeo abaixo como funciona:",
              },
              navFiltrar: {
                titulo: "FILTRAR",
                subtitulo: "Filtros de Categoria",
                checkboxs: {
                  check0: "Todos",
                  check1: "Acelerador",
                  check2: "Comunicação e Mídia",
                  check3: "Escolas",
                  check4: "Eventos",
                  check5: "Governo",
                  check6: "Incubadoras",
                  check7: "Investidores",
                  check8: "Parques Tecnológicos",
                  check9: "Propriedade Intelectual",
                  check10: "Startup",
                  check11: "Catalisadores Locais",
                  check12: "Makers",
                  check13: "Fábrica de Aplicativos",
                  check14: "Grandes Empresas",
                  check15: "Iniciativas Universitárias",
                  check16: "Núcleos de Inovação",
                  check17: "Pré Aceleradoras",
                  check18: "Mentoria",
                },
                select: "Escolha o segmento da startup",
                botoes: {
                  btnFechar: "Fechar",
                  btnFiltrar: "Filtrar",
                },
              },
              navCadastrar: "CADASTRAR",
              navEventos: "EVENTOS",
              navPatentes: {
                titulo: "PATENTES",
                subnavCadastro: "Cadastrar Patentes",
                subnavListar: "Listar Patentes",
              },
            },
            barraLateral: {
              titulo: "CATEGORIAS",
              comunidades: "Comunidades",
              aceleradora: "Aceleradora",
              catLocais: "Catalisadoras Locais",
              comEMidia: "Comunicacão e Mídia",
              coworking: "Coworking",
              escolas: "Escolas",
              espMakers: "Espaços Makers",
              eventos: "Eventos",
              fabApp: "Fábrica de Aplicativos",
              gov: "Governo",
              gEmpresas: "Grandes Empresas",
              incubadoras: "Incubadoras",
              iniUniversitarias: "Iniciatias Universitárias",
              investidores: "Investidores",
              nucInovacao: "Núcleos de Inovação",
              parquesTec: "Parques Tecnologicos",
              preAceleradoras: "Pré Aceleradoras",
              propIntelectual: "Propriedade Intelectual",
              mentoria: "Mentoria",
              startup: "Startup",
              patente: "Patente",
            },
            cadastro: {
              legenda:
                "Clique no mapa para definir o endereço do sua instituição/evento",
              btnLegenda: "Cancelar",
              marcador: {
                legenda: "Confirmar",
                btn: "Aqui!",
              },
              modalCadastro: {
                legenda: "Cadastrar Instituição/Evento",
                modalInstituicao: {
                  instituicao: "Instuição",
                  evento: "Evento",
                  nome: "Nome*",
                  site: "Site*",
                  tipoDeLocal: "Tipo de Local*",
                  latitude: "Latitude",
                  longitude: "Longitude",
                  cep: "CEP*",
                  logradouro: "Logradouro*",
                  numero: "Núumero*",
                  complemento: "Complemento",
                  bairro: "Bairro*",
                  cidade: "Cidade*",
                  uf: "UF*",
                },
                btn: {
                  fechar: "Fechar",
                  enviar: "Enviar",
                },
              },
            },
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
              sectionMotivacao: {
                titulo: "Motivação",
                descricao:
                  "No Ceará existem várias iniciativas de inovação tecnológica surgindo em diversas regiões do estado. Dentre os principais ecossistemas de inovação existentes, pode-se destacar o ecossistema de Fortaleza, o Rapadura Valley, e o ecossistema do Cariri, o Kariri Valley, porém também existem outras iniciativas surgindo em outras regiões do estado, como o ecossistema de Sobral, de Quixadá, de Crateús, entre outros. Na região nordeste, o ecossistema cearense concentra 16% das startups ativas, sendo o terceiro maior da região. Constata-se, assim, a oportunidade em prover uma solução intrinsecamente colaborativa, open source e de abrangência estadual para geovisualização dos agentes que compõem o ecossistema cearense, tendo em vista o potencial em aproximar os agentes envolvidos e, consequentemente, catalisar parcerias inovadoras no estado.",
              },
              sectionProposta: {
                titulo: "Proposta",
                descricao:
                  "Sob o escopo de um projeto de extensão da Universidade Federal do Ceará (UFC), o Mapa do Ecossistema de Inovação Cearense é uma plataforma colaborativa, tanto do ponto de vista do desenvolvimento, quanto do seu uso, que objetiva reunir de forma integrada informações sobre entidades, eventos e patentes, proporcionando a todos que tem interesse na comunidade cearense uma visão geral do ecossistema de inovação por meio de um mapa interativo e colaborativo.",
              },
              sectionDesenvolvimento: {
                titulo: "Desenvolvimento",
                descricao: 'Este projeto (atualmente em versão 0.2 Beta) pressupõe sua evolução e manutenção como uma iniciativa colaborativa, open source e sem fins lucrativos, inicialmente sob a MIT License. Conheça nossos colaboradores Saiba mais sobre o projeto Mapa do Ecossistema de Inovação Cearense:',
                linkColaboradores: 'Conheça nossos colaboradores',
                saibaMais: 'Saiba mais sobre o projeto Mapa do Ecossistema de Inovação Cearense:'
              },
              sectionDesenvolvimento2: {
                titulo: "ORGANIZAÇÕES DOS NOSSOS COLABORADORES",
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
            }
          },
        },
        en: {
          translation: {
            navBar1: {
              navEcossistema: "ABOUT US",
              navTutorial: {
                titulo: "TUTORIAL",
                subtitulo:
                  "It is very simple to collaborate! Watch the video bellow to see how it works:",
              },
              navFiltrar: {
                titulo: "FILTER",
                subtitulo: "Category filters",
                checkboxs: {
                  check0: "All",
                  check1: "Startup accelerator",
                  check2: "Media and Communication",
                  check3: "Schools",
                  check4: "Events",
                  check5: "Government",
                  check6: "Business Incubators",
                  check7: "Investors",
                  check8: "Technology Parks",
                  check9: "Intellectual Properties",
                  check10: "Startup",
                  check11: "Local Catalysts",
                  check12: "Makers Space",
                  check13: "App Factory",
                  check14: "Big Companies",
                  check15: "University Initiatives",
                  check16: "Innovation Centers",
                  check17: "Pre-seed Startup",
                  check18: "Mentorship",
                },
                select: "Choose the startup segment",
                botoes: {
                  btnFechar: "Close",
                  btnFiltrar: "Filter",
                },
              },
              navCadastrar: "REGISTER",
              navEventos: "EVENTS",
              navPatentes: {
                titulo: "PATENTS",
                subnavCadastro: "Register Patents",
                subnavListar: "List Patents",
              },
            },
            barraLateral: {
              titulo: "CATEGORIES",
              comunidades: "Communities",
              aceleradora: "Startup accelerator",
              catLocais: "Local Catalysts",
              comEMidia: "Media and Communication",
              coworking: "Coworking",
              escolas: "Schools",
              espMakers: "Makers Space",
              eventos: "Events",
              fabApp: "App Factory",
              gov: "Government",
              gEmpresas: "Big Companies",
              incubadoras: "Business Incubators",
              iniUniversitarias: "University Initiatives",
              investidores: "Investors",
              nucInovacao: "Innovation Center",
              parquesTec: "Technology Parks",
              preAceleradoras: "Pre-seed Startup",
              propIntelectual: "Intellectual Properties",
              mentoria: "Mentorship",
              startup: "Startup",
              patente: "Patent",
            },
            cadastro: {
              legenda:
                "Click on the map to define the address of your institution/event",
              btnLegenda: "Cancel",
              marcador: {
                legenda: "Confirm",
                btn: "Here!",
              },
              modalCadastro: {
                legenda: "Register Institution/Event",
                modalInstituicao: {
                  instituicao: "Intitution",
                  evento: "Events",
                  nome: "Name*",
                  site: "Website*",
                  tipoDeLocal: "Categorie*",
                  latitude: "Latitude",
                  longitude: "Longitude",
                  cep: "ZipCode*",
                  logradouro: "Street Address*",
                  numero: "House Number*",
                  complemento: "Complement",
                  bairro: "District*",
                  cidade: "City*",
                  uf: "Postal Abbr*",
                },
                btn: {
                  fechar: "Close",
                  enviar: "Send",
                },
              },
            },
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
              sectionMotivacao: {
                titulo: "Motivation",
                descricao:
                  "In Ceará there are several technological innovation initiatives emerging in different regions of the state. Among the main existing innovation ecosystems, we can highlight the ecosystem of Fortaleza, the Rapadura Valley, and the ecosystem of Cariri, the Kariri Valley, but there are also other initiatives emerging in other regions of the state, such as the ecosystem of Sobral, of Quixadá, from Crateús, among others. In the northeast region, the Ceará ecosystem concentrates 16% of active startups, being the third largest in the region. Thus, there is an opportunity to provide an intrinsically collaborative, open source and state-wide solution for the geovisualization of the agents that make up the Ceará ecosystem, in view of the potential to bring the agents involved closer together and, consequently, catalyze innovative partnerships in the state.",
              },
              sectionProposta: {
                titulo: "Proposal",
                descricao:
                  "Under the scope of an extension project at the Federal University of Ceará (UFC), the Cearense Innovation Ecosystem Map is a collaborative platform, both from the point of view of development and its use, which aims to gather, in an integrated way, information about entities, events and patents, providing everyone who is interested in the Ceará community with an overview of the innovation ecosystem through an interactive and collaborative map.",
              },
              sectionDesenvolvimento: {
                titulo: "Development",
                descricao: 'This project (currently in version 0.2 Beta) assumes its evolution and maintenance as a collaborative, open source and non-profit initiative, initially under the MIT License. Meet our collaborators Learn more about the Cearense Innovation Ecosystem Map project:',
                linkColaboradores: 'Meet our collaborators',
                saibaMais: 'Learn more about the Cearense Innovation Ecosystem Map project:'
              },
              sectionDesenvolvimento2: {
                titulo: "ORGANIZATIONS OF OUR EMPLOYEES",
              },
              sectionReferencias: {
                titulo: "References",
                descricao: "As support material for the categorization of agents that are part of this ecosystem, the document \"Mapping the Environment of Incentive to Entrepreneurship in Ceará\" prepared by the Institute of Innovation, organized by Moisés Santos. In addition, we also use the Mapping of Actors",
                linkAssociacao: "Brazilian Association of Startups (Abstartups)",
                continuacaoDescricao: "For the demarcations of existing communities on the map, material from the",
                linkSebrae: "Sebrae/CE",
                continuacaoDescricao2: "Among the various initiatives for mapping the local ecosystem that are found in Brazil, three references can be highlighted which served as inspiration for the development of this project:",
                primeiroItem: "Innovation map of Minas Gerais, developed by",
                linkPrimeiroItem: "Minas Gerais Innovation System (SIMI)",
                segundoItem: "Santa Catarina innovation ecosystem map, mapped by",
                linkSegundoItem: "VIA ",
                linkSegundoItem2: "and",
                terceiroItem: "Alagoas innovation ecosystem map, developed by",
                linkTerceiroItem: "Secretary of State for Science, Technology and Innovation (SECTI) of Alagoas"
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
                 comoUtilizar: "HOW TO USE"
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
