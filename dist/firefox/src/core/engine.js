(() => {
  const M = globalThis.MBOA;
  const E = M.entities;

  let index = null;
  const cache = new Map();
  const CACHE_MAX = 3000;

  const PUA = 0xe100;
  const sourceKey = (src) =>
    E.keyOf(src.replace(/\{(\d+)\}/g, (_, n) => String.fromCharCode(PUA + +n)));

  function build() {
    index = new Map();
    for (const entry of M.phrases) {
      for (const [srcLang, list] of [['fr', entry.fr], ['en', entry.en]]) {
        for (const src of list) {
          const k = sourceKey(src);
          if (!index.has(k)) index.set(k, { entry, srcLang });
        }
      }
    }
    cache.clear();
    return index;
  }

  function textFor(entry, lang) {
    const o = M.overrides?.[lang]?.[entry.id];
    if (o && o.text) return { text: o.text, status: o.status || 'validated' };
    if (lang === 'fr') return { text: entry.fr[0], status: 'source' };
    const t = entry.t[lang];
    return t ? { text: t, status: M.packs[lang]?.status || 'draft' } : null;
  }

  const INTENT_RULES = [
    ['security', /\b(securite|security|alerte|alert|warning|attention|fraud|fraude|arnaque|scam|pin|otp|mot de passe|password|code secret|secret code|ne (partagez|communiquez|donnez) jamais|never share|suspect|suspicious|verifiez|verify)\b/],
    ['error', /\b(erreur|error|echec|echoue|failed|failure|impossible|indisponible|unavailable|insuffisant|insufficient|invalide|invalid|refuse|declined|rejected|rejete|expir\w*|bloque\w*|blocked)\b/],
    ['success', /\b(succes|reussi|reussie|success|successful|effectue|completed|confirme)\b/],
    ['fees', /\b(frais|fee|fees|commission|charges|tarif|tarification|cout)\b/],
    ['balance', /\b(solde|balance|compte|account)\b/],
    ['transfer', /\b(transfert|transfer|envoi|envoyer|send|beneficiaire|beneficiary|destinataire|recipient|paiement|payment|retrait|depot|withdraw|deposit)\b/],
    ['important', /\b(important|urgent|nouveau|nouvelle|new|information|avis|notice|clients?|customers?)\b/],
  ];

  function classify(text) {
    const t = M.util.stripDiacritics(text.toLowerCase());
    if (M.shield && M.shield.scoreText(text).level === 'high') return 'scam';
    for (const [intent, re] of INTENT_RULES) {
      if (!re.test(t)) continue;
      if (intent === 'success' && /\b(ne|n'\w*|pas|jamais|not|never|no)\b|n't\b/.test(t)) return 'error';
      return intent;
    }
    return null;
  }

  const TRAILING_NAME = /^(.*?(?:[,:]\s*|\s(?:à|a|de|pour|to|from|for)\s))([A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'’-]+)(\s*[.!]?)$/;

  function protectWithName(text) {
    const p = E.protect(text);
    if (index.has(p.key)) return p;
    const m = text.match(TRAILING_NAME);
    if (!m || index.has(E.protect(m[2]).key)) return p;
    const q = E.protect(m[1] + '\u0001' + m[3]);
    const i = q.masked.indexOf('\u0001');
    const before = (q.masked.slice(0, i).match(E.PH_RE) || []).length;
    const tokens = [...q.tokens.slice(0, before), { type: 'name', raw: m[2] }, ...q.tokens.slice(before)];
    let k = 0;
    const masked = q.masked.replace(/[-\u0001]/g, () => String.fromCharCode(0xe100 + k++));
    return { masked, tokens, key: E.keyOf(masked) };
  }

  function exact(text, lang) {
    const p = protectWithName(text);
    const hit = index.get(p.key);
    if (!hit) return null;
    if (lang === 'fr' && hit.srcLang === 'fr') return { same: true };
    const t = textFor(hit.entry, lang);
    if (!t) return null;
    const out = E.render(t.text, p.tokens);
    if (out == null) return null;
    const v = E.verify(p.tokens, out);
    if (!v.ok) return null;
    return { out, entry: hit.entry, status: t.status, tokens: p.tokens, srcLang: hit.srcLang };
  }

  const NEG = /\b(echou\w*|echec|refus\w*|rejet\w*|annul\w*|bloqu\w*|suspendu\w*|expir\w*|insuffisant\w*|invalide|incorrect\w*|errone\w*|indisponible|impossible|faible|ne|n'\w*|pas|jamais|aucun\w*|fail\w*|unsuccessful|declined|rejected|cancel\w*|blocked|locked|suspended|insufficient|invalid|wrong|unavailable|low|not|never|no)\b/;
  const negOf = (s) => NEG.test(M.util.stripDiacritics(s.toLowerCase()));
  const KIND = { subj: 'u', pred: 'p', mod: 'm', sent: 's' };
  const GRAMMAR = /^(um*pm*|um+|sm*)$/;
  const SLOT_OK = { amount: ['amount'], name: ['name'], phone: ['phone'], date: ['date'], ref: ['ref', 'account'], number: ['number'] };
  let bIndex = null;

  function buildBlocks() {
    bIndex = new Map();
    for (const b of M.blocks || []) {
      b.neg = negOf(b.fr[0]);
      for (const src of [...b.fr, ...b.en]) {
        const words = E.keyOf(src).split(' ');
        const first = words[0] === '{0}' ? '{}' : words[0];
        if (!bIndex.has(first)) bIndex.set(first, []);
        bIndex.get(first).push({ b, words });
      }
    }
    for (const list of bIndex.values()) list.sort((x, y) => y.words.length - x.words.length);
  }

  function parseClause(words, tokens) {
    const seq = [];
    let steps = 0;
    const isPh = (w) => /^\{\d+\}$/.test(w);
    function matchAt(i, cand) {
      let n = null;
      for (let j = 0; j < cand.words.length; j++) {
        const pw = cand.words[j], sw = words[i + j];
        if (sw == null) return false;
        if (pw === '{0}') {
          if (!isPh(sw)) return false;
          const t = tokens[+sw.slice(1, -1)];
          if (!t || !(SLOT_OK[cand.b.slot] || []).includes(t.type)) return false;
          n = +sw.slice(1, -1);
        } else if (pw !== sw) return false;
      }
      return { n };
    }
    function rec(i) {
      if (++steps > 4000) return false;
      if (i === words.length) return GRAMMAR.test(seq.map((m) => KIND[m.b.kind]).join(''));
      const cands = [...(bIndex.get(words[i]) || []), ...(isPh(words[i]) ? bIndex.get('{}') || [] : [])];
      for (const c of cands) {
        const m = matchAt(i, c);
        if (!m) continue;
        seq.push({ b: c.b, n: m.n });
        if (rec(i + c.words.length)) return true;
        seq.pop();
      }
      return false;
    }
    return rec(0) ? seq : null;
  }

  function compose(text, lang) {
    if (lang === 'fr' || lang === 'off') return null;
    if (!bIndex) buildBlocks();
    const p = protectWithName(text);
    const parts = p.masked.split(/\s*([,;:])\s*/);
    let tpl = '';
    let validated = true;
    const ids = [];
    for (let i = 0; i < parts.length; i += 2) {
      const sep = parts[i + 1] || '';
      let clause = parts[i].trim();
      const end = (clause.match(/[.!?…]+$/) || [''])[0];
      clause = clause.slice(0, clause.length - end.length).trim();
      if (!clause) return null;
      const words = E.keyOf(clause).split(' ');
      const seq = parseClause(words, p.tokens);
      if (!seq) return null;
      if (negOf(words.join(' ')) !== seq.some((m) => m.b.neg)) return null;
      const pieces = [];
      for (const m of seq) {
        const t = textFor(m.b, lang);
        if (!t) return null;
        if ((m.n != null) !== t.text.includes('{0}')) return null;
        if (t.status !== 'validated') validated = false;
        pieces.push(m.n != null ? t.text.replace('{0}', `{${m.n}}`) : t.text);
        ids.push(m.b.id);
      }
      let out = pieces.join(' ').replace(/\s+/g, ' ').trim();
      if (i === 0) out = out.charAt(0).toUpperCase() + out.slice(1);
      else if (!out.startsWith('{') && out !== out.toUpperCase()) out = out.charAt(0).toLowerCase() + out.slice(1);
      tpl += out + end + (sep ? sep + ' ' : '');
    }
    const outText = E.render(tpl.trim(), p.tokens);
    if (outText == null || !E.verify(p.tokens, outText).ok) return null;
    return { kind: 'composed', out: outText, tokens: p.tokens, status: validated ? 'validated' : 'composed', ids };
  }

  const SENTENCE_SPLIT = /(?<=[.!?…])\s+(?=\S)/;

  function translateUncached(text, lang) {
    const trimmed = text.trim();
    if (!trimmed || lang === 'off') return null;
    if (E.isValueOnly(trimmed)) return { kind: 'value' };

    const ex = exact(trimmed, lang);
    if (ex && ex.same) return null;
    if (ex) return { kind: 'exact', out: ex.out, id: ex.entry.id, intent: ex.entry.intent, role: ex.entry.role, status: ex.status, tokens: ex.tokens, srcLang: ex.srcLang };
    const srcLang = M.detect ? M.detect.detect(trimmed).lang : null;

    if (E.looksLikeName(trimmed)) return { kind: 'value' };

    const whole = compose(trimmed, lang);
    if (whole) return { kind: 'composed', out: '≈ ' + whole.out, id: null, blocks: whole.ids, intent: classify(trimmed) || 'info', status: whole.status, tokens: whole.tokens, srcLang };

    const segs = trimmed.split(SENTENCE_SPLIT);
    const parts = segs.map((s) => ({ s, r: segs.length > 1 ? exact(s, lang) || compose(s, lang) : null }));
    const known = parts.filter((p) => p.r && !p.r.same);
    const unknown = parts.filter((p) => !p.r);
    const { tokens } = E.protect(trimmed);

    if (segs.length > 1 && unknown.length === 0 && known.length) {
      const composed = known.some((p) => p.r.kind === 'composed');
      const out = (composed ? '≈ ' : '') + parts.map((p) => (p.r.same ? p.s : p.r.out)).join(' ');
      const first = known.find((p) => p.r.entry);
      if (E.verify(tokens, out).ok) {
        return composed
          ? { kind: 'composed', out, id: null, intent: classify(trimmed) || 'info', status: known.every((p) => p.r.status === 'validated') ? 'validated' : 'composed', tokens }
          : { kind: 'exact', out, id: first.r.entry.id, intent: first.r.entry.intent, status: first.r.status, tokens };
      }
    }

    const src = srcLang || pageLang;
    const untranslated = () => (src && !(lang === 'fr' && src === 'fr') ? { kind: 'untranslated', out: null, srcLang: src, ...diagnose(trimmed) } : null);
    const intent = classify(trimmed);
    if (!intent) return untranslated();
    if (M.detect && !src && intent !== 'scam') return null;
    const isMessage = trimmed.split(/\s+/).length >= 6 || /[.!?]$/.test(trimmed) || intent === 'scam';
    if (!isMessage) return untranslated();
    const key = intent;
    if (lang === 'fr' && key !== 'scam') return { kind: 'gist', out: null, intent: key, tokens };
    const label = M.intents[key]?.[lang] || M.intents.info[lang];
    const body = parts.map((p) => (p.r && !p.r.same ? p.r.out : p.s)).join(' ');
    const out = `${label} · ${body}`;
    if (!E.verify(tokens, out).ok) return untranslated();
    return { kind: 'gist', out, intent: key, status: 'gist', tokens, srcLang: src, ...diagnose(trimmed) };
  }

  let VOCAB = null;
  function vocab() {
    if (VOCAB) return VOCAB;
    VOCAB = new Set();
    const add = (s) => { for (const w of E.keyOf(s.replace(/\{\d+\}/g, ' ')).split(' ')) if (/\p{L}/u.test(w)) VOCAB.add(w); };
    for (const e of M.phrases) [...e.fr, ...e.en].forEach(add);
    for (const b of M.blocks || []) [...b.fr, ...b.en].forEach(add);
    return VOCAB;
  }

  function diagnose(text) {
    const p = protectWithName(text);
    const proper = new Set();
    for (const m of p.masked.matchAll(/[\p{L}][\p{L}'’-]*/gu)) {
      const w = m[0];
      const before = p.masked.slice(0, m.index).trimEnd();
      const initial = !before || /[.!?:…«"“(]$/.test(before);
      if ((/^\p{Lu}/u.test(w) && !initial) || /^\p{Lu}{2,}$/u.test(w)) proper.add(E.keyOf(w));
    }
    const V = vocab();
    const words = E.keyOf(p.masked).split(' ').filter((w) => /\p{L}/u.test(w) && !/^\{\d+\}$/.test(w));
    const missing = [...new Set(words.filter((w) => !V.has(w) && !proper.has(w)))];
    return { missing, reason: missing.length ? 'words' : 'phrase' };
  }

  let pageLang = null;
  const setPageLang = (l) => { if (l !== pageLang) { pageLang = l; cache.clear(); } };

  function translate(text, lang) {
    if (!index) build();
    const k = lang + '\u0001' + text;
    if (cache.has(k)) return cache.get(k);
    const r = translateUncached(text, lang);
    if (cache.size > CACHE_MAX) cache.clear();
    cache.set(k, r);
    return r;
  }

  function setOverrides(o) {
    M.overrides = o || {};
    cache.clear();
    bIndex = null;
    VOCAB = null;
  }

  const ui = (key, lang) => M.ui[key]?.[lang] || M.ui[key]?.fr || key;

  function identify(text) {
    if (!index) build();
    const p = E.protect(text.trim());
    const hit = index.get(p.key);
    return hit ? { entry: hit.entry, tokens: p.tokens } : null;
  }

  M.engine = { build, translate, classify, setOverrides, ui, sourceKey, textFor, identify, compose, negOf, diagnose, setPageLang, getPageLang: () => pageLang };
})();
