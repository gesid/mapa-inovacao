const regioesArray = [
  {
    regiao: "Fortaleza",
    cidades: ["Fortaleza"],
  },
  {
    regiao: "Metropolitano ",
    cidades: [
      "Apuiarés",
      "Aquiraz",
      "Canindé",
      "Caridade",
      "Caucaia",
      "Chorozinho",
      "Eusébio",
      "General Sampaio",
      "Guaiúba",
      "Horizonte",
      "Itaitinga",
      "Maracanaú",
      "Maranguape",
      "Pacajus",
      "Pacatuba",
      "Paracuru",
      "Paramoti",
      "Pentecoste",
      "São Gonçalo do Amarante",
      "São Luís do Curu",
      "Tejuçuoca",
    ],
  },
  {
    regiao: "Litoral Leste",
    cidades: [
      "Aracati",
      "Beberibe",
      "Cascavel",
      "Fortim",
      "Icapuí",
      "Itaiçaba",
      "Pindoretama",
    ],
  },
  {
    regiao: "Jaguaribe",
    cidades: [
      "Alto Santo",
      "Ererê",
      "Iracema",
      "Jaguaretama",
      "Jaguaribara",
      "Jaguaruana",
      "Limoeiro do Norte",
      "Morada Nova",
      "Palhano",
      "Pereiro",
      "Potiretama",
      "Quixeré",
      "Russas",
      "São João do Jaguaribe",
      "Tabuleiro do Norte",
    ],
  },
  {
    regiao: "Centro Sul",
    cidades: [
      "Acopiara",
      "Antonina do Norte",
      "Baixio",
      "Cariús",
      "Catarina",
      "Cedro",
      "Deputado Irapuan Pinheiro",
      "Icó",
      "Iguatu",
      "Ipaumirim",
      "Jucás",
      "Lavras da Mangabeira",
      "Orós",
      "Piquet Carneiro",
      "Quixelô",
      "Saboeiro",
      "Tarrafas",
      "Umari",
    ],
  },
  {
    regiao: "Cariri",
    cidades: [
      "Acopiara",
      "Antonina do Norte",
      "Baixio",
      "Cariús",
      "Catarina",
      "Cedro",
      "Deputado Irapuan Pinheiro",
      "Icó",
      "Iguatu",
      "Ipaumirim",
      "Jucás",
      "Lavras da Mangabeira",
      "Orós",
      "Piquet Carneiro",
      "Quixelô",
      "Saboeiro",
      "Tarrafas e UmariAltaneira",
      "Araripe",
      "Assaré",
      "Aurora",
      "Barbalha",
      "Barro",
      "Brejo Santo",
      "Campos Sales",
      "Caririaçu",
      "Crato",
      "Farias Brito",
      "Granjeiro",
      "Jardim",
      "Jati",
      "Juazeiro do Norte",
      "Mauriti",
      "Milagres",
      "Missão Velha",
      "Nova Olinda",
      "Penaforte",
      "Porteiras",
      "Potengi",
      "Salitre",
      "Santana do Cariri",
      "Várzea Alegre",
    ],
  },
  {
    regiao: "Sertão de Crateús",
    cidades: [
      "Aiuaba",
      "Ararendá",
      "Arneiroz",
      "Catunda",
      "Crateús",
      "Independência",
      "Ipaporanga",
      "Monsenhor Tabosa",
      "Nova Russas",
      "Novo Oriente",
      "Parambu",
      "Poranga",
      "Quiterianópolis",
      "Santa Quitéria",
      "Tamboril",
      "Tauá",
      "Hidrolândia",
      "Ipueiras",
    ],
  },

  {
    regiao: "Sertão Central",
    cidades: [
      "Banabuiú",
      "Boa Viagem",
      "Choró",
      "Ibaretama",
      "Ibicuitinga",
      "Itatira",
      "Madalena",
      "Milhã",
      "Mombaça",
      "Pedra Branca",
      "Quixadá",
      "Quixeramobim",
      "Senador Pompeu",
      "Solonópole",
    ],
  },
  {
    regiao: "Chapada da Ibiapaba",
    cidades: [
      "Viçosa do Ceará",
      "Tianguá",
      "Ubajara",
      "Ibiapina",
      "São Benedito",
      "Carnaubal",
      "Guaraciaba do Norte",
      "Croatá",
      "Graça",
      "Pacujá",
      "Mucambo",
      "Ipu",
      "Pires Ferreira",
    ],
  },
  {
    regiao: "Regional Norte",
    cidades: [
      "Granja",
      "Chaval",
      "Barroquinha",
      "Cruz",
      "Camocim",
      "Jericoacoara",
      "Marco",
      "Morrinhos",
      "Santana do Acaraú",
      "Senador Sá",
      "Martinópole",
      "Uruoca",
      "Massapê",
      "Moraújo",
      "Coreaú",
      "Meruoca",
      "Alcântaras",
      "Sobral",
      "Forquilha",
      "Groaíras",
      "Cariré",
      "Reriutaba",
      "Varjota",
      "Irauçuba",
    ],
  },
  {
    regiao: "Itapipoca",
    cidades: [
      "Itapipoca",
      "Bela Cruz",
      "Acaraú",
      "Itarema",
      "Amontada",
      "Miraíma",
      "Trairí",
      "Paraipaba",
      "Tururu",
      "Uruburetama",
      "Umirim",
      "Itapajé",
    ],
  },
  {
    regiao: "Maciço do Baturité",
    cidades: [
      " Acarape",
      "Aracoiaba",
      "Aratuba",
      "Barreira",
      "Baturité",
      "Capistrano",
      "Guaramiranga",
      "Itapiúna",
      "Mulungu",
      "Ocara",
      "Pacoti",
      "Palmácia",
      "Redenção",
    ],
  },
];

