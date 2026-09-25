# Coppey Bois de feu : état du site

Mise à jour du 25 septembre 2026. Publication : https://geeruoss.github.io/coppey-bois-de-feu/.

## Livraison

- Neuf pages : accueil, bois, feuillus, résineux, stères et formats, livraison, façonnage sur place, demande WhatsApp, confidentialité ; page 404 dédiée.
- Identité SVG extraite des bâches conservée. Brun #3f3625 et crème #c7a987, fond clair #f6f2eb pour renforcer le contraste. Navigation et boutons plus visibles.
- Nouvelle sélection parmi les photos du client, dont IMG_4455 en couverture avec cadrage spécifique au téléphone. Exports WebP responsifs, originaux intacts. Voir selection-photos.md.
- Informations transmises le 25 septembre intégrées : essences et origines, formats, grosses bûches réservées aux feuillus, séchage, humidité, vente au stère en vrac, accès remorque, rangement au temps passé, retrait, anticipation de la neige, paiements et intervention avec machine.
- Prix, disponibilités, zones et frais de livraison restent sur demande. Aucune adresse de dépôt, garantie de délai ou disponibilité du mélèze inventée.
- Page Stères & formats dans le menu principal, bloc dédié sur l’accueil et accès depuis la demande. Facteurs de volume confirmés par le client : 0,6 / 0,7 / 0,8 m³ empilé par stère selon 25 / 33 / 50 cm.
- Formulaire avec essence, format, quantité et adresse de livraison. Trois modes : livraison, retrait au dépôt, façonnage chez le client. Message visible avant ouverture de WhatsApp ; validation des champs utiles ; aucune commande ou message envoyé automatiquement.
- Le bouton WhatsApp flottant et l’invitation après 5 secondes restent présents. Le widget se masque pendant la saisie, le menu et lorsque le formulaire principal occupe l’écran.
- L’image de partage reprend la nouvelle couverture, avec une URL publique propre au miroir GitHub Pages.

## Vérifications

- Les neuf pages contrôlées à 320, 390, 768 et 1440 px : pas de débordement horizontal, un seul H1, aucune image chargée manquante et aucune erreur JavaScript observée.
- Captures inspectées de l’accueil, des formats et du formulaire sur ordinateur et téléphone ; contrôle de la présentation des familles de bois.
- Formulaire vide bloqué ; adresse requise pour livraison/intervention, exclue pour retrait. Message et URL WhatsApp identiques, destination +41 79 290 34 93. Le lien sortant de test est intercepté : aucun message envoyé.
- Conflit épicéa/grosses bûches corrigé automatiquement ; quantité manuelle conservée ; préremplissage essence, format et mode vérifié.
- Calculateur, transfert de dimensions, ancien paramètre de longueur, menu mobile et invitation différée vérifiés.
- Syntaxe JavaScript, liens et médias du build GitHub Pages vérifiés. Ces contrôles utilisent un navigateur isolé et des dimensions émulées ; pas de test sur téléphone physique ni de mesure de classement Google.

## Points restant à régler

1. Domaine coppeyboisdefeu.ch à raccorder. Le miroir GitHub Pages reste en noindex,nofollow ; canoniques et sitemap prévus pour le domaine métier. Le référencement public n’est pas activé.
2. Stolzl : intégration Adobe Fonts officielle toujours en attente. La police de secours reste utilisée ; aucun fichier commercial téléchargé sans licence.
3. Adresse exacte du dépôt, identité légale, fiche Google et éventuels détails opérationnels à compléter lorsqu’ils seront disponibles. Pas nécessaire pour préparer une demande de devis.

## Sources et génération

Données de référence dans data/entreprise.json. scripts/generate-pages.py génère toutes les pages et leurs composants communs ; scripts/contact-widget.html conserve le modèle du widget. CSS et JavaScript sources dans dist/. Seul le build dérivé de dist/ est publié ; documents et originaux ne sont pas servis par le site.
