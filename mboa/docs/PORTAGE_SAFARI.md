# Porter Mboa sur Safari (macOS, iPhone, iPad)

Mboa est une WebExtension Manifest V3 standard, sans étape de build ni dépendance. Safari
accepte ce format, mais exige de l'emballer dans une petite application Xcode.
Procédure à faire sur un Mac (Xcode installé, compte Apple gratuit suffisant pour un test local).

## 1. Convertir

```bash
xcrun safari-web-extension-converter mboa/ --app-name "Mboa" --bundle-identifier cm.safinum.mboa --swift --copy-resources
```

L'outil crée un projet Xcode contenant l'extension (cibles macOS et iOS) et liste les clés
du manifeste que Safari ne gère pas.

## 2. Lancer

1. Ouvrir le projet généré dans Xcode, choisir la cible **macOS**, puis *Product › Run*.
2. Dans Safari : *Réglages › Avancées › Afficher les fonctionnalités pour les développeurs*,
   puis *Développement › Autoriser les extensions non signées* (à refaire à chaque lancement de Safari).
3. *Réglages › Extensions* : cocher **Mboa** et lui accorder l'accès aux sites voulus.
4. Pour iPhone / iPad : choisir la cible **iOS**, lancer sur l'appareil, puis
   *Réglages › Safari › Extensions › Mboa*.

## 3. Points à vérifier après conversion

| Élément | Comportement attendu dans Safari |
|---|---|
| `background.service_worker` + `scripts` | Safari utilise l'une des deux déclarations ; aucun code de fond critique (seulement raccourcis et ouverture du Studio). |
| `commands` (Alt+Maj+M/L/O) | Pris en charge sur macOS ; pas de clavier physique garanti sur iOS : le bouton flottant reste l'accès principal. |
| `chrome.storage.sync` / `local` | Pris en charge (l'espace `unlimitedStorage` sert aux enregistrements audio du Studio). |
| `speechSynthesis` | Disponible ; voix système de l'appareil. |
| `MediaRecorder` (Studio) | Disponible sur les versions récentes ; sinon l'enregistrement est simplement masqué. |
| Shadow DOM de l'interface | Pris en charge. |

## 4. Ce qui ne change pas

Aucune ligne du code de Mboa n'est spécifique à Safari : la même source sert Chrome, Edge,
Firefox (bureau et Android) et Safari. Aucun réseau n'est utilisé, sur aucune plateforme.

*Procédure non encore exécutée par l'équipe (pas de Mac disponible) : à valider avant d'annoncer Safari comme pris en charge.*
