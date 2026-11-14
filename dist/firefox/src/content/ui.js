(() => {
  const M = globalThis.MBOA;
  const esc = (s) => M.util.escapeHtml(s ?? '');
  const T = (k) => M.engine.ui(k, view.lang === 'off' ? 'fr' : view.lang);
  const ic = (name, o) => M.icon(name, o);

  const CSS = `
  :host { all: initial; }
  :host {
    --font: "IBM Plex Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", sans-serif;
    --ink: #0f172a; --muted: #475569; --line: #e2e8f0; --bg: #ffffff; --soft: #f1f5f9; --raise: #f8fafc;
    --brand: #0f766e; --brand-ink: #ffffff; --brand-soft: #ecfdf5;
    --ok: #15803d; --warn: #b45309; --warn-soft: #fffbeb; --bad: #b91c1c; --bad-soft: #fef2f2; --focus: #2563eb;
    --r-sm: 8px; --r-md: 12px; --r-lg: 16px; --shadow: 0 1px 2px rgba(15,23,42,.06), 0 12px 32px rgba(15,23,42,.16);
  }
  @media (prefers-color-scheme: dark) {
    :host { --ink: #e2e8f0; --muted: #94a3b8; --line: #334155; --bg: #0f172a; --soft: #1e293b; --raise: #111c33;
            --brand: #14b8a6; --brand-ink: #042f2e; --brand-soft: #0b2b29; --ok: #4ade80; --warn: #fbbf24; --warn-soft: #2a2110;
            --bad: #f87171; --bad-soft: #2b1214; --focus: #60a5fa; }
  }
  * { box-sizing: border-box; font-family: var(--font); }
  button { font: inherit; cursor: pointer; transition: background-color .15s, border-color .15s, color .15s; }
  :focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }
  .i { flex: none; display: block; }
  .fab { position: fixed; left: 16px; bottom: 16px; z-index: 2147483646; height: 52px; padding: 0 16px 0 8px; border-radius: 26px;
         border: 0; background: var(--brand); color: var(--brand-ink); display: flex; align-items: center; gap: 10px;
         box-shadow: var(--shadow); font-weight: 600; font-size: 15px; }
  .mark { width: 36px; height: 36px; border-radius: 50%; background: #fff; color: #0f172a; display: grid; place-items: center;
          font-weight: 700; font-size: 17px; letter-spacing: -.02em; }
  .panel { position: fixed; left: 16px; bottom: 80px; z-index: 2147483647; width: min(380px, calc(100vw - 32px)); max-height: calc(100vh - 100px);
           overflow: auto; background: var(--bg); color: var(--ink); border-radius: var(--r-lg); border: 1px solid var(--line);
           box-shadow: var(--shadow); padding: 16px; font-size: 15px; line-height: 1.5; }
  .panel[hidden], .recap[hidden], .tip[hidden], .ring[hidden], .hl[hidden] { display: none; }
  header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  header .mark { background: var(--brand); color: var(--brand-ink); }
  header h2 { margin: 0; font-size: 16px; font-weight: 600; } header p { margin: 0; color: var(--muted); font-size: 13px; }
  .x { margin-left: auto; border: 0; background: transparent; width: 44px; height: 44px; border-radius: var(--r-sm); color: var(--muted);
       display: grid; place-items: center; }
  .x:hover { background: var(--soft); color: var(--ink); }
  .pageinfo { display: flex; gap: 10px; align-items: flex-start; margin: 0 0 14px; padding: 10px 12px; border-radius: var(--r-md);
              background: var(--raise); border: 1px solid var(--line); font-size: 13px; color: var(--ink); }
  .pageinfo .i { color: var(--brand); margin-top: 1px; }
  .section { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin: 4px 0 8px; }
  .section h3 { margin: 0; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 14px;
         border-radius: var(--r-md); font-weight: 600; font-size: 14px; }
  .btn.secondary { border: 1px solid var(--line); background: var(--bg); color: var(--ink); }
  .btn.secondary:hover { background: var(--soft); }
  .btn.primary { flex: 1; border: 0; background: var(--brand); color: var(--brand-ink); }
  .btn.primary:hover { filter: brightness(1.05); }
  .btn.square { width: 44px; padding: 0; }
  .langs { display: grid; gap: 6px; }
  .regions { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 10px; }
  .regions .lbl { width: 100%; font-size: 12px; color: var(--muted); }
  .chip-r { min-height: 36px; padding: 0 12px; border-radius: 999px; border: 1px solid var(--line); background: var(--bg); color: var(--ink); font-size: 13px; }
  .chip-r:hover { background: var(--raise); }
  .chip-r[aria-pressed="true"] { border-color: var(--brand); background: var(--brand-soft); color: var(--brand); font-weight: 600; }
  .lrow { display: flex; min-width: 0; gap: 6px; align-items: stretch; border-radius: var(--r-md); }
  .lrow.speaking { box-shadow: 0 0 0 3px var(--focus); }
  .lang { flex: 1; min-width: 0; overflow: hidden; display: flex; align-items: center; gap: 12px; text-align: left; border: 1px solid var(--line); background: var(--bg);
          border-radius: var(--r-md); padding: 10px 12px; min-height: 56px; color: var(--ink); }
  .lang:hover { background: var(--raise); }
  .lang .radio { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--muted); flex: none; display: grid; place-items: center; }
  .lang[aria-checked="true"] { border-color: var(--c, var(--brand)); background: var(--brand-soft); }
  .lang[aria-checked="true"] .radio { border-color: var(--c, var(--brand)); }
  .lang[aria-checked="true"] .radio::after { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--c, var(--brand)); }
  .lang .txt { flex: 1; min-width: 0; } .lang b { display: block; font-size: 15px; font-weight: 600; }
  .lang small { display: block; color: var(--muted); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .badge { flex: none; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: var(--warn-soft); color: var(--warn);
           border: 1px solid currentColor; }
  .listen { width: 48px; border: 1px solid var(--line); background: var(--bg); border-radius: var(--r-md); color: var(--brand); display: grid; place-items: center; }
  .listen:hover { background: var(--soft); }
  .row { display: flex; gap: 8px; margin: 14px 0 8px; }
  .settings { margin-top: 4px; border-top: 1px solid var(--line); }
  .sw { display: flex; align-items: center; gap: 12px; padding: 8px 2px; min-height: 48px; border-bottom: 1px solid var(--line); }
  .sw .i { color: var(--muted); } .sw span { flex: 1; font-size: 14px; }
  .sw button { width: 46px; height: 28px; border-radius: 14px; border: 0; background: #94a3b8; position: relative; flex: none; }
  .sw button::after { content: ""; position: absolute; top: 3px; left: 3px; width: 22px; height: 22px; border-radius: 50%; background: #fff;
                      box-shadow: 0 1px 2px rgba(0,0,0,.2); transition: left .15s; }
  .sw button[aria-checked="true"] { background: var(--brand); } .sw button[aria-checked="true"]::after { left: 21px; }
  .integrity { margin-top: 12px; padding: 12px; border-radius: var(--r-md); background: var(--brand-soft); color: var(--ink); font-size: 13px; display: grid; gap: 6px; }
  .integrity .line { display: flex; gap: 8px; align-items: flex-start; } .integrity .line .i { color: var(--brand); margin-top: 1px; }
  .integrity .line.miss .i { color: var(--warn); } .integrity strong { font-weight: 700; }
  footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 12px; font-size: 12px; color: var(--muted); }
  .link { display: inline-flex; align-items: center; gap: 6px; border: 0; background: none; color: var(--focus); padding: 10px 0; font-size: 13px; font-weight: 600; }
  .recap { position: fixed; right: 16px; bottom: 16px; z-index: 2147483645; width: min(340px, calc(100vw - 32px)); background: var(--bg); color: var(--ink);
           border: 1px solid var(--line); border-top: 4px solid var(--brand); border-radius: var(--r-lg); box-shadow: var(--shadow); padding: 12px 14px; font-size: 14px; }
  .recap.bad { border-top-color: var(--bad); }
  .recap h3 { margin: 0 0 6px; font-size: 15px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
  .recap h3 > .i { color: var(--brand); } .recap.bad h3 > .i { color: var(--bad); }
  .recap h3 .sp { margin-left: auto; }
  .recap.min .body { display: none; }
  .kv { display: grid; grid-template-columns: auto 1fr; gap: 3px 12px; align-items: center; margin: 0; }
  .kv dt { color: var(--muted); font-size: 13px; } .kv dd { margin: 0; font-weight: 700; text-align: right; font-variant-numeric: tabular-nums; }
  .money { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; grid-column: span 2; margin: 2px 0 6px; }
  .denom { display: inline-flex; align-items: center; } .denom svg + svg { margin-left: -44px; }
  .denom svg[width="28"] + svg[width="28"] { margin-left: -18px; }
  .more { font-size: 12px; font-weight: 700; color: var(--muted); margin-left: 3px; }
  .checks { list-style: none; margin: 8px 0 0; padding: 8px 0 0; border-top: 1px solid var(--line); font-size: 13px; display: grid; gap: 4px; }
  .checks li { display: flex; gap: 8px; } .checks .ok .i { color: var(--ok); } .checks .ko { color: var(--bad); font-weight: 600; } .checks .wn { color: var(--warn); font-weight: 600; }
  .checks small { display: block; color: var(--muted); font-weight: 400; }
  .icon { border: 1px solid var(--line); background: var(--bg); border-radius: var(--r-sm); width: 36px; height: 36px; color: var(--ink); display: grid; place-items: center; }
  .icon:hover { background: var(--soft); }
  .alerts { position: fixed; top: 12px; left: 50%; transform: translateX(-50%); z-index: 2147483647; width: min(560px, calc(100vw - 24px)); display: grid; gap: 8px; }
  .alert { display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; border-radius: var(--r-md); background: var(--bg); color: var(--ink);
           border: 1px solid var(--line); border-left: 4px solid var(--warn); box-shadow: var(--shadow); font-size: 15px; }
  .alert > .i { color: var(--warn); margin-top: 2px; }
  .alert.high { border-left-color: var(--bad); background: var(--bad-soft); } .alert.high > .i { color: var(--bad); }
  .alert.info { border-left-color: var(--focus); } .alert.info > .i { color: var(--focus); }
  .alert b { display: block; font-weight: 600; } .alert p { margin: 2px 0 0; color: var(--muted); font-size: 13px; } .alert .grow { flex: 1; }
  .tip { position: fixed; z-index: 2147483647; max-width: min(380px, calc(100vw - 24px)); background: #0f172a; color: #f8fafc; padding: 10px 12px;
         border-radius: var(--r-md); font-size: 13px; box-shadow: var(--shadow); display: flex; gap: 10px; align-items: flex-start; }
  .tip .lbl { color: #cbd5e1; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 2px; }
  .tip .chip { display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: #78350f; }
  .tip .chip.ok { background: #166534; } .tip .chip.gist { background: #1e3a8a; } .tip .chip.miss { background: #78350f; }
  .tip mark { background: #facc15; color: #111827; border-radius: 4px; padding: 0 4px; }
  .tip button { border: 0; border-radius: var(--r-sm); background: #f8fafc; color: #0f172a; width: 36px; height: 36px; display: grid; place-items: center; }
  .ring, .hl { position: fixed; z-index: 2147483644; pointer-events: none; border-radius: var(--r-md); }
  .ring { border: 3px solid #d97706; box-shadow: 0 0 0 6px rgba(217,119,6,.2); animation: pulse 1.6s ease-in-out infinite; }
  .ring .caption { position: absolute; left: 0; bottom: calc(100% + 8px); white-space: nowrap; background: #d97706; color: #fff; font-weight: 600;
                   font-size: 14px; padding: 6px 10px; border-radius: var(--r-sm); display: inline-flex; gap: 6px; align-items: center; }
  .ring.below .caption { bottom: auto; top: calc(100% + 8px); }
  .hl { border: 3px solid var(--focus); background: rgba(37,99,235,.08); }
  @keyframes pulse { 50% { box-shadow: 0 0 0 12px rgba(217,119,6,.04); } }
  @media (prefers-reduced-motion: reduce) { .ring { animation: none; } .sw button::after, button { transition: none; } }
  @media (max-width: 640px) { .recap { left: 16px; right: 16px; width: auto; bottom: 80px; } }
  `;

  const view = { lang: 'off', settings: {}, handlers: {}, root: null, els: {}, guideEl: null, hlEl: null, raf: 0, recapMin: false, tipTimer: 0, page: {} };

  function mount(settings, handlers) {
    view.settings = settings;
    view.handlers = handlers;
    view.lang = settings.lang;
    const host = document.createElement('div');
    host.id = 'mboa-host';
    host.setAttribute('data-mboa-skip', '');
    host.setAttribute('translate', 'no');
    const root = host.attachShadow({ mode: 'open' });
    M.util.setHTML(root, `<style>${CSS}</style>
      <button class="fab" aria-expanded="false" aria-controls="mboa-panel"><span class="mark" aria-hidden="true">M</span><span class="code"></span></button>
      <section class="panel" id="mboa-panel" role="dialog" aria-labelledby="mboa-title" hidden></section>
      <aside class="recap" hidden></aside>
      <div class="alerts" aria-live="assertive"></div>
      <div class="tip" role="tooltip" hidden></div>
      <div class="ring" hidden><div class="caption">${ic('arrowRight', { size: 16 })}<span></span></div></div>
      <div class="hl" hidden></div>`);
    document.documentElement.appendChild(host);
    view.root = root;
    const $ = (s) => root.querySelector(s);
    view.els = { fab: $('.fab'), panel: $('.panel'), recap: $('.recap'), alerts: $('.alerts'), tip: $('.tip'), ring: $('.ring'), hl: $('.hl') };
    view.els.fab.addEventListener('click', togglePanel);
    root.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(true); });
    view.els.tip.addEventListener('mouseenter', () => clearTimeout(view.tipTimer));
    view.els.tip.addEventListener('mouseleave', hideTipSoon);
    document.addEventListener('mouseover', onHover, { capture: true, passive: true });
    document.addEventListener('focusin', onHover, { capture: true, passive: true });
    document.addEventListener('click', onAltClick, true);
    renderFab();
    renderPanel();
    return host;
  }

  function renderFab() {
    const p = M.packs[view.lang];
    view.els.fab.querySelector('.code').textContent = view.lang === 'off' ? 'Original' : (p?.name || view.lang);
    view.els.fab.setAttribute('aria-label', `Mboa — ${T('language')} : ${p ? p.name : 'original'}`);
    view.els.fab.style.background = p?.color || '#0f766e';
  }

  const LANGS = ['ewo', 'dua', 'fub', 'pcm', 'fr'];
  const visibleLangs = () => {
    const r = view.settings.region;
    if (!r) return LANGS;
    return LANGS.filter((c) => c === view.lang || M.packs[c].national || (M.packs[c].regions || []).includes(r));
  };

  function renderPanel() {
    const s = view.settings;
    const badge = (code) => M.packs[code].status === 'draft' ? `<span class="badge">${esc(T('badgeDraft'))}</span>`
      : M.packs[code].status === 'review' ? `<span class="badge">${esc(T('badgeReview'))}</span>` : '';
    const row = (c) => `<div class="lrow" data-row="${c}">
        <button class="lang" role="radio" style="--c:${M.packs[c].color}" data-lang="${c}" aria-checked="${view.lang === c}">
          <span class="radio" aria-hidden="true"></span>
          <span class="txt" lang="${M.packs[c].bcp47}"><b>${esc(M.packs[c].native)}</b><small>${esc(M.packs[c].sample)} · ${esc(M.packs[c].region)}</small></span>${badge(c)}</button>
        <button class="listen" data-listen="${c}" aria-label="${esc(T('listen'))} : ${esc(M.packs[c].native)}">${ic('volume')}</button></div>`;
    M.util.setHTML(view.els.panel, `
      <header><span class="mark" aria-hidden="true">M</span><div><h2 id="mboa-title">Mboa</h2><p>${esc(T('title').replace(/^Mboa\s*—\s*/, ''))}</p></div>
        <button class="x" aria-label="${esc(T('close'))}">${ic('x')}</button></header>
      ${pageLine()}
      <div class="section"><h3 id="mboa-lang-h">${esc(T('language'))}</h3>
        <button class="btn secondary" data-act="hear">${ic('headphones', { size: 18 })}${esc(T('listenLangs'))}</button></div>
      <div class="regions" role="group" aria-labelledby="mboa-region-h"><span class="lbl" id="mboa-region-h">${esc(T('region'))}</span>
        ${['', ...M.regions].map((r) => `<button class="chip-r" data-region="${esc(r)}" aria-pressed="${(s.region || '') === r}">${esc(r || T('allRegions'))}</button>`).join('')}</div>
      <div class="langs" role="radiogroup" aria-labelledby="mboa-lang-h">
        ${visibleLangs().map(row).join('')}
        <div class="lrow"><button class="lang" role="radio" data-lang="off" aria-checked="${view.lang === 'off'}"><span class="radio" aria-hidden="true"></span>
          <span class="txt"><b>${esc(T('off'))}</b></span></button></div>
      </div>
      <div class="row">
        <button class="btn primary" data-act="read">${ic('volume', { size: 18 })}${esc(T('readPage'))}</button>
        <button class="btn secondary square" data-act="stop" aria-label="${esc(T('stop'))}">${ic('stop', { size: 18 })}</button>
      </div>
      <div class="settings">
        ${sw('shield', 'shieldCheck', T('shield'), s.shield)}
        ${sw('guide', 'arrowRight', T('guide'), s.guide)}
        ${sw('autoVoice', 'volume', T('autoVoiceLabel'), s.autoVoice)}
        ${sw('tips', 'message', T('showOriginal'), s.tips)}
        ${sw('missing', 'search', T('missingSwitch'), s.missing !== false)}
        ${view.page.host ? sw('siteOff', 'ban', `${T('siteOff')} ${view.page.host}`, view.page.excluded) : ''}
      </div>
      <div class="integrity" aria-live="polite"></div>
      <footer><button class="link" data-act="studio">${ic('book', { size: 16 })}${esc(T('studio'))}</button><span>v${M.version} · ${esc(T('offline'))}</span></footer>`);
    const P = view.els.panel;
    P.querySelector('.x').onclick = () => closePanel(true);
    P.querySelectorAll('.lang').forEach((b) => (b.onclick = () => view.handlers.setLang(b.dataset.lang)));
    P.querySelectorAll('[data-listen]').forEach((b) => (b.onclick = () => hearOne(b.dataset.listen)));
    P.querySelector('[data-act=hear]').onclick = hearAll;
    P.querySelectorAll('[data-region]').forEach((b) => (b.onclick = () => view.handlers.setSetting('region', b.dataset.region)));
    P.querySelector('[data-act=read]').onclick = () => view.handlers.readPage();
    P.querySelector('[data-act=stop]').onclick = () => M.voice.stop();
    P.querySelector('[data-act=studio]').onclick = () => view.handlers.openStudio();
    P.querySelectorAll('.sw button').forEach((b) => (b.onclick = () => view.handlers.setSetting(b.dataset.k, b.getAttribute('aria-checked') !== 'true')));
    renderStats(M.dom?.stats || {});
  }

  const greeting = (c) => ({ text: `${M.packs[c].sample}. ${M.packs[c].native}.`, lang: c, id: 'hello' });
  function markSpeaking(c) {
    view.els.panel.querySelectorAll('.lrow').forEach((r) => r.classList.toggle('speaking', !!c && r.dataset.row === c));
  }
  async function hearOne(c) {
    markSpeaking(c);
    await M.voice.speak(greeting(c).text, c, 'hello');
    markSpeaking(null);
  }
  function hearAll() {
    M.voice.readAll(visibleLangs().map((c) => ({ ...greeting(c), el: c })), (c) => markSpeaking(c));
  }

  function pageLine() {
    const p = view.page;
    if (!p.host) return '';
    const name = { fr: 'français', en: 'anglais' }[p.lang];
    const target = M.packs[view.lang]?.name;
    const txt = p.excluded ? T('siteExcluded')
      : !p.lang ? T('pageOther')
      : view.lang === 'off' ? `${T('pageDetected')} : ${name}. ${T('chooseOnce')}`
      : `${T('pageDetected')} : ${name} → ${target} (${T('automatic')})`;
    return `<p class="pageinfo" role="status">${ic('globe', { size: 18 })}<span>${esc(txt)}</span></p>`;
  }
  function setPageInfo(info) { view.page = { ...view.page, ...info }; if (view.els.panel) renderPanel(); }

  const sw = (k, icon, label, on) => `<div class="sw">${ic(icon, { size: 18 })}<span id="sw-${k}">${esc(label)}</span><button role="switch" data-k="${k}" aria-checked="${!!on}" aria-labelledby="sw-${k}"></button></div>`;

  function togglePanel() { view.els.panel.hidden ? openPanel() : closePanel(true); }
  function openPanel() {
    view.els.panel.hidden = false;
    view.els.fab.setAttribute('aria-expanded', 'true');
    view.els.recap.hidden = true;
    (view.els.panel.querySelector('.lang[aria-checked="true"]') || view.els.panel.querySelector('.lang')).focus();
  }
  function closePanel(refocus) {
    if (view.els.panel.hidden) return;
    view.els.panel.hidden = true;
    view.els.fab.setAttribute('aria-expanded', 'false');
    view.handlers.refresh && view.handlers.refresh();
    if (refocus) view.els.fab.focus();
  }

  function update(settings) {
    view.settings = settings;
    view.lang = settings.lang;
    renderFab();
    const ds = view.root.activeElement?.dataset || {};
    const focused = ds.lang || ds.k || (ds.region !== undefined ? `region:${ds.region}` : '');
    renderPanel();
    if (view.els.panel.hidden || !focused) return;
    const P = view.els.panel;
    (focused.startsWith('region:') ? [...P.querySelectorAll('[data-region]')].find((b) => b.dataset.region === focused.slice(7))
      : P.querySelector(`[data-lang="${focused}"],[data-k="${focused}"]`))?.focus();
  }

  function renderStats(st) {
    const box = view.els.panel?.querySelector('.integrity');
    if (!box) return;
    const line = (icon, html, cls = '') => `<div class="line ${cls}">${ic(icon, { size: 16 })}<span>${html}</span></div>`;
    const miss = (st.missingTop || []).length
      ? line('file', `<strong>${st.untranslated || 0}</strong> ${esc(T('untranslatedCount'))} · ${esc(T('missingWords'))} : ${st.missingTop.map((w) => `« ${esc(w)} »`).join(', ')}`, 'miss') : '';
    M.util.setHTML(box, line('lock', `<strong>${st.values || 0}</strong> ${esc(T('integrity'))} · <strong>0</strong> ${esc(T('altered'))}`)
      + line('checkCircle', `<strong>${st.translated || 0}</strong> ${esc(T('statTranslated'))} · <strong>${st.gist || 0}</strong> ${esc(T('statGist'))}${st.rejected ? ` · <strong>${st.rejected}</strong> ${esc(T('statRejected'))}` : ''}`)
      + miss);
  }

  function translatedNodesIn(el) {
    if (!el || el.nodeType !== 1 || el.id === 'mboa-host') return [];
    const out = [];
    for (const n of el.childNodes) if (n.nodeType === 3) { const r = M.dom.recordOf(n); if (r) out.push(r); }
    return out;
  }

  function untranslatedIn(el) {
    if (!el || el.nodeType !== 1 || el.id === 'mboa-host') return null;
    for (const n of el.childNodes) if (n.nodeType === 3) { const u = M.dom.untranslatedOf(n); if (u) return u; }
    return null;
  }

  const whyHtml = (res) => res.reason === 'words'
    ? `${esc(T('missingWords'))} : ${res.missing.map((w) => `<mark>${esc(w)}</mark>`).join(' ')}`
    : esc(T('unknownPhrase'));

  function placeTip(tip, target) {
    tip.hidden = false;
    const rect = target.getBoundingClientRect();
    const tr = tip.getBoundingClientRect();
    let top = rect.bottom + 8;
    if (top + tr.height > innerHeight - 8) top = Math.max(8, rect.top - tr.height - 8);
    tip.style.top = `${top}px`;
    tip.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - tr.width - 8))}px`;
  }

  function onHover(e) {
    if (!view.settings.tips || view.lang === 'off') return;
    const recs = translatedNodesIn(e.target);
    const tip = view.els.tip;
    if (!recs.length) {
      const u = untranslatedIn(e.target);
      if (!u) return hideTipSoon();
      clearTimeout(view.tipTimer);
      M.util.setHTML(tip, `<div style="flex:1"><div class="lbl">${esc(T('untranslated'))} · ${esc(M.packs[view.lang]?.name || '')}</div>
        <div>${whyHtml(u.res)}</div><span class="chip miss">${esc(T('keptOriginal'))}</span></div>`);
      return placeTip(tip, e.target);
    }
    clearTimeout(view.tipTimer);
    const r = recs[0];
    const chip = r.res.kind === 'gist' ? `<span class="chip gist">${esc(T('approx'))}</span>`
      : r.res.kind === 'composed' ? `<span class="chip gist">${esc(T('composed'))}</span>`
      : r.res.status === 'validated' || r.res.status === 'source' ? `<span class="chip ok">${ic('check', { size: 12 })}${esc(T('validated'))}</span>`
      : `<span class="chip">${esc(T('draft'))}</span>`;
    const why = r.res.kind === 'gist' && r.res.reason ? `<div style="margin-top:6px">${whyHtml(r.res)}</div>` : '';
    M.util.setHTML(tip, `<div style="flex:1"><div class="lbl">${esc(T('original'))}</div><div lang="${esc(r.res.srcLang || 'fr')}">${esc(recs.map((x) => x.src.trim()).join(' '))}</div>${chip}${why}</div>
      <button aria-label="${esc(T('listen'))}">${ic('volume', { size: 18 })}</button>`);
    tip.querySelector('button').onclick = () => M.voice.speak(r.res.out, view.lang, r.res.id);
    placeTip(tip, e.target);
  }
  function hideTipSoon() {
    clearTimeout(view.tipTimer);
    view.tipTimer = setTimeout(() => (view.els.tip.hidden = true), 350);
  }

  function onAltClick(e) {
    if (!e.altKey || view.lang === 'off') return;
    const recs = translatedNodesIn(e.target);
    if (!recs.length) return;
    e.preventDefault();
    e.stopPropagation();
    M.voice.speak(recs.map((r) => r.res.out).join(' '), view.lang, recs[0].res.id);
  }

  function renderRecap(facts, checks) {
    const R = view.els.recap;
    const show = view.lang !== 'off' || checks.some((c) => !c.ok);
    if (!facts.amount || !(facts.fee || facts.total) || !show || !view.els.panel.hidden) { R.hidden = true; return; }
    const confirmStep = !!facts.beneficiary;
    const bad = checks.some((c) => !c.ok && !c.warn);
    if (!view.userToggled) view.recapMin = false;
    if (bad) view.recapMin = false;
    const row = (k, f) => (f ? `<dt>${esc(T(k))}</dt><dd>${esc(f.raw)}</dd>` : '');
    const money = (f) => (f && Number.isFinite(f.value) && f.value > 0 ? M.money.moneyHtml(f.value) : '');
    const chk = checks.map((c) => {
      const txt = c.id === 'total' ? (c.ok ? T('checksOk') : T('checksBad')) : c.id === 'fee' ? (c.ok ? '✓ ' + T('fee') : T('feeBad')) : c.id.startsWith('typed') ? T('mismatch') : T('bigAmount');
      const cls = c.ok ? 'ok' : c.warn ? 'wn' : 'ko';
      return `<li class="${cls}">${ic(c.ok ? 'checkCircle' : c.warn ? 'alert' : 'xCircle', { size: 18 })}<span>${esc(txt)}<small>${esc(c.detail)}</small></span></li>`;
    }).join('');
    R.classList.toggle('bad', bad);
    R.classList.toggle('min', view.recapMin);
    R.setAttribute('aria-label', confirmStep ? T('beforeConfirm') : T('fee'));
    M.util.setHTML(R, `<h3>${ic(bad ? 'octagon' : 'receipt')}<span>${esc(confirmStep ? T('beforeConfirm') : T('fee'))}</span>
        <button class="icon sp" data-a="speak" aria-label="${esc(T('listen'))}">${ic('volume', { size: 18 })}</button>
        <button class="icon" data-a="min" aria-expanded="${!view.recapMin}" aria-label="${esc(T('collapse'))}">${ic(view.recapMin ? 'chevronUp' : 'chevronDown', { size: 18 })}</button></h3>
      <div class="body"><dl class="kv">
        ${row('amount', facts.amount)}${money(facts.amount)}
        ${row('fee', facts.fee)}
        ${row('total', facts.total)}
        ${row('beneficiary', facts.beneficiary)}${row('phone', facts.phone)}
      </dl>${chk ? `<ul class="checks">${chk}</ul>` : ''}</div>`);
    R.hidden = false;
    placeRecap(R);
    R.querySelector('[data-a=min]').onclick = () => { view.recapMin = !view.recapMin; view.userToggled = true; renderRecap(facts, checks); };
    R.querySelector('[data-a=speak]').onclick = () => speakRecap(facts, checks);
  }

  const INTERACTIVE = 'button, a[href], input, select, textarea, label, [role=button], [tabindex]:not([tabindex="-1"])';
  function placeRecap(R) {
    const w = R.offsetWidth, h = R.offsetHeight, m = 16, fab = 84;
    const spots = [
      { right: m, bottom: m }, { left: m, bottom: fab }, { right: m, top: m }, { left: m, top: m },
    ];
    const controls = [...document.querySelectorAll(INTERACTIVE)]
      .filter((el) => !el.closest('#mboa-host'))
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width && r.height && r.bottom > 0 && r.top < innerHeight);
    const rectOf = (s) => {
      const left = s.left != null ? s.left : innerWidth - s.right - w;
      const top = s.top != null ? s.top : innerHeight - s.bottom - h;
      return { left, top, right: left + w, bottom: top + h };
    };
    const hits = (b) => controls.filter((r) => r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top).length;
    let best = null;
    for (const s of spots) { const n = hits(rectOf(s)); if (!best || n < best.n) best = { s, n }; if (n === 0) break; }
    for (const k of ['left', 'right', 'top', 'bottom']) R.style[k] = best.s[k] != null ? `${best.s[k]}px` : 'auto';
    if (best.n > 0 && !view.recapMin && !view.userToggled && !R.classList.contains('bad')) { view.recapMin = true; R.classList.add('min'); placeRecap(R); }
  }

  function speakRecap(facts, checks) {
    const L = view.lang === 'off' ? 'fr' : view.lang;
    const parts = [];
    for (const k of ['amount', 'fee', 'total', 'beneficiary', 'phone']) if (facts[k]) parts.push(`${T(k)} : ${facts[k].raw}.`);
    for (const c of checks) if (!c.ok) parts.push(c.id === 'total' ? T('checksBad') : c.id === 'fee' ? T('feeBad') : c.id.startsWith('typed') ? T('mismatch') : T('bigAmount'));
    M.voice.readAll(parts.map((text) => ({ text, lang: L })));
  }

  const shown = new Map();
  function showAlert({ id, level = 'medium', title, body, speakText }) {
    if (shown.has(id)) return;
    const el = document.createElement('div');
    el.className = `alert ${level}`;
    el.setAttribute('role', level === 'info' ? 'status' : 'alert');
    M.util.setHTML(el, `${ic(level === 'high' ? 'octagon' : level === 'info' ? 'info' : 'alert', { size: 24 })}
      <div class="grow"><b>${esc(title)}</b>${body ? `<p>${esc(body)}</p>` : ''}</div>
      <button class="icon" data-a="s" aria-label="${esc(T('listen'))}">${ic('volume', { size: 18 })}</button><button class="icon" data-a="x" aria-label="${esc(T('close'))}">${ic('x', { size: 18 })}</button>`);
    el.querySelector('[data-a=s]').onclick = () => M.voice.speak(speakText || title, view.lang === 'off' ? 'fr' : view.lang);
    el.querySelector('[data-a=x]').onclick = () => el.remove();
    view.els.alerts.prepend(el);
    while (view.els.alerts.children.length > 3) view.els.alerts.lastElementChild.remove();
    shown.set(id, el);
    if (view.settings.autoVoice) M.voice.speak(speakText || title, view.lang === 'off' ? 'fr' : view.lang);
  }
  function clearAlert(id) { const el = shown.get(id); if (el) { el.remove(); shown.delete(id); } }

  function place(box, el) {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) { box.hidden = true; return; }
    box.hidden = false;
    box.style.left = `${r.left - 6}px`; box.style.top = `${r.top - 6}px`;
    box.style.width = `${r.width + 12}px`; box.style.height = `${r.height + 12}px`;
    box.classList.toggle('below', r.top < 56);
  }
  function loop() {
    view.raf = 0;
    const g = view.guideEl && view.guideEl.isConnected;
    if (g) place(view.els.ring, view.guideEl); else view.els.ring.hidden = true;
    if (view.hlEl && view.hlEl.isConnected) place(view.els.hl, view.hlEl); else view.els.hl.hidden = true;
    if (g || view.hlEl) view.raf = requestAnimationFrame(loop);
  }
  function setGuide(el, captionKey) {
    view.guideEl = el || null;
    if (el) view.els.ring.querySelector('.caption span').textContent = T(captionKey);
    if (!view.raf) view.raf = requestAnimationFrame(loop);
  }
  function highlight(el) {
    view.hlEl = el || null;
    if (el) el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    if (!view.raf) view.raf = requestAnimationFrame(loop);
  }

  M.view = { mount, update, setPageInfo, renderStats, renderRecap, showAlert, clearAlert, setGuide, highlight, togglePanel, openPanel, closePanel, T };
})();
