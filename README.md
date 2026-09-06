# ENCOUNTER — Console MJ D&D 5e

Application statique HTML/CSS/JavaScript conçue pour gérer une table d'adversaires D&D 5e sur ordinateur ou tablette.

## Fonctions de la V1

- Bibliothèque d'adversaires entièrement modifiable dans l'interface.
- Création, modification et suppression de statblocks maison.
- Ajout d'un adversaire ou d'un groupe entier dans une rencontre.
- Initiative commune ou légèrement individualisée pour les groupes.
- Suivi des PV, PV temporaires, soins, dégâts et CA.
- Ajout/retrait rapide des principaux états D&D 5e.
- Actions interactives avec jets d'attaque, avantage/désavantage et jets de dégâts.
- Capacités à recharge 5–6 (ou autre seuil écrit sous la forme `X-Y`).
- Réactions consommées et réinitialisées au début du tour de la créature.
- Actions légendaires avec réserve de points.
- Phases de boss déclenchées automatiquement selon les seuils de PV.
- Journal de combat et annulation des dernières modifications.
- Sauvegarde automatique dans `localStorage`.
- Import / export JSON de la bibliothèque et de la rencontre.
- Aucun serveur, framework ou compte requis.

## Utilisation

Ouvre simplement `index.html` dans un navigateur moderne. Pour un usage fiable sur iPad et entre plusieurs appareils, le plus pratique est de publier le dossier avec GitHub Pages.

### GitHub Pages

1. Crée un dépôt GitHub.
2. Dépose `index.html`, `styles.css`, `app.js` et le dossier `data` à la racine.
3. Dans **Settings > Pages**, choisis **Deploy from a branch** puis la branche `main` et `/root`.
4. Ouvre l'URL GitHub Pages générée.

## Importer un adversaire

Le bouton **Importer** accepte soit un export complet ENCOUNTER, soit un objet JSON de créature. Exemple minimal :

```json
{
  "name": "Ogre des ruines",
  "type": "Géant",
  "size": "G",
  "cr": "5",
  "ac": 15,
  "hp": 105,
  "initiative": 0,
  "speed": "12 m",
  "actions": [
    {
      "name": "Massue",
      "kind": "attack",
      "bonus": 7,
      "damage": "2d8+5",
      "damageType": "contondants"
    }
  ]
}
```

### Types d'actions compris par le moteur

- `text` : affiche et journalise la capacité.
- `attack` : lance un d20 + bonus puis les dégâts ; permet avantage/désavantage.
- `save` : affiche le DD de sauvegarde et lance les dégâts.
- `recharge` : fonctionne comme une sauvegarde/dégâts puis rend la capacité indisponible jusqu'à réussite du test de recharge.

Les champs non reconnus sont simplement ignorés ; les statblocks restent donc faciles à étendre.

## Données

Les données restent dans le navigateur via `localStorage`. Utilise **Exporter** pour faire une sauvegarde JSON avant de vider les données du navigateur ou de changer d'appareil.

## Contenu fourni

La bibliothèque embarque trois adversaires de démonstration, dont un boss à plusieurs phases. Les valeurs sont des exemples de fonctionnement et peuvent être modifiées ou supprimées.

`data/monsters.json` contient aussi un exemple de créature externe. La V1 n'effectue pas de chargement automatique de ce fichier : il sert de gabarit d'échange et peut être copié dans l'outil d'import.
