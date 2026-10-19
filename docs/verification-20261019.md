# Mise en page et Google, 19 octobre 2026

## Mise en page

Couleurs, pile de polices, logo et photographies conservés. Navigation compacte, conteneur 1200 px, titres et contrôles ramenés à une échelle régulière. Images à petits rayons identiques, familles de bois sans panneaux colorés. Bloc de parcours redondant retiré de l’accueil. Pied de page et appels à l’action réduits. Pages d’essences, livraison, calculateur et demande adaptés aux mêmes règles.

Contrôle avec Chrome à 320, 390, 768 et 1440 px sur les neuf pages : un H1 par page, pas de débordement horizontal, pas d’image chargée manquante. Inspection visuelle de l’accueil mobile et ordinateur, formats mobile et demande ordinateur. Menu mobile, fermeture Échap, retrait sans adresse, message WhatsApp et transfert de calculateur vérifiés sans envoi de demande réelle. Dimensions émulées, pas de téléphone physique.

## Google

Search Console : propriété domaine `sc-domain:coppeyboisdefeu.ch`, compte ruosscommunication@gmail.com, validation DNS réussie. Sitemap https://coppeyboisdefeu.ch/sitemap.xml envoyé. Ne pas retirer le TXT de validation Hostpoint.

Analytics : configuration d’un compte dédié préparée (Suisse, CHF, objectifs visites et demandes, partages facultatifs désactivés). Création en attente d’acceptation des conditions Google. Aucun ID de mesure inventé et aucune collecte active. L’identifiant public devra être inscrit dans data/analytics.json puis les pages régénérées et publiées.

Intégration prête : aucune requête Google avant consentement ; refuser aussi accessible qu’accepter, choix six mois et retrait via le pied de page. Seuls les chemins de pages et événements contact_whatsapp/contact_phone sont envoyés. Requêtes et fragments des URL supprimés. Ne pas activer les mesures améliorées automatiques du flux : les liens WhatsApp portent le contenu privé des demandes. Vérifier l’arrivée des événements dans le temps réel avant de déclarer Analytics opérationnel.

Test du consentement et de la minimisation : `node scripts/check-analytics.cjs` (environnement simulé). Syntaxe JS et build avec contrôle des chemins validés. Les tests navigateur du consentement réel restent à exécuter lorsque l’identifiant sera disponible.

## Extension SEO et Analytics

Huit nouvelles pages : hêtre/fayard, frêne, épicéa, mélèze, Verbier/Val de Bagnes, Sembrancher/Orsières, Martigny, préparation d’une intervention. Page de façonnage enrichie et section avec machine mise en avant sur l’accueil. Informations réelles, prix et déplacements sur demande. Pas d’agences locales inventées. Liens depuis les familles et le pied de page. Quarante contrôles supplémentaires à quatre largeurs : aucune anomalie détectée.

Compte Analytics dédié 412472369, propriété 559569890, flux Web 16159144503, identifiant G-2XMVF9QZ57. Conditions acceptées après accord contextuel du 19 octobre. Mesures améliorées désactivées pour protéger les paramètres des liens WhatsApp. Association Search Console créée. Activation dans la publication suivante ; contrôle réel du consentement et de la réception à consigner ci-dessous.

Recherche ciblée et PDF dans docs/seo-20261019, conservés localement.
