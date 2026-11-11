// Tests unitaires du cœur MBOA (Node ≥ 20) : node --test tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const f of ['src/core/ns.js', 'src/core/entities.js', 'src/core/detect.js', 'src/packs/phrases.js', 'src/packs/blocks.js', 'src/core/engine.js', 'src/core/money.js', 'src/core/shield.js']) {
  vm.runInThisContext(fs.readFileSync(path.join(root, f), 'utf8'), { filename: f });
}
const M = globalThis.MBOA;
const LANGS = ['ewo', 'dua', 'fub', 'pcm'];

test('chaque traduction conserve exactement les mêmes emplacements {n} que la source', () => {
  for (const p of M.phrases) {
    const srcSlots = new Set([...p.fr, ...p.en].map((s) => (s.match(/\{\d+\}/g) || []).sort().join()));
    assert.equal(srcSlots.size, 1, `${p.id}: variantes sources incohérentes`);
    const slots = [...srcSlots][0];
    for (const l of LANGS) {
      assert.ok(p.t[l], `${p.id}: traduction ${l} manquante`);
      assert.equal((p.t[l].match(/\{\d+\}/g) || []).sort().join(), slots, `${p.id}/${l}: emplacements différents`);
      assert.ok(!/\d/.test(p.t[l].replace(/\{\d+\}/g, '')), `${p.id}/${l}: chiffre en dur dans la traduction`);
    }
  }
});

test('pas de clé source dupliquée avec un sens différent', () => {
  const seen = new Map();
  for (const p of M.phrases) for (const s of [...p.fr, ...p.en]) {
    const k = M.engine.sourceKey(s);
    if (seen.has(k) && seen.get(k).t.pcm !== p.t.pcm) assert.fail(`clé « ${k} » : ${seen.get(k).id} vs ${p.id}`);
    seen.set(k, p);
  }
});

test('valeurs financières : jamais traduites, jamais modifiées', () => {
  for (const v of ['250 000 FCFA', '+237 6 99 12 34 56', 'SAF-2026-K3J9QX', 'CM 001 2345 6789 01', 'Nov 5, 2026', 'Jean-Paul Mbarga', 'Amina Ngo Bell', '-15 000 FCFA', 'FCFA', 'Marie']) {
    for (const l of LANGS) {
      const r = M.engine.translate(v, l);
      assert.ok(r === null || r.kind === 'value', `${v} (${l}) ne doit pas être traduit : ${JSON.stringify(r)}`);
    }
  }
});

test('barème de frais traduit avec valeurs recopiées à l’identique (fr et en)', () => {
  for (const l of LANGS) {
    const a = M.engine.translate('Frais de 1,5 % (min. 100 FCFA, max. 2 500 FCFA)', l);
    assert.equal(a.kind, 'exact');
    for (const v of ['1,5 %', '100 FCFA', '2 500 FCFA']) assert.ok(a.out.includes(v), `${l}: ${v} absent de « ${a.out} »`);
    const b = M.engine.translate('1.5% fee (min. 100 FCFA, max. 2,500 FCFA)', l);
    for (const v of ['1.5%', '100 FCFA', '2,500 FCFA']) assert.ok(b.out.includes(v), `${l}: ${v} absent`);
  }
});

test('nom propre conservé dans une phrase connue', () => {
  const r = M.engine.translate('Bonjour, Amina Ngo Bell', 'fub');
  assert.equal(r.out, 'Jam waali, Amina Ngo Bell');
});

test('messages d’erreur et alertes de la plateforme reconnus', () => {
  const msgs = [
    'Le montant doit être supérieur à zéro.', 'Solde insuffisant pour effectuer ce transfert.',
    'Veuillez renseigner le nom et le numéro du bénéficiaire.',
    'Alerte de sécurité : vérifiez le numéro du bénéficiaire avant de continuer.',
    "Alerte de sécurité : ce bénéficiaire n'a jamais été utilisé sur ce compte.",
    'Erreur réseau : le service est temporairement indisponible. Réessayez.',
    'Vous devez confirmer les informations avant de valider le transfert.',
    'Security warning: this beneficiary has never been used on this account.',
  ];
  for (const m of msgs) for (const l of LANGS) assert.equal(M.engine.translate(m, l)?.kind, 'exact', `${m} (${l})`);
});

test('contenu inédit : intention annoncée, original intact, aucun chiffre inventé', () => {
  const s = 'Votre carte expirera le 12/12/2026, renouvelez-la en agence.';
  const r = M.engine.translate(s, 'ewo');
  assert.equal(r.kind, 'gist');
  assert.ok(r.out.endsWith(s));
  assert.equal(r.intent, 'error');
  const s2 = 'Un message important pour les clients de la banque.';
  assert.equal(M.engine.translate(s2, 'dua').intent, 'important');
});

