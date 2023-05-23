//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PORTUGUÊS"},
    en: { nativeName: "INGLÊS"}
}

$(function() {
    i18next
        /**
         * pluging do backend - carregado no html como i18nextHttpBackend.min.js
         * aqui eu estou dizendo que ele será usado
         * Para usá-lo basta que a gente tenha a seguinte estrutura de pastas:
         * locales/lng_a_ser_usada/translation.json
         * para cada idioma.    */
        //.use(i18nextHttpBackend)
        .init({

            //Ver erros no console
            debug: true,
            //Idioma que será o padrão.O primeiro a ser carregado
            fallbackLng:'pt',

            resources:{
                pt:{
                    translation:{
                        navBar1:{
                            navEcossistema: "ECOSSISTEMA",
                            navTutorial:{
                                titulo: "TUTORIAL",
                                subtitulo: "Colaborar é muito simples! Veja no vídeo abaixo como funciona:"
                            },
                            navFiltrar:{
                                titulo:"FILTRAR",
                                subtitulo:"Filtros de Categoria",
                                checkboxs:{
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
                                    check18: "Mentoria"
                                },
                                select:"Escolha o segmento da startup",
                                botoes:{
                                    btnFechar: "Fechar",
                                    btnFiltrar: "Filtrar"
                                }
                            },
                            navCadastrar:"CADASTRAR",
                            navEventos: "EVENTOS",
                            navPatentes:{
                                titulo: "PATENTES",
                                subnavCadastro: "Cadastrar Patentes",
                                subnavListar: "Listar Patentes"
                            }
                    
                        }
                    }
                },
                en:{
                    translation:{
                        navBar1:{
                            navEcossistema: "ABOUT US",
                            navTutorial:{
                                titulo: "TUTORIAL",
                                subtitulo: "It is very simple to collaborate! Watch the video bellow to see how it works:"
                            },
                            navFiltrar:{
                                titulo:"FILTER",
                                subtitulo:"Category filters",
                                checkboxs:{
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
                                    check18: "Mentorship"
                                },
                                select:"Choose the startup segment",
                                botoes:{
                                    btnFechar: "Close",
                                    btnFiltrar: "Filter"
                                }
                            },
                            navCadastrar:"REGISTER",
                            navEventos: "EVENTS",
                            navPatentes:{
                                "titulo": "PATENTS",
                                "subnavCadastro": "Register Patents",
                                "subnavListar": "List Patents"
                            },
                        }
                    }
                }
                
            }
            
        }, (err, t) => {
            //err -> erros
            //t -> são as chaves de busca dos textos. Ex: "titulo": "Teste" - "titulo" seria o t
            if (err) console.log(err);
           
            //utilizando o jquery com a biblioteca
            jqueryI18next.init(i18next, $, { useOptionsAttr: true });

            //Preenchendo o Select de idiomas
            Object.keys(lngs).map((lng) => {
                /* Criando a option do select para cada lingua do array lngs
                 - recebe como parâmetros o texto e a valor do linguagem, que seria o indice 
                 da lingua no array.
                */
                let optSelect = new Option(lngs[lng].nativeName, lng);
                /**
                 * Se o idioma do laço for o mesmo que esteja como principal no i18next, então
                 * atribui-se o atributo selected ao option.
                 */
                if(lng === i18next.resolvedLanguage){
                    optSelect.setAttribute("selected", "selected");
                }
                console.log(optSelect)
                /**Apensando a option ao select */
                $('#languageSwitcher').append(optSelect);
            })

            /**
             * Realizando a mudança na tradução a partir da escolha da opção
             */
            $('#languageSwitcher').change(() => {
                /**
                 * Recuperando o valor do option selecionado.
                 */
                let chooseLng = $(this).find("option:selected").attr('value');
                /**Chamando a função do i18n para alterar para o idioma escolhido */
                i18next.changeLanguage(chooseLng, () => {
                    /**Recarregando o select */
                    $("body").localize()
                })
            })

            /**Recarregando a página */
            $("body").localize()
        })
})  