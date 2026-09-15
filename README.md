# Coppey Bois de feu

Dossier du site Coppey Bois de feu, constitué le 15 septembre 2026.

## Site et étude

- Aperçu local : http://127.0.0.1:8816/
- Site statique : `dist/` (cinq pages et une page 404).
- Domaine confirmé : `coppeyboisdefeu.ch`. Aucune publication effectuée.
- Étude SEO et concurrence : `docs/etude-seo.md`.
- Questions prêtes à transmettre au client : `docs/questions-client.md`.
- État détaillé, contrôles et points à confirmer : `docs/etat-du-site.md`.

La vraie identité des bâches est conservée. Le logo, son lettrage, les bûches et le veinage sont extraits en SVG. Stolzl est identifiée et son intégration officielle Adobe Fonts attend la connexion au compte ; une police de secours s’affiche en attendant.

## Photos

Les 37 photos retouchées dans Lightroom sont dans `medias/photos-retouchees/`, de `IMG_4452.jpg` à `IMG_4488.jpg`.

- JPEG, qualité d’export 100, pleine résolution, profil sRGB.
- Aucune donnée GPS détectée dans les métadonnées EXIF ou XMP.
- 24 photos en 8064 × 6048 px, 12 en 4032 × 3024 px et 1 en 4560 × 3420 px.
- Poids total : 824 763 538 octets, soit environ 824,8 Mo.
- Les 37 fichiers ont été décodés et vérifiés sans erreur.

L’inventaire des noms, dimensions et poids se trouve dans `medias/manifest-photos.csv`.
Les originaux retouchés restent sur le Mac et sont exclus de Git. Les photos WebP optimisées utilisées par le site sont versionnées dans `dist/assets/`. Les PDF sources des bâches restent également locaux.

## Logos

Les deux bâches fournies par Guillermo ont permis de récupérer les vrais tracés. `medias/sources-marque/` conserve les PDF et `medias/logos/` contient les SVG extraits : logo complet, emblème, bûches, variantes brun et crème, motif de veinage.

## Presets Lightroom

Deux presets ont été exportés depuis Lightroom dans `medias/presets/` :

- `Coppey-Chaleur-et-Couleur.xmp` : base colorée utilisée pour la série finale.
- `Coppey-Bois-chaleureux-Ombre.xmp` : première variante plus douce.

La série finale comporte aussi des corrections individuelles d’exposition et de balance des blancs dans Lightroom. Les JPEG exportés intègrent ces ajustements ; le preset seul ne les reproduit pas sur chaque photo.

## Travailler sur le site

Aucune installation de dépendances n’est nécessaire. `dist/` contient le site statique, dont le HTML de l’accueil, le CSS et le JavaScript sources. Il est volontairement versionné.

```sh
python3 scripts/generate-pages.py
python3 -m http.server 8816 --bind 127.0.0.1 --directory dist
```

Le générateur reprend l’en-tête et le pied de page de l’accueil pour les pages secondaires. La bulle WhatsApp et le calculateur de stères sont inclus. Les pages restent en `noindex,nofollow` pendant la préparation ; un push GitHub ne publie pas le site.
