import { camaraView, detCard } from '../views/camara.js';
import { getEspecies } from '../services/api.js';
import { addAvistamiento } from '../services/storage.js';
import { startCamera, stopCamera } from '../services/camera.js';
import { createDetector } from '../services/detector/detector.js';
import { ubicar } from '../services/geo.js';

const UMBRAL = 0.5;            // por debajo de esto la app dice "no identificada" en vez de arriesgar una especie
const PAUSA = 300;             // ms entre inferencias
const dormir = ms => new Promise(r => setTimeout(r, ms));
const VACIO = '<p class="muted">Apunta la cámara a un ave.</p>';

// Convierte la caja (0-1 sobre el cuadro de video) a % del contenedor, considerando object-fit: cover.
function aPantalla(caja, video, cont) {
  const vw = video.videoWidth, vh = video.videoHeight, cw = cont.clientWidth, ch = cont.clientHeight;
  if (!vw || !vh) return caja;
  const k = Math.max(cw / vw, ch / vh), dw = vw * k, dh = vh * k, ox = (cw - dw) / 2, oy = (ch - dh) / 2;
  return { x: (caja.x * dw + ox) / cw, y: (caja.y * dh + oy) / ch, w: caja.w * dw / cw, h: caja.h * dh / ch };
}

export default async function (root, _id, vivo) {
  const especies = await getEspecies();
  if (!vivo()) return;
  root.innerHTML = camaraView();
  const $ = s => root.querySelector(s), btn = $('#capture'), cs = $('#cs');
  const aviso = (id, t) => { $(id).textContent = t; $(id).hidden = false; };
  let estado = 'reposo';                       // reposo -> abriendo -> abierta
  let pos = null, ultima = null, mostrada = null, fallos = 0;

  const ocultar = () => { ultima = mostrada = null; $('#box').hidden = true; $('#det').innerHTML = VACIO; };

  // Un solo botón con dos funciones según el estado.
  async function abrir() {
    estado = 'abriendo'; $('#idle-msg').hidden = true; btn.disabled = true;
    try { await startCamera($('#video')); }
    catch { estado = 'reposo'; btn.disabled = false; if (vivo()) aviso('#idle-msg', 'No se pudo abrir la cámara. Permite el acceso y abre la app con HTTPS o localhost.'); return; }
    if (!vivo()) { stopCamera(); return; }
    estado = 'abierta'; btn.disabled = false;
    cs.classList.add('open'); btn.setAttribute('aria-label', 'Registrar avistamiento');
    ubicar().then(p => (pos = p));             // el GPS se pide hasta que el usuario abre la cámara

    let detector;
    try { detector = await createDetector(); } catch { aviso('#cam-msg', 'El modelo de identificación no está disponible por ahora.'); }
    if (!vivo() || !detector) return;
    const tick = async () => {
      try {
        const [d] = await detector.detect($('#video'));
        if (!vivo()) return;
        if (!d || d.confianza < UMBRAL) { if (++fallos >= 2) ocultar(); return; }   // tolera 1 cuadro fallido para no parpadear
        fallos = 0; ultima = d;
        const e = especies.find(x => x.id === d.especieId); if (!e) return;
        const c = aPantalla(d.caja, $('#video'), $('.cam'));
        Object.assign($('#box').style, { left: c.x * 100 + '%', top: c.y * 100 + '%', width: c.w * 100 + '%', height: c.h * 100 + '%' });
        $('#box').hidden = false;
        $('#tag').innerHTML = `<i class="dot" style="background:#1f7a4d"></i>${e.nombre} <span>${Math.round(d.confianza * 100)}%</span>`;
        if (mostrada !== e.id) { mostrada = e.id; $('#det').innerHTML = detCard(e, pos ? `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}` : undefined); }
      } catch (err) { console.error('[VueLa] detección:', err); }
    };
    while (vivo()) { await tick(); await dormir(PAUSA); }
  }

  function capturar() {
    if (!ultima) { $('#hint').textContent = 'No hay ave identificada todavía'; return; }
    addAvistamiento({ especieId: ultima.especieId, ...(pos && { lat: pos.lat, lng: pos.lng, lugar: 'Ubicación GPS' }) });
    $('#hint').textContent = '¡Avistamiento guardado!';
  }

  root.onclick = ev => {
    if (ev.target.closest('#capture')) return estado === 'reposo' ? abrir() : estado === 'abierta' && capturar();
    if (ev.target.closest('#save')) return capturar();
  };
  return () => stopCamera();
}
