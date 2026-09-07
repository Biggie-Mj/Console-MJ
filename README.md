# ENCOUNTER — Console MJ D&D 5e V2.5

ENCOUNTER V2.5 reprend la V2.2 et ajoute une couche d'**automatisation D&D 5e** pensée pour le jeu sur iPad en paysage. La clé de sauvegarde locale reste `encounter-console-v1` afin de conserver la compatibilité avec les versions précédentes.

## Nouveautés V2.5

### 13. Conditions avec durée
- États D&D avec durée **indéfinie**, **nombre de tours**, **jusqu'au début du prochain tour**, **jusqu'à la fin du prochain tour** ou **sauvegarde en fin de tour**.
- DD et caractéristique de sauvegarde configurables.
- Source / note optionnelle.
- Une condition identique appliquée une seconde fois remplace son ancienne occurrence plutôt que de se cumuler.
- Les immunités aux états structurées empêchent automatiquement l'application de la condition.
- Quand une sauvegarde de fin de tour est configurée et que la fiche possède les modificateurs nécessaires, ENCOUNTER peut lancer directement le jet.

### 14. Rappels de début et fin de tour
- Bloc **À ne pas oublier** sur la créature active.
- Fin automatique des conditions arrivant à échéance.
- Rappels de sauvegarde de fin de tour.
- Traits personnalisés pouvant être marqués **rappel début de tour** ou **rappel fin de tour** dans l'éditeur.

### 15. Résistances et immunités structurées
- Champs séparés : vulnérabilités aux dégâts, résistances aux dégâts, immunités aux dégâts et immunités aux états.
- La barre rapide peut recevoir un type de dégâts.
- ENCOUNTER applique automatiquement immunité, résistance ou vulnérabilité lorsqu'elle est structurée sans ambiguïté.
- Les restrictions conditionnelles complexes restent volontairement textuelles afin de ne pas appliquer une réduction erronée.

### 16. Recharges automatisées
- Les capacités **Recharge X–Y** deviennent indisponibles après utilisation.
- Au début du prochain tour de la créature, le d6 de recharge est lancé automatiquement.
- Le résultat est affiché dans les rappels et consigné dans le journal.
- Un test manuel reste disponible si le MJ veut forcer/vérifier une recharge.

### 17. Actions légendaires contextualisées
- À la fin du tour d'une autre créature, ENCOUNTER détecte les boss capables d'agir.
- Une fenêtre propose leurs actions légendaires disponibles et affiche les points ★ restants.
- Le coût est déduit automatiquement.
- Les points légendaires sont restaurés au début du tour du boss.

### 18. Actions de repaire
- Un profil peut contenir des actions de repaire et une initiative de repaire, par défaut 20.
- À l'ajout du boss, une option permet d'ajouter automatiquement le repaire dans l'initiative.
- Le repaire perd les égalités d'initiative, conformément au fonctionnement usuel des actions de repaire.
- Une seule action de repaire peut être consommée à son passage ; elle redevient disponible au passage suivant.

### 19. Multiattaques
- Nouveau type de capacité **Multiattaque**.
- Syntaxe de séquence simple : `Morsure*2;Griffe*1`.
- Un clic lance tous les jets d'attaque et de dégâts configurés et produit un résumé dans le journal.
- Les profils SRD Malfrat et Vétéran ainsi que la Fausse Hydre de démonstration utilisent déjà ce système.

### 20. Boss et phases améliorés
- Seuils de PV automatiques.
- Transition de phase détectée lors des dégâts.
- Fenêtre de transition visible.
- Une phase peut modifier CA, vitesse, réserve d'actions légendaires et ajouter résistances/immunités.
- La fiche affiche le nombre de PV restant avant la prochaine transition.

## Ergonomie supplémentaire demandée

- **Action / Action bonus / Réaction** : trois marqueurs colorés visibles et cliquables.
- L'utilisation d'une capacité marque automatiquement l'économie d'action correspondante ; un marqueur peut toujours être réactivé manuellement, utile par exemple pour Sursaut d'activité.
- Les capacités consommant une économie d'action déjà utilisée deviennent indisponibles jusqu'à réactivation ou prochain tour.
- Les personnages possédant leurs caractéristiques complètes peuvent lancer un **test de caractéristique** ou un **jet de sauvegarde** contre un DD saisi par le MJ.
- Les modificateurs propres aux sauvegardes de Pik, Tuskhan, Wonq et Silas sont pris en compte.
- **Code couleur PV** sur les encadrés : vert > 75 %, vert-jaune > 50 %, orange > 25 %, rouge ≤ 25 %, sombre à 0 PV.
- Correctif : **Ajouter PJ/PNJ → Annuler** ferme désormais toujours la fenêtre.
- Correctif : **Importer JSON → Annuler / ×** fonctionne même si aucun JSON n'a été saisi.
- Barre PV : les boutons rapides sont maintenant **1 / 5 / 10**. Le bouton **DÉGÂTS** ou **SOINS** détermine le sens de l'opération avant l'application.

## Profils inclus

La bibliothèque conserve Pik Ekrok, Tuskhan Sand d'Ivoire, Wonq, Silas Veyr, C.R.A.S.S.E.U.S.E., les monstres SRD déjà intégrés et les profils de démonstration. Les fiches utilisateur restent basées sur les dossiers fournis.

## Mise à jour depuis V2.2

1. Dans ENCOUNTER actuel, fais **Exporter JSON** par sécurité.
2. Décompresse le ZIP V2.5.
3. Sur GitHub, remplace à la racine : `index.html`, `styles.css`, `app.js`, `builtins.js`, `README.md`.
4. Remplace également le dossier `data/` si tu l'utilises comme bibliothèque JSON externe.
5. Conserve ou remplace `LICENSE-SRD.txt` : son contenu reste compatible.
6. Fais **Commit changes**.
7. Recharge ton adresse GitHub Pages. Si Safari garde l'ancienne version en cache, ferme l'onglet puis rouvre le site.

La sauvegarde locale reste compatible avec les versions V1/V2.x. Les données personnalisées existantes sont conservées et les nouveaux champs sont ajoutés par migration au chargement.

## Attribution SRD 5.1

Les profils marqués **SRD 5.1 · CC-BY-4.0** sont adaptés du Document de Référence du Système 5.1 français.

> Ce travail comprend la documentation tirée du Document de Référence du Système 5.1 (« SRD 5.1 ») par Wizards of the Coast LLC et disponible à l'adresse https://dnd.wizards.com/fr/resources/systems-reference-document. Le SRD 5.1 est distribué en vertu de la licence Creative Commons Attribution 4.0 International disponible à l'adresse https://creativecommons.org/licenses/by/4.0/legalcode.fr.

ENCOUNTER est un outil non officiel de table. Les profils maison et les personnages fournis par l'utilisateur ne sont pas présentés comme contenus du SRD.
