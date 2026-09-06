'use strict';

const STORAGE_KEY = 'encounter-console-v1';
const CONDITIONS = ['Aveuglé','Charmé','Assourdi','Effrayé','Empoisonné','Entravé','Étourdi','Inconscient','Invisible','Paralysé','Pétrifié','À terre','Agrippé','Incapacité'];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const clone = o => JSON.parse(JSON.stringify(o));

const SAMPLE_MONSTERS = [
  {
    id:'gobelin-veteran',name:'Gobelin vétéran',type:'Humanoïde (gobelinoïde)',size:'P',cr:'2',ac:17,hp:36,initiative:3,speed:'9 m',
    saves:'DEX +5',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · commun, gobelin',
    traits:[{name:'Évasion agile',detail:'Peut Se désengager ou Se cacher par une action bonus.',kind:'text'}],
    actions:[
      {name:'Cimeterre',detail:'Attaque de corps à corps.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'tranchants'},
      {name:'Arc court',detail:'Portée 24/96 m.',kind:'attack',bonus:5,damage:'1d6+3',damageType:'perforants'}
    ],reactions:[],legendaryActions:[],legendaryMax:0,phases:[],notes:'Un adversaire simple pour tester les groupes.'
  },
  {
    id:'ogre-des-ruines',name:'Ogre des ruines',type:'Géant',size:'G',cr:'5',ac:15,hp:105,initiative:0,speed:'12 m',
    saves:'FOR +7, CON +6',resistances:'',immunities:'',senses:'Vision dans le noir 18 m · géant, commun',
    traits:[{name:'Brute',detail:'Ses attaques de mêlée sont particulièrement lourdes.',kind:'text'}],
    actions:[
      {name:'Massue de siège',detail:'Attaque de corps à corps.',kind:'attack',bonus:7,damage:'2d8+5',damageType:'contondants'},
      {name:'Rocher',detail:'Attaque à distance, portée 18/72 m.',kind:'attack',bonus:7,damage:'2d10+5',damageType:'contondants'}
    ],reactions:[{name:'Balayage brutal',detail:'Lorsqu’une créature quitte sa portée, l’ogre effectue une attaque.',kind:'attack',bonus:7,damage:'2d8+5',damageType:'contondants'}],legendaryActions:[],legendaryMax:0,phases:[],notes:'Exemple de brute intermédiaire.'
  },
  {
    id:'fausse-hydre-demo',name:'Fausse hydre — Démo',type:'Aberration',size:'TG',cr:'12',ac:17,hp:220,initiative:4,speed:'9 m',
    saves:'FOR +9, CON +9, SAG +7',resistances:'psychiques',immunities:'charmé, effrayé',senses:'Perception aveugle 18 m · télépathie 36 m',
    traits:[
      {name:'Chant d’oubli',detail:'Les créatures qui perçoivent son chant peinent à conserver les souvenirs liés à ses victimes.',kind:'text'},
      {name:'Têtes multiples',detail:'La créature peut exercer une pression sur plusieurs zones du champ de bataille.',kind:'text'}
    ],
    actions:[
      {name:'Morsure',detail:'Une tête mord une cible à portée.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'perforants'},
      {name:'Cri de dissonance',detail:'Toutes les créatures choisies dans la zone effectuent un JS de Sagesse.',kind:'save',dc:17,save:'SAG',damage:'4d8',damageType:'psychiques'},
      {name:'Hurlement mnésique',detail:'Recharge 5–6. Une onde mentale déchire les souvenirs immédiats.',kind:'recharge',recharge:'5-6',dc:17,save:'SAG',damage:'6d8',damageType:'psychiques'}
    ],
    reactions:[{name:'Cou réflexe',detail:'Lorsqu’elle est attaquée au corps à corps, une tête libre peut riposter.',kind:'attack',bonus:9,damage:'1d10+5',damageType:'contondants'}],
    legendaryActions:[
      {name:'Déplacement',detail:'Se déplace sans provoquer d’attaque d’opportunité.',kind:'text',cost:1},
      {name:'Morsure',detail:'Effectue une Morsure.',kind:'attack',bonus:9,damage:'2d10+5',damageType:'perforants',cost:1},
      {name:'Chant discordant',detail:'Une cible effectue un JS de SAG.',kind:'save',dc:17,save:'SAG',damage:'3d8',damageType:'psychiques',cost:2}
    ],legendaryMax:3,
    phases:[
      {name:'Phase II — Le chant se brise',threshold:150,ac:18,note:'La fausse hydre se cabre. Ses têtes cessent de chanter à l’unisson et deviennent plus agressives.'},
      {name:'Phase III — Faim absolue',threshold:70,ac:19,note:'Les cous s’entrelacent et la créature abandonne toute prudence.'}
    ],
    notes:'Boss de démonstration en trois temps. Tous les chiffres sont modifiables dans l’éditeur.'
  }
];

function blankState(){
  return {
    version:1,
    encounter:{name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[]},
    monsters:clone(SAMPLE_MONSTERS).map(normalizeMonster)
  };
}

let state = loadState();
let undoStack = [];

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return blankState();
    const parsed = JSON.parse(raw);
    if(!parsed.monsters?.length) parsed.monsters = clone(SAMPLE_MONSTERS);
    parsed.monsters = parsed.monsters.map(normalizeMonster);
    if(!parsed.encounter) parsed.encounter = blankState().encounter;
    return parsed;
  }catch(err){ console.warn(err); return blankState(); }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function checkpoint(){
  undoStack.push(JSON.stringify(state));
  if(undoStack.length>30) undoStack.shift();
}
function undo(){
  if(!undoStack.length) return toast('Rien à annuler.');
  state = JSON.parse(undoStack.pop()); saveState(); render(); toast('Dernière modification annulée.');
}
function toast(msg){
  const el=$('#toast'); el.textContent=msg; el.classList.add('show'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('show'),2100);
}
function log(msg){
  state.encounter.log.unshift({id:uid('log'),time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),text:msg});
  state.encounter.log = state.encounter.log.slice(0,120); saveState();
}
function mutate(fn,msg){ checkpoint(); fn(); if(msg)log(msg); saveState(); render(); }

