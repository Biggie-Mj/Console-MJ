# ENCOUNTER — Console MJ D&D 5e V5 REBUILD

## Pourquoi cette V5 a été reconstruite

Cette V5 **ne reprend pas l’ancienne V5 défectueuse**. Elle repart directement du ZIP **V4.4 Sauvegardes Mort / Scroll / Undo** fourni comme base de référence. La bibliothèque, les fiches, le pavé PV, les PV temporaires, les sauvegardes contre la mort, la liste COMBAT scrollable, le ciblage, les groupes, les boss, les phases, les actions légendaires, les rencontres, les backups et le fonctionnement PWA de la V4.4 sont conservés.

La philosophie de cette reconstruction est volontairement prudente : **aucun élément V4.4 n’est masqué ou supprimé par défaut**. Les nouveautés V5 sont une couche ergonomique ajoutée par `v5.js` et `v5.css`, chargée après la base validée.

## V5 — Combat First, reconstruction sûre

- **Undo / Redo reconstruits** : l’historique des 30 dernières opérations est gardé en mémoire pendant la session. Cela évite de sérialiser des dizaines de copies de l’immense bibliothèque dans `localStorage`, qui pouvait saturer le stockage iPad et rendre Annuler inopérant. Le bouton du haut et celui du Journal utilisent le même moteur. `Rétablir` apparaît aux deux endroits.
- **État courant toujours persistant** : la rencontre, la bibliothèque et les réglages continuent d’être sauvegardés normalement dans `localStorage` et le miroir IndexedDB V4. L’historique Undo/Redo, lui, repart volontairement vide après un rechargement complet de l’application.
- **Filtres COMBAT non destructifs** : Tous / Blessés / États / Boss. Ils filtrent uniquement la colonne des participants et sont automatiquement neutralisés pendant un ciblage afin de ne jamais cacher une cible.
- **Sauvegardes contre la mort dans la liste** : les PJ et Felipe à 0 PV affichent directement leurs réussites/échecs dans leur carte, tout en conservant le panneau détaillé V4.4.
- **Raccourcis d’actions** : jusqu’à 4 actions favorites par profil via ☆/★. Si aucun favori n’est défini, ENCOUNTER propose simplement les premières actions utiles sans modifier la fiche complète.
- **Cible précédente visible** dans les raccourcis du tour. Le ciblage V4.4 reste le moteur réel ; les nouvelles indications sont uniquement ergonomiques.
- **Synthèse Boss** : phase actuelle, prochain seuil de PV et actions légendaires restantes sont rappelés dans une bande compacte, sans remplacer les contrôles de boss existants.
- **Mode Focus optionnel** : désactivé par défaut. Il réduit seulement les espacements pour les grands combats ; il ne cache aucune commande.
- **iPad paysage préservé** : liste COMBAT et fiche détaillée continuent à défiler indépendamment.

## Installation depuis la V4.4

1. Faire **Exporter JSON** dans la V4.4 par sécurité.
2. Décompresser ce ZIP V5.
3. Remplacer **tout le contenu du dépôt GitHub Pages à la racine** par les fichiers du ZIP, y compris les nouveaux `v5.js` et `v5.css`.
4. Faire **Commit changes**.
5. Attendre le déploiement GitHub Pages.
6. Ouvrir le site une fois avec Internet, puis fermer et relancer l’application installée sur l’iPad afin d’activer le nouveau cache PWA `encounter-v5-rebuild-1`.

La clé historique `encounter-console-v1` est conservée pour la compatibilité avec les données existantes.

---

## Historique V4.4 conservé

## Correctifs V4.4

