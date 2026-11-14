// Test de bout en bout HORS LIGNE sur une seconde banque fictive (mboa-demo/), au vocabulaire
// et à la structure différents de la plateforme Safinum : preuve d'indépendance du service cible.
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = path.resolve(HERE, '..');
const DEMO = path.resolve(HERE, '../../mboa-demo');
const OUT = process.env.MBOA_OUT || path.join(os.tmpdir(), 'mboa-e2e-local');
const EXE = process.env.CHROMIUM || chromium.executablePath(); // navigateur installé par « npx playwright install chromium »
fs.mkdirSync(OUT, { recursive: true });

const server = http.createServer((req, res) => {
  const f = path.join(DEMO, 'index.html');
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  fs.createReadStream(f).pipe(res);
}).listen(0, '127.0.0.1');
await new Promise((r) => server.once('listening', r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? '✔' : '✖'} ${name}${detail ? ' — ' + detail : ''}`); };

const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-prof-')), {
  executablePath: EXE, headless: true, viewport: { width: 1280, height: 860 },
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
});
let [sw] = ctx.serviceWorkers();
if (!sw) sw = await ctx.waitForEvent('serviceworker');
await sw.evaluate(() => chrome.storage.sync.set({ lang: 'fub', firstRun: false, autoVoice: false, guide: true, shield: true }));

const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const text = () => page.evaluate(() => document.body.textContent.replace(/\s+/g, ' '));
const mboa = (sel) => page.locator('#mboa-host').locator(sel);
const shot = (n) => page.screenshot({ path: path.join(OUT, `${n}.png`) });

// A. Parcours normal en Fulfulde.
await page.goto(BASE);
await page.waitForTimeout(900);
let t = await text();
check('Accueil traduit (Fulfulde)', /Ceede ɗe mbaawɗaa huutoraade/.test(t) && /Jam waali, Paul Atangana/.test(t));
check('Solde intact', /85[\s  ]000 FCFA/.test(t));
await page.locator('#go').click();
await page.waitForTimeout(600);
t = await text();
check('Formulaire traduit, saisies intactes', /Heɓoowo/.test(t) && await page.locator('#name').inputValue() === 'Marie Ngono');
let recap = await mboa('.recap').innerText().catch(() => '');
const nOk = () => mboa('.recap li.ok').count(), nKo = () => mboa('.recap li.ko').count();
check('Frais vérifiés selon le barème affiché (1 %)', (await nOk()) > 0 && (await nKo()) === 0, recap.replace(/\s+/g, ' ').slice(0, 160));
await shot('A1-formulaire');
await page.locator('#next').click();
await page.waitForTimeout(600);
t = await text();
check('Phrase fragmentée traduite, valeurs en gras intactes', /A neldoto 20[\s  ]000 FCFA e Marie Ngono/.test(t), (t.match(/A neldoto.{0,40}/) || [''])[0]);
check('Conseil PIN légitime traduit sans fausse alerte', /Wata hollu mo’o fuu kod PIN maa/.test(t));
recap = await mboa('.recap').innerText().catch(() => '');
check('Récapitulatif : saisi = affiché', (await nKo()) === 0, recap.replace(/\s+/g, ' ').slice(0, 200));
await shot('A2-recapitulatif');
await page.waitForTimeout(2200);
const alerts = await mboa('.alerts').innerText().catch(() => '');
check('SMS d’arnaque reçu en direct : alerte bouclier', /REENU! Wata hokku kod walla ceede/.test(alerts), alerts.replace(/\s+/g, ' ').slice(0, 140));
await shot('A3-arnaque');

// A'. Contenu inédit injecté en direct (comme le jury) : composé à partir de blocs, valeurs intactes.
await page.evaluate(() => {
  const d = document.createElement('p');
  d.id = 'jury-new';
  d.textContent = 'Votre retrait de 12 500 FCFA a été annulé, contactez le service client.';
  document.querySelector('main').appendChild(d);
});
await page.waitForTimeout(400);
const injected = await page.locator('#jury-new').textContent();
check('Message inédit traduit par composition (≈), montant intact', /^≈ Ittude ceede 12[\s  ]500 FCFA haaytinaama, noddu service client\.$/.test(injected.trim()), injected);

// Composant web avec Shadow DOM ouvert (idée reprise de LinguaFin) : traduit aussi.
await page.evaluate(() => {
  const host = document.createElement('div');
  host.id = 'jury-shadow';
  host.attachShadow({ mode: 'open' }).innerHTML = '<p>Votre paiement a été annulé.</p>';
  document.querySelector('main').appendChild(host);
});
await page.waitForTimeout(400);
const shadowTxt = await page.evaluate(() => document.querySelector('#jury-shadow').shadowRoot.textContent);
check('Texte dans un Shadow DOM ouvert traduit', /^≈ Njoɓdi haaytinaama\.$/.test(shadowTxt.trim()), shadowTxt);

// B. Service falsifié : frais gonflés et montant changé entre saisie et récapitulatif.
await page.goto(BASE + '?tamper=1');
await page.waitForTimeout(800);
await page.locator('#go').click();
await page.waitForTimeout(600);
recap = await mboa('.recap').innerText().catch(() => '');
check('Frais gonflés détectés', /REENU! Njoɓdi ndi wonaa goonga/.test(recap), recap.replace(/\s+/g, ' ').slice(0, 160));
await page.locator('#next').click();
await page.waitForTimeout(700);
recap = await mboa('.recap').innerText().catch(() => '');
const al = await mboa('.alerts').innerText().catch(() => '');
check('Montant modifié entre saisie et récapitulatif détecté', /REENU! Ko woni ɗoo wonaa ko mbinndu-ɗaa/.test(recap + al), (recap + ' | ' + al).replace(/\s+/g, ' ').slice(0, 200));
await shot('B-falsification');

// C. Retour à l'original : tout est restauré à l'identique.
await page.goto(BASE);
await page.waitForTimeout(700);
const before = await page.evaluate(() => document.querySelector('main').innerHTML.length);
await sw.evaluate(() => chrome.storage.sync.set({ lang: 'off' }));
await page.waitForTimeout(600);
t = await text();
check('Bascule « Original » : texte français restauré', /Solde disponible/.test(t) && /Bonjour, Paul Atangana/.test(t));

check('Aucune erreur JavaScript', errors.length === 0, errors.slice(0, 3).join(' | '));
await ctx.close();
server.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} vérifications réussies — captures : ${OUT}`);
process.exit(failed ? 1 : 0);