function normalizeAbility(a={}){
  return {id:a.id||uid('ab'),name:a.name||'Capacité',detail:a.detail||'',kind:a.kind||'text',bonus:numOrNull(a.bonus),damage:a.damage||'',damageType:a.damageType||'',dc:numOrNull(a.dc),save:a.save||'',cost:Number(a.cost)||1,recharge:a.recharge||''};
}
function numOrNull(v){ return v===''||v==null?null:Number(v); }
function normalizeMonster(m){
  return {
    id:m.id||uid('monster'),name:m.name||'Adversaire',type:m.type||'',size:m.size||'',cr:String(m.cr??''),ac:Number(m.ac)||10,hp:Math.max(1,Number(m.hp)||1),initiative:Number(m.initiative)||0,speed:m.speed||'',saves:m.saves||'',resistances:m.resistances||'',immunities:m.immunities||'',senses:m.senses||'',
    traits:(m.traits||[]).map(normalizeAbility),actions:(m.actions||[]).map(normalizeAbility),reactions:(m.reactions||[]).map(normalizeAbility),legendaryActions:(m.legendaryActions||[]).map(normalizeAbility),legendaryMax:Number(m.legendaryMax)||((m.legendaryActions||[]).length?3:0),
    phases:(m.phases||[]).map(p=>({id:p.id||uid('phase'),name:p.name||'Phase',threshold:Number(p.threshold)||0,ac:numOrNull(p.ac),note:p.note||''})).sort((a,b)=>b.threshold-a.threshold),notes:m.notes||''
  };
}
function makeParticipant(monster, n=1, initiative=10, groupId=null){
  const m=normalizeMonster(monster);
  const abilityState={};
  [...m.actions,...m.reactions,...m.legendaryActions].forEach(a=>abilityState[a.id]={ready:true});
  return {id:uid('p'),modelId:m.id,groupId,name:groupId?`${m.name} ${n}`:m.name,baseName:m.name,kind:'enemy',ac:m.ac,maxHp:m.hp,hp:m.hp,tempHp:0,initiative:Number(initiative)||0,conditions:[],reactionUsed:false,legendaryRemaining:m.legendaryMax,currentPhaseId:null,abilityState};
}
function sortedParticipants(){
  return [...state.encounter.participants].sort((a,b)=> b.initiative-a.initiative || a.name.localeCompare(b.name,'fr'));
}
function activeParticipant(){
  const list=sortedParticipants();
  if(!list.length) return null;
  state.encounter.currentTurn=Math.max(0,Math.min(state.encounter.currentTurn,list.length-1));
  return list[state.encounter.currentTurn];
}
function selectedParticipant(){
  return state.encounter.participants.find(p=>p.id===state.encounter.selectedId) || activeParticipant();
}
function modelFor(p){ return p?.modelId ? state.monsters.find(m=>m.id===p.modelId) : null; }
function effectiveAc(p){
  const m=modelFor(p); const phase=currentPhase(p,m); return phase?.ac ?? p.ac;
}
function currentPhase(p,m=modelFor(p)){
  if(!m?.phases?.length) return null;
  const crossed=m.phases.filter(ph=>p.hp<=ph.threshold).sort((a,b)=>a.threshold-b.threshold);
  return crossed[0]||null;
}
function checkPhaseTransition(p){
  const m=modelFor(p); if(!m) return;
  const ph=currentPhase(p,m); const newId=ph?.id||null;
  if(newId!==p.currentPhaseId){
    p.currentPhaseId=newId;
    if(ph) log(`⚠ ${p.name} entre dans « ${ph.name} » — ${ph.note||'changement de phase.'}`);
  }
}

