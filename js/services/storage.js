// Almacén del usuario. Hoy localStorage; después se puede cambiar a IndexedDB sin tocar los controladores.
import { Avistamiento, CENTRO } from '../models/models.js';
const K = 'vuela.avistamientos';
// Datos de demostración: solo con ?demo en la URL, nunca para usuarios reales.
const semilla = [['calandria-dorso-negro-menor', .006, .004], ['cardenal-rojo', -.004, -.008], ['paloma-alas-blancas', .012, .015], ['carpintero-del-desierto', -.012, .002]]
  .map(([especieId, dy, dx]) => ({ especieId, lat: CENTRO.lat + dy, lng: CENTRO.lng + dx, lugar: 'Malecón, La Paz' }));
const leer = () => {
  try {
    if (!localStorage.getItem(K) && new URLSearchParams(location.search).has('demo')) localStorage.setItem(K, JSON.stringify(semilla));
    return JSON.parse(localStorage.getItem(K)) ?? [];
  } catch { return []; }
};

export function getAvistamientos() {
  return leer().map(o => new Avistamiento(o));
}
export function addAvistamiento(a) {
  // Sin GPS se coloca cerca del centro de La Paz con un pequeño desfase para que no se encimen.
  const j = () => (Math.random() - .5) * .02;
  const lista = leer();
  lista.unshift(new Avistamiento({ lat: CENTRO.lat + j(), lng: CENTRO.lng + j(), ...a, fecha: Date.now() }));
  localStorage.setItem(K, JSON.stringify(lista));
}
