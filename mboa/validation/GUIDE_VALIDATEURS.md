# Guide pour les validateurs — Mboa

Merci de nous aider ! Votre travail permet à des personnes de comprendre leur banque dans leur langue.
**Il faut 2 locuteurs natifs par langue** (Ewondo, Duala, Fulfulde, Pidgin). Comptez environ 2 heures par personne.

## Ce qu'il faut faire

1. Ouvrez votre fichier dans Excel ou Google Sheets : `mboa-validation-ewo.csv`, `-dua.csv`, `-fub.csv` ou `-pcm.csv`.
2. Pour chaque ligne, lisez la colonne **francais**, puis la colonne **brouillon**, qui est notre proposition.
3. Si le brouillon est juste et naturel, écrivez `valide` dans **statut**.
4. S'il est faux ou bizarre, écrivez la bonne phrase dans **correction**, puis `valide` dans **statut**.
5. En cas de doute, écrivez `a_revoir` dans **statut** et expliquez dans **commentaire**.
6. Mettez votre nom dans **relecteur_1**. Le second validateur met le sien dans **relecteur_2**, sans regarder les choix du premier.

Commencez par les lignes **1-CRITIQUE** : alertes, erreurs, montants, boutons « Confirmer ».

## Trois règles absolues

- **Ne touchez jamais** à `{0}`, `{1}`, `{2}`… Ce sont les montants, noms et numéros, que Mboa remet tels quels. Vous pouvez les déplacer dans la phrase, mais il faut garder chacun **une seule fois**.
- **N'écrivez aucun chiffre.** Les chiffres viennent uniquement de la banque.
- **Une alerte doit rester une alerte forte.** « Ne partagez jamais votre code PIN » ne doit jamais devenir un simple conseil.

## Les lignes « BLOC »

Certaines lignes ne sont pas des phrases entières, mais des **morceaux** que l'extension assemble pour traduire des messages qu'elle n'a jamais vus. Par exemple, « Votre transfert » + « de {0} » + « a échoué » + « veuillez réessayer plus tard ».

- Traduisez le morceau pour qu'il reste correct **quand on le colle** à d'autres morceaux : sujet, puis complément, puis ce qui arrive.
- Pour vérifier, lisez à voix haute 2 ou 3 assemblages possibles avec les morceaux voisins du tableur.
- Si un morceau ne peut pas se dire seul de façon naturelle, écrivez-le dans « commentaire ».

## Rétro-traduction (colonne retro_traduction_orale)

Une **troisième** personne lit la phrase validée **sans voir le français**, puis dit ce qu'elle comprend. Notez ce qu'elle dit.
Si le sens change (envoyer ou recevoir, confirmer ou annuler, montant, danger), mettez `a_revoir`.

## Mots empruntés au français

Les lignes marquées « emprunt » utilisent un mot français (Frais, Référence…). Si les gens de votre région disent
naturellement ce mot, gardez-le. S'il existe un mot local que tout le monde comprend, proposez-le.

## Pour le Fulfulde uniquement

Google Traduction propose le Fulfulde. Vous pouvez y comparer une phrase **à la main**, comme simple aide : votre jugement
de locuteur natif l'emporte toujours.

## Ensuite

Renvoyez le fichier rempli. Il s'importe en un clic dans le **Studio linguistique** de l'extension :
« Importer une feuille de validation ». Une phrase n'est marquée **validée** que si **deux relecteurs différents** l'ont
approuvée. Vous pouvez aussi enregistrer votre voix dans le Studio : bouton 🎙 sur chaque phrase.
