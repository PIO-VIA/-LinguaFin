// Studio linguistique : relecture, correction, validation tracée et enregistrement audio natif.
const M = globalThis.MBOA;
const E = M.entities;
const $ = (s) => document.querySelector(s);
const esc = M.util.escapeHtml;
const LANGS = ['ewo', 'dua', 'fub', 'pcm'];
let overrides = {};
// Phrases complètes + blocs de composition : tout se valide au même endroit.
const ENTRIES = [...M.phrases, ...(M.blocks || [])];
let lang = 'ewo';
let recorder = null;

async function load() {
  const got = await chrome.storage.local.get(['overrides', 'validator', 'studioLang']);
  overrides = got.overrides || {};
  $('#validator').value = got.validator || '';
  lang = got.studioLang || 'ewo';
  M.engine.setOverrides(overrides);
}

const persist = () => chrome.storage.local.set({ overrides });

function statusOf(p) {
  return overrides[lang]?.[p.id]?.status || (M.packs[lang].status === 'review' ? 'draft' : 'draft');
}

// Garde-fou : mêmes emplacements {n}, aucun chiffre ajouté.
function checkText(p, text) {
  const want = ([...p.fr][0].match(/\{\d+\}/g) || []).sort().join();
  const got = (text.match(/\{\d+\}/g) || []).sort().join();
  if (!text.trim()) return 'Traduction vide.';
  if (want !== got) return `Emplacements de valeurs attendus : ${want || 'aucun'} — trouvés : ${got || 'aucun'}.`;
  if (/\d/.test(text.replace(/\{\d+\}/g, ''))) return 'Chiffre ajouté : interdit (les valeurs viennent uniquement de la page).';
  return '';
}

function progress() {
  const total = ENTRIES.length;
  const ok = ENTRIES.filter((p) => statusOf(p) === 'validated').length;
  $('#bar').style.width = `${(ok / total) * 100}%`;
  $('#ptext').textContent = `${ok} / ${total} phrases validées en ${M.packs[lang].name}`;
}

function render() {
  const filter = $('#filter').value;
  const rows = $('#rows');
  M.util.setHTML(rows, '');
  for (const p of ENTRIES) {
    const st = statusOf(p);
    if (filter !== 'all' && st !== filter) continue;
    const o = overrides[lang]?.[p.id];
    const text = o?.text || p.t[lang] || '';
    const row = document.createElement('div');
    row.className = `row ${st}`;
    M.util.setHTML(row, `
      <div class="src"><span class="tag">${esc(p.intent)}</span>${p.role ? `<span class="tag">${esc(p.role)}</span>` : ''}
        <b lang="fr">${esc(p.fr[0])}</b><small lang="en">${esc(p.en[0])}</small><small>id : ${esc(p.id)}</small></div>
      <div><label>Traduction ${esc(M.packs[lang].name)}<textarea rows="2" lang="${M.packs[lang].bcp47}">${esc(text)}</textarea></label><div class="err" role="alert"></div></div>
      <div class="side">
        <label>Statut<select>
          <option value="draft">À valider</option><option value="review">À revoir</option><option value="validated">Validée</option></select></label>
        <button class="rec" aria-pressed="false">${M.icon('mic', { size: 18 })}<span>Enregistrer</span></button>
        <button class="play">▶ Écouter</button>
        <span class="meta">${o?.by ? `par ${esc(o.by)} · ${esc(o.date)}` : 'non relue'}</span>
      </div>`);
    const ta = row.querySelector('textarea');
    const sel = row.querySelector('select');
    const err = row.querySelector('.err');
    sel.value = st;
    const save = () => {
      const e = checkText(p, ta.value);
      err.textContent = e;
      if (e) { sel.value = 'review'; }
      const by = $('#validator').value.trim();
      if (sel.value === 'validated' && !by) { err.textContent = 'Indiquez le nom du validateur avant de valider.'; sel.value = st; return; }
      overrides[lang] = overrides[lang] || {};
      overrides[lang][p.id] = { text: e ? (o?.text || p.t[lang]) : ta.value.trim(), status: sel.value, by: by || o?.by || '', date: new Date().toISOString().slice(0, 10) };
      row.className = `row ${sel.value}`;
      row.querySelector('.meta').textContent = `par ${overrides[lang][p.id].by || '—'} · ${overrides[lang][p.id].date}`;
      persist(); progress();
    };
    ta.addEventListener('change', save);
    sel.addEventListener('change', save);
    row.querySelector('.play').onclick = () => play(p, ta.value);
    row.querySelector('.rec').onclick = (ev) => record(p, ev.currentTarget);
    rows.appendChild(row);
  }
  progress();
}

