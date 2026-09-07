# ENCOUNTER — Console MJ D&D 5e V3.5

V3.5 « Confort Premium Boost » reprend la V3 et conserve la même clé de sauvegarde locale `encounter-console-v1`.

## Correctifs et ajouts

- une seule pastille **BOSS** sur les lignes de combat ;
- pop-up d’action affiché **3 secondes** ou jusqu’au toucher/clic ;
- marqueurs **A / B / R** déplacés à côté de la catégorie de la créature ;
- surbrillance de cible pendant 1,5 s : **verte = soin**, **rouge = dégâts**, **blanche = attaque ratée / aucun effet** ;
- profils SRD intégrés complétés avec les six caractéristiques et leurs compétences maîtrisées ;
- toute instance d’une rencontre peut être modifiée séparément (nom, rôle, CA, PV actuels/max, PV temporaires, initiative, vitesse, BOSS), y compris un membre d’un groupe ;
- les modifications d’instance n’altèrent pas le modèle source de la bibliothèque.

## Mise à jour GitHub Pages

Remplace à la racine du dépôt : `index.html`, `styles.css`, `app.js`, `builtins.js`, `service-worker.js`, `manifest.webmanifest`, `README.md` et le dossier `data`. Conserve également les icônes PWA et `.nojekyll`.

Après publication, ouvre une fois le site avec Internet afin que le nouveau service worker mette à jour le cache hors connexion. Si l’ancienne version reste affichée, ferme/réouvre l’application installée ou recharge le site en ligne.

Le contenu SRD 5.1 reste sous CC-BY-4.0 ; voir `LICENSE-SRD.txt`.