- **Jets de sauvegarde contre la mort** pour les PJ et Felipe Dofil uniquement : à 0 PV, leur carte de combat est assombrie et un encadré dédié apparaît au-dessus de la fiche sélectionnée. Trois crânes de réussite et trois crânes d’échec sont suivis visuellement. Un clic ouvre un choix Réussi / Raté / Réussite critique / Raté critique. Les critiques ajoutent deux marqueurs comme demandé.
- **Retour à la vie immédiat** : dès que la créature repasse au-dessus de 0 PV, l’encadré disparaît et son suivi de sauvegardes contre la mort est réinitialisé. Les soins peuvent toujours cibler un PJ/Felipe à 0 PV.
- **Liste COMBAT scrollable sur iPad** : la colonne des participants devient une vraie zone tactile à défilement indépendant, même avec de grands groupes.
- **Undo unifié** : le bouton supérieur et celui du Journal utilisent désormais exactement la même routine et le même historique persistant.
- **Bouton crayon remonté** : l’édition d’instance se place dans la zone haute de la carte afin de ne plus recouvrir les PV.
- Cache PWA mis à jour en V4.4 pour forcer le rafraîchissement sur GitHub Pages/iPad.


## V4.3 — Bestiaire civil générique de village

Cette mise à jour ajoute **15 PNJ civils génériques** dans la catégorie **PNJ alliés**, avec le tag `Village` et des tags fonctionnels pour profiter des filtres de la bibliothèque. Les statblocks reprennent les valeurs fournies par l’utilisateur sans compléter silencieusement les paramètres absents. Les compétences non listées utilisent simplement le modificateur de leur caractéristique dans le moteur de tests ENCOUNTER.

Profils ajoutés :

1. Villageois — ND 0
2. Aubergiste robuste — ND 1/8
3. Artisan / Forgeron — ND 1/4
4. Marchand — ND 1/8
5. Guérisseur / Herboriste — ND 1/4
6. Prêtre rural — ND 1
7. Garde villageois — ND 1/2
8. Prévôt / Chef de milice — ND 2
9. Chasseur / Trappeur — ND 1
10. Éclaireur / Messager — ND 1/2
11. Berger / Dresseur — ND 1/4
12. Sage / Érudit — ND 1/4
13. Arcaniste local — ND 1
14. Larron / Contrebandier — ND 1
15. Bourgmestre / Notable — ND 1/2

Chaque fiche contient ses caractéristiques, compétences explicitement données, attaques, soins, actions bonus/réactions, aptitudes, usages par jour lorsqu’ils sont fournis, comportement et butin.

Cette version conserve l’ensemble de la V4 et étend fortement la bibliothèque intégrée avec la Compagnie Créole, Felipe Dofil et les profils de la session de Maharles fournis par l’utilisateur.

## Nouveaux PJ intégrés

- Nans Pointud — Humain, Barbare 10 (Berserker)
- Rufus « Le Renard » / Ruvius D. Medani — Humain, Roublard 10 (Assassin)
- Brack Mard — Nain, Guerrier 10 (Maître de Guerre)
- Samoth Drakhys — Demi-elfe, Ensorceleur 10 (Ascendance draconique d’argent)
- Kentaro Amane — Dhampire, Occultiste 10 (Lame Maudite)
- Zéphyr — Tieffelin, Paladin 10 (Serment de Conquête)

Chaque profil contient les caractéristiques, jets de sauvegarde, 18 compétences, PV/CA/initiative/vitesse, résistances et vulnérabilités pertinentes, attaques, économie d’actions, aptitudes, réactions et ressources documentées dans les dossiers fournis. Les zones que les dossiers signalent comme non documentées restent explicitement signalées au lieu d’être inventées.

Samoth dispose aussi d’un profil de compagnon « Esprit draconique d’argent » correspondant à sa Convocation d’esprit draconique de niveau 5.

## Felipe Dofil et ses Golems-Bonbons

Felipe Dofil est intégré comme PNJ allié complet (CA 15, 135 PV, DD 18, attaque de sort +10, sorts, Bonbons médicinaux, sorcellerie et Bâton-Sucette).

Deux profils de compagnon sont inclus :

- Golem-Bonbon ordinaire — FP 3, CA 15, 58 PV
- Golem-Bonbon supérieur — FP 6, CA 16, 126 PV

Quand Felipe est ajouté depuis la bibliothèque, ENCOUNTER propose automatiquement d’ajouter **4 Golems-Bonbons ordinaires**, au même rang d’initiative et juste après Felipe. Ils sont regroupés de façon compacte.

