(() => {
  const M = globalThis.MBOA;
  if (globalThis.__mboaStarted) return;
  globalThis.__mboaStarted = true;

  const DEFAULTS = { lang: 'off', shield: true, guide: true, autoVoice: false, tips: true, missing: true, firstRun: true, lastLang: 'ewo', excluded: [], region: '' };
  const HOST = location.hostname;
  let page = { lang: null, declared: null };
  let lastDetect = 0;

  function browserLang() {
    for (const l of navigator.languages || [navigator.language || '']) {
      const c = String(l).toLowerCase();
      if (/^ewo\b/.test(c)) return 'ewo';
      if (/^dua\b/.test(c)) return 'dua';
      if (/^(ff|fub|fuv|ful)\b/.test(c)) return 'fub';
      if (/^(wes|pcm)\b/.test(c)) return 'pcm';
    }
    return null;
  }

  const excludedHere = () => (S.excluded || []).includes(HOST);
  const effective = () => (S.lang !== 'off' && !excludedHere() && page.lang ? S.lang : 'off');

  function detectPage(force) {
    const now = Date.now();
    if (!force && (page.lang || now - lastDetect < 1500)) return false;
    lastDetect = now;
    const before = page.lang;
    page = M.detect.page(document);
    M.engine.setPageLang(page.lang);
    M.view.setPageInfo({ lang: page.lang, excluded: excludedHere(), host: HOST });
    return page.lang !== before;
  }
  const hasChrome = !!globalThis.chrome?.storage;
  let S = { ...DEFAULTS };
  let pendingNew = [];
  let refreshTimer = 0;
  const typed = {};
  const alerted = new Set();

  const L = () => (S.lang === 'off' ? 'fr' : S.lang);
  const T = (k) => M.engine.ui(k, L());

  async function load() {
    if (!hasChrome) return;
    try {
      S = { ...DEFAULTS, ...(await chrome.storage.sync.get(DEFAULTS)) };
      const { overrides } = await chrome.storage.local.get('overrides');
      M.engine.setOverrides(overrides || {});
    } catch {}
  }

  function save(patch) {
    S = { ...S, ...patch };
    if (hasChrome) chrome.storage.sync.set(patch).catch(() => {});
  }

  function setLang(lang) {
    save({ lang, firstRun: false, ...(lang !== 'off' ? { lastLang: lang } : {}) });
    M.dom.setLang(effective());
    M.view.update(S);
    refresh();
  }
  function setSetting(k, v) {
    if (k === 'siteOff') {
      const ex = new Set(S.excluded || []);
      v ? ex.add(HOST) : ex.delete(HOST);
      save({ excluded: [...ex] });
      M.view.setPageInfo({ lang: page.lang, excluded: excludedHere(), host: HOST });
      M.dom.setLang(effective());
      M.view.update(S);
      return refresh();
    }
    save({ [k]: v });
    M.view.update(S);
    if (k === 'missing') M.dom.setHighlight(v);
    if (k === 'guide' && !v) M.view.setGuide(null);
    refresh();
  }

  function textOf(el) {
    let s = '';
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) s += M.dom.sourceOf(n);
    return s.replace(/\s+/g, ' ').trim();
  }

  const visible = (el) => {
    if (!el || !el.isConnected) return false;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none';
  };

  function readPage() {
    const items = [];
    const seen = new Set();
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode()) && items.length < 80) {
      const el = n.parentElement;
      if (!n.nodeValue.trim() || M.dom.skipped(el) || seen.has(el) || !visible(el)) continue;
      seen.add(el);
      for (const c of el.childNodes) {
        if (c.nodeType !== 3 || !c.nodeValue.trim()) continue;
        const r = M.dom.recordOf(c);
        items.push(r ? { text: r.res.out, lang: S.lang, id: r.res.id, el } : { text: c.nodeValue, lang: 'fr', el });
      }
    }
    M.voice.readAll(items, (el) => M.view.highlight(el));
  }

  function openStudio() {
    if (hasChrome) chrome.runtime.sendMessage({ type: 'open-studio' }).catch(() => {});
  }

  function findGuideTarget() {
    for (const cb of document.querySelectorAll('input[type=checkbox]')) {
      if (cb.checked || cb.disabled) continue;
      const label = cb.closest('label') || (cb.id && document.querySelector(`label[for="${CSS.escape(cb.id)}"]`));
      if (!label || !visible(label)) continue;
      const hit = M.engine.identify(textOf(label));
      if (hit?.entry.role === 'check') return { el: label, key: 'guideCheck' };
    }
    const btns = [...document.querySelectorAll('button, [role=button], input[type=submit]')]
      .filter((b) => !b.disabled && visible(b) && !M.dom.skipped(b));
    const hasConfirm = btns.some((b) => M.engine.identify(textOf(b) || b.value || '')?.entry.role === 'confirm');
    if (hasConfirm) {
      const secret = [...document.querySelectorAll('input[type=password], input[autocomplete=one-time-code], input[name*=pin i], input[id*=pin i], input[inputmode=numeric]')]
        .find((f) => !f.disabled && !f.readOnly && !f.value && visible(f) && !M.dom.skipped(f.parentElement));
      if (secret) return { el: secret, key: 'guideFill' };
    }
    for (const role of ['confirm', 'next', 'action']) {
      for (const b of btns) {
        const hit = M.engine.identify(textOf(b) || b.value || '');
        if (hit?.entry.role === role) return { el: b, key: 'guideNext' };
      }
    }
    return null;
  }

  function crossChecks(f) {
    const out = [];
    const norm = (x) => String(x).replace(/[\s  ]/g, '').toLowerCase();
    for (const k of ['amount', 'beneficiary', 'phone']) {
      const v = f[k];
      if (!v) continue;
      if (v.input) { typed[k] = v.value; continue; }
      if (typed[k] == null) continue;
      const same = k === 'amount' ? Math.abs(typed[k] - v.value) < 1 : norm(typed[k]) === norm(v.value);
      if (!same) out.push({ id: `typed-${k}`, ok: false, detail: `saisi : ${k === 'amount' ? M.money.fmt(typed[k]) : typed[k]} · affiché : ${v.raw}` });
    }
    return out;
  }

  function refresh() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(doRefresh, 120);
  }

  function doRefresh() {
    if (!document.body) return;
    if (!page.lang && detectPage(false) && effective() !== M.dom.getLang()) { M.dom.setLang(effective()); return refresh(); }
    M.view.renderStats(M.dom.recount());

    let facts = {}, checks = [];
    try {
      facts = M.money.extractFacts(document.body, M.dom.sourceOf);
      checks = [...M.money.checks(facts), ...crossChecks(facts)];
    } catch (e) { console.warn('[Mboa] vérification', e); }
    M.view.renderRecap(facts, checks);
    for (const c of checks) {
      if (c.ok || c.warn) continue;
      const id = `chk-${c.id}-${c.detail}`;
      if (alerted.has(id)) continue;
      alerted.add(id);
      const title = c.id === 'total' ? T('checksBad') : c.id === 'fee' ? T('feeBad') : T('mismatch');
      M.view.showAlert({ id, level: 'high', title, body: c.detail });
    }

    const fresh = pendingNew;
    pendingNew = [];
    for (const { src, res } of fresh) {
      if (!src || src.trim().length < 12) continue;
      if (S.shield) {
        const sc = M.shield.scoreText(src);
        if (sc.level !== 'none') {
          const id = 'scam-' + src.trim().slice(0, 80);
          if (!alerted.has(id)) {
            alerted.add(id);
            M.view.showAlert({ id, level: sc.level, title: T('scamTitle'), body: sc.reasons.map((r) => r.fr).join(' ') + ` — « ${src.trim().slice(0, 140)} »`, speakText: T('scamTitle') });
          }
          continue;
        }
      }
      if (S.autoVoice && res && res.out && (res.intent === 'security' || res.intent === 'error')) M.voice.speak(res.out, S.lang, res.id);
    }

    if (S.guide && effective() !== 'off') {
      const g = findGuideTarget();
      M.view.setGuide(g?.el || null, g?.key);
    } else M.view.setGuide(null);
  }

  function siteCheck() {
    if (!S.shield) return;
    const txt = (document.body?.innerText || '').slice(0, 20000);
    const financial = /(solde|transfert|fcfa|mobile money|momo|balance|transfer|code pin)/i.test(txt);
    const hasSecretField = !!document.querySelector('input[type=password], input[autocomplete=one-time-code], input[name*=pin i], input[id*=pin i]');
    for (const f of M.shield.checkSite(location, { financial, hasSecretField })) {
      M.view.showAlert({ id: 'site-' + f.id, level: 'high', title: T(f.id), body: f.id === 'phishing' ? `${location.hostname} ≠ site officiel (${f.detail})` : location.href });
    }
  }

  function onKey(e) {
    if (!e.altKey || !e.shiftKey) return;
    const k = e.key.toLowerCase();
    const act = { m: () => M.view.togglePanel(), l: readPage, o: () => setLang(S.lang === 'off' ? S.lastLang || 'ewo' : 'off'), s: () => M.voice.stop() }[k];
    if (act) { e.preventDefault(); act(); }
  }

  async function init() {
    await load();
    M.engine.build();
    if (S.firstRun && S.lang === 'off') { const b = browserLang(); if (b) save({ lang: b, lastLang: b }); }
    M.view.mount(S, { setLang, setSetting, readPage, openStudio, refresh });
    detectPage(true);
    let tries = 0;
    const retry = setInterval(() => {
      if (page.lang || ++tries > 20) return clearInterval(retry);
      if (detectPage(true) && effective() !== M.dom.getLang()) { M.dom.setLang(effective()); refresh(); }
    }, 1000);
    M.dom.setHighlight(S.missing !== false);
    M.dom.start(effective(), (st) => { pendingNew.push(...st.lastNew); refresh(); });
    document.addEventListener('keydown', onKey, true);
    siteCheck();
    if (S.firstRun && S.lang === 'off') M.view.openPanel();
    else if (S.firstRun) save({ firstRun: false });

    if (hasChrome) {
      chrome.storage.onChanged.addListener((ch, area) => {
        if (area === 'local' && ch.overrides) {
          M.engine.setOverrides(ch.overrides.newValue || {});
          M.dom.setLang('off'); M.dom.setLang(effective());
        }
        if (area !== 'sync') return;
        const patch = {};
        for (const [k, v] of Object.entries(ch)) patch[k] = v.newValue;
        const langChanged = 'lang' in patch && patch.lang !== M.dom.getLang();
        S = { ...S, ...patch };
        if (langChanged || 'excluded' in patch) M.dom.setLang(effective());
        if ('missing' in patch) M.dom.setHighlight(S.missing !== false);
        M.view.update(S);
        refresh();
      });
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg?.type === 'toggle-panel') M.view.togglePanel();
        if (msg?.type === 'read-page') readPage();
        if (msg?.type === 'toggle-original') setLang(S.lang === 'off' ? S.lastLang || 'ewo' : 'off');
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
