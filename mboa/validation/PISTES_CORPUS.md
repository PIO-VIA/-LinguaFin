# Vérification des brouillons contre de vrais textes

Les traductions Ewondo, Duala et Pidgin ont été comparées à des phrases écrites par des locuteurs.
Un mot de nos brouillons qui n'apparaît **dans aucun** de ces textes est marqué « À VÉRIFIER EN PRIORITÉ »
dans la colonne *commentaire* des tableurs. Quand seul l'accent ou le ton diffère, le tableur indique
l'écriture trouvée dans le corpus. Le reste n'est pas « validé » pour autant : seule une relecture
native valide une phrase.

| Langue | Corpus | Phrases | Mots de nos brouillons jamais vus | Autre écriture seulement |
|---|---|---|---|---|
| Ewondo | Common Voice 27.0 | 883 | 142 sur 546 (26 %) | 176 (32 %) |
| Duala | Common Voice 27.0 + MT560 | 16 354 | 37 sur 516 (7 %) — 12 % avec MT560 seul | 183 (35 %) |
| Pidgin camerounais | Common Voice 27.0 + MT560 | 29 158 | 13 sur 536 (2 %) — 3 % avec MT560 seul | 0 |
| Fulfulde | — | — | non vérifié (aucun corpus sous licence ouverte) | — |

**Prudence** : 883 à 1 003 phrases par langue dans Common Voice, c'est peu. Un mot financier peut y
manquer simplement parce que personne n'a écrit de phrase sur l'argent mobile. Le corpus MT560 est
presque entièrement **religieux**. Ces chiffres indiquent **où regarder d'abord**, pas ce qui est faux.

## Ewondo : première vérification

| Notre brouillon | Sens | Ce que montrent les vrais textes | Où |
|---|---|---|---|
| **mɔ́nə** | argent | jamais vu ; le corpus écrit **mɔni** (4 phrases, toutes sur l'argent) | 44 phrases |
| **kɔ́ntə** | compte | jamais vu ; emprunt probable — à confirmer, ou terme local | 14 phrases |
| **nɔ́mbâ** | numéro | jamais vu | 14 phrases |
| **mvaé** | bon, correct | jamais vu | 12 phrases |
| **ńtɛ̂k** | marchand / un peu / en cours | jamais vu, et employé avec trois sens différents dans nos brouillons : suspect | 8 phrases |

**Écriture** : le corpus Ewondo n'écrit presque **pas les tons** (77 mots tonés sur 9 363). Les tons de
nos brouillons ne sont donc ni confirmés ni contredits ; les validateurs doivent décider s'ils les gardent.

## Duala : correction d'une fausse alerte

Le premier contrôle (MT560 seul) marquait **mwáó** (votre) comme jamais vu. Common Voice, qui suit
l'Alphabet général des langues camerounaises comme nos brouillons, le contient **17 fois**, écrit
**mwáō**. Ce n'est donc pas un mauvais mot, seulement un ton à vérifier (ó ou ō).

| Notre brouillon | Sens | Écriture dans Common Voice | Remarque |
|---|---|---|---|
| mwáó | votre / ton | **mwáō** (17) | même mot, ton final différent |
| mɔ́ni | argent | **mɔní** (6) | même mot, ton déplacé |
| lóma | envoyer | **lómá** | ton final |
| ɓɛ́sɛ̃ | tout | **ɓɛ́sɛ̄** | tilde à remplacer par un macron |
| **kɔ́ntɔ** | compte | **jamais vu** dans aucun des deux corpus | 14 phrases — priorité n° 1 |
| nɔ́mba | numéro | vu seulement sans tons (MT560 propose aussi **jita**) | à vérifier |

Autres indices MT560 (corpus religieux) : *pay* → londise̱ / kakane̱, *wait* → jenge̱ / lisane̱,
*error* → diwuse̱ / mutudu.

## Pidgin

98 % des mots de nos brouillons existent dans les vrais textes. Correction déjà faite : **comot → komot**
(534 occurrences contre 0). Restent à voir : *charges* (0 occurrence), *anybody* (le corpus dit plutôt
*anyone* ou *any person*), *validate*, *refuse*, *process*.

## Refaire la vérification

```bash
node mboa/tests/check-drafts.mjs ewo cv-corpus-27.0/ewo/validated_sentences.tsv
node mboa/tests/check-drafts.mjs dua cv-corpus-27.0/dua/validated_sentences.tsv mt560-dua.tsv
node mboa/tests/export-validation.mjs   # met à jour les tableurs
```

Mettre en premier le fichier Common Voice : c'est son écriture qui est proposée dans les tableurs.

## Sources

- *Common Voice Scripted Speech 27.0* — Ewondo, Duala, Cameroon Pidgin, Mozilla Common Voice, via
  Mozilla Data Collective — licence **CC0 1.0**. Seul le texte des phrases a été lu ; l'audio n'a pas été
  conservé. Jeux de données décrits par Ngué Um E. et al. (2025), *Speech Technologies Datasets for
  African Under-Served Languages*, ComputEL-8, ACL.
- *English–Duala* et *English–Cameroon Pidgin Parallel Dataset*, michsethowusu, d'après OPUS MT560 —
  licence CC BY 4.0 :
  https://huggingface.co/datasets/michsethowusu/english-duala_sentence-pairs_mt560 ·
  https://huggingface.co/datasets/michsethowusu/english-cameroon-pidgin_sentence-pairs_mt560
- Les conditions de Common Voice interdisent de **rediffuser** les jeux de données et de chercher à
  **identifier les locuteurs**. Seules des statistiques sur les mots de nos propres brouillons sont
  gardées dans `corpus-check-*.json` ; aucune phrase des corpus n'est copiée dans le projet.
