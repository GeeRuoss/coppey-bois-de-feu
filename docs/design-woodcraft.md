# Refonte du 19 octobre 2026

Référence demandée : https://dribbble.com/shots/25721506-Woodcraft-Furniture-Website-Design (Amin Turki). Inspiration de composition : grand titre, produit détouré, fond clair, espaces généreux. Aucun média de la référence n’est réutilisé.

## Changements

Accueil recomposé avec une vraie bûche photographiée chez Coppey et détourée, cartes d’essences, présentation du façonnage avec la machine, formats et livraison. Couleurs et pile typographique conservées. Boutons, rayons, cartes, titres et navigation harmonisés dans les pages internes. Les 17 routes, les intégrations Analytics et les contenus SEO restent présents.

## Visuel

- Photo source : `dist/assets/bois-buche-1200.webp`.
- Outil : imagegen intégré, édition pour extraction de fond transparent.
- Exports : `dist/assets/buche-detouree-600.webp`, `dist/assets/buche-detouree-800.webp` et `dist/assets/buche-detouree-1200.webp`, alpha conservé, dimensions 600 × 400, 800 × 533 et 1200 × 800.
- Original détouré conservé localement dans le répertoire de génération, hors publication.
- Prompt : isoler uniquement la grande bûche fendue du premier plan ; retirer sacs, sangles, autres bois et arrière-plan ; conserver forme, veinage, face de coupe, échardes, couleurs naturelles et perspective ; transparence réelle ; ni texte ni nouvel objet. Seule une petite extrémité coupée pouvait être reconstituée.
- Les trois formats réutilisent le même détouré comme illustration ; ce ne sont pas trois photographies de mesures différentes.
- Carte d’accueil WhatsApp régénérée à partir du même visuel, avec une URL dérivée de son contenu.

## Contrôles

Six familles de pages vérifiées à 320, 390, 768 et 1440 px : accueil, catalogue, essence, formats, façonnage, demande. Aucun débordement horizontal, une H1 par page, aucune image chargée cassée. Captures inspectées de l’accueil complet mobile et bureau, du catalogue et du formulaire. Accueil également inspecté à 1280 × 720 ; menu mobile ouvert/fermé et sélection « Façonnage chez vous » testés sans envoyer de message. Tests consentement Analytics et minimisation des données réussis. Génération des 17 pages et validation des chemins du build réussies.

Lighthouse mobile local après optimisation du détouré : performance 94/100, accessibilité 100/100, LCP 3,1 s, CLS 0 et TBT 0 ms. Mesure de laboratoire sur serveur Python local, sans compression ni cache de production ; elle ne représente pas les données terrain des visiteurs.
