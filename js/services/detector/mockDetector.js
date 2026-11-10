// Detector falso para desarrollar la interfaz sin YOLO (solo localhost o ?mock).
const IDS = ['cardenal-rojo', 'calandria-dorso-negro-menor', 'paloma-alas-blancas', 'carpintero-del-desierto'];
export class MockDetector {
  n = 0;
  async load() {}
  async detect() {
    const especieId = IDS[Math.floor(this.n++ / 3) % IDS.length];
    return [{ especieId, confianza: 0.8 + Math.random() * 0.15, caja: { x: 0.28, y: 0.3, w: 0.44, h: 0.4 } }];
  }
}
