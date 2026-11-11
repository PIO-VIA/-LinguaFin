// MBOA — espace de noms partagé par tous les scripts (contenu, popup, studio, tests Node).
(() => {
  const g = globalThis;
  if (g.MBOA) return;
  g.MBOA = {
    version: '0.1.0',
    packs: {},      // métadonnées des langues
    phrases: [],    // mémoire de phrases validées / brouillons
    overrides: {},  // corrections faites dans le Studio : { lang: { id: { text, status } } }
    util: {},
  };

  const U = g.MBOA.util;

  U.stripDiacritics = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Approximation phonétique pour une voix de synthèse française/anglaise
  // quand aucun enregistrement natif n'existe encore.
  U.toSpeakable = (s) =>
    U.stripDiacritics(s)
      .replace(/ɓ/g, 'b').replace(/Ɓ/g, 'B')
      .replace(/ɗ/g, 'd').replace(/Ɗ/g, 'D')
      .replace(/ŋ/g, 'ng').replace(/Ŋ/g, 'Ng')
      .replace(/ƴ/g, 'y').replace(/Ƴ/g, 'Y')
      .replace(/[ɛƐ]/g, 'è').replace(/[ɔƆ]/g, 'o').replace(/[əƏ]/g, 'e');

  // Insertion de gabarits HTML SANS innerHTML : le texte est analysé dans un document
  // inerte (DOMParser : aucun script exécuté, aucune ressource chargée), puis ses nœuds
  // sont déplacés. Toutes les valeurs variables passent en amont par escapeHtml.
  U.setHTML = (el, html) => {
    const doc = new DOMParser().parseFromString('<!doctype html><body>' + html, 'text/html');
    el.replaceChildren(...doc.body.childNodes);
  };

  U.escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
})();