async function play(p, text) {
  const key = `audio:${lang}:${p.id}`;
  const got = await chrome.storage.local.get(key);
  if (got[key]) return new Audio(got[key]).play();
  const u = new SpeechSynthesisUtterance(lang === 'pcm' ? text : M.util.toSpeakable(text));
  u.lang = M.packs[lang].voice; u.rate = 0.88;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}

async function record(p, btn) {
  if (recorder) { recorder.stop(); return; }
  let stream;
  try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
  catch { alert('Micro indisponible : autorisez le micro pour enregistrer.'); return; }
  const chunks = [];
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.onstop = async () => {
    stream.getTracks().forEach((t) => t.stop());
    const blob = new Blob(chunks, { type: recorder.mimeType });
    const url = await new Promise((r) => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(blob); });
    await chrome.storage.local.set({ [`audio:${lang}:${p.id}`]: url });
    recorder = null; btn.classList.remove('on'); btn.setAttribute('aria-pressed', 'false'); M.util.setHTML(btn, `${M.icon('mic', { size: 18 })}<span>Ré-enregistrer</span>`);
  };
  recorder.start();
  btn.classList.add('on'); btn.setAttribute('aria-pressed', 'true'); M.util.setHTML(btn, `${M.icon('stop', { size: 18 })}<span>Arrêter</span>`);
  setTimeout(() => recorder && recorder.state === 'recording' && recorder.stop(), 12000);
}

function probe() {
  const s = $('#probe').value;
  const { tokens, masked } = E.protect(s);
  let shown = esc(masked);
  tokens.forEach((t, i) => { shown = shown.replace(esc(String.fromCharCode(0xe100 + i)), `<span class="tok" title="${esc(t.type)}">${esc(t.raw)}</span>`); });
  const r = M.engine.translate(s, lang);
  const sc = M.shield.scoreText(s);
  const v = r && r.out ? E.verify(tokens, r.out) : { ok: true };
  M.util.setHTML($('#probeOut'), `
    <div>Valeurs verrouillées : ${tokens.length ? tokens.map((t) => `<span class="tok">${esc(t.raw)}</span> <small>(${esc(t.type)})</small>`).join(' · ') : 'aucune'}</div>
    <div>Mode : <b>${r ? esc(r.kind) : 'inchangé'}</b>${r?.intent ? ` · intention : <b>${esc(r.intent)}</b>` : ''} · bouclier : <b>${esc(sc.level)}</b></div>
    <div class="out" lang="${M.packs[lang].bcp47}">${esc(r?.out || s)}</div>
    <div>Intégrité : ${v.ok ? `<span class="ok">${M.icon('checkCircle', { size: 16 })}toutes les valeurs sont intactes</span>` : `<span class="ko">${M.icon('xCircle', { size: 16 })}${esc(v.reason)}</span>`}</div>`);
}

