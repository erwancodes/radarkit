# RadarKit

Radar robotique open source.

RadarKit transforme une watchlist robotique ciblée en flux quotidien de signaux, stockés en Markdown dans Git. Le périmètre est volontairement court : pas de base de données, d’authentification, de panneau d’administration ou de clé IA obligatoire.

## Périmètre

- **B1 — Startups robotique & open source humanoïde**
- **B2 — World Models IA pour la robotique**

La robotique militaire, les jouets sans portée industrielle et les LLM généralistes sans lien robotique sont exclus.

## Démarrage local

```bash
git clone https://github.com/erwancodes/radarkit
cd radarkit
pnpm install
pnpm dev
```

Ouvre ensuite `http://localhost:3000`.

## Lancer la veille

Tester les flux sans écrire de fichier :

```bash
pnpm radar:now -- --dry-run
```

Écrire les signaux dans `content/news` :

```bash
pnpm radar:now
```

Le lecteur importe automatiquement les Markdown présents dans `content/news` au prochain build.

Chaque news est bloquée si elle ne possède pas une `source` et un `sourceUrl` HTTP(S) vers l’article officiel. Le lien **Article officiel** est disponible directement dans la liste et sur la page de chaque signal.

## Commandes

| Commande | Usage |
| --- | --- |
| `pnpm dev` | Démarrer le lecteur local |
| `pnpm typecheck` | Vérifier TypeScript |
| `pnpm test` | Lancer les tests du pipeline |
| `pnpm build` | Construire l’application |
| `pnpm validate:news` | Vérifier que chaque news possède une source et un lien officiel |
| `pnpm radar:dry-run` | Tester les flux sans écrire |
| `pnpm radar:now` | Lancer une collecte immédiate |

Voir le [README principal](README.md) pour les détails de contribution et de déploiement.