test('contrat d’intégrité : rejette une sortie qui perd ou ajoute un chiffre', () => {
  const { tokens } = M.entities.protect('Envoyez 5 000 FCFA');
  assert.equal(M.entities.verify(tokens, 'Lóm 5 000 FCFA').ok, true);
  assert.equal(M.entities.verify(tokens, 'Lóm 50 000 FCFA').ok, false);
  assert.equal(M.entities.verify(tokens, 'Lóm 5 000 FCFA ×2').ok, false);
  assert.equal(M.entities.render('Lóm', tokens), null, 'valeur oubliée = rejet');
});

test('bouclier : arnaques détectées, conseils de sécurité légitimes ignorés', () => {
  const S = M.shield;
  assert.equal(S.scoreText('Envoyez-moi votre code PIN pour débloquer votre compte').level, 'high');
  assert.equal(S.scoreText("Je vous ai envoyé 50 000 FCFA par erreur, renvoyez-les svp").level, 'high');
  assert.equal(S.scoreText('URGENT : votre compte sera bloqué dans les 24h').level, 'high');
  assert.equal(S.scoreText('Félicitations vous avez gagné 1 000 000 FCFA, payez les frais de dossier de 5 000 FCFA').level, 'high');
  assert.equal(S.scoreText('Ne partagez jamais votre code PIN.').level, 'none');
  assert.equal(S.scoreText('Vérifiez toujours le nom et le numéro du bénéficiaire avant de confirmer un transfert.').level, 'none');
  const scam = M.engine.translate('Votre compte sera bloqué aujourd’hui même : envoyez votre code PIN au service client.', 'pcm');
  assert.equal(scam.intent, 'scam');
});

test('bouclier : domaines imitant un service financier', () => {
  const S = M.shield;
  const login = { financial: true, hasSecretField: true };
  assert.equal(S.checkSite({ hostname: 'mtn-momo-bonus.com', protocol: 'https:' }, login)[0]?.id, 'phishing');
  assert.equal(S.checkSite({ hostname: 'orangee.cm', protocol: 'https:' }, login)[0]?.id, 'phishing');
  // Pas de fausse alerte : même marque sur un autre pays, mot qui contient une marque, page sans code demandé.
  assert.equal(S.checkSite({ hostname: 'orange.fr', protocol: 'https:' }, login).length, 0);
  assert.equal(S.checkSite({ hostname: 'cuba-voyages.com', protocol: 'https:' }, login).length, 0);
  assert.equal(S.checkSite({ hostname: 'mtn-momo-bonus.com', protocol: 'https:' }, { financial: true }).length, 0);
  assert.equal(S.checkSite({ hostname: 'safinum.cm', protocol: 'https:' }, { financial: true }).length, 0);
  assert.equal(S.checkSite({ hostname: 'banque.example', protocol: 'http:' }, { hasSecretField: true })[0]?.id, 'insecure');
});

test('argent : lecture des montants et barème indépendant', () => {
  const { parseAmount, expectedFee, breakdown } = M.money;
  assert.equal(parseAmount('250 000 FCFA'), 250000);
  assert.equal(parseAmount('2,500 FCFA'), 2500);
  assert.equal(parseAmount('1,5'), 1.5);
  assert.equal(parseAmount('-15 000 FCFA'), -15000);
  const rule = { rate: 0.015, min: 100, max: 2500 };
  assert.equal(expectedFee(25000, rule), 375);
  assert.equal(expectedFee(1000, rule), 100);
  assert.equal(expectedFee(1e6, rule), 2500);
  assert.deepEqual(breakdown(25500).map((d) => [d.v, d.count]), [[10000, 2], [5000, 1], [500, 1]]);
});

test('anglais → français fonctionne aussi (page servie en anglais)', () => {
  assert.equal(M.engine.translate('Insufficient balance for this transfer.', 'fr').out, 'Solde insuffisant pour effectuer ce transfert.');
  assert.equal(M.engine.translate('Solde insuffisant pour effectuer ce transfert.', 'fr'), null);
});

// ——— Composition par blocs (phrases jamais vues) ———
test('blocs : emplacement {0} présent ssi un type de valeur est attendu, aucun chiffre en dur', () => {
  for (const b of M.blocks) {
    for (const s of [...b.fr, ...b.en]) assert.equal(s.includes('{0}'), !!b.slot, `${b.id}: source « ${s} »`);
    for (const l of LANGS) {
      assert.ok(b.t[l], `${b.id}: ${l} manquant`);
      assert.equal(b.t[l].includes('{0}'), !!b.slot, `${b.id}/${l}`);
      assert.ok(!/\d/.test(b.t[l].replace('{0}', '')), `${b.id}/${l}: chiffre`);
    }
  }
});

test('blocs : toutes les variantes d’un bloc ont la même polarité (échec / succès)', () => {
  for (const b of M.blocks) {
    const pol = M.engine.negOf(b.fr[0]);
    for (const s of [...b.fr, ...b.en]) assert.equal(M.engine.negOf(s), pol, `${b.id}: « ${s} »`);
  }
});