$('#export').onclick = () => {
  const entries = ENTRIES.map((p) => {
    const o = overrides[lang]?.[p.id];
    return { id: p.id, intent: p.intent, fr: p.fr[0], en: p.en[0], text: o?.text || p.t[lang], status: o?.status || 'draft', by: o?.by || '', date: o?.date || '' };
  });
  const blob = new Blob([JSON.stringify({ format: 'mboa-pack/1', lang, name: M.packs[lang].name, exportedAt: new Date().toISOString(), entries }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mboa-${lang}-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};

$('#import').onchange = async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  try {
    const data = JSON.parse(await f.text());
    if (data.format !== 'mboa-pack/1' || !LANGS.includes(data.lang)) throw new Error('format');
    overrides[data.lang] = overrides[data.lang] || {};
    let n = 0;
    for (const en of data.entries) {
      const p = ENTRIES.find((x) => x.id === en.id);
      if (!p || checkText(p, en.text || '')) continue;
      overrides[data.lang][en.id] = { text: en.text, status: en.status, by: en.by, date: en.date };
      n++;
    }
    await persist();
    lang = data.lang; $('#lang').value = lang; render();
    alert(`${n} phrases importées.`);
  } catch { alert('Fichier invalide (format mboa-pack/1 attendu).'); }
};

// Feuille de validation CSV (Excel / Google Sheets) remplie par les locuteurs natifs.
function parseCsv(text) {
  const rows = []; let row = [], cell = '', q = false;
  text = text.replace(/^\ufeff/, '');
  const sep = (text.split('\n')[0].match(/;/g) || []).length >= (text.split('\n')[0].match(/,/g) || []).length ? ';' : ',';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === sep) { row.push(cell); cell = ''; }
    else if (c === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

$('#importCsv').onchange = async (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const target = (f.name.match(/validation-(ewo|dua|fub|pcm)/) || [])[1] || lang;
  const [head, ...rows] = parseCsv(await f.text());
  const col = (name) => head.findIndex((h) => h.trim().toLowerCase().startsWith(name));
  const I = { id: col('id'), draft: col('brouillon'), fix: col('correction'), st: col('statut'), r1: col('relecteur_1'), r2: col('relecteur_2'), date: col('date') };
  overrides[target] = overrides[target] || {};
  let ok = 0, review = 0, refused = [];
  for (const r of rows) {
    const p = ENTRIES.find((x) => x.id === (r[I.id] || '').trim());
    if (!p) continue;
    const text = ((r[I.fix] || '').trim() || (r[I.draft] || '').trim());
    const err = checkText(p, text);
    if (err) { refused.push(`${p.id} : ${err}`); continue; }
    const st = (r[I.st] || '').toLowerCase();
    const r1 = (r[I.r1] || '').trim(), r2 = (r[I.r2] || '').trim();
    // « validé » exige DEUX relecteurs différents ; sinon la phrase reste à valider.
    const status = /revoir/.test(st) ? 'review' : /valid/.test(st) && r1 && r2 && r1 !== r2 ? 'validated' : 'draft';
    if (status === 'validated') ok++; if (status === 'review') review++;
    overrides[target][p.id] = { text, status, by: [r1, r2].filter(Boolean).join(' + '), date: (r[I.date] || '').trim() || new Date().toISOString().slice(0, 10) };
  }
  await persist();
  lang = target; $('#lang').value = lang; render();
  alert(`${M.packs[target].name} : ${ok} phrases validées (double relecture), ${review} à revoir.` + (refused.length ? `\n\nRefusées par les garde-fous :\n${refused.slice(0, 10).join('\n')}` : ''));
};

M.util.setHTML($('#lang'), LANGS.map((l) => `<option value="${l}">${esc(M.packs[l].native)} — ${esc(M.packs[l].region)}</option>`).join(''));
$('#lang').onchange = (e) => { lang = e.target.value; chrome.storage.local.set({ studioLang: lang }); render(); probe(); };
$('#filter').onchange = render;
$('#validator').onchange = (e) => chrome.storage.local.set({ validator: e.target.value.trim() });
$('#probe').oninput = probe;

load().then(() => { $('#lang').value = lang; render(); probe(); });

document.querySelectorAll('[data-icon]').forEach((el) => {
  const t = document.createElement('span');
  M.util.setHTML(t, M.icon(el.dataset.icon, { size: 18 }));
  el.prepend(t.firstChild);
});
