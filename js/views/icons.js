// Iconos SVG de trazo (redibujados; sustituibles por los SVG exportados de Figma).
const P = {
  map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  pin: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0113 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  bookmark: '<path d="M7 4h10v17l-5-4-5 4z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  flash: '<path d="M13 3L5 13h6l-1 8 8-10h-6z"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  filter: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
  tune: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0012 0M12 17v4"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  locate: '<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="1.5"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="17" cy="18" r="2.5"/><path d="M8.2 10.8l6.6-3.6M8.2 13.2l6.6 3.6"/>',
  leaf: '<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14zM5 19l7-7"/>',
  distance: '<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>',
  mute: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9l4 6M21 9l-4 6"/>',
  trail: '<path d="M6 20c0-5 12-5 12-10S9 7 9 4"/>',
  verified: '<circle cx="12" cy="12" r="8.5"/><path d="M8 12.5l3 3 5-6"/>',
  ave: '<path d="M3 14c3-5 6-5 9 0 3-5 6-5 9 0"/>',
};
export const icon = (n, s = 20, w = 2) =>
  `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
