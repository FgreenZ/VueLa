import { icon } from './icons.js';
const clase = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
// Escapa texto antes de ponerlo en innerHTML (obligatorio cuando los datos vengan de un backend).
export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const PLURAL = { Nativa: 'Nativas', Endémica: 'Endémicas', Migratoria: 'Migratorias', Introducida: 'Introducidas' };
export const SINGULAR = Object.fromEntries(Object.entries(PLURAL).map(([s, p]) => [p, s]));
const DOT = { Nativas: '#1f7a4d', Endémicas: '#6a4fb3', Migratorias: '#0255ca', Introducidas: '#a05a00' };
export const badge = s => `<span class="badge ${clase(s)}">${esc(s)}</span>`;
// Solo se ofrecen los filtros que tienen al menos una especie.
export const filtrosEstatus = especies => Object.values(PLURAL).filter(p => especies.some(e => e.estatus === SINGULAR[p]));
// modo 'mapa': "Todos" con icono de filtro y puntos de color; modo 'buscar': "Mis avistamientos" con ojo
export const chips = (opts, activo, modo, n) => opts.map(o => {
  const lead = modo === 'mapa' ? (o === 'Todos' ? icon('filter', 14) : `<i class="dot" style="background:${DOT[o]}"></i>`)
    : o === 'Mis avistamientos' ? icon('eye', 16) : '';
  return `<button class="chip ${o === activo ? 'on' : ''}" data-f="${esc(o)}">${lead}${o === 'Todos' && modo === 'mapa' ? `Todos (${n})` : esc(o)}</button>`;
}).join('');
export const hora = f => {
  const d = new Date(f), h = d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', hour12: false });
  return d.toDateString() === new Date().toDateString() ? `Hoy, ${h}` : `${d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}, ${h}`;
};
export const tarjeta = (e, visto) => `<a class="esp" href="#/especie/${esc(e.id)}"><div class="ph">${visto ? `<span class="ck">${icon('check', 15, 2.5)}</span>` : ''}</div><div><b>${esc(e.nombre)}</b><span class="sci">${esc(e.cientifico)}</span></div>${badge(e.estatus)}</a>`;
