# Note technique — Mboa

## 1. Problème et solution

Les interfaces financières camerounaises sont en français ou en anglais. Mboa est une extension de navigateur
qui s'ajoute à **n'importe quel** service existant, sans toucher à son code. Elle adapte les textes dans une
langue nationale et ajoute une couche de **sécurité active** : valeurs verrouillées, calculs vérifiés,
bouclier anti-arnaque, récapitulatif vocal et guide pas à pas.

## 2. Architecture

```
Page du service (inchangée)
  │  MutationObserver : contenu initial + contenu dynamique / injecté
  ▼
dom.js ── nœud texte ──► engine.translate()
                          ├─ entities.protect()  : montants, %, téléphones, comptes, références,
                          │                        dates, noms propres → jetons verrouillés {0},{1}…
                          ├─ mémoire d'intentions : recherche exacte par clé normalisée (FR + EN)
                          ├─ découpage en phrases : recherche phrase par phrase
                          ├─ contenu inédit       : intention annoncée + original intact (rien d'inventé)
                          └─ entities.verify()    : chaque valeur présente à l'identique, aucun chiffre ajouté
  │  écriture en place (texte seulement), original conservé en mémoire, attribut lang=ewo|dua|fub
  ▼
main.js ─► money.extractFacts() : libellés reconnus PAR LEUR SENS → valeur voisine (lecture seule)
        ─► money.checks()       : total = montant + frais ; frais = barème affiché ; montant > 50 % du solde
        ─► crossChecks()        : valeur saisie = valeur affichée au récapitulatif
        ─► shield.scoreText()   : 7 schémas d'arnaque ; shield.checkSite() : domaine imité, HTTP
        ─► ui.js (Shadow DOM)   : panneau, récapitulatif, billets FCFA, alertes, guide, info-bulles, voix
```

| Fichier | Rôle |
|---|---|
| `src/core/entities.js` | Verrouillage et réinjection des valeurs, contrat d'intégrité |
| `src/core/engine.js` | Traduction par intention, classification du contenu inédit |
| `src/packs/phrases.js` | Mémoire de phrases (≈ 90 intentions × 4 langues), libellés d'intention, interface |
| `src/core/money.js` | Lecture des montants, billets BEAC, vérifications indépendantes |
| `src/core/shield.js` | Détection d'arnaques et de sites imitant un service financier |
| `src/content/*` | DOM, voix, interface, orchestration |
| `studio/` | Validation linguistique, enregistrement audio natif, export et import de packs |

## 3. Intégration et indépendance

- **Aucun hook**, aucune API, aucun attribut `data-i18n` n'est requis : l'extension analyse la page telle qu'elle est.
- **Seuls les nœuds texte sont modifiés** : structure, styles, champs de saisie, valeurs et événements restent inchangés. Les données saisies ne sont jamais traduites.
- Les valeurs (montants, noms, téléphones, références) ne sont **jamais réécrites**. Le `textContent` de ces éléments reste identique octet pour octet, comme le vérifie le journal *Intègre / Compromis* du jury.
- Elle respecte `translate="no"`, `.notranslate`, `contenteditable` et `data-mboa-skip`.
- Le contenu dynamique est traité en 40 ms et l'original reste restaurable à tout moment (<kbd>Alt</kbd>+<kbd>Maj</kbd>+<kbd>O</kbd>).
- L'interface vit dans un **Shadow DOM** : zéro conflit CSS. La carte récapitulative choisit le coin qui ne masque aucun contrôle de la page.

## 4. Sécurité et confidentialité

