const TXT = 'Texto de ejemplo: aquí irá el contenido final, que validará el biólogo del proyecto.';
export const CENTRO = { lat: 24.1426, lng: -110.3128 };   // La Paz, B.C.S.
export class Especie {
  constructor(o) { Object.assign(this, { descripcion: TXT, habitat: TXT, region: 'Baja California Sur', foto: null }, o); }
}
export class Avistamiento {
  constructor(o) { Object.assign(this, { fecha: Date.now(), lugar: 'La Paz, B.C.S.', origen: 'cámara', ...CENTRO }, o); }
}
