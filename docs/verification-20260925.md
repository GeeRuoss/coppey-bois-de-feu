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
