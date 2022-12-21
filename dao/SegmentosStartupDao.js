const COLLECTION_NAME = "/segmentos_startups";
const segmentosStartupsCollectionRef = firebaseDatabase.ref(COLLECTION_NAME);

class SegmentosStartupsDao {
  async carregarSegmentosStartups() {
    const segmentosStartups = [];
    const snapshot = await segmentosStartupsCollectionRef
      .orderByChild("Nome")
      .once("value");

    snapshot.forEach((child) => {
      const segmentoStartupConvertido =
        this.converterSegmentoStartupFirbaseParaSegmentoStartup(child);
      segmentosStartups.push(segmentoStartupConvertido);
    });

    return segmentosStartups;
  }

  converterSegmentoStartupFirbaseParaSegmentoStartup(segmentoStartupFirebase) {
    const nome = segmentoStartupFirebase.val().Nome;
    const valor = segmentoStartupFirebase.val().Valor;
    const segmentoStartup = new SegmentoStartup(nome, valor);
    return segmentoStartup;
  }
}
