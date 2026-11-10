import { fichaView } from '../views/ficha.js';
import { getEspecie } from '../services/api.js';
import { getAvistamientos, addAvistamiento } from '../services/storage.js';

export default async function (root, id) {
  const e = await getEspecie(id);
  if (!e) { root.innerHTML = '<p class="pad">No se encontró la especie. <a href="#/buscar">Volver a buscar</a></p>'; return; }
  const a = getAvistamientos().find(x => x.especieId === id);
  root.innerHTML = fichaView(e, a);
  root.querySelector('#save').onclick = ev => {
    addAvistamiento({ especieId: id, origen: 'ficha' });
    ev.currentTarget.lastChild.textContent = 'Guardado en tu almacén';
  };
}
