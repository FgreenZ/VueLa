// Service Worker de VueLa. Sube VERSION cada vez que publiques cambios para renovar la caché.
const VERSION = 'vuela-v5', TILES = 'vuela-tiles', MAX_TILES = 400;
const SHELL = [
  './',
  'assets/logo.svg',
  'assets/icon-180.png',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/icon-maskable-512.png',
  'css/base.css',
  'css/screens.css',
  'data/especies.json',
  'index.html',
  'js/controllers/buscar.js',
  'js/controllers/camara.js',
  'js/controllers/ficha.js',
  'js/controllers/mapa.js',
  'js/main.js',
  'js/models/models.js',
  'js/router.js',
  'js/services/api.js',
  'js/services/camera.js',
  'js/services/detector/detector.js',
  'js/services/detector/mockDetector.js',
  'js/services/detector/onnxDetector.js',
  'js/services/geo.js',
  'js/services/storage.js',
  'js/views/buscar.js',
  'js/views/camara.js',
  'js/views/components.js',
  'js/views/ficha.js',
  'js/views/icons.js',
  'js/views/mapa.js',
  'manifest.webmanifest',
  'models/labels.json',
  'vendor/leaflet/leaflet.css',
  'vendor/leaflet/leaflet.js',
];
const PESADOS = ['/vendor/ort/', '/models/'];   // wasm y modelo: cache-first (no cambian seguido)

self.addEventListener('install', e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k !== TILES).map(k => caches.delete(k)))).then(() => self.clients.claim())));

async function recortar(cache) { const ks = await cache.keys(); await Promise.all(ks.slice(0, Math.max(0, ks.length - MAX_TILES)).map(k => cache.delete(k))); }
async function tile(req) {
  const c = await caches.open(TILES), hit = await c.match(req);
  const red = fetch(req).then(r => { if (r.ok || r.type === 'opaque') { c.put(req, r.clone()); recortar(c); } return r; }).catch(() => hit);
  return hit || red;
}
async function cacheFirst(req) {
  const c = await caches.open(VERSION), hit = await c.match(req); if (hit) return hit;
  const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r;
}
async function networkFirst(req) {
  const c = await caches.open(VERSION);
  try { const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }
  catch { return (await c.match(req)) || (await c.match('./index.html')) || Response.error(); }
}
async function swr(req) {   // fuentes de Google
  const c = await caches.open(VERSION), hit = await c.match(req);
  const red = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || red;
}
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const u = new URL(req.url);
  if (u.hostname === 'tile.openstreetmap.org') return e.respondWith(tile(req));
  if (u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com') return e.respondWith(swr(req));
  if (u.origin !== location.origin) return;
  e.respondWith(PESADOS.some(p => u.pathname.includes(p)) ? cacheFirst(req) : networkFirst(req));
});
