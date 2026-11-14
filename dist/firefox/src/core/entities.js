// Verrouillage des entités sensibles.
// Montants, numéros, références, dates et noms propres sont retirés du texte AVANT
// toute traduction, puis réinjectés à l'identique (octet pour octet) APRÈS.
// La traduction ne voit jamais un chiffre : elle ne peut donc pas en altérer un.
(() => {
  const M = globalThis.MBOA;

  const MONTHS =
    'janv|janvier|févr|fevr|février|fevrier|mars|avr|avril|mai|juin|juil|juillet|août|aout|sept|septembre|oct|octobre|nov|novembre|déc|dec|décembre|decembre|' +
    'jan|january|feb|february|mar|march|apr|april|may|jun|june|jul|july|aug|august|sep|september|october|november|december';

  // L'ordre compte : du plus spécifique au plus général.
  const PATTERNS = [
    ['url', /\bhttps?:\/\/[^\s]+/gi],
    ['email', /\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g],
    ['account', /\b[A-Z]{2}\s?\d{2,4}(?:[\s ]?\d{2,5}){2,}\b/g],
    ['phone', /(?:\+|\b00)\d{1,3}(?:[\s.  -]?\d){7,12}\b|\b6(?:[\s.  ]?\d){8}\b/g],
    ['ref', /\b(?=[A-Z0-9_-]*\d)(?=[A-Z0-9_-]*[A-Z])[A-Z0-9]{2,}(?:[-_][A-Z0-9]+)+\b/g],
    ['date', new RegExp(
      `\\b(?:\\d{1,2}\\s(?:${MONTHS})\\.?\\s\\d{4}|(?:${MONTHS})\\.?\\s\\d{1,2},?\\s\\d{4}|\\d{1,2}[/.-]\\d{1,2}[/.-]\\d{2,4}|\\d{1,2}h\\d{2}|\\d{1,2}:\\d{2})\\b`,
      'gi')],
    ['percent', /\d+(?:[.,]\d+)?\s?%/g],
    ['amount', /(?:[+\-−]\s?)?\d{1,3}(?:[\s  .,]\d{3})+(?:[.,]\d{1,2})?(?:\s?(?:FCFA|F\s?CFA|XAF|F)\b)?|(?:[+\-−]\s?)?\d+(?:[.,]\d+)?\s?(?:FCFA|F\s?CFA|XAF)\b/gi],
    ['number', /\d+(?:[.,]\d+)?/g],
  ];

  // Suite d'au moins deux mots à majuscule, hors début de texte : nom propre probable.
  const W = "[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'’]+(?:-[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ'’]+)?";
  const NAME_RE = new RegExp(`(?<=\\S\\s+|[,:]\\s*)${W}(?:\\s+${W}){1,3}`, 'g');
  const WHOLE_NAME_RE = new RegExp(`^${W}(?:\\s+${W}){0,3}$`);

  const PUA = 0xe100;
  const ph = (i) => String.fromCharCode(PUA + i);
  const PH_RE = /[-]/g;

  const CURRENCY_ONLY = /^(?:fcfa|f\s?cfa|xaf|cfa|f|%)$/i;

  function protect(text, { names = true } = {}) {
    const found = [];
    let masked = text;
    const swap = (type) => (raw) => {
      const i = found.length;
      found.push({ type, raw });
      return ph(i);
    };
    for (const [type, re] of PATTERNS) masked = masked.replace(re, swap(type));
    if (names) masked = masked.replace(NAME_RE, swap('name'));

    // Renumérotation dans l'ordre d'apparition (indépendant de l'ordre de détection).
    const tokens = [];
    masked = masked.replace(PH_RE, (c) => {
      tokens.push(found[c.charCodeAt(0) - PUA]);
      return ph(tokens.length - 1);
    });
    return { masked, tokens, key: keyOf(masked) };
  }

  function keyOf(masked) {
    return masked
      .replace(PH_RE, (c) => ` {${c.charCodeAt(0) - PUA}} `)
      .normalize('NFC')
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/[.,;:!?…«»"“”()[\]—–•·*]/g, ' ')
      .replace(/\s-\s/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Le texte n'est-il qu'une valeur (montant, numéro, nom, devise…) ? Si oui : on n'y touche jamais.
  function isValueOnly(text) {
    const t = text.trim();
    if (!t) return true;
    if (!/\p{L}/u.test(t)) return true;
    if (CURRENCY_ONLY.test(t)) return true;
    const { masked } = protect(t);
    const rest = masked.replace(PH_RE, ' ').replace(/[\s\p{P}\p{S}]+/gu, ' ').trim();
    if (!rest) return true;
    return rest.split(' ').every((w) => CURRENCY_ONLY.test(w));
  }

  const looksLikeName = (text) => WHOLE_NAME_RE.test(text.trim());

  function render(template, tokens) {
    let ok = true;
    const used = new Array(tokens.length).fill(0);
    const out = template.replace(/\{(\d+)\}/g, (_, n) => {
      const t = tokens[+n];
      if (!t) { ok = false; return ''; }
      used[+n]++;
      return t.raw;
    });
    if (used.some((u) => u === 0)) ok = false; // une valeur source a été oubliée
    return ok ? out : null;
  }

  // Contrat d'intégrité : chaque valeur source est présente à l'identique dans la sortie,
  // et la sortie ne contient AUCUN chiffre qui ne vienne pas de la source.
  function verify(tokens, output) {
    let rest = output;
    for (const t of tokens) {
      const i = rest.indexOf(t.raw);
      if (i < 0) return { ok: false, reason: `valeur perdue : ${t.raw}` };
      rest = rest.slice(0, i) + ' ' + rest.slice(i + t.raw.length);
    }
    if (/\d/.test(rest)) return { ok: false, reason: 'chiffre ajouté par la traduction' };
    return { ok: true };
  }

  M.entities = { protect, keyOf, isValueOnly, looksLikeName, render, verify, PH_RE };
})();
