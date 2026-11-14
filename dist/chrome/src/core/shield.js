(() => {
  const M = globalThis.MBOA;
  const norm = (s) => M.util.stripDiacritics(String(s).toLowerCase()).replace(/[’`]/g, "'");

  const SECRET = "(code\\s*(pin|secret|otp|de confirmation|de validation|de verification|recu par sms)|\\bpin\\b|\\botp\\b|mot de passe|password|passcode|verification code)";
  const GIVE = "(envoy|communiqu|partag|donn|transmet|dict|send|share|give|tell|forward|read (it|out)|reply)";
  const ADVICE = /(ne\s+(le\s+|la\s+|les\s+)?(partagez|communiquez|donnez|transmettez|envoyez|divulguez)\s+jamais|jamais|never|n'est jamais|ne vous demandera|will never ask|do not share|don't share)/;

  const PHONE = String.raw`(\[phone[^\]]*\]|\+?\d[\d\s.-]{7,}\d)`;
  const AMOUNT = String.raw`(\d[\d\s.,]*\s?(f\s?cfa|fcfa|xaf|xof|cfa|frs?|francs?|euros?|go|gb|mo|mb|k)\b|\d+\s?000\b|(somme|montant) d'argent|amount of money|sum of money)`;
  const GIFT = String.raw`(gagn\w*|recevez|recevoir|recevront|obtenez|obtenir|offert\w*|gratuit\w*|cadeau|subvention\w*|prime\b|lots?\b|you (have )?won|win\b|claim|receive\b|free\b|gift|grant)`;
  const STRONG_CTA = String.raw`(remplissez|fill (in|out)|repondez a (ce|cette|notre)|participez a (ce|cette|notre)|sondage|questionnaire|survey|confirme[rz]? (votre|ton) numero|confirm your number|entrez votre numero|enter your (phone )?number|verifiez si votre nom|postulez maintenant)`;
  const CALL = String.raw`((appel(ez|er)|contactez|call|whatsapp|telegram)\D{0,25}${PHONE})`;
  const MASS = String.raw`(a tous les camerounais|chaque camerounais|tout le monde|tous les (anciens )?clients|all cameroonians|everyone)`;
  const SELECTED = String.raw`((selectionne|choisi)\w*(\(e\))?\s(parmi|among)|tire\w* au sort|parmi les rares|among the few)`;

  function linksOf(t) {
    const u = t.replace(/\[\.\]/g, '.').replace(/hxxp/g, 'http');
    const hosts = [...u.matchAll(/(?:https?:\/\/|www\.|\blink:?\s+|\blien\s+(?:ici\s+)?:?\s*)([a-z0-9-]+(?:\.[a-z0-9-]+)+)/g)].map((m) => m[1].replace(/^www\./, ''));
    return { any: hosts.length > 0 || /\b(cliquez|clique|click) (ici|here|sur le lien|on the link)|ouvre[sz]? ce lien|open (this|the) link|enter this link/.test(t), hosts };
  }

  const RULES = [
    { id: 'secret_request', test: (t) => (new RegExp(`${SECRET}.{0,60}${GIVE}|${GIVE}.{0,40}${SECRET}`).test(t)) && !ADVICE.test(t),
      fr: 'On vous demande votre code secret. Aucune banque ne le demande jamais.' },
    { id: 'fake_agent', test: (t) => /(agent|service client|conseiller|customer (care|service)|support).{0,60}(code|pin|otp|mot de passe|password)/.test(t) && !ADVICE.test(t),
      fr: 'Un « agent » qui demande votre code est un fraudeur.' },
    { id: 'refund_trick', test: (t) => /(par erreur|by mistake|erreur de (transfert|depot)|wrong (number|transfer)|par megarde).{0,120}(renvoy|rembours|retourn|send (it |the money )?back|refund|return)/.test(t),
      fr: '« Transfert par erreur, renvoyez l’argent » : arnaque classique. Vérifiez votre solde réel d’abord.' },
    { id: 'threat', test: (t) => /(urgent|immediatement|immediately|sous \d+ ?h|dans les \d+ ?h(eures)?|within \d+ ?hours?|aujourd'hui (meme|seulement))/.test(t)
        && /(sera (bloque|suspendu|ferme|desactive|supprime)|will be (blocked|suspended|closed|deactivated)|perdre (votre|ton) (compte|argent)|lose your (account|money))/.test(t),
      fr: 'Menace de blocage + urgence : technique de pression typique des arnaqueurs.' },
    { id: 'pay_to_receive', test: (t) => new RegExp(`(${GIFT}|recrut\\w*|emploi|stage|job|pret|loan|credit|interest|interet)[^]{0,220}(frais (d'inscription|de dossier|de retrait|de deblocage|de traitement|d'activation)|registration fee|processing fee|application fee|it's for the application|payez d'abord|pay first)`).test(t),
      fr: 'On vous demande de payer d’abord pour recevoir un gain, un prêt ou un emploi : arnaque.' },
    { id: 'gift_lure', test: (t, c) => new RegExp(GIFT).test(t) && (
          new RegExp(STRONG_CTA).test(t) ||
          (c.link && new RegExp(AMOUNT).test(t)) ||
          (new RegExp(CALL).test(t) && new RegExp(AMOUNT).test(t) && /(gagn|won|winner|prize|retirer)/.test(t)) ||
          (new RegExp(SELECTED).test(t)) ||
          (new RegExp(MASS).test(t) && new RegExp(AMOUNT).test(t))),
      fr: 'Argent ou cadeau « offert » contre un clic, un formulaire, un appel ou une confirmation de numéro : hameçonnage fréquent au Cameroun.' },
    { id: 'presidential_recruitment', test: (t) => /(recrut\w*|contractualisation|subvention)/.test(t) && /(tres hautes? instructions?|chef de l'etat|president (de la republique|paul biya)|paul biya)/.test(t),
      fr: 'Recrutement ou subvention « sur instruction du Président » diffusé hors canal officiel : arnaque très répandue.' },
    { id: 'ponzi', test: (t) => /(invest\w*|placement|produits?)/.test(t) && /(revenu journalier|gain journalier|daily (income|profit)|rendement garanti|guaranteed (return|profit)|doubl\w* votre argent|double your money)/.test(t),
      fr: 'Gain quotidien « garanti » : schéma de Ponzi.' },
  ];

  const RECEIPT = /(financial transaction id|transaction id|your new balance|votre nouveau solde|fee paid|fees? was|frais pay)/;
  const RECEIPT_RULES = new Set(['secret_request', 'fake_agent', 'refund_trick']);

  function scoreText(text) {
    const t = norm(text);
    const L = linksOf(t);
    const c = { link: L.any && !(L.hosts.length && L.hosts.every((h) => isOfficial(h))) };
    const receipt = RECEIPT.test(t);
    const reasons = RULES.filter((r) => (!receipt || RECEIPT_RULES.has(r.id)) && r.test(t, c)).map((r) => ({ ...r, level: 'high' }));
    return { level: reasons.length ? 'high' : 'none', reasons };
  }

  const KNOWN = [
    'mtn.cm', 'mtncameroon.net', 'orange.cm', 'orangemoney.orange.cm', 'afrilandfirstbank.com', 'ecobank.com',
    'bicec.com', 'ubagroup.com', 'societegenerale.cm', 'expressunion.net', 'cca-bank.com', 'campost.cm', 'safinum.cm',
  ];
  const BRANDS = ['mtn', 'orange', 'momo', 'afriland', 'ecobank', 'bicec', 'uba', 'expressunion', 'safinum', 'campost'];

  function lev(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++)
      for (let j = 1; j <= b.length; j++)
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }

  const isOfficial = (host) => KNOWN.some((k) => host === k || host.endsWith('.' + k));

  const nameOf = (host) => { const p = host.split('.'); return p.length >= 2 ? p[p.length - 2] : host; };

  function checkSite(loc, { hasSecretField = false, financial = false } = {}) {
    const host = (loc.hostname || '').toLowerCase().replace(/^www\./, '');
    const out = [];
    const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(host) || host.endsWith('.localhost') || host.endsWith('.test');
    if (!host || local || loc.protocol === 'chrome-extension:' || loc.protocol === 'moz-extension:') return out;
    if (loc.protocol === 'http:' && hasSecretField) out.push({ id: 'insecure', level: 'high' });
    if (!isOfficial(host) && hasSecretField && financial) {
      const name = nameOf(host);
      const near = KNOWN.find((k) => { const kn = nameOf(k); return kn !== name && kn.length >= 5 && lev(kn, name) <= (kn.length >= 8 ? 2 : 1); });
      const labels = host.split(/[.-]/);
      const brand = !KNOWN.some((k) => nameOf(k) === name) && BRANDS.find((b) => labels.includes(b));
      if (near || brand) out.push({ id: 'phishing', level: 'high', detail: near || brand });
    }
    return out;
  }

  M.shield = { scoreText, checkSite, isOfficial, RULES };
})();