- **Zéro réseau** : aucune requête, aucune permission d'hôte. Les seules permissions sont `storage` et `unlimitedStorage`.
- **Zéro collecte** : les valeurs lues (montant, nom…) restent en mémoire vive le temps de la page et ne sont ni stockées ni transmises. Seuls les réglages et les corrections du Studio sont stockés.
- **Contrat d'intégrité vérifié deux fois** : à la traduction, puis sur le texte exact écrit dans la page. En cas d'échec, le texte original est conservé et le rejet est comptabilisé dans le panneau.
- Une **alerte de sécurité n'est jamais affaiblie** : si elle est connue, elle est traduite avec un marqueur ⚠ renforcé ; si elle est inédite, l'intention « Alerte de sécurité » est annoncée et l'original est conservé.

## 5. Langues et méthode de validation

| Langue | Code | Zone | Statut |
|---|---|---|---|
| Ewondo | `ewo` | Centre, Sud (Yaoundé) | relu, validé |
| Duala | `dua` | Littoral (Douala) | relu, validé |
| Fulfulde (Adamaoua) | `fub` | Adamaoua, Nord, Extrême-Nord | relu, validé |
| Pidgin camerounais | `wes` | national | relu, validé |

**Méthode** (outillée dans le Studio) :
1. Double relecture native et indépendante. Une phrase n'est « validée » qu'avec l'accord des deux relecteurs.
2. Rétro-traduction orale par un troisième locuteur. Un écart sur une action, un montant ou une alerte la fait passer « à revoir ».
3. Test d'écoute avec cinq utilisateurs cibles : une compréhension inférieure à 4/5 la fait passer « à revoir ».
4. Traçabilité : le nom du validateur et la date sont enregistrés, et le pack exporté sert de preuve.
5. Garde-fous automatiques : le Studio refuse toute traduction qui perd un emplacement de valeur ou ajoute un chiffre.
6. Contrôle contre de vrais textes (`npm run check:drafts`) : chaque mot des brouillons est cherché dans des phrases
   écrites par des locuteurs — Common Voice 27.0 (CC0 ; Ewondo 883, Duala 1 003, Pidgin 999 phrases) et OPUS MT560
   (CC BY 4.0 ; Duala, Pidgin). Mots jamais vus : Ewondo 26 %, Duala 7 %, Pidgin 2 % ; ils passent en priorité dans
   les tableurs des validateurs (`validation/PISTES_CORPUS.md`). Seules des statistiques sont gardées : les corpus ne
   sont ni copiés dans le projet ni redistribués, et l'audio n'est pas utilisé.

## 6. Dépendances déclarées

Aucune bibliothèque tierce n'est embarquée. Mboa utilise les API standard du navigateur :
- DOM et MutationObserver ;
- Shadow DOM ;
- Web Speech API (synthèse vocale locale) ;
- MediaRecorder (Studio) ;
- `chrome.storage`.

Les tests et contrôles utilisent Node.js (`node:test`), Playwright 1.65.0 et web-ext 10.8.0 (`web-ext lint` de Mozilla :
0 erreur ; seul avertissement : Firefox ignore `service_worker` et lit `scripts`, déclarés tous deux exprès pour Chrome et Firefox).
Ces outils servent au développement uniquement et ne sont pas embarqués. Aucun `innerHTML` : les gabarits passent par
un analyseur inerte (`DOMParser`) et toutes les valeurs sont échappées.

Interface : icônes SVG au trait dessinées dans le style des jeux libres Lucide (ISC) et Heroicons (MIT), une seule famille,
sans emoji ; typographie IBM Plex Sans si elle est installée, sinon police du système (aucun téléchargement) ; thèmes
clair et sombre ; cibles tactiles de 44 px minimum. Captures : `npm run screens` (dossier `docs/captures/`).

Idées reprises du prototype LinguaFin (équipe, 2026), réécrites dans Mboa : parcours des Shadow DOM ouverts, détection
locale FR / EN, déclaration Firefox `data_collection_permissions: none`, contrôle `web-ext lint`, procédure Safari
(`docs/PORTAGE_SAFARI.md`).
Il n'y a **aucun modèle d'IA ni service externe**. La recherche préalable a montré que NLLB-200 ne couvre ni
l'Ewondo, ni le Duala, ni le Bassa. MMS (Meta) couvre la synthèse vocale du Fulfulde et du Yemba : c'est une piste
d'évolution, exécutable localement.

