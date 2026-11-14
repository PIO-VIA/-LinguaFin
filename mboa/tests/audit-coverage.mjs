// Audit : liste les textes visibles restés en français à chaque étape (hors valeurs).
import { chromium } from 'playwright';
import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
const EXT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL = process.env.MBOA_URL || 'https://safinum.cm/hackathon-test';
const LANG = process.env.MBOA_LANG || 'ewo';
const EXE = process.env.CHROMIUM || chromium.executablePath(); // navigateur installé par « npx playwright install chromium »
const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-a-')), {
  executablePath: EXE, headless: true, viewport: { width: 1366, height: 900 },
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`] });
let [sw] = ctx.serviceWorkers(); if (!sw) sw = await ctx.waitForEvent('serviceworker');
await sw.evaluate((l) => chrome.storage.sync.set({ lang: l, firstRun: false, guide: false }), LANG);
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 150000 });
await page.waitForFunction(() => document.querySelector('#mboa-host') && document.body.textContent.length > 500, null, { timeout: 150000 });
await page.waitForTimeout(1500);
const all = new Map();
async function collect(step) {
  const list = await page.evaluate(() => {
    const out = [];
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      const el = n.parentElement; const t = n.nodeValue.trim();
      if (!t || !/\p{L}/u.test(t) || !el || el.closest('#mboa-host,script,style')) continue;
      const r = el.getBoundingClientRect(); if (!r.width) continue;
      out.push({ t, lang: el.getAttribute('lang') });
    }
    return out;
  });
  for (const { t, lang } of list) if (lang !== (globalThis.L || '') && !all.has(t)) all.set(t, { step, lang });
}
const click = async (re) => { await page.locator('button').filter({ hasText: re }).first().click(); await page.waitForTimeout(700); };
await collect('1-solde');
await click(/Lóm mɔ́nə|Lóma mɔ́ni|Neldu ceede|Send money/);
for (const op of ['safinum', 'other_bank', 'mobile_money']) { await page.locator('select').first().selectOption(op); await page.waitForTimeout(400); await collect('2-frais'); }
await click(/Kə́ ásu|Kɛ́ ɓosó|Jokku|^Continue$/); await collect('3-beneficiaire');
await page.locator('input[type=checkbox]').first().check(); await click(/Kə́ ásu|Kɛ́ ɓosó|Jokku|^Continue$/); await collect('4-recap');
await page.locator('input[type=checkbox]').first().check(); await click(/Confirmer lóm|Confirmer lóma|Tabbitin nelde|Confirm the transfer/); await collect('5-recu');
const res = await page.evaluate(() => 1);
// Classement : traduit (lang posé par Mboa) vs non traduit.
const rows = [...all.entries()].map(([t, v]) => ({ t, ...v }));
const untranslated = rows.filter((r) => !r.lang || r.lang === 'fr');
const ok = rows.filter((r) => r.lang && r.lang !== 'fr');
console.log(`traduits: ${ok.length}  non traduits: ${untranslated.length}`);
for (const r of untranslated) console.log(`[${r.step}] ${JSON.stringify(r.t)}`);
await ctx.close();