let vetorEntidadesComImagem = [];
vetorEntidadesComImagem.push({
  nome: "Startup",
  imagem: "img/img-bl/26-startup.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Governo",
  imagem: "img/img-bl/12-governo.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Mentoria",
  imagem: "img/img-bl/22-rede-de-mentoria.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Propriedade Intelectual",
  imagem: "img/img-bl/20-propriedade-intelectual.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Pré Aceleradora",
  imagem: "img/img-bl/19-pre-aceleradoras.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Parques Tecnológicos",
  imagem: "img/img-bl/18-parques-tecnologicos.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Núcleos de Inovação",
  imagem: "img/img-bl/17-nucleo-de-inovacoes.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Investidores",
  imagem: "img/img-bl/15-investidores.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Iniciativas Universitárias",
  imagem: "img/img-bl/25-iniciativa-universitaria.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Incubadoras",
  imagem: "img/img-bl/14-incubadora.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Grandes Empresas",
  imagem: "img/img-bl/13-grandes-empresas.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Fábrica de Aplicativos",
  imagem: "img/img-bl/11-fabrica-de-aplicativos.png",
  quantidade: 0,
});

vetorEntidadesComImagem.push({
  nome: "Espaços Makers",
  imagem: "img/img-bl/09-espaco-maker.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Escolas",
  imagem: "img/img-bl/24-escola.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Coworking",
  imagem: "img/img-bl/06-coworking.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Comunicação e Mídia",
  imagem: "img/img-bl/03-comunicacao-e-midia.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Catalisadores Locais",
  imagem: "img/img-bl/23-catalisadores-locais.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Advogados",
  imagem: "img/img-bl/02-advogado.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Aceleradora",
  imagem: "img/img-bl/01-aceleradora.png",
  quantidade: 0,
});
vetorEntidadesComImagem.push({
  nome: "Eventos",
  imagem: "img/img-bl/10-eventos.png",
  quantidade: 0,
});
console.log(vetorEntidadesComImagem);

let index = vetorEntidadesComImagem.findIndex((object) => {
  return object.nome === "Aceleradora";
});

