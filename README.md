# Coppey Bois de feu

Dossier du site Coppey Bois de feu, constitué le 15 septembre 2026.

## Site et étude

- Aperçu local : http://127.0.0.1:8816/
- Site statique : `dist/` (neuf pages et une page 404).
- Version de présentation publiée sur GitHub Pages : https://geeruoss.github.io/coppey-bois-de-feu/
- Domaine prévu : `coppeyboisdefeu.ch`, pas encore raccordé.
- Étude SEO et concurrence : `docs/etude-seo.md`.
- Réponses client et derniers détails à préciser : `docs/questions-client.md`.
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
Les originaux retouchés restent sur le Mac et sont exclus de Git. Les photos WebP optimisées utilisées par le site sont versionnées dans `dist/assets/`. La sélection et les cadrages du 25 septembre sont documentés dans `docs/selection-photos.md`. Les PDF sources des bâches restent également locaux.

## Logos

Les deux bâches fournies par Guillermo ont permis de récupérer les vrais tracés. `medias/sources-marque/` conserve les PDF et `medias/logos/` contient les SVG extraits : logo complet, emblème, bûches, variantes brun et crème, motif de veinage.

## Presets Lightroom

Deux presets ont été exportés depuis Lightroom dans `medias/presets/` :

- `Coppey-Chaleur-et-Couleur.xmp` : base colorée utilisée pour la série finale.
- `Coppey-Bois-chaleureux-Ombre.xmp` : première variante plus douce.

La série finale comporte aussi des corrections individuelles d’exposition et de balance des blancs dans Lightroom. Les JPEG exportés intègrent ces ajustements ; le preset seul ne les reproduit pas sur chaque photo.

## Travailler sur le site

Aucune installation de dépendances n’est nécessaire. `dist/` contient le site statique, avec le HTML généré, le CSS et le JavaScript sources. Il est volontairement versionné.

```sh
python3 scripts/generate-pages.py
python3 -m http.server 8816 --bind 127.0.0.1 --directory dist
```

Le générateur produit toutes les pages depuis `data/entreprise.json` et ses composants communs. Le modèle de la bulle se trouve dans `scripts/contact-widget.html`. La page Stères & formats comprend le calculateur. La demande WhatsApp reprend le bois, le format, les stères et l’adresse ; elle distingue livraison, retrait et façonnage sur place. Les faits client ont été actualisés le 25 septembre 2026. La version GitHub Pages reste en `noindex,nofollow` pendant la préparation du domaine métier. Chaque push sur `main` publie automatiquement le contenu de `dist/`, après adaptation des chemins par `scripts/build-pages.py`. Les documents de travail et médias originaux ne font pas partie du site publié.
