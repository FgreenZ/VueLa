import { mapaView, pin, seleccion } from '../views/mapa.js';
import { chips, filtrosEstatus, SINGULAR } from '../views/components.js';
import { getEspecies } from '../services/api.js';
import { getAvistamientos } from '../services/storage.js';
import { CENTRO } from '../models/models.js';
import { ubicar } from '../services/geo.js';

export default async function (root, _id, vivo) {
  const especies = await getEspecies(), todos = getAvistamientos();
  if (!vivo()) return;
  root.innerHTML = mapaView();
  const $ = s => root.querySelector(s), opciones = ['Todos', ...filtrosEstatus(especies)];
  const espDe = a => especies.find(e => e.id === a.especieId);
  let filtro = 'Todos', sel = 0, yo;

  const mapa = L.map($('#lf'), { zoomControl: false, attributionControl: true }).setView([CENTRO.lat, CENTRO.lng], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(mapa);
  const capa = L.layerGroup().addTo(mapa);

  const pintar = () => {
    const lista = todos.filter(a => filtro === 'Todos' || espDe(a)?.estatus === SINGULAR[filtro]);
    sel = Math.max(0, Math.min(sel, lista.length - 1));
    $('#count').textContent = lista.length;
    capa.clearLayers();
    lista.forEach((a, i) => {
      const on = i === sel, s = on ? 40 : 32;
      L.marker([a.lat, a.lng], { icon: L.divIcon({ className: '', html: pin(on), iconSize: [s, s], iconAnchor: [s / 2, s / 2] }), zIndexOffset: on ? 1000 : 0 })
        .on('click', () => { sel = i; pintar(); }).addTo(capa);
    });
    $('#sel').innerHTML = lista.length && espDe(lista[sel]) ? seleccion(lista[sel], espDe(lista[sel])) : '<p class="empty">Sin avistamientos con este filtro.</p>';
    $('#chips').innerHTML = chips(opciones, filtro, 'mapa', todos.length);
    return lista;
  };
  root.onclick = ev => {
    const c = ev.target.closest('.chip');
    if (c) { filtro = c.dataset.f; sel = 0; const l = pintar(); if (l.length) mapa.fitBounds(L.latLngBounds(l.map(a => [a.lat, a.lng])), { padding: [40, 40], maxZoom: 15 }); }
    if (ev.target.closest('.loc')) ubicar().then(p => {
      if (!p || !vivo()) return;
      yo?.remove(); yo = L.circleMarker([p.lat, p.lng], { radius: 8, color: '#fff', weight: 3, fillColor: '#0d94da', fillOpacity: 1 }).addTo(mapa);
      mapa.setView([p.lat, p.lng], 15);
    });
  };
  const l = pintar();
  if (l.length) mapa.fitBounds(L.latLngBounds(l.map(a => [a.lat, a.lng])), { padding: [40, 40], maxZoom: 15 });
  setTimeout(() => mapa.invalidateSize(), 0);
  return () => mapa.remove();
}
