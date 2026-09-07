'use strict';

// Bibliothèque intégrée ENCOUNTER V3.
// Les profils SRD sont issus du SRD 5.1 français (règles 5e 2014) sous CC-BY-4.0.
// Les quatre personnages et le compagnon C.R.A.S.S.E.U.S.E. sont transcrits depuis les dossiers fournis par l'utilisateur.
window.ENCOUNTER_BUILTINS = [
  {
    id:'pj-pik-ekrok', category:'character', source:'Dossier utilisateur',
    name:'Pik Ekrok', subtitle:'Gobelin · Clerc 8 · Domaine de la Vie', type:'Gobelin · Clerc de la Vie', size:'P', cr:'',
    ac:18,hp:59,initiative:1,speed:'9 m',
    saves:'FOR +0, DEX +1, CON +2, INT +2, SAG +8, CHA +2',resistances:'',immunities:'',
    senses:'Vision dans le noir 18 m · Perception passive 18 · commun, gobelin, kobold',
    traits:[
      {name:'Disciple de la Vie',detail:'Quand un sort de niveau 1+ rend des PV, ajoute 2 + le niveau de l’emplacement aux soins.',kind:'text'},
      {name:'Guérisseur béni',detail:'Quand Pik soigne une autre créature avec un sort de niveau 1+, il récupère 2 + niveau de l’emplacement PV.',kind:'text'},
      {name:'Frappes bénies',detail:'Une fois par tour, un tour de magie ou une attaque d’arme qui inflige des dégâts peut ajouter 1d8 radiants.',kind:'text'},
      {name:'Canalisation divine',detail:'2 utilisations par repos court ou long, plus 1 utilisation quotidienne via l’Écaille de la Voix du Terrier.',kind:'text'},
      {name:'Concentration',detail:'JS de CON +2 ; DD 10 ou la moitié des dégâts subis, le plus élevé.',kind:'text'}
    ],
    actions:[
      {name:'Flamme sacrée',detail:'Tour de magie. Frappes bénies peut ajouter +1d8 radiants une fois par tour.',kind:'save',dc:18,save:'DEX',damage:'2d8',damageType:'radiants'},
      {name:'Éclair traçant',detail:'Sort N1. La prochaine attaque contre la cible bénéficie de l’avantage avant la fin du prochain tour de Pik.',kind:'attack',bonus:10,damage:'4d6',damageType:'radiants'},
      {name:'Arme spirituelle',detail:'Action bonus, portée 18 m ; sans concentration dans les règles 2014.',kind:'attack',bonus:10,damage:'1d8+5',damageType:'force'},
      {name:'Masse d’armes',detail:'Attaque de mêlée.',kind:'attack',bonus:3,damage:'1d6',damageType:'contondants'},
      {name:'Arbalète légère',detail:'Portée 24/96 m.',kind:'attack',bonus:4,damage:'1d8+1',damageType:'perforants'},
      {name:'Mot de guérison N1',detail:'Action bonus, portée 18 m. Disciple de la Vie inclus.',kind:'heal',damage:'1d4+8',damageType:'PV'},
      {name:'Soin des blessures N1',detail:'Action, contact. Disciple de la Vie inclus.',kind:'heal',damage:'1d8+8',damageType:'PV'},
      {name:'Préservation de la vie',detail:'Action + Canalisation : répartit jusqu’à 40 PV entre des créatures choisies à 9 m ; aucune ne peut dépasser la moitié de ses PV max ; aucun effet sur morts-vivants et créatures artificielles.',kind:'text'},
      {name:'Renvoi des morts-vivants',detail:'Les morts-vivants à 9 m qui voient ou entendent Pik font un JS SAG DD 18. Un mort-vivant de FP 1 ou moins qui échoue est détruit au niveau 8.',kind:'save',dc:18,save:'SAG'},
      {name:'Bénédiction',detail:'Concentration jusqu’à 1 minute. Jusqu’à 3 créatures ajoutent 1d4 à leurs jets d’attaque et de sauvegarde.',kind:'text'},
      {name:'Silence',detail:'Concentration jusqu’à 10 min ; sphère de 6 m de rayon à 36 m. Aucun son n’y est produit ou transmis.',kind:'text'}
    ],
    reactions:[], legendaryActions:[], legendaryMax:0, phases:[],
    resources:[
      {name:'Emplacements N1',max:4,start:4,reset:'repos long'},
      {name:'Emplacements N2',max:3,start:3,reset:'repos long'},
      {name:'Emplacements N3',max:3,start:3,reset:'repos long'},
      {name:'Emplacements N4',max:2,start:2,reset:'repos long'},
      {name:'Canalisation',max:2,start:2,reset:'repos court/long'},
      {name:'Canalisation — Écaille',max:1,start:1,reset:'aube'},
      {name:'Fureur des petits',max:3,start:3,reset:'repos long'},
      {name:'Sacoche du Maître sans Mains',max:3,start:3,reset:'1d3 à l’aube'},
      {name:'Perle de puissance',max:1,start:1,reset:'aube'},
      {name:'Jeton du Dernier Souffle',max:1,start:1,reset:'aube'}
    ],
    notes:'PJ niveau 8 de Clifftop. Valeurs et capacités transcrites depuis le dossier Pik Ekrok fourni par l’utilisateur.'
  },
  {
    id:'pj-tuskhan-sand-ivoire', category:'character', source:'Dossier utilisateur',
    name:"Tuskhan Sand d’Ivoire", subtitle:'Loxodon · Barbare 5 / Guerrier 3', type:'Loxodon · Gardien ancestral / Maître de guerre', size:'M', cr:'',
    ac:17,hp:82,initiative:2,speed:'12 m',
    saves:'FOR +7, DEX +2, CON +6, INT −1, SAG +1, CHA +0',resistances:'En Rage : contondants, perforants et tranchants',immunities:'',
    senses:'Perception passive 14 · odorat développé · commun, loxodon, nain',
    traits:[
      {name:'Rage',detail:'3 utilisations par repos long. En Rage : résistance aux dégâts contondants, perforants et tranchants ; La Dette Rouge inflige 2d6+8.',kind:'text'},
      {name:'Attaque téméraire',detail:'Peut obtenir l’avantage aux attaques de mêlée de Force du tour ; les attaques contre lui ont ensuite l’avantage jusqu’à son prochain tour.',kind:'text'},
      {name:'Protecteurs ancestraux',detail:'Pendant la Rage, la première créature touchée au tour est gênée par les ancêtres et devient moins efficace contre les autres membres du groupe.',kind:'text'},
      {name:'Faim de La Dette Rouge',detail:'Sur la première touche du tour : Faim 1 +1d4, Faim 2 +2d4, Faim 3 +3d4 nécrotiques. Faim 2–3 : vitesse 15 m et avantage aux tests de Force.',kind:'text'},
      {name:'Faim 3 — Contrôle',detail:'Au début du tour : JS SAG DD 15. En cas d’échec, la lame désigne la créature blessée la plus proche à 9 m ; refuser inflige 5d6 psychiques, supprime la réaction jusqu’au prochain tour et ramène la Faim à 1.',kind:'text'}
    ],
    actions:[
      {name:'La Dette Rouge',detail:'Attaque +2 magique. Hors Rage : 2d6+6. En Rage, utiliser la variante ci-dessous ou ajouter +2 au résultat.',kind:'attack',bonus:9,damage:'2d6+6',damageType:'tranchants'},
      {name:'La Dette Rouge — Rage',detail:'Attaque avec le bonus de Rage inclus. Ajouter les dés de Faim sur la première touche du tour si la lame boit.',kind:'attack',bonus:9,damage:'2d6+8',damageType:'tranchants'},
      {name:'Javeline',detail:'Portée 9/36 m ; le bonus de Rage ne s’applique pas à une attaque lancée.',kind:'attack',bonus:7,damage:'1d6+4',damageType:'perforants'},
      {name:'Coup à mains nues',detail:'Force ; la trompe peut servir à agripper mais ne manie pas l’épée.',kind:'attack',bonus:7,damage:'5',damageType:'contondants'},
      {name:'Second souffle',detail:'Action bonus, 1/repos court ou long.',kind:'heal',damage:'1d10+3',damageType:'PV'},
      {name:'Sursaut d’activité',detail:'1/repos court ou long : gagne une action supplémentaire à son tour. Avec Attaque supplémentaire, peut permettre jusqu’à quatre attaques.',kind:'text'},
      {name:'Attaque provocante',detail:'Sur une touche, dépense 1d8 de supériorité, ajoute le dé aux dégâts ; JS SAG DD 15 ou désavantage contre les créatures autres que Tuskhan jusqu’à la fin du prochain tour de Tuskhan.',kind:'text'},
      {name:'Attaque précise',detail:'Dépense 1d8 de supériorité et ajoute le résultat au jet d’attaque après avoir vu le d20, avant résolution.',kind:'text'},
      {name:'Attaque renversante',detail:'Sur une touche, dépense 1d8, ajoute le dé aux dégâts ; cible G ou plus petite : JS FOR DD 15 ou À terre.',kind:'text'},
      {name:'Festin de la Dette',detail:'Quand La Dette Rouge met à 0 PV une créature hostile avec du sang : Faim → 0 et Tuskhan gagne 5 × l’ancien niveau de Faim en PV temporaires.',kind:'text'}
    ],
    reactions:[], legendaryActions:[], legendaryMax:0, phases:[],
    resources:[
      {name:'Rages',max:3,start:3,reset:'repos long'},
      {name:'Second souffle',max:1,start:1,reset:'repos court/long'},
      {name:'Sursaut d’activité',max:1,start:1,reset:'repos court/long'},
      {name:'Dés de supériorité d8',max:4,start:4,reset:'repos court/long'},
      {name:'Stabilisation du périapte',max:1,start:1,reset:'repos long'},
      {name:'Faim de La Dette Rouge',max:3,start:0,reset:'repos court/long → 0'}
    ],
    notes:'PJ niveau 8 de Clifftop. La Faim est un compteur 0–3 : utilise +/− dans l’onglet État plutôt qu’une ressource à dépenser.'
  },
  {
    id:'pj-wonq', category:'character', source:'Dossier utilisateur',
    name:'Wonq', subtitle:'Hadozee · Barde 8 · Collège des Esprits', type:'Hadozee · Barde des Esprits', size:'M', cr:'',
    ac:13,hp:59,initiative:3,speed:'9 m · escalade 9 m',
    saves:'FOR −1, DEX +5, CON +2, INT +0, SAG +1, CHA +8',resistances:'',immunities:'',
    senses:'Perception passive 14 · Intuition passive 17 · vision normale',
    traits:[
      {name:'Focaliseur spirituel',detail:'Quand un sort de barde lancé via La Longue Mémoire inflige des dégâts ou rend des PV, ajoute 1d6 à un seul jet de dégâts ou de soins du sort.',kind:'text'},
      {name:'Contes de l’Au-delà',detail:'Action bonus : dépense 1 Inspiration bardique et lance 1d8 sur la table des Contes ; conserve un seul conte. Action : offre le conte à une créature vue à 9 m.',kind:'text'},
      {name:'Inspiration bardique d8',detail:'5 utilisations ; récupération après un repos court ou long.',kind:'text'},
      {name:'Concentration',detail:'Un seul effet de concentration à la fois. Les ouvertures de contrôle sont généralement plus rentables que les dégâts purs.',kind:'text'}
    ],
    actions:[
      {name:'Bâton du Vagabond Gris',detail:'1d6+6 à une main ou 1d8+6 à deux mains ; allonge ponctuelle 4,50 m.',kind:'attack',bonus:9,damage:'1d8+6',damageType:'contondants'},
      {name:'Dague',detail:'Finesse, légère, lancer 6/18 m.',kind:'attack',bonus:5,damage:'1d4+2',damageType:'perforants'},
      {name:'Moquerie cruelle',detail:'La cible a désavantage à sa prochaine attaque en cas d’échec.',kind:'save',dc:16,save:'SAG',damage:'2d4',damageType:'psychiques'},
      {name:'Murmures dissonants N1',detail:'Échec : la cible utilise sa réaction disponible pour s’éloigner ; réussite : moitié des dégâts et pas de déplacement. Le focaliseur peut ajouter +1d6 à un jet de dégâts.',kind:'save',dc:16,save:'SAG',damage:'3d6',damageType:'psychiques'},
      {name:'Mot de guérison N1',detail:'Action bonus, portée 18 m. Le focaliseur spirituel peut ajouter +1d6 à un jet de soins.',kind:'heal',damage:'1d4+5',damageType:'PV'},
      {name:'Lueurs féeriques',detail:'Concentration 1 min ; cube de 6 m ; JS DEX DD 16. Les cibles révélées ne bénéficient pas d’Invisibilité et les attaques contre elles ont l’avantage si elles sont vues.',kind:'save',dc:16,save:'DEX'},
      {name:'Injonction',detail:'JS SAG DD 16 ; ordre d’un mot pendant 1 round. Wonq possède 1 utilisation gratuite par repos long.',kind:'save',dc:16,save:'SAG'},
      {name:'Conte de l’Au-delà',detail:'Action : offre le conte conservé à une créature vue à 9 m. Le conte utilise DD 16 ou attaque magique +8 si nécessaire.',kind:'text'},
      {name:'Porte dimensionnelle',detail:'Sort N4, action ; téléportation jusqu’à 150 m, avec une créature volontaire adjacente de taille M ou inférieure.',kind:'text'},
      {name:'Invisibilité supérieure',detail:'Sort N4, action, contact, concentration jusqu’à 1 minute.',kind:'text'}
    ],
    reactions:[
      {name:'Esquive hadozee',detail:'Quand Wonq subit des dégâts : réduit les dégâts de 1d6+3. 3 utilisations par repos long.',kind:'text'},
      {name:'Planeur',detail:'Quand Wonq chute d’au moins 3 m : se déplace horizontalement jusqu’à 9 m vers un espace libre vu et ne subit aucun dégât de chute.',kind:'text'}
    ],
    legendaryActions:[],legendaryMax:0,phases:[],
    resources:[
      {name:'Inspirations bardiques d8',max:5,start:5,reset:'repos court/long'},
      {name:'Emplacements N1',max:4,start:4,reset:'repos long'},
      {name:'Emplacements N2',max:3,start:3,reset:'repos long'},
      {name:'Emplacements N3',max:3,start:3,reset:'repos long'},
      {name:'Emplacements N4',max:2,start:2,reset:'repos long'},
      {name:'Esquives hadozee',max:3,start:3,reset:'repos long'},
      {name:'La Longue Mémoire',max:5,start:5,reset:'1d4+1 à l’aube'},
      {name:'Bâton du Vagabond Gris',max:3,start:3,reset:'1d3 à l’aube'},
      {name:'Registre — Où es-tu ?',max:1,start:1,reset:'repos long'},
      {name:'Injonction gratuite',max:1,start:1,reset:'repos long'},
      {name:'Foulée brumeuse gratuite',max:1,start:1,reset:'repos long'}
    ],
    notes:'PJ niveau 8 de Clifftop. Devise : « Un absent n’est pas un mort. »'
  },


  {
    id:'pj-silas-veyr', category:'character', source:'Dossier utilisateur',
    name:'Silas Veyr', subtitle:'Humain muté · Artificier 8 · Alchimiste', type:'Humain muté · Artificier Alchimiste', size:'M', cr:'',
    ac:17,hp:59,initiative:2,speed:'9 m',
    saves:'FOR −1, DEX +2, CON +5, INT +8, SAG +1, CHA +0',resistances:'',immunities:'',
    senses:'Perception passive 14 · Investigation passive 18 · commun, nain',
    traits:[
      {name:'Catalyseur perfectionné',detail:'Lorsque l’Exosquelette Catalytique sert de focaliseur : attaque de sort +9 et DD des sorts 17. Sans lui : +8 / DD 16.',kind:'text'},
      {name:'Érudit alchimique',detail:'Quand Silas lance un sort via ses fournitures d’alchimiste, ajoute INT (+5) à un seul jet du sort qui rend des PV ou inflige des dégâts d’acide, feu, nécrotiques ou poison.',kind:'text'},
      {name:'Trait de génie',detail:'Réaction : quand Silas ou une créature vue à 9 m fait un test ou un jet de sauvegarde, ajoute +5 au résultat. 5 utilisations par repos long.',kind:'text'},
      {name:'Mousse Expansive',detail:'6 charges, récupération 1d4+2 à l’aube (max 6). Les pouvoirs de la Mousse utilisent DD 16.',kind:'text'},
      {name:'C.R.A.S.S.E.U.S.E.',detail:'Serviteur homoncule. Partage l’initiative de Silas et agit juste après lui. Une action bonus de Silas lui donne un ordre ; sans ordre, son action est Esquiver.',kind:'text'},
      {name:'Concentration',detail:'JS de CON +5 ; DD 10 ou moitié des dégâts subis, le plus élevé. Un seul sort de concentration à la fois.',kind:'text'}
    ],
    actions:[
      {name:'Trait de feu',detail:'Tour de magie, portée 36 m. Érudit alchimique inclus.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'feu'},
      {name:'Dague alchimique',detail:'Finesse, légère, lancer 6/18 m.',kind:'attack',bonus:5,damage:'1d4+2',damageType:'perforants'},
      {name:'Arbalète légère',detail:'Portée 24/96 m ; chargement, deux mains.',kind:'attack',bonus:5,damage:'1d8+2',damageType:'perforants'},
      {name:'Soins N1',detail:'Action, contact. Érudit alchimique inclus.',kind:'heal',damage:'1d8+10',damageType:'PV'},
      {name:'Mot de guérison N1',detail:'Action bonus, portée 18 m. Érudit alchimique inclus.',kind:'heal',damage:'1d4+10',damageType:'PV'},
      {name:'Rayon empoisonné N1',detail:'Portée 18 m. Sur une touche : dégâts de poison ; la cible fait ensuite un JS CON DD 17 ou est empoisonnée jusqu’à la fin du prochain tour de Silas.',kind:'attack',bonus:9,damage:'2d8+5',damageType:'poison'},
      {name:'Lueurs féeriques',detail:'Concentration 1 min ; cube de 6 m à 18 m. Les cibles en échec sont révélées et les attaques contre elles ont l’avantage si elles sont vues.',kind:'save',dc:17,save:'DEX'},
      {name:'Graisse',detail:'Carré de 3 m à 18 m ; terrain difficile. À l’apparition, à l’entrée ou en fin de tour : JS DEX DD 17 ou À terre. Sans concentration.',kind:'save',dc:17,save:'DEX'},
      {name:'Toile d’araignée',detail:'Concentration jusqu’à 1 h ; cube de 6 m à 18 m. JS DEX DD 17 ou Entravé ; une action et un test de FOR DD 17 permettent de sortir.',kind:'save',dc:17,save:'DEX'},
      {name:'Sphère de feu',detail:'Concentration 1 min. Créatures finissant leur tour près de la sphère : JS DEX DD 17, moitié en cas de réussite. Érudit alchimique peut ajouter +5 à un jet de dégâts du sort.',kind:'save',dc:17,save:'DEX',damage:'2d6+5',damageType:'feu'},
      {name:'Flèche acide de Melf',detail:'Portée 27 m. Touché : dégâts initiaux puis 2d4 acide à la fin du prochain tour de la cible ; raté : moitié des dégâts initiaux, sans dégâts différés.',kind:'attack',bonus:9,damage:'4d4+5',damageType:'acide'},
      {name:'Mousse immobilisante',detail:'2 charges de Mousse ; cible à 9 m. JS FOR DD 16 ou Entravé pendant 1 min ; action + test FOR DD 16 pour sortir. Une créature Gigantesque réussit automatiquement.',kind:'save',dc:16,save:'FOR'},
      {name:'Mousse constructive',detail:'1 charge de Mousse ; action. Crée à 9 m une structure d’environ 3 × 3 × 0,3 m, CA 15, 25 PV, supportant environ 500 kg, qui dure 10 min.',kind:'text'},
      {name:'Élixir expérimental',detail:'Après un repos long, Silas crée 2 élixirs gratuits aléatoires : Guérison, Rapidité, Résistance, Audace, Vol ou Transformation. Un emplacement N1+ peut créer un élixir supplémentaire choisi.',kind:'text'},
      {name:'Ordonner C.R.A.S.S.E.U.S.E.',detail:'Action bonus : ordonne à C.R.A.S.S.E.U.S.E. d’effectuer une action autre qu’Esquiver, notamment Choc ou une action utilitaire.',kind:'text'}
    ],
    reactions:[
      {name:'Trait de génie',detail:'Ajoute +5 au test ou au jet de sauvegarde de Silas ou d’une créature vue à 9 m. Dépense 1 utilisation.',kind:'text'},
      {name:'Absorption des éléments',detail:'Quand Silas subit acide, froid, feu, foudre ou tonnerre : résistance à ce type jusqu’au début de son prochain tour, y compris contre les dégâts déclencheurs.',kind:'text'},
      {name:'Armure de mousse',detail:'1 charge de Mousse : réduit les dégâts reçus de 1d8+5.',kind:'text'},
      {name:'Réaction moussante',detail:'3 charges de Mousse, 1/repos long. Si Silas devrait tomber à 0 PV sans mourir instantanément, il reste à 1 PV ; créatures à 3 m : JS DEX DD 16, échec 3d6 acide + poussée 3 m, réussite moitié sans poussée.',kind:'save',dc:16,save:'DEX',damage:'3d6',damageType:'acide'}
    ],
    legendaryActions:[],legendaryMax:0,phases:[],
    resources:[
      {name:'Emplacements N1',max:4,start:4,reset:'repos long'},
      {name:'Emplacements N2',max:3,start:3,reset:'repos long'},
      {name:'Trait de génie',max:5,start:5,reset:'repos long'},
      {name:'Mousse — charges',max:6,start:6,reset:'1d4+2 à l’aube'},
      {name:'Réaction moussante',max:1,start:1,reset:'repos long'},
      {name:'Analyseur de substances',max:1,start:1,reset:'repos court/long'},
      {name:'Élixirs gratuits',max:2,start:2,reset:'repos long'},
      {name:'Aiguiseur d’esprit',max:4,start:4,reset:'1d4 à l’aube'},
      {name:'Préparation de terrain',max:1,start:1,reset:'repos long'}
    ],
    notes:'PJ niveau 8 de Clifftop. Contrôleur-soutien alchimique. C.R.A.S.S.E.U.S.E. occupe un influx actif lorsqu’elle existe. En l’ajoutant au combat, ENCOUNTER peut aussi ajouter automatiquement son homoncule.'
  },
  {
    id:'comp-crasseuse', category:'companion', source:'Dossier utilisateur',
    name:'C.R.A.S.S.E.U.S.E.', subtitle:'Compagnon de Silas · Serviteur homoncule volant', type:'Petit artificiel · Serviteur homoncule', size:'P', cr:'',
    ac:13,hp:14,initiative:2,speed:'6 m · vol 9 m',
    saves:'DEX +5',resistances:'',immunities:'Dégâts : poison · États : empoisonné, épuisement',
    senses:'Vision dans le noir 18 m · Perception +6, passive 16 · Discrétion +5',
    traits:[
      {name:'Initiative liée',detail:'Partage le rang d’initiative de Silas et agit juste après lui.',kind:'text'},
      {name:'Commandement',detail:'Peut se déplacer et utiliser sa réaction de son propre chef. Sans ordre de Silas, son action est Esquiver. Une action bonus de Silas lui permet d’effectuer une autre action. Si Silas est neutralisé, elle agit librement.',kind:'text'},
      {name:'Esquive totale',detail:'Si C.R.A.S.S.E.U.S.E. réussit un JS de Dextérité qui lui ferait normalement subir la moitié des dégâts, elle n’en subit aucun ; en cas d’échec, elle n’en subit que la moitié.',kind:'text'},
      {name:'Réparation',detail:'Le sort Réparation lui rend 2d6 PV. Si Silas ou le serviteur meurt, le châssis disparaît et laisse le cœur cristallin.',kind:'text'}
    ],
    actions:[
      {name:'Choc',detail:'Attaque à distance, portée 9 m ; utilise le modificateur d’attaque de sorts de base de Silas.',kind:'attack',bonus:8,damage:'1d4+3',damageType:'force'},
      {name:'Esquiver',detail:'Action par défaut lorsqu’aucun autre ordre n’a été donné par Silas.',kind:'text'}
    ],
    reactions:[
      {name:'Conduit magique',detail:'Quand Silas lance un sort de portée contact et que C.R.A.S.S.E.U.S.E. est à 36 m ou moins, elle peut utiliser sa réaction pour délivrer le sort à sa place.',kind:'text'}
    ],
    legendaryActions:[],legendaryMax:0,phases:[],resources:[],
    notes:'Créature Réactive d’Assistance, de Soutien, de Surveillance, d’Exploration, Utilitaire, Semi-autonome et Expérimentale. Petit cylindre noir et laiton à visage digital bleu. Avertissement : « NE PAS LAISSER ENTRE LES MAINS DE FOOF HOON. »'
  },

  // ——— SRD 5.1 : monstres courants ———
  {
    id:'srd-gobelin',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Gobelin',type:'Humanoïde (gobelin)',size:'P',cr:'1/4',ac:15,hp:7,initiative:2,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · Perception passive 9 · commun, gobelin',
    traits:[{name:'Fuite agile',detail:'Peut entreprendre Se cacher ou Se désengager par une action bonus.',kind:'text'}],
    actions:[{name:'Cimeterre',detail:'Mêlée.',kind:'attack',bonus:4,damage:'1d6+2',damageType:'tranchants'},{name:'Arc court',detail:'Distance.',kind:'attack',bonus:4,damage:'1d6+2',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-kobold',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Kobold',type:'Humanoïde (kobold)',size:'P',cr:'1/8',ac:12,hp:5,initiative:2,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · Perception passive 8 · commun, draconique',
    traits:[{name:'Sensibilité au soleil',detail:'Sous la lumière du soleil, désavantage aux jets d’attaque et aux tests de Sagesse (Perception) basés sur la vue.',kind:'text'},{name:'Tactique de meute',detail:'Avantage à l’attaque si au moins un allié non neutralisé se trouve à 1,50 m de la cible.',kind:'text'}],
    actions:[{name:'Dague',detail:'Mêlée.',kind:'attack',bonus:4,damage:'1d4+2',damageType:'perforants'},{name:'Fronde',detail:'Distance.',kind:'attack',bonus:4,damage:'1d4+2',damageType:'contondants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-orc',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Orc',type:'Humanoïde (orc)',size:'M',cr:'1/2',ac:13,hp:15,initiative:1,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · Perception passive 10 · commun, orc',
    traits:[{name:'Agressivité',detail:'Action bonus : se déplace de sa vitesse ou moins vers une créature hostile qu’il voit.',kind:'text'}],
    actions:[{name:'Hache à deux mains',detail:'Mêlée.',kind:'attack',bonus:5,damage:'1d12+3',damageType:'tranchants'},{name:'Javeline',detail:'Mêlée ou distance 9/36 m.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-ogre',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Ogre',type:'Géant',size:'G',cr:'2',ac:11,hp:59,initiative:-1,speed:'12 m',
    saves:'',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · Perception passive 8 · commun, géant',traits:[],
    actions:[{name:'Massue',detail:'Mêlée.',kind:'attack',bonus:6,damage:'2d8+4',damageType:'contondants'},{name:'Javeline',detail:'Mêlée ou distance 9/36 m.',kind:'attack',bonus:6,damage:'2d6+4',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-squelette',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Squelette',type:'Mort-vivant',size:'M',cr:'1/4',ac:13,hp:13,initiative:2,speed:'9 m',
    saves:'',resistances:'',immunities:'Dégâts : poison · États : empoisonné, épuisement',senses:'Vision dans le noir 18 m · Perception passive 9',
    vulnerabilities:'contondants',
    traits:[],actions:[{name:'Épée courte',detail:'Mêlée.',kind:'attack',bonus:4,damage:'1d6+2',damageType:'perforants'},{name:'Arc court',detail:'Distance.',kind:'attack',bonus:4,damage:'1d6+2',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Vulnérabilité : dégâts contondants. Profil SRD 5.1 français.'
  },
  {
    id:'srd-zombi',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Zombi',type:'Mort-vivant',size:'M',cr:'1/4',ac:8,hp:22,initiative:-2,speed:'6 m',
    saves:'SAG +0',resistances:'',immunities:'Dégâts : poison · État : empoisonné',senses:'Vision dans le noir 18 m · Perception passive 8 · comprend ses langues de son vivant mais ne parle pas',
    traits:[{name:'Robustesse de la non-vie',detail:'Si des dégâts le font tomber à 0 PV : JS CON DD 5 + dégâts subis, sauf dégâts radiants ou coup critique. Réussite : reste à 1 PV.',kind:'text'}],
    actions:[{name:'Coup',detail:'Mêlée.',kind:'attack',bonus:3,damage:'1d6+1',damageType:'contondants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-goule',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Goule',type:'Mort-vivant',size:'M',cr:'1',ac:12,hp:22,initiative:2,speed:'9 m',
    saves:'',resistances:'',immunities:'Dégâts : poison · États : charmé, empoisonné, épuisement',senses:'Vision dans le noir 18 m · Perception passive 10 · commun',traits:[],
    actions:[{name:'Griffes',detail:'Une cible autre qu’un elfe ou un mort-vivant fait un JS CON DD 10 ou est paralysée 1 minute ; nouveau JS à la fin de chacun de ses tours.',kind:'attack',bonus:4,damage:'2d4+2',damageType:'tranchants'},{name:'Morsure',detail:'Mêlée.',kind:'attack',bonus:2,damage:'2d6+2',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-araignee-geante',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Araignée géante',type:'Bête',size:'G',cr:'1',ac:14,hp:26,initiative:3,speed:'9 m · escalade 9 m',
    saves:'',resistances:'',immunities:'',senses:'Perception aveugle 3 m · vision dans le noir 18 m',
    traits:[{name:'Pattes d’araignée',detail:'Peut escalader les surfaces difficiles, y compris au plafond, sans test.',kind:'text'},{name:'Sens de la toile',detail:'Connaît l’emplacement de toute créature en contact avec la même toile.',kind:'text'},{name:'Marche dans les toiles',detail:'Ignore les restrictions de déplacement imposées par les toiles.',kind:'text'}],
    actions:[{name:'Morsure',detail:'Sur une touche, résous ensuite « Poison de morsure ».',kind:'attack',bonus:5,damage:'1d8+3',damageType:'perforants'},{name:'Poison de morsure',detail:'Après une Morsure réussie : JS CON DD 11. Réussite : moitié des dégâts de poison. Si le poison fait tomber la cible à 0 PV, elle est stable, empoisonnée 1 h et paralysée tant qu’elle reste empoisonnée.',kind:'save',dc:11,save:'CON',damage:'2d8',damageType:'poison'},{name:'Toile',detail:'Recharge 5–6. Attaque à distance +5, portée 9/18 m ; la cible est entravée. Action + test FOR DD 12 pour se libérer.',kind:'recharge',bonus:5,recharge:'5-6'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-loup-sanguinaire',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Loup sanguinaire',type:'Bête',size:'G',cr:'1',ac:14,hp:37,initiative:2,speed:'15 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 13',
    traits:[{name:'Odorat et ouïe aiguisés',detail:'Avantage aux tests de Sagesse (Perception) basés sur l’ouïe ou l’odorat.',kind:'text'},{name:'Tactique de meute',detail:'Avantage à l’attaque si au moins un allié non neutralisé se trouve à 1,50 m de la cible.',kind:'text'}],
    actions:[{name:'Morsure',detail:'Si la cible est une créature : JS FOR DD 13 ou elle tombe à terre.',kind:'attack',bonus:5,damage:'2d6+3',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-ombre',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Ombre',type:'Mort-vivant',size:'M',cr:'1/2',ac:12,hp:16,initiative:2,speed:'12 m',
    saves:'',resistances:'Acide, feu, foudre, froid, tonnerre ; contondants, perforants et tranchants d’attaques non magiques',immunities:'Dégâts : nécrotiques, poison · États : à terre, agrippé, effrayé, empoisonné, entravé, épuisement, paralysé, pétrifié',senses:'Vision dans le noir 18 m · Perception passive 10',
    vulnerabilities:'radiants',
    traits:[{name:'Discrétion dans les ombres',detail:'Sous lumière faible ou ténèbres, peut Se cacher par une action bonus.',kind:'text'},{name:'Informe',detail:'Peut se déplacer dans un espace étroit d’au moins 2,5 cm sans se faufiler.',kind:'text'},{name:'Morsure du soleil',detail:'En lumière vive du soleil : désavantage aux attaques, tests de caractéristique et sauvegardes.',kind:'text'}],
    actions:[{name:'Ponction de force',detail:'La FOR de la cible est réduite de 1d4 ; si elle atteint 0, la cible meurt. La réduction dure jusqu’à un repos court ou long.',kind:'attack',bonus:4,damage:'2d6+2',damageType:'nécrotiques'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Vulnérabilité : radiants. Profil SRD 5.1 français.'
  },


  {
    id:'srd-bandit',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Bandit',type:'Humanoïde (toute race)',size:'M',cr:'1/8',ac:12,hp:11,initiative:1,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 10 · une langue (souvent commun)',traits:[],
    actions:[{name:'Cimeterre',detail:'Attaque de mêlée.',kind:'attack',bonus:3,damage:'1d6+1',damageType:'tranchants'},{name:'Arbalète légère',detail:'Portée 24/96 m.',kind:'attack',bonus:3,damage:'1d8+1',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1. Humanoïde polyvalent pour brigands, pirates et hommes de main.'
  },
  {
    id:'srd-cultiste',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Sectateur',type:'Humanoïde (toute race)',size:'M',cr:'1/8',ac:12,hp:9,initiative:1,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 10 · une langue (souvent commun)',
    traits:[{name:'Dévotion obscure',detail:'Avantage aux jets de sauvegarde contre les états charmé et effrayé.',kind:'text'}],
    actions:[{name:'Cimeterre',detail:'Attaque de mêlée.',kind:'attack',bonus:3,damage:'1d6+1',damageType:'tranchants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1.'
  },
  {
    id:'srd-malfrat',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Malfrat',type:'Humanoïde (toute race)',size:'M',cr:'1/2',ac:11,hp:32,initiative:0,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 10 · une langue (souvent commun)',
    traits:[{name:'Tactique de meute',detail:'Avantage à l’attaque contre une créature si au moins un allié non neutralisé se trouve à 1,50 m de cette cible.',kind:'text'}],
    actions:[{name:'Multiattaque',detail:'Effectue deux attaques de masse.',kind:'text'},{name:'Masse',detail:'Attaque de mêlée.',kind:'attack',bonus:4,damage:'1d6+2',damageType:'contondants'},{name:'Arbalète lourde',detail:'Portée 30/120 m.',kind:'attack',bonus:2,damage:'1d10',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1 français.'
  },
  {
    id:'srd-veteran',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Vétéran',type:'Humanoïde (toute race)',size:'M',cr:'3',ac:17,hp:58,initiative:1,speed:'9 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 12 · une langue (souvent commun)',traits:[],
    actions:[{name:'Multiattaque',detail:'Effectue deux attaques d’épée longue et, s’il a une épée courte dégainée, une attaque d’épée courte supplémentaire.',kind:'text'},{name:'Épée longue',detail:'À une main : 1d8+3 ; à deux mains : 1d10+3.',kind:'attack',bonus:5,damage:'1d8+3',damageType:'tranchants'},{name:'Épée courte',detail:'Attaque de mêlée.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'perforants'},{name:'Arbalète lourde',detail:'Portée 30/120 m.',kind:'attack',bonus:3,damage:'1d10+1',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1. Excellent soldat professionnel ou mercenaire.'
  },
  {
    id:'srd-loup',category:'enemy',source:'SRD 5.1 · CC-BY-4.0',name:'Loup',type:'Bête',size:'M',cr:'1/4',ac:13,hp:11,initiative:2,speed:'12 m',
    saves:'',resistances:'',immunities:'',senses:'Perception passive 13',
    traits:[{name:'Ouïe et odorat aiguisés',detail:'Avantage aux tests de Sagesse (Perception) basés sur l’ouïe ou l’odorat.',kind:'text'},{name:'Tactique de meute',detail:'Avantage à l’attaque si au moins un allié non neutralisé se trouve à 1,50 m de la cible.',kind:'text'}],
    actions:[{name:'Morsure',detail:'Si la cible est une créature : JS FOR DD 11 ou elle tombe à terre.',kind:'attack',bonus:4,damage:'2d4+2',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Profil SRD 5.1.'
  },

  // Exemples maison déjà présents en V2, conservés pour compatibilité et démonstration.
  {
    id:'gobelin-veteran',category:'enemy',source:'Démo maison',name:'Gobelin vétéran',type:'Humanoïde (gobelinoïde)',size:'P',cr:'2',ac:17,hp:36,initiative:3,speed:'9 m',
    saves:'DEX +5',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · commun, gobelin',
    traits:[{name:'Évasion agile',detail:'Peut Se désengager ou Se cacher par une action bonus.',kind:'text'}],
    actions:[{name:'Cimeterre',detail:'Attaque de corps à corps.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'tranchants'},{name:'Arc court',detail:'Portée 24/96 m.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'perforants'}],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Adversaire maison de démonstration.'
  },
  {
    id:'ogre-des-ruines',category:'enemy',source:'Démo maison',name:'Ogre des ruines',type:'Géant',size:'G',cr:'5',ac:15,hp:105,initiative:0,speed:'12 m',
    saves:'FOR +7, CON +6',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · géant, commun',
    traits:[{name:'Brute',detail:'Ses attaques de mêlée sont particulièrement lourdes.',kind:'text'}],
    actions:[{name:'Massue de siège',detail:'Attaque de corps à corps.',kind:'attack',bonus:7,damage:'2d8+5',damageType:'contondants'},{name:'Rocher',detail:'Attaque à distance, portée 18/72 m.',kind:'attack',bonus:7,damage:'2d10+5',damageType:'contondants'}],reactions:[{name:'Balayage brutal',detail:'Lorsqu’une créature quitte sa portée, l’ogre effectue une attaque.',kind:'attack',bonus:7,damage:'2d8+5',damageType:'contondants'}],legendaryActions:[],legendaryMax:0,phases:[],resources:[],notes:'Exemple maison de brute intermédiaire.'
  },
  {
    id:'fausse-hydre-demo',category:'enemy',source:'Démo maison',name:'Fausse hydre — Démo',type:'Aberration',size:'TG',cr:'12',ac:17,hp:220,initiative:4,speed:'9 m',
    saves:'FOR +9, CON +9, SAG +7',resistances:'psychiques',immunities:'charmé, effrayé',senses:'Perception aveugle 18 m · télépathie 36 m',
    traits:[{name:'Chant d’oubli',detail:'Les créatures qui perçoivent son chant peinent à conserver les souvenirs liés à ses victimes.',kind:'text'},{name:'Têtes multiples',detail:'La créature peut exercer une pression sur plusieurs zones du champ de bataille.',kind:'text'}],
    actions:[{name:'Morsure',detail:'Une tête mord une cible à portée.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'perforants'},{name:'Cri de dissonance',detail:'Toutes les créatures choisies dans la zone effectuent un JS de Sagesse.',kind:'save',dc:17,save:'SAG',damage:'4d8',damageType:'psychiques'},{name:'Hurlement mnésique',detail:'Recharge 5–6.',kind:'recharge',recharge:'5-6',dc:17,save:'SAG',damage:'6d8',damageType:'psychiques'}],
    reactions:[{name:'Cou réflexe',detail:'Lorsqu’elle est attaquée au corps à corps, une tête libre peut riposter.',kind:'attack',bonus:9,damage:'1d10+5',damageType:'contondants'}],
    legendaryActions:[{name:'Déplacement',detail:'Se déplace sans provoquer d’attaque d’opportunité.',kind:'text',cost:1},{name:'Morsure',detail:'Effectue une Morsure.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'perforants',cost:1},{name:'Chant discordant',detail:'Une cible effectue un JS de SAG.',kind:'save',dc:17,save:'SAG',damage:'3d8',damageType:'psychiques',cost:2}],legendaryMax:3,
    phases:[{name:'Phase II — Le chant se brise',threshold:150,ac:18,note:'La fausse hydre se cabre et devient plus agressive.'},{name:'Phase III — Faim absolue',threshold:70,ac:19,note:'Les cous s’entrelacent et la créature abandonne toute prudence.'}],resources:[],notes:'Boss maison de démonstration en trois phases.'
  }
];

// ——— ENCOUNTER V2.5 : métadonnées structurées et automatisations ———
(() => {
  const byId = id => window.ENCOUNTER_BUILTINS.find(m => m.id === id);
  const setAbility = (m, name, patch) => {
    if (!m) return;
    const a = [...(m.actions||[]), ...(m.reactions||[]), ...(m.legendaryActions||[]), ...(m.lairActions||[]), ...(m.traits||[])].find(x => x.name === name);
    if (a) Object.assign(a, patch);
  };

  const pik = byId('pj-pik-ekrok');
  if (pik) {
    pik.abilities={FOR:10,DEX:12,CON:14,INT:14,SAG:20,CHA:8};
    pik.saveMods={FOR:0,DEX:1,CON:2,INT:2,SAG:8,CHA:2};
    setAbility(pik,'Arme spirituelle',{economy:'bonus'});
    setAbility(pik,'Mot de guérison N1',{economy:'bonus'});
  }
  const tuskhan = byId('pj-tuskhan-sand-ivoire');
  if (tuskhan) {
    tuskhan.abilities={FOR:18,DEX:14,CON:16,INT:8,SAG:12,CHA:10};
    tuskhan.saveMods={FOR:7,DEX:2,CON:6,INT:-1,SAG:1,CHA:0};
    setAbility(tuskhan,'Second souffle',{economy:'bonus'});
    ['Sursaut d’activité','Attaque provocante','Attaque précise','Attaque renversante','Festin de la Dette'].forEach(n=>setAbility(tuskhan,n,{economy:'none'}));
    setAbility(tuskhan,'Faim 3 — Contrôle',{timing:'start'});
  }
  const wonq = byId('pj-wonq');
  if (wonq) {
    wonq.abilities={FOR:8,DEX:14,CON:14,INT:10,SAG:12,CHA:20};
    wonq.saveMods={FOR:-1,DEX:5,CON:2,INT:0,SAG:1,CHA:8};
    ['Mot de guérison N1','Contes de l’Au-delà'].forEach(n=>setAbility(wonq,n,{economy:'bonus'}));
    (wonq.reactions||[]).forEach(a=>a.economy='reaction');
  }
  const silas = byId('pj-silas-veyr');
  if (silas) {
    silas.abilities={FOR:8,DEX:14,CON:15,INT:20,SAG:12,CHA:10};
    silas.saveMods={FOR:-1,DEX:2,CON:5,INT:8,SAG:1,CHA:0};
    ['Mot de guérison N1','Ordonner C.R.A.S.S.E.U.S.E.'].forEach(n=>setAbility(silas,n,{economy:'bonus'}));
    (silas.reactions||[]).forEach(a=>a.economy='reaction');
  }
  const crasseuse = byId('comp-crasseuse');
  if (crasseuse) {
    crasseuse.abilities={FOR:4,DEX:15,CON:12,INT:10,SAG:10,CHA:7};
    crasseuse.saveMods={FOR:-3,DEX:5,CON:1,INT:0,SAG:0,CHA:-2};
    crasseuse.damageImmunities=['poison'];
    crasseuse.conditionImmunities=['Empoisonné','Épuisement'];
    (crasseuse.reactions||[]).forEach(a=>a.economy='reaction');
  }

  // Défenses SRD dont l'automatisation peut être appliquée sans ambiguïté.
  const squelette=byId('srd-squelette');
  if(squelette){squelette.damageVulnerabilities=['contondants'];squelette.damageImmunities=['poison'];squelette.conditionImmunities=['Empoisonné','Épuisement'];}
  const zombi=byId('srd-zombi');
  if(zombi){zombi.damageImmunities=['poison'];zombi.conditionImmunities=['Empoisonné'];}
  const goule=byId('srd-goule');
  if(goule){goule.damageImmunities=['poison'];goule.conditionImmunities=['Charmé','Empoisonné','Épuisement'];}
  const ombre=byId('srd-ombre');
  if(ombre){
    // Les résistances physiques du profil SRD dépendent de la nature magique de l'attaque : elles restent dans le texte libre.
    // Seules les résistances sans condition sont automatisées ici.
    ombre.damageVulnerabilities=['radiants'];
    ombre.damageResistances=['acide','feu','foudre','froid','tonnerre'];
    ombre.damageImmunities=['nécrotiques','poison'];
    ombre.conditionImmunities=['À terre','Agrippé','Effrayé','Empoisonné','Entravé','Épuisement','Paralysé','Pétrifié'];
  }

  const malfrat=byId('srd-malfrat');
  setAbility(malfrat,'Multiattaque',{kind:'multiattack',sequence:'Masse*2',economy:'action'});
  const veteran=byId('srd-veteran');
  setAbility(veteran,'Multiattaque',{kind:'multiattack',sequence:'Épée longue*2;Épée courte*1',economy:'action'});

  const hydra=byId('fausse-hydre-demo');
  if (hydra) {
    hydra.damageResistances=['psychiques'];
    hydra.conditionImmunities=['Charmé','Effrayé'];
    hydra.lairInitiative=20;
    hydra.lairActions=[
      {name:'Clameur souterraine',detail:'Le chant rebondit dans les galeries. Une créature choisie fait un JS SAG DD 17 ; en cas d’échec, elle est Effrayée jusqu’à la fin de son prochain tour.',kind:'save',dc:17,save:'SAG',economy:'lair'},
      {name:'Éboulement organique',detail:'Une zone de 3 m devient terrain difficile. Les créatures dans la zone font un JS DEX DD 17 ou subissent 3d6 contondants et tombent À terre.',kind:'save',dc:17,save:'DEX',damage:'3d6',damageType:'contondants',economy:'lair'},
      {name:'Cou surgissant',detail:'Une tête jaillit d’une galerie et effectue une attaque de Morsure contre une cible à portée.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'perforants',economy:'lair'}
    ];
    hydra.actions.unshift({name:'Multiattaque',detail:'Effectue deux attaques de Morsure.',kind:'multiattack',sequence:'Morsure*2',economy:'action'});
    hydra.phases=[
      {name:'Phase II — Le chant se brise',threshold:150,ac:18,legendaryMax:3,speed:'12 m',addResistances:['contondants'],note:'La Fausse Hydre se cabre, accélère et durcit sa masse.'},
      {name:'Phase III — Faim absolue',threshold:70,ac:19,legendaryMax:4,speed:'15 m',addResistances:['contondants','perforants','tranchants'],note:'Les cous s’entrelacent et la créature abandonne toute prudence. Elle récupère 4 actions légendaires au début de son tour.'}
    ];
  }
})();


// ——— ENCOUNTER V3.5 : caractéristiques, sauvegardes et compétences complètes des profils SRD intégrés ———
(() => {
  const byId=id=>window.ENCOUNTER_BUILTINS.find(m=>m.id===id);
  const set=(id,abilities,skills={},saveMods={})=>{const m=byId(id);if(!m)return;m.abilities=abilities;m.skills=skills;m.saveMods=Object.assign({},saveMods);};
  set('srd-gobelin',{FOR:8,DEX:14,CON:10,INT:10,SAG:8,CHA:8},{discretion:{mod:6,status:'Maîtrise'}});
  set('srd-kobold',{FOR:7,DEX:15,CON:9,INT:8,SAG:7,CHA:8});
  set('srd-orc',{FOR:16,DEX:12,CON:16,INT:7,SAG:11,CHA:10},{intimidation:{mod:2,status:'Maîtrise'}});
  set('srd-ogre',{FOR:19,DEX:8,CON:16,INT:5,SAG:7,CHA:7});
  set('srd-squelette',{FOR:10,DEX:14,CON:15,INT:6,SAG:8,CHA:5});
  set('srd-zombi',{FOR:13,DEX:6,CON:16,INT:3,SAG:6,CHA:5},{},{SAG:0});
  set('srd-goule',{FOR:13,DEX:15,CON:10,INT:7,SAG:10,CHA:6});
  set('srd-araignee-geante',{FOR:14,DEX:16,CON:12,INT:2,SAG:11,CHA:4},{discretion:{mod:7,status:'Maîtrise'}});
  set('srd-loup-sanguinaire',{FOR:17,DEX:15,CON:15,INT:3,SAG:12,CHA:7},{perception:{mod:3,status:'Maîtrise',note:'Avantage si fondé sur l’ouïe ou l’odorat'},discretion:{mod:4,status:'Maîtrise'}});
  set('srd-ombre',{FOR:6,DEX:14,CON:13,INT:6,SAG:10,CHA:8},{discretion:{mod:4,status:'Maîtrise',note:'+6 en lumière faible ou dans les ténèbres'}});
  set('srd-bandit',{FOR:11,DEX:12,CON:12,INT:10,SAG:10,CHA:10});
  set('srd-cultiste',{FOR:11,DEX:12,CON:10,INT:10,SAG:11,CHA:10},{tromperie:{mod:2,status:'Maîtrise'},religion:{mod:2,status:'Maîtrise'}});
  set('srd-malfrat',{FOR:15,DEX:11,CON:14,INT:10,SAG:10,CHA:11},{intimidation:{mod:2,status:'Maîtrise'}});
  set('srd-veteran',{FOR:16,DEX:13,CON:14,INT:10,SAG:11,CHA:10},{athletisme:{mod:5,status:'Maîtrise'},perception:{mod:2,status:'Maîtrise'}});
  set('srd-loup',{FOR:12,DEX:15,CON:12,INT:3,SAG:12,CHA:6},{perception:{mod:3,status:'Maîtrise',note:'Avantage si fondé sur l’ouïe ou l’odorat'},discretion:{mod:4,status:'Maîtrise'}});
})();


// ——— ENCOUNTER V4.1 : Compagnie Créole, Felipe Dofil et galerie de Maharles ———
(() => {
  const extra = [
  {
    "id": "pj-brack-mard",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Maharles"
    ],
    "name": "Brack Mard",
    "subtitle": "Nain · Guerrier 10 · Maître de Guerre · « le Démembré »",
    "type": "Nain · Guerrier Maître de Guerre",
    "size": "M",
    "cr": "",
    "ac": 19,
    "hp": 104,
    "initiative": 1,
    "speed": "7,5 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 21,
      "DEX": 12,
      "CON": 18,
      "INT": 8,
      "SAG": 13,
      "CHA": 10
    },
    "saves": "FOR +9, DEX +1, CON +8, INT −1, SAG +1, CHA +0",
    "saveMods": {
      "FOR": 9,
      "DEX": 1,
      "CON": 8,
      "INT": -1,
      "SAG": 1,
      "CHA": 0
    },
    "skills": {
      "athletisme": {
        "mod": 9,
        "status": "Maîtrise"
      },
      "acrobaties": {
        "mod": 1
      },
      "escamotage": {
        "mod": 1
      },
      "discretion": {
        "mod": 1,
        "note": "Désavantage en armure de plate"
      },
      "arcanes": {
        "mod": -1
      },
      "histoire": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": -1
      },
      "nature": {
        "mod": -1
      },
      "religion": {
        "mod": -1
      },
      "dressage": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 1
      },
      "medecine": {
        "mod": 1
      },
      "perception": {
        "mod": 1
      },
      "survie": {
        "mod": 1
      },
      "intimidation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 0
      },
      "representation": {
        "mod": 0
      },
      "tromperie": {
        "mod": 0
      }
    },
    "damageResistances": [
      "feu",
      "poison"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Vision dans le noir 18 m · Perception passive 11 · Intuition passive 11 · Investigation passive 9 · commun, nain",
    "legendaryMax": 0,
    "traits": [
      {
        "name": "Attaque supplémentaire",
        "detail": "Quand Brack utilise l’action Attaquer, il effectue deux attaques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Style de combat — Défense",
        "detail": "Tant qu’il porte une armure, Brack gagne +1 à la CA. La plate du Duergar CA 18 donne donc CA 19.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Résistance naine",
        "detail": "Avantage aux jets de sauvegarde contre le poison et résistance aux dégâts de poison.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Sentinelle",
        "detail": "Une attaque d’opportunité qui touche réduit la vitesse de la cible à 0 pour le reste du tour. Se désengager ne l’empêche pas ; si un ennemi adjacent attaque une autre cible, Brack peut l’attaquer en réaction.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Cogneur lourd",
        "detail": "Sur une arme lourde maîtrisée : option −5 à l’attaque pour +10 dégâts ; après critique ou mise à 0 PV au corps à corps, attaque bonus possible. PyroMerlin est un marteau de guerre et n’est pas automatiquement éligible.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Aura de flammes — PyroMerlin",
        "detail": "Une créature hostile qui commence son tour à 1,50 m de Brack subit 2d6 dégâts de feu.",
        "kind": "text",
        "economy": "none",
        "timing": "start"
      },
      {
        "name": "Bras de forge",
        "detail": "Quand Brack saisit PyroMerlin, un bras magique enflammé remplace le bras sacrifié. Aucun bonus mécanique distinct n’est documenté au-delà des propriétés de PyroMerlin.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — PyroMerlin",
        "detail": "Brack effectue deux attaques de PyroMerlin.",
        "kind": "multiattack",
        "sequence": "PyroMerlin éveillé*2",
        "economy": "action"
      },
      {
        "name": "PyroMerlin éveillé",
        "detail": "Marteau de guerre +2. Dégâts exacts de la fiche : 1d10+7 contondants +2d8 feu.",
        "kind": "attack",
        "bonus": 11,
        "damage": "1d10+7+2d8",
        "damageType": "mixtes : contondants + feu",
        "economy": "action"
      },
      {
        "name": "Pôpa",
        "detail": "Ancienne hache de guerre de Nugar. Les propriétés au-delà de cette ligne ne sont pas documentées.",
        "kind": "attack",
        "bonus": 10,
        "damage": "1d12+5",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Gorlock",
        "detail": "Arme conservée sur la fiche ; type et propriétés exactes non documentés.",
        "kind": "attack",
        "bonus": 10,
        "damage": "2d6+2",
        "damageType": "non précisés",
        "economy": "action"
      },
      {
        "name": "Souffle de la forge",
        "detail": "1/jour. Cône de 9 m ; JS DEX DD 16 ; 6d6 feu, moitié en réussite.",
        "kind": "save",
        "dc": 16,
        "save": "DEX",
        "damage": "6d6",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Second souffle",
        "detail": "1/repos court ou long. Brack récupère 1d10+10 PV.",
        "kind": "heal",
        "damage": "1d10+10",
        "damageType": "PV",
        "economy": "bonus"
      },
      {
        "name": "Fougue",
        "detail": "1/repos court ou long. Brack gagne immédiatement une action supplémentaire. Une seconde action Attaquer permet encore deux attaques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Indomptable",
        "detail": "1/repos long. Quand Brack rate un jet de sauvegarde, il peut le relancer et doit conserver le nouveau résultat.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Croc-en-jambe",
        "detail": "Sur une touche : dépense 1d10 de supériorité, ajoute le dé aux dégâts ; cible G ou inférieure : JS FOR DD 17 ou À terre.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Attaque précise",
        "detail": "Lors d’une attaque d’arme : dépense 1d10 de supériorité et ajoute le résultat au jet d’attaque après avoir vu le d20, avant résolution.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Diversion",
        "detail": "Sur une touche : +1d10 dégâts ; la prochaine attaque d’une autre créature contre cette cible a l’avantage avant le début du prochain tour de Brack.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Instruction",
        "detail": "Action Attaquer + action bonus + renoncer à une attaque + 1d10 de supériorité. Un allié qui voit/entend Brack utilise sa réaction pour attaquer et ajoute le d10 aux dégâts.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Attaque menaçante",
        "detail": "Sur une touche : +1d10 dégâts ; JS SAG DD 17 ou Effrayé par Brack jusqu’à la fin de son prochain tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Attaque de poussée",
        "detail": "Sur une touche : +1d10 dégâts ; cible G ou inférieure : JS FOR DD 17 ou repoussée jusqu’à 4,50 m.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Vigueur naine",
        "detail": "Quand Brack utilise l’action Esquiver, il peut dépenser un dé de vie et récupérer 1d10+4 PV.",
        "kind": "text",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Riposte",
        "detail": "Quand une créature rate Brack au corps à corps : dépense 1d10 de supériorité, Brack effectue une attaque de mêlée ; sur touche, ajoute le d10 aux dégâts.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Sentinelle — attaque",
        "detail": "Quand une créature à 1,50 m de Brack attaque une autre cible, Brack peut l’attaquer au corps à corps.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Dés de supériorité d10",
        "max": 5,
        "start": 5,
        "reset": "repos court/long"
      },
      {
        "name": "Fougue",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Second souffle",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Indomptable",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Souffle de la forge",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Inspiration",
        "max": 1,
        "start": 0,
        "reset": "MJ"
      }
    ],
    "notes": "Valeurs actives du dossier niveau 10 : CA 19, 104 PV, FOR 21 via Ceinturon géant des collines, PyroMerlin Éveillé. PyroMerlin + Cogneur lourd n’est pas appliqué automatiquement car le marteau n’est pas une arme lourde selon la règle standard."
  },
  {
    "id": "pj-nans-pointud",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Ancien Clifftop",
      "Maharles"
    ],
    "name": "Nans Pointud",
    "subtitle": "Humain · Barbare 10 · Berserker · ancien Clifftopper",
    "type": "Humain · Barbare Berserker",
    "size": "M",
    "cr": "",
    "ac": 18,
    "hp": 125,
    "initiative": 2,
    "speed": "12 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 18,
      "DEX": 14,
      "CON": 16,
      "INT": 8,
      "SAG": 8,
      "CHA": 10
    },
    "saves": "FOR +8, DEX +2, CON +7, INT −1, SAG +0, CHA +0",
    "saveMods": {
      "FOR": 8,
      "DEX": 2,
      "CON": 7,
      "INT": -1,
      "SAG": 0,
      "CHA": 0
    },
    "skills": {
      "athletisme": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "acrobaties": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "escamotage": {
        "mod": 2
      },
      "discretion": {
        "mod": 2
      },
      "arcanes": {
        "mod": -1
      },
      "histoire": {
        "mod": -1
      },
      "investigation": {
        "mod": -1
      },
      "nature": {
        "mod": -1
      },
      "religion": {
        "mod": -1
      },
      "dressage": {
        "mod": -1
      },
      "intuition": {
        "mod": -1
      },
      "medecine": {
        "mod": -1
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 0
      },
      "representation": {
        "mod": 0
      },
      "tromperie": {
        "mod": 0
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · Intuition passive 9 · Investigation passive 9 · commun",
    "traits": [
      {
        "name": "Rage",
        "detail": "4/repos long, action bonus, jusqu’à 1 minute. Avantage aux tests/JS de FOR, +3 dégâts aux attaques de mêlée de Force, résistance aux dégâts contondants/perforants/tranchants. Pas de sort ni concentration.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Attaque téméraire",
        "detail": "Sur la première attaque du tour, Nans peut choisir l’avantage sur toutes ses attaques de mêlée de Force du tour ; les attaques contre lui ont ensuite l’avantage jusqu’au début de son prochain tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Attaque supplémentaire",
        "detail": "L’action Attaquer donne deux attaques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Sens du danger",
        "detail": "Avantage aux JS DEX contre les effets visibles, sauf s’il est aveuglé, assourdi ou incapable d’agir.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Instinct sauvage",
        "detail": "Avantage à l’initiative. S’il est surpris, peut agir normalement au premier tour s’il entre en Rage avant toute autre chose.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Critique brutal",
        "detail": "Sur un critique de mêlée, ajoute un dé de dégâts d’arme supplémentaire. Hache 1d12 : noyau du critique 3d12 avant autres dés/modificateurs.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Rage aveugle",
        "detail": "Pendant la Rage, Nans ne peut pas être Charmé ni Effrayé ; ces effets sont suspendus s’ils étaient déjà actifs.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Frénésie",
        "detail": "Choisie à l’entrée en Rage. Dès le tour suivant, attaque de mêlée avec arme en action bonus à chacun de ses tours ; à la fin de la Rage, gagne un niveau d’épuisement.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Robuste",
        "detail": "+20 PV au niveau 10, déjà inclus dans les 125 PV.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Don de l’Écorce — bénéfice permanent",
        "detail": "+1 aux JS de Sagesse, déjà intégré : SAG −1 devient JS +0.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Anneau — Rage contenue",
        "detail": "À 62 PV ou moins, +1 aux dégâts d’arme tant que l’Anneau de la Surcharge Furieuse est porté.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — Volto épée",
        "detail": "Deux attaques de Volto en mode épée/bouclier.",
        "kind": "multiattack",
        "sequence": "Volto — épée*2",
        "economy": "action"
      },
      {
        "name": "Attaques multiples — Volto hache",
        "detail": "Deux attaques de Volto en mode hache.",
        "kind": "multiattack",
        "sequence": "Volto — hache*2",
        "economy": "action"
      },
      {
        "name": "Volto — épée",
        "detail": "Valeur de fiche avec Rage incluse : 1d6+8 tranchants. Mode bouclier actif, CA 18.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d6+8",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Volto — hache",
        "detail": "Valeur de fiche avec Rage incluse : 1d12+8 tranchants. Arme lourde à deux mains, compatible Cogneur lourd.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d12+8",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Hache + Cogneur lourd",
        "detail": "Option −5/+10 déjà intégrée aux valeurs : +4 pour toucher, 1d12+18 tranchants avec Rage.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d12+18",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Hache chargée",
        "detail": "Une attaque qui touche peut ajouter 1d6 foudre, une seule fois par tour.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d12+8+1d6",
        "damageType": "mixtes : tranchants + foudre",
        "economy": "action"
      },
      {
        "name": "Impact chargé",
        "detail": "Action : attaque avec la hache en dépensant toute l’énergie. Sur touche : dégâts normaux +3d6 foudre (jaune) ou +5d6 foudre (rouge). Créatures à 3 m : JS DEX DD 13 ou À terre. Toute énergie est perdue.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Présence intimidante",
        "detail": "Cible visible à 9 m : JS SAG DD 12 ou Effrayée jusqu’à la fin du prochain tour de Nans. Nans peut consacrer ses actions suivantes à prolonger. Réussite initiale : immunité 24 h.",
        "kind": "save",
        "dc": 12,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Rage",
        "detail": "Entrer en Rage.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Écorce du Serment",
        "detail": "1/repos long, action bonus : 20 PV temporaires pendant 1 minute. Tant qu’il en reste : résistance C/P/T des attaques non magiques ; une créature adjacente qui le touche au corps à corps subit 1d6 perforants, max 1 fois/tour/créature.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Changer le mode du Volto",
        "detail": "Action bonus pour basculer Épée/Bouclier ↔ Hache.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Transfert d’énergie du Volto",
        "detail": "Action bonus : transfère l’énergie accumulée du mode Épée vers la Hache.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Cri de ralliement — Cor",
        "detail": "1 charge, action bonus, jusqu’à 6 alliés à 18 m : 2d6+4 PV temporaires, avantage à la prochaine attaque d’arme avant fin du prochain tour ; immunité contre Effrayé pendant 1 min tant qu’ils entendent le cor.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Fracas de guerre — Cor",
        "detail": "1 charge, cône 4,50 m, JS CON DD 12 : 3d8 tonnerre, moitié en réussite ; échec : repoussé 3 m. Déclenche ensuite la Tentation du Grand Saccageur.",
        "kind": "save",
        "dc": 12,
        "save": "CON",
        "damage": "3d8",
        "damageType": "tonnerre",
        "economy": "action"
      },
      {
        "name": "Hurlement du Grand Saccageur — Cor Éveillé",
        "detail": "2 charges, ennemis choisis à 18 m qui entendent Nans : JS SAG DD 12 ou Effrayés 1 minute et utilisent leur réaction pour s’éloigner si possible. Nouveau JS en fin de tour s’ils ne l’entendent/voient plus.",
        "kind": "save",
        "dc": 12,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Appel des ancêtres guerriers — Cor Éveillé",
        "detail": "3 charges, 1/repos long, 1 minute. Esprits gardiens centrés sur Nans n’affectant que les ennemis. Le dossier ne lui impose pas de concentration et le considère compatible avec Rage.",
        "kind": "text",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Parade de vent — Cape",
        "detail": "1/repos long. Quand une attaque à distance vise Nans : +2 CA contre cette attaque.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Rages",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Écorce du Serment",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Cor d’Urngarak — charges (Éveillé)",
        "max": 5,
        "start": 5,
        "reset": "tombée de la nuit"
      },
      {
        "name": "Appel des ancêtres",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Cape — Parade de vent",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Volto — touches accumulées",
        "max": 5,
        "start": 0,
        "reset": "repos court/long si surcharge"
      },
      {
        "name": "Volto — énergie (0 vide / 1 jaune / 2 rouge)",
        "max": 2,
        "start": 0,
        "reset": "dépensée par Impact"
      },
      {
        "name": "Épuisement",
        "max": 6,
        "start": 0,
        "reset": "selon repos/règles"
      }
    ],
    "notes": "CA active 18 en mode Épée/Bouclier, valeur finale conservée par le dossier. Les lignes de dégâts du Volto intègrent déjà le +3 de Rage. Le Cor mentionne un état Exalté mais ses pouvoirs ne sont pas documentés : aucun effet exalté n’est inventé."
  },
  {
    "id": "pj-rufus-renard",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Maharles",
      "Maison Medani"
    ],
    "name": "Rufus « Le Renard »",
    "subtitle": "Ruvius D. Medani · Humain · Roublard 10 · Assassin",
    "type": "Humain · Roublard Assassin",
    "size": "M",
    "cr": "",
    "ac": 15,
    "hp": 53,
    "initiative": 4,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 18,
      "CON": 10,
      "INT": 13,
      "SAG": 13,
      "CHA": 15
    },
    "saves": "FOR −1, DEX +8, CON +0, INT +5, SAG +1, CHA +2",
    "saveMods": {
      "FOR": -1,
      "DEX": 8,
      "CON": 0,
      "INT": 5,
      "SAG": 1,
      "CHA": 2
    },
    "skills": {
      "athletisme": {
        "mod": -1
      },
      "acrobaties": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "escamotage": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 12,
        "status": "Expertise"
      },
      "arcanes": {
        "mod": 1
      },
      "histoire": {
        "mod": 1
      },
      "investigation": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "nature": {
        "mod": 1
      },
      "religion": {
        "mod": 1
      },
      "dressage": {
        "mod": 1
      },
      "intuition": {
        "mod": 1
      },
      "medecine": {
        "mod": 1
      },
      "perception": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 1
      },
      "intimidation": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 10,
        "status": "Expertise"
      },
      "representation": {
        "mod": 2
      },
      "tromperie": {
        "mod": 6,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 15 · Intuition passive 11 · Investigation passive 15 · commun, elfique, jargon des voleurs",
    "traits": [
      {
        "name": "Attaque sournoise",
        "detail": "+5d6, 1 fois par tour. Sur une attaque réussie avec arme de finesse ou à distance si avantage, ou si un ennemi non neutralisé de la cible est adjacent et Rufus n’a pas désavantage. Peut aussi se déclencher sur une réaction hors de son tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Assassinat",
        "detail": "Avantage aux attaques contre les créatures n’ayant pas encore joué leur tour. Toute attaque qui touche une créature surprise est un coup critique.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Esquive totale",
        "detail": "Sur un JS DEX qui inflige normalement moitié : 0 dégâts sur réussite, moitié sur échec.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Chanceux",
        "detail": "3 points/repos long. Après un jet d’attaque, test ou sauvegarde, lance un d20 supplémentaire et choisit lequel utiliser ; peut aussi l’utiliser contre une attaque le visant.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Tireur d’élite",
        "detail": "Longue portée sans désavantage, abris partiels/importants ignorés, option −5 attaque / +10 dégâts avec attaque à distance maîtrisée.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Œil du Destin — Linceul Éveillé",
        "detail": "1 fois/round : connaît l’état vital d’une créature visible. Si elle est en agonie finale, les attaques de Rufus contre elle ont l’avantage. N’activer que si le Linceul est effectivement Éveillé.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Dague spectrale",
        "detail": "Valeur de fiche. Le rappel « DD CON 13 : désavantage » est incomplet dans les sources ; son déclencheur/durée ne sont pas inventés.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d4+5",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Hexen Blade",
        "detail": "Valeur de fiche. L’objet possède 5 charges et 3 sorts d’illusion dont les noms/coûts ne sont pas documentés.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d6+5",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Dague psychique",
        "detail": "Pouvoir autonome de campagne : 1d6 psychiques + modificateur de DEX, portée 18 m ; seconde attaque possible en action bonus. Le dossier ne donne pas un bonus d’attaque chiffré indépendant.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Dague psychique — seconde attaque",
        "detail": "Seconde attaque avec la Dague psychique selon la règle de la fiche.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Vision de la Vérité",
        "detail": "Cible visible à 18 m, concentration 1 min : avantage contre elle, critiques 17–20, et apprend une résistance/immunité/vulnérabilité pertinente. À chaque utilisation : JS SAG DD 10 + utilisations précédentes ; échec = désavantage aux JS SAG jusqu’au repos long, cumulatif.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Lame du Feu Caché",
        "detail": "1/jour. La prochaine Attaque sournoise réussie inflige +2d6 feu ; JS CON DD 16 ou Aveuglé jusqu’à la fin du prochain tour de Rufus.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Ruse — Foncer",
        "detail": "Action bonus.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Ruse — Se désengager",
        "detail": "Action bonus.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Ruse — Se cacher",
        "detail": "Action bonus.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Jugement différé — Linceul Dormant",
        "detail": "1/repos long : quand Rufus tombe à 0 PV, il revient automatiquement à 1 PV au début de son tour. N’activer que si le Linceul est équipé.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Langue du Dernier Souffle — Linceul Dormant",
        "detail": "1/jour, 1 minute : parle aux morts sans composantes, jusqu’à cinq questions. N’activer que si le Linceul est équipé.",
        "kind": "text",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Esquive instinctive",
        "detail": "Quand un attaquant visible le touche : réduit de moitié les dégâts de cette attaque.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Attaque d’opportunité",
        "detail": "Peut déclencher une Attaque sournoise supplémentaire pendant le round si les conditions sont remplies, car la limite est 1/tour.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Chance",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Lame du Feu Caché",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Hexen Blade — charges",
        "max": 5,
        "start": 5,
        "reset": "non documenté"
      },
      {
        "name": "Jugement différé — Linceul",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Corbeau Pèlerin — Linceul Éveillé",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Ombre du Corbeau — usages (si Éveillé)",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Inspiration",
        "max": 1,
        "start": 0,
        "reset": "MJ"
      }
    ],
    "notes": "CA active 15 avec armure de cuir normale. Le Linceul du Jugement Noir est un équipement séparé : CA 17 Dormant ou CA 18 Éveillé selon son état, mais le dossier ne coche pas explicitement l’état actuellement équipé. Assassin est l’archétype actif ; les Dagues psychiques sont conservées comme pouvoir autonome de campagne."
  },
  {
    "id": "pj-samoth-drakhys",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Porteur d’Étincelle",
      "Maharles"
    ],
    "name": "Samoth Drakhys",
    "subtitle": "Demi-elfe · Ensorceleur 10 · Ascendance draconique d’argent",
    "type": "Demi-elfe · Ensorceleur draconique",
    "size": "M",
    "cr": "",
    "ac": 14,
    "hp": 72,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 13,
      "CON": 14,
      "INT": 12,
      "SAG": 10,
      "CHA": 17
    },
    "saves": "FOR −1, DEX +1, CON +6, INT +1, SAG +0, CHA +7",
    "saveMods": {
      "FOR": -1,
      "DEX": 1,
      "CON": 6,
      "INT": 1,
      "SAG": 0,
      "CHA": 7
    },
    "skills": {
      "athletisme": {
        "mod": -1
      },
      "acrobaties": {
        "mod": 1
      },
      "escamotage": {
        "mod": 1
      },
      "discretion": {
        "mod": 1
      },
      "arcanes": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "histoire": {
        "mod": 1
      },
      "investigation": {
        "mod": 1
      },
      "nature": {
        "mod": 1
      },
      "religion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "dressage": {
        "mod": 0
      },
      "intuition": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "medecine": {
        "mod": 0
      },
      "perception": {
        "mod": 0
      },
      "survie": {
        "mod": 0
      },
      "intimidation": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "representation": {
        "mod": 3
      },
      "tromperie": {
        "mod": 7,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Vision dans le noir 18 m · Perception passive 10 · Intuition passive 14 · Investigation passive 11 · commun, elfique, géant, orc, draconique, primordial",
    "traits": [
      {
        "name": "Ascendance féerique",
        "detail": "Avantage aux JS contre Charmé ; la magie ne peut pas endormir Samoth.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Résistance draconique",
        "detail": "Sans armure : CA 13 + DEX = 14. +1 PV par niveau d’ensorceleur, déjà inclus dans les 72 PV.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Affinité élémentaire — froid",
        "detail": "Quand un sort inflige du froid, ajoute CHA +3 à un seul jet de dégâts. Peut dépenser 1 point de sorcellerie pour résistance au froid 1 heure.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Adepte élémentaire — froid",
        "detail": "Les sorts de Samoth ignorent la résistance au froid ; les 1 obtenus sur les dés de dégâts de froid sont traités comme des 2. L’immunité au froid n’est pas ignorée.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Concentration",
        "detail": "Un seul effet : Hâte, Invisibilité supérieure, Rayonnement écœurant ou Convocation d’esprit draconique se concurrencent.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Rayon de givre",
        "detail": "Tour de magie, +10. 2d8 froid et vitesse −3 m jusqu’au début du prochain tour de Samoth. Affinité +3 incluse ici.",
        "kind": "attack",
        "bonus": 10,
        "damage": "2d8+3",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Gelure",
        "detail": "JS CON DD 18 ; 2d6 froid et désavantage à la prochaine attaque d’arme avant la fin du prochain tour. Affinité +3 incluse ici.",
        "kind": "save",
        "dc": 18,
        "save": "CON",
        "damage": "2d6+3",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Illusion mineure",
        "detail": "Tour de magie ; son ou image statique dans un cube de 1,50 m. Investigation contre DD 18 pour l’examiner.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Main de mage",
        "detail": "Tour de magie, 9 m, 1 minute ; manipulation d’objet, pas d’attaque ni objet magique, env. 5 kg max.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Façonnage de l’eau",
        "detail": "Tour de magie, 9 m ; manipule un cube d’eau d’environ 1,50 m.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Prestidigitation",
        "detail": "Tour de magie, effets mineurs.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Projectile magique N1",
        "detail": "3 projectiles automatiques, chacun 1d4+1 force ; répartissables. Un projectile supplémentaire par niveau supérieur. Touche automatiquement : résolution manuelle pour permettre de répartir les projectiles sans faux jet de sauvegarde.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Orbe chromatique — froid N1",
        "detail": "Version froid automatisée : attaque +10, 3d8 froid + Affinité +3. Les autres types restent à résoudre manuellement via la description du sort.",
        "kind": "attack",
        "bonus": 10,
        "damage": "3d8+3",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Soins N1",
        "detail": "1/repos long gratuit via Présent du Dragon Métallique puis via emplacements. 1d8+3 PV, +1d8/niveau supérieur.",
        "kind": "heal",
        "damage": "1d8+3",
        "damageType": "PV",
        "economy": "action"
      },
      {
        "name": "Hâte N3",
        "detail": "9 m, concentration 1 minute : +2 CA, avantage JS DEX, vitesse doublée et action supplémentaire limitée. Sort jumeau possible pour 3 points.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Vortex de froid N3",
        "detail": "Sphère 6 m à 45 m ; JS DEX DD 18 ; 8d6 froid, moitié en réussite. Affinité +3 incluse ici.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "damage": "8d6+3",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Invisibilité supérieure N4",
        "detail": "Contact, concentration 1 minute ; invisibilité maintenue même en attaquant ou lançant des sorts.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Rayonnement écœurant N4",
        "detail": "Sphère 9 m, concentration jusqu’à 10 min ; JS CON DD 18 à l’entrée/premier début de tour : 4d10 radiants + épuisement propre au sort.",
        "kind": "save",
        "dc": 18,
        "save": "CON",
        "damage": "4d10",
        "damageType": "radiants",
        "economy": "action"
      },
      {
        "name": "Tempête de grêle N4",
        "detail": "Cylindre 6 m × 12 m, JS DEX DD 18 : 2d8 contondants +4d6 froid, moitié en réussite ; terrain difficile temporaire. Affinité +3 sur la partie froid.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "damage": "2d8+4d6+3",
        "damageType": "mixtes : contondants + froid",
        "economy": "action"
      },
      {
        "name": "Cône de froid N5",
        "detail": "Cône 18 m, JS CON DD 18 : 8d8 froid, moitié en réussite ; + Affinité +3. Une créature tuée devient statue de glace jusqu’à fonte.",
        "kind": "save",
        "dc": 18,
        "save": "CON",
        "damage": "8d8+3",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Convocation d’esprit draconique N5",
        "detail": "Sort additionnel de campagne, concentration jusqu’à 1 h. L’esprit partage l’initiative de Samoth et joue juste après lui. Profil « Esprit draconique d’argent » ajouté à la bibliothèque.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Flammes de la magie pure",
        "detail": "1/jour : un sort de niveau 1+ inflige +1d10 radiants par niveau du sort. Ne change pas le type principal du sort.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Sort renforcé",
        "detail": "1 point : après les dégâts, relance jusqu’à 3 dés et garde les nouveaux résultats.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Sort accéléré",
        "detail": "2 points : transforme un sort d’1 action en action bonus, avec les restrictions normales des sorts en action bonus.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Sort jumeau",
        "detail": "Coût = niveau du sort (1 pour tour de magie) : ajoute une seconde cible éligible à un sort mono-cible non personnel.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "reactions": [
      {
        "name": "Bouclier N1",
        "detail": "Quand Samoth est touché ou ciblé par Projectile magique : +5 CA jusqu’au début de son prochain tour ; CA habituelle 14 → 19.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Absorption des éléments N1",
        "detail": "Quand il subit acide/froid/feu/foudre/tonnerre : résistance au type jusqu’au début de son prochain tour, y compris contre les dégâts déclencheurs ; prochaine attaque de mêlée +1d6 de ce type.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Contresort N3",
        "detail": "À 18 m, interrompt un sort. N3 ou moins automatique ; au-dessus, test de CHA brut +3 contre DD 10 + niveau, sauf emplacement suffisamment haut.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Ailes protectrices",
        "detail": "4/repos long. Quand une créature vue à 1,50 m ou moins, Samoth compris, est touchée : +4 CA contre cette attaque seulement.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Emplacements N1",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N2",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N3",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N4",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N5",
        "max": 2,
        "start": 2,
        "reset": "repos long"
      },
      {
        "name": "Points de sorcellerie",
        "max": 10,
        "start": 10,
        "reset": "repos long"
      },
      {
        "name": "Bâton de Givre — charges",
        "max": 10,
        "start": 10,
        "reset": "1d6+4 à l’aube"
      },
      {
        "name": "Ailes protectrices",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Flammes de la magie pure",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Soins gratuit",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Fiole sanguine — regain 5 SP",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Valeurs finales +10 / DD 18 = CHA 17, maîtrise +4, Fiole sanguine +2 et Bâton +1. Le Bâton actuel possède 10 charges (carte récente). Convocation d’esprit draconique est conservée comme sort additionnel de campagne et non comme 12e sort connu standard."
  },
  {
    "id": "comp-esprit-draconique-samoth",
    "category": "companion",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Invocation",
      "Samoth"
    ],
    "name": "Esprit draconique d’argent",
    "subtitle": "Invocation de Samoth · Dragon métallique N5",
    "type": "Dragon spirituel métallique",
    "size": "G",
    "cr": "",
    "ac": 19,
    "hp": 50,
    "initiative": 1,
    "speed": "9 m · vol 18 m · nage 9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 19,
      "DEX": 14,
      "CON": 17,
      "INT": 10,
      "SAG": 14,
      "CHA": 14
    },
    "saves": "",
    "saveMods": {},
    "skills": {},
    "damageResistances": [
      "acide",
      "froid",
      "feu",
      "foudre",
      "poison"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Charmé",
      "Effrayé",
      "Empoisonné"
    ],
    "senses": "Vision aveugle 9 m · vision dans le noir 18 m · Perception passive 12 · draconique ; comprend les langues de Samoth",
    "traits": [
      {
        "name": "Résistance partagée",
        "detail": "À l’invocation, Samoth choisit l’une des résistances de l’esprit et la gagne jusqu’à la fin du sort.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Déchirements puis Souffle selon le profil du sort.",
        "kind": "multiattack",
        "sequence": "Déchirement*2;Souffle*1",
        "economy": "action"
      },
      {
        "name": "Déchirement",
        "detail": "Attaque de mêlée, portée 3 m.",
        "kind": "attack",
        "bonus": 10,
        "damage": "1d6+9",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Souffle — froid recommandé",
        "detail": "Cône de 9 m, JS DEX DD 18, 2d6 du type choisi ; froid recommandé pour Samoth.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "damage": "2d6",
        "damageType": "froid",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "phases": [],
    "resources": [],
    "notes": "Sort de niveau 5 : partage l’initiative de Samoth et joue immédiatement après lui. Obéit sans action ; sans ordre, Esquive et se repositionne."
  },
  {
    "id": "pj-kentaro-amane",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Maharles",
      "Aen"
    ],
    "name": "Kentaro Amane",
    "subtitle": "Dhampire · Occultiste 10 · Lame Maudite · ancien kensei d’Aen",
    "type": "Dhampire · Occultiste Lame Maudite",
    "size": "M",
    "cr": "",
    "ac": 18,
    "hp": 103,
    "initiative": 2,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 10,
      "DEX": 14,
      "CON": 16,
      "INT": 10,
      "SAG": 10,
      "CHA": 18
    },
    "saves": "FOR +0, DEX +2, CON +3, INT +0, SAG +4, CHA +8",
    "saveMods": {
      "FOR": 0,
      "DEX": 2,
      "CON": 3,
      "INT": 0,
      "SAG": 4,
      "CHA": 8
    },
    "skills": {
      "athletisme": {
        "mod": 0
      },
      "acrobaties": {
        "mod": 2
      },
      "escamotage": {
        "mod": 2
      },
      "discretion": {
        "mod": 2,
        "note": "Désavantage en demi-plate"
      },
      "arcanes": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "histoire": {
        "mod": 0
      },
      "investigation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "nature": {
        "mod": 0
      },
      "religion": {
        "mod": 0
      },
      "dressage": {
        "mod": 0
      },
      "intuition": {
        "mod": 0
      },
      "medecine": {
        "mod": 0
      },
      "perception": {
        "mod": 0
      },
      "survie": {
        "mod": 0
      },
      "intimidation": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "representation": {
        "mod": 4
      },
      "tromperie": {
        "mod": 8,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "nécrotiques"
    ],
    "damageVulnerabilities": [
      "radiants"
    ],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Vision dans le noir 18 m · Perception passive 10 · Intuition passive 10 · Investigation passive 14 · commun, infernal, langue orientale",
    "traits": [
      {
        "name": "Vitalité des morts-vivants",
        "detail": "Résistance aux dégâts nécrotiques, vulnérabilité aux dégâts radiants, avantage aux sauvegardes contre Empoisonné et les maladies.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Soif ténébreuse",
        "detail": "Peut mordre une créature neutralisée ou empoignée. Si elle a du sang et n’est ni artificielle ni morte-vivante : +4 nécrotiques et autant de PV temporaires, 1/repos court ou long.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Lame assoiffée",
        "detail": "Avec l’action Attaquer et l’arme de pacte, Kentaro effectue deux attaques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Décharge déchirante",
        "detail": "Chaque rayon de Décharge occulte ajoute CHA +4 aux dégâts.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Châtiment occulte",
        "detail": "1 fois/tour après une touche avec l’arme de pacte : dépense un emplacement N5 pour +6d8 force ; cible TG ou inférieure peut être mise À terre.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Esprit occulte",
        "detail": "Avantage aux JS de CON pour maintenir la concentration.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Guerrier maudit",
        "detail": "CHA peut servir aux jets d’attaque et dégâts de l’arme de pacte éligible ; les valeurs de fiche de Kane et des Lames l’intègrent.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Marque de l’éclipse — Lames Éveillées",
        "detail": "Si la même cible est touchée par Solinar et Sélhane pendant le tour : +1d8 radiants +1d8 psychiques et effet de Lueurs féeriques jusqu’à fin du prochain tour ; seul Kentaro bénéficie de l’avantage.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Parade crépusculaire — Lames Éveillées",
        "detail": "Tant que les deux lames sont maniées : +1 CA. Le dossier conserve CA 18 de la fiche comme valeur active globale.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — Lames de l’Éclipse",
        "detail": "Une attaque de Solinar et une de Sélhane avec l’action Attaquer.",
        "kind": "multiattack",
        "sequence": "Solinar — éveillée*1;Sélhane — éveillée*1",
        "economy": "action"
      },
      {
        "name": "Attaques multiples — Kane",
        "detail": "Deux attaques avec Kane.",
        "kind": "multiattack",
        "sequence": "Kane*2",
        "economy": "action"
      },
      {
        "name": "Kane",
        "detail": "Épée longue +1. Dégâts de fiche : 1d8+5 (ou 1d10+5 à deux mains) +2d6 feu.",
        "kind": "attack",
        "bonus": 9,
        "damage": "1d8+5+2d6",
        "damageType": "mixtes : tranchants + feu",
        "economy": "action"
      },
      {
        "name": "Solinar — éveillée",
        "detail": "Épée longue de pacte +2. 1d8+6 tranchants +1d6 radiants.",
        "kind": "attack",
        "bonus": 10,
        "damage": "1d8+6+1d6",
        "damageType": "mixtes : tranchants + radiants",
        "economy": "action"
      },
      {
        "name": "Sélhane — éveillée",
        "detail": "Épée longue de pacte +2. 1d8+6 tranchants +1d6 psychiques.",
        "kind": "attack",
        "bonus": 10,
        "damage": "1d8+6+1d6",
        "damageType": "mixtes : tranchants + psychiques",
        "economy": "action"
      },
      {
        "name": "Décharge occulte",
        "detail": "Deux rayons séparés ; peuvent viser la même cible ou des cibles différentes.",
        "kind": "multiattack",
        "sequence": "Rayon de Décharge occulte*2",
        "economy": "action"
      },
      {
        "name": "Rayon de Décharge occulte",
        "detail": "Portée 36 m.",
        "kind": "attack",
        "bonus": 8,
        "damage": "1d10+4",
        "damageType": "force",
        "economy": "action"
      },
      {
        "name": "Morsure — nourrissage",
        "detail": "Cible neutralisée ou empoignée. 1 perforant +4 nécrotiques si nourrissage ; autant de PV temporaires, 1/repos.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Malédiction de la Lame Maudite",
        "detail": "1/repos court ou long, action bonus, cible à 9 m, 1 min : +4 dégâts contre elle, critique 19–20, récupère 14 PV si elle meurt.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Armure d’Agathys N5",
        "detail": "25 PV temporaires ; tant qu’ils subsistent, 25 dégâts de froid à chaque attaquant de mêlée qui touche.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Maléfice N5",
        "detail": "Action bonus, concentration jusqu’à 24 h : +1d6 nécrotiques à chaque attaque qui touche ; désavantage aux tests d’une caractéristique choisie ; transfert après 0 PV.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Foulée brumeuse",
        "detail": "Action bonus : téléportation 9 m.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Suggestion",
        "detail": "JS SAG DD 16, concentration jusqu’à 8 h.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Invisibilité N5",
        "detail": "Jusqu’à quatre créatures avec l’emplacement de niveau 5, concentration jusqu’à 1 h.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Porte dimensionnelle",
        "detail": "Téléportation jusqu’à 150 m, peut emmener une créature consentante de taille égale ou inférieure.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Ombre d’égarement",
        "detail": "Concentration 1 min : lourdement voilé pour les autres, résistance aux radiants, 2d8 nécrotiques à une créature à 3 m qui le touche.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Bannissement N5",
        "detail": "Deux cibles avec l’emplacement N5, JS CHA DD 16, concentration 1 min.",
        "kind": "save",
        "dc": 16,
        "save": "CHA",
        "economy": "action"
      },
      {
        "name": "Châtiment de bannissement",
        "detail": "Action bonus, concentration 1 min : prochaine attaque d’arme qui touche +5d10 force ; si cible à 50 PV ou moins après l’attaque, bannissement.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Jeter une malédiction N5",
        "detail": "Via Signe de mauvais augure : JS SAG DD 16 ; durée 8 h sans concentration avec emplacement N5.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Vision de la Pierre",
        "detail": "1/jour, 12 s : voit à travers illusions et objets solides dans un rayon de 18 m ; avantage à sa prochaine attaque.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Pas entre les rayons — Lames Éveillées",
        "detail": "1/repos court ou long, action bonus : Foulée brumeuse.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Armure des maléfices",
        "detail": "Quand la cible de la Malédiction de la Lame Maudite touche Kentaro : lance 1d6 ; sur 4–6, l’attaque rate malgré le résultat initial.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Tombeau de Lazarus — option à confirmer",
        "detail": "Version étendue : 1/repos court ou long quand Kentaro subit des dégâts, 100 PV temporaires ; neutralisé et vitesse 0 jusqu’à fin du prochain tour. Absent du dernier grimoire de 6 pages : ne considérer actif que si la table le valide.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Emplacements de pacte N5",
        "max": 2,
        "start": 2,
        "reset": "repos court/long"
      },
      {
        "name": "Malédiction de la Lame Maudite",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Spectre maudit",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Soif ténébreuse — PV temp",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Vision de la Pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Pas entre les rayons",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Tombeau de Lazarus — si actif",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Inspiration",
        "max": 1,
        "start": 0,
        "reset": "MJ"
      }
    ],
    "notes": "CA 18 retenue : demi-plate 15 + DEX 2 + cape +1. FOR 10 avec bracelet, base 8. Les Lames Solinar/Sélhane figurent bien sur la fiche avec leurs valeurs Éveillées, mais l’état exact du Vestige n’est pas explicitement coché ; les propriétés Dormant/Éveillé restent documentées sans inventer un état supplémentaire. Armure de sang est inscrite sur la fiche mais ses paramètres ne sont pas fournis."
  },
  {
    "id": "pj-zephyr",
    "category": "character",
    "source": "Dossier utilisateur",
    "tags": [
      "Compagnie Créole",
      "Niveau 10",
      "Porteur d’Étincelle",
      "Flamme d’Argent",
      "Maharles"
    ],
    "name": "Zéphyr",
    "subtitle": "Tieffelin · Paladin 10 · Serment de Conquête · Flamme d’Argent",
    "type": "Tieffelin · Paladin de la Conquête",
    "size": "M",
    "cr": "",
    "ac": 21,
    "hp": 84,
    "initiative": -1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 25,
      "DEX": 8,
      "CON": 15,
      "INT": 9,
      "SAG": 8,
      "CHA": 19
    },
    "saves": "FOR +11, DEX +3, CON +6, INT +3, SAG +7, CHA +12",
    "saveMods": {
      "FOR": 11,
      "DEX": 3,
      "CON": 6,
      "INT": 3,
      "SAG": 7,
      "CHA": 12
    },
    "skills": {
      "athletisme": {
        "mod": 7
      },
      "acrobaties": {
        "mod": -1
      },
      "escamotage": {
        "mod": -1
      },
      "discretion": {
        "mod": -1
      },
      "arcanes": {
        "mod": -1
      },
      "histoire": {
        "mod": -1
      },
      "investigation": {
        "mod": -1
      },
      "nature": {
        "mod": -1
      },
      "religion": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "dressage": {
        "mod": -1
      },
      "intuition": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "medecine": {
        "mod": -1
      },
      "perception": {
        "mod": -1
      },
      "survie": {
        "mod": -1
      },
      "intimidation": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "representation": {
        "mod": 4
      },
      "tromperie": {
        "mod": 4
      }
    },
    "damageResistances": [
      "feu"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 9 · Intuition passive 13 · Investigation passive 9 · commun, elfique, halfelin",
    "traits": [
      {
        "name": "Aura de protection",
        "detail": "Rayon 3 m, conscient : Zéphyr et ses alliés ajoutent +4 à tous leurs JS. Les valeurs de sauvegarde de Zéphyr l’intègrent déjà.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Aura de conquête",
        "detail": "Une créature Effrayée par Zéphyr a vitesse 0 dans l’aura de 3 m. Si elle commence son tour dans l’aura : 5 dégâts psychiques.",
        "kind": "text",
        "economy": "none",
        "timing": "start"
      },
      {
        "name": "Aura de bravoure",
        "detail": "Rayon 3 m, conscient : Zéphyr et ses alliés ne peuvent pas être Effrayés.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Santé divine",
        "detail": "Immunité aux maladies.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Résistance infernale",
        "detail": "Résistance aux dégâts de feu.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Attaque supplémentaire",
        "detail": "L’action Attaquer donne deux attaques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Marque d’Asmodeus",
        "detail": "Après utilisation gratuite du Décret : tant que la Marque est active, soigner autrui avec Imposition des mains réduit le max de PV de Zéphyr de la moitié des PV rendus, arrondi inférieur, plancher 42 PV ; disparaît après repos long + prière sincère.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Protection de l’Ancre Sacrée",
        "detail": "1/jour : choisit une attaque subie et en réduit les dégâts de moitié ; tous les alliés à 9 m récupèrent 14 PV. Le coût exact en action/réaction n’est pas documenté.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — Poings",
        "detail": "Deux attaques de Poings de paladin.",
        "kind": "multiattack",
        "sequence": "Poings de paladin*2",
        "economy": "action"
      },
      {
        "name": "Poings de paladin",
        "detail": "Attaque principale de la fiche.",
        "kind": "attack",
        "bonus": 11,
        "damage": "1d8+7",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Châtiment divin N1",
        "detail": "Après une touche de mêlée : +2d8 radiants ; +1d8 contre fiélon ou mort-vivant.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Châtiment divin N2",
        "detail": "Après une touche de mêlée : +3d8 radiants ; +1d8 contre fiélon ou mort-vivant.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Châtiment divin N3",
        "detail": "Après une touche de mêlée : +4d8 radiants ; +1d8 contre fiélon ou mort-vivant.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Sens divin",
        "detail": "5/repos long, action : jusqu’à fin du prochain tour, localisation des célestes/fiélons/morts-vivants à 18 m hors abri total, plus lieux/objets consacrés ou profanés.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Imposition des mains",
        "detail": "Réserve 50 PV. Action, contact : dépense autant de points que souhaité pour soigner ; 5 points peuvent neutraliser une maladie ou un poison. La Marque d’Asmodeus peut modifier le coût sur autrui.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Présence conquérante",
        "detail": "Conduit divin, action, rayon 9 m : créatures choisies visibles, JS SAG DD 16 ou Effrayées 1 min ; nouveau JS en fin de tour.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Frappe guidée",
        "detail": "Conduit divin : après avoir vu le d20 d’une attaque mais avant de savoir si elle touche, +10 au jet.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Injonction N1",
        "detail": "18 m, JS SAG DD 16 ; ordre d’un mot au prochain tour. Le Décret ajoute Agenouille-toi, Confesse, Tais-toi, Cède.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Injonction infernale — Décret",
        "detail": "1/repos long, sans emplacement ; peut être lancée comme réaction au début du tour d’une créature visible. JS SAG DD 16.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "reaction"
      },
      {
        "name": "Armure d’Agathys",
        "detail": "N1/N2/N3 : 5/10/15 PV temporaires ; tant qu’ils restent, l’attaquant de mêlée subit autant de froid.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Bénédiction",
        "detail": "Concentration 1 min, jusqu’à 3 créatures à 9 m : +1d4 aux attaques et JS.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Châtiment tonitruant",
        "detail": "Action bonus, concentration : prochaine attaque de mêlée +2d6 tonnerre ; JS FOR DD 16 ou repoussé 3 m et À terre.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Bouclier de la foi",
        "detail": "Action bonus, concentration jusqu’à 10 min : +2 CA à une créature à 18 m. Zéphyr peut passer de CA 21 à 23.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Marque du chasseur",
        "detail": "Action bonus, concentration : +1d6 dégâts sur chaque attaque d’arme qui touche la cible ; transfert après 0 PV.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Aide N2",
        "detail": "Jusqu’à 3 créatures : PV actuels et max +5 pendant 8 h ; +5 supplémentaires par niveau supérieur.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Arme spirituelle",
        "detail": "Action bonus, 18 m, 1 minute ; +8 pour toucher, 1d8+4 force ; sans concentration selon la fiche.",
        "kind": "attack",
        "bonus": 8,
        "damage": "1d8+4",
        "damageType": "force",
        "economy": "bonus"
      },
      {
        "name": "Foulée brumeuse",
        "detail": "Action bonus : téléportation 9 m.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Jeter une malédiction",
        "detail": "JS SAG DD 16 ; options classiques de malédiction, concentration N3.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Peur",
        "detail": "Cône 9 m, JS SAG DD 16, concentration : lâche ce qui est tenu, Effrayé et doit Foncer pour s’éloigner ; peut retenter hors ligne de vue.",
        "kind": "save",
        "dc": 16,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Revivifier",
        "detail": "Contact, créature morte depuis moins d’1 min, revient à 1 PV ; nécessite diamant 300 po consommé.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Aura de vitalité",
        "detail": "Concentration 1 min ; aura 9 m. Action bonus à chaque tour : rend 2d6 PV à une créature dans l’aura.",
        "kind": "heal",
        "damage": "2d6",
        "damageType": "PV",
        "economy": "bonus"
      },
      {
        "name": "Expert de la charge",
        "detail": "Après Foncer et déplacement d’au moins 3 m en ligne droite : attaque de mêlée bonus +5 dégâts ou bousculade repoussant jusqu’à 3 m.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Style Protection",
        "detail": "Bouclier requis. Quand une créature visible attaque une cible autre que Zéphyr à 1,50 m ou moins : impose désavantage au jet d’attaque.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Représailles infernales",
        "detail": "Quand une créature visible à 18 m blesse Zéphyr : JS DEX DD 16 ; 2d10 feu, moitié en réussite.",
        "kind": "save",
        "dc": 16,
        "save": "DEX",
        "damage": "2d10",
        "damageType": "feu",
        "economy": "reaction"
      },
      {
        "name": "Injonction infernale — Décret",
        "detail": "1/repos long : peut lancer Injonction en réaction quand une créature visible commence son tour.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "BINAH — Mue prismatique (si équipé)",
        "detail": "Dormant : 3/j, résistance temporaire à feu/froid/foudre/acide/force jusqu’à fin du tour de l’attaquant. Éveillé : réaction illimitée, immunité temporaire. BINAH n’est pas automatiquement le Bouclier +3 actif.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "BINAH — Déviation chromatique (si Éveillé)",
        "detail": "3/j : attaquant JS CON DD 15 ou désavantage à l’attaque.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Imposition des mains",
        "max": 50,
        "start": 50,
        "reset": "repos long"
      },
      {
        "name": "Sens divin",
        "max": 5,
        "start": 5,
        "reset": "repos long"
      },
      {
        "name": "Conduit divin",
        "max": 1,
        "start": 1,
        "reset": "repos court/long"
      },
      {
        "name": "Emplacements N1",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N2",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N3",
        "max": 2,
        "start": 2,
        "reset": "repos long"
      },
      {
        "name": "Décret de la Corne Brisée",
        "max": 1,
        "start": 1,
        "reset": "repos long"
      },
      {
        "name": "Marque d’Asmodeus (0/1)",
        "max": 1,
        "start": 0,
        "reset": "repos long + prière"
      },
      {
        "name": "Ancre sacrée",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "CA 21 active avec cotte de mailles + Bouclier +3. BINAH est un Vestige distinct et n’est pas fusionné automatiquement avec ce bouclier ; si équipé, il faut recalculer la CA selon son état. FOR 25 vient de la Ceinture de géant du feu. Les autres traits tieffelins classiques non présents dans les sources ne sont pas ajoutés."
  },
  {
    "id": "npc-felipe-dofil",
    "category": "npc",
    "source": "Dossier utilisateur",
    "tags": [
      "Maharles",
      "PNJ allié",
      "Magie des Bonbons",
      "Niveau 10"
    ],
    "name": "Felipe Dofil",
    "subtitle": "Humain · Ensorceleur 10 · Magie des Bonbons · PNJ",
    "type": "Humanoïde humain · Ensorceleur",
    "size": "M",
    "cr": "10",
    "ac": 15,
    "hp": 135,
    "initiative": 2,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 12,
      "DEX": 14,
      "CON": 16,
      "INT": 13,
      "SAG": 12,
      "CHA": 20
    },
    "saves": "FOR +1, DEX +2, CON +8, INT +1, SAG +6, CHA +10",
    "saveMods": {
      "FOR": 1,
      "DEX": 2,
      "CON": 8,
      "INT": 1,
      "SAG": 6,
      "CHA": 10
    },
    "skills": {
      "athletisme": {
        "mod": 1
      },
      "acrobaties": {
        "mod": 2
      },
      "escamotage": {
        "mod": 2
      },
      "discretion": {
        "mod": 2
      },
      "arcanes": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "histoire": {
        "mod": 1
      },
      "investigation": {
        "mod": 1
      },
      "nature": {
        "mod": 1
      },
      "religion": {
        "mod": 1
      },
      "dressage": {
        "mod": 1
      },
      "intuition": {
        "mod": 1
      },
      "medecine": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 1
      },
      "survie": {
        "mod": 1
      },
      "intimidation": {
        "mod": 5
      },
      "persuasion": {
        "mod": 10,
        "status": "Maîtrise"
      },
      "representation": {
        "mod": 10,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 10,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "poison"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Empoisonné"
    ],
    "senses": "Perception passive 11 · commun, gnome, draconique, sylvestre",
    "traits": [
      {
        "name": "Magie sucrée",
        "detail": "Tous les sorts prennent une apparence de confiserie sans changer leur type de dégâts sauf indication contraire.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Incantation",
        "detail": "Lanceur de sorts niveau 10, CHA 20 : DD 18, +10 pour toucher. Bâton-Sucette comme focaliseur.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Réserve de sorcellerie",
        "detail": "10 points. Métamagies : Sort accéléré, Sort jumelé, Sort intensifié.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Bonbons médicinaux",
        "detail": "Quand Felipe rend des PV avec un sort ou une aptitude, la cible gagne aussi 5 PV temporaires, au maximum 1 fois/tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Vigueur sirupeuse",
        "detail": "Avantage aux JS contre poison et effets de mise à terre. Une créature qui le touche au corps à corps : JS FOR DD 15 ou vitesse −3 m jusqu’à fin de son prochain tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Odeur de fête foraine",
        "detail": "Alliés à 3 m : avantage aux JS contre Effrayé, sauf si Felipe leur est hostile.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Bâton-Sucette — résistance",
        "detail": "Felipe résiste au feu tant qu’il tient le Bâton-Sucette.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Bâton-Sucette de Dofil",
        "detail": "Mêlée ou attaque à distance magique, allonge 1,50 m ou portée 36/108 m.",
        "kind": "attack",
        "bonus": 10,
        "damage": "4d6+4",
        "damageType": "force",
        "economy": "action"
      },
      {
        "name": "Rafale de dragées",
        "detail": "Jusqu’à 3 créatures à 36 m : JS DEX DD 18 ; 4d6 force. Échec de 5+ : vitesse réduite de moitié jusqu’au début du prochain tour de Felipe.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "damage": "4d6",
        "damageType": "force",
        "economy": "action"
      },
      {
        "name": "Bonbon de secours",
        "detail": "4/j, cible à 18 m : 4d6+4 PV et 5 PV temporaires grâce à Bonbons médicinaux.",
        "kind": "heal",
        "damage": "4d6+4",
        "damageType": "PV",
        "economy": "action"
      },
      {
        "name": "Déluge de confiseries",
        "detail": "Recharge 5–6, rayon 6 m à 36 m. Ennemis : JS DEX DD18, 8d6 contondants magiques + vitesse −3 m en échec, moitié en réussite. Alliés : récupèrent 4d6 PV au lieu de subir des dégâts.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 18,
        "save": "DEX",
        "damage": "8d6",
        "damageType": "contondants",
        "economy": "action",
        "target": "enemy"
      },
      {
        "name": "Invocation des Golems-Bonbons",
        "detail": "1/jour : jusqu’à 4 Golems-Bonbons à 18 m, durée 1 min, jouent juste après Felipe, obéissent à ses ordres et le protègent sans ordre. Felipe doit tenir le Bâton-Sucette.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Sucre pétillant",
        "detail": "4/repos long : action bonus, créature consentante à 18 m gagne +3 m vitesse et +1 CA jusqu’à fin du prochain tour.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Bonbon réflexe",
        "detail": "Action bonus, dépense 1 point de sorcellerie : un allié à 18 m récupère 1d4+5 PV.",
        "kind": "heal",
        "damage": "1d4+5",
        "damageType": "PV",
        "economy": "bonus"
      },
      {
        "name": "Trait de feu",
        "detail": "Tour de magie de la fiche.",
        "kind": "attack",
        "bonus": 10,
        "damage": "2d10",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Rayon de givre",
        "detail": "Tour de magie de la fiche.",
        "kind": "attack",
        "bonus": 10,
        "damage": "2d8",
        "damageType": "froid",
        "economy": "action"
      },
      {
        "name": "Projectile magique N1",
        "detail": "Trois projectiles automatiques.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Rayon ardent N2",
        "detail": "Trois rayons de feu, jets séparés.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Boule de feu N3",
        "detail": "Caramel incandescent ; JS DEX DD 18.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "damage": "8d6",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Hâte N3",
        "detail": "Concentration ; sucre pétillant dans les veines.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Tempête de grêle N4",
        "detail": "Pluie de glaçons au sucre.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Porte dimensionnelle N4",
        "detail": "Téléportation.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Soin de groupe N5",
        "detail": "Sort de soin de groupe de la fiche.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Immobilisation de monstre N5",
        "detail": "Réglisse et caramel durci ; JS SAG DD 18 selon le sort.",
        "kind": "save",
        "dc": 18,
        "save": "SAG",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Caramel protecteur",
        "detail": "Quand une créature à 18 m subit des dégâts : réduit de 2d8+4. Si les dégâts tombent à 0, cible +5 PV temporaires.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Contresort sucré",
        "detail": "Felipe lance Contresort ; en réussite, l’énergie se condense en bonbon noirâtre.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [
      {
        "name": "Points de sorcellerie",
        "max": 10,
        "start": 10,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N1",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N2",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N3",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N4",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Emplacements N5",
        "max": 2,
        "start": 2,
        "reset": "repos long"
      },
      {
        "name": "Bonbon de secours",
        "max": 4,
        "start": 4,
        "reset": "jour"
      },
      {
        "name": "Sucre pétillant",
        "max": 4,
        "start": 4,
        "reset": "repos long"
      },
      {
        "name": "Invocation Golems-Bonbons",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Bâton-Sucette — charges (Dormant)",
        "max": 6,
        "start": 6,
        "reset": "1d6 à l’aube"
      }
    ],
    "notes": "Armure du mage active : CA 15 ; sans armure : CA 12. Le statblock utilise DD 18/+10. Le Bâton-Sucette possède des états Dormant/Éveillé/Exalté ; la ressource de charges par défaut est le profil Dormant (+1, 6 charges), cohérent avec le bonus +10/DD18 du statblock. À l’ajout de Felipe, ENCOUNTER peut ajouter automatiquement 4 Golems-Bonbons ordinaires au même rang d’initiative, juste après lui."
  },
  {
    "id": "comp-golem-bonbon",
    "category": "companion",
    "source": "Dossier utilisateur",
    "tags": [
      "Felipe Dofil",
      "Invocation",
      "Maharles"
    ],
    "name": "Golem-Bonbon",
    "subtitle": "Compagnon de Felipe · Créature artificielle M · FP 3",
    "type": "Créature artificielle",
    "size": "M",
    "cr": "3",
    "ac": 15,
    "hp": 58,
    "initiative": -1,
    "speed": "6 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 16,
      "DEX": 8,
      "CON": 15,
      "INT": 3,
      "SAG": 10,
      "CHA": 5
    },
    "saves": "",
    "saveMods": {},
    "skills": {},
    "damageResistances": [],
    "damageVulnerabilities": [
      "feu"
    ],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmé",
      "Empoisonné",
      "Épuisement",
      "Effrayé"
    ],
    "senses": "Vision aveugle 18 m · comprend Felipe",
    "traits": [
      {
        "name": "Résistance physique conditionnelle",
        "detail": "Résistance aux dégâts contondants, perforants et tranchants provenant d’attaques non magiques. Non automatisée pour ne pas réduire les attaques magiques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Corps de sucre durci",
        "detail": "Peut traverser l’espace d’un allié. S’il subit du feu : vitesse −3 m jusqu’à fin de son prochain tour.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Rempart collant",
        "detail": "Terrain difficile pour les ennemis à 1,50 m.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Explosion de sucre",
        "detail": "À 0 PV : ennemis à 1,50 m, JS DEX DD 13 ou 2d6 perforants magiques ; alliés gagnent 5 PV temporaires.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Coup de poing collant",
        "detail": "JS FOR DD 13 après la touche ou vitesse −3 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Étreinte de nougat",
        "detail": "Sur touche : 1d4+3 contondants et cible Agrippée, DD 13 pour s’échapper.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [],
    "notes": "Invocation de Felipe : jusqu’à 4, durée 1 minute, jouent juste après lui et obéissent à ses ordres ; sans ordre, protègent Felipe."
  },
  {
    "id": "comp-golem-bonbon-superieur",
    "category": "companion",
    "source": "Dossier utilisateur",
    "tags": [
      "Felipe Dofil",
      "Invocation",
      "Maharles"
    ],
    "name": "Golem-Bonbon supérieur",
    "subtitle": "Compagnon de Felipe · Créature artificielle G · FP 6",
    "type": "Créature artificielle",
    "size": "G",
    "cr": "6",
    "ac": 16,
    "hp": 126,
    "initiative": -1,
    "speed": "6 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 20,
      "DEX": 8,
      "CON": 20,
      "INT": 3,
      "SAG": 10,
      "CHA": 5
    },
    "saves": "",
    "saveMods": {},
    "skills": {},
    "damageResistances": [],
    "damageVulnerabilities": [
      "feu"
    ],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmé",
      "Empoisonné",
      "Épuisement",
      "Effrayé",
      "Paralysé"
    ],
    "senses": "Vision aveugle 18 m · comprend son invocateur",
    "traits": [
      {
        "name": "Résistance physique conditionnelle",
        "detail": "Résistance aux dégâts contondants, perforants et tranchants provenant d’attaques non magiques. Non automatisée pour éviter les faux positifs.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Masse sucrée",
        "detail": "Les alliés à 1,50 m bénéficient d’un abri partiel contre les attaques à distance.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Corps collant",
        "detail": "Une créature qui le touche au corps à corps : JS FOR DD 15 ou Agrippée jusqu’à fin de son prochain tour.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Coups de poing collants.",
        "kind": "multiattack",
        "sequence": "Coup de poing collant*2",
        "economy": "action"
      },
      {
        "name": "Coup de poing collant",
        "detail": "Sur touche : JS FOR DD 15 ou vitesse réduite de moitié.",
        "kind": "attack",
        "bonus": 8,
        "damage": "1d10+5",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Projection de nougat",
        "detail": "Portée 9/18 m ; JS DEX DD 15 ou Entravé jusqu’à fin du prochain tour.",
        "kind": "attack",
        "bonus": 8,
        "damage": "1d8+5",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Rempart de caramel",
        "detail": "Quand un allié à 1,50 m est touché, impose le désavantage au jet d’attaque.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "phases": [],
    "resources": [],
    "notes": "Profil supérieur du Bâton-Sucette Exalté : Colosse de sucre (6 charges) permet d’invoquer un Golem-Bonbon supérieur."
  },
  {
    "id": "maharles-machoire-harde",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Mâchoire de la Harde",
    "subtitle": "Humanoïde (goliath) · loyal neutre · capture/traction",
    "type": "Humanoïde (goliath) · loyal neutre · capture/traction",
    "size": "M",
    "cr": "2",
    "ac": 15,
    "hp": 52,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 17,
      "DEX": 13,
      "CON": 16,
      "INT": 9,
      "SAG": 12,
      "CHA": 10
    },
    "saves": "FOR +5, CON +5",
    "saveMods": {
      "FOR": 5,
      "CON": 5
    },
    "skills": {
      "athletisme": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun, géant",
    "traits": [
      {
        "name": "Carrure puissante",
        "detail": "Compte comme une catégorie de taille supérieure pour charge/pousser/tirer/soulever.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Capture avant meurtre",
        "detail": "Peut infliger des dégâts non létaux au corps à corps sans pénalité ; avantage en Athlétisme pour maintenir une créature agrippée.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux attaques de Harpon-chaîne.",
        "kind": "multiattack",
        "sequence": "Harpon-chaîne*2",
        "economy": "action"
      },
      {
        "name": "Harpon-chaîne",
        "detail": "Mêlée ou portée 6/18 m. Une fois/tour, cible G ou inférieure : JS FOR DD13 ou tirée de 1,50 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Filet lesté",
        "detail": "Recharge 5–6. Cible G ou inférieure à 6 m : JS DEX DD13 ou Entravée ; action Athlétisme/Acrobaties DD13 pour sortir. Filet CA10, 8 PV.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 13,
        "save": "DEX",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Endurance de pierre",
        "detail": "1/jour : réduit les dégâts de 1d12+3.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Endurance de pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Équipement : Harpon-chaîne, filet marqué du clan, 1d4 attaches de prisonnier."
  },
  {
    "id": "maharles-brise-corne",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Brise-Corne de la Harde",
    "subtitle": "Humanoïde (goliath) · neutre · brute/rupture de ligne",
    "type": "Humanoïde (goliath) · neutre · brute/rupture de ligne",
    "size": "M",
    "cr": "4",
    "ac": 16,
    "hp": 85,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 20,
      "DEX": 10,
      "CON": 18,
      "INT": 8,
      "SAG": 11,
      "CHA": 12
    },
    "saves": "FOR +7, CON +6",
    "saveMods": {
      "FOR": 7,
      "CON": 6
    },
    "skills": {
      "athletisme": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 10 · commun, géant",
    "traits": [
      {
        "name": "Charge démolissante",
        "detail": "Après 6 m en ligne droite puis touche avec Marteau-bélier : +2d6 contondants et JS FOR DD15 ou À terre.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Immobile comme le roc",
        "detail": "Avantage aux jets/tests pour résister à une poussée ou éviter d’être À terre.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux attaques de Marteau-bélier.",
        "kind": "multiattack",
        "sequence": "Marteau-bélier*2",
        "economy": "action"
      },
      {
        "name": "Marteau-bélier",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 7,
        "damage": "2d6+5",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Heurt d’épaule",
        "detail": "Cible G ou inférieure : JS FOR DD15 ou repoussée 3 m.",
        "kind": "attack",
        "bonus": 7,
        "damage": "1d8+5",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Endurance de pierre",
        "detail": "1/jour : réduit dégâts de 1d12+4.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Endurance de pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Équipement : Marteau-bélier, plaque de défi gravée, poussière de pierre."
  },
  {
    "id": "maharles-crieur-orage",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Crieur d’Orage",
    "subtitle": "Humanoïde (goliath) · loyal neutre · contrôle/soutien",
    "type": "Humanoïde (goliath) · loyal neutre · contrôle/soutien",
    "size": "M",
    "cr": "4",
    "ac": 15,
    "hp": 71,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 14,
      "DEX": 12,
      "CON": 14,
      "INT": 10,
      "SAG": 16,
      "CHA": 16
    },
    "saves": "CON +4, SAG +5, CHA +5",
    "saveMods": {
      "CON": 4,
      "SAG": 5,
      "CHA": 5
    },
    "skills": {
      "intimidation": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid",
      "foudre",
      "tonnerre"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 15 · commun, géant",
    "traits": [
      {
        "name": "Voix de la Harde",
        "detail": "Alliés de la Harde à 6 m qui l’entendent : avantage aux JS contre Effrayé.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — Éclat",
        "detail": "Deux attaques d’Éclat d’orage.",
        "kind": "multiattack",
        "sequence": "Éclat d’orage*2",
        "economy": "action"
      },
      {
        "name": "Attaques multiples — Bâton",
        "detail": "Deux attaques de Bâton tonnant.",
        "kind": "multiattack",
        "sequence": "Bâton tonnant*2",
        "economy": "action"
      },
      {
        "name": "Éclat d’orage",
        "detail": "Attaque de sort à distance 18 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "3d8",
        "damageType": "tonnerre",
        "economy": "action"
      },
      {
        "name": "Bâton tonnant",
        "detail": "1d8+3 contondants +1d6 tonnerre.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3+1d6",
        "damageType": "mixtes : contondants + tonnerre",
        "economy": "action"
      },
      {
        "name": "Cri d’orage",
        "detail": "Recharge 5–6, cône 6 m, JS CON DD13 : 4d8 tonnerre ; échec repoussé 3 m et pas de réaction jusqu’au début du prochain tour ; réussite moitié sans effets.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 13,
        "save": "CON",
        "damage": "4d8",
        "damageType": "tonnerre",
        "economy": "action"
      },
      {
        "name": "Ralliement de la montagne",
        "detail": "1/jour, bonus : jusqu’à 3 alliés à 9 m gagnent 5 PV temp et se déplacent 1,50 m sans OA.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Réplique tonnante",
        "detail": "2/jour : si une créature à 3 m touche au corps à corps, elle subit 1d10 tonnerre.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Ralliement",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Réplique tonnante",
        "max": 2,
        "start": 2,
        "reset": "jour"
      }
    ],
    "notes": "Soutien de ligne, idéal derrière les Brise-Cornes."
  },
  {
    "id": "maharles-porte-nuit",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde",
      "Sel noir"
    ],
    "name": "Porte-Nuit au sel noir",
    "subtitle": "Humanoïde (goliath) · neutre mauvais · embuscade/anti-soin",
    "type": "Humanoïde (goliath) · neutre mauvais · embuscade/anti-soin",
    "size": "M",
    "cr": "3",
    "ac": 15,
    "hp": 60,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 13,
      "DEX": 17,
      "CON": 16,
      "INT": 12,
      "SAG": 14,
      "CHA": 10
    },
    "saves": "DEX +5, CON +5",
    "saveMods": {
      "DEX": 5,
      "CON": 5
    },
    "skills": {
      "discretion": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid",
      "poison"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Vision dans le noir 18 m · Perception passive 14 · commun, géant",
    "traits": [
      {
        "name": "Habitué aux fumées",
        "detail": "Lumière faible, brouillard et fumées non magiques ne désavantagent pas sa Perception.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Aiguilles noires.",
        "kind": "multiattack",
        "sequence": "Aiguille noire*2",
        "economy": "action"
      },
      {
        "name": "Aiguille noire",
        "detail": "Mêlée ou portée 6/18 m : 1d6+3 perforants +1d4 nécrotiques.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3+1d4",
        "damageType": "mixtes : perforants + nécrotiques",
        "economy": "action"
      },
      {
        "name": "Clou de sel noir",
        "detail": "2/jour, portée 6/18 m : 1d6+3 perforants +2d6 nécrotiques ; JS CON DD13 ou ne peut regagner de PV jusqu’au début du prochain tour du Porte-Nuit.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3+2d6",
        "damageType": "mixtes : perforants + nécrotiques",
        "economy": "action"
      },
      {
        "name": "Brume de sel noir",
        "detail": "Recharge 5–6 : nuage rayon 3 m à 12 m, fortement obscurci jusqu’au début du prochain tour. Créature qui commence dedans : JS CON DD13 ou vitesse moitié et pas de réaction jusqu’à fin du tour.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 13,
        "save": "CON",
        "economy": "action"
      },
      {
        "name": "Se fondre dans la fumée",
        "detail": "Bonus : Se cacher si pénombre/ténèbres/zone obscurcie.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Repli dans la brume",
        "detail": "Quand une attaque de mêlée le rate en pénombre/ténèbres/zone obscurcie : déplacement 3 m sans OA.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Clous de sel noir",
        "max": 2,
        "start": 2,
        "reset": "jour"
      }
    ],
    "notes": "Spécialiste de capture planifiée et d’anti-soin."
  },
  {
    "id": "maharles-dresseur-chaines",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Dresseur de chaînes",
    "subtitle": "Humanoïde (goliath) · loyal neutre · entrave/geôlier lourd",
    "type": "Humanoïde (goliath) · loyal neutre · entrave/geôlier lourd",
    "size": "M",
    "cr": "3",
    "ac": 16,
    "hp": 75,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 18,
      "DEX": 12,
      "CON": 16,
      "INT": 10,
      "SAG": 12,
      "CHA": 13
    },
    "saves": "FOR +6, CON +5",
    "saveMods": {
      "FOR": 6,
      "CON": 5
    },
    "skills": {
      "athletisme": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun, géant",
    "traits": [
      {
        "name": "Maître des entraves",
        "detail": "Avantage aux tests d’Athlétisme liés à une lutte ; peut maintenir jusqu’à deux créatures agrippées par ses chaînes.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Chaînes à crochets.",
        "kind": "multiattack",
        "sequence": "Chaîne à crochets*2",
        "economy": "action"
      },
      {
        "name": "Chaîne à crochets",
        "detail": "Allonge 3 m. Peut agripper une cible G ou inférieure à la place de la déplacer ; évasion DD14.",
        "kind": "attack",
        "bonus": 6,
        "damage": "1d6+4",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Massue de dressage",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 6,
        "damage": "1d8+4",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Serrer les fers",
        "detail": "Bonus : créature agrippée, JS CON DD13 ou 2d6 contondants et Entravée jusqu’au début du prochain tour du Dresseur.",
        "kind": "save",
        "dc": 13,
        "save": "CON",
        "damage": "2d6",
        "damageType": "contondants",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Parade de chaîne",
        "detail": "Ajoute +2 CA contre une attaque de mêlée qui devrait le toucher, s’il voit l’assaillant.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Équipement : chaînes de capture, clés de colliers, marteau de geôlier."
  },
  {
    "id": "maharles-svara",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Svara Brise-Neige",
    "subtitle": "Humanoïde (goliath) · loyal neutre · chasseuse d’élite",
    "type": "Humanoïde (goliath) · loyal neutre · chasseuse d’élite",
    "size": "M",
    "cr": "5",
    "ac": 17,
    "hp": 93,
    "initiative": 3,
    "speed": "10,50 m",
    "attacksPerAction": 3,
    "abilities": {
      "FOR": 18,
      "DEX": 16,
      "CON": 18,
      "INT": 11,
      "SAG": 15,
      "CHA": 13
    },
    "saves": "DEX +6, CON +7, SAG +5",
    "saveMods": {
      "DEX": 6,
      "CON": 7,
      "SAG": 5
    },
    "skills": {
      "athletisme": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 8,
        "status": "Expertise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 15 · commun, géant",
    "traits": [
      {
        "name": "Traqueuse infatigable",
        "detail": "Avantage aux tests pour retrouver une créature vue dans les dernières 24 h.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Trois attaques de Faux-harpon.",
        "kind": "multiattack",
        "sequence": "Faux-harpon*3",
        "economy": "action"
      },
      {
        "name": "Faux-harpon",
        "detail": "Allonge 3 m. 1 fois/tour, peut tirer une cible G ou inférieure de 1,50 m vers elle.",
        "kind": "attack",
        "bonus": 7,
        "damage": "1d8+4",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Filet de chasse",
        "detail": "2/jour : cible G ou inférieure à 9 m, JS DEX DD14 ou Entravée ; action Athlétisme/Acrobaties DD14 pour sortir.",
        "kind": "save",
        "dc": 14,
        "save": "DEX",
        "economy": "action"
      },
      {
        "name": "Marque de capture",
        "detail": "Bonus, cible à 18 m, 1 min : première touche à chacun de ses tours +1d6 dégâts ; avantage pour pister. Une seule cible.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Endurance de pierre",
        "detail": "1/jour : réduit dégâts de 1d12+4.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Pas de la traqueuse",
        "detail": "Quand la cible marquée s’éloigne volontairement : avance de la moitié de sa vitesse vers elle sans OA.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Filets de chasse",
        "max": 2,
        "start": 2,
        "reset": "jour"
      },
      {
        "name": "Endurance de pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Antagoniste récurrente : observe, apprend et peut cesser un combat devenu inutile."
  },
  {
    "id": "maharles-torgar",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde"
    ],
    "name": "Torgar, vieux chef de la Harde",
    "subtitle": "Humanoïde (goliath) · loyal neutre · chef de guerre",
    "type": "Humanoïde (goliath) · loyal neutre · chef de guerre",
    "size": "M",
    "cr": "7",
    "ac": 18,
    "hp": 136,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 3,
    "abilities": {
      "FOR": 21,
      "DEX": 10,
      "CON": 18,
      "INT": 13,
      "SAG": 16,
      "CHA": 17
    },
    "saves": "FOR +8, CON +7, SAG +6, CHA +6",
    "saveMods": {
      "FOR": 8,
      "CON": 7,
      "SAG": 6,
      "CHA": 6
    },
    "skills": {
      "athletisme": {
        "mod": 8,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 6,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 16 · commun, géant, nain",
    "traits": [
      {
        "name": "Autorité du vieux chef",
        "detail": "Alliés de la Harde à 9 m qui l’entendent : avantage JS contre Charmé et Effrayé.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Indomptable",
        "detail": "1/jour : relance un JS raté.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Trois Marteaux des Anciens.",
        "kind": "multiattack",
        "sequence": "Marteau des Anciens*3",
        "economy": "action"
      },
      {
        "name": "Marteau des Anciens",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 8,
        "damage": "2d8+5",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Pierre de guerre",
        "detail": "Portée 12/48 m.",
        "kind": "attack",
        "bonus": 8,
        "damage": "2d10+5",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Ordre de la montagne",
        "detail": "Recharge 5–6 : jusqu’à 2 alliés à 18 m utilisent leur réaction pour se déplacer de la moitié de leur vitesse ; l’un peut ensuite attaquer immédiatement.",
        "kind": "recharge",
        "recharge": "5-6",
        "economy": "action",
        "target": "ally"
      }
    ],
    "reactions": [
      {
        "name": "Parade du patriarche",
        "detail": "+3 CA contre une attaque de mêlée censée le toucher.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Endurance de pierre",
        "detail": "2/jour, à la place de Parade : réduit dégâts de 1d12+4.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Indomptable",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Endurance de pierre",
        "max": 2,
        "start": 2,
        "reset": "jour"
      }
    ],
    "notes": "Vieux chef : commandement et autorité politique, pas simple brute."
  },
  {
    "id": "maharles-zanror-main-montagne",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde",
      "Boss",
      "Arène"
    ],
    "name": "Zanror Main-de-Montagne",
    "subtitle": "Goliath de taille G · chaotique neutre · champion de la Harde · Gants de Pierre du Titan exaltés",
    "type": "Goliath de taille G · chaotique neutre · champion de la Harde · Gants de Pierre du Titan exaltés",
    "size": "M",
    "cr": "22",
    "ac": 20,
    "hp": 405,
    "initiative": 2,
    "speed": "12 m",
    "attacksPerAction": 3,
    "abilities": {
      "FOR": 26,
      "DEX": 14,
      "CON": 26,
      "INT": 12,
      "SAG": 16,
      "CHA": 18
    },
    "saves": "FOR +15, DEX +9, CON +15, SAG +10, CHA +11",
    "saveMods": {
      "FOR": 15,
      "DEX": 9,
      "CON": 15,
      "SAG": 10,
      "CHA": 11
    },
    "skills": {
      "athletisme": {
        "mod": 22
      },
      "intimidation": {
        "mod": 18
      },
      "perception": {
        "mod": 10
      },
      "intuition": {
        "mod": 10
      },
      "survie": {
        "mod": 10
      }
    },
    "damageResistances": [
      "froid",
      "foudre",
      "tonnerre"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Effrayé"
    ],
    "senses": "Perception passive 20 · commun, géant",
    "traits": [
      {
        "name": "Gants de Pierre du Titan — état exalté",
        "detail": "FOR 26. Attaques avec les Gants magiques. Double dégâts aux objets/structures. Avantage aux tests de FOR pour pousser, tirer, soulever, briser, maintenir ou agripper. Compte comme une taille supérieure pour charge/pousser/tirer/soulever.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Résistance physique conditionnelle",
        "detail": "Résistance aux dégâts contondants, perforants et tranchants des attaques non magiques. Non automatisée pour ne pas réduire les attaques magiques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Tenir la ligne",
        "detail": "Avantage aux JS FOR et CON contre déplacement forcé, mise à terre ou entrave physique.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Présence du futur Seigneur-Tonnerre",
        "detail": "Alliés à 18 m qui le voient/entendent : avantage JS contre Effrayé. Un allié de la Harde qui commence à 0 PV sans être mort peut faire immédiatement un JS de mort avec avantage.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Capture rituelle",
        "detail": "Quand Zanror réduit à 0 PV avec une attaque de mêlée, peut rendre la cible Inconsciente et stable ; marque de poussière dorée/noire reconnue comme prise de tonnerre.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Résistance légendaire",
        "detail": "3/jour : transforme un JS raté en réussite.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Indomptable masse",
        "detail": "1/7 jours : à 0 PV sans mort instantanée, tombe à 1 PV ; jusqu’à fin du prochain tour, avantage aux attaques de mêlée et +1d10 contondants. Déclenche immédiatement la phase 3.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Trois attaques de Poing du Titan ; peut remplacer l’une par une tentative d’agrippement.",
        "kind": "multiattack",
        "sequence": "Poing du Titan*3",
        "economy": "action"
      },
      {
        "name": "Poing du Titan",
        "detail": "Allonge 3 m. 4d10+8 contondants +2d6 tonnerre. 1 fois/tour, cible touchée : JS FOR DD23 ou repoussée 3 m ou À terre, au choix de Zanror.",
        "kind": "attack",
        "bonus": 15,
        "damage": "4d10+8+2d6",
        "damageType": "mixtes : contondants + tonnerre",
        "economy": "action"
      },
      {
        "name": "Saisie de montagne",
        "detail": "Allonge 3 m, cible TG ou inférieure. Sur touche : Agrippée, évasion DD23 ; tant qu’agrippée, Entravée. Max 2 créatures.",
        "kind": "attack",
        "bonus": 15,
        "economy": "action"
      },
      {
        "name": "Briser contre terre",
        "detail": "Cible agrippée : JS CON DD23 ; échec 6d10+12 contondants et À terre, réussite moitié sans chute. Peut être non létal.",
        "kind": "save",
        "dc": 23,
        "save": "CON",
        "damage": "6d10+12",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Jet de prise",
        "detail": "Projette une cible agrippée jusqu’à 9 m : 4d8+10 contondants et À terre. Si collision : autre créature JS DEX DD21 ou mêmes dégâts + À terre.",
        "kind": "text",
        "economy": "action"
      },
      {
        "name": "Frappe de faille",
        "detail": "Recharge 5–6, cône 9 m : JS FOR DD23 ; échec 10d8 contondants, À terre et repoussé 3 m ; réussite moitié sans effets. Objets non magiques non portés : dégâts max.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 23,
        "save": "FOR",
        "damage": "10d8",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Grandir sous la pierre",
        "detail": "1/jour, action bonus, 10 min : taille G→TG, allonge +1,50 m, mêlée +1d6 contondants, avantage Athlétisme, peut agripper/bousculer jusqu’à deux tailles supérieures, terrain difficile pour ennemis à 3 m.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Pas du colosse",
        "detail": "Bonus : déplacement jusqu’à moitié vitesse, sans OA des créatures M ou inférieures.",
        "kind": "text",
        "economy": "bonus"
      },
      {
        "name": "Ordre de capture",
        "detail": "Bonus : jusqu’à 3 alliés de la Harde à 18 m se déplacent de la moitié de leur vitesse vers un ennemi visible sans OA.",
        "kind": "text",
        "economy": "bonus",
        "target": "ally"
      },
      {
        "name": "Poids du regard",
        "detail": "Bonus, cible à 18 m : JS SAG DD19 ou Effrayée jusqu’à fin du prochain tour de Zanror ; réussite = immunité 24 h.",
        "kind": "save",
        "dc": 19,
        "save": "SAG",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Endurance de pierre",
        "detail": "Réduit les dégâts subis de 1d12+8.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Main qui retient l’orage",
        "detail": "Quand une créature visible tente de quitter son allonge : attaque de Saisie de montagne.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Refus du sol",
        "detail": "Quand Zanror devrait être mis À terre ou déplacé contre sa volonté : annule l’effet ; créatures choisies à 3 m, JS FOR DD21 ou À terre.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [
      {
        "name": "Pas lourd",
        "detail": "Déplacement jusqu’à moitié vitesse ; sol traversé devient terrain difficile jusqu’au début de son prochain tour.",
        "kind": "text",
        "cost": 1,
        "economy": "legendary"
      },
      {
        "name": "Poing du Titan",
        "detail": "Effectue une attaque de Poing du Titan.",
        "kind": "attack",
        "bonus": 15,
        "damage": "4d10+8+2d6",
        "damageType": "mixtes : contondants + tonnerre",
        "cost": 1,
        "economy": "legendary"
      },
      {
        "name": "Saisie brutale",
        "detail": "Effectue une attaque de Saisie de montagne.",
        "kind": "attack",
        "bonus": 15,
        "cost": 1,
        "economy": "legendary"
      },
      {
        "name": "Briser la ligne",
        "detail": "Coûte 2 : créatures choisies à 3 m, JS FOR DD21 ou repoussées 3 m et À terre.",
        "kind": "save",
        "dc": 21,
        "save": "FOR",
        "cost": 2,
        "economy": "legendary"
      },
      {
        "name": "Appel du Grand Tonnerre",
        "detail": "Coûte 3 : alliés de la Harde à 18 m gagnent 15 PV temporaires et avantage à leur prochaine attaque de mêlée jusqu’au début du prochain tour de Zanror.",
        "kind": "text",
        "cost": 3,
        "economy": "legendary",
        "target": "ally"
      }
    ],
    "lairActions": [
      {
        "name": "Sol de jugement",
        "detail": "Initiative 20 : ennemis au sol à 18 m, JS DEX DD18 ou À terre.",
        "kind": "save",
        "dc": 18,
        "save": "DEX",
        "economy": "lair"
      },
      {
        "name": "Tambours de la Harde",
        "detail": "Initiative 20 : jusqu’au prochain passage à 20, alliés de Zanror dans l’antre ajoutent 1d4 aux attaques de mêlée.",
        "kind": "text",
        "economy": "lair",
        "target": "ally"
      },
      {
        "name": "Anneau de poussière",
        "detail": "Initiative 20 : ennemis à 12 m, JS CON DD18 ou pas de réaction jusqu’au début du prochain tour.",
        "kind": "save",
        "dc": 18,
        "save": "CON",
        "economy": "lair"
      },
      {
        "name": "Murmure des Gants",
        "detail": "Initiative 20 : cible à 18 m, JS SAG DD18 ou désavantage à sa prochaine attaque contre Zanror avant fin de son prochain tour.",
        "kind": "save",
        "dc": 18,
        "save": "SAG",
        "economy": "lair"
      }
    ],
    "legendaryMax": 3,
    "isBoss": true,
    "phases": [
      {
        "name": "Phase II — Avatar du Titan",
        "threshold": 280,
        "speed": "12 m",
        "legendaryMax": 3,
        "note": "Active Grandir sous la pierre. +40 PV temporaires ; allonge +1,50 m ; avantage Athlétisme ; mêlée +1d6 contondants. Phrase : « Le sol vous a portés jusque-là. Maintenant, il me répond. »"
      },
      {
        "name": "Phase III — La Masse indomptable",
        "threshold": 120,
        "speed": "12 m",
        "legendaryMax": 4,
        "note": "Si Indomptable masse se déclenche : récupère immédiatement 60 PV ; avantage aux attaques de mêlée et +1d10 contondants jusqu’à fin du prochain tour ; 4 actions légendaires jusqu’à fin du combat ; Ordre de capture indisponible. Phrase : « Je ne tombe pas parce que je suis fort. Je tombe quand la Harde n’a plus besoin que je tienne. »"
      }
    ],
    "resources": [
      {
        "name": "Résistances légendaires",
        "max": 3,
        "start": 3,
        "reset": "repos long"
      },
      {
        "name": "Grandir sous la pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Indomptable masse",
        "max": 1,
        "start": 1,
        "reset": "7 jours"
      }
    ],
    "notes": "Version fournie directement par l’utilisateur, remplaçant entièrement le Zanror FP10 du PDF Maharles. Tactique : séparer, mettre à terre, agripper, protéger la légitimité de la Harde, capturer plutôt que tuer si l’arène approche. Butin documenté : Gants de Pierre du Titan, Corne du Grand Tonnerre, Ceinture de prise, éclats de faille dorée, marques de succession."
  },
  {
    "id": "maharles-nezhar",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Harde",
      "Allié potentiel"
    ],
    "name": "Nezhar Brise-Calme",
    "subtitle": "Humanoïde (goliath) · neutre bon · protecteur/soutien",
    "type": "Humanoïde (goliath) · neutre bon · protecteur/soutien",
    "size": "M",
    "cr": "5",
    "ac": 16,
    "hp": 90,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 18,
      "DEX": 12,
      "CON": 16,
      "INT": 12,
      "SAG": 17,
      "CHA": 15
    },
    "saves": "FOR +7, SAG +6, CHA +5",
    "saveMods": {
      "FOR": 7,
      "SAG": 6,
      "CHA": 5
    },
    "skills": {
      "athletisme": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun, géant",
    "traits": [
      {
        "name": "Aura de calme",
        "detail": "Nezhar et alliés choisis à 3 m : avantage aux JS contre Charmé et Effrayé.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Bâtons de la trêve.",
        "kind": "multiattack",
        "sequence": "Bâton de la trêve*2",
        "economy": "action"
      },
      {
        "name": "Bâton de la trêve",
        "detail": "1d8+4 contondants +1d6 tonnerre.",
        "kind": "attack",
        "bonus": 7,
        "damage": "1d8+4+1d6",
        "damageType": "mixtes : contondants + tonnerre",
        "economy": "action"
      },
      {
        "name": "Parole qui arrête",
        "detail": "Recharge 5–6, jusqu’à 3 créatures à 9 m, JS SAG DD14 ; échec : vitesse 0 et pas de réaction jusqu’au début du prochain tour de Nezhar.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 14,
        "save": "SAG",
        "economy": "action"
      },
      {
        "name": "Souffle de trêve",
        "detail": "2/jour, bonus : une autre créature à 9 m récupère 2d8+3 PV.",
        "kind": "heal",
        "damage": "2d8+3",
        "damageType": "PV",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Prendre le coup",
        "detail": "Quand un allié adjacent est touché : Nezhar devient la cible puis réduit les dégâts de 1d10+3.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Endurance de pierre",
        "detail": "1/jour : réduit autrement les dégâts de 1d12+3.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Souffle de trêve",
        "max": 2,
        "start": 2,
        "reset": "jour"
      },
      {
        "name": "Endurance de pierre",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Le PDF le décrit comme l’antithèse de Zanror et un allié/protecteur possible ; il est néanmoins classé dans Adversaires conformément à la demande et peut être recatégorisé manuellement."
  },
  {
    "id": "maharles-crevard",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Dépouillés",
      "Mort-vivant"
    ],
    "name": "Crevard",
    "subtitle": "Mort-vivant · prédateur de meute",
    "type": "Mort-vivant · prédateur de meute",
    "size": "M",
    "cr": "1",
    "ac": 13,
    "hp": 30,
    "initiative": 3,
    "speed": "9 m · escalade 6 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 14,
      "DEX": 16,
      "CON": 16,
      "INT": 4,
      "SAG": 10,
      "CHA": 6
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "discretion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 2,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "nécrotiques"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmé",
      "Empoisonné",
      "Épuisement"
    ],
    "senses": "Vision dans le noir 18 m · Perception passive 12 · comprend les anciennes langues, ne parle pas",
    "traits": [
      {
        "name": "Faim aveugle",
        "detail": "Avantage aux attaques de mêlée contre une créature à la moitié de ses PV max ou moins.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Aversion à la lumière",
        "detail": "Sous lumière vive : désavantage aux tests de Perception basés sur la vue.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Griffes",
        "detail": "JS CON DD11 après touche ou pas de réaction jusqu’au début du prochain tour.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Morsure",
        "detail": "1d6+3 perforants +1d6 nécrotiques. Si cible Agrippée/Entravée/neutralisée : récupère autant de PV que les dégâts nécrotiques.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3+1d6",
        "damageType": "mixtes : perforants + nécrotiques",
        "economy": "action"
      },
      {
        "name": "Ruée affamée",
        "detail": "Bonus : déplacement jusqu’à moitié vitesse vers une créature visible à moitié PV ou moins.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Citoyen encore vaguement reconnaissable, devenu prédateur affamé."
  },
  {
    "id": "maharles-crevard-superieur",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Dépouillés",
      "Mort-vivant"
    ],
    "name": "Crevard supérieur",
    "subtitle": "Mort-vivant · prédateur d’élite",
    "type": "Mort-vivant · prédateur d’élite",
    "size": "M",
    "cr": "3",
    "ac": 14,
    "hp": 68,
    "initiative": 4,
    "speed": "12 m · escalade 9 m",
    "attacksPerAction": 3,
    "abilities": {
      "FOR": 17,
      "DEX": 18,
      "CON": 18,
      "INT": 6,
      "SAG": 12,
      "CHA": 8
    },
    "saves": "DEX +6, CON +6",
    "saveMods": {
      "DEX": 6,
      "CON": 6
    },
    "skills": {
      "discretion": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "nécrotiques"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [
      "poison"
    ],
    "conditionImmunities": [
      "Charmé",
      "Empoisonné",
      "Épuisement"
    ],
    "senses": "Vision dans le noir 24 m · Perception passive 13 · comprend ses anciennes langues, ne parle pas",
    "traits": [
      {
        "name": "Faim aveugle",
        "detail": "Avantage aux attaques de mêlée contre les créatures à moitié PV ou moins.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Grimpeur monstrueux",
        "detail": "Escalade les surfaces difficiles sans test.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Trois Griffes ; peut remplacer une attaque par Morsure si cible Agrippée, Entravée, À terre ou neutralisée.",
        "kind": "multiattack",
        "sequence": "Griffes*3",
        "economy": "action"
      },
      {
        "name": "Griffes",
        "detail": "À la place des dégâts, peut Agripper une cible G ou inférieure, évasion DD14.",
        "kind": "attack",
        "bonus": 6,
        "damage": "1d6+4",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Morsure",
        "detail": "1d8+4 perforants +1d6 nécrotiques ; récupère autant de PV que les dégâts nécrotiques.",
        "kind": "attack",
        "bonus": 6,
        "damage": "1d8+4+1d6",
        "damageType": "mixtes : perforants + nécrotiques",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Réflexe de prédateur",
        "detail": "Quand une créature à 6 m tombe à moitié PV ou moins : déplacement 3 m vers elle sans OA.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Version d’élite vampirique : lutte, vitesse et morsure, sans paralysie de goule."
  },
  {
    "id": "maharles-moissonneur",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Dépouillés"
    ],
    "name": "Moissonneur des Dépouillés",
    "subtitle": "Humanoïde · neutre mauvais · débuff/nécromancie",
    "type": "Humanoïde · neutre mauvais · débuff/nécromancie",
    "size": "M",
    "cr": "4",
    "ac": 15,
    "hp": 71,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 10,
      "DEX": 16,
      "CON": 14,
      "INT": 16,
      "SAG": 14,
      "CHA": 15
    },
    "saves": "DEX +5, INT +5, SAG +4",
    "saveMods": {
      "DEX": 5,
      "INT": 5,
      "SAG": 4
    },
    "skills": {
      "arcanes": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "nécrotiques"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 12 · commun + deux langues",
    "traits": [
      {
        "name": "Dévotion au secret",
        "detail": "Avantage aux JS contre Charmé et Effrayé.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Collecteur d’étincelles",
        "detail": "Quand une créature vivante autre qu’un Moissonneur tombe à 0 PV à 6 m : gagne 7 PV temporaires.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Lames d’oubli.",
        "kind": "multiattack",
        "sequence": "Lame d’oubli*2",
        "economy": "action"
      },
      {
        "name": "Lame d’oubli",
        "detail": "1d6+3 perforants +2d6 nécrotiques.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3+2d6",
        "damageType": "mixtes : perforants + nécrotiques",
        "economy": "action"
      },
      {
        "name": "Moisson de mémoire",
        "detail": "Recharge 5–6 : cible à 18 m, JS SAG DD14 ; échec 4d8 psychiques et −1d4 au prochain jet d’attaque/test/JS avant fin du prochain tour ; réussite moitié sans pénalité. Échec révèle un souvenir bref chargé d’émotion.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 14,
        "save": "SAG",
        "damage": "4d8",
        "damageType": "psychiques",
        "economy": "action"
      },
      {
        "name": "Marque de dépouillement",
        "detail": "Bonus : cible à 9 m jusqu’au début du prochain tour ; prochaine attaque de Crevard qui touche +1d6 nécrotiques.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Négation du nom",
        "detail": "2/jour : quand une créature à 18 m devrait regagner des PV, réduit les soins de 2d8+3, minimum 0.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Négation du nom",
        "max": 2,
        "start": 2,
        "reset": "jour"
      }
    ],
    "notes": "Spécialiste des secrets et de l’anti-soin."
  },
  {
    "id": "maharles-soeur-vellane",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Dépouillés",
      "Boss"
    ],
    "name": "Sœur Vellane au Masque d’Os",
    "subtitle": "Humanoïde · neutre mauvais · boss de soutien",
    "type": "Humanoïde · neutre mauvais · boss de soutien",
    "size": "M",
    "cr": "7",
    "ac": 16,
    "hp": 110,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 9,
      "DEX": 16,
      "CON": 18,
      "INT": 17,
      "SAG": 16,
      "CHA": 18
    },
    "saves": "CON +7, SAG +6, CHA +7",
    "saveMods": {
      "CON": 7,
      "SAG": 6,
      "CHA": 7
    },
    "skills": {
      "arcanes": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 7,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "nécrotiques",
      "psychiques"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [
      "Effrayé"
    ],
    "senses": "Vision dans le noir 18 m · Perception passive 13 · commun + 3 langues · télépathie 18 m avec une créature dont elle connaît un secret important",
    "traits": [
      {
        "name": "Résistance à la magie",
        "detail": "Avantage aux JS contre sorts et autres effets magiques.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Maîtresse de la faim",
        "detail": "Les Crevards ne la considèrent jamais hostile tant qu’elle est consciente, sauf contrainte magique.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Aiguilles d’os.",
        "kind": "multiattack",
        "sequence": "Aiguille d’os*2",
        "economy": "action"
      },
      {
        "name": "Aiguille d’os",
        "detail": "Attaque de sort à distance 18 m.",
        "kind": "attack",
        "bonus": 7,
        "damage": "2d8+4",
        "damageType": "nécrotiques",
        "economy": "action"
      },
      {
        "name": "Vol de souvenir",
        "detail": "Recharge 5–6, cible 18 m, JS SAG DD15 : échec 6d8 psychiques, pas de réaction, désavantage JS INT/SAG jusqu’à fin prochain tour ; réussite moitié. Échec de 5+ : découvre un souvenir important/secret lié à motivation actuelle.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 15,
        "save": "SAG",
        "damage": "6d8",
        "damageType": "psychiques",
        "economy": "action"
      },
      {
        "name": "Déchirure des noms",
        "detail": "1/jour, cône 6 m, JS SAG DD15 : échec 4d6 psychiques + Effrayé jusqu’à fin prochain tour ; réussite moitié sans état.",
        "kind": "save",
        "dc": 15,
        "save": "SAG",
        "damage": "4d6",
        "damageType": "psychiques",
        "economy": "action"
      },
      {
        "name": "Ordonner la faim",
        "detail": "Bonus : un Crevard à 18 m se déplace de moitié vitesse et effectue une attaque de Griffes.",
        "kind": "text",
        "economy": "bonus",
        "target": "ally"
      }
    ],
    "reactions": [
      {
        "name": "Secret douloureux",
        "detail": "3/jour : après jet d’attaque/test/JS d’une créature à 18 m, avant résultat, soustrait 1d6.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": true,
    "phases": [],
    "resources": [
      {
        "name": "Déchirure des noms",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Secret douloureux",
        "max": 3,
        "start": 3,
        "reset": "jour"
      }
    ],
    "notes": "Boss de soutien sans actions légendaires ; le PDF précise que son économie d’actions est portée par les Crevards."
  },
  {
    "id": "maharles-roland",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Allié potentiel"
    ],
    "name": "Roland, paladin brisé",
    "subtitle": "Humanoïde (humain) · loyal bon · tank/soutien allié",
    "type": "Humanoïde (humain) · loyal bon · tank/soutien allié",
    "size": "M",
    "cr": "5",
    "ac": 18,
    "hp": 85,
    "initiative": 0,
    "speed": "7,50 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 18,
      "DEX": 10,
      "CON": 18,
      "INT": 11,
      "SAG": 14,
      "CHA": 17
    },
    "saves": "CON +7, SAG +5, CHA +6",
    "saveMods": {
      "CON": 7,
      "SAG": 5,
      "CHA": 6
    },
    "skills": {
      "athletisme": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 6,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 12 · commun + deux langues",
    "traits": [
      {
        "name": "Aura de résolution",
        "detail": "Roland et alliés choisis à 3 m : +2 aux JS contre Effrayé.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Flamme intacte",
        "detail": "1 fois/tour quand l’épée touche : +1d8 radiants, inclus dans l’attaque affichée.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux attaques d’Épée de la Flamme fissurée.",
        "kind": "multiattack",
        "sequence": "Épée de la Flamme fissurée*2",
        "economy": "action"
      },
      {
        "name": "Épée de la Flamme fissurée",
        "detail": "1d8+4 tranchants +1d8 radiants.",
        "kind": "attack",
        "bonus": 7,
        "damage": "1d8+4+1d8",
        "damageType": "mixtes : tranchants + radiants",
        "economy": "action"
      },
      {
        "name": "Châtiment de la dernière lumière",
        "detail": "3/jour : après touche avec l’épée, +2d8 radiants.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Imposition des mains",
        "detail": "3/jour, action : une créature récupère 15 PV ; à la place, met fin à un poison ou maladie sans soins.",
        "kind": "heal",
        "damage": "15",
        "damageType": "PV",
        "economy": "action"
      },
      {
        "name": "Relèvement",
        "detail": "1/jour, bonus : allié à 0 PV à 9 m récupère 1 PV.",
        "kind": "heal",
        "damage": "1",
        "damageType": "PV",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Égide fissurée",
        "detail": "Quand un allié adjacent est touché : +3 CA contre cette attaque, pouvant la faire échouer.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Châtiment de la dernière lumière",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Imposition des mains",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Relèvement",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "PV maximum 85 ; le PDF recommande qu’il commence la session à 48/85 PV. ENCOUNTER respecte ce départ via startHp=48. Classé Adversaire selon la demande mais pensé comme allié dans le PDF.",
    "startHp": 48
  },
  {
    "id": "maharles-zomik-eclaireur",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Zomik"
    ],
    "name": "Zomik éclaireur",
    "subtitle": "Humanoïde P · chaotique bon · mobilité/reconnaissance",
    "type": "Humanoïde P · chaotique bon · mobilité/reconnaissance",
    "size": "M",
    "cr": "1/2",
    "ac": 14,
    "hp": 22,
    "initiative": 3,
    "speed": "9 m · escalade 6 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 8,
      "DEX": 16,
      "CON": 12,
      "INT": 12,
      "SAG": 14,
      "CHA": 11
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "discretion": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 14 · commun, zomik",
    "traits": [
      {
        "name": "Petit et introuvable",
        "detail": "Peut traverser l’espace d’une créature M ou supérieure.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples — Dagues",
        "detail": "Deux Dagues.",
        "kind": "multiattack",
        "sequence": "Dague*2",
        "economy": "action"
      },
      {
        "name": "Attaques multiples — Frondes",
        "detail": "Deux Frondes.",
        "kind": "multiattack",
        "sequence": "Fronde*2",
        "economy": "action"
      },
      {
        "name": "Dague",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Fronde",
        "detail": "Portée 9/36 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Décrochage",
        "detail": "Bonus : Se cacher ou Se désengager.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Par ici !",
        "detail": "1/jour : lorsqu’un allié à 6 m est pris pour cible, cet allié peut se déplacer immédiatement de 3 m.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Par ici !",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Le PDF indique : « Il fuit avant de gagner. Toujours. »"
  },
  {
    "id": "maharles-zomik-bricoleur",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Zomik"
    ],
    "name": "Zomik bricoleur",
    "subtitle": "Humanoïde P · chaotique neutre · contrôle par gadgets",
    "type": "Humanoïde P · chaotique neutre · contrôle par gadgets",
    "size": "M",
    "cr": "1",
    "ac": 13,
    "hp": 27,
    "initiative": 2,
    "speed": "7,50 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 14,
      "CON": 12,
      "INT": 16,
      "SAG": 12,
      "CHA": 10
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "arcanes": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "escamotage": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 11 · commun, zomik",
    "traits": [
      {
        "name": "Toujours une solution",
        "detail": "3/jour : après un test d’une créature à 6 m, avant résultat, +1d4 si le Zomik explique quel objet absurde de son sac est utilisé.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Clé de douze",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+2",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Pot éclatant",
        "detail": "Recharge 5–6 : point à 12 m, rayon 1,50 m, JS DEX DD13 ; échec 2d6 feu + Aveuglé jusqu’au début du prochain tour ; réussite moitié sans aveuglement.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 13,
        "save": "DEX",
        "damage": "2d6",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Piège minute",
        "detail": "2/jour : mécanisme adjacent. Première créature non-Zomik : JS DEX DD13, échec 1d10 dégâts + À terre. Perception DD13 pour repérer.",
        "kind": "save",
        "dc": 13,
        "save": "DEX",
        "damage": "1d10",
        "damageType": "non précisés",
        "economy": "action"
      },
      {
        "name": "Poudre aux yeux",
        "detail": "2/jour, bonus : cible à 1,50 m, JS CON DD13 ou Aveuglée jusqu’au début du prochain tour du Zomik.",
        "kind": "save",
        "dc": 13,
        "save": "CON",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Toujours une solution",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Piège minute",
        "max": 2,
        "start": 2,
        "reset": "jour"
      },
      {
        "name": "Poudre aux yeux",
        "max": 2,
        "start": 2,
        "reset": "jour"
      }
    ],
    "notes": "Gadgets originaux ; le comique vient de l’explication, pas d’un risque arbitraire."
  },
  {
    "id": "maharles-zomik-frondeur",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Zomik"
    ],
    "name": "Zomik frondeur",
    "subtitle": "Humanoïde P · chaotique neutre · harcèlement à distance",
    "type": "Humanoïde P · chaotique neutre · harcèlement à distance",
    "size": "M",
    "cr": "1/2",
    "ac": 14,
    "hp": 18,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 8,
      "DEX": 16,
      "CON": 12,
      "INT": 11,
      "SAG": 13,
      "CHA": 11
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "acrobaties": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun, zomik",
    "traits": [
      {
        "name": "Ricochet",
        "detail": "1/tour : quand la Fronde touche, inflige 1d4 contondants à une autre créature à 1,50 m de la cible initiale.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Frondes.",
        "kind": "multiattack",
        "sequence": "Fronde*2",
        "economy": "action"
      },
      {
        "name": "Fronde",
        "detail": "Portée 9/36 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Dague",
        "detail": "Mêlée.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Décrochage",
        "detail": "Bonus : Se désengager.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Vise volontiers lampes, cordes, serrures, boutons et casques avant les PV."
  },
  {
    "id": "maharles-geolier-imperial",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Empire"
    ],
    "name": "Geôlier impérial détaché",
    "subtitle": "Humanoïde (humain) · loyal neutre · entrave/garde",
    "type": "Humanoïde (humain) · loyal neutre · entrave/garde",
    "size": "M",
    "cr": "2",
    "ac": 17,
    "hp": 52,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 16,
      "DEX": 11,
      "CON": 16,
      "INT": 11,
      "SAG": 12,
      "CHA": 14
    },
    "saves": "FOR +5, CON +5",
    "saveMods": {
      "FOR": 5,
      "CON": 5
    },
    "skills": {
      "athletisme": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun",
    "traits": [
      {
        "name": "Discipline carcérale",
        "detail": "Avantage aux tests d’Athlétisme contre une créature Entravée ou Agrippée.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Matraques runiques.",
        "kind": "multiattack",
        "sequence": "Matraque runique*2",
        "economy": "action"
      },
      {
        "name": "Matraque runique",
        "detail": "1d6+3 contondants +1d4 froid.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3+1d4",
        "damageType": "mixtes : contondants + froid",
        "economy": "action"
      },
      {
        "name": "Manille runique",
        "detail": "Recharge 4–6 : cible G ou inférieure à 6 m, JS DEX DD13 ou Entravée. Action Athlétisme/Acrobaties DD13 pour sortir ; manille CA15, 10 PV.",
        "kind": "recharge",
        "recharge": "4-6",
        "dc": 13,
        "save": "DEX",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Pas si vite",
        "detail": "Quand une créature Entravée/Agrippée à portée tente de s’échapper : attaque de Matraque runique.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Annonce infractions, numéros de cellule et sanctions même en combat."
  },
  {
    "id": "maharles-soldat-brigade-glaces",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Brigade des Glaces",
      "Empire"
    ],
    "name": "Soldat de la Brigade des Glaces",
    "subtitle": "Humanoïde (humain) · loyal neutre · infanterie disciplinée",
    "type": "Humanoïde (humain) · loyal neutre · infanterie disciplinée",
    "size": "M",
    "cr": "3",
    "ac": 18,
    "hp": 65,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 16,
      "DEX": 12,
      "CON": 14,
      "INT": 11,
      "SAG": 12,
      "CHA": 10
    },
    "saves": "FOR +5, CON +4, SAG +3",
    "saveMods": {
      "FOR": 5,
      "CON": 4,
      "SAG": 3
    },
    "skills": {
      "athletisme": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "froid"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun",
    "traits": [
      {
        "name": "Formation de glace",
        "detail": "À 1,50 m d’un autre Soldat conscient : avantage aux tests/JS pour résister à poussée ou mise à terre.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Hallebardes givrées.",
        "kind": "multiattack",
        "sequence": "Hallebarde givrée*2",
        "economy": "action"
      },
      {
        "name": "Hallebarde givrée",
        "detail": "Allonge 3 m, 1d10+3 tranchants +1d4 froid.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d10+3+1d4",
        "damageType": "mixtes : tranchants + froid",
        "economy": "action"
      },
      {
        "name": "Javelot de givre",
        "detail": "Portée 9/36 m, 1d6+1 perforants +1d6 froid.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+1+1d6",
        "damageType": "mixtes : perforants + froid",
        "economy": "action"
      }
    ],
    "reactions": [
      {
        "name": "Mur de hampes",
        "detail": "Quand un allié adjacent est ciblé par une attaque de mêlée : +2 CA contre cette attaque.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "Deux soldats adjacents forment une ligne ; ils avancent ensemble et protègent l’arcaniste derrière eux."
  },
  {
    "id": "maharles-vaylen-drakhys",
    "category": "enemy",
    "source": "Statblocks Maharles — dossier utilisateur",
    "tags": [
      "Maharles",
      "Drakhys",
      "Empire"
    ],
    "name": "Vaylen Drakhys — profil de session",
    "subtitle": "Humanoïde · loyal mauvais · artillerie magique",
    "type": "Humanoïde · loyal mauvais · artillerie magique",
    "size": "M",
    "cr": "8",
    "ac": 16,
    "hp": 120,
    "initiative": 2,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 9,
      "DEX": 14,
      "CON": 16,
      "INT": 18,
      "SAG": 14,
      "CHA": 16
    },
    "saves": "DEX +5, CON +6, INT +7, SAG +5",
    "saveMods": {
      "DEX": 5,
      "CON": 6,
      "INT": 7,
      "SAG": 5
    },
    "skills": {
      "arcanes": {
        "mod": 7,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 6,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [
      "feu"
    ],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 15 · commun, draconique + deux langues",
    "traits": [
      {
        "name": "Armure de braise",
        "detail": "Première fois à chaque tour qu’une créature adjacente touche Vaylen au corps à corps : elle subit 1d8 feu.",
        "kind": "text",
        "economy": "none"
      },
      {
        "name": "Maîtrise des flammes",
        "detail": "Vaylen ne subit aucun dommage de ses propres capacités.",
        "kind": "text",
        "economy": "none"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Deux Lances de braise.",
        "kind": "multiattack",
        "sequence": "Lance de braise*2",
        "economy": "action"
      },
      {
        "name": "Lance de braise",
        "detail": "Attaque de sort à distance 24 m.",
        "kind": "attack",
        "bonus": 7,
        "damage": "4d8",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Déferlement Drakhys",
        "detail": "Recharge 5–6 : ligne 18 m ×1,50 m, JS DEX DD15 ; 8d6 feu, moitié en réussite.",
        "kind": "recharge",
        "recharge": "5-6",
        "dc": 15,
        "save": "DEX",
        "damage": "8d6",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Rideau de braises",
        "detail": "1/jour : mur 9×3 m, JS DEX DD15 à l’apparition : 4d8 feu, moitié ; jusqu’à fin prochain tour, entrer/finir dans mur = 3d8 feu.",
        "kind": "save",
        "dc": 15,
        "save": "DEX",
        "damage": "4d8",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Pas dans la flamme",
        "detail": "3/jour, bonus : téléportation 9 m ; créatures à 1,50 m du départ subissent 1d6 feu.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Contre-flamme",
        "detail": "3/jour : réduit dégâts de 1d10+4 ; responsable à 18 m subit 2d8 feu.",
        "kind": "text",
        "economy": "reaction"
      },
      {
        "name": "Retrait ordonné",
        "detail": "1/jour, quand réduit à 40 PV ou moins : téléportation 18 m si non neutralisé.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Rideau de braises",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Pas dans la flamme",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Contre-flamme",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Retrait ordonné",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "Profil de session, pas nécessairement l’intégralité du potentiel de Vaylen. Conçu pour tester Samoth puis se retirer plutôt que mourir."
  }
];
  const existing = new Set(window.ENCOUNTER_BUILTINS.map(x=>x.id));
  extra.forEach(x=>{ if(!existing.has(x.id)) window.ENCOUNTER_BUILTINS.push(x); });
})();

// V4.1 — compléments de fidélité aux dossiers fournis.
(() => {
  const byId=id=>window.ENCOUNTER_BUILTINS.find(m=>m.id===id);
  const add=(list,item)=>{ if(list && !list.some(x=>x.name===item.name)) list.push(item); };

  const n=byId('pj-nans-pointud'); if(n){
    add(n.actions,{name:'Frénésie — attaque bonus',detail:'À partir du tour suivant l’entrée dans une Rage frénétique : une attaque d’arme de corps à corps en action bonus. À la fin de la Rage, Nans gagne un niveau d’épuisement.',kind:'text',economy:'bonus'});
    add(n.traits,{name:'Tentation du Grand Saccageur',detail:'Chaque fois qu’un effet du Cor blesse une créature : JS SAG, DD 15 à l’état Éveillé. Échec : jusqu’à la fin du prochain tour, Nans doit utiliser son action bonus si disponible pour se ruer vers la créature la plus proche, alliée ou ennemie, et l’attaquer si possible ; s’il refuse, 2d6 psychiques et l’effet prend fin.',kind:'text',economy:'none'});
    add(n.traits,{name:'Marche implacable — Cor',detail:'Tant que Nans tient le Cor, avantage aux tests de Charisme (Intimidation) et aux JS contre l’état Effrayé.',kind:'text',economy:'none'});
    add(n.traits,{name:'Tambours du siège — Cor Éveillé',detail:'Pendant 1 minute après avoir fait sonner le Cor, les attaques d’arme de Nans et des alliés à 9 m qui l’entendent infligent +1d4 tonnerre aux objets et structures ; Nans a avantage aux tests de FOR (Athlétisme) pour forcer portes et barricades.',kind:'text',economy:'none'});
    add(n.actions,{name:'Cape — Silence',detail:'Action bonus : active ou désactive le silence de la Cape de la Brise Silencieuse. Tant qu’elle est active, les mouvements de Nans sont silencieux et il a avantage aux tests de DEX pour se déplacer sans être détecté.',kind:'text',economy:'bonus'});
    add(n.actions,{name:'Anneau — Surcharge furieuse',detail:'Sur une attaque à deux mains qui touche, Nans peut ajouter 1d6 dégâts supplémentaires (type non documenté) et subit 1d4 dégâts de force.',kind:'text',economy:'none'});
  }

  const b=byId('pj-brack-mard'); if(b){
    add(b.actions,{name:'Observation de l’ennemi',detail:'Hors combat, après au moins 1 minute d’observation ou d’interaction : comparer l’adversaire à Brack et apprendre s’il lui est supérieur, égal ou inférieur dans deux catégories au choix parmi FOR, DEX, CON, CA, PV actuels, niveaux de classe ou niveaux de guerrier.',kind:'text',economy:'none'});
  }

  const r=byId('pj-rufus-renard'); if(r){
    add(r.actions,{name:'Blessure — effet d’objet',detail:'Effet d’objet : attaque de sort au corps à corps, 3d10 nécrotiques sur une touche. Le bonus d’attaque propre à l’objet n’est pas fourni dans le dossier et n’est donc pas inventé.',kind:'text',economy:'action'});
    add(r.actions,{name:'Invisibilité — effet d’objet',detail:'Effet d’objet, concentration jusqu’à 1 heure : la cible touchée et ce qu’elle porte deviennent invisibles ; l’effet prend fin pour cette cible si elle attaque ou lance un sort.',kind:'text',economy:'action'});
    add(r.actions,{name:'Corbeau Pèlerin — Linceul Éveillé',detail:'1/repos long, rituel de 10 minutes, jusqu’à 1 heure : invoque un corbeau spectral pouvant se déplacer dans un rayon de 3 km, transmettre des souvenirs oubliés d’un mort et repérer la trace d’un mort-vivant ou d’un ressuscité anormal.',kind:'text',economy:'none'});
    add(r.traits,{name:'Mission sacrée — Linceul',detail:'Si le Linceul est équipé, Rufus ressent la présence des morts-vivants et des âmes profanées dans un rayon de 18 m.',kind:'text',economy:'none'});
    add(r.traits,{name:'Ombre du Corbeau — Linceul Éveillé',detail:'Quand Rufus réduit une créature à 0 PV, il peut absorber une trace d’âme, obtenir un souvenir bref et +1d8 à son prochain jet d’attaque ou de sauvegarde. Limite documentée : modificateur de SAG par repos long, soit 1 utilisation avec SAG 13.',kind:'text',economy:'none'});
  }

  const s=byId('pj-samoth-drakhys'); if(s){
    add(s.actions,{name:'Dague',detail:'Attaque +5, 1d4+1 perforant ; finesse, légère, lancer 6/18 m.',kind:'attack',bonus:5,damage:'1d4+1',damageType:'perforants',economy:'action'});
    add(s.actions,{name:'Bâton — usage martial',detail:'Le dossier donne +5 (ou +6 si le bonus d’arme +1 est appliqué) et 1d6+1 / 1d8+1 contondants. L’ambiguïté est conservée : aucune valeur unique n’est automatisée.',kind:'text',economy:'action'});
    add(s.actions,{name:'Nappe de brouillard — Bâton',detail:'1 charge : zone de brouillard fortement obscurcie, selon les paramètres du sort standard.',kind:'text',economy:'action'});
    add(s.actions,{name:'Mains givrantes — Bâton',detail:'1 charge : cône 4,50 m, JS DEX DD 18, 3d6 froid, moitié en réussite.',kind:'save',dc:18,save:'DEX',damage:'3d6',damageType:'froid',economy:'action'});
    add(s.actions,{name:'Mur de glace — Bâton',detail:'4 charges : crée une barrière de glace ; utilise le DD de sorts de Samoth, 18, selon la carte du Bâton.',kind:'text',economy:'action'});
    add(s.actions,{name:'Sort prévenant — si Adepte de métamagie est conservé',detail:'1 point : sur un sort imposant un JS, protège jusqu’à 3 créatures ; elles réussissent automatiquement leur sauvegarde contre ce sort.',kind:'text',economy:'none'});
    add(s.actions,{name:'Sort intensifié — si Adepte de métamagie est conservé',detail:'3 points : une cible d’un sort imposant un JS subit un désavantage à son premier JS contre ce sort.',kind:'text',economy:'none'});
  }

  const k=byId('pj-kentaro-amane'); if(k){
    add(k.actions,{name:'Main de mage',detail:'Tour de magie, 9 m, 1 minute : main spectrale de manipulation ; ne peut ni attaquer, ni activer un objet magique, ni porter plus d’environ 5 kg.',kind:'text',economy:'action'});
    add(k.actions,{name:'Prestidigitation',detail:'Tour de magie : petits effets magiques inoffensifs, jusqu’à trois effets non instantanés simultanés.',kind:'text',economy:'action'});
    add(k.actions,{name:'Illusion mineure',detail:'Tour de magie, 9 m, 1 minute : son ou image statique ; Investigation contre DD 16 pour l’examiner.',kind:'text',economy:'action'});
    add(k.actions,{name:'Armure de sang — non documentée',detail:'Sort inscrit sur la fiche actuelle, mais aucun texte de règle validé n’est fourni. Aucun coût, portée, dégâts, durée ou effet n’est inventé.',kind:'text',economy:'action'});
    add(k.traits,{name:'Charme prédateur',detail:'Après au moins 1 minute d’interaction avec un humanoïde que Kentaro ou ses alliés n’ont pas agressé depuis 24 h : avantage au prochain test de Charisme contre lui. La cible devient ensuite immunisée 24 h ; sur un 20 naturel, elle devient une cible consentante pour la morsure.',kind:'text',economy:'none'});
    add(k.traits,{name:'Signe de mauvais augure',detail:'Kentaro peut lancer Jeter une malédiction avec un emplacement d’occultiste ; au niveau 5, la durée est de 8 heures et n’exige plus de concentration.',kind:'text',economy:'none'});
    add(k.traits,{name:'Spectre maudit',detail:'1/repos long : lorsqu’il tue un humanoïde, Kentaro peut faire surgir son esprit sous forme de spectre jusqu’au prochain repos long. Rappel de fiche : CA 12, PV 22 + 5 temporaires, vol 15 m, Absorption de vie +8, 3d6 nécrotiques.',kind:'text',economy:'none'});
    add(k.traits,{name:'Flammes imprévisibles — Kane',detail:'Le dossier demande 1d6 pour déterminer la puissance selon trois états, mais leurs valeurs exactes et le DD de Représailles/Étreinte de Maldor ne sont pas documentés. Aucun résultat n’est inventé.',kind:'text',economy:'none'});
  }

  const z=byId('pj-zephyr'); if(z){
    add(z.actions,{name:'Localisation d’objet N2',detail:'Action, personnelle, concentration jusqu’à 10 min : ressent la direction d’un objet familier à 300 m ; suit sa direction s’il se déplace. Une couche de plomb bloque le sort.',kind:'text',economy:'action'});
    add(z.actions,{name:'BINAH — Mur prismatique mineur (si Éveillé et équipé)',detail:'1/jour, action : paroi de lumière de 3 m de haut et de large ; absorbe jusqu’à 40 dégâts par type d’élément avant de disparaître.',kind:'text',economy:'action'});
    add(z.reactions,{name:'BINAH — Parade prismatique (si Dormant et équipé)',detail:'1/jour, après une attaque élémentaire qui touche : lance 1d6 ; sur 5–6, l’attaque est annulée et absorbée.',kind:'text',economy:'reaction'});
    add(z.traits,{name:'BINAH — Défense élémentaire passive (si Dormant et équipé)',detail:'À chaque repos long, choisir un type de dégâts élémentaires ; résistance à ce type jusqu’au prochain repos long.',kind:'text',economy:'none'});
  }

  const f=byId('npc-felipe-dofil'); if(f){
    add(f.actions,{name:'Armure du mage N1',detail:'La fiche considère Armure du mage active : CA 15. Sans elle, CA 12.',kind:'text',economy:'action'});
    add(f.actions,{name:'Soin des blessures N1',detail:'Sort de soin de la fiche ; les soins de Felipe déclenchent aussi Bonbons médicinaux : +5 PV temporaires, au maximum une fois par tour.',kind:'text',economy:'action'});
    add(f.actions,{name:'Mot de guérison N1',detail:'Sort de soin de la fiche ; les soins de Felipe déclenchent aussi Bonbons médicinaux : +5 PV temporaires, au maximum une fois par tour.',kind:'text',economy:'bonus'});
    add(f.actions,{name:'Restauration partielle N2',detail:'Sort de niveau 2 inscrit sur la fiche de Felipe.',kind:'text',economy:'action'});
    add(f.actions,{name:'Pas brumeux N2',detail:'Sort de niveau 2 inscrit sur la fiche de Felipe : téléportation courte en action bonus.',kind:'text',economy:'bonus'});
    add(f.reactions,{name:'Contresort sucré',detail:'Felipe lance Contresort. S’il réussit, l’énergie adverse se condense en bonbon noirâtre avant d’éclater en poussière sucrée.',kind:'text',economy:'reaction'});
  }

  const boss=byId('maharles-zanror-main-montagne'); if(boss){
    boss.lairInitiative=20;
    add(boss.traits,{name:'Immunité conditionnelle — mise à terre',detail:'Zanror est immunisé à l’état À terre contre les effets non magiques. Cette immunité reste textuelle afin de ne pas bloquer automatiquement les effets magiques.',kind:'text',economy:'none'});
  }
})();

// ——— ENCOUNTER V4.2 : bestiaire civil générique de village ———
(() => {
  const extraVillage = [
  {
    "id": "npc-villageois-generique",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Population",
      "Ouvrier"
    ],
    "name": "Villageois",
    "subtitle": "Civil générique · foule, témoin, ouvrier",
    "type": "Humanoïde",
    "size": "M",
    "cr": "0",
    "ac": 10,
    "hp": 5,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 10,
      "DEX": 10,
      "CON": 9,
      "INT": 10,
      "SAG": 11,
      "CHA": 10
    },
    "saves": "",
    "saveMods": {},
    "skills": {},
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 10 · commun · éventuellement un dialecte local",
    "traits": [
      {
        "name": "Métier",
        "detail": "Maîtrise un ensemble d’outils approprié à son métier : outils de fermier, de charpentier, de potier, de cordonnier, etc. Une compétence professionnelle au choix est à +2.",
        "kind": "text"
      },
      {
        "name": "Solidarité villageoise",
        "detail": "Lorsqu’un villageois effectue l’action Aider pour assister un autre villageois dans une tâche professionnelle, la créature aidée ajoute également 1d4 à son test.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Outil improvisé",
        "detail": "Attaque d’arme au corps à corps : +2 au toucher, allonge 1,50 m, une cible.",
        "kind": "attack",
        "bonus": 2,
        "damage": "1d4",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 5 (2d8 − 4). ND 0 (10 PX). Bonus de maîtrise +2. Comportement : fuit presque toujours un véritable monstre ; en groupe, peut défendre enfants, maison ou récoltes. Butin : 1d6 pa, effets personnels, outils de travail et nourriture pour une journée."
  },
  {
    "id": "npc-aubergiste-robuste",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Auberge",
      "Rumeurs",
      "Social"
    ],
    "name": "Aubergiste robuste",
    "subtitle": "Civil générique · rumeurs, accueil, bagarre",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/8",
    "ac": 11,
    "hp": 13,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 13,
      "DEX": 11,
      "CON": 12,
      "INT": 11,
      "SAG": 13,
      "CHA": 14
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "intuition": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun plus une langue",
    "traits": [
      {
        "name": "Oreille du comptoir",
        "detail": "Avantage aux tests de Sagesse (Intuition) concernant les habitants réguliers du village.",
        "kind": "text"
      },
      {
        "name": "J’en ai vu d’autres",
        "detail": "Avantage aux jets de sauvegarde contre l’état effrayé provoqué par un humanoïde.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Gourdin lourd",
        "detail": "Attaque au corps à corps, allonge 1,50 m.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d6+1",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Chope, bouteille ou tabouret",
        "detail": "Attaque à distance, portée 6/18 m.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d4+1",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Calmez-vous !",
        "detail": "Action bonus : une créature vue à 9 m qui peut l’entendre reçoit 1d4 à son prochain test de Charisme effectué avant la fin de son prochain tour.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 13 (3d8). ND 1/8 (25 PX). Bonus de maîtrise +2. Comportement : tente d’abord de désamorcer une bagarre ; si le personnel ou les clients sont menacés, il sort le gourdin. Butin : 1d10 po, trousseau de clés, carnet de comptes et accès à une caisse contenant généralement 5d10 po."
  },
  {
    "id": "npc-artisan-forgeron",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Artisanat",
      "Forge",
      "Réparation"
    ],
    "name": "Artisan / Forgeron",
    "subtitle": "Civil générique · réparations, fabrication",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/4",
    "ac": 13,
    "hp": 22,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 15,
      "DEX": 11,
      "CON": 13,
      "INT": 12,
      "SAG": 12,
      "CHA": 10
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "athletisme": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 11 · commun",
    "traits": [
      {
        "name": "Expertise artisanale",
        "detail": "Double son bonus de maîtrise lorsqu’il utilise son principal ensemble d’outils. Maîtrise deux ensembles d’outils d’artisan.",
        "kind": "text"
      },
      {
        "name": "Connaissance des matériaux",
        "detail": "Avantage aux tests visant à évaluer la qualité, l’état ou la valeur d’un objet manufacturé.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Marteau",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+2",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Grand marteau de forge",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d10+2",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 22 (4d8 + 4). ND 1/4 (50 PX). Comportement : défend volontiers son atelier, mais n’est pas un combattant professionnel. Butin : 2d6 po, outils d’artisan, matières premières et éventuellement une arme ou armure en cours de fabrication."
  },
  {
    "id": "npc-marchand",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Commerce",
      "Estimation",
      "Social"
    ],
    "name": "Marchand",
    "subtitle": "Civil générique · commerce, estimation",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/8",
    "ac": 12,
    "hp": 11,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 9,
      "DEX": 12,
      "CON": 12,
      "INT": 14,
      "SAG": 13,
      "CHA": 15
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "intuition": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 11 · commun plus deux langues",
    "traits": [
      {
        "name": "Œil du négociant",
        "detail": "Connaît approximativement la valeur normale d’un objet non magique après 1 minute d’examen.",
        "kind": "text"
      },
      {
        "name": "Marchandage",
        "detail": "Une fois par conversation, peut relancer un test de Persuasion ou de Tromperie raté concernant une transaction commerciale.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Dague",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d4+1",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Arbalète légère",
        "detail": "Portée 24/96 m.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d8+1",
        "damageType": "perforants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 11 (2d8 + 2). ND 1/8 (25 PX). Comportement : préfère payer, négocier ou fuir plutôt que se battre. Butin : 2d10 po, 4d10 pa, registre de comptes et marchandises adaptées à son activité."
  },
  {
    "id": "npc-guerisseur-herboriste",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Soins",
      "Herboristerie",
      "Médecine"
    ],
    "name": "Guérisseur / Herboriste",
    "subtitle": "Civil générique · soins, maladies, poisons",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/4",
    "ac": 11,
    "hp": 16,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 12,
      "CON": 12,
      "INT": 14,
      "SAG": 16,
      "CHA": 11
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "medecine": {
        "mod": 7,
        "status": "Expertise"
      },
      "nature": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 5,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun plus une langue",
    "traits": [
      {
        "name": "Médecin expérimenté",
        "detail": "Stabiliser une créature inconsciente ne nécessite aucun test.",
        "kind": "text"
      },
      {
        "name": "Diagnostic",
        "detail": "Après avoir examiné une créature pendant 1 minute, peut déterminer si elle souffre d’une maladie, d’un poison ou d’une blessure ordinaire visible.",
        "kind": "text"
      },
      {
        "name": "Matériel d’herboriste",
        "detail": "Maîtrise le matériel d’herboriste.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Dague",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d4+1",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Baume médicinal",
        "detail": "3/jour. Une créature située à 1,50 m récupère 1d6 + 3 PV. Une même créature ne peut en bénéficier qu’une fois entre deux repos courts ou longs.",
        "kind": "heal",
        "damage": "1d6+3",
        "damageType": "PV",
        "economy": "action"
      },
      {
        "name": "Antidote improvisé",
        "detail": "1/jour. Une créature bénéficie d’un avantage à son prochain jet de sauvegarde contre un poison ou une maladie effectué dans l’heure.",
        "kind": "text",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Baume médicinal",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Antidote improvisé",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "PV 16 (3d8 + 3). ND 1/4 (50 PX). Comportement : ne combat que pour défendre un patient ou lui-même. Butin : matériel d’herboriste, 1d4 doses d’antitoxine ou remèdes locaux, 2d6 po."
  },
  {
    "id": "npc-pretre-rural",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Religion",
      "Soins",
      "Magie divine"
    ],
    "name": "Prêtre rural",
    "subtitle": "Civil générique · religion, soins magiques",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1",
    "ac": 13,
    "hp": 27,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 10,
      "DEX": 10,
      "CON": 12,
      "INT": 12,
      "SAG": 16,
      "CHA": 14
    },
    "saves": "SAG +5, CHA +4",
    "saveMods": {
      "SAG": 5,
      "CHA": 4
    },
    "skills": {
      "medecine": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun plus deux langues",
    "traits": [
      {
        "name": "Incantation",
        "detail": "Lanceur de sorts utilisant la Sagesse. DD des sorts 13, +5 aux attaques de sort. À volonté : assistance, flamme sacrée, thaumaturgie. 3/jour chacun : bénédiction, soins, sanctuaire. 1/jour chacun : restauration partielle, arme spirituelle.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Masse",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 2,
        "damage": "1d6",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Flamme sacrée",
        "detail": "Une créature à 18 m effectue un JS de Dextérité DD 13.",
        "kind": "save",
        "dc": 13,
        "save": "DEX",
        "damage": "2d8",
        "damageType": "radiants",
        "economy": "action"
      },
      {
        "name": "Assistance",
        "detail": "À volonté.",
        "kind": "text"
      },
      {
        "name": "Thaumaturgie",
        "detail": "À volonté.",
        "kind": "text"
      },
      {
        "name": "Bénédiction",
        "detail": "3/jour.",
        "kind": "text"
      },
      {
        "name": "Soins",
        "detail": "3/jour. Les paramètres de soin ne sont pas détaillés dans le statblock fourni.",
        "kind": "text"
      },
      {
        "name": "Sanctuaire",
        "detail": "3/jour.",
        "kind": "text"
      },
      {
        "name": "Restauration partielle",
        "detail": "1/jour.",
        "kind": "text"
      },
      {
        "name": "Arme spirituelle",
        "detail": "1/jour.",
        "kind": "text"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Bénédiction",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Soins",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Sanctuaire",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Restauration partielle",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Arme spirituelle",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "PV 27 (5d8 + 5). ND 1 (200 PX). Comportement : protège prioritairement les innocents et les blessés, puis soutient les gardes. Butin : symbole sacré, vêtements cérémoniels, 2d10 po appartenant souvent au temple plutôt qu’au prêtre."
  },
  {
    "id": "npc-garde-villageois",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Garde",
      "Milice",
      "Combat"
    ],
    "name": "Garde villageois",
    "subtitle": "Civil générique · maintien de l’ordre",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/2",
    "ac": 16,
    "hp": 24,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 14,
      "DEX": 12,
      "CON": 14,
      "INT": 10,
      "SAG": 12,
      "CHA": 10
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "athletisme": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun",
    "traits": [
      {
        "name": "Tenir la ligne",
        "detail": "Tant qu’un garde se trouve à 1,50 m d’un autre allié équipé d’un bouclier, il bénéficie d’un bonus de +1 à la CA.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Lance",
        "detail": "Attaque de mêlée : 1d6+2 perforants, ou 1d8+2 à deux mains.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+2",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Arbalète légère",
        "detail": "Attaque à distance.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d8+1",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Coup de bouclier",
        "detail": "Sur une touche, JS FOR DD 12 ou repoussée de 1,50 m.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d4+2",
        "damageType": "contondants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 24 (4d8 + 6). ND 1/2 (100 PX). Comportement : combat en formation, protège les civils et essaie de capturer les criminels plutôt que de les tuer. Butin : équipement militaire, sifflet, 1d6 pa et insigne de la milice."
  },
  {
    "id": "npc-prevot-chef-milice",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Garde",
      "Commandement",
      "Milice"
    ],
    "name": "Prévôt / Chef de milice",
    "subtitle": "Civil générique · défense du village",
    "type": "Humanoïde",
    "size": "M",
    "cr": "2",
    "ac": 17,
    "hp": 52,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 2,
    "abilities": {
      "FOR": 16,
      "DEX": 13,
      "CON": 15,
      "INT": 12,
      "SAG": 14,
      "CHA": 14
    },
    "saves": "FOR +5, CON +4",
    "saveMods": {
      "FOR": 5,
      "CON": 4
    },
    "skills": {
      "athletisme": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "intimidation": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 14 · commun plus une langue",
    "traits": [
      {
        "name": "Commandement tactique",
        "detail": "Les gardes alliés situés à 3 m du prévôt ont l’avantage contre l’état effrayé.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Attaques multiples",
        "detail": "Le prévôt effectue deux attaques.",
        "kind": "multiattack",
        "sequence": "Épée longue*2",
        "economy": "action"
      },
      {
        "name": "Épée longue",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3",
        "damageType": "tranchants",
        "economy": "action"
      },
      {
        "name": "Arbalète lourde",
        "detail": "Attaque à distance.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d10+1",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Ordre !",
        "detail": "Action bonus : un allié à 9 m qui peut l’entendre peut se déplacer de la moitié de sa vitesse sans provoquer d’attaque d’opportunité.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Parade",
        "detail": "Ajoute +2 à sa CA contre une attaque de corps à corps qui devrait le toucher.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 52 (8d8 + 16). ND 2 (450 PX). Comportement : identifie rapidement l’ennemi le plus dangereux et organise les autres villageois autour de lui. Butin : armes, armure, insigne d’autorité, clés des geôles et 2d10 po."
  },
  {
    "id": "npc-chasseur-trappeur",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Chasse",
      "Pistage",
      "Exploration"
    ],
    "name": "Chasseur / Trappeur",
    "subtitle": "Civil générique · nature, pistage",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1",
    "ac": 14,
    "hp": 30,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 12,
      "DEX": 16,
      "CON": 14,
      "INT": 11,
      "SAG": 15,
      "CHA": 9
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "discretion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "nature": {
        "mod": 2,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 6,
        "status": "Expertise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 14 · commun",
    "traits": [
      {
        "name": "Pisteur",
        "detail": "Avantage aux tests de Survie pour suivre des traces.",
        "kind": "text"
      },
      {
        "name": "Tireur embusqué",
        "detail": "Une fois par tour, s’il attaque depuis une position où sa cible ne l’a pas détecté, son attaque inflige 1d6 dégâts supplémentaires.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Arc long",
        "detail": "Attaque à distance.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Épée courte",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d6+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Piège de chasse",
        "detail": "Peut poser un piège adapté à une créature de taille M ou inférieure en 1 minute.",
        "kind": "text",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 30 (5d8 + 8). ND 1 (200 PX). Comportement : préfère engager à distance puis changer constamment de position. Butin : arc, 20 flèches, 1d4 pièges, couteau, corde, rations et 1d6 po."
  },
  {
    "id": "npc-eclaireur-messager",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Éclaireur",
      "Messager",
      "Voyage"
    ],
    "name": "Éclaireur / Messager",
    "subtitle": "Civil générique · voyage, reconnaissance",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/2",
    "ac": 14,
    "hp": 19,
    "initiative": 2,
    "speed": "10,50 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 11,
      "DEX": 15,
      "CON": 14,
      "INT": 11,
      "SAG": 14,
      "CHA": 12
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "acrobaties": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "discretion": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 14",
    "traits": [
      {
        "name": "Courseur",
        "detail": "Les terrains difficiles naturels ne lui coûtent pas de déplacement supplémentaire lorsqu’il effectue l’action Foncer.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Arc court",
        "detail": "Attaque à distance.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+2",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Épée courte",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d6+2",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Déplacement rapide",
        "detail": "Action bonus : effectue l’action Foncer ou Se désengager.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 19 (3d8 + 6). ND 1/2 (100 PX). Langues non précisées dans le statblock fourni. Comportement : son premier instinct est de transmettre l’information, pas de remporter le combat. Butin : carte locale, matériel de voyage, messages éventuels, 2d6 pa."
  },
  {
    "id": "npc-berger-dresseur",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Animaux",
      "Élevage",
      "Dressage"
    ],
    "name": "Berger / Dresseur",
    "subtitle": "Civil générique · animaux, élevage",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/4",
    "ac": 12,
    "hp": 17,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 12,
      "DEX": 12,
      "CON": 13,
      "INT": 10,
      "SAG": 15,
      "CHA": 13
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "dressage": {
        "mod": 6,
        "status": "Expertise"
      },
      "perception": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "survie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 14",
    "traits": [
      {
        "name": "Maître des bêtes",
        "detail": "Les animaux domestiqués commencent généralement avec une attitude amicale envers le berger.",
        "kind": "text"
      },
      {
        "name": "Connaissance du troupeau",
        "detail": "Peut déterminer après un examen rapide si un animal est blessé, malade ou particulièrement agité.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Bâton",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d6+1",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Fronde",
        "detail": "Attaque à distance.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d4+1",
        "damageType": "contondants",
        "economy": "action"
      },
      {
        "name": "Commande animale",
        "detail": "Action bonus : un animal domestiqué allié à 18 m peut immédiatement se déplacer de la moitié de sa vitesse.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 17 (3d8 + 3). ND 1/4 (50 PX). Langues non précisées dans le statblock fourni. Comportement : utilise ses animaux pour alerter, encercler ou distraire, mais évite de les sacrifier inutilement. Butin : bâton, sifflet, corde, nourriture animale et 1d6 pa."
  },
  {
    "id": "npc-sage-erudit",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Savoir",
      "Archives",
      "Érudit"
    ],
    "name": "Sage / Érudit",
    "subtitle": "Civil générique · informations, archives",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/4",
    "ac": 10,
    "hp": 11,
    "initiative": 0,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 10,
      "CON": 12,
      "INT": 17,
      "SAG": 14,
      "CHA": 11
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "arcanes": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "histoire": {
        "mod": 7,
        "status": "Expertise"
      },
      "investigation": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "religion": {
        "mod": 5,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 12 · commun plus trois langues",
    "traits": [
      {
        "name": "Mémoire savante",
        "detail": "Quand le sage effectue un test d’Intelligence concernant l’histoire, la religion, la magie ou la région, il peut ajouter 1d4 au résultat.",
        "kind": "text"
      },
      {
        "name": "Recherche documentaire",
        "detail": "Avec au moins une heure et l’accès à des archives appropriées, il obtient l’avantage à son prochain test d’Intelligence concernant le sujet étudié.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Dague",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 2,
        "damage": "1d4",
        "damageType": "perforants",
        "economy": "action"
      }
    ],
    "reactions": [],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 11 (2d8 + 2). ND 1/4 (50 PX). Comportement : considère généralement le combat comme une catastrophe logistique et cherche immédiatement une sortie. Butin : livres, notes, cartes, matériel d’écriture, 1d10 po ; ses ouvrages peuvent valoir beaucoup plus."
  },
  {
    "id": "npc-arcaniste-local",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Magie",
      "Arcanes",
      "Services"
    ],
    "name": "Arcaniste local",
    "subtitle": "Civil générique · magie, identification",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1",
    "ac": 12,
    "hp": 24,
    "initiative": 2,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 8,
      "DEX": 14,
      "CON": 11,
      "INT": 16,
      "SAG": 12,
      "CHA": 11
    },
    "saves": "INT +5, SAG +3",
    "saveMods": {
      "INT": 5,
      "SAG": 3
    },
    "skills": {
      "arcanes": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "investigation": {
        "mod": 5,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 11 · commun plus deux langues",
    "traits": [
      {
        "name": "Incantation",
        "detail": "Intelligence comme caractéristique d’incantation. DD 13, +5 aux attaques de sort. À volonté : main du mage, prestidigitation, trait de feu. 3/jour : projectile magique, détection de la magie. 1/jour : bouclier, sommeil, pas brumeux.",
        "kind": "text"
      },
      {
        "name": "Armure du mage",
        "detail": "CA 15 avec armure du mage ; CA 12 sinon.",
        "kind": "text"
      },
      {
        "name": "Services typiques",
        "detail": "Peut reconnaître un phénomène magique, copier ou traduire des inscriptions arcaniques, lancer détection de la magie et produire de petits effets magiques utilitaires.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Trait de feu",
        "detail": "Attaque de sort à distance, portée 36 m.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d10",
        "damageType": "feu",
        "economy": "action"
      },
      {
        "name": "Dague",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 4,
        "damage": "1d4+2",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Projectile magique",
        "detail": "3/jour. Les dégâts ne sont pas détaillés dans le statblock fourni.",
        "kind": "text"
      },
      {
        "name": "Détection de la magie",
        "detail": "3/jour.",
        "kind": "text"
      },
      {
        "name": "Sommeil",
        "detail": "1/jour.",
        "kind": "text"
      },
      {
        "name": "Pas brumeux",
        "detail": "1/jour.",
        "kind": "text"
      }
    ],
    "reactions": [
      {
        "name": "Bouclier magique",
        "detail": "1/jour. Obtient +5 à la CA jusqu’au début de son prochain tour.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [
      {
        "name": "Projectile magique",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Détection de la magie",
        "max": 3,
        "start": 3,
        "reset": "jour"
      },
      {
        "name": "Bouclier magique",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Sommeil",
        "max": 1,
        "start": 1,
        "reset": "jour"
      },
      {
        "name": "Pas brumeux",
        "max": 1,
        "start": 1,
        "reset": "jour"
      }
    ],
    "notes": "PV 24 (5d8 + 2). ND 1 (200 PX). Butin : focaliseur arcanique, composants mineurs, carnet de sorts et 2d10 po."
  },
  {
    "id": "npc-larron-contrebandier",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Crime",
      "Infiltration",
      "Contrebande"
    ],
    "name": "Larron / Contrebandier",
    "subtitle": "Civil générique · crime, infiltration",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1",
    "ac": 14,
    "hp": 30,
    "initiative": 3,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 10,
      "DEX": 16,
      "CON": 14,
      "INT": 13,
      "SAG": 12,
      "CHA": 14
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "discretion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "escamotage": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "perception": {
        "mod": 3,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 4,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 13 · commun plus argot local",
    "traits": [
      {
        "name": "Outils de voleur",
        "detail": "Outils de voleur +5.",
        "kind": "text"
      },
      {
        "name": "Attaque sournoise",
        "detail": "1/tour. Une attaque avec une arme de finesse ou à distance inflige 1d6 dégâts supplémentaires lorsqu’il bénéficie de l’avantage ou qu’un allié menace la cible.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Dague",
        "detail": "Attaque au corps à corps. Attaque sournoise possible si les conditions sont remplies.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d4+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Arbalète légère",
        "detail": "Attaque à distance. Attaque sournoise possible si les conditions sont remplies.",
        "kind": "attack",
        "bonus": 5,
        "damage": "1d8+3",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Fourberie",
        "detail": "Action bonus : effectue l’action Se cacher, Foncer ou Se désengager.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Esquive instinctive",
        "detail": "Lorsqu’il est touché par une attaque qu’il voit, réduit les dégâts de 1d6.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 30 (5d8 + 8). ND 1 (200 PX). Comportement : ne se bat jamais loyalement ; utilise couvertures, portes, foule et obscurité. Butin : outils de voleur, 2d10 po, objets volés valant 1d20 po, éventuellement une clé ou un message compromettant."
  },
  {
    "id": "npc-bourgmestre-notable",
    "category": "npc",
    "source": "Bestiaire civil générique · utilisateur",
    "tags": [
      "Village",
      "Civil générique",
      "Politique",
      "Autorité",
      "Social"
    ],
    "name": "Bourgmestre / Notable",
    "subtitle": "Civil générique · politique, négociation",
    "type": "Humanoïde",
    "size": "M",
    "cr": "1/2",
    "ac": 12,
    "hp": 22,
    "initiative": 1,
    "speed": "9 m",
    "attacksPerAction": 1,
    "abilities": {
      "FOR": 10,
      "DEX": 12,
      "CON": 12,
      "INT": 14,
      "SAG": 14,
      "CHA": 16
    },
    "saves": "",
    "saveMods": {},
    "skills": {
      "histoire": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "intuition": {
        "mod": 4,
        "status": "Maîtrise"
      },
      "persuasion": {
        "mod": 5,
        "status": "Maîtrise"
      },
      "tromperie": {
        "mod": 5,
        "status": "Maîtrise"
      }
    },
    "damageResistances": [],
    "damageVulnerabilities": [],
    "damageImmunities": [],
    "conditionImmunities": [],
    "senses": "Perception passive 12 · commun plus deux langues",
    "traits": [
      {
        "name": "Autorité locale",
        "detail": "Avantage aux tests de Charisme effectués auprès d’habitants qui reconnaissent officiellement son autorité.",
        "kind": "text"
      },
      {
        "name": "Réseau de connaissances",
        "detail": "Après 1 heure passée à interroger les habitants, peut généralement identifier une personne capable de fournir un service légal courant disponible dans le village.",
        "kind": "text"
      }
    ],
    "actions": [
      {
        "name": "Rapière",
        "detail": "Attaque au corps à corps.",
        "kind": "attack",
        "bonus": 3,
        "damage": "1d8+1",
        "damageType": "perforants",
        "economy": "action"
      },
      {
        "name": "Directive",
        "detail": "Action bonus : un allié situé à 9 m qui peut l’entendre ajoute 1d4 à son prochain jet d’attaque ou test de caractéristique effectué avant la fin de son prochain tour.",
        "kind": "text",
        "economy": "bonus"
      }
    ],
    "reactions": [
      {
        "name": "Interposition sociale",
        "detail": "Lorsqu’un allié à 9 m effectue un test de Persuasion ou d’Intimidation, le notable peut lui accorder l’avantage s’il peut participer à la conversation.",
        "kind": "text",
        "economy": "reaction"
      }
    ],
    "legendaryActions": [],
    "lairActions": [],
    "legendaryMax": 0,
    "isBoss": false,
    "phases": [],
    "resources": [],
    "notes": "PV 22 (4d8 + 4). ND 1/2 (100 PX). Comportement : cherche à contrôler la situation plutôt qu’à combattre ; en cas d’attaque, appelle la milice et se met à couvert. Butin : 3d10 po, sceau officiel, clés de bâtiments administratifs, correspondance et documents locaux."
  }
];
  const existing = new Set(window.ENCOUNTER_BUILTINS.map(x=>x.id));
  extraVillage.forEach(x=>{ if(!existing.has(x.id)) window.ENCOUNTER_BUILTINS.push(x); });
})();
