const M = globalThis.MBOA;
const box = document.querySelector('.langs');
const LANGS = ['ewo', 'dua', 'fub', 'pcm', 'fr'];

async function render() {
  const { lang = 'off' } = await chrome.storage.sync.get('lang');
  M.util.setHTML(box, '');
  for (const code of [...LANGS, 'off']) {
    const p = M.packs[code];
    const b = document.createElement('button');
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', String(lang === code));
    b.style.setProperty('--c', p?.color || '#0f766e');
    if (!p) b.className = 'off';
    M.util.setHTML(b, `<span class="radio" aria-hidden="true"></span><span class="txt"${p ? ` lang="${p.bcp47}"` : ''}><b></b>${p ? '<small></small>' : ''}</span>${p && (p.status === 'draft' || p.status === 'review') ? `<span class="badge">${p.status === 'draft' ? 'Brouillon' : 'En relecture'}</span>` : ''}`);
    b.querySelector('b').textContent = p ? p.native : 'Original (sans traduction)';
    if (p) b.querySelector('small').textContent = p.sample;
    b.onclick = async () => {
      await chrome.storage.sync.set(code === 'off' ? { lang: 'off', firstRun: false } : { lang: code, lastLang: code, firstRun: false });
      render();
    };
    box.appendChild(b);
  }
}

async function send(type) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id != null) chrome.tabs.sendMessage(tab.id, { type }).catch(() => {});
  window.close();
}

document.getElementById('panel').onclick = () => send('toggle-panel');
document.getElementById('read').onclick = () => send('read-page');
document.getElementById('studio').onclick = () => chrome.tabs.create({ url: chrome.runtime.getURL('studio/studio.html') });
render();

document.querySelectorAll('[data-icon]').forEach((el) => {
  const t = document.createElement('span');
  M.util.setHTML(t, M.icon(el.dataset.icon, { size: 18 }));
  el.prepend(t.firstChild);
});
