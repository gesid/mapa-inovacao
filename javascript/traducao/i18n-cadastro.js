//import {navBar1} from '../traducao/navBar1.js'

//array com os idiomas que serão usados
const lngs = {
    pt: { nativeName: "PT-BR"},
    en: { nativeName: "EN-US"}
}

$(function() {
    i18next
        .init({
            debug: true,
            fallbackLng:'pt',
            resources:{
                pt:{
                    translation:{
                        navBar2:{
                            navMap: "MAPA",
                            navEcossistema: "ECOSSISTEMA",
                            navTutorial:{
                                titulo: "COMO UTILIZAR",
                                subtitulo: "Colaborar é muito simples! Veja no vídeo abaixo como funciona:"
                            },
                            navEventos: "EVENTOS",
                            navPatentes:{
                                titulo: "PATENTES",
                                subnavCadastro: "Cadastrar Patentes",
                                subnavListar: "Listar Patentes"
                            },
                        },
                        cadastro:{
                            titulo: "CADASTRO",
                            labels:{
                                nomeCompleto: "NOME COMPLETO",
                                senha: "SENHA",
                                repetirSenha: "REPETIR SENHA",
                                termos:{
                                    incioDoTexto: "Li e concordo com  os",
                                    termoDeUso: "Termos de Uso",
                                    politica: "Política de Privacidade",
                                    e: "e",
                                    termoDeConsentimento: "Termo de Consentimento"
                                },
                                possuiCadastro: "Já possui cadastro?",
                                facaLogin: "Faça o login"
                            },
                            placeholders:{
                                nomeCompleto: "Digite seu nome",
                                email: "Digite seu e-mail",
                                senha: "Digite sua senha",
                                repetirSenha: "Digite novamente sua senha"
                            },
                            btn: "CADASTRAR"
                        },
                        footer:{
                            texto: "Para mais informações, fale conosco através do mapainovacao@ufc.br",
                            versao: "Versão 0.2 (Beta)",
                            polica: "POLÍTICAS DE PRIVACIDADE",
                            termoDeUso: "TERMOS DE USO",
                            termoDeConsentimento: "TERMOS DE CONSENTIMENTO"
                        },

                    }
                },
                en:{
                    translation:{
                        navBar2:{
                            navMap: "MAP",
                            navEcossistema: "ABOUT US",
                            navTutorial:{
                                titulo: "TUTORIAL",
                                subtitulo: "It is very simple to collaborate! Watch the video bellow to see how it works:"
                            },
                            navEventos: "EVENTS",
                            navPatentes:{
                                "titulo": "PATENTS",
                                "subnavCadastro": "Register Patents",
                                "subnavListar": "List Patents"
                            },
                        },
                        cadastro:{
                            titulo: "CREATE YOUR ACCOUNT",
                            labels:{
                                nomeCompleto: "FULL NAME",
                                senha: "PASSWORD",
                                repetirSenha: "REPEAT PASSWORD",
                                termos:{
                                    incioDoTexto: "Read and agree with the",
                                    termoDeUso: "Terms of Use",
                                    politica: "Privacy Policy",
                                    e: "and",
                                    termoDeConsentimento: "Terms of Consent"
                                },
                                possuiCadastro: "Already have an account?",
                                facaLogin: "Log in"
                            },
                            placeholders:{
                                nomeCompleto: "Enter your name",
                                email: "Enter your email",
                                senha: "Enter your password",
                                repetirSenha: "Enter your password again"
                            },
                            btn: "SING UP"
                        },
                        footer:{
                            texto: "For more informations, contact us through mapainovaocao@ufc.br",
                            versao: "Version 0.2 (Beta)",
                            polica: "PRIVACY POLICY",
                            termoDeUso: "TERMS OF USE",
                            termoDeConsentimento: "TERMS OF CONSENT"
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

            $("body").localize()
        })
})  