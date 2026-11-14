// Voix : 1) enregistrement natif (Studio linguistique) si disponible,
//        2) sinon synthèse vocale du navigateur, hors ligne, avec approximation phonétique.
(() => {
  const M = globalThis.MBOA;
  let current = null;
  let queue = [];
  let onHighlight = () => {};

  const clean = (s) => String(s)
    .replace(/[⚠⛔❌✅🔊·•≈]/gu, ' ')
    .replace(/\bF\s?CFA\b|\bFCFA\b|\bXAF\b/g, ' francs CFA')
    .replace(/\s+/g, ' ').trim();

  async function recorded(lang, id) {
    if (!id || !globalThis.chrome?.storage?.local) return null;
    try {
      const key = `audio:${lang}:${id}`;
      const got = await chrome.storage.local.get(key);
      return got[key] || null;
    } catch { return null; }
  }

  function pickVoice(prefix) {
    const vs = speechSynthesis.getVoices();
    return vs.find((v) => v.lang === prefix) || vs.find((v) => v.lang.startsWith(prefix.slice(0, 2))) || null;
  }

  function speakOne({ text, lang, id }) {
    return new Promise(async (resolve) => {
      const url = await recorded(lang, id);
      if (url) {
        const a = new Audio(url);
        current = a;
        a.onended = a.onerror = () => resolve();
        a.play().catch(() => resolve());
        return;
      }
      if (!('speechSynthesis' in globalThis)) return resolve();
      const pack = M.packs[lang] || M.packs.fr;
      const say = lang === 'fr' || lang === 'pcm' ? clean(text) : M.util.toSpeakable(clean(text));
      const u = new SpeechSynthesisUtterance(say);
      u.lang = pack.voice;
      const v = pickVoice(pack.voice);
      if (v) u.voice = v;
      u.rate = 0.88;
      u.onend = u.onerror = () => resolve();
      current = u;
      speechSynthesis.speak(u);
    });
  }

  async function speak(text, lang, id) {
    stop();
    await speakOne({ text, lang, id });
  }

  // Lecture séquentielle (lecture de page, récapitulatif) avec surlignage.
  async function readAll(items, highlight) {
    stop();
    onHighlight = highlight || (() => {});
    queue = items.slice();
    while (queue.length) {
      const it = queue.shift();
      onHighlight(it.el || null);
      await speakOne(it);
    }
    onHighlight(null);
  }

  function stop() {
    queue = [];
    try { speechSynthesis.cancel(); } catch {}
    if (current && current.pause) current.pause();
    current = null;
    onHighlight(null);
  }

  M.voice = { speak, readAll, stop, clean };
})();