## 7. Pourquoi pas un traducteur en ligne gratuit ?

1. **Le règlement l'interdit à l'exécution** : « L'extension ne doit pas collecter, stocker ou transmettre les
   données affichées ». Envoyer le texte de la page (montants, noms, numéros) à un service en ligne enfreint cette règle.
2. **La couverture manque** (vérifié le 10/11/2026) : Google Traduction ne propose ni l'Ewondo, ni le Duala, ni le
   Bassa, ni le Pidgin camerounais. Seul le Fulfulde est disponible. NLLB-200 (Meta) ne couvre que le Fulfulde.
3. **Le risque de contresens financier** : un traducteur automatique peut modifier un montant ou affaiblir une alerte,
   ce que le jury classe comme défaut majeur.

**Et si l'on chiffrait les données ?** Le chiffrement (HTTPS) protège le trajet, pas la destination : pour traduire,
le serveur doit déchiffrer et lire le texte. Les données seraient donc quand même transmises et lues par un tiers.
Le chiffrement homomorphe (calculer sur des données chiffrées) n'est pas utilisable pour un modèle de traduction en
temps réel. La seule façon de ne rien transmettre est de ne rien envoyer : tout se fait sur l'appareil.

Les outils en ligne servent donc **uniquement en amont**, comme aide humaine à la rédaction (Fulfulde), jamais dans
l'extension. La qualité vient de la **validation native** (voir `validation/`).

## 7 bis. Phrases jamais vues : composition par blocs (hors ligne)

Aucun modèle de traduction n'existe pour l'Ewondo, le Duala ou le Pidgin camerounais. Pour le contenu inédit, MBOA assemble donc la phrase à partir de **56 blocs relus** (`src/packs/blocks.js`) : sujets (« Votre transfert »), événements (« a échoué », « est en attente »), compléments (« de {montant} », « à {nom} », « le {date} ») et consignes (« Réessayez plus tard »).

Exemple : « Votre retrait de 12 500 FCFA a été annulé, contactez le service client. » donne en Fulfulde « ≈ Ittude ceede 12 500 FCFA haaytinaama, noddu service client. ».

Garde-fous, tous testés :
1. **Couverture totale** : si un seul mot n'appartient à aucun bloc, rien n'est composé. Le texte garde l'original, avec l'intention annoncée.
2. **Grammaire stricte** : sujet, compléments, événement, compléments ; ou consigne et compléments.
3. **Places typées** : un montant ne peut pas occuper la place d'un nom ou d'un téléphone.
4. **Polarité** : une phrase d'échec ou de refus, ou qui contient « ne… pas », ne peut être rendue qu'avec des blocs négatifs, et inversement. Un test vérifie que toutes les variantes d'un même bloc ont la même polarité.
5. **Contrat d'intégrité** : il s'applique comme pour les phrases connues.
6. **Transparence** : le texte est préfixé par « ≈ ». L'info-bulle indique « phrase nouvelle, assemblée à partir de blocs relus » et montre l'original.

Les blocs se valident dans le Studio et dans les tableurs, comme les phrases : ils y sont marqués « BLOC ». Une fois validés, chaque assemblage hérite de leur qualité.

## 7 ter. Bouclier mesuré sur de vrais messages, réglé pour zéro fausse alerte

Le bouclier est évalué sur **Stop Arnaque 237** (kadian-arch, CC BY 4.0, DOI 10.5281/zenodo.23287618) : arnaques réelles
signalées au Cameroun et vrais messages MTN, Orange et banques qu'elles imitent. La copie de test est dans
`tests/fixtures/stop-arnaque-237/` ; la mesure se relance avec `npm run shield`. Les règles ont été réglées sur la partie
« train » uniquement ; la partie « test » n'a servi qu'à la mesure.

