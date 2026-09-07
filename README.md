# ENCOUNTER — Console MJ D&D 5e V4

La V4 conserve les fonctions de la V3.6.1 et ajoute une couche de pilotage pensée pour réduire les manipulations pendant une partie sur iPad paysage.

## Nouveautés V4

### 1. Lanceur de session
Au démarrage, ENCOUNTER affiche désormais un accueil avec trois accès directs :
- Reprendre le combat en cours ;
- Rencontres préparées ;
- Nouvelle rencontre.

Les rencontres récentes peuvent aussi être chargées ou lancées directement depuis cet écran.

### 2. Bibliothèque de session
Chaque profil de la bibliothèque possède un bouton `Session` permettant de l’épingler. En combat, le tiroir Bibliothèque privilégie automatiquement ces profils afin de retrouver rapidement les PJ, PNJ et adversaires utiles à la session. Le filtre `Session` peut être désactivé à tout moment pour revenir à la bibliothèque complète.

### 3. Cible mémorisée
Lorsqu’une action nécessite une cible, la dernière cible valide utilisée par cette créature est mémorisée. Pendant la prochaine attaque, elle est mise en évidence et peut être reprise avec le bouton `Réutiliser`. Pour les multiattaques, la cible de l’attaque précédente est proposée pour l’attaque suivante sans lancer automatiquement le jet.

### 4. Command Center du tour actif
La fiche sélectionnée affiche un résumé immédiat :
- PV / CA ;
- Action, action bonus et réaction ;
- progression des attaques multiples ;
- rappels de début/fin de tour ;
- prochaine phase de boss ou ressources principales.

L’objectif est de réunir les informations des 10 prochaines secondes de jeu au même endroit.

### 5. Rencontres duplicables et variantes
Dans `Rencontres sauvegardées`, chaque rencontre peut maintenant être :
- dupliquée à l’identique ;
- créée en variante **Allégée** (-15 % de PV maximum pour les adversaires) ;
- créée en variante **Brutale** (+15 % de PV maximum pour les adversaires).

Les autres statistiques ne sont pas modifiées automatiquement.

### 6. Retour d’action enrichi
Le pop-up conserve les réglages de la V3.6 (haut-centre, 6 secondes, fermeture au toucher) mais affiche maintenant les informations essentielles de résolution, notamment les PV avant/après de la cible lorsqu’un soin ou des dégâts sont appliqués.

### 7. Stockage renforcé
La V4 conserve `localStorage` pour rester compatible avec toutes les versions précédentes et ajoute un miroir IndexedDB. Si le stockage principal du navigateur est perdu mais que le stockage IndexedDB est encore disponible, ENCOUNTER peut restaurer automatiquement l’état le plus récent. Les backups continuent également d’être conservés et sont recopiés dans IndexedDB.

### 8. PWA / hors connexion
Le cache du service worker passe à la V4. Le nouveau logo validé en V3.6.1 reste utilisé pour :
- `apple-touch-icon.png` ;
- `icon-192.png` ;
- `icon-512.png` ;
- `icon-1024.png`.

## Mise à jour depuis V3.6.1

1. Dans ENCOUNTER, faire **Exporter JSON** par sécurité.
2. Décompresser le ZIP V4.
3. Remplacer à la racine du dépôt GitHub tous les fichiers par ceux du ZIP.
4. Faire `Commit changes`.
5. Attendre la publication GitHub Pages.
6. Ouvrir une fois ENCOUNTER avec Internet pour que le nouveau service worker mette le cache à jour.
7. Fermer puis relancer l’application installée sur l’iPad.

La clé historique `encounter-console-v1` est conservée : la V4 doit donc retrouver automatiquement la bibliothèque, les participants, les rencontres sauvegardées et la corbeille de la version précédente.

## Fichiers principaux
- `index.html`
- `styles.css`
- `app.js`
- `builtins.js`
- `manifest.webmanifest`
- `service-worker.js`
- `apple-touch-icon.png`
- `icon-192.png`
- `icon-512.png`
- `icon-1024.png`
- `data/`

## SRD
Les profils issus du SRD 5.1 restent soumis à l’attribution indiquée dans `LICENSE-SRD.txt`.
