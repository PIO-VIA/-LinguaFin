// Détection locale de la langue SOURCE (français / anglais), sans réseau ni modèle.
// Idée reprise de LinguaFin (détecteur heuristique) : on compte les mots-outils propres
// à chaque langue. Sert à (1) ne pas annoter « sens général » un texte qui n'est ni en
// français ni en anglais (ex. une page déjà en Pidgin), (2) poser le bon attribut lang
// sur l'original affiché dans l'info-bulle, (3) estimer la langue de la page.
(() => {
  const M = globalThis.MBOA;
  const FR = new Set('le la les un une des du de et est sont votre vos vous nous au aux ce cette ces pour par sur dans avec pas ne plus être été avez avons à où qui que quoi dont il elle ils leur mon ma mes ton ta tes son sa ses frais montant solde compte envoyer veuillez merci'.split(' '));
  const EN = new Set('the an and is are your you we our of to for on in with not no be been have has this that these those it its my his her their which who what from by will can please fee fees amount balance account send thank'.split(' '));

  // Retourne { lang: 'fr' | 'en' | null, confidence: 0..1 }.
  function detect(text) {
    const words = String(text).toLowerCase().replace(/[’']/g, ' ').match(/\p{L}+/gu) || [];
    if (!words.length) return { lang: null, confidence: 0 };
    let fr = 0, en = 0;
    for (const w of words) { if (FR.has(w)) fr++; if (EN.has(w)) en++; }
    if (/[éèêàùçœ]/i.test(text)) fr += 1.5; // accents propres au français
    if (fr + en < 1) return { lang: null, confidence: 0 };
    const confidence = Math.min(1, (Math.abs(fr - en) + 0.5) / Math.max(2, words.length * 0.4));
    return { lang: fr === en ? null : fr > en ? 'fr' : 'en', confidence };
  }

  // Langue dominante de la page : vote sur les textes, sinon attribut <html lang>.
  function page(doc = globalThis.document) {
    const decl = (doc?.documentElement?.lang || '').slice(0, 2).toLowerCase();
    let fr = 0, en = 0;
    const tw = doc.createTreeWalker(doc.body || doc.documentElement, NodeFilter.SHOW_TEXT);
    let n, k = 0;
    while ((n = tw.nextNode()) && k++ < 400) {
      const d = detect(n.nodeValue);
      if (d.lang === 'fr') fr += d.confidence; else if (d.lang === 'en') en += d.confidence;
    }
    const voted = fr + en < 1 ? null : fr >= en ? 'fr' : 'en';
    return { lang: voted || (['fr', 'en'].includes(decl) ? decl : null), declared: decl || null };
  }

  M.detect = { detect, page };
})();
