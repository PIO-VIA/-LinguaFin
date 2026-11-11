* [ ] 

# Mboa — ta banque dans ta langue

Extension de navigateur qui rend **n'importe quel service financier en ligne** compréhensible en
**Ewondo, Duala, Fulfulde et Pidgin camerounais**, sans modifier le code du service, **100 % hors ligne** et
**gratuite** (aucun serveur, aucune API payante, aucune donnée envoyée).

Mboa ne se contente pas de traduire. Elle **protège** l'utilisateur.

|                                                  | Ce que fait Mboa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **Montants verrouillés**               | Montants, frais, numéros, références et noms sont retirés du texte *avant* la traduction puis réinjectés à l'identique. Un contrat d'intégrité refuse toute sortie qui perd ou ajoute un seul chiffre.                                                                                                                                                                                                                                                                                                                  |
| 🧮 **Calculs vérifiés**                  | Mboa recalcule elle-même `total = montant + frais` et les frais selon le barème affiché. Toute incohérence déclenche une alerte rouge, dans la langue de l'utilisateur.                                                                                                                                                                                                                                                                                                                                                     |
| 🪞 **Saisi = affiché**                    | Le montant, le nom et le numéro saisis sont comparés au récapitulatif. Une valeur modifiée en route est signalée.                                                                                                                                                                                                                                                                                                                                                                                                             |
| 🛡 **Bouclier anti-arnaque**               | Il détecte localement les demandes de code PIN, les faux gains contre un clic ou un formulaire, les « transferts par erreur », les menaces de blocage, les faux agents, les faux recrutements « sur instruction du Président », les schémas de Ponzi et les sites imitant MTN, Orange ou une banque. **Réglé pour zéro fausse alerte**, mesuré sur de vrais messages camerounais (*Stop Arnaque 237*) : 0 fausse alerte sur ses 180 vrais messages d’opérateurs et sur tous les messages authentiques du jeu. |
| 🌐 **Automatique**                         | La langue de chaque page est détectée (français ou anglais) et la page est traduite d'office, ainsi que toutes les suivantes. La langue de l'utilisateur est reprise du navigateur s'il y est réglé, sinon demandée **une seule fois**. Une page dans une autre langue n'est pas touchée ; un site peut être exclu en un clic.                                                                                                                                                                                       |
| 🔎 **« Pourquoi ce n'est pas traduit »** | Une phrase non traduite garde son original, et Mboa **dit pourquoi** : les mots absents du dictionnaire validé sont surlignés sur la page (sans modifier son code) et listés au survol, ou bien la tournure est signalée comme pas encore validée.                                                                                                                                                                                                                                                                      |
| 🧾 **« Avant de confirmer »**            | Un récapitulatif dans la langue choisie, avec des **billets FCFA illustrés** et une **lecture à voix haute**.                                                                                                                                                                                                                                                                                                                                                                                                       |
| 👉 **Guide pas à pas**                    | Il entoure le prochain bouton ou la case à cocher, avec une consigne dans la langue choisie.                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 🎧 **Choisir en écoutant**                | Chaque langue dit sa salutation à voix haute (« Mbəmbə ámos », « Jam waali »…) : on choisit la langue qu'on **comprend**, sans avoir à lire. Les voix natives enregistrées dans le Studio remplacent la synthèse.                                                                                                                                                                                                                                                                                                |
| 🔊 **Voix**                                | Lecture de la page, des alertes et du récapitulatif. Les enregistrements de locuteurs natifs remplacent la synthèse dès qu'ils existent.                                                                                                                                                                                                                                                                                                                                                                                        |
| 💬 **Original au survol**                  | L'original reste toujours accessible, et chaque traduction indique son statut : *validé*, *brouillon* ou *sens général*.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 🆕 **Contenu inédit**                     | Une phrase inconnue est **assemblée à partir de blocs relus** quand c'est possible (marquée ≈), sinon elle n'est **jamais inventée** : Mboa annonce son intention (alerte, erreur, frais…) et garde l'original intact.                                                                                                                                                                                                                                                                                           |
| 📚 **Studio linguistique**                 | Les locuteurs natifs relisent, corrigent, valident (avec nom et date) et **enregistrent leur voix**, puis exportent le pack validé.                                                                                                                                                                                                                                                                                                                                                                                         |

## Installation (2 minutes)

**Chrome, Edge ou Brave**

1. Ouvrir `chrome://extensions` et activer le **Mode développeur**.
2. Cliquer sur **Charger l'extension non empaquetée** et choisir le dossier `mboa/`.

**Firefox, y compris Firefox pour Android**

1. Ouvrir `about:debugging#/runtime/this-firefox`.
2. Cliquer sur **Charger un module temporaire** et choisir `mboa/manifest.json`.
   Firefox 140 ou plus récent (Android : 142), car le manifeste déclare officiellement « aucune collecte de données ».

**Safari (macOS, iPhone, iPad)** : la conversion via Xcode est décrite dans [docs/PORTAGE_SAFARI.md](docs/PORTAGE_SAFARI.md). Cette procédure n'a pas encore été testée sur un Mac.

## Utilisation

- Cliquer sur la pastille **M** en bas à gauche de la page, puis choisir une langue.
- Raccourcis : <kbd>Alt</kbd>+<kbd>Maj</kbd>+<kbd>M</kbd> ouvre le panneau, <kbd>L</kbd> lit la page, <kbd>O</kbd> bascule entre original et traduction, <kbd>S</kbd> coupe la voix.
- <kbd>Alt</kbd> + clic sur un texte traduit le lit à voix haute.

## Tests

```bash
npm test          # tests unitaires du cœur (moteur, intégrité, bouclier, calculs)
npm run e2e       # parcours complet sur https://safinum.cm/hackathon-test?jury=1
npm run e2e:local # banque fictive : phrase inédite, Shadow DOM, arnaque, frais falsifiés
npm run e2e:auto  # mode automatique : aucune langue choisie, pages FR / EN / autre, mots manquants
npm run e2e:pages # popup et Studio
npm run shield    # bouclier mesuré sur Stop Arnaque 237 (messages réels, CC BY 4.0)
npm run audit:missing -- https://exemple.cm ewo   # mots qui bloquent la traduction sur une page
npm run lint:firefox  # contrôle officiel Mozilla (web-ext lint)
```

Le test de bout en bout s'appuie sur **les propres contrôles du jury** : « Vérifier l'étape maintenant »,
le journal *Intègre / Compromis* et la *Couverture*.

## Statut linguistique — à lire

Les textes **Ewondo, Duala et Fulfulde sont des brouillons** rédigés par l'équipe technique. Ils doivent être
validés par des locuteurs natifs dans le Studio avant toute démonstration publique : voir
[docs/NOTE_TECHNIQUE.md](docs/NOTE_TECHNIQUE.md#5-langues-et-méthode-de-validation). L'architecture garantit
l'intégrité financière quelle que soit la qualité linguistique : une traduction imparfaite ne peut jamais
modifier un montant.
