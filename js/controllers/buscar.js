import { buscarView } from '../views/buscar.js';
import { chips, tarjeta, filtrosEstatus, SINGULAR } from '../views/components.js';
import { getEspecies } from '../services/api.js';
import { getAvistamientos } from '../services/storage.js';

export default async function (root, _id, vivo) {
  const especies = await getEspecies();
  if (!vivo()) return;
  root.innerHTML = buscarView();
  const $ = s => root.querySelector(s), opciones = ['Todas', ...filtrosEstatus(especies), 'Mis avistamientos'];
  let filtro = 'Todas';
  const pintar = () => {
    const vistas = new Set(getAvistamientos().map(a => a.especieId));
    const q = $('#q').value.trim().toLowerCase();
    const lista = especies.filter(e =>
      (e.nombre + ' ' + e.cientifico).toLowerCase().includes(q) &&
      (filtro === 'Todas' || (filtro === 'Mis avistamientos' ? vistas.has(e.id) : e.estatus === SINGULAR[filtro])));
    $('#total').textContent = especies.length; $('#vistas').textContent = vistas.size;
    $('#grid').innerHTML = lista.map(e => tarjeta(e, vistas.has(e.id))).join('') || '<p class="muted">No hay especies con esa búsqueda.</p>';
    $('#chips').innerHTML = chips(opciones, filtro, 'buscar');
  };
  $('#q').oninput = pintar;
  root.onclick = ev => { const c = ev.target.closest('.chip'); if (c) { filtro = c.dataset.f; pintar(); } };
  pintar();
}