## Galerie de Maharles

Les 20 profils du PDF « Statblocks complets pour la session de Maharles — D&D 5e » sont intégrés :

- Mâchoire de la Harde
- Brise-Corne de la Harde
- Crieur d’Orage
- Porte-Nuit au sel noir
- Dresseur de chaînes
- Svara Brise-Neige
- Torgar, vieux chef de la Harde
- Zanror Main-de-Montagne
- Nezhar Brise-Calme
- Crevard
- Crevard supérieur
- Moissonneur des Dépouillés
- Sœur Vellane au Masque d’Os
- Roland, paladin brisé
- Zomik éclaireur
- Zomik bricoleur
- Zomik frondeur
- Geôlier impérial détaché
- Soldat de la Brigade des Glaces
- Vaylen Drakhys — profil de session

Conformément à la demande, **le Zanror FP 10 du PDF n’est pas utilisé**. Il est entièrement remplacé par la version fournie directement dans le texte utilisateur : **FP 22, CA 20, 405 PV, Gants de Pierre du Titan exaltés, 3 actions légendaires, phases de combat et actions d’antre du Cercle du Tonnerre**.

Tous ces profils sont placés dans la catégorie Adversaires par défaut. Les profils que le PDF présente comme alliés possibles, notamment Roland et Nezhar, restent signalés comme tels dans leurs notes et peuvent être recatégorisés manuellement.

## Détails particuliers

- Roland possède 85 PV maximum mais démarre à **48/85 PV** lorsqu’il est ajouté, conformément au profil de session.
- Les résistances conditionnelles du type « dégâts physiques non magiques » sont conservées dans le texte des traits plutôt qu’automatisées, afin de ne pas réduire par erreur les attaques magiques.
- Les attaques infligeant plusieurs types de dégâts affichent leur formule complète et leurs types dans la fiche. La V4.3 ne fusionne pas arbitrairement les résistances lorsque les dégâts sont mixtes.
- Les profils intégrés sont ajoutés automatiquement à une bibliothèque V4 existante sans écraser les fiches personnalisées déjà présentes.

## Mise à jour depuis la V4

1. Dans ENCOUNTER, faire **Exporter JSON** par sécurité.
2. Décompresser le ZIP V4.4.
3. Remplacer le contenu du dépôt GitHub Pages par celui de ce dossier, à la racine.
4. Vérifier notamment `index.html`, `styles.css`, `app.js`, `builtins.js`, `service-worker.js`, `manifest.webmanifest` et le dossier `data`.
5. Faire **Commit changes**.
6. Ouvrir le site une première fois avec Internet, puis fermer et relancer l’application installée sur l’iPad.

Le cache PWA V4.4 a changé de nom afin de forcer le chargement des correctifs de combat et de la bibliothèque mise à jour.

## Compatibilité des sauvegardes

La clé historique `encounter-console-v1` reste utilisée et le miroir IndexedDB V4 est conservé. La V4.3 ajoute les nouveaux profils manquants au premier chargement et garde les modèles personnalisés déjà présents.


## Correctifs V4.3

- Undo global corrigé : le bouton supérieur **↶ Annuler** et celui du Journal restaurent la dernière opération et l’historique Undo est conservé localement.
- Barre de PV reconstruite avec un **pavé numérique tactile 0–9**, retour arrière et effacement, sans ouverture du clavier iPad.
- Troisième mode **PV TEMP.**. Les PV temporaires apparaissent en violet dans la liste de combat, les groupes et la fiche active. Conformément à D&D 5e, ils ne se cumulent pas : une nouvelle valeur ne remplace l’ancienne que si elle est supérieure.
- Les soins ne restaurent jamais les PV temporaires. Les dégâts consomment automatiquement les PV temporaires avant les PV normaux.
- Les attaques peuvent désormais cibler volontairement un allié. Les soins et les autres effets conservent leurs règles de ciblage normales.
- Nouveau cache PWA V4.3 pour forcer la mise à jour sur iPad.