function rollDie(sides){ return Math.floor(Math.random()*sides)+1; }
function rollD20(mode='normal'){
  const a=rollDie(20),b=rollDie(20);
  if(mode==='adv') return {roll:Math.max(a,b),detail:`${a}/${b}`};
  if(mode==='dis') return {roll:Math.min(a,b),detail:`${a}/${b}`};
  return {roll:a,detail:String(a)};
}
function rollExpression(expr){
  if(!expr) return {total:0,detail:'0'};
  const clean=String(expr).replace(/\s/g,'').replace(/−/g,'-');
  const parts=clean.match(/[+-]?[^+-]+/g)||[]; let total=0; const details=[];
  for(const raw of parts){
    let sign=1,part=raw;if(part[0]==='+')part=part.slice(1);else if(part[0]==='-'){sign=-1;part=part.slice(1)}
    const dm=part.match(/^(\d*)d(\d+)$/i);
    if(dm){const n=Number(dm[1]||1),s=Number(dm[2]);const rolls=Array.from({length:n},()=>rollDie(s));const subtotal=rolls.reduce((a,b)=>a+b,0)*sign;total+=subtotal;details.push(`${sign<0?'-':''}${rolls.join('+')}`)}
    else if(!Number.isNaN(Number(part))){total+=Number(part)*sign;details.push(`${sign<0?'-':''}${part}`)}
    else details.push(part);
  }
  return {total,detail:details.join(' + ').replace(/\+ -/g,'- ')};
}

