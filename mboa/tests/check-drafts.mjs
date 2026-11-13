// Vérifie l'orthographe des brouillons contre de VRAIES phrases écrites par des locuteurs
// (Common Voice, licence CC0). Un mot de nos brouillons qui n'apparaît jamais dans des milliers
// de phrases réelles est suspect : il passe en priorité dans le tableur des validateurs.
//
// Usage : node mboa/tests/check-drafts.mjs <langue> <fichier.tsv|.txt> [autres fichiers…]
//   ex.  node mboa/tests/check-drafts.mjs dua ~/Téléchargements/cv-dua/validated_sentences.tsv
// Langues : ewo, dua, pcm (Common Voice : ewo, dua, wes).
// Sortie : mboa/validation/corpus-check-<langue>.json (lu par export-validation.mjs) + résumé.
// Le corpus lui-même n'est ni copié ni redistribué : seules des statistiques de mots sont gardées.
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const f of ['src/core/ns.js', 'src/core/entities.js', 'src/packs/phrases.js', 'src/packs/blocks.js']) vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'));
const M = globalThis.MBOA;

const [lang, ...files] = process.argv.slice(2);
if (!['ewo', 'dua', 'fub', 'pcm'].includes(lang) || !files.length) {
  console.error('Usage : node mboa/tests/check-drafts.mjs <ewo|dua|fub|pcm> <fichier.tsv|.txt> …');
  process.exit(1);
}

// Normalisation : minuscules, NFC, apostrophes unifiées. Variante « sans diacritiques »
// pour distinguer une faute de ton / d'accent d'un mot réellement inconnu.
const norm = (w) => w.normalize('NFC').toLowerCase().replace(/[’`ʼ]/g, "'");
// Variante « squelette » : sans tons ni accents, et orthographes concurrentes ramenées à une
// seule (ɛ / e̱ → e, ɔ / o̱ → o, ɓ → b, ŋ → ng), pour séparer une simple différence d'écriture
// d'un mot réellement inconnu.
const bare = (w) => norm(w).normalize('NFD').replace(/\p{M}/gu, '').replace(/ɛ/g, 'e').replace(/ɔ/g, 'o').replace(/ɓ/g, 'b').replace(/ŋ/g, 'ng').replace(/ə/g, 'e');
const wordsOf = (s) => (s.normalize('NFC').match(/[\p{L}\p{M}'’ʼ-]+/gu) || []).map(norm).map((w) => w.replace(/^['-]+|['-]+$/g, '')).filter((w) => /\p{L}/u.test(w));

// Lecture du corpus : colonne « sentence » d'un TSV Common Voice, sinon une phrase par ligne.
const freq = new Map(), freqBare = new Map();
let sentences = 0;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);
  const head = lines[0].split('\t');
  const col = head.indexOf('sentence');
  for (const line of lines.slice(col >= 0 ? 1 : 0)) {
    const s = (col >= 0 ? line.split('\t')[col] : line)?.replace(/\s+(\p{M})/gu, '$1'); // marques détachées : « o ̱ » → « o̱ »
    if (!s || !s.trim()) continue;
    sentences++;
    const ws = wordsOf(s);
    for (const w of ws) { freq.set(w, (freq.get(w) || 0) + 1); freqBare.set(bare(w), (freqBare.get(bare(w)) || 0) + 1); }
    // Certains corpus coupent un mot après une marque diacritique (« mo̱ ni » pour « mo̱ni ») :
    // on ajoute aussi le mot recollé, comparé seulement sous sa forme squelette.
    for (let i = 0; i + 1 < ws.length; i++) if (/\p{M}$/u.test(ws[i].normalize('NFD'))) { const j = bare(ws[i] + ws[i + 1]); freqBare.set(j, (freqBare.get(j) || 0) + 1); }
  }
}

// Mots du français / de l'anglais sources : un mot identique dans le brouillon est un emprunt
// (« Frais », « Confirmation »), signalé à part.
const entries = [...M.phrases, ...M.blocks];
const report = {};
let checked = 0, unknown = 0, tone = 0, loans = 0;
for (const e of entries) {
  const t = e.t?.[lang];
  if (!t) continue;
  const srcWords = new Set([...e.fr, ...e.en].flatMap(wordsOf));
  const res = { unknown: [], tone: [], loan: [] };
  for (const w of new Set(wordsOf(t.replace(/\{\d+\}/g, ' ')))) {
    checked++;
    if (freq.has(w)) continue;
    if (srcWords.has(w) || /^(sms|pin|code|otp|frais|bank|service|client|transaction|connexion|confirmer|confirmation|référence|sécurité|bloqué|demande|validée|tournure|brouillon|test|jury)$/.test(w)) { res.loan.push(w); loans++; continue; }
    if (freqBare.has(bare(w))) { res.tone.push(w); tone++; continue; }
    res.unknown.push(w); unknown++;
  }
  if (res.unknown.length || res.tone.length || res.loan.length) report[e.id] = res;
}

const out = { lang, corpus: 'Common Voice (CC0)', sentences, distinctWords: freq.size, date: new Date().toISOString().slice(0, 10), report };
const dest = path.join(root, 'validation', `corpus-check-${lang}.json`);
fs.writeFileSync(dest, JSON.stringify(out, null, 1));
const pct = (n) => (checked ? Math.round((100 * n) / checked) : 0) + ' %';
console.log(`${lang} : ${sentences} phrases réelles, ${freq.size} mots distincts.`);
console.log(`Mots de nos brouillons vérifiés : ${checked}`);
console.log(`  jamais vus dans le corpus : ${unknown} (${pct(unknown)})`);
console.log(`  vus seulement avec une autre écriture (tons, accents, ɛ/e̱…) : ${tone} (${pct(tone)})`);
console.log(`  emprunts au français / à l'anglais : ${loans} (${pct(loans)})`);
const top = Object.entries(report).filter(([, r]) => r.unknown.length).slice(0, 15);
for (const [id, r] of top) console.log(`  · ${id} : ${r.unknown.join(', ')}${r.tone.length ? ` | accents : ${r.tone.join(', ')}` : ''}`);
console.log(`Rapport : ${dest}`);
