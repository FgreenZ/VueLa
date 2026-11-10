import { route, render } from './router.js';
import { icon } from './views/icons.js';
import { getEspecies } from './services/api.js';
import camara from './controllers/camara.js';
import mapa from './controllers/mapa.js';
import buscar from './controllers/buscar.js';
import ficha from './controllers/ficha.js';

document.getElementById('avatar').innerHTML = icon('person', 18);
document.getElementById('nav').innerHTML =
  `<a href="#/mapa" data-r="mapa">${icon('map', 24)}Mapa</a>
   <a href="#/camara" data-r="camara" class="mid"><i class="sp"></i>Cámara<b>${icon('camera', 26)}</b></a>
   <a href="#/buscar" data-r="buscar">${icon('search', 24)}Buscar</a>`;

route('camara', camara); route('mapa', mapa); route('buscar', buscar); route('especie', ficha);
await getEspecies();                                   // pantalla de inicio: "Cargando especies"
await render();
setTimeout(() => document.getElementById('splash').classList.add('out'), 900);

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(e => console.warn('SW:', e));
