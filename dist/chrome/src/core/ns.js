(() => {
  const g = globalThis;
  if (g.MBOA) return;
  g.MBOA = {
    version: '0.1.0',
    packs: {},
    phrases: [],
    overrides: {},
    util: {},
  };

  const U = g.MBOA.util;

  U.stripDiacritics = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

  U.toSpeakable = (s) =>
    U.stripDiacritics(s)
      .replace(/ɓ/g, 'b').replace(/Ɓ/g, 'B')
      .replace(/ɗ/g, 'd').replace(/Ɗ/g, 'D')
      .replace(/ŋ/g, 'ng').replace(/Ŋ/g, 'Ng')
      .replace(/ƴ/g, 'y').replace(/Ƴ/g, 'Y')
      .replace(/[ɛƐ]/g, 'è').replace(/[ɔƆ]/g, 'o').replace(/[əƏ]/g, 'e');

  U.setHTML = (el, html) => {
    const doc = new DOMParser().parseFromString('<!doctype html><body>' + html, 'text/html');
    el.replaceChildren(...doc.body.childNodes);
  };

  U.escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
})();
