import { badge, hora, esc } from './components.js';
import { icon } from './icons.js';
export const mapaView = () => `<div class="pad">
<div class="sec"><div><h2>Tus avistamientos</h2><div class="place">${icon('pin', 15)}La Paz, B.C.S.</div></div>
<span class="count"><i class="dot" style="background:var(--cyan)"></i><span id="count"></span>&nbsp;avistamientos</span></div>
<div class="map" id="map"><span class="reg">${icon('pin', 18)}La Paz, B.C.S. <small>· Bahía</small></span><button class="loc" aria-label="Centrar ubicación">${icon('locate', 20)}</button><div id="lf"></div><div id="sel"></div></div>
<div class="chips fil" id="chips"></div></div>`;
export const pin = on => `<span class="mk ${on ? 'on' : ''}">${icon('ave', on ? 22 : 18)}</span>`;
export const seleccion = (a, e) => `<div class="av"><div class="top"><div class="ph"></div><div><h4>${esc(e.nombre)}</h4>
<div class="r">${badge(e.estatus)}<span class="sci">${esc(e.cientifico)}</span></div>
<div class="meta">${icon('clock', 13)}${hora(a.fecha)}<s>•</s>${icon('pin', 13)}<b>${esc(a.lugar)}</b></div></div></div>
<div class="act"><span style="color:var(--mut)">${icon('camera', 14)}Identificada con la ${esc(a.origen)}</span><a href="#/especie/${esc(e.id)}">Ver ficha ${icon('chevron', 16)}</a></div></div>`;
