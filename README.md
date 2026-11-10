# VueLa (frontend PWA)
Servir con un servidor local (no doble clic): `python -m http.server 8000` → http://localhost:8000
La cámara y el GPS solo funcionan en localhost o HTTPS.

- `?demo` carga avistamientos de ejemplo · `?mock` fuerza el detector falso.
- Modelo YOLO: ver `models/README.md` (`models/vuela.onnx` + `models/labels.json`).
- Al publicar cambios, sube `VERSION` en `sw.js` para renovar la caché.
- `vendor/` contiene Leaflet y onnxruntime-web (para funcionar sin internet).
