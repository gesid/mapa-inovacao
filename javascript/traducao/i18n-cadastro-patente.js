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
              btnUser:{
                saudacao: "Olá, {{name}} !",
                perfil: "MEU PERFIL",
                sair: "SAIR"
              }
            },
            patentsRegister: {
              sectionPatentsRegister: {
                tituloPatente: "Título da Patente*",
                patentPlaceholder: "Título da Patente*"
              },
              menu: {
                sectionHeader: {
                  mapa: "MAPA",
                  ecossistema2: "ECOSSISTEMA",
                  tutorial: "TUTORIAL",
                  navEventos: "EVENTOS",
                  patente: "PATENTE",
                  cadastrarPatente: "Cadastrar patente",
                  verListaPatente: "Ver lista de patentes",
                  descricao: "Descrição*",
                  secoes: "Seções da Patente*",
                  secaoA: "Seção A - Necessidade Humanas",
                  secaoB: "Seção B - Operações de Processameto, Transporte",
                  secaoC: "Seção C - Química e Metalurgia",
                  secaoD: "Seção D - Têxteis e Papel",
                  secaoE: "Seção E - Construções Fixas",
                  secaoF: "Seção F - Eng. Mecânica, Iluminação, Aquecimento, Armas, Explosão",
                  secaoG: "Seção G - Física",
                  secaoH: "Seção H - Eletricidade",
                  classificacaoPatente: "Classifições da Patente*",
                  classificacaoObs: "Cada classificação deve ser separada por ponto e vírgula(;) como no exemplo*",
                  numeroPedido: "Número do pedido no INPI*",
                  aceleradora: "Accelerator",
                  placeholder2: "Número do pedido no INPI*",
                  dataPublicacao: "Data de Publicação*",
                  depositante: "Depositantes*",
                  classificacaoDepositante: "Classificação do Depositante*",
                  depositante2: "Depositante*",
                  depositanteObs: "Nenhum depositante adicionado...",
                  botaoCadastrar: "Cadastrar Patente",
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
                  alertaObrigado: "Obrigado por cadastrar sua patente!",
                  alertaInfo: "As informações estão",
                  alertaEmAnalise: "em análise",
                  alertaEmBreve: ", em breve sua patente será associada aos depositantes no mapa!",
                  alertaCasoOcorra: "Caso ocorra alguma pendência, informaremos por e-mail.",
                  alertaSolicitacao: "Recebemos a solitação de cadastro!",
                  botaoFechar: "Fechar"
                },
                sectionRodape: {
                  titulo: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                  descricao: "Versão 0.2 (Beta)",
                  politicaPrivacidade: "TERMOS DE PRIVACIDADE",
                  termoUso: "TERMOS DE USO",
                  termoConsentimento: "TERMOS DE CONSENTIMENTO"
                },
              },
            },
            alert:{
              voceEstaDeslogado: "Você está deslogado." ,
              naoExisteNenhumaentidadeCadastrada: "Não existe nenhuma entidade cadastrada nesta categoria.",
              esteDepositanteJaFoiSelecionado: "Este depositante já foi selecionado.",
            },
            error:{
              preenchaTodasAsInformacaoObrigatorias: "Preencha todas as informações obrigatórias", 
              selecionePeloMenosUmaSecao: "Selecione pelo menos uma seção para a patente",
              selecionePeloMenusUmDepositante: "Selecione pelo menos um depositante da patente",
            }
        },
      },
          en: {
            translation: {  
              navBar1:{
                btnUser:{
                  saudacao: "Hello, {{name}} !",
                    perfil: "MY PROFILE",
                    sair: "LOGOUT"
                }
              },      
              patentsRegister: {
                sectionPatentsRegister: {
                  tituloPatente: "Patent Title*",
                  patentPlaceholder: "Patent Title*"
                },
                menu: {
                  sectionHeader:{
                    mapa: "MAP",
                    ecossistema2: "ABOUT US",
                    tutorial: "TUTORIAL",
                    navEventos: "EVENTS",
                    patente: "PATENT",
                    cadastrarPatente: "Register patent",
                    verListaPatente: "View list of patents",
                    descricao: "Description*",
                    secoes: "Patent Sections*",
                    secaoA: "Section A - Human Needs",
                    secaoB: "Section B - Processing Operations, Transport",
                    secaoC: "Section C - Chemistry and Metallurgy",
                    secaoD: "Section D - Textiles and Paper",
                    secaoE: "Section E - Fixed Constructions",
                    secaoF: "Section F - Mechanical Engineer, Lighting, Heating, Weapons, Explosion",
                    secaoG: "Section G - Physics",
                    secaoH: "Section H - Electricity",
                    classificacaoPatente: "Patent Classifications*",
                    classificacaoObs: "Each classification must be separated by a semicolon (;) as in the example*",
                    numeroPedido: "INPI application number*",
                    aceleradora: "Aceleratora",
                    placeholder2: "INPI application number*",
                    dataPublicacao: "Publication Date*",
                    depositante: "Applicants*",
                    classificacaoDepositante: "Applicant Classification*",
                    depositante2: "Applicant*",
                    depositanteObs: "No applicant added...",
                    botaoCadastrar: "Submit Patent",
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
                    alertaObrigado: "Thank you for registering your patent!",
                    alertaInfo: "The information are",
                    alertaEmAnalise: "under analysis",
                    alertaEmBreve: ", soon your patent will be associated with applicants on the map!",
                    alertaCasoOcorra: "If there are any problems, we will inform you by email.",
                    alertaSolicitacao: "We received the registration request!",
                    botaoFechar: "Close"
                  },
                  sectionRodape: {
                    titulo: "For more information, contact us through of mapainovacao@ufc.br",
                    descricao: "Version 0.2 (Beta)",
                    politicaPrivacidade: "PRIVACY POLICIES",
                    termoUso: "TERMS OF USE",
                    termoConsentimento: "TERMS OF CONSENT"
                  },
                },
              },
              alert:{
                voceEstaDeslogado: "You're logged out.",
                naoExisteNenhumaentidadeCadastrada: "There is no entity registered in this category.",
                esteDepositanteJaFoiSelecionado: "This depositor has already been selected.",
              },
              error:{
                preenchaTodasAsInformacaoObrigatorias: "Fill in all required information",
                selecionePeloMenosUmaSecao: "Select at least one section for the patent",
                selecionePeloMenusUmDepositante: "Select at least one patent applicant"
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
