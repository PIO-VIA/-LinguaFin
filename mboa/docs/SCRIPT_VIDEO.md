# Vidéo de démonstration — 3 minutes

**Message à faire retenir** : *Mboa traduit sans jamais pouvoir changer un montant, et il le prouve.*

Tout se passe sur la plateforme officielle `https://safinum.cm/hackathon-test`, en **Ewondo** (langue de
Yaoundé, ville du salon). Si un membre de l'équipe parle mieux une autre langue, tournez dans celle-là :
le parcours est identique et le test officiel passe 16/16 dans les quatre langues.

| Temps | À l'écran | Voix off (à dire) |
|---|---|---|
| 0:00 – 0:12 | Maman Ngono, commerçante, devant Safinum Pay en français. Elle hésite sur le bouton « Confirmer ». | « Maman Ngono gère son commerce avec son téléphone. Mais l'application parle français, et sur un écran d'argent, une phrase mal comprise peut coûter cher. » |
| 0:12 – 0:25 | Installation de l'extension, puis la page de la banque, inchangée. | « Voici Mboa : une extension gratuite. Rien n'est modifié sur le site de la banque, aucun serveur, aucune donnée envoyée. » |
| 0:25 – 0:45 | Panneau Mboa → **Votre région : Centre** → la liste se réduit → bouton haut-parleur sur Ewondo (« Mbəmbə ámos ») → choix. La page bascule en Ewondo. | « Elle choisit sa région, écoute, reconnaît sa langue. Pas besoin de savoir lire le nom d'une langue. La page et toutes les suivantes passent en Ewondo. » |
| 0:45 – 1:10 | Solde, puis frais, puis bénéficiaire. Survol d'une phrase : l'original français apparaît. Bouton **Lire la page** : la voix lit en Ewondo. | « Solde, frais, bénéficiaire : tout est dans sa langue, et peut être lu à voix haute. Les montants, les noms et les numéros, eux, ne passent jamais par la traduction : ils sont verrouillés. » |
| 1:10 – 1:30 | Carte **Avant de confirmer** : montant, frais, total, bénéficiaire, coches vertes « total = montant + frais ». | « Avant de confirmer, Mboa refait le calcul lui-même et compare avec ce qu'elle a saisi. » |
| 1:30 – 1:50 | Panneau jury : **les frais sont falsifiés**. Alerte rouge immédiate, dans la langue, lue à voix haute. | « Si une page affiche des frais qui ne respectent pas le barème, ou un montant différent de celui saisi, Mboa l'alerte avant qu'elle confirme. » |
| 1:50 – 2:15 | Le jury tape une phrase **jamais vue** → traduite par assemblage, marquée « ≈ », montant intact. Puis une phrase avec un mot inconnu → « Pas encore traduit », mot manquant surligné. | « Une phrase jamais vue ? Mboa l'assemble à partir de morceaux relus. Et s'il lui manque un mot, il le dit et montre lequel : il n'invente jamais. » |
| 2:15 – 2:35 | Le jury injecte un SMS : « Vous avez gagné 500 000 FCFA, envoyez votre code PIN… » → alerte arnaque lue à voix haute. | « Le bouclier reconnaît les arnaques courantes au Cameroun, et prévient dans sa langue. » |
| 2:35 – 2:50 | Écran des preuves (voir ci-dessous). Bascule rapide Duala → Fulfulde → Pidgin → Original. | « Quatre langues, testées sur la plateforme du concours : zéro montant altéré. Un clic, et l'original revient. » |
| 2:50 – 3:00 | Maman Ngono confirme, sourire. Logo Mboa. | « Mboa. Ta banque, dans ta langue. » |

## Écran des preuves (2:35)

Un seul écran fixe, lisible en 5 secondes :

- **16/16** tests réussis sur safinum.cm, en Ewondo, Duala, Fulfulde et Pidgin
- **0** soumission compromise dans le journal du jury
- **0 fausse alerte** sur 360 messages légitimes réels (SMS d'opérateurs et messages ordinaires, jeu Stop Arnaque 237)
- **100 % hors ligne** — aucune donnée envoyée, aucun site modifié

N'ajoutez pas d'autre chiffre : chacun doit pouvoir être reproduit devant le jury
(`MBOA_LANG=ewo npm run e2e`, `npm run shield`).

## Préparation du tournage

- Lancer la démo : `npm run demo` (navigateur avec l'extension chargée), ou installer l'extension dans Chrome
  (*Extensions → Mode développeur → Charger l'extension non empaquetée → dossier `mboa`*).
- Avant de filmer : bouclier, guide et lecture des alertes **activés** ; langue sur « Original » pour pouvoir
  montrer le choix par région.
- Écran en 1080p, zoom du navigateur à 125 % pour que le texte reste lisible en vidéo.
- Enregistrer la voix off à part, au calme ; laisser audible la voix de synthèse de Mboa.
- Tourner chaque séquence séparément, puis monter : la vidéo ne doit pas dépasser **3:00**.

## À éviter

- Annoncer une statistique sans source (part de la population, etc.).
- Montrer une phrase dont la traduction n'a pas été relue par un locuteur de la langue filmée.
- Présenter la couverture comme totale : ce qui n'est pas traduit est volontairement laissé en original
  ou rendu en sens général, et c'est un argument de sûreté.
