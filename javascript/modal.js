/********Modal Como Utilizar*************/

/*Centralizado o link do vídeo*/
function videoComoUtilizar() {
  document.getElementById(
    "localVideo"
  ).innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/EvodB7HPhIw"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>`;
}

/*Quando a página está carregada o vídeo é adicionado ao modal*/
$(document).ready(() => {
  videoComoUtilizar();
});

/*Quando o modal fecha o video é carregado novamente. Assim ele para de funcionar e volta para o início*/
$("#modalSobre").on("hidden.bs.modal", videoComoUtilizar);
