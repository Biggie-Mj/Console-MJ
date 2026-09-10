# ENCOUNTER — Console MJ D&D 5e V5

## V5 — Combat First

ENCOUNTER V5 conserve la bibliothèque, les rencontres, les profils personnalisés et les règles intégrées de la V4.4, mais réorganise le mode **COMBAT** pour une utilisation prioritairement sur iPad en paysage.

### Interface Combat First

- Mode combat plus compact : liste des participants et fiche active défilent indépendamment, sans scroll global de la page en paysage.
- Colonne COMBAT resserrée pour afficher davantage de participants à l’écran.
- Filtres instantanés **TOUS / BLESSÉS / ÉTATS / BOSS**, avec compteur pour chaque filtre.
- Cartes individuelles condensées : nom, rôle, initiative, gros PV, PV temporaires, CA, économie A/B/R et états utiles.
- Les PJ et Felipe Dofil à 0 PV affichent leurs réussites/échecs de sauvegardes contre la mort directement dans la liste.
- Groupes ultra-compacts : chaque membre devient une capsule de PV. Les membres éliminés peuvent être repliés/affichés à la demande.

### Barre d’actions contextuelle

- Une nouvelle rangée fixe au bas de l’écran présente jusqu’à **4 actions de combat prioritaires** du participant actif.
- Chaque action de la fiche peut être marquée **★ favorite** ; ces choix sont mémorisés par profil.
- Sans favori configuré, ENCOUNTER remplit automatiquement la barre avec les premières actions pertinentes du profil.
- Les boutons indiquent directement l’économie d’action, le bonus/DD, les dégâts et l’état de recharge lorsque ces informations existent.
- **AUTRES…** ouvre immédiatement la liste complète des actions du participant actif.
- La cible précédente du participant actif reste visible dans cette barre.

### Ciblage renforcé

- Lorsqu’une action demande une cible, les cibles valides sont fortement mises en évidence et le reste de l’interface s’atténue.
- La cible précédente bénéficie d’un marquage distinct et peut être réutilisée en une pression.
- Les attaques peuvent toujours viser volontairement un allié, conformément au correctif V4.3.
- Les soins peuvent cibler les PJ/Felipe à 0 PV.
- Les multiattaques conservent la cible entre les attaques et respectent la progression de l’action Attaquer.

### Command Center du tour actif

Le panneau du tour actif regroupe en priorité :

- PV / PV temporaires / CA ;
- Action, Action bonus et Réaction ;
- progression des attaques multiples ;
- cible précédente ;
- rappels de début/fin de tour ;
- jets de sauvegarde de condition directement lançables ;
- capacités à recharge encore indisponibles ;
- ressources principales ;
- phases de boss et prochain seuil de PV.

### Boss, phases et actions légendaires

- Les seuils de phases sont visualisés sous forme de rail de PV dans le Command Center.
- Un seuil de phase ne modifie plus silencieusement le boss : une fenêtre **Activer la phase** demande une validation explicite avant d’appliquer les propriétés structurées de la phase.
- À la fin du tour d’une autre créature, les actions légendaires apparaissent dans la barre contextuelle plutôt que dans une fenêtre bloquante.
- Le MJ peut dépenser une action légendaire, continuer à en utiliser ou passer au participant suivant.
- Les actions de repaire apparaissent elles aussi dans la barre contextuelle quand leur entrée d’initiative devient active.

### Undo / Redo

- **↶ Annuler** et **↷ Rétablir** sont disponibles directement dans le bandeau supérieur.
- Les mêmes commandes sont disponibles dans le Journal.
- Le popup de résolution propose également Annuler / Rétablir.
- Jusqu’à 80 instantanés sont conservés localement pour chaque pile.
- Une nouvelle action après un Undo efface normalement la pile Redo, comme dans une application native.

### Pavé numérique universel

En dehors de l’éditeur complet de monstre, les petites saisies numériques utilisent un pavé tactile interne afin de limiter l’apparition du clavier iPad :

- PV actuels / maximum / temporaires ;
- CA ;
- initiative ;
- DD ;
- nombre de rounds ;
- champs numériques équivalents des dialogues de combat/préparation.

La barre rapide **DÉGÂTS / SOINS / PV TEMP.** conserve son pavé horizontal V4.3.

## Règles conservées des V4.3 / V4.4

- Les dégâts sont débités d’abord des PV temporaires, puis des PV normaux.
- Les soins ne restaurent pas les PV temporaires.
- Les PV temporaires ne se cumulent pas dans la barre rapide : la valeur la plus élevée est conservée.
- Les PJ et Felipe Dofil disposent des sauvegardes contre la mort ; les adversaires n’utilisent pas ce suivi.
- À partir de 1 PV, le suivi de sauvegardes contre la mort disparaît et est remis à zéro.
- La liste COMBAT reste scrollable indépendamment de la fiche.
- Le bouton crayon d’édition d’instance reste dégagé de la valeur des PV.

## Bibliothèque intégrée conservée

La V5 reprend l’intégralité de la bibliothèque V4.4, notamment :

- Pik Ekrok, Tuskhan Sand d’Ivoire, Wonq, Silas Veyr et C.R.A.S.S.E.U.S.E. ;
- Nans Pointud, Rufus / Ruvius D. Medani, Brack Mard, Samoth Drakhys, Kentaro Amane et Zéphyr ;
- Felipe Dofil, ses Golems-Bonbons ordinaires et supérieur ;
- les profils de la session de Maharles ;
- Zanror Main-de-Montagne dans sa version utilisateur FP 22 / 405 PV, et non la version FP 10 du PDF ;
- les 15 profils civils génériques de village ;
- les profils SRD 5.1 déjà présents.

Les dossiers utilisateur restent la référence pour les valeurs de ces personnages. Les informations que leurs dossiers signalaient comme absentes ou incertaines ne sont pas inventées par la console.

## Compatibilité des sauvegardes

- La clé historique `encounter-console-v1` est conservée afin que les états V4 restent récupérables.
- Le miroir IndexedDB V4 reste utilisé.
- Une migration V5 crée automatiquement un backup local avant la première utilisation de la nouvelle interface.
- Les préférences d’actions favorites sont incluses dans les exports JSON V5.

Avant une mise à jour GitHub, il reste recommandé d’utiliser **Exporter JSON** par sécurité.

## Installation / mise à jour GitHub Pages

1. Décompresser le ZIP V5.
2. Remplacer les fichiers du dépôt GitHub Pages par ceux du ZIP, à la racine.
3. Vérifier particulièrement `index.html`, `styles.css`, `app.js`, `builtins.js`, `manifest.webmanifest`, `service-worker.js` et le dossier `data/`.
4. Faire **Commit changes** sur `main`.
5. Ouvrir le site une première fois avec Internet.
6. Fermer puis relancer l’application installée sur l’iPad.

Le cache PWA est nommé `encounter-v5-combat-first-1`, ce qui force le remplacement de l’ancien cache V4.4 lors de l’activation du nouveau service worker.