function render(){
  $('#encounterName').value=state.encounter.name;
  $('#roundNumber').textContent=state.encounter.round;
  renderInitiative(); renderLibrary(); renderCombat(); renderDetail(); renderLog();
}
function renderInitiative(){
  const list=sortedParticipants(),active=activeParticipant();
  $('#initiativeRibbon').innerHTML=list.length?list.map(p=>`<button class="init-chip ${p.id===active?.id?'active':''} ${p.hp<=0?'dead':''}" data-select="${p.id}">${esc(p.name)} <b>${p.initiative}</b></button>`).join(''):'<span class="muted">Aucune initiative</span>';
}
function renderLibrary(){
  const q=$('#monsterSearch').value.trim().toLowerCase();
  const ms=state.monsters.filter(m=>`${m.name} ${m.type} ${m.cr}`.toLowerCase().includes(q));
  $('#monsterLibrary').innerHTML=ms.map(m=>`<article class="library-card">
    <div class="library-title"><h3>${esc(m.name)}</h3><span class="cr-badge">FP ${esc(m.cr||'—')}</span></div>
    <div class="library-meta">${esc([m.size,m.type].filter(Boolean).join(' · '))} · CA ${m.ac} · ${m.hp} PV</div>
    <div class="library-actions"><button class="primary small" data-add-monster="${m.id}">+ Ajouter</button><button class="ghost small" data-edit-monster="${m.id}">Modifier</button></div>
  </article>`).join('') || '<p class="muted">Aucun résultat.</p>';
}
function renderCombat(){
  const list=sortedParticipants(),active=activeParticipant();
  $('#combatList').innerHTML=list.map(p=>{
    const pct=Math.max(0,Math.min(100,p.hp/p.maxHp*100)),cls=pct>60?'healthy':pct>30?'mid':'',phase=currentPhase(p);
    return `<article class="combat-card ${p.id===active?.id?'active':''} ${p.hp<=0?'dead':''}" data-card="${p.id}">
      <div class="combat-top"><span class="turn-dot"></span><div><div class="combat-name">${esc(p.name)}</div><div class="combat-sub">${p.kind==='enemy'?esc(modelFor(p)?.type||'Adversaire'):'PJ / PNJ'} · CA ${effectiveAc(p)}</div></div><div class="initiative-box"><span>INI</span><input data-init="${p.id}" type="number" value="${p.initiative}"></div></div>
      <div class="hp-line"><div class="hpbar"><div class="hpfill ${cls}" style="width:${pct}%"></div></div><div class="hptext">${p.hp}${p.tempHp?` +${p.tempHp}`:''} / ${p.maxHp}</div></div>
      <div class="quick-row"><button data-dmg="${p.id}:1">−1</button><button data-dmg="${p.id}:5">−5</button><button data-dmg="${p.id}:10">−10</button><button data-heal="${p.id}:5">+5</button><button data-select="${p.id}">Ouvrir</button><button class="danger" data-remove="${p.id}">Retirer</button></div>
      <div class="condition-pills">${p.hp<=0?'<span class="pill dead-pill">0 PV</span>':''}${phase?`<span class="pill phase-pill">${esc(phase.name)}</span>`:''}${p.conditions.map(c=>`<span class="pill">${esc(c)}</span>`).join('')}</div>
    </article>`
  }).join('');
  $('#combatList').classList.toggle('empty-state',!list.length);
}
function renderDetail(){
  const p=selectedParticipant(); const root=$('#activeDetail');
  if(!p){root.className='active-detail empty-detail';root.innerHTML='<div class="empty-crest">✦</div><h2>Aucune créature sélectionnée</h2><p>Ajoute un adversaire depuis la bibliothèque ou un PJ/PNJ manuel.</p>';return}
  root.className='active-detail'; const m=modelFor(p); const phase=currentPhase(p,m);
  root.innerHTML=`
    ${phase?`<div class="boss-alert"><strong>⚠ ${esc(phase.name)}</strong>${esc(phase.note||'')}</div>`:''}
    <div class="detail-title-row"><div><span class="eyebrow">CRÉATURE ACTIVE</span><h2>${esc(p.name)}</h2><div class="detail-meta">${m?esc([m.size,m.type,`FP ${m.cr||'—'}`].filter(Boolean).join(' · ')):'Participant manuel'}</div></div><button class="ghost small" data-remove="${p.id}">Retirer</button></div>
    <div class="stat-grid"><div class="statbox"><span>CA</span><b>${effectiveAc(p)}</b></div><div class="statbox"><span>PV</span><b>${p.hp}/${p.maxHp}</b></div><div class="statbox"><span>Initiative</span><b>${p.initiative>=0?'+':''}${p.initiative}</b></div><div class="statbox"><span>Vitesse</span><b>${esc(m?.speed||'—')}</b></div></div>
    <div class="detail-section"><h3>PV & dégâts</h3><div class="damage-entry"><input id="damageAmount" type="number" min="0" placeholder="Montant"><button class="danger" data-apply-damage="${p.id}">Dégâts</button><button data-apply-heal="${p.id}">Soins</button></div><div class="quick-row"><button data-temp="${p.id}">PV temporaires</button><button data-sethp="${p.id}">Fixer les PV</button></div></div>
    <div class="detail-section"><h3>États</h3><div class="condition-grid">${CONDITIONS.map(c=>`<button class="condition-btn ${p.conditions.includes(c)?'active':''}" data-condition="${p.id}|${esc(c)}">${esc(c)}</button>`).join('')}</div></div>
    ${m?renderMonsterDetails(p,m):'<div class="detail-section"><h3>Participant manuel</h3><p class="detail-notes">Suivi simple des PV, CA, initiative et états.</p></div>'}
  `;
}
function renderMonsterDetails(p,m){
  const traits=m.traits?.length?`<div class="detail-section"><h3>Traits</h3>${m.traits.map(a=>abilityCard(p,a,'trait')).join('')}</div>`:'';
  const actions=m.actions?.length?`<div class="detail-section"><h3>Actions</h3>${m.actions.map(a=>abilityCard(p,a,'action')).join('')}</div>`:'';
  const reactions=m.reactions?.length?`<div class="detail-section"><h3>Réactions ${p.reactionUsed?'· utilisée':'· prête'}</h3>${m.reactions.map(a=>abilityCard(p,a,'reaction')).join('')}</div>`:'';
  const leg=m.legendaryActions?.length?`<div class="detail-section"><h3>Actions légendaires</h3><div class="resource-meter">${Array.from({length:m.legendaryMax},(_,i)=>`<span class="star ${i<p.legendaryRemaining?'':'off'}">★</span>`).join('')}<span class="muted">${p.legendaryRemaining}/${m.legendaryMax}</span></div>${m.legendaryActions.map(a=>abilityCard(p,a,'legendary')).join('')}</div>`:'';
  const defenses=[m.saves&&`<b>JS :</b> ${esc(m.saves)}`,m.resistances&&`<b>Résistances :</b> ${esc(m.resistances)}`,m.immunities&&`<b>Immunités :</b> ${esc(m.immunities)}`,m.senses&&`<b>Sens :</b> ${esc(m.senses)}`].filter(Boolean).join('<br>');
  return `${defenses?`<div class="detail-section"><h3>Défenses & sens</h3><p class="detail-notes">${defenses}</p></div>`:''}${traits}${actions}${reactions}${leg}${m.notes?`<div class="detail-section"><h3>Notes MJ</h3><p class="detail-notes">${esc(m.notes)}</p></div>`:''}<div class="detail-section"><button class="ghost" data-edit-monster="${m.id}">✎ Modifier le statblock</button></div>`;
}
function abilityCard(p,a,section){
  const st=p.abilityState?.[a.id]||{ready:true}; const unavailable=(a.kind==='recharge'&&!st.ready)||(section==='reaction'&&p.reactionUsed)||(section==='legendary'&&p.legendaryRemaining<(a.cost||1));
  const tags=[]; if(a.bonus!=null)tags.push(`+${a.bonus}`);if(a.dc!=null)tags.push(`${a.save||'JS'} DD ${a.dc}`);if(a.damage)tags.push(a.damage+(a.damageType?` ${a.damageType}`:''));if(a.kind==='recharge')tags.push(`Recharge ${a.recharge||'5-6'}`);if(section==='legendary')tags.push(`${a.cost||1} ★`);
  return `<div class="ability-card"><div class="ability-head"><b>${esc(a.name)}</b><span class="cr-badge">${esc(tags.join(' · '))}</span></div><p>${esc(a.detail||'')}</p><div class="ability-buttons">
    ${a.kind==='recharge'&&!st.ready?`<button class="primary" data-recharge="${p.id}|${a.id}">🎲 Tester recharge</button>`:`<button class="${unavailable?'ghost':'primary'}" ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|normal">Utiliser</button>`}
    ${['attack'].includes(a.kind)?`<button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|adv">Avantage</button><button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|dis">Désav.</button>`:''}
  </div></div>`;
}
function renderLog(){
  $('#combatLog').innerHTML=state.encounter.log.length?state.encounter.log.map(x=>`<div class="log-entry"><span class="time">${esc(x.time)}</span>${esc(x.text)}</div>`).join(''):'<span class="muted">Le journal est vide.</span>';
}

function damageParticipant(id,amount){
  const p=state.encounter.participants.find(x=>x.id===id); if(!p)return;
  amount=Math.max(0,Number(amount)||0); if(!amount)return;
  mutate(()=>{
    let left=amount;
    if(p.tempHp>0){const used=Math.min(p.tempHp,left);p.tempHp-=used;left-=used}
    p.hp=Math.max(0,p.hp-left); checkPhaseTransition(p);
    state.encounter.selectedId=p.id;
  },`${p.name} subit ${amount} dégâts → ${p.hp}/${p.maxHp} PV${p.hp<=0?' · 0 PV':''}.`);
}
function healParticipant(id,amount){
  const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;amount=Math.max(0,Number(amount)||0);if(!amount)return;
  mutate(()=>{p.hp=Math.min(p.maxHp,p.hp+amount);checkPhaseTransition(p);state.encounter.selectedId=p.id},`${p.name} récupère ${amount} PV → ${p.hp}/${p.maxHp}.`);
}
function removeParticipant(id){
  const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;
  mutate(()=>{state.encounter.participants=state.encounter.participants.filter(x=>x.id!==id);if(state.encounter.selectedId===id)state.encounter.selectedId=null;state.encounter.currentTurn=Math.min(state.encounter.currentTurn,Math.max(0,sortedParticipants().length-1))},`${p.name} est retiré du combat.`);
}
function nextTurn(){
  const list=sortedParticipants();if(!list.length)return toast('Aucun participant.');
  checkpoint(); let idx=state.encounter.currentTurn+1;if(idx>=list.length){idx=0;state.encounter.round++}
  state.encounter.currentTurn=idx;const p=sortedParticipants()[idx];state.encounter.selectedId=p.id;p.reactionUsed=false;const m=modelFor(p);if(m?.legendaryMax)p.legendaryRemaining=m.legendaryMax;
  log(`▶ Tour de ${p.name} — round ${state.encounter.round}.`);saveState();render();
}
function useAbility(pid,aid,section,mode='normal'){
  const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;
  const all=[...m.traits,...m.actions,...m.reactions,...m.legendaryActions],a=all.find(x=>x.id===aid);if(!a)return;
  const st=p.abilityState[aid]||(p.abilityState[aid]={ready:true});
  if(a.kind==='recharge'&&!st.ready)return toast('Cette capacité doit d’abord se recharger.');
  if(section==='reaction'&&p.reactionUsed)return toast('Réaction déjà utilisée.');
  if(section==='legendary'&&p.legendaryRemaining<(a.cost||1))return toast('Pas assez d’actions légendaires.');
  checkpoint(); let text=`${p.name} — ${a.name}`;
  if(a.kind==='attack'){
    const r=rollD20(mode),bonus=Number(a.bonus)||0,total=r.roll+bonus,dmg=rollExpression(a.damage);text+=` : d20 ${r.detail}${mode==='adv'?' (avantage)':mode==='dis'?' (désavantage)':''} + ${bonus} = ${total}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;
  }else if(a.kind==='save'||a.kind==='recharge'){
    const dmg=rollExpression(a.damage);if(a.dc)text+=` : ${a.save||'JS'} DD ${a.dc}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;
  }else text+=a.detail?` : ${a.detail}`:'';
  if(a.kind==='recharge')st.ready=false;if(section==='reaction')p.reactionUsed=true;if(section==='legendary')p.legendaryRemaining-=a.cost||1;
  log(text);saveState();render();toast(`${a.name} utilisé.`);
}
function testRecharge(pid,aid){
  const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;const a=[...m.actions,...m.reactions,...m.legendaryActions].find(x=>x.id===aid);if(!a)return;
  const roll=rollDie(6); const raw=a.recharge||'5-6'; const nums=(raw.match(/\d/g)||[]).map(Number); const min=nums.length?Math.min(...nums):5; const ok=roll>=min;
  mutate(()=>{p.abilityState[aid]=(p.abilityState[aid]||{});p.abilityState[aid].ready=ok},`${p.name} teste la recharge de ${a.name} : d6 = ${roll} → ${ok?'rechargée':'indisponible'}.`);
}
function toggleCondition(pid,c){
  const p=state.encounter.participants.find(x=>x.id===pid);if(!p)return;
  const adding=!p.conditions.includes(c);mutate(()=>{p.conditions=adding?[...p.conditions,c]:p.conditions.filter(x=>x!==c);state.encounter.selectedId=p.id},`${p.name} : ${adding?'ajoute':'retire'} l’état ${c}.`);
}

function openAddMonster(id){
  const m=state.monsters.find(x=>x.id===id);if(!m)return;$('#addMonsterName').textContent=m.name;const f=$('#addMonsterForm');f.reset();f.elements.monsterId.value=id;f.elements.initiative.value=m.initiative||10;f.elements.count.value=1;f.elements.sharedInitiative.checked=true;$('#addMonsterDialog').showModal();
}
function addMonsterToCombat(id,count,initiative,shared){
  const m=state.monsters.find(x=>x.id===id);if(!m)return;count=Math.max(1,Math.min(50,Number(count)||1));const groupId=count>1?uid('group'):null;
  mutate(()=>{for(let i=1;i<=count;i++){const ini=shared?Number(initiative)||0:(Number(initiative)||0)+rollDie(6)-3;state.encounter.participants.push(makeParticipant(m,count>1?i:1,ini,groupId))}state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null},`${count} × ${m.name} ajouté${count>1?'s':''} au combat.`);
}
function addPlayer(data){
  const p={id:uid('p'),modelId:null,groupId:null,name:data.name,baseName:data.name,kind:'ally',ac:Number(data.ac)||10,maxHp:Math.max(1,Number(data.hp)||1),hp:Math.max(1,Number(data.hp)||1),tempHp:0,initiative:Number(data.initiative)||0,conditions:[],reactionUsed:false,legendaryRemaining:0,currentPhaseId:null,abilityState:{}};
  mutate(()=>{state.encounter.participants.push(p);state.encounter.selectedId=p.id},`${p.name} rejoint le combat.`);
}

function addDynamicRow(type,data={}){
  const map={traits:'#traitsRows',actions:'#actionsRows',reactions:'#reactionsRows',legendaryActions:'#legendaryRows',phases:'#phasesRows'};const container=$(map[type]);if(!container)return;
  const tpl=$(type==='phases'?'#phaseRowTemplate':'#abilityRowTemplate');const node=tpl.content.firstElementChild.cloneNode(true);node.dataset.rowType=type;node.dataset.rowId=data.id||uid(type==='phases'?'phase':'ab');
  node.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;if(data[k]!=null)el.value=data[k]});container.appendChild(node);
}
function clearEditorRows(){['#traitsRows','#actionsRows','#reactionsRows','#legendaryRows','#phasesRows'].forEach(s=>$(s).innerHTML='')}
function openMonsterEditor(id=null){
  const f=$('#monsterForm');f.reset();clearEditorRows();let m=id?state.monsters.find(x=>x.id===id):null;$('#monsterEditorTitle').textContent=m?'Modifier l’adversaire':'Nouvel adversaire';$('#btnDeleteMonster').classList.toggle('hidden',!m);
  if(m){Object.entries({name:m.name,type:m.type,size:m.size,cr:m.cr,ac:m.ac,hp:m.hp,initiative:m.initiative,speed:m.speed,saves:m.saves,resistances:m.resistances,immunities:m.immunities,senses:m.senses,notes:m.notes,legendaryMax:m.legendaryMax,monsterId:m.id}).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??''});m.traits.forEach(x=>addDynamicRow('traits',x));m.actions.forEach(x=>addDynamicRow('actions',x));m.reactions.forEach(x=>addDynamicRow('reactions',x));m.legendaryActions.forEach(x=>addDynamicRow('legendaryActions',x));m.phases.forEach(x=>addDynamicRow('phases',x));}
  else{f.elements.monsterId.value='';addDynamicRow('actions',{name:'Attaque',kind:'attack',bonus:5,damage:'1d8+3',damageType:'tranchants'});}
  $('#monsterEditor').showModal();
}
function collectRows(sel,type){
  return $$(sel+' .dynamic-row').map(row=>{const o={id:row.dataset.rowId};row.querySelectorAll('[data-field]').forEach(el=>o[el.dataset.field]=el.type==='number'?numOrNull(el.value):el.value);if(type!=='phases')o.cost=Number(o.cost)||1;return o}).filter(o=>o.name);
}
function saveMonsterFromForm(){
  const f=$('#monsterForm');const id=f.elements.monsterId.value||uid('monster');const existing=state.monsters.find(x=>x.id===id);
  const m=normalizeMonster({id,name:f.elements.name.value,type:f.elements.type.value,size:f.elements.size.value,cr:f.elements.cr.value,ac:f.elements.ac.value,hp:f.elements.hp.value,initiative:f.elements.initiative.value,speed:f.elements.speed.value,saves:f.elements.saves.value,resistances:f.elements.resistances.value,immunities:f.elements.immunities.value,senses:f.elements.senses.value,notes:f.elements.notes.value,legendaryMax:f.elements.legendaryMax.value,
    traits:collectRows('#traitsRows','traits'),actions:collectRows('#actionsRows','actions'),reactions:collectRows('#reactionsRows','reactions'),legendaryActions:collectRows('#legendaryRows','legendaryActions'),phases:collectRows('#phasesRows','phases')});
  m.legendaryMax=m.legendaryActions.length?(Number(f.elements.legendaryMax.value)||3):0;
  mutate(()=>{const idx=state.monsters.findIndex(x=>x.id===id);if(idx>=0)state.monsters[idx]=m;else state.monsters.push(m)},`${m.name} ${existing?'modifié':'créé'} dans la bibliothèque.`);$('#monsterEditor').close();
}
function deleteMonster(id){
  const m=state.monsters.find(x=>x.id===id);if(!m)return;if(!confirm(`Supprimer « ${m.name} » de la bibliothèque ? Les instances déjà en combat deviendront des participants simples.`))return;
  mutate(()=>{state.monsters=state.monsters.filter(x=>x.id!==id);state.encounter.participants.filter(p=>p.modelId===id).forEach(p=>p.modelId=null)},`${m.name} supprimé de la bibliothèque.`);$('#monsterEditor').close();
}

function exportData(){
  const data={app:'ENCOUNTER',version:1,exportedAt:new Date().toISOString(),monsters:state.monsters,encounter:state.encounter};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`encounter-${state.encounter.name.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')||'combat'}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Export JSON créé.');
}
function importData(raw){
  const data=JSON.parse(raw);checkpoint();
  if(data.app==='ENCOUNTER'&&data.monsters){state.monsters=data.monsters.map(normalizeMonster);if(data.encounter)state.encounter=data.encounter;}
  else if(Array.isArray(data)) data.forEach(m=>state.monsters.push(normalizeMonster(m)));
  else if(data.name) state.monsters.push(normalizeMonster(data));
  else throw new Error('Format non reconnu');
  saveState();render();log('Import JSON effectué.');
}
function newEncounter(){
  if(state.encounter.participants.length&&!confirm('Créer une nouvelle rencontre ? La bibliothèque sera conservée.'))return;
  mutate(()=>{state.encounter={name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[]}},'Nouvelle rencontre créée.');
}
function resetAll(){
  if(!confirm('Réinitialiser toute l’application, bibliothèque comprise ?'))return;checkpoint();state=blankState();saveState();render();toast('Application réinitialisée.');
}