| Jeu | Arnaques détectées | Fausses alertes |
|---|---|---|
| Réglage (train) | 25 / 69 (36 %) | **0 / 149** |
| Test (jamais vu au réglage) | 1 / 18 (6 %) | **0 / 31** |
| Vrais messages d'opérateurs | — | **0 / 180** |

Choix assumé : **une alerte n'est donnée que si plusieurs indices forts sont réunis** (par exemple : cadeau + formulaire,
ou cadeau + lien non officiel + montant). Un vrai reçu d'opérateur, même avec une publicité en pied de message, ne
déclenche que les règles « code secret », « faux agent » et « transfert par erreur ». Une version antérieure détectait
18 % des arnaques mais signalait à tort de vrais reçus MTN (précision 53 %) : elle a été abandonnée.

Ce que le bouclier **ne peut pas** voir dans le seul texte : les faux reçus de transfert copiés mot pour mot (seul le
numéro de l'expéditeur les trahit) et les fausses offres d'emploi sans demande d'argent ni lien. Les signaler ferait
sonner l'alerte sur de vraies annonces : ils sont volontairement laissés de côté.

Les sites : l'alerte « imitation » n'est donnée que sur une page qui **demande un code ou un mot de passe**, et compare
le nom du domaine sans l'extension de pays (`orange.fr` n'est pas une imitation d'`orange.cm`).

## 7 quater. Détection de langue et traduction automatique

- **Langue de la page** : vote local sur les mots-outils français et anglais (`src/core/detect.js`), avec l'attribut
  `lang` de la page en appui. Une page ni française ni anglaise n'est pas touchée. Pour les applications web qui se
  remplissent après le chargement, la détection est relancée pendant 20 secondes.
- **Langue de l'utilisateur** : reprise des réglages du navigateur (`ewo`, `dua`, `ff`/`fub`, `wes`/`pcm`) ; sinon
  demandée une seule fois. Elle s'applique ensuite à toutes les pages, sans autre action.
- **Exclusion** : un interrupteur « Ne pas traduire ce site » dans le panneau.

## 7 quinquies. « Pourquoi ce n'est pas traduit »

Pour chaque texte laissé en original, le moteur calcule la raison (`engine.diagnose`) :
- **mots manquants** : les mots absents de toutes les phrases et de tous les blocs validés (noms propres, marques et
  sigles exclus). Ils sont surlignés sur la page avec l'API *CSS Custom Highlight*, qui colore du texte **sans modifier
  le DOM**, et listés au survol et dans le panneau ;
- **tournure non validée** : tous les mots sont connus, mais l'assemblage n'a pas encore été relu.

Ces listes restent en mémoire vive de l'onglet : rien n'est stocké ni envoyé. `npm run audit:missing -- <url>` donne la
même liste pour une page entière, afin d'enrichir les blocs avec les validateurs.

## 8. Limites connues

- Le Fulfulde n'a pas pu être comparé à un corpus ouvert (aucun sous licence libre) ; sa qualité repose sur la relecture.
- Le contenu inédit est assemblé par blocs quand c'est possible ; sinon il est rendu en **sens général** (intention et original), avec la liste des mots manquants. C'est un choix de sûreté assumé.
- Le bouclier privilégie zéro fausse alerte : il manque une partie des arnaques (faux reçus, fausses offres d'emploi sans demande d'argent).
- Les Shadow DOM **fermés** et les cadres d'autres domaines (`iframe`) restent inaccessibles, par conception des navigateurs.
- La voix de synthèse lit les langues nationales avec une approximation phonétique française. Les enregistrements natifs du Studio la remplacent.
- La lecture des « faits » (montant, frais, total) repose sur les libellés connus de la mémoire. Un service aux libellés très différents désactive les vérifications sans rien casser.
- Chrome pour Android n'accepte pas d'extensions : il faut utiliser Firefox pour Android, Edge ou Kiwi.
