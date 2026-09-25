# Cartes de partage

Quatre cartes JPEG de 1200 × 630 px : accueil, livraison, stères/formats et façonnage. Logo SVG original et médias du projet, titre court. Les autres pages utilisent la carte d’accueil. Les images peuvent également être jointes manuellement à un message.

## Sources

- `data/media.json` définit la photographie principale commune à l’accueil et à sa carte.
- `data/partage.json` contient les titres, médias et correspondances de pages.
- `scripts/render-sharing.cjs` compose les cartes en HTML puis les exporte avec Playwright. Il nécessite Node et le module Playwright ; `CHROME_PATH` peut désigner un Chrome installé. Aucune dépendance de navigateur n’est chargée par le site public.
- `data/partage-manifest.json` conserve les fichiers, alternatives et empreintes. Les JPEG sont versionnés dans `dist/assets/`, avec un nom dérivé de leur contenu.
- `scripts/check-sharing.py` vérifie les sources et les images avant génération ou publication. Si une source change, regénérer les cartes puis les pages ; le build empêche de publier des aperçus périmés.

Avec Playwright disponible pour Node :

```sh
node scripts/render-sharing.cjs
python3 scripts/generate-pages.py
python3 scripts/build-pages.py
```

Le workflow GitHub Pages publie les JPEG déjà générés. Il n’installe pas de navigateur.

## Vérification et cache

Les métadonnées sont présentes dans le HTML initial, sans JavaScript. Sur GitHub Pages, les URLs Open Graph et images ciblent le site publié ; les canoniques restent préparées pour le domaine métier. Les variantes de page utilisent une vraie route, pas un fragment.

Contrôler les JPEG en grand et en petite vignette, leur accès HTTP et les métadonnées du HTML public. La création de ces cartes n’envoie aucun message. Les aperçus déjà envoyés peuvent rester dans le cache de WhatsApp ; une nouvelle URL avec un paramètre de version peut aider, sans garantie de rafraîchissement rétroactif. Le rendu dans une conversation WhatsApp n’a pas été directement observé.
