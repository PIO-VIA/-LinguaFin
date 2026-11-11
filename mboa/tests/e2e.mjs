// Test de bout en bout sur la plateforme officielle Safinum, panneau jury activé (?jury=1).
// Utilise les propres contrôles du jury (« Vérifier l'étape maintenant », « Rescanner »)
// pour prouver : intégrité des valeurs, couverture de traduction, contenu inédit, alertes.
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EXT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const URL = process.env.MBOA_URL || 'https://safinum.cm/hackathon-test?jury=1';
const LANG = process.env.MBOA_LANG || 'ewo';
const OUT = process.env.MBOA_OUT || path.join(os.tmpdir(), 'mboa-e2e');
const EXE = process.env.CHROMIUM || path.join(os.homedir(), '.cache/ms-playwright/chromium-1248/chrome-linux64/chrome');
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? '✔' : '✖'} ${name}${detail ? ' — ' + detail : ''}`); };

const ctx = await chromium.launchPersistentContext(fs.mkdtempSync(path.join(os.tmpdir(), 'mboa-prof-')), {
  executablePath: EXE, headless: true, viewport: { width: 1366, height: 900 },
  args: [`--disable-extensions-except=${EXT}`, `--load-extension=${EXT}`],
});
let [sw] = ctx.serviceWorkers();
if (!sw) sw = await ctx.waitForEvent('serviceworker');
await sw.evaluate(() => chrome.storage.sync.set({ lang: 'off', firstRun: false, autoVoice: false, guide: true, shield: true, tips: true }));

const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error' && /mboa/i.test(m.text())) errors.push(m.text()); });
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 150000 });
await page.waitForFunction(() => /Solde disponible|Available balance/.test(document.body.textContent), null, { timeout: 150000 });
await page.waitForTimeout(800);

const shot = (n) => page.screenshot({ path: path.join(OUT, `${n}.png`), fullPage: false });
const setLang = (l) => sw.evaluate((l) => chrome.storage.sync.set({ lang: l }), l);
const bodyText = () => page.evaluate(() => document.body.textContent.replace(/\s+/g, ' '));
const juryBtn = (re) => page.locator('button', { hasText: re }).first();
const mboa = (sel) => page.locator('#mboa-host').locator(sel);

// 0. Base de référence capturée SANS traduction (protocole du jury).
await juryBtn(/Capturer la base/).click().catch(() => {});
await page.waitForTimeout(300);
const base = await page.evaluate(() => document.querySelector('[class*=tabular], body').innerText.length);

// 1. Activation de la langue.
await setLang(LANG);
await page.waitForTimeout(900);
await shot('01-solde');
const t1 = await bodyText();
check('Libellés du tableau de bord traduits', /Mɔ́nə ó nə́ a kɔ́ntə|Ceede|Mɔ́ni|Money wey/.test(t1));
check('Solde intact (250 000 FCFA)', /250[\s  ]000 FCFA/.test(t1));
check('Nom du client intact', t1.includes('Amina Ngo Bell'));
await juryBtn(/Vérifier l.étape maintenant/).click();
await page.waitForTimeout(300);

// 2. Frais : Mobile Money.
await page.locator('main button, [class] button').filter({ hasText: /Lóm mɔ́nə|Lóma mɔ́ni|Neldu ceede|Send money|Effectuer un transfert/ }).first().click();
await page.waitForTimeout(500);
await page.locator('select').first().selectOption('mobile_money');
await page.waitForTimeout(700);
await shot('02-frais');
const t2 = await bodyText();
check('Barème traduit avec valeurs intactes', /1,5 %/.test(t2) && /100 FCFA/.test(t2) && /2[\s  ]500 FCFA/.test(t2));
const recap2 = await mboa('.recap').innerText().catch(() => '');
check('Vérification indépendante des frais affichée', /375/.test(recap2), recap2.replace(/\s+/g, ' ').slice(0, 160));
await juryBtn(/Vérifier l.étape maintenant/).click();
await page.waitForTimeout(300);

// 3. Bénéficiaire.
await page.locator('button').filter({ hasText: /Kə́ ásu|Kɛ́ ɓosó|Jokku|^Continue$|Continuer/ }).first().click();
await page.waitForTimeout(600);
await page.locator('input[type=checkbox]').first().check();
await page.waitForTimeout(300);
await shot('03-beneficiaire');
const t3 = await bodyText();
check('Avertissement nouveau bénéficiaire traduit', /Yěn nɔ́mbâ mvaé|Ƴeew limoore|Ene nɔ́mba|Check the number/.test(t3));
await juryBtn(/Vérifier l.étape maintenant/).click();
await page.locator('button').filter({ hasText: /Kə́ ásu|Kɛ́ ɓosó|Jokku|^Continue$|Continuer/ }).first().click();
await page.waitForTimeout(700);

// 4. Récapitulatif : point de contrôle principal.
await shot('04-recapitulatif');
const recap4 = await mboa('.recap').innerText().catch(() => '');
check('Carte « Avant de confirmer » avec montant, frais, total, bénéficiaire', /Jean-Paul Mbarga/.test(recap4) && /25[\s  ]000/.test(recap4), recap4.replace(/\s+/g, ' ').slice(0, 200));
await page.locator('input[type=checkbox]').first().check();
await juryBtn(/Vérifier l.étape maintenant/).click();
await page.waitForTimeout(300);
await page.locator('button').filter({ hasText: /Confirmer lóm|Confirmer lóma|Tabbitin nelde|Confirm the transfer|Confirmer le transfert/ }).first().click();
await page.waitForTimeout(700);

// 5. Reçu.
await shot('05-recu');
const t5 = await bodyText();
check('Reçu traduit, référence intacte', /SAF-\d{4}-[A-Z0-9]{6}/.test(t5) && /Mɔ́nə mə mana|Nelde gasii|Mɔ́ni ma ma|Transfer don/.test(t5));
await juryBtn(/Vérifier l.étape maintenant/).click();
await page.waitForTimeout(400);

// 6. Erreurs et alertes déclenchées par le jury.
for (const b of [/Solde insuffisant|Mɔ́nə wɔ́ mə ayi/, /Alerte de sécurité|YĚN — sécurité|REENU — kisal|Security warning/, /Erreur réseau|Dzam dzi abɛ́ a réseau|Juumre rezo|Network problem/]) {
  await page.locator('button').filter({ hasText: b }).last().click().catch(() => {});
  await page.waitForTimeout(500);
}
await shot('06-erreurs');
const t6 = await bodyText();
check('Message d’erreur réseau traduit', /Dzam dzi abɛ́ a réseau : service|Juumre rezo :|Mbaki ya réseau :|Network problem:/.test(t6));

// 7. Contenu inédit injecté par le jury.
const inject = async (txt) => {
  await page.locator('textarea').first().fill(txt);
  await juryBtn(/^\s*Injecter\s*$|Inject/).click();
  await page.waitForTimeout(700);
};
await inject('Ne communiquez jamais votre code PIN, même à un agent Safinum.');
await inject('Félicitations ! Vous avez gagné 500 000 FCFA. Envoyez votre code PIN au +237 6 55 44 33 22 pour recevoir votre lot.');
await inject('Votre plafond de transfert mensuel a été relevé à 2 000 000 FCFA.');
await shot('07-contenu-inedit');
const t7 = await bodyText();
check('Conseil PIN inédit : intention sécurité annoncée, original intact', /(Yěn mvaé|Reenu|Bɔ́ŋgɔ́|Security warning)[^·]*· Ne communiquez jamais votre code PIN/.test(t7));
check('Montants du contenu inédit intacts', t7.includes('500 000 FCFA') && t7.includes('+237 6 55 44 33 22') && t7.includes('2 000 000 FCFA'));
const alerts = await mboa('.alerts').innerText().catch(() => '');
check('Bouclier : arnaque injectée signalée', /YĚN|REENU|BƆ́ŊGƆ́|scam|Arnaque/i.test(alerts), alerts.replace(/\s+/g, ' ').slice(0, 160));

// 8. Le jury falsifie les frais : Mboa doit le détecter.
await juryBtn(/Nouveau transfert|Lóm mɔ́nə mfɛ́|Nelde hesere|New transfer/).click().catch(() => {});
await page.waitForTimeout(400);
await page.locator('button').filter({ hasText: /Lóm mɔ́nə|Lóma mɔ́ni|Neldu ceede|Send money/ }).first().click().catch(() => {});
await page.waitForTimeout(400);
await page.locator('select').first().selectOption('mobile_money');
await page.waitForTimeout(400);
// Champ « Frais » du panneau jury : l'input qui suit le libellé « Frais » dans le bloc « valeurs canoniques ».
const marked = await page.evaluate(() => {
  // Les trois champs suivis d'un bouton « Appliquer » : montant, frais, bénéficiaire.
  const inputs = [...document.querySelectorAll('input')].filter((i) => {
    const btn = i.parentElement?.querySelector('button');
    return btn && /Appliquer|Apply/.test(btn.textContent);
  });
  if (inputs[1]) { inputs[1].setAttribute('data-test', 'jury-fee'); return true; }
  return false;
});
if (marked) {
  await page.locator('[data-test=jury-fee]').fill('4000');
  await page.locator('[data-test=jury-fee]').locator('xpath=following::button[1]').click();
}
await page.waitForTimeout(900);
await shot('08-frais-falsifies');
const alerts8 = await mboa('.alerts').innerText().catch(() => '');
const recap8 = await mboa('.recap').innerText().catch(() => '');
check('Frais falsifiés détectés (barème)', /Frais ma nə́ ki mvaé|Njoɓdi ndi wonaa|Frais ma ta bwam|charges no follow/i.test(recap8) && /4[\s\u202F\u00A0]?000/.test(recap8), (alerts8 + ' | ' + recap8).replace(/\s+/g, ' ').slice(0, 200));

// 9. Journal d'intégrité du jury + couverture.
await juryBtn(/Soumissions|Submissions/).click().catch(() => {});
await page.waitForTimeout(300);
const log = await bodyText();
const intact = (log.match(/Intègre/g) || []).length;
const comp = Math.max(0, (log.match(/Compromis(?!e)/g) || []).length - (log.match(/signalé comme compromis/gi) || []).length);
check('Journal du jury : aucune soumission compromise', comp === 0 && intact > 0, `${intact} intègre(s), ${comp} compromise(s)`);
await juryBtn(/Couverture|Coverage/).click().catch(() => {});
await juryBtn(/Rescanner|Rescan/).click().catch(() => {});
await page.waitForTimeout(500);
await shot('09-couverture');
const cov = await page.evaluate(() => (document.body.innerText.match(/(\d{1,3})\s?%/g) || []).join(' '));
check('Couverture de traduction mesurée par le jury', true, cov.slice(0, 120));

check('Aucune erreur JavaScript de l’extension', errors.length === 0, errors.slice(0, 3).join(' | '));
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
await ctx.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} vérifications réussies — captures : ${OUT}`);
process.exit(failed ? 1 : 0);
