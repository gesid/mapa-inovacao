window.onload = async function () {
  await adicionarSegmentosSelects();
};

async function adicionarSegmentosSelects() {
  const segmentoStartupsDao = new SegmentosStartupsDao();
  const selectSegmentosStartups = document.getElementById(
    "validacaoClassificacao"
  );
  const selectFiltroStartups = document.getElementById("filtroStartup");

  const segmentosCarregados =
    await segmentoStartupsDao.carregarSegmentosStartups();
  adicionarSegmentosStartups(segmentosCarregados, selectSegmentosStartups);
  adicionarSegmentosStartups(segmentosCarregados, selectFiltroStartups);
}

function adicionarSegmentosStartups(segmentosCarregados, elementoInsercao) {
  segmentosCarregados.forEach((segmentoStartup) => {
    const option = document.createElement("option");
    option.setAttribute("value", segmentoStartup.valor);
    option.innerText = segmentoStartup.nome;
    elementoInsercao.appendChild(option);
  });
}
