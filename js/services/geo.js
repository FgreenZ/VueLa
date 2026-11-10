// Posición GPS opcional: devuelve {lat, lng} o null (sin permiso, sin señal o tiempo agotado).
export const ubicar = () => new Promise(res => {
  if (!navigator.geolocation) return res(null);
  navigator.geolocation.getCurrentPosition(
    p => res({ lat: p.coords.latitude, lng: p.coords.longitude }), () => res(null),
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 });
});
