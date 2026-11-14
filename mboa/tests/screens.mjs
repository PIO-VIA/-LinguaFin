// Captures d'écran de l'interface (panneau, info-bulle, récapitulatif, alerte, popup, Studio),
// en clair et en sombre, dans mboa/docs/captures/. Usage : npm run screens
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = path.resolve(HERE, '..');
const OUT = path.join(EXT, 'docs/captures');
const DEMO = path.resolve(HERE, '../../mboa-demo/index.html');
const EXE = process.env.CHROMIUM || chromium.executablePath(); // navigateur installé par « npx playwright install chromium »
fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); fs.createReadStream(DEMO).pipe(r); }).listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

for (const scheme of ['light', 'dark']) {
  const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-shots-')), {
    executablePath: EXE, headless: true, viewport: { width: 1280, height: 860 }, colorScheme: scheme,
    args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
  });
  let [sw] = ctx.serviceWorkers(); if (!sw) sw = await ctx.waitForEvent('serviceworker');
  const id = new URL(sw.url()).host;
  await sw.evaluate(() => chrome.storage.sync.set({ lang: 'ewo', firstRun: false, autoVoice: false }));
  const page = await ctx.newPage();
  const shot = (n, el) => (el || page).screenshot({ path: path.join(OUT, `${n}-${scheme}.png`) });
  const host = (s) => page.locator('#mboa-host').locator(s);

  await page.goto(BASE);
  await page.waitForTimeout(900);
  await host('.fab').click();
  await page.waitForTimeout(300);
  await shot('panneau', host('.panel'));
  await host('.x').click();

  // Info-bulle sur une phrase non traduite (mots manquants surlignés).
  await page.evaluate(() => { const p = document.createElement('p'); p.id = 'x'; p.textContent = 'Votre transfert a réussi avec un bonus de parrainage.'; document.querySelector('main').prepend(p); });
  await page.waitForTimeout(400);
  await page.locator('#x').hover();
  await page.waitForTimeout(300);
  await shot('info-bulle');

  // Récapitulatif + arnaque (le faux SMS arrive après ~2,5 s).
  await page.click('#go', { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(300);
  await page.click('#next', { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(2600);
  await shot('recap-et-alerte');

  const pop = await ctx.newPage();
  await pop.setViewportSize({ width: 340, height: 640 });
  await pop.goto(`chrome-extension://${id}/popup/popup.html`);
  await pop.waitForTimeout(300);
  await pop.screenshot({ path: path.join(OUT, `popup-${scheme}.png`), fullPage: true });
  const st = await ctx.newPage();
  await st.goto(`chrome-extension://${id}/studio/studio.html`);
  await st.waitForTimeout(500);
  await st.screenshot({ path: path.join(OUT, `studio-${scheme}.png`) });
  await ctx.close();
}
server.close();
console.log('Captures :', fs.readdirSync(OUT).join(', '));
