# ENCOUNTER — Console MJ D&D 5e V4.3

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
2. Décompresser le ZIP V4.3.
3. Remplacer le contenu du dépôt GitHub Pages par celui de ce dossier, à la racine.
4. Vérifier notamment `index.html`, `styles.css`, `app.js`, `builtins.js`, `service-worker.js`, `manifest.webmanifest` et le dossier `data`.
5. Faire **Commit changes**.
6. Ouvrir le site une première fois avec Internet, puis fermer et relancer l’application installée sur l’iPad.

Le cache PWA V4.3 a changé de nom afin de forcer le chargement du bestiaire civil et de la bibliothèque mise à jour.

## Compatibilité des sauvegardes

La clé historique `encounter-console-v1` reste utilisée et le miroir IndexedDB V4 est conservé. La V4.3 ajoute les nouveaux profils manquants au premier chargement et garde les modèles personnalisés déjà présents.


## Correctifs V4.3

- Undo global corrigé : le bouton supérieur **↶ Annuler** et celui du Journal restaurent la dernière opération et l’historique Undo est conservé localement.
- Barre de PV reconstruite avec un **pavé numérique tactile 0–9**, retour arrière et effacement, sans ouverture du clavier iPad.
- Troisième mode **PV TEMP.**. Les PV temporaires apparaissent en violet dans la liste de combat, les groupes et la fiche active. Conformément à D&D 5e, ils ne se cumulent pas : une nouvelle valeur ne remplace l’ancienne que si elle est supérieure.
- Les soins ne restaurent jamais les PV temporaires. Les dégâts consomment automatiquement les PV temporaires avant les PV normaux.
- Les attaques peuvent désormais cibler volontairement un allié. Les soins et les autres effets conservent leurs règles de ciblage normales.
- Nouveau cache PWA V4.3 pour forcer la mise à jour sur iPad.
