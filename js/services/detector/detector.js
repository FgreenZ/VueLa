// Contrato de cualquier detector:
//   await detector.load()
//   await detector.detect(video) -> [{ especieId, confianza (0-1), caja: {x,y,w,h} (0-1 sobre el cuadro de video) }]
import { MockDetector } from './mockDetector.js';
const dev = location.hostname === 'localhost' || location.hostname === '127.0.0.1' || new URLSearchParams(location.search).has('mock');

export async function createDetector() {
  if (!new URLSearchParams(location.search).has('mock')) {
    try { const { OnnxDetector } = await import('./onnxDetector.js'); const d = new OnnxDetector(); await d.load(); return d; }
    catch (err) { console.warn('[VueLa] YOLO no disponible:', err.message); if (!dev) throw err; }
  }
  if (!dev) throw new Error('modelo no disponible');
  console.warn('[VueLa] Usando detector FALSO (solo desarrollo).');
  const m = new MockDetector(); await m.load(); return m;
}
