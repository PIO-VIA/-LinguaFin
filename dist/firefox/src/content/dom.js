// Couche DOM : traduit les nœuds texte EN PLACE, sans toucher à la structure de la page,
// aux champs de saisie, ni aux valeurs. Chaque modification est réversible (texte source
// conservé en mémoire) et re-vérifiée par le contrat d'intégrité juste avant écriture.
(() => {
  const M = globalThis.MBOA;

  const REC = new WeakMap();   // Text -> { src, outFull, res, lang }
  const ATTR = new WeakMap();  // Element -> { [attr]: { src, out } }
  const LANGATTR = new WeakMap(); // Element -> lang précédent
  const UNTR = new WeakMap();     // Text -> { src, res } : texte laissé en original, avec la raison
  const MISSING = new Set();      // nœuds texte contenant des mots manquants (pour le surlignage)
  let highlightOn = true;
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'CODE', 'PRE', 'KBD', 'SAMP', 'IFRAME', 'CANVAS', 'TEMPLATE', 'SVG', 'MATH']);
  const ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

  let lang = 'off';
  let observer = null;
  let applying = false;
  let queue = new Set();
  let timer = 0;
  let onChange = () => {};
  const stats = { translated: 0, gist: 0, values: 0, rejected: 0, untranslated: 0, errors: 0, missingTop: [], lastNew: [] };

  // Remonte aussi la frontière d'un Shadow DOM (élément racine -> hôte).
  const up = (e) => e.parentElement || (e.parentNode && e.parentNode.nodeType === 11 ? e.parentNode.host : null);

  // Shadow DOM OUVERTS de la page (composants web) : parcourus et observés comme le reste.
  // Les Shadow DOM fermés restent inaccessibles, par conception du navigateur.
  const OBSERVED_SHADOWS = new WeakSet();
  const OBS_OPTS = { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label', 'alt'] };
  function watchShadow(sr) {
    if (!observer || OBSERVED_SHADOWS.has(sr)) return;
    OBSERVED_SHADOWS.add(sr);
    observer.observe(sr, OBS_OPTS);
  }

  function skipped(el, memo) {
    for (let e = el; e && e.nodeType === 1; e = up(e)) {
      if (memo && memo.has(e)) return memo.get(e);
      const tag = e.tagName.toUpperCase();
      const s = SKIP_TAGS.has(tag) || e.isContentEditable || e.id === 'mboa-host' ||
        e.hasAttribute('data-mboa-skip') || e.getAttribute('translate') === 'no' || e.classList.contains('notranslate');
      if (s) { memo && memo.set(el, true); return true; }
    }
    memo && memo.set(el, false);
    return false;
  }

  const sourceOf = (node) => {
    const rec = REC.get(node);
    return rec && node.nodeValue === rec.outFull ? rec.src : node.nodeValue;
  };
  const recordOf = (node) => {
    const rec = REC.get(node);
    return rec && node.nodeValue === rec.outFull ? rec : null;
  };

  function setLangAttr(el, code) {
    if (!el || el.childNodes.length !== 1) return;
    if (!LANGATTR.has(el)) LANGATTR.set(el, el.getAttribute('lang'));
    el.setAttribute('lang', code);
  }
  function restoreLangAttr(el) {
    if (!el || !LANGATTR.has(el)) return;
    const prev = LANGATTR.get(el);
    prev == null ? el.removeAttribute('lang') : el.setAttribute('lang', prev);
    LANGATTR.delete(el);
  }

  // Phrase fragmentée par des éléments en ligne porteurs de valeurs :
  //   "Vous allez envoyer " <b>20 000 FCFA</b> " à " <b>Marie Ngono</b>
  // On traduit la phrase entière ; les éléments-valeurs ne bougent pas, seuls les
  // fragments de texte entre eux sont réécrits (si l'ordre des valeurs est conservé).
  const INLINE = new Set(['B', 'STRONG', 'SPAN', 'EM', 'I', 'A', 'MARK', 'SMALL', 'CODE', 'TIME', 'DATA']);
  const COMPOSITE = new WeakMap(); // Element parent -> { srcs: string[], lang }

  // Valeur = montant/numéro/référence… OU nom propre inconnu de la mémoire.
  const isValueLike = (t) => M.entities.isValueOnly(t) || (M.entities.looksLikeName(t) && !M.engine.identify(t));

  let passParents = new Set(); // parents déjà examinés pendant ce passage

  const compSrc = (t) => (REC.get(t)?.composite && t.nodeValue === REC.get(t).outFull ? REC.get(t).src : t.nodeValue);

  function tryComposite(parent) {
    const kids = [...parent.childNodes];
    if (kids.length < 2 || kids.length > 12) return false;
    const vals = [];
    const slots = [[]]; // nœuds texte avant / entre / après les valeurs
    for (const k of kids) {
      if (k.nodeType === 3) slots[slots.length - 1].push(k);
      else if (k.nodeType === 1 && INLINE.has(k.tagName) && k.children.length === 0 && isValueLike(k.textContent)) {
        vals.push(k);
        slots.push([]);
      } else if (k.nodeType !== 8) return false;
    }
    const texts = slots.flat();
    if (!vals.length || !texts.length) return false;
    const srcs = new Map(texts.map((t) => [t, compSrc(t)]));
    const real = slots.map((nodes) => nodes.map((t) => srcs.get(t)).join('')).reduce((acc, piece, i) => acc + (i ? vals[i - 1].textContent : '') + piece, '');
    if (!/\p{L}/u.test(slots.flat().map((t) => srcs.get(t)).join(''))) return true; // que des valeurs
    const res = lang === 'off' ? null : M.engine.translate(real, lang);
    const restore = () => {
      for (const t of texts) { if (REC.get(t)?.composite && t.nodeValue === REC.get(t).outFull) t.nodeValue = srcs.get(t); if (REC.get(t)?.composite) REC.delete(t); }
      COMPOSITE.delete(parent);
    };
    if (!res || (res.kind !== 'exact' && res.kind !== 'composed')) { restore(); return false; }
    // Découpe de la sortie autour des valeurs, dans l'ordre d'origine.
    let rest = res.out;
    const pieces = [];
    for (const v of vals) {
      const i = rest.indexOf(v.textContent);
      if (i < 0) { restore(); return false; }
      pieces.push(rest.slice(0, i));
      rest = rest.slice(i + v.textContent.length);
    }
    pieces.push(rest);
    const first = srcs.get(texts[0]) || '';
    const last = srcs.get(texts[texts.length - 1]) || '';
    pieces[0] = first.match(/^\s*/)[0] + pieces[0].trimStart();
    pieces[pieces.length - 1] = pieces[pieces.length - 1].trimEnd() + last.match(/\s*$/)[0];
    // Une valeur placée hors de portée d'un nœud texte (ex. phrase qui commence par une valeur) : abandon.
    for (let i = 0; i < slots.length; i++) if (!slots[i].length && pieces[i].trim()) { restore(); return false; }
    slots.forEach((nodes, i) => nodes.forEach((t, j) => {
      t.nodeValue = j === 0 ? pieces[i] : '';
      REC.set(t, { src: srcs.get(t), outFull: t.nodeValue, res, lang, composite: true });
    }));
    COMPOSITE.set(parent, { lang });
    stats.translated++;
    return true;
  }

  function processText(node, fresh) {
    const cur = node.nodeValue;
    if (!cur || (!/\p{L}/u.test(cur) && !REC.get(node)?.composite)) return;
    const parent = node.parentElement;
    if (parent && (COMPOSITE.has(parent) || parent.childElementCount > 0)) {
      if (passParents.has(parent)) { if (COMPOSITE.has(parent)) return; }
      else {
        passParents.add(parent);
        const c = COMPOSITE.get(parent);
        const intact = c && c.lang === lang && [...parent.childNodes].every((k) => k.nodeType !== 3 || (REC.get(k)?.composite && k.nodeValue === REC.get(k).outFull));
        if (intact) return;
        if (tryComposite(parent)) return;
      }
    }
    const rec = REC.get(node);
    const ours = rec && cur === rec.outFull;
    if (ours && rec.lang === lang) return;
    const src = ours ? rec.src : cur;

    const res = lang === 'off' ? null : M.engine.translate(src, lang);
    if (res && res.kind === 'untranslated') { UNTR.set(node, { src, res }); stats.untranslated++; } else UNTR.delete(node);
    if (res && res.missing && res.missing.length) MISSING.add(node); else MISSING.delete(node);
    if (!res || !res.out) {
      if (ours) { node.nodeValue = src; restoreLangAttr(node.parentElement); }
      REC.delete(node);
      if (res && res.kind === 'value') stats.values++;
      if (!ours && fresh) stats.lastNew.push({ src, res, node });
      return;
    }
    const lead = src.match(/^\s*/)[0];
    const trail = src.match(/\s*$/)[0];
    const outFull = lead + res.out + trail;
    // Dernier verrou : même contrat d'intégrité, sur le texte exact qui sera écrit.
    if (!M.entities.verify(res.tokens || [], outFull).ok) { stats.rejected++; return; }
    node.nodeValue = outFull;
    REC.set(node, { src, outFull, res, lang });
    setLangAttr(node.parentElement, M.packs[lang]?.bcp47 || lang);
    res.kind === 'gist' ? stats.gist++ : stats.translated++;
    if (!ours && fresh) stats.lastNew.push({ src, res, node });
  }

  function processAttrs(el) {
    if (skipped(el)) return;
    let store = ATTR.get(el);
    for (const a of ATTRS) {
      if (!el.hasAttribute(a)) continue;
      const cur = el.getAttribute(a);
      const prev = store && store[a];
      const src = prev && cur === prev.out ? prev.src : cur;
      const res = lang === 'off' ? null : M.engine.translate(src, lang);
      if (res && res.out && (res.kind === 'exact' || res.kind === 'composed')) {
        if (!store) { store = {}; ATTR.set(el, store); }
        store[a] = { src, out: res.out };
        if (cur !== res.out) el.setAttribute(a, res.out);
      } else if (prev && cur === prev.out) {
        el.setAttribute(a, prev.src);
        delete store[a];
      }
    }
  }

  const ATTR_SEL = ATTRS.map((a) => `[${a}]`).join(',');

  function walk(root, fresh) {
    if (!root) return;
    if (root.nodeType === 3) {
      if (!skipped(root.parentElement)) processText(root, fresh);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9 && root.nodeType !== 11) return;
    const memo = new Map();
    const shadows = [];
    const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        if (n.nodeType === 1) {
          if (skipped(n, memo)) return NodeFilter.FILTER_REJECT;
          if (n.shadowRoot) shadows.push(n.shadowRoot);
          return NodeFilter.FILTER_SKIP;
        }
        return skipped(n.parentElement || up(n), memo) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    if (root.nodeType === 1 && root.shadowRoot && !skipped(root, memo)) shadows.push(root.shadowRoot);
    let n;
    while ((n = tw.nextNode())) safe(processText, n, fresh);
    for (const sr of shadows) { watchShadow(sr); walk(sr, fresh); }
    const els = root.nodeType === 1 ? [root, ...root.querySelectorAll(ATTR_SEL)] : [...root.querySelectorAll(ATTR_SEL)];
    for (const el of els) if (ATTRS.some((a) => el.hasAttribute(a))) processAttrs(el);
  }

  // Un nœud qui pose problème ne doit jamais casser la page ni le reste de la traduction.
  function safe(fn, ...a) {
    try { fn(...a); } catch (e) { stats.errors = (stats.errors || 0) + 1; if (stats.errors < 5) console.warn('[Mboa]', e); }
  }

  // ——— Surlignage des mots pas encore traduits ———
  // API « CSS Custom Highlight » : on colore des plages de texte SANS modifier le DOM de la page.
  const HL = 'mboa-missing';
  let styled = false;
  function ensureStyle() {
    if (styled || !document.head) return;
    const st = document.createElement('style');
    st.id = 'mboa-highlight-style';
    st.setAttribute('data-mboa-skip', '');
    st.textContent = `::highlight(${HL}) { background-color: rgba(250, 204, 21, .45); text-decoration: underline dotted #b45309 2px; }`;
    document.head.appendChild(st);
    styled = true;
  }
  const reEsc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['’]");
  function paintMissing() {
    try {
      if (!globalThis.CSS?.highlights || typeof Highlight === 'undefined') return;
      const ranges = [];
      if (highlightOn && lang !== 'off') {
        for (const n of MISSING) {
          if (!n.isConnected) { MISSING.delete(n); continue; }
          const info = UNTR.get(n)?.res || recordOf(n)?.res;
          if (!info?.missing?.length) continue;
          for (const w of info.missing) {
            const re = new RegExp(`(?<![\\p{L}])${reEsc(w)}(?![\\p{L}])`, 'giu');
            for (const m of n.nodeValue.matchAll(re)) {
              const r = new Range(); r.setStart(n, m.index); r.setEnd(n, m.index + m[0].length); ranges.push(r);
            }
          }
        }
      }
      if (ranges.length) ensureStyle();
      CSS.highlights.set(HL, new Highlight(...ranges));
    } catch (e) { /* navigateur sans prise en charge : simple absence de surlignage */ }
  }
  function setHighlight(on) { highlightOn = !!on; paintMissing(); }
  const untranslatedOf = (node) => { const u = UNTR.get(node); return u && node.nodeValue === u.src ? u : null; };

  function run(roots, fresh) {
    applying = true;
    stats.lastNew = [];
    passParents = new Set();
    try {
      for (const r of roots) if (r.isConnected !== false) walk(r, fresh);
    } finally {
      observer && observer.takeRecords(); // on ignore nos propres mutations
      applying = false;
    }
    paintMissing();
    onChange(stats);
  }

  function flush() {
    timer = 0;
    const roots = [...queue];
    queue = new Set();
    run(roots, true);
  }

  function schedule(node) {
    queue.add(node);
    // Une valeur insérée dans un élément en ligne peut compléter une phrase fragmentée :
    // on réexamine alors la phrase entière (le parent de l'élément en ligne).
    const host = node.nodeType === 1 ? node : node.parentElement;
    if (host && INLINE.has(host.tagName) && host.parentElement) queue.add(host.parentElement);
    if (!timer) timer = setTimeout(flush, 40);
  }

  function start(initialLang, cb) {
    lang = initialLang;
    onChange = cb || onChange;
    observer = new MutationObserver((muts) => {
      if (applying) return;
      for (const m of muts) {
        if (m.type === 'characterData' || m.type === 'attributes') schedule(m.target);
        else m.addedNodes.forEach((n) => schedule(n));
      }
    });
    observer.observe(document.documentElement, OBS_OPTS);
    run([document.body || document.documentElement], true);
  }

  function setLang(l) {
    if (l === lang) return;
    lang = l;
    run([document.body || document.documentElement], false);
  }

  // Comptage frais pour le tableau d'intégrité.
  function recount() {
    stats.translated = stats.gist = stats.values = stats.rejected = stats.untranslated = 0;
    const words = new Map();
    const count = (res) => { for (const w of res?.missing || []) words.set(w, (words.get(w) || 0) + 1); };
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      if (skipped(n.parentElement)) continue;
      const r = recordOf(n);
      if (r) { r.res.kind === 'gist' ? stats.gist++ : stats.translated++; if (r.res.kind === 'gist') count(r.res); }
      else if (untranslatedOf(n)) { stats.untranslated++; count(UNTR.get(n).res); }
      else if (/\d/.test(n.nodeValue) && M.entities.isValueOnly(n.nodeValue)) stats.values++;
    }
    stats.missingTop = [...words.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
    return stats;
  }

  M.dom = { start, setLang, sourceOf, recordOf, untranslatedOf, recount, stats, getLang: () => lang, skipped, setHighlight };
})();
