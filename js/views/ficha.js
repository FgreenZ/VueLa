import { badge, hora, esc } from './components.js';
import { icon } from './icons.js';
export const fichaView = (e, a) => `
<div class="top"><a href="#/buscar" aria-label="Volver">${icon('back', 24)}</a><b>Ficha de especie</b><button aria-label="Compartir">${icon('share', 20)}</button></div>
<div class="hero">${a ? `<span class="tag">${icon('verified', 16)}AVISTAMIENTO REGISTRADO</span>` : ''}</div>
<article class="fic">
 <div><h1>${esc(e.nombre)}</h1><p class="sci">${esc(e.cientifico)}</p><div class="bd">${badge(e.estatus)}<span class="chipr">${icon('pin', 12)}${esc(e.region)}</span></div></div>
 <section><h2><i class="dot"></i>Descripción</h2><p>${esc(e.descripcion)}</p></section>
 <section><h2><i class="dot"></i>Hábitat</h2><p>${esc(e.habitat)}</p></section>
 <section class="tip"><h3>${icon('leaf', 20)}Recomendaciones de observación responsable</h3>
  <div>${icon('distance', 16)}Obsérvala a distancia y sin perseguirla.</div>
  <div>${icon('mute', 16)}No reproduzcas cantos para atraerla, sobre todo en temporada de anidación.</div>
  <div>${icon('trail', 16)}Mantente en los senderos y no la alimentes.</div></section>
 ${a ? `<div class="reg2"><span>${icon('pin', 16)}${esc(a.lugar)}</span><span>${icon('clock', 16)}${hora(a.fecha)}</span></div>` : ''}
 <button id="save" class="gbtn">${icon('bookmark', 20)}Guardar en mi almacén</button>
</article>`;
