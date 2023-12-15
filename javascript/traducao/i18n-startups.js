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
                sectionFormulario: {
                  titulo: "Atualizar Informação",
                  nome: "Nome*",
                  site: "Site*",
                  tipoLocal: "Tipo de local*",
                  classificacao: "Classificação*",
                  modeloReceita: "Modelo de Receita*",
                  publicoAlvo: "Publico Alvo*",
                  fase: "Fase*", 
                  selecioneLogo: "Selecione a Logo*",
                  logradouro: "Logradouro*",
                  numero: "Número*",
                  complemento: "Complemento",
                  cidade: "Cidade*",
                  bairro: "Bairro*",
                  escolhaSegmento: "Escolha o segmento da startup",
                  btnConfirmar: "Confirmar",
                  btnCancelar: "Cancelar"
                },
                menuMais:{
                  publicoAlvo: "Publico Alvo:",
                  fase: "Fase: ",
                  modeloReceita: "Modelo de receitas: ",
                  naoInformado: "Não Informado"
                },
                sectionSelectFase:{
                  selecionar: "Slecionar...",
                  ideacao: "Ideação",
                  validacao: "Validação",
                  operacao: "Operação",
                  tracao: "Tração",
                },
                sectionSelectStartups: {
                  titulo: 'Selecionar...',
                  aceleradora: 'Aceleradora',
                  catalisadoresLocais: 'Catalisadores Locais',
                  comunicacaoEmidia: 'Comunicação e Mídia',
                  escolas: 'Escolas',
                  espaçosMakers: 'Espaços Makers',
                  eventos: 'Eventos',
                  fabricaDeAplicativos: 'Fábrica de Aplicativos',
                  grandesEmpresas: 'Grandes Empresas',
                  incubadoras: 'Incubadoras',
                  iniciativasUniversitarias: 'Iniciativas Universitárias',
                  investidores: 'Investidores',
                  nucleosDeInovacao: 'Núcleos de Inovação',
                  parquesTecnologicos: 'Parques Tecnológicos',
                  preAceleradoras: 'Pré Aceleradoras',
                  propriedadeIntelectual: 'Propriedade Intelectual',
                  mentoria: 'Mentoria',
                },
                sectionModeloReceita: {
                  selecionar: "Selecionar...",
                  vendaDireta: "Venda Direta",
                  servicoSobDemanda: "Serviço sob Demanda",
                  afiliados: "Afiliados",
                  licenciamento: "Licenciamento",
                  assinaturas: "Assinaturas"
                },
                sectionRodape: {
                  titulo: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                  descricao: "Versão 0.2 (Beta)",
                  politicaPrivacidade: "TERMOS DE PRIVACIDADE",
                  termoUso: "TERMOS DE USO",
                  termoConsentimento: "TERMOS DE CONSENTIMENTO"
                },
                btnUser:{
                  saudacao: "Olá, {{name}} !",
                  perfil: "MEU PERFIL",
                  sair: "SAIR"
                }
              },
              tituloDaPagina: "PAINEL DE STARTUPS",
              menuMais:{
                publicoAlvo: "Publico Alvo:",
                fase: "Fase: ",
                modeloReceita: "Modelo de receitas: "
              },
              barraDeBusca:{
                labelPreTitulo: "Tipo de busca",
                tipo:{
                  titulo: "título",
                  classificacao: "classificação",
                  fase: "fase",
                  publico: "publico alvo",
                  receita: "modelo de receita"
                },
                selecionarTipoModal:{
                  titulo: "Pot título",
                  classificacao: "Por classificação",
                  fase: "Por fase",
                  publico: "Por público alvo",
                  receita: "Por modelo de receita"
                },
                labelPlaceholderCompleta:{
                  titulo: "Tipo de busca: por título ex: Selletiva",
                  classificacao: "Tipo de busca: por classificação ex: Fintech",
                  fase: "Tipo de busca: por fase ex: Tração",
                  publico: "Tipo de busca: por publico alvo ex: Mulheres",
                  receita: "Tipo de busca: por modelo de receita ex: baseado em receitas"
                },
                botaoBusca: "Buscar",
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
                    subnavCadastro: "Register patent",
                    subnavListar: "View list of patents"
                  },
                  sectionFormulario: {
                    titulo: "Update Information",
                    nome: "Name*",
                    site: "Site*",
                    tipoLocal: "Category*",
                    classificacao: "Classification*",
                    modeloReceita: "Revenue Model*",
                    publicoAlvo: "Target Audience*",
                    fase: "Phase*", 
                    selecioneLogo: "Select the Logo*",
                    logradouro: "Street Address*",
                    numero: "Number*",
                    complemento: "Complement*",
                    cidade: "City*",
                    bairro: "District*",
                    escolhaSegmento: "Choose the startup segment",
                    btnConfirmar: "Confirm",
                    btnCancelar: "Cancel"
                  },
                  menuMais:{
                    publicoAlvo: "Target Audience:",
                    fase: "Phase: ",
                    modeloReceita: "Revenue Model: ",
                    naoInformado: "Uninformed"
                  },
                  sectionModeloReceita: {
                    selecionar: "Select...",
                    vendaDireta: "Direct selling",
                    servicoSobDemanda: "On-demand service",
                    afiliados: "Affiliates",
                    licenciamento: "Licensing",
                    assinaturas: "Subscriptions"
                  },
                  sectionSelectFase:{
                    selecionar: "Select...",
                    ideacao: "Ideation",
                    validacao: "Validation",
                    operacao: "Operation",
                    tracao: "Traction",
                  },
                  sectionSelectStartups: { 
                    titulo: 'Select...',
                    aceleradora: 'Accelerator',
                    catalisadoresLocais: 'Local Catalysts',
                    comunicacaoEmidia: 'Media and Communication',
                    escolas: 'Schools',
                    espaçosMakers: 'Makers Space',
                    eventos: 'Events',
                    fabricaDeAplicativos: 'App Factory',
                    grandesEmpresas: 'Big Companies',
                    incubadoras: 'Business Incubators',
                    iniciativasUniversitarias: 'University initiatives',
                    investidores: 'Investors',
                    nucleosDeInovacao: 'Innovation Center',
                    parquesTecnologicos: 'Technology Parks',
                    preAceleradoras: 'Pre-seed Startup',
                    propriedadeIntelectual: 'Intellectual Properties',
                    mentoria: 'Mentorship',
                  },
                  sectionRodape: {
                    titulo: "For more information, contact us through of mapainovacao@ufc.br",
                    descricao: "Version 0.2 (Beta)",
                    politicaPrivacidade: "PRIVACY POLICIES",
                    termoUso: "TERMS OF USE",
                    termoConsentimento: "TERMS OF CONSENT"
                  },
                  btnUser:{
                    saudacao: "Hello, {{name}} !",
                    perfil: "MY PROFILE",
                    sair: "LOGOUT"
                  }
                },
                tituloDaPagina: "STARTUPS PANEL",
                barraDeBusca:{
                  labelPreTitulo: "Search Type",
                  tipo:{
                    titulo: "title",
                    classificacao: "classfication",
                    fase: "fase",
                    publico: "target public",
                    receita: "model revenue"
                  },
                  selecionarTipoModal:{
                    titulo: "By title",
                    classificacao: "By classfication",
                    fase: "By fase",
                    publico: "By target public",
                    receita: "By model revenue"
                  },
                  labelPlaceholderCompleta:{
                    titulo: "Search Type: by title ex: Selletiva",
                    classificacao: "Search Type: by classfication ex: Fintech",
                    fase: "Search Type: by fase ex: Traction",
                    publico: "Search Type: by target public ex: Women",
                    receita: "Search Type: by model revenue ex: based in revenue"
                  },
                  botaoBusca: "Search",
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
  