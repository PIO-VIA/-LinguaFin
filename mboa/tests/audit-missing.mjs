// Audit : quels mots empêchent la traduction sur une page ? (sert à enrichir les blocs)
// node mboa/tests/audit-missing.mjs [url] [langue]
import { chromium } from 'playwright'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path'; import http from 'node:http';
import { fileURLToPath } from 'node:url';
const EXT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEMO = path.join(EXT, '../mboa-demo/index.html');
const [url0, LANG = 'ewo'] = process.argv.slice(2);
const EXE = process.env.CHROMIUM || chromium.executablePath(); // navigateur installé par « npx playwright install chromium »
const server = http.createServer((q, r) => { r.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }); fs.createReadStream(DEMO).pipe(r); }).listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const url = url0 || `http://127.0.0.1:${server.address().port}/`;
const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mp-')), { executablePath: EXE, headless: true, args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`] });
let [sw] = ctx.serviceWorkers(); if (!sw) sw = await ctx.waitForEvent('serviceworker');
await sw.evaluate((LANG) => chrome.storage.sync.set({ lang: LANG, firstRun: false }), LANG);
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150000 });
await page.waitForTimeout(6000);
const ranges = await page.evaluate(() => [...(CSS.highlights.get('mboa-missing') || [])].map((r) => r.toString()));
console.log('mots surlignés :', [...new Set(ranges)].join(' | '));
await page.locator('#mboa-host .fab').click();
await page.waitForTimeout(400);
console.log(await page.locator('#mboa-host .integrity').textContent());
console.log('page :', await page.locator('#mboa-host .pageinfo').textContent().catch(() => '—'), '| html lang =', await page.evaluate(() => document.documentElement.lang), '| texte :', (await page.evaluate(() => document.body.innerText)).slice(0, 200).replace(/\s+/g, ' '));
await ctx.close(); server.close();
