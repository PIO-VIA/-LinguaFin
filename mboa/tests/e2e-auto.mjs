// Mode automatique : AUCUNE langue choisie par l'utilisateur.
//  - le navigateur est réglé en Duala → Mboa traduit d'office, page après page ;
//  - page en anglais → traduite aussi ; page en allemand → laissée intacte ;
//  - phrase inédite → original conservé, mots manquants surlignés et expliqués.
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = path.resolve(HERE, '..');
const DEMO = path.resolve(HERE, '../../mboa-demo/index.html');
const EXE = process.env.CHROMIUM || path.join(os.homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');

const PAGES = {
  '/en': `<!doctype html><html lang="en"><meta charset="utf-8"><title>Bank</title><body><main>
    <h1>Your account</h1><p>Available balance</p><p>85 000 FCFA</p>
    <p id="declined">Your payment has been declined.</p><button>Send money</button></main></body></html>`,
  '/de': `<!doctype html><html lang="de"><meta charset="utf-8"><title>Bank</title><body><main>
    <h1>Ihr Konto</h1><p id="de">Ihre Zahlung wurde abgelehnt. Bitte versuchen Sie es später erneut.</p></main></body></html>`,
};
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  const p = new URL(req.url, 'http://x').pathname;
  if (PAGES[p]) res.end(PAGES[p]); else fs.createReadStream(DEMO).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const BASE = `http://127.0.0.1:${server.address().port}`;

const results = [];
const check = (name, ok, detail = '') => { results.push(ok); console.log(`${ok ? '✔' : '✖'} ${name}${detail ? ' — ' + detail : ''}`); };

const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-auto-')), {
  executablePath: EXE, headless: true, locale: 'dua-CM', viewport: { width: 1280, height: 860 },
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
});
let [sw] = ctx.serviceWorkers();
if (!sw) sw = await ctx.waitForEvent('serviceworker');
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const text = () => page.evaluate(() => document.body.textContent.replace(/\s+/g, ' '));

// 1. Page en français : traduite en Duala sans que l'utilisateur ait rien choisi.
await page.goto(BASE + '/');
await page.waitForTimeout(1200);
let t = await text();
check('Navigateur en Duala → page traduite sans aucun choix', /Mɔ́ni o ɓɛ́ o kɔ́ntɔ/.test(t), (t.match(/Mɔ́ni[^.]{0,30}/) || [''])[0]);
check('Solde intact', /85[\s  ]000 FCFA/.test(t));
const info = await page.locator('#mboa-host').locator('.pageinfo').textContent().catch(() => '');
check('Langue de la page détectée et annoncée', /français → Duala/.test(info || ''), info);

// 2. Phrase inédite : original intact, mots manquants surlignés et expliqués au survol.
await page.evaluate(() => {
  const p = document.createElement('p'); p.id = 'inedit';
  p.textContent = 'Votre transfert a réussi avec un bonus de parrainage.';
  document.querySelector('main').appendChild(p);
});
await page.waitForTimeout(500);
const ined = await page.locator('#inedit').textContent();
check('Phrase inédite : texte original conservé (intention annoncée)', /Votre transfert a réussi avec un bonus de parrainage\./.test(ined), ined);
const hl = await page.evaluate(() => (globalThis.CSS?.highlights?.get('mboa-missing')?.size ?? -1));
check('Mots manquants surlignés (sans modifier la page)', hl >= 2, `plages surlignées : ${hl}`);
await page.locator('#inedit').hover();
await page.waitForTimeout(300);
const tip = await page.locator('#mboa-host').locator('.tip').textContent().catch(() => '');
check('Survol : la raison est expliquée (mots « bonus », « parrainage »)', /bonus/.test(tip) && /parrainage/.test(tip), (tip || '').replace(/\s+/g, ' ').slice(0, 140));

// 3. Page suivante, en anglais : traduite automatiquement elle aussi.
await page.goto(BASE + '/en');
await page.waitForTimeout(1000);
t = await text();
check('Page suivante en anglais → traduite automatiquement', /Mɔ́ni o ɓɛ́ o kɔ́ntɔ/.test(t) && /Sómba mɔ́ni ba bángi/.test(t), t.slice(0, 160));

// 4. Page dans une autre langue : Mboa n'y touche pas.
await page.goto(BASE + '/de');
await page.waitForTimeout(1000);
const de = await page.locator('#de').textContent();
check('Page en allemand : laissée intacte', de === 'Ihre Zahlung wurde abgelehnt. Bitte versuchen Sie es später erneut.', de);

// 5. Exclusion d'un site par l'utilisateur.
await page.goto(BASE + '/');
await page.waitForTimeout(900);
await sw.evaluate((h) => chrome.storage.sync.set({ excluded: [h] }), '127.0.0.1');
await page.waitForTimeout(700);
t = await text();
check('Site exclu : texte original restauré', /Solde disponible/.test(t) && !/Mɔ́ni o ɓɛ́ o kɔ́ntɔ/.test(t));

check('Aucune erreur JavaScript', errors.length === 0, errors.slice(0, 3).join(' | '));
await ctx.close();
server.close();
const ok = results.filter(Boolean).length;
console.log(`\n${ok}/${results.length} vérifications réussies`);
process.exit(ok === results.length ? 0 : 1);
