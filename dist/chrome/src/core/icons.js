// Icônes de l'interface Mboa : une seule famille, au trait (24 × 24, trait 1,75, bouts arrondis),
// en SVG inline, couleur héritée (currentColor). Aucun emoji, aucune police d'icônes, aucun réseau.
// Tracés dessinés dans le style des jeux libres Lucide / Heroicons (licences ISC / MIT).
(() => {
  const M = globalThis.MBOA;
  const P = {
    shield: '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/>',
    shieldCheck: '<path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    volume: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/>',
    headphones: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    play: '<path d="M8 5v14l11-7z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="1.5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
    languages: '<path d="M4 5h9M8.5 3v2M6.5 5c.6 3 2.4 5.4 5 7"/><path d="M10.5 5c-.6 3.2-3 6-6.5 8"/><path d="M13 21l4-9 4 9M14.4 18h5.2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    message: '<path d="M21 12a8 8 0 0 1-11.8 7L4 20.5l1.5-5A8 8 0 1 1 21 12z"/>',
    ban: '<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
    book: '<path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2zm0 0A2 2 0 0 0 6 21h14"/><path d="M8 7h8"/>',
    alert: '<path d="M10.3 4.2L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    octagon: '<path d="M7.9 2.5h8.2l5.4 5.4v8.2l-5.4 5.4H7.9l-5.4-5.4V7.9z"/><path d="M12 8v4M12 16h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/>',
    xCircle: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronUp: '<path d="M6 15l6-6 6 6"/>',
    receipt: '<path d="M5 3h14v18l-2.3-1.5L14.3 21 12 19.5 9.7 21l-2.4-1.5L5 21z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    file: '<path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4M9 13h6M9 17h4"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    upload: '<path d="M12 15V4M7 9l5-5 5 5"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5"/><path d="M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/>',
  };

  // icon('shield', { size: 20, label: 'Protégé' }) → chaîne SVG.
  // Sans label : décorative (aria-hidden). Avec label : image porteuse de sens.
  M.icon = (name, { size = 20, label = '', cls = '' } = {}) => {
    const a11y = label ? `role="img" aria-label="${M.util.escapeHtml(label)}"` : 'aria-hidden="true"';
    return `<svg class="i ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" focusable="false" ${a11y}>${P[name] || ''}</svg>`;
  };
  M.icons = Object.keys(P);
})();
