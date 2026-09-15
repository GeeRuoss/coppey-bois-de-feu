# Coppey Bois de feu : état de la V1

15 septembre 2026. Aperçu local : http://127.0.0.1:8816/.

## Réalisé

- Cinq pages statiques : accueil, bois et rangement, livraison, demande WhatsApp, confidentialité. Page 404 dédiée.
- Identité issue directement des tracés du PDF client : logo complet, emblème, trois bûches et veinage. Versions brun #3f3625 et crème #c7a987. Aucun logo redessiné.
- Six photos sélectionnées parmi les 37 retouches Lightroom, chacune en trois tailles WebP. Filtre d’affichage commun : légère tonalité ambrée, saturation réduite et contraste doux. Les JPEG sources restent intacts.
- Calculateur de stères estimés selon le rangement et la longueur de bûche (25, 33 ou 50 cm). Transfert des dimensions et de la longueur vers la demande, avec mention estimation à confirmer. Voir calcul-steres.md.
- Formulaire : prénom, localité, longueur souhaitée, quantité, période et précisions. Message relu avant ouverture de WhatsApp, copie de secours, validation des champs. Pas de transmission avant l’action du visiteur, pas de réservation automatique, pas de stockage de formulaire.
- Numéro des bâches utilisé : +41 79 290 34 93. Activation WhatsApp de ce numéro à confirmer avec le client.
- Domaine principal confirmé par Guillermo : https://coppeyboisdefeu.ch. Canoniques et sitemap préparés, données Organization limitées aux faits disponibles. Aucun faux avis ni adresse locale inventée.
- Étude concurrentielle et plan SEO 90 jours dans etude-seo.md. Questionnaire client dans questions-client.md.

## Vérifications réalisées

- Les cinq pages vérifiées à 320, 390, 768 et 1440 px : pas de débordement horizontal, un seul H1 par page, aucun fichier image manquant observé.
- Captures visuelles : accueil bureau et petit téléphone, formulaire bureau et téléphone, menu mobile, outil de rangement.
- Formulaire vide bloqué. Message préparé avec accents, esperluette et signe pourcentage : contenu décodé identique à l’aperçu et numéro de destination correct. Aucun message de test envoyé.
- Modification des dimensions : calcul exact et reprise des dimensions dans la demande.
- Menu mobile : ouverture, fermeture par Échap, retour du focus au bouton. Contenu de fond rendu inerte pendant l’ouverture.
- Syntaxe JavaScript vérifiée, références locales des pages vérifiées, SVG et sitemap XML valides. Repli sans JavaScript revu dans le code : formulaire inactif, contact téléphonique disponible.
- Il s’agit de contrôles dans le navigateur intégré et de tailles émulées. Aucun test sur téléphone physique ni mesure de classement Google réalisée.

## À finaliser

1. Stolzl : identifiée dans le PDF et disponible officiellement sur Adobe Fonts. Le navigateur attend la connexion de Guillermo afin de créer le projet web. CSS préparée pour Stolzl ; police de secours temporaire tant que l’intégration officielle n’est pas obtenue. Voir police-stolzl.md pour les sources et conditions web.
2. Compléter les réponses client : produits, essences, état du bois, prix, unités, stock, zone réelle de livraison, accès et modalités. Les formats visibles dans le formulaire sont des souhaits, pas un catalogue confirmé.
3. Confirmer identité légale et adresse, activation du numéro WhatsApp, éventuelle fiche Google, conditions de la prestation et mentions de l’hébergeur choisi.
4. Publication GitHub Pages autorisée le 15 septembre 2026, dépôt désormais public. Version de présentation : https://geeruoss.github.io/coppey-bois-de-feu/. Domaine métier à raccorder ultérieurement. Le miroir de présentation reste en noindex,nofollow ; les canoniques du domaine métier sont conservées. Le sitemap n’a pas été soumis.

## Fichiers de livraison

Seul `dist/` est destiné à l’hébergement. `medias/`, `docs/`, `tmp/` et les scripts sont les sources et documents de travail, hors publication. Le site ne dépend d’aucune bibliothèque JavaScript externe.

Les pages secondaires partagent le générateur `scripts/generate-pages.py`, qui reprend l’en-tête et le pied de page de `dist/index.html`. Après une modification de navigation, lancer ce script pour la reporter. Le filtre photo se règle dans `dist/style.css`.

## Bulle WhatsApp, 15 septembre 2026

Bouton flottant brun et crème en bas à droite des cinq pages. Invitation après 5 secondes, une fois par session via un repère sessionStorage sans données du formulaire. Fermeture par croix ou Échap ; le lien ouvre WhatsApp avec un message générique au numéro des bâches. Le widget se masque pendant la saisie ou le menu mobile, et diffère l’invitation pendant une vidéo volontaire ou un onglet masqué. Repli sans JavaScript : lien direct disponible.

Vérifications locales : apparition différée, fermeture et bouton restant, absence de réapparition à la page suivante, masquage pendant saisie et menu, rendu à 320/390 px et sur ordinateur, absence de débordement. Destination du lien vérifiée, aucun message envoyé. Page Confidentialité mise à jour pour le repère de session.
