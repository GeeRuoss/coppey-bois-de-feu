# Calculateur de stères 3D, 20 octobre 2026

## Parcours

Sur l’accueil, deux actions : commander du bois ou calculer ses stères. Le calculateur est utilisable directement sous le premier écran. Le même composant est présent sur la page Stères & formats. Exemples « Petit coin », « Rangement moyen » et « Grande réserve », curseurs et saisie exacte des dimensions, trois points de vue du volume, repère humain de 1,70 m. La quantité estimée et les dimensions passent dans le préparateur WhatsApp existant ; aucun envoi automatique.

## Volume et calcul

Le volume géométrique est largeur × profondeur × hauteur, en mètres cubes empilés. La conversion en stères reprend les facteurs métier existants : 0,6 pour 25 cm, 0,7 pour 33 cm et 0,8 pour 50 cm. La livraison se fait en vrac ; le résultat reste une estimation à confirmer.

Le modèle contient trois faces projetées depuis de vraies dimensions en mètres. L’échelle reste fixe pendant les changements de dimensions : le volume grandit réellement à l’écran, comparé à la silhouette. Le bouton de vue change l’angle de projection. Dessin SVG léger et textures vectorielles, sans bibliothèque ni service externe. Les motifs représentent une réserve de bois et ne garantissent pas un nombre exact de bûches.

Sur mobile, la visualisation accompagne les réglages ; elle est compacte sur écran court et cesse d’être collante pendant la saisie numérique pour laisser la place au clavier. La bulle de contact se masque pendant l’utilisation du calculateur. Les nombres sont bornés à la plage de chaque curseur ; une saisie vide ou hors limites est normalisée à la sortie du champ. Les commandes sont utilisables au clavier et les résultats sont annoncés aux aides techniques.

## Vérifications

- 1 × 1 × 1 m, bûches de 33 cm : 1 m³, environ 1,4 stère.
- Exemple moyen 2 × 0,5 × 1,5 m : 1,5 m³, environ 2,1 stères en 33 cm et 1,9 en 50 cm.
- Grande réserve 3 × 1 × 1,8 m : 5,4 m³, environ 7,7 stères. Transfert vérifié dans la demande et dans le message préparé.
- Maximum 4 × 1,5 × 2 m : 12 m³, environ 17,1 stères en 33 cm. 24 contrôles des trois vues, sur les deux pages et à 320, 390, 768 et 1440 px : pas de débordement de page ni de volume coupé.
- Largeur saisie à zéro : normalisée à 50 cm. Profondeur effacée : précédente dimension restaurée. Pas de résultat invalide.
- Les choix d’exemples et la rotation modifient effectivement le dessin ; les champs et curseurs restent synchronisés.
- Captures inspectées sur bureau, mobile et petit téléphone 320 × 640. Commandes tactiles, saisie et placement du volume contrôlés.
- Génération des 17 pages, liens du build, syntaxe JS et tests consentement Analytics réussis.

L’aperçu social de la page formats utilise le même SVG de volume, exporté depuis le calculateur avec l’exemple moyen. Son empreinte est contrôlée par le build ; la carte d’accueil reste la présentation générale du bois.

## Simplification du 20 octobre 2026

Les trois exemples et le bouton de rotation sont retirés. Le choix de longueur 25/33/50 cm devient un groupe de boutons radio visible en haut des réglages, avec chiffres agrandis et sélection brune pleine. Les calculs et le transfert vers la demande reprennent la longueur choisie. La vue isométrique est fixe ; elle grandit toujours avec les dimensions saisies. Les contrôles historiques ci-dessus décrivent la version initiale avec exemples et trois vues.

## Commande en stères entiers

À la demande de Guillermo, la quantité proposée est arrondie au stère entier le plus proche, avec un minimum de 1. L’estimation non arrondie à l’unité est affichée entre parenthèses, à deux décimales au plus. Le calcul du volume conserve sa précision avant l’arrondi commercial : aucun double arrondi. Quand la quantité entière exige plus de volume que le rangement saisi, une phrase indique le volume empilé à prévoir. Le formulaire reprend l’entier et l’estimation d’origine ; une saisie manuelle fractionnaire est arrondie et expliquée à la sortie du champ. Le mode façonnage conserve un volume libre, distinct d’une commande de bois livré. La silhouette et le repère 1,70 m sont retirés de l’interface et de la carte sociale.

## Contrôles de la version simplifiée

Accueil et page formats contrôlés aux largeurs réelles 320, 390, 768 et 1440 px : aucune image cassée, aucun débordement, choix 25/33/50 cm d’au moins 58 px de hauteur, exemples/rotation/silhouette absents. Sept cas d’arrondi vérifiés dans le navigateur : 2,5 → 3 ; 2,142857 → 2 ; 1,875 → 2 ; 1,49 → 1 ; 1,5 → 2 ; 2 → 2 ; 0,025 → 1. Le seuil 1,5 est stabilisé contre l’imprécision de virgule flottante. Indication du volume supplémentaire vérifiée pour les arrondis supérieurs. Transfert 3 stères/25 cm avec estimation 2,5 dans la demande et son message ; saisie manuelle 2,5 normalisée à 3, indication de l’arrondi conservée. En façonnage, un volume libre « 2,5 m³ » reste inchangé. Build, JS, consentement Analytics et cohérence de la carte sociale vérifiés.
