// Mesure du bouclier sur des messages réels du Cameroun (Stop Arnaque 237, CC BY 4.0).
// node mboa/tests/shield-eval.mjs [--details]
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const f of ['src/core/ns.js', 'src/core/entities.js', 'src/core/shield.js']) vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'));
const M = globalThis.MBOA;
const dir = path.join(root, 'tests/fixtures/stop-arnaque-237');
const L = (f) => fs.readFileSync(path.join(dir, f), 'utf8').split('\n').filter(Boolean).map(JSON.parse);

export function evaluate(rows) {
  const m = { tp: 0, fp: 0, fn: 0, tn: 0, fps: [] };
  for (const r of rows) {
    const s = M.shield.scoreText(r.text), pred = s.level === 'high', gold = r.label === 'scam';
    if (pred && gold) m.tp++; else if (pred) { m.fp++; m.fps.push(r.text); } else if (gold) m.fn++; else m.tn++;
  }
  m.precision = m.tp / Math.max(1, m.tp + m.fp);
  m.recall = m.tp / Math.max(1, m.tp + m.fn);
  return m;
}
export const sets = () => ({
  train: L('messages-train.jsonl'),
  test: L('messages-test.jsonl'),
  genuine: L('genuine_messages.jsonl').map((r) => ({ text: r.message_text, label: 'not_scam' })),
});

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const S = sets();
  const pct = (x) => (100 * x).toFixed(0) + ' %';
  for (const [name, rows] of [['réglage (train)', S.train], ['test (jamais vu au réglage)', S.test], ['vrais messages opérateurs', S.genuine]]) {
    const m = evaluate(rows);
    console.log(`${name.padEnd(30)} arnaques détectées ${m.tp}/${m.tp + m.fn} (${pct(m.recall)}) · fausses alertes ${m.fp}/${m.fp + m.tn}`);
    if (process.argv.includes('--details')) for (const t of m.fps) console.log('   FAUSSE ALERTE :', t.slice(0, 200));
  }
}