// Global event delegation
addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.dataset.addMonster)openAddMonster(t.dataset.addMonster);
  else if(t.dataset.editMonster)openMonsterEditor(t.dataset.editMonster);
  else if(t.dataset.select){state.encounter.selectedId=t.dataset.select;saveState();render()}
  else if(t.dataset.remove)removeParticipant(t.dataset.remove);
  else if(t.dataset.dmg){const [id,n]=t.dataset.dmg.split(':');damageParticipant(id,n)}
  else if(t.dataset.heal){const [id,n]=t.dataset.heal.split(':');healParticipant(id,n)}
  else if(t.dataset.applyDamage)damageParticipant(t.dataset.applyDamage,$('#damageAmount')?.value);
  else if(t.dataset.applyHeal)healParticipant(t.dataset.applyHeal,$('#damageAmount')?.value);
  else if(t.dataset.temp){const p=state.encounter.participants.find(x=>x.id===t.dataset.temp);const n=Number(prompt('PV temporaires :',p?.tempHp||0));if(p&&!Number.isNaN(n))mutate(()=>p.tempHp=Math.max(0,n),`${p.name} possède ${Math.max(0,n)} PV temporaires.`)}
  else if(t.dataset.sethp){const p=state.encounter.participants.find(x=>x.id===t.dataset.sethp);const n=Number(prompt('Fixer les PV actuels :',p?.hp||0));if(p&&!Number.isNaN(n))mutate(()=>{p.hp=Math.max(0,Math.min(p.maxHp,n));checkPhaseTransition(p)},`${p.name} est fixé à ${Math.max(0,Math.min(p.maxHp,n))} PV.`)}
  else if(t.dataset.condition){const [id,c]=t.dataset.condition.split('|');toggleCondition(id,c)}
  else if(t.dataset.useAbility){const [pid,aid,section,mode]=t.dataset.useAbility.split('|');useAbility(pid,aid,section,mode)}
  else if(t.dataset.recharge){const [pid,aid]=t.dataset.recharge.split('|');testRecharge(pid,aid)}
  else if(t.dataset.addRow)addDynamicRow(t.dataset.addRow);
  else if(t.classList.contains('remove-row'))t.closest('.dynamic-row')?.remove();
});

