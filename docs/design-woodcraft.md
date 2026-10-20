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
- Le détouré est conservé pour le premier écran. Depuis le 20 octobre, les trois formats utilisent des illustrations SVG en perspective avec une section identique et une longueur proportionnelle, générées par `scripts/generate-log-illustrations.py`. Ce sont des illustrations, pas des photographies de produits mesurés.
- Carte d’accueil WhatsApp régénérée à partir du même visuel, avec une URL dérivée de son contenu.

## Contrôles

Six familles de pages vérifiées à 320, 390, 768 et 1440 px : accueil, catalogue, essence, formats, façonnage, demande. Aucun débordement horizontal, une H1 par page, aucune image chargée cassée. Captures inspectées de l’accueil complet mobile et bureau, du catalogue et du formulaire. Accueil également inspecté à 1280 × 720 ; menu mobile ouvert/fermé et sélection « Façonnage chez vous » testés sans envoyer de message. Tests consentement Analytics et minimisation des données réussis. Génération des 17 pages et validation des chemins du build réussies.

Lighthouse mobile local après optimisation du détouré : performance 94/100, accessibilité 100/100, LCP 3,1 s, CLS 0 et TBT 0 ms. Mesure de laboratoire sur serveur Python local, sans compression ni cache de production ; elle ne représente pas les données terrain des visiteurs.

## Harmonisation des pages internes et mouvement

Les pages internes partagent désormais une introduction en deux colonnes sur ordinateur et empilée sur mobile, des blocs sable, des arrondis et des tailles de lecture cohérentes. La page formats reprend les bûches détourées ; le calculateur et le formulaire ont été réorganisés sans changer leurs données. La fiche façonnage, les essences, les pages locales, les conseils et la confidentialité utilisent les mêmes composants. Les flèches décoratives restent supprimées.

La bûche de l’accueil flotte légèrement pendant une entrée de 4,6 secondes, puis réagit au pointeur sur les appareils équipés d’une souris. Le déplacement est borné à 8 px horizontalement et 6 px verticalement ; il se réinitialise à la sortie du pointeur ou du premier écran. Sur mobile, seule l’entrée discrète est active. La réduction des animations du système désactive le mouvement. La composition tablette place la bûche au-dessus des textes pour éviter tout recouvrement.

40 contrôles de structure sur dix familles de pages à 320, 390, 768 et 1440 px : pas de débordement, une H1, aucune image chargée cassée. Captures inspectées pour formats, façonnage, formulaire et accueil tablette/petit téléphone. Calculateur testé avec une largeur de rangement portée de 100 à 200 cm : estimation de 1,4 à 2,9 stères et lien de demande actualisé. Mode façonnage préselectionné vérifié. Mouvement au pointeur constaté ; durée limitée et styles de mouvement réduit vérifiés. Consentement Analytics testé par le contrôle du projet.

## Simplification des séparations et des actions

Suppression des filets horizontaux décoratifs : navigation, introductions, sections, cartes, formats, faits de séchage, FAQ et pied de page. Le bandeau récapitulatif sous l’accueil, redondant avec la navigation, est retiré. Les champs et les indicateurs de focus conservent leurs contours utiles. Les actions principales restent brunes pleines ; les actions secondaires et les anciens liens soulignés deviennent des boutons en pilule à contour brun. Les cartes cliquables conservent une seule destination et aucun lien n’est imbriqué dans un autre.

40 contrôles du rendu effectif sur dix familles de pages à 320/390/768/1440 px, largeur réelle mesurée dans chaque page : aucun débordement. Vérification des séparations supprimées sur les composants concernés et captures mobile/bureau inspectées.

## Illustrations des longueurs, 20 octobre 2026

Trois illustrations vectorielles originales remplacent le même détouré redimensionné dans les cartes 25/33/50 cm, sur l’accueil et sur la page formats. La section reste identique, l’extrusion mesure respectivement 105/138,6/210 unités et la perspective est commune. Veinage, cernes, écorce et ombre donnent le volume sans bibliothèque 3D. Les SVG pèsent environ 6,5 Ko chacun. Sur téléphone, l’accueil présente une illustration par ligne avec la longueur en regard. Le survol soulève légèrement les bûches ; le mouvement réduit désactive cet effet.

Le calculateur présente maintenant les longueurs en trois grands choix exclusifs avant les dimensions. Les exemples Petit coin/Rangement moyen/Grande réserve et le changement de vue ont été retirés à la demande de Guillermo ; la vue en volume reste fixe et se redimensionne avec les mesures.
