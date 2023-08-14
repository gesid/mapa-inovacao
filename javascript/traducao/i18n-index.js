//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PT-BR"},
    en: { nativeName: "EN-US"}
}

$(function() {
    i18next
        .use(i18nextBrowserLanguageDetector)
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
                                subnavCadastro: "Cadastrar patente",
                                subnavListar: "Ver lista de patentes"
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
                                            uf: "UF*",
                                            startup: "Classificação do Local*"
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
                                            startup: "Escolha o segmento da Startup*"
                                        }
    
                                    },
                                    modalEventos:{
                                        label:{
                                            instituicao: "Instuição",
                                            evento: "Evento",
                                            nome: "Nome*",
                                            site: "Site*",
                                            tipoDeLocal: "Tipo de Evento*",
                                            descricao: "Descrição*",
                                            cep: "CEP*",
                                            logradouro: "Logradouro*",
                                            numero:"Número*",
                                            complemento: "Complemento",
                                            bairro: "Bairro*",
                                            cidade: "Cidade*",
                                            uf: "UF*",
                                            
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
                                            select:{
                                                label: "Selecionar...",
                                                empreendedorismo: "Empreendedorismo",
                                                tecnologia: "Tecnologia",
                                                inovacao: "Inovação",
                                                negocios: "Negócios",
                                            }
                                            
                                        }
    
                                    },
                                    modalSolicitacao:{
                                        legenda:"Recebemos a solitação de cadastro!",
                                        texto1: "Obrigado por cadastrar sua instituição!",
                                        texto2: {
                                            sub1: "As informações estão ",
                                            sub2: "em análise",
                                            sub3: ", em breve sua instituição será adicionada ao mapa!"
                                        },
                                        texto3: "Caso ocorra algua pendência, informaremos por e-mail.",
                                    },
                                    btn:{
                                        fechar: "Fechar",
                                        enviar: "Enviar"
                                    }

                                }
                            },
                            btnUser:{
                                saudacao: "Olá, {{name}} !",
                                perfil: "MEU PERFIL",
                                sair: "SAIR"
                            }
                        },
                        categorias:{
                            titulo: 'CATEGORIAS', 
                            tituloMobile: 'Categorias',
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
                        barraLateral:{
                            busca: "Buscar",
                            cards:{
                                cardsComunidade:{
                                    btnAtivar: "Ativar no mapa",
                                    btnDesativar: "Desativar do mapa",
                                    btnVisitar: "Visitar Site",
                                    txtMarcadoPor: "Marcado por:"
                                },
                                cardsEntidades:{
                                    btnLocalizacao: "Localização",
                                    btnVisitarSite: "Visitar Site",
                                    txtMarcadoPor: "Marcado por:"
                                },
                                cardsPatentes:{
                                    verMais: "Ver Mais",
                                    verMenos: "Ver Menos",
                                    depositantes: "Depositantes",
                                    publicacao:"Publicação",
                                    numeroDoPedido: "Nº de Pedido no INPI",
                                    btnVerMais: "Ver Mais Informações"
                                }
                            }
                        },
                        popupBtnContainer:{
                            btnVisitar: "Visitar Site",
                            btnLink: "Link da Localização"
                        },
                        modalCookies:{
                            texto: "Este site utiliza cookies para a sua melhor experiência. Consulte nossa Política de Privacidade para saber mais sobre como usamos e cuidamos dos seus dados. Ao continuar navegando, você concorda automaticamente com os termos apresentados."
                        },
                        modalCategoriaMobile:{
                            btnIrParaOMapa: "Ir para o mapa"
                        },
                        alert:{
                            cepInvalidoCadastro: "CEP inválido.",
                            voceEstaDeslogado: "Você está deslogado."   
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
                                            uf: "State*",
                                            startup: "Classification*"
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
                                            startup: "Choose the startup segment"
                                        }
                                    },
                                    modalEventos:{
                                        label:{
                                            instituicao: "Intitution",
                                            evento: "Events",
                                            nome: "Name*",
                                            site: "Website*",
                                            tipoDeLocal: "Event category*",
                                            descricao: "Description*",
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
                                            select:{
                                                label: "Select...",
                                                empreendedorismo: "Entrepreneurship",
                                                tecnologia: "Technology",
                                                inovacao: "Innovation",
                                                negocios: "Business",
                                            }
                                        }
                                    },
                                    modalSolicitacao:{
                                        legenda:"We received the registration request!",
                                        texto1: "Thank you for registering your institution!",
                                        texto2: {
                                            sub1:"The informations are ",
                                            sub2: "under analysis",
                                            sub3: ", soon your institution will be added to the map!"
                                        },
                                        texto3: "If there are any problems, we will inform you by email.",
                                    },
                                    btn:{
                                        fechar: "Close",
                                        enviar: "Send"
                                    }
                                },
                                
                            },
                            btnUser:{
                                saudacao: "Hello, {{name}} !",
                                perfil: "MY PROFILE",
                                sair: "LOGOUT"
                            }
                        },
                        categorias:{
                            titulo: 'CATEGORIES',
                            tituloMobile: 'Categories',
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
                        barraLateral:{
                            busca: "Search",
                            cards:{
                                cardsComunidade:{
                                    btnAtivar: "Enable on map",
                                    btnDesativar: "Disable on map",
                                    btnVisitar: "Visit Website",
                                    txtMarcadoPor: "Marked by:"
                                },
                                cardsEntidades:{
                                    btnLocalizacao: "Localization",
                                    btnVisitarSite: "Visit Website",
                                    txtMarcadoPor: "Marked by:"
                                },
                                cardsPatentes:{
                                    verMais: "Show More",
                                    verMenos: "Show Less",
                                    depositantes: "Applicant",
                                    publicacao:"Publication Date",
                                    numeroDoPedido: "INPI Application Number",
                                    btnVerMais: "Show more information"
                                }
                            }
                        },
                        popupBtnContainer:{
                            btnVisitar: "Visit Website",
                            btnLink: "Location Link"
                        },
                        modalCookies:{
                            texto: "This website uses cookies for your best experience. View our Privacy Policy to learn more about how we use and care for your data. As you continue browsing, you automatically agree to the terms presented."
                        },
                        modalCategoriaMobile:{
                            btnIrParaOMapa: "Return to the map"
                        },
                        alert:{
                            cepInvalidoCadastro: "Zipcode invalid",
                            voceEstaDeslogado: "You're logged out."
                        }
                    }
                }
                
            }
            
        }, (err, t) => {
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
