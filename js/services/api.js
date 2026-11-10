// Hoy lee un JSON local. Si hay backend, solo se cambia este archivo.
import { Especie } from '../models/models.js';
let cache;
export async function getEspecies() {
  cache ??= (await (await fetch('data/especies.json')).json()).map(o => new Especie(o));
  return cache;
}
export const getEspecie = async id => (await getEspecies()).find(e => e.id === id);
