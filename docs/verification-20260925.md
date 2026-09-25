# Vérifications du 25 septembre 2026

## Fonctionnement et rendu

36 contrôles de pages/largeurs : neuf pages à 320, 390, 768 et 1440 px. Aucun débordement, image chargée cassée ou erreur JavaScript observé. Captures du navigateur inspectées sur téléphone et bureau. Validation, préremplissage, transfert des stères, conflit résineux/grosses bûches, conservation de quantité manuelle, retrait, façonnage, menu et bulle différée vérifiés. Ouverture WhatsApp interceptée dans le test, sans envoi réel.

Contrastes des couleurs principales : brun/fond clair 10,66:1 ; brun/crème 5,35:1 ; texte secondaire/fond clair 5,90:1.

## Chargement local, profil mobile

Mesures avec Chrome headless : écran 390 × 844, DPR 2, processeur ralenti ×4, débit descendant 1,6 Mbit/s, latence 150 ms, cache vide. Une exécution par page ; mesure de laboratoire avec PerformanceObserver, pas un score Lighthouse ni une mesure des visiteurs réels.

| Page | LCP | CLS | Ressources transférées |
| --- | ---: | ---: | ---: |
| Accueil | 2,85 s | 0 | 510 ko |
| Stères & formats | 0,89 s | 0 | 131 ko |

La couverture mobile a été allégée et une taille intermédiaire de 800 px ajoutée. Le premier essai de l’accueil donnait 6,23 s : le poids des images constituait le principal ralentissement. Les originaux du client sont conservés.

Le build GitHub Pages vérifie les références des pages et images, y compris les srcset. JavaScript et diff contrôlés. Le miroir reste non indexable jusqu’au raccordement du domaine métier.

## Renforcement de la structure et animations

45 contrôles de mise en page après ajout des titres gras, du fond de navigation et des parcours illustrés : neuf pages à 320, 390, 768, 1024 et 1440 px, sans débordement, image chargée manquante ni erreur JavaScript. Captures inspectées de l’accueil, livraison, familles, formats, formulaire, étapes de commande et sections finales sur mobile et bureau ; navigation à 768 px.

Contrôles fonctionnels : demande WhatsApp et calculateur conservés, préremplissage depuis les pages de bois, menu mobile et bulle. Les nouveaux accès de demande pointent vers le formulaire existant ; prix et disponibilité sont confirmés par Coppey. Aucun paiement ni commande automatique ajouté.

Animations : révélation au défilement, accès au lien par le clavier, préférence de mouvement réduit au chargement et modifiée en cours de visite, visibilité sans JavaScript. Les blocs déjà visibles au chargement et le formulaire ne sont pas masqués. Impression avec contenu visible.

Mesure mobile locale dans les mêmes conditions de laboratoire : accueil LCP 2,87 s, CLS 0, environ 515 ko transférés ; formats LCP 0,97 s, CLS 0, environ 136 ko. Aucune bibliothèque d’animation ajoutée.

## Dernières finitions : façonnage, séchage et photos

24 contrôles ciblés sur accueil, bois, livraison et façonnage aux largeurs 320, 390, 768, 1023, 1024 et 1440 px. Pas de débordement ni erreur JavaScript observée. Menu compact, lien unique vers le façonnage, retour au menu bureau lors du redimensionnement et ouverture du formulaire en mode intervention vérifiés. Captures mobile/bureau inspectées pour les trois nouvelles photos, le bloc séchage et le menu. Chemins des variantes d’images et build GitHub Pages vérifiés.
