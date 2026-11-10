import { badge, hora, esc } from './components.js';
import { icon } from './icons.js';
export const camaraView = () => `
<div class="camscreen" id="cs">
  <div class="cam"><video id="video" autoplay playsinline muted></video><div class="shade"></div>
    <span class="ia glass"><i class="dot" style="background:var(--cyan)"></i>IA activa · La Paz, B.C.S.</span>
    <div class="ctl"><button class="rnd glass" aria-label="Flash">${icon('flash', 19)}</button><button class="rnd glass">1×</button></div>
    <div class="visor"><b></b><b></b><b></b><b></b></div>
    <div id="box" hidden><span id="tag" class="lbl"></span></div>
    <p id="cam-msg" hidden></p>
    <p id="hint">Presiona para registrar</p></div>
  <button id="capture" class="shutter" aria-label="Abrir cámara"><span class="s-open">${icon('camera', 30)}</span><span class="s-shot">${icon('camera', 30)}</span></button>
  <p id="idle-msg" hidden></p>
  <section class="sheet"><i class="grip"></i><div id="det"><p class="muted">Apunta la cámara a un ave.</p></div></section>
</div>`;
export const detCard = (e, lugar = 'La Paz, B.C.S.') => `
<div class="ident"><div><h3>${esc(e.nombre)} ${badge(e.estatus)}</h3><p class="sci">${esc(e.cientifico)}</p></div><div class="thumb"></div></div>
<div class="data" style="margin:12px 0"><div><span class="ib">${icon('pin', 17)}</span><span><small>Ubicación</small>${esc(lugar)}</span></div><div><span class="ib">${icon('clock', 17)}</span><span><small>Fecha</small>${hora(Date.now())}</span></div></div>
<div class="acts"><button id="save" class="save" aria-label="Guardar">${icon('bookmark', 22)}</button><a class="ver" href="#/especie/${esc(e.id)}">Ver ficha ${icon('arrow', 20)}</a></div>`;
