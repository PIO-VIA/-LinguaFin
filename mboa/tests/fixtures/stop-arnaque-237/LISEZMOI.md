# Stop Arnaque 237 — copie de test

Données : **Stop Arnaque 237: Cameroon Scam Reports Dataset**, version 1.0, par kadian-arch.
Source : https://huggingface.co/datasets/kadian-arch/stop-arnaque-237 · DOI https://doi.org/10.5281/zenodo.23287618
Licence : **CC BY 4.0** (https://creativecommons.org/licenses/by/4.0/). Copie non modifiée, convertie de Parquet en JSONL.

Usage : **tests uniquement** (mesure du bouclier, `tests/shield-eval.mjs`). Ces fichiers ne sont pas chargés par l'extension.

- `messages-train.jsonl` (218) : sert au réglage des règles.
- `messages-test.jsonl` (49) : jamais utilisé pour le réglage, sert à la mesure honnête.
- `genuine_messages.jsonl` (180) : vrais messages MTN / Orange / banques — aucune alerte tolérée.
