// Router por hash: #/camara, #/mapa, #/buscar, #/especie/<id>
// Cada controlador recibe (root, id, vivo): vivo() es false si el usuario ya navegó a otra pantalla.
const routes = {}; let cleanup, token = 0;
const titulos = { camara: 'Cámara', mapa: 'Mapa', buscar: 'Buscar', especie: 'Ficha de especie' };
export const route = (name, controller) => (routes[name] = controller);

export async function render() {
  const mi = ++token, vivo = () => mi === token;
  const [, name = 'camara', id] = location.hash.slice(1).split('/');
  await cleanup?.(); cleanup = undefined;
  if (!vivo()) return;
  const c = routes[name] || routes.camara;
  let fn;
  try { fn = await c(document.getElementById('view'), id, vivo); }
  catch (err) { console.error(err); document.getElementById('view').innerHTML = '<p class="pad muted">Ocurrió un error al cargar esta pantalla.</p>'; }
  if (!vivo()) { await fn?.(); return; }            // el usuario ya se fue: limpiar lo que se abrió tarde
  cleanup = fn;
  document.getElementById('app').dataset.r = name;
  document.getElementById('view').scrollTop = 0;
  document.getElementById('title').textContent = titulos[name] || '';
  document.querySelectorAll('nav a').forEach(a =>
    a.classList.toggle('on', a.dataset.r === name || (name === 'especie' && a.dataset.r === 'buscar')));
}
addEventListener('hashchange', render);
