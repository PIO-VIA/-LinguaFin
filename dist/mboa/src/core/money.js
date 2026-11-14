(() => {
  const M = globalThis.MBOA;

  function parseAmount(raw) {
    if (raw == null) return NaN;
    let s = String(raw).replace(/fcfa|f\s?cfa|xaf|cfa|\bf\b/gi, '').replace(/[\s  ]/g, '');
    const neg = /^[-−]/.test(s);
    s = s.replace(/^[+\-−]/, '');
    if (!/\d/.test(s)) return NaN;
    const lastSep = Math.max(s.lastIndexOf(','), s.lastIndexOf('.'));
    if (lastSep >= 0) {
      const decimals = s.length - lastSep - 1;
      if (decimals === 3) s = s.replace(/[.,]/g, '');
      else s = s.slice(0, lastSep).replace(/[.,]/g, '') + '.' + s.slice(lastSep + 1);
    }
    const n = Number(s);
    return neg ? -n : n;
  }

  const parsePercent = (raw) => parseAmount(String(raw).replace('%', '')) / 100;

  const DENOMS = [
    { v: 10000, kind: 'note', color: '#7c3aed' },
    { v: 5000, kind: 'note', color: '#0e7490' },
    { v: 2000, kind: 'note', color: '#b45309' },
    { v: 1000, kind: 'note', color: '#15803d' },
    { v: 500, kind: 'coin', color: '#a16207' },
    { v: 100, kind: 'coin', color: '#6b7280' },
    { v: 50, kind: 'coin', color: '#6b7280' },
    { v: 25, kind: 'coin', color: '#a16207' },
    { v: 10, kind: 'coin', color: '#a16207' },
    { v: 5, kind: 'coin', color: '#a16207' },
    { v: 1, kind: 'coin', color: '#a16207' },
  ];

  function breakdown(amount) {
    let rest = Math.round(Math.abs(amount));
    const out = [];
    for (const d of DENOMS) {
      const n = Math.floor(rest / d.v);
      if (n > 0) { out.push({ ...d, count: n }); rest -= n * d.v; }
    }
    return out;
  }

  const fmt = (n) => Math.round(n).toLocaleString('fr-FR').replace(/[  ]/g, ' ');

  function noteSvg(d) {
    const label = d.v >= 1000 ? `${d.v / 1000} 000` : String(d.v);
    if (d.kind === 'note') {
      return `<svg viewBox="0 0 72 36" width="64" height="32" aria-hidden="true">
        <rect x="1" y="1" width="70" height="34" rx="4" fill="${d.color}"/>
        <rect x="5" y="5" width="62" height="26" rx="3" fill="none" stroke="#fff" stroke-opacity=".5"/>
        <circle cx="16" cy="18" r="7" fill="#fff" fill-opacity=".25"/>
        <text x="44" y="23" font-family="system-ui,sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">${label}</text>
      </svg>`;
    }
    return `<svg viewBox="0 0 36 36" width="28" height="28" aria-hidden="true">
      <circle cx="18" cy="18" r="16" fill="${d.color}"/><circle cx="18" cy="18" r="12.5" fill="none" stroke="#fff" stroke-opacity=".55"/>
      <text x="18" y="22.5" font-family="system-ui,sans-serif" font-size="${label.length > 2 ? 9 : 12}" font-weight="700" fill="#fff" text-anchor="middle">${label}</text>
    </svg>`;
  }

  function moneyHtml(amount) {
    const items = breakdown(amount).map((d) => {
      const reps = Math.min(d.count, 3);
      const imgs = Array.from({ length: reps }, () => noteSvg(d)).join('');
      const more = d.count > 1 ? `<span class="more">×${d.count}</span>` : '';
      return `<span class="denom">${imgs}${more}</span>`;
    });
    return `<div class="money" aria-hidden="true">${items.join('')}</div>`;
  }

  const ROLES = ['amount', 'fee', 'total', 'balance', 'beneficiary', 'phone', 'reference'];

  function extractFacts(root, sourceOf) {
    const facts = {};
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const labels = [];
    let n;
    while ((n = walker.nextNode())) {
      const src = sourceOf(n);
      if (!src || !src.trim() || !isVisible(n.parentElement)) continue;
      const hit = M.engine.identify(src);
      if (!hit) continue;
      const { entry, tokens } = hit;
      if (entry.role === 'feeRule') {
        const pct = tokens.find((t) => t.type === 'percent');
        const amts = tokens.filter((t) => t.type === 'amount').map((t) => parseAmount(t.raw));
        if (pct && amts.length >= 2) facts.feeRule = { rate: parsePercent(pct.raw), min: amts[0], max: amts[1] };
      } else if (entry.id === 'op_safinum_desc') {
        if (!facts.feeRule) facts.feeRule = { rate: 0, min: 0, max: 0, free: true };
      } else if (ROLES.includes(entry.role)) {
        labels.push({ node: n, role: entry.role });
      }
    }
    for (const { node, role } of labels) {
      const v = valueNear(node, role, sourceOf);
      if (v && (!facts[role] || v.depth < facts[role].depth)) facts[role] = v;
    }
    return facts;
  }

  function isVisible(el) {
    if (!el) return false;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
  }

  function valueNear(labelNode, role, sourceOf) {
    let el = labelNode.parentElement;
    for (let depth = 0; el && depth < 4; depth++, el = el.parentElement) {
      if ((el.textContent || '').length > 260) break;
      const input = el.querySelector('input:not([type=checkbox]):not([type=radio]):not([type=hidden])');
      if (input && (role === 'amount' || role === 'beneficiary' || role === 'phone')) {
        const val = input.value;
        if (val) {
          const value = role === 'amount' ? parseAmount(val) : val;
          const raw = role === 'amount' && Number.isFinite(value) ? `${fmt(value)} FCFA` : val;
          return { raw, value, el: input, input: true, depth };
        }
      }
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      let t;
      while ((t = walker.nextNode())) {
        if (t === labelNode) continue;
        const raw = (sourceOf(t) || '').trim();
        if (!raw) continue;
        if (role === 'beneficiary' && M.entities.looksLikeName(raw) && !M.engine.identify(raw)) return { raw, value: raw, el: t.parentElement, depth };
        if (!M.entities.isValueOnly(raw)) continue;
        const { tokens } = M.entities.protect(raw);
        if (['amount', 'fee', 'total', 'balance'].includes(role)) {
          const a = tokens.find((x) => x.type === 'amount');
          if (a) return { raw, value: parseAmount(a.raw), el: t.parentElement, depth };
        } else if (role === 'phone') {
          const p = tokens.find((x) => x.type === 'phone');
          if (p) return { raw, value: p.raw, el: t.parentElement, depth };
        } else if (role === 'reference') {
          const p = tokens.find((x) => x.type === 'ref');
          if (p) return { raw, value: p.raw, el: t.parentElement, depth };
        } else if (role === 'beneficiary' && M.entities.looksLikeName(raw)) {
          return { raw, value: raw, el: t.parentElement, depth };
        }
      }
    }
    return null;
  }

  const expectedFee = (amount, rule) =>
    !rule || !Number.isFinite(amount) || amount <= 0 || rule.rate === 0
      ? 0
      : Math.min(rule.max, Math.max(rule.min, Math.round(amount * rule.rate)));

  function checks(f) {
    const out = [];
    const A = f.amount?.value, F = f.fee?.value, T = f.total?.value, B = f.balance?.value;
    if (Number.isFinite(A) && Number.isFinite(F) && Number.isFinite(T)) {
      out.push({ id: 'total', ok: Math.abs(A + F - T) < 1, detail: `${fmt(A)} + ${fmt(F)} = ${fmt(A + F)} · affiché : ${fmt(T)}` });
    }
    if (f.feeRule && Number.isFinite(A) && Number.isFinite(F) && A > 0) {
      const exp = expectedFee(A, f.feeRule);
      out.push({ id: 'fee', ok: Math.abs(exp - F) < 1, detail: `barème : ${fmt(exp)} · affiché : ${fmt(F)}`, expected: exp });
    }
    if (Number.isFinite(A) && Number.isFinite(B) && B > 0 && A > B / 2) {
      out.push({ id: 'big', ok: false, warn: true, detail: `${fmt(A)} > 50 % de ${fmt(B)}` });
    }
    return out;
  }

  M.money = { parseAmount, parsePercent, breakdown, noteSvg, moneyHtml, extractFacts, checks, expectedFee, fmt };
})();
