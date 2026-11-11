// Génère les feuilles de validation (CSV, séparateur « ; », UTF-8 avec BOM pour Excel).
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const f of ['src/core/ns.js', 'src/core/entities.js', 'src/packs/phrases.js', 'src/packs/blocks.js']) vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'));
const M = globalThis.MBOA;
const PRIO = (p) => (p.intent === 'block' ? (['pred', 'sent'].includes(p.kind) ? '1-CRITIQUE' : '2-IMPORTANT') : ['security', 'error'].includes(p.intent) || ['confirm', 'check', 'amount', 'fee', 'total'].includes(p.role) ? '1-CRITIQUE' : p.role || p.intent === 'transfer' ? '2-IMPORTANT' : '3-NORMAL');
const LOAN = /\b(frais|référence|confirmation|sécurité|confirmer|transaction|service|facture|courant|réseau|code|connexion|salaire|démonstration|test|brouillon)\b/i;
const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
const HEAD = ['id', 'priorite', 'intention', 'francais', 'english', 'brouillon', 'correction', 'statut (valide / a_revoir)', 'retro_traduction_orale', 'relecteur_1', 'relecteur_2', 'date', 'commentaire'];
for (const lang of ['ewo', 'dua', 'fub', 'pcm']) {
  const rows = [...M.phrases, ...M.blocks].sort((a, b) => PRIO(a).localeCompare(PRIO(b))).map((p) => {
    const note = [p.intent === 'block' ? `BLOC (${{ subj: 'sujet', pred: 'ce qui arrive', mod: 'complément', sent: 'consigne' }[p.kind]}) : se colle à d'autres blocs, ex. « Votre transfert » + « a échoué » ; doit rester correct quand on l'assemble` : '', LOAN.test(p.t[lang]) ? 'emprunt au français : proposer un terme local si naturel' : '', /\{\d\}/.test(p.t[lang]) ? 'garder {0} {1}… tels quels' : ''].filter(Boolean).join(' ; ');
    return [p.id, PRIO(p), p.intent, p.fr[0], p.en[0], p.t[lang], '', '', '', '', '', '', note];
  });
  const csv = '﻿' + [HEAD, ...rows].map((r) => r.map(q).join(';')).join('\r\n');
  fs.writeFileSync(path.join(root, 'validation', `mboa-validation-${lang}.csv`), csv);
  console.log(lang, rows.length, 'phrases,', rows.filter((r) => r[1] === '1-CRITIQUE').length, 'critiques');
}
