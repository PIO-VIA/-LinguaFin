// Vérifie les pages de l'extension (popup, Studio) : rendu complet, aucune erreur JS.
import { chromium } from 'playwright';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
const EXT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXE = process.env.CHROMIUM || chromium.executablePath(); // navigateur installé par « npx playwright install chromium »
const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-pages-')), {
  executablePath: EXE, headless: true, args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
});
let [sw] = ctx.serviceWorkers();
if (!sw) sw = await ctx.waitForEvent('serviceworker');
const id = new URL(sw.url()).host;
let ok = 0, n = 0;
const check = (name, cond, info = '') => { n++; if (cond) ok++; console.log(`${cond ? '✔' : '✖'} ${name}${info ? ' — ' + info : ''}`); };
for (const [name, url, probe] of [
  ['Studio', `chrome-extension://${id}/studio/studio.html`, () => ({ opts: document.querySelectorAll('#lang option').length, rows: document.querySelectorAll('textarea').length })],
  ['Popup', `chrome-extension://${id}/popup/popup.html`, () => ({ opts: document.querySelectorAll('button').length, rows: 1 })],
]) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(url);
  await page.waitForTimeout(800);
  const r = await page.evaluate(probe);
  check(`${name} rendu (${r.opts} choix, ${r.rows} lignes)`, r.opts >= 4 && r.rows >= 1);
  check(`${name} sans erreur JavaScript`, errors.length === 0, errors.join(' | '));
}
await ctx.close();
console.log(`\n${ok}/${n} vérifications réussies`);
process.exit(ok === n ? 0 : 1);
