# Vérification des brouillons contre de vrais textes

Les traductions Duala et Pidgin ont été comparées à des milliers de phrases écrites par des locuteurs.
Un mot de nos brouillons qui n'apparaît **jamais** dans ces textes est marqué « À VÉRIFIER EN PRIORITÉ »
dans la colonne *commentaire* des tableurs. Le reste n'est pas « validé » pour autant : seule une
relecture native valide une phrase.

| Langue | Corpus | Phrases | Mots de nos brouillons jamais vus | Autre écriture seulement |
|---|---|---|---|---|
| Duala | MT560 anglais–duala | 15 351 | 62 sur 516 (12 %) | 175 (34 %) |
| Pidgin camerounais | MT560 anglais–pidgin | 28 159 | 17 sur 536 (3 %) | 0 |
| Ewondo | — | — | non vérifié (aucun corpus ouvert) | — |
| Fulfulde | — | — | non vérifié (corpus sous licence restreinte) | — |

**Attention** : ces corpus sont presque entièrement **religieux** (publications des Témoins de Jéhovah).
Un mot financier peut y manquer simplement parce qu'on n'y parle pas d'argent mobile. Ils indiquent
des **pistes**, pas des vérités.

## Duala : les deux corrections les plus urgentes

| Notre brouillon | Sens | Ce que montrent les vrais textes | Où |
|---|---|---|---|
| **mwáó** | votre / ton | jamais vu ; on trouve **wa**, **ngo̱**, **lo̱** dans les phrases avec « your » | 17 phrases |
| **kɔ́ntɔ** | compte | jamais vu ; emprunt probable — à confirmer, ou terme local | 14 phrases |

## Duala : autres pistes du corpus

Mots Duala sur-représentés dans les phrases dont l'anglais contient le mot indiqué.
Ce sont des **indices** à soumettre aux locuteurs.

| Anglais | Notre brouillon | Indices du corpus |
|---|---|---|
| money | mɔ́ni | **mo̱ni** : même mot, écriture différente (o̱ pour ɔ) |
| send / sent | lóma | **loma**, lome, lomabe̱ : même mot ✔ |
| receive | kusa | **kusa**, kusino̱ : même mot ✔ |
| thank | Na som | **na som**, masoma : même mot ✔ |
| pay | sómba | **londise̱**, kakane̱ : à vérifier |
| wait | ɓéya | **jenge̱**, lisane̱ : à vérifier |
| number | nɔ́mba | **jita** (« nombre »), muso̱ : à vérifier |
| error | — | **diwuse̱**, mutudu |

**Écriture** : le corpus note les voyelles ouvertes « e̱ / o̱ » et n'écrit pas les tons ; nos brouillons
utilisent « ɛ / ɔ » avec tons. Les validateurs doivent choisir **une** écriture et l'appliquer partout.

## Pidgin

97 % des mots de nos brouillons existent dans les vrais textes. Correction déjà faite : **comot → komot**
(534 occurrences contre 0). Restent à voir : *charges* (0 occurrence), *anybody* (le corpus dit plutôt
*anyone* ou *any person*).

## Refaire la vérification

```bash
node mboa/tests/check-drafts.mjs dua chemin/vers/phrases.tsv
node mboa/tests/export-validation.mjs   # met à jour les tableurs
```

Avec un fichier `validated_sentences.tsv` de **Common Voice** (licence CC0), téléchargé gratuitement sur
Mozilla Data Collective, on peut faire la même vérification pour l'**Ewondo**, et compléter le Duala et le
Pidgin avec des phrases de la vie courante.

## Sources

- *English–Duala Parallel Dataset* et *English–Cameroon Pidgin Parallel Dataset*, michsethowusu, d'après
  OPUS MT560 — licence CC BY 4.0 :
  https://huggingface.co/datasets/michsethowusu/english-duala_sentence-pairs_mt560 ·
  https://huggingface.co/datasets/michsethowusu/english-cameroon-pidgin_sentence-pairs_mt560
- Seules des statistiques de mots sont conservées dans `corpus-check-*.json` ; les corpus eux-mêmes ne
  sont ni copiés dans le projet ni redistribués.
