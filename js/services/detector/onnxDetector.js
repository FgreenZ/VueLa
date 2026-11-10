// Detector YOLO (v8/v11) con onnxruntime-web. Salida esperada: [1, 4+nc, N] (cx, cy, w, h, scores...).
const BASE = new URL('../../../', import.meta.url);
const MODEL = new URL('models/vuela.onnx', BASE).href, LABELS = new URL('models/labels.json', BASE).href;
const SIZE = 640, CONF = 0.35, IOU = 0.5;

const cargarOrt = () => window.ort ? Promise.resolve() : new Promise((ok, fail) => {
  const s = document.createElement('script'); s.src = new URL('vendor/ort/ort.wasm.min.js', BASE).href;
  s.onload = ok; s.onerror = () => fail(new Error('No se pudo cargar onnxruntime')); document.head.append(s);
});
const iou = (a, b) => {
  const x = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)), y = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
  const i = x * y; return i / (a.w * a.h + b.w * b.h - i || 1);
};

export class OnnxDetector {
  async load() {
    const [mr, lr] = await Promise.all([fetch(MODEL), fetch(LABELS)]);
    if (!mr.ok) throw new Error('Falta models/vuela.onnx');
    this.labels = await lr.json();
    await cargarOrt();
    ort.env.wasm.wasmPaths = new URL('vendor/ort/', BASE).href;
    ort.env.wasm.numThreads = self.crossOriginIsolated ? Math.min(4, navigator.hardwareConcurrency || 1) : 1;
    this.session = await ort.InferenceSession.create(await mr.arrayBuffer(), { executionProviders: ['wasm'] });
    this.canvas = document.createElement('canvas'); this.canvas.width = this.canvas.height = SIZE;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
  }
  async detect(video) {
    const vw = video.videoWidth, vh = video.videoHeight;
    if (!vw || !vh) return [];
    // Letterbox a 640×640 (como en el entrenamiento de Ultralytics)
    const k = Math.min(SIZE / vw, SIZE / vh), w = vw * k, h = vh * k, px = (SIZE - w) / 2, py = (SIZE - h) / 2;
    this.ctx.fillStyle = 'rgb(114,114,114)'; this.ctx.fillRect(0, 0, SIZE, SIZE);
    this.ctx.drawImage(video, px, py, w, h);
    const { data } = this.ctx.getImageData(0, 0, SIZE, SIZE), n = SIZE * SIZE, inp = new Float32Array(3 * n);
    for (let i = 0; i < n; i++) { inp[i] = data[i * 4] / 255; inp[n + i] = data[i * 4 + 1] / 255; inp[2 * n + i] = data[i * 4 + 2] / 255; }
    const out = await this.session.run({ [this.session.inputNames[0]]: new ort.Tensor('float32', inp, [1, 3, SIZE, SIZE]) });
    const t = out[this.session.outputNames[0]], [, rows, N] = t.dims, nc = rows - 4, d = t.data;
    if (nc !== this.labels.length) console.warn(`[VueLa] El modelo tiene ${nc} clases y labels.json ${this.labels.length}.`);
    const cand = [];
    for (let i = 0; i < N; i++) {
      let best = 0, c = -1;
      for (let j = 0; j < nc; j++) { const s = d[(4 + j) * N + i]; if (s > best) { best = s; c = j; } }
      if (best < CONF) continue;
      const cx = d[i], cy = d[N + i], bw = d[2 * N + i], bh = d[3 * N + i];
      const x = Math.max(0, (cx - bw / 2 - px) / k / vw), y = Math.max(0, (cy - bh / 2 - py) / k / vh);
      cand.push({ c, confianza: best, caja: { x, y, w: Math.min(1 - x, bw / k / vw), h: Math.min(1 - y, bh / k / vh) } });
    }
    cand.sort((a, b) => b.confianza - a.confianza);
    const keep = [];
    for (const a of cand) if (keep.every(b => b.c !== a.c || iou(a.caja, b.caja) < IOU)) keep.push(a);
    return keep.map(({ c, confianza, caja }) => ({ especieId: this.labels[c], confianza, caja })).filter(r => r.especieId);
  }
}