test('composition : phrase inédite traduite dans les 4 langues, valeurs intactes, marquée ≈', () => {
  const s = 'Votre transfert de 25 000 FCFA à Marie Ngono a échoué, veuillez réessayer plus tard.';
  for (const l of LANGS) {
    const r = M.engine.translate(s, l);
    assert.equal(r.kind, 'composed', l);
    assert.ok(r.out.startsWith('≈ '), l);
    assert.ok(r.out.includes('25 000 FCFA') && r.out.includes('Marie Ngono'), `${l}: ${r.out}`);
    assert.equal(r.intent, 'error');
  }
  for (const s2 of ['Paiement refusé : solde insuffisant.', 'Your payment has been declined.', 'Votre code expire dans 5 minutes.', 'Le service est momentanément indisponible, réessayez plus tard.'])
    assert.equal(M.engine.translate(s2, 'fub').kind, 'composed', s2);
});

test('composition : le moindre mot inconnu bloque l’assemblage (rien n’est deviné)', () => {
  for (const s of ['Votre transfert a réussi avec un bonus.', "Votre transfert n'a pas réussi.", 'Votre transfert a presque échoué.'])
    assert.notEqual(M.engine.translate(s, 'ewo')?.kind, 'composed', s);
});

test('composition : une valeur ne remplit que la place de son type', () => {
  // « à 25 000 FCFA » : un montant ne peut pas occuper la place d’un bénéficiaire.
  assert.notEqual(M.engine.translate('Votre transfert à 25 000 FCFA a échoué.', 'pcm')?.kind, 'composed');
  const r = M.engine.translate('Votre transfert de Paul Biya a été reçu.', 'pcm');
  assert.equal(r.kind, 'composed');
  assert.match(r.out, /from Paul Biya/);
});

test('un succès nié n’est jamais annoncé comme un succès', () => {
  assert.equal(M.engine.classify("Votre transfert n'a pas réussi."), 'error');
  assert.equal(M.engine.classify('The payment was not successful.'), 'error');
  assert.equal(M.engine.classify('Votre transfert a réussi.'), 'success');
});

test('détection locale FR / EN, rien pour une autre langue', () => {
  assert.equal(M.detect.detect('Votre transfert a été effectué avec succès.').lang, 'fr');
  assert.equal(M.detect.detect('Your transfer has been completed.').lang, 'en');
  assert.equal(M.detect.detect('Jam waali, ceede maa ina jokki').lang, null);
  // Texte déjà en langue locale : pas d'annotation « sens général » parasite.
  assert.equal(M.engine.translate('Mɔ́nə wɔ́ a nə́ ki tɛ̂lɛ, kǒbə́ fɛ́ ǒsú amu dzam dzi abɛ́ erreur', 'pcm'), null);
});

test('bouclier sur messages réels (Stop Arnaque 237) : ZÉRO fausse alerte, détection non régressive', async () => {
  const { evaluate, sets } = await import('./shield-eval.mjs');
  const S = sets();
  for (const k of ['train', 'test', 'genuine']) assert.equal(evaluate(S[k]).fp, 0, `fausses alertes sur ${k}`);
  assert.ok(evaluate(S.train).recall >= 0.35, 'détection en baisse sur le jeu de réglage');
  // Les arnaques ciblées restent détectées.
  for (const t of ['Félicitations! MTN – Cadeau 26e anniversaire. Participez à notre sondage spécial et gagnez 26 000 FCFA',
    'Cher client, veuillez confirmer votre numéro Orange pour activer vos données gratuites',
    'Investissez aujourd’hui : produit à 5 000 FCFA, revenu journalier 1 750 FCFA'])
    assert.equal(M.shield.scoreText(t).level, 'high', t);
});

test('phrase non traduite : on dit POURQUOI (mots manquants ou tournure), sans jamais modifier le texte', () => {
  M.engine.setPageLang('fr');
  const a = M.engine.translate('Votre transfert a réussi avec un bonus de parrainage.', 'ewo');
  assert.deepEqual(a.missing, ['bonus', 'parrainage']);
  assert.equal(a.reason, 'words');
  // Noms propres, marques et sigles ne sont pas des « mots manquants ».
  const b = M.engine.diagnose('Votre paiement a été envoyé à Jean-Paul Mbarga via Safinum Pay et MTN.');
  assert.ok(!b.missing.some((w) => /jean|mbarga|safinum|pay|mtn/.test(w)), JSON.stringify(b.missing));
  // Tous les mots connus mais assemblage non validé.
  assert.equal(M.engine.diagnose('Votre transfert a été effectué par Safinum Pay').reason, 'phrase');
  // Texte inédit sans intention : reste l'original, marqué « non traduit » avec sa raison.
  const c = M.engine.translate('Your cashback has been credited.', 'pcm');
  assert.equal(c.kind, 'untranslated');
  assert.equal(c.out, null);
  assert.deepEqual(c.missing, ['cashback']);
  M.engine.setPageLang(null);
});
