//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PORTUGUÊS"},
    en: { nativeName: "INGLÊS"}
}

$(function() {
    i18next
        .init({
            debug: true,
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
                            },
                            cadastro:{
                                legenda: 'Clique no mapa para definir o endereço do sua instituição/evento',
                                btnLegenda: 'Cancelar',
                                marcador:{
                                    legenda: "Confirmar",
                                    btn: "Aqui!"
                                },
                                modal:{
                                    legenda: "Cadastrar Instituição/Evento",
                                    modalInstituicao:{
                                        label:{
                                            instituicao: "Instuição",
                                            evento: "Evento",
                                            nome: "Nome*",
                                            site: "Site*",
                                            tipoDeLocal: "Tipo de Local*",
                                            cep: "CEP*",
                                            logradouro: "Logradouro*",
                                            numero:"Número*",
                                            complemento: "Complemento",
                                            bairro: "Bairro*",
                                            cidade: "Cidade*",
                                            uf: "UF*"
                                        },
                                        placeholder:{
                                            nome: "Nome",
                                            site: "Site",
                                            categoria: "Selecionar...",
                                            logo: "Logo: (Tamanho sugerido: 80px x 80px)",
                                            cep: "CEP",
                                            logradouro: "Logradouro",
                                            numero:"Número",
                                            complemento: "Complemento",
                                            bairro: "Bairro",
                                            cidade: "Cidade",
                                        }
    
                                    },
                                    btn:{
                                        fechar: "Fechar",
                                        enviar: "Enviar"
                                    }
                                }
                            }
                    
                        },
                        categorias:{
                            titulo: 'CATEGORIAS', 
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
                        },
                        
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
                            cadastro:{
                                legenda: 'Click on the map to define the address of your institution/event',
                                btnLegenda: 'Cancel',
                                marcador:{
                                    legenda: "Confirm",
                                    btn: "Here!"
                                },
                                modal:{
                                    legenda: "Register Institution/Event",
                                    modalInstituicao:{
                                        label:{
                                            instituicao: "Intitution",
                                            evento: "Events",
                                            nome: "Name*",
                                            site: "Website*",
                                            tipoDeLocal: "Categorie*",
                                            cep: "ZipCode*",
                                            logradouro: "Street Address*",
                                            numero:"House Number*",
                                            complemento: "Complement",
                                            bairro: "District*",
                                            cidade: "City*",
                                            uf: "State*"
                                        },
                                        placeholder:{
                                            nome: "Name",
                                            site: "website",
                                            categoria: "Select...",
                                            logo: "Logo: (Suggested size: 80px x 80px)",
                                            cep: "ZipCode",
                                            logradouro: "Street Address",
                                            numero:"House Number",
                                            complemento: "Complement",
                                            bairro: "District",
                                            cidade: "City",
                                        }
                                    },
                                    btn:{
                                        fechar: "Close",
                                        enviar: "Send"
                                    }
                                }
                            }
                        },
                        categorias:{
                            titulo: 'CATEGORIES',
                            comunidades: 'Communities',
                            aceleradora: 'Startup accelerator',
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
                        },
                        
                    }
                }
                
            }
            
        }, (err, t) => {
            if (err) console.log(err);
           
            jqueryI18next.init(i18next, $, { useOptionsAttr: true });

            Object.keys(lngs).map((lng) => {
                let optSelect = new Option(lngs[lng].nativeName, lng);
                if(lng === i18next.resolvedLanguage){
                    optSelect.setAttribute("selected", "selected");
                }
                $('#languageSwitcher').append(optSelect);
            })

            $('#languageSwitcher').change(() => {
                let chooseLng = $(this).find("option:selected").attr('value');
                i18next.changeLanguage(chooseLng, () => {
                    $("body").localize()
                })
            })

            $("body").localize()
        })
})  