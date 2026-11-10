import { icon } from './icons.js';
export const buscarView = () => `<div class="pad">
<div class="ttl">
    <h2>Buscar especie</h2>
    <button class="tune" aria-label="Filtros avanzados">
        ${icon('tune', 20)}
    </button>
</div>
<label class="field">
    ${icon('search', 22)}
    <input id="q" placeholder="Nombre común o científico">
    ${icon('mic', 18)}
</label>
<div class="chips b" id="chips"></div>
<div class="sum">
    <span>
        <span id="total"></span>
            especies en La Paz
        </span>

        <span class="found">${icon('check', 14, 2.5)}
            <span id="vistas">
        </span> encontradas

    </span>
</div>

<div class="grid" id="grid"></div>

<a class="banner" href="#/camara">
    <div>
        <i>${icon('camera', 20)}</i>
        <span><b>¿No encuentras un ave?</b>
            Identifícala con la cámara.
        </span>
    </div>
    ${icon('arrow', 22)}
</a>
</div>`;
