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
                        /**Precisa ser navBar1 por conta que o btnUser é padrão para várias telas */
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
                        modalFaleConosco:{
                            txtFaleConosco: "Fale Conosco",
                            txtReportar: "Reportar Bugs/Melhorias"
                        },
                        footer:{
                            texto: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                            versao: "Versão 0.2 (Beta)",
                            polica: "POLÍTICAS DE PRIVACIDADE",
                            termoDeUso: "TERMOS DE USO",
                            termoDeConsentimento: "TERMOS DE CONSENTIMENTO"
                        },
                        alert:{
                            voceEstaDeslogado: "Você está deslogado." ,
                        }
                    }
                },
                en:{
                    translation:{
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
                        modalFaleConosco:{
                            txtFaleConosco: "Contact us",
                            txtReportar: "Report Bugs/Improvements"
                        },
                        footer:{
                            texto: "For more informations, contact us through mapainovaocao@ufc.br",
                            versao: "Version 0.2 (Beta)",
                            polica: "PRIVACY POLICY",
                            termoDeUso: "TERMS OF USE",
                            termoDeConsentimento: "TERMS OF CONSENT"
                        },
                        alert:{
                            voceEstaDeslogado: "You're logged out.",
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
            });


            $('#languageSwitcher').change(() => {
                let chooseLng = $(this).find("option:selected").attr('value');
                i18next.changeLanguage(chooseLng, () => {
                    $("body").localize()
                })
            });

            $("body").localize()
        })

})  