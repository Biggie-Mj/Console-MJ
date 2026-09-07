# ENCOUNTER — Console MJ D&D 5e V3

ENCOUNTER V3 reprend la V2.5 et ajoute la couche **Confort Premium**, pensée en priorité pour l’iPad en paysage. La sauvegarde principale conserve la clé `encounter-console-v1` afin de migrer les données des versions précédentes.

## Nouveautés V3

- **PWA hors connexion** : `manifest.webmanifest`, service worker et icônes. Après une première visite en ligne, l’application peut être relancée hors connexion depuis l’écran d’accueil.
- **Rencontres sauvegardées** : préparer plusieurs combats, les charger, les modifier, les sauvegarder à nouveau ou les lancer directement.
- **Catégories et favoris** : étoile de favori, filtres PJ / compagnons / PNJ alliés / adversaires et étiquettes personnalisées.
- **Ciblage contextuel** : sélectionner une action met en évidence les cibles autorisées et atténue les autres. Attaques, sauvegardes et soins peuvent résoudre et appliquer directement les conséquences.
- **Backups automatiques** : jusqu’à 12 instantanés locaux, avec backup périodique et backups avant les opérations sensibles.
- **Corbeille** : profils, participants et rencontres supprimés peuvent être restaurés.
- **Densité Confortable / Compacte** : bascule depuis le menu `•••`.
- **18 compétences D&D 5e** : Athlétisme, Acrobaties, Escamotage, Discrétion, Arcanes, Histoire, Investigation, Nature, Religion, Dressage, Intuition, Médecine, Perception, Survie, Intimidation, Persuasion, Représentation et Tromperie. Les bonus finaux des PJ documentés intègrent maîtrise, expertise et Touche-à-tout lorsqu’ils s’appliquent.
- **Attaque supplémentaire / multiattaque progressive** : une action Attaquer n’est considérée comme consommée qu’après le nombre d’attaques prévu pour la créature. Une multiattaque guidée peut demander une cible différente à chaque étape.
- **Boss** : badge BOSS automatique si le profil possède des actions légendaires, option BOSS permanente dans l’éditeur et bouton BOSS par adversaire dans la préparation d’une rencontre.
- **Code couleur des rôles** en combat : PJ bleu, compagnon vert, PNJ allié violet, adversaire orange, boss rouge. Le code de couleur des PV reste indépendant.
- **Pop-up de résolution** : les actions résolues affichent pendant quelques secondes le même résumé que celui ajouté au journal.

## Fonctions V2.5 conservées

Conditions avec durée, rappels de début et fin de tour, résistances/vulnérabilités/immunités structurées, recharges automatiques, actions légendaires contextualisées, actions de repaire, multiattaques, phases de boss, marqueurs Action/Action bonus/Réaction, tests de caractéristiques et sauvegardes, code couleur des PV et barre rapide DÉGÂTS/SOINS.

## Mise à jour depuis V2.5 sur GitHub Pages

1. Dans la version actuelle, fais **Exporter JSON** par sécurité.
2. Décompresse le ZIP V3.
3. À la **racine** de ton dépôt GitHub, remplace `index.html`, `styles.css`, `app.js`, `builtins.js` et `README.md`.
4. Ajoute aussi les nouveaux fichiers PWA : `manifest.webmanifest`, `service-worker.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` et `.nojekyll`.
5. Conserve/remplace `LICENSE-SRD.txt` et le dossier `data/`.
6. Fais **Commit changes**, attends le déploiement GitHub Pages, puis recharge le site.

Pour iPad : ouvre ensuite le site dans Safari, utilise **Partager → Sur l’écran d’accueil**, puis ouvre ENCOUNTER depuis son icône. Le premier chargement doit être fait avec Internet pour remplir le cache hors connexion.

## Sauvegardes

- Les données courantes, rencontres sauvegardées et corbeille restent locales à l’appareil/navigateur.
- Les backups automatiques sont eux aussi locaux.
- **Exporter JSON** reste le backup portable à conserver avant une grosse mise à jour ou un changement d’appareil.

## Attribution SRD 5.1

Les profils marqués **SRD 5.1 · CC-BY-4.0** sont adaptés du Document de Référence du Système 5.1 français. L’attribution complète est conservée dans `LICENSE-SRD.txt`.

ENCOUNTER est un outil non officiel de table. Les profils maison et les personnages fournis par l’utilisateur ne sont pas présentés comme contenus du SRD.
