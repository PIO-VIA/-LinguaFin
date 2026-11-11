// Lanceur de démonstration : ouvre un Chromium VISIBLE avec Mboa déjà installé, sur
//  - la plateforme officielle (https://safinum.cm/hackathon-test?jury=1)
//  - la banque fictive Kola Pay (servie en local) : ?tamper=1 pour un service falsifié.
// Usage : npm run demo            (profil neuf : Mboa demande la langue une seule fois)
//         npm run demo -- dua     (navigateur réglé en Duala : traduction sans aucun choix)
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import os from 'node:os'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const EXT = path.resolve(HERE, '..');
const DEMO = path.resolve(HERE, '../../mboa-demo/index.html');
const EXE = process.env.CHROMIUM || path.join(os.homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');
const locale = process.argv[2] ? `${process.argv[2]}-CM` : 'fr-FR';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  fs.createReadStream(DEMO).pipe(res);
}).listen(5181, '127.0.0.1');
await new Promise((r) => server.once('listening', r));

const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-demo-')), {
  executablePath: EXE, headless: false, locale, viewport: null,
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`, '--start-maximized'],
});
const [first] = ctx.pages();
await (first || (await ctx.newPage())).goto('https://safinum.cm/hackathon-test?jury=1', { waitUntil: 'domcontentloaded', timeout: 120000 }).catch(() => {});
const kola = await ctx.newPage();
await kola.goto('http://127.0.0.1:5181/');
console.log(`Navigateur ouvert (langue du navigateur : ${locale}).`);
console.log('Onglet 1 : plateforme officielle · Onglet 2 : banque fictive http://127.0.0.1:5181/ (ajoutez ?tamper=1 pour un service falsifié).');
console.log('Fermez la fenêtre pour terminer.');
ctx.on('close', () => { server.close(); process.exit(0); });