addEventListener('change',e=>{
  if(e.target.matches('[data-init]')){const p=state.encounter.participants.find(x=>x.id===e.target.dataset.init);if(p){checkpoint();p.initiative=Number(e.target.value)||0;state.encounter.currentTurn=0;saveState();render();}}
});

$('#monsterSearch').addEventListener('input',renderLibrary);
$('#encounterName').addEventListener('change',e=>{state.encounter.name=e.target.value.trim()||'Rencontre sans titre';saveState();render()});
$('#btnNextTurn').addEventListener('click',nextTurn);
$('#btnCreateMonster').addEventListener('click',()=>openMonsterEditor());
$('#btnAddPlayer').addEventListener('click',()=>{$('#addPlayerForm').reset();$('#addPlayerDialog').showModal()});
$('#btnSortInitiative').addEventListener('click',()=>{state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;saveState();render();toast('Initiative retriée.')});
$('#btnNewEncounter').addEventListener('click',newEncounter);
$('#btnReset').addEventListener('click',resetAll);
$('#btnExport').addEventListener('click',exportData);
$('#btnImport').addEventListener('click',()=>{$('#importText').value='';$('#importDialog').showModal()});
$('#btnUndo').addEventListener('click',undo);
$('#btnClearLog').addEventListener('click',()=>mutate(()=>state.encounter.log=[],null));

$('#addMonsterForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;addMonsterToCombat(f.elements.monsterId.value,f.elements.count.value,f.elements.initiative.value,f.elements.sharedInitiative.checked);$('#addMonsterDialog').close()});
$('#addPlayerForm').addEventListener('submit',e=>{e.preventDefault();addPlayer(Object.fromEntries(new FormData(e.currentTarget)));$('#addPlayerDialog').close()});
$('#monsterForm').addEventListener('submit',e=>{e.preventDefault();saveMonsterFromForm()});
$('#btnDeleteMonster').addEventListener('click',()=>deleteMonster($('#monsterForm').elements.monsterId.value));
$('#importForm').addEventListener('submit',e=>{e.preventDefault();try{importData($('#importText').value);$('#importDialog').close();toast('Import réussi.')}catch(err){alert('Import impossible : '+err.message)}});

render();
