'use strict';

const STORAGE_KEY = 'encounter-console-v1'; // conserve la compatibilité V1
const CONDITIONS = ['Aveuglé','Charmé','Assourdi','Effrayé','Empoisonné','Entravé','Étourdi','Inconscient','Invisible','Paralysé','Pétrifié','À terre','Agrippé','Incapacité'];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const clone = o => JSON.parse(JSON.stringify(o));

const SAMPLE_MONSTERS = (window.ENCOUNTER_BUILTINS || []);

function numOrNull(v){ return v==='' || v==null ? null : Number(v); }
function normalizeAbility(a={}){
  return {id:a.id||uid('ab'),name:a.name||'Capacité',detail:a.detail||'',kind:a.kind||'text',bonus:numOrNull(a.bonus),damage:a.damage||'',damageType:a.damageType||'',dc:numOrNull(a.dc),save:a.save||'',cost:Number(a.cost)||1,recharge:a.recharge||''};
}
function normalizeResource(r={}){
  const max=Math.max(0,Number(r.max)||0),start=r.start==null?max:Math.max(0,Math.min(max,Number(r.start)||0));
  return {id:r.id||uid('res'),name:r.name||'Ressource',max,start,reset:r.reset||''};
}
function normalizeMonster(m){
  return {
    id:m.id||uid('monster'),category:['character','companion'].includes(m.category)?m.category:'enemy',source:m.source||'',subtitle:m.subtitle||'',name:m.name||'Adversaire',type:m.type||'',size:m.size||'',cr:String(m.cr??''),ac:Number(m.ac)||10,hp:Math.max(1,Number(m.hp)||1),initiative:Number(m.initiative)||0,speed:m.speed||'',saves:m.saves||'',resistances:m.resistances||'',vulnerabilities:m.vulnerabilities||'',immunities:m.immunities||'',senses:m.senses||'',
    traits:(m.traits||[]).map(normalizeAbility),actions:(m.actions||[]).map(normalizeAbility),reactions:(m.reactions||[]).map(normalizeAbility),legendaryActions:(m.legendaryActions||[]).map(normalizeAbility),legendaryMax:Number(m.legendaryMax)||((m.legendaryActions||[]).length?3:0),resources:(m.resources||[]).map(normalizeResource),
    phases:(m.phases||[]).map(p=>({id:p.id||uid('phase'),name:p.name||'Phase',threshold:Number(p.threshold)||0,ac:numOrNull(p.ac),note:p.note||''})).sort((a,b)=>b.threshold-a.threshold),notes:m.notes||''
  };
}
function normalizeParticipant(p){
  return {
    id:p.id||uid('p'),modelId:p.modelId||null,groupId:p.groupId||null,name:p.name||'Participant',baseName:p.baseName||p.name||'Participant',kind:p.kind||'enemy',ac:Number(p.ac)||10,maxHp:Math.max(1,Number(p.maxHp)||1),hp:Math.max(0,Number.isFinite(Number(p.hp))?Number(p.hp):1),tempHp:Math.max(0,Number(p.tempHp)||0),initiative:Number(p.initiative)||0,conditions:Array.isArray(p.conditions)?p.conditions:[],reactionUsed:!!p.reactionUsed,legendaryRemaining:Number(p.legendaryRemaining)||0,currentPhaseId:p.currentPhaseId||null,abilityState:p.abilityState||{},resourceState:p.resourceState||{},companionOf:p.companionOf||null
  };
}
function blankState(){
  return {version:2.2,ui:{mode:'prep',locked:false},encounter:{name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[]},monsters:clone(SAMPLE_MONSTERS).map(normalizeMonster)};
}
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return blankState();
    const s=JSON.parse(raw); s.version=2.2; s.ui=Object.assign({mode:'prep',locked:false},s.ui||{});
    if(!s.monsters?.length)s.monsters=clone(SAMPLE_MONSTERS);
    s.monsters=s.monsters.map(normalizeMonster);
    // Migration non destructive : ajoute les nouveaux profils intégrés sans écraser les profils déjà modifiés.
    const known=new Set(s.monsters.map(m=>m.id));
    SAMPLE_MONSTERS.map(normalizeMonster).forEach(m=>{if(!known.has(m.id))s.monsters.push(m);});
    if(!s.encounter)s.encounter=blankState().encounter;
    s.encounter=Object.assign(blankState().encounter,s.encounter);
    s.encounter.participants=(s.encounter.participants||[]).map(normalizeParticipant);
    s.encounter.log=s.encounter.log||[];
    return s;
  }catch(err){console.warn(err);return blankState();}
}
let state=loadState();
let undoStack=[];
const ui={detailTab:'actions',multiMode:false,multiSelection:new Set(),drawer:null,libraryFilter:'all'};

function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function checkpoint(){undoStack.push(JSON.stringify(state));if(undoStack.length>40)undoStack.shift();}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),1900);}
function log(msg){state.encounter.log.unshift({id:uid('log'),time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),text:msg});state.encounter.log=state.encounter.log.slice(0,160);}
function mutate(fn,msg){checkpoint();fn();if(msg)log(msg);saveState();render();}
function undo(){if(!undoStack.length)return toast('Rien à annuler.');state=JSON.parse(undoStack.pop());saveState();render();toast('Dernière action annulée.');}

function makeParticipant(monster,n=1,initiative=10,groupId=null,companionOf=null){
  const m=normalizeMonster(monster),abilityState={},resourceState={};[...m.actions,...m.reactions,...m.legendaryActions].forEach(a=>abilityState[a.id]={ready:true});
  m.resources.forEach(r=>resourceState[r.id]=r.start);
  return {id:uid('p'),modelId:m.id,groupId,name:groupId?`${m.name} ${n}`:m.name,baseName:m.name,kind:m.category==='enemy'?'enemy':'ally',ac:m.ac,maxHp:m.hp,hp:m.hp,tempHp:0,initiative:Number(initiative)||0,conditions:[],reactionUsed:false,legendaryRemaining:m.legendaryMax,currentPhaseId:null,abilityState,resourceState,companionOf};
}
function sortedParticipants(){const all=state.encounter.participants,tieKey=p=>{if(p.companionOf){const parent=all.find(x=>x.id===p.companionOf);if(parent)return `${parent.name}\u0001${p.name}`;}return `${p.name}\u0000`;};return [...all].sort((a,b)=>b.initiative-a.initiative||tieKey(a).localeCompare(tieKey(b),'fr'));}
function activeParticipant(){const list=sortedParticipants();if(!list.length)return null;state.encounter.currentTurn=Math.max(0,Math.min(state.encounter.currentTurn,list.length-1));return list[state.encounter.currentTurn];}
function selectedParticipant(){return state.encounter.participants.find(p=>p.id===state.encounter.selectedId)||activeParticipant();}
function modelFor(p){return p?.modelId?state.monsters.find(m=>m.id===p.modelId):null;}
function currentPhase(p,m=modelFor(p)){if(!m?.phases?.length)return null;const crossed=m.phases.filter(ph=>p.hp<=ph.threshold).sort((a,b)=>a.threshold-b.threshold);return crossed[0]||null;}
function effectiveAc(p){return currentPhase(p)?.ac??p.ac;}
function checkPhaseTransition(p){const ph=currentPhase(p),newId=ph?.id||null;if(newId!==p.currentPhaseId){p.currentPhaseId=newId;if(ph)log(`⚠ ${p.name} entre dans « ${ph.name} » — ${ph.note||'changement de phase.'}`);}}
function isLocked(){return state.ui.mode==='combat'&&state.ui.locked;}
function structuralGuard(){if(isLocked()){toast('Combat verrouillé : déverrouille pour modifier la structure.');return true;}return false;}

function rollDie(s){return Math.floor(Math.random()*s)+1;}
function rollD20(mode='normal'){const a=rollDie(20),b=rollDie(20);if(mode==='adv')return{roll:Math.max(a,b),detail:`${a}/${b}`};if(mode==='dis')return{roll:Math.min(a,b),detail:`${a}/${b}`};return{roll:a,detail:String(a)};}
function rollExpression(expr){
  if(!expr)return{total:0,detail:'0'};const clean=String(expr).replace(/\s/g,'').replace(/−/g,'-'),parts=clean.match(/[+-]?[^+-]+/g)||[];let total=0;const details=[];
  for(const raw of parts){let sign=1,part=raw;if(part[0]==='+')part=part.slice(1);else if(part[0]==='-'){sign=-1;part=part.slice(1)}const dm=part.match(/^(\d*)d(\d+)$/i);if(dm){const n=Number(dm[1]||1),s=Number(dm[2]),rolls=Array.from({length:n},()=>rollDie(s));total+=rolls.reduce((x,y)=>x+y,0)*sign;details.push(`${sign<0?'-':''}${rolls.join('+')}`);}else if(!Number.isNaN(Number(part))){total+=Number(part)*sign;details.push(`${sign<0?'-':''}${part}`);}else details.push(part);}
  return{total,detail:details.join(' + ').replace(/\+ -/g,'- ')};
}

function setMode(mode){
  if(mode==='prep')state.ui.locked=false;state.ui.mode=mode;ui.multiMode=false;ui.multiSelection.clear();
  if(mode==='combat'){const a=activeParticipant();if(a)state.encounter.selectedId=a.id;}
  saveState();render();
}
function openDrawer(name){ui.drawer=name;renderDrawers();}
function closeDrawers(){ui.drawer=null;renderDrawers();}
function renderDrawers(){
  const lib=$('#libraryDrawer'),jr=$('#journalDrawer'),scrim=$('#drawerScrim');
  lib.classList.toggle('open',ui.drawer==='library');jr.classList.toggle('open',ui.drawer==='journal');scrim.classList.toggle('open',!!ui.drawer);
  lib.setAttribute('aria-hidden',ui.drawer==='library'?'false':'true');jr.setAttribute('aria-hidden',ui.drawer==='journal'?'false':'true');
}

function render(){
  $('#encounterName').value=state.encounter.name;$('#roundNumber').textContent=state.encounter.round;
  document.body.classList.toggle('combat-mode',state.ui.mode==='combat');
  $('#prepView').classList.toggle('hidden',state.ui.mode!=='prep');$('#combatView').classList.toggle('hidden',state.ui.mode!=='combat');$('#quickBar').classList.toggle('hidden',state.ui.mode!=='combat');
  $('#btnModePrep').classList.toggle('active',state.ui.mode==='prep');$('#btnModeCombat').classList.toggle('active',state.ui.mode==='combat');
  $('#btnCombatLock').textContent=state.ui.locked?'🔒':'🔓';$('#btnCombatLock').classList.toggle('locked',state.ui.locked);$('#btnCombatLock').disabled=state.ui.mode!=='combat';
  renderInitiative();renderLibrary();renderPrep();renderCombat();renderDetail();renderLog();renderQuickbar();renderDrawers();renderMultiState();
  requestAnimationFrame(()=>document.querySelector('.init-chip.active')?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}));
}
function renderInitiative(){
  const list=sortedParticipants(),active=activeParticipant();
  $('#initiativeRibbon').innerHTML=list.length?list.map(p=>`<button class="init-chip ${p.id===active?.id?'active':''} ${p.hp<=0?'dead':''}" data-select="${p.id}"><span>${esc(p.name)}</span><b>${p.initiative}</b></button>`).join(''):'<span class="muted">Aucune initiative</span>';
  if(!list.length){$('#nextTurnHint').textContent='Aucun participant';return;}
  const idx=Math.min(state.encounter.currentTurn,list.length-1),next=list[(idx+1)%list.length];$('#nextTurnHint').textContent=`Suivant : ${next.name} · ${next.initiative}`;
}
function renderLibrary(){
  const q=$('#monsterSearch').value.trim().toLowerCase(),locked=isLocked();
  const ms=state.monsters.filter(m=>{
    const matchesFilter=ui.libraryFilter==='all'||m.category===ui.libraryFilter;
    return matchesFilter&&`${m.name} ${m.type} ${m.cr} ${m.source} ${m.subtitle}`.toLowerCase().includes(q);
  });
  $('#monsterLibrary').innerHTML=ms.map(m=>{const isChar=m.category==='character',isComp=m.category==='companion',cardClass=isChar?'character-card':isComp?'companion-card':'',badgeClass=isChar?'character-badge':isComp?'companion-badge':'',badge=isChar?'PJ':isComp?'COMP.':`FP ${esc(m.cr||'—')}`;return `<article class="library-card ${cardClass}"><div class="library-title"><h3>${esc(m.name)}</h3><span class="cr-badge ${badgeClass}">${badge}</span></div><div class="library-meta">${esc(m.subtitle||[m.size,m.type].filter(Boolean).join(' · '))} · CA ${m.ac} · ${m.hp} PV</div>${m.source?`<div class="source-badge">${esc(m.source)}</div>`:''}<div class="library-actions"><button class="primary small" data-add-monster="${m.id}" ${locked?'disabled':''}>+ Ajouter</button><button class="ghost small" data-edit-monster="${m.id}" ${locked?'disabled':''}>Modifier</button></div></article>`;}).join('')||'<p class="muted">Aucun résultat.</p>';
  $('#btnCreateMonster').disabled=locked;
  $$('[data-library-filter]').forEach(b=>b.classList.toggle('active',b.dataset.libraryFilter===ui.libraryFilter));
}
function renderPrep(){
  const list=sortedParticipants();$('#prepCount').textContent=list.length;
  $('#prepParticipants').innerHTML=list.length?list.map(p=>{
    const pct=Math.max(0,Math.min(100,p.hp/p.maxHp*100));
    return `<article class="prep-row ${p.id===state.encounter.selectedId?'selected':''}" data-select="${p.id}"><div><strong>${esc(p.name)}</strong><small>${modelFor(p)?.category==='character'?esc(modelFor(p)?.subtitle||'Personnage'):modelFor(p)?.category==='companion'?esc(modelFor(p)?.subtitle||'Compagnon'):p.kind==='enemy'?esc(modelFor(p)?.type||'Adversaire'):'PJ / PNJ'} · CA ${effectiveAc(p)} · ${p.hp}/${p.maxHp} PV</small></div><label>INI <input data-init="${p.id}" type="number" value="${p.initiative}"></label><div class="mini-hp"><i style="width:${pct}%"></i></div><button class="danger ghost small" data-remove="${p.id}">Retirer</button></article>`;
  }).join(''):'<div class="empty-prep">Aucun participant. Ouvre la bibliothèque pour ajouter tes adversaires.</div>';
  const p=selectedParticipant();if(!p){$('#prepPreview').innerHTML='<div class="empty-detail"><div class="empty-crest">✦</div><p>Sélectionne un participant.</p></div>';return;}
  const m=modelFor(p);$('#prepPreview').innerHTML=`<div class="preview-head"><div><span class="eyebrow">${m?.category==='character'?'PERSONNAGE':m?.category==='companion'?'COMPAGNON':p.kind==='enemy'?'ADVERSAIRE':'PARTICIPANT'}</span><h2>${esc(p.name)}</h2><p>${m?esc(m.category==='character'||m.category==='companion'?(m.subtitle||m.type):[m.size,m.type,`FP ${m.cr||'—'}`].filter(Boolean).join(' · ')):'PJ / PNJ'}</p></div>${m?`<button class="ghost small" data-edit-monster="${m.id}">✎ Modifier</button>`:''}</div><div class="stat-grid"><div class="statbox"><span>CA</span><b>${effectiveAc(p)}</b></div><div class="statbox"><span>PV</span><b>${p.hp}/${p.maxHp}</b></div><div class="statbox"><span>INI</span><b>${p.initiative}</b></div><div class="statbox"><span>VIT</span><b>${esc(m?.speed||'—')}</b></div></div>${m?`<div class="preview-summary"><b>${m.actions.length}</b> action(s) · <b>${m.reactions.length}</b> réaction(s) · <b>${m.legendaryActions.length}</b> légendaire(s)</div><p class="detail-notes">${esc(m.notes||'')}</p>`:'<p class="detail-notes">Suivi simple des PV, CA et initiative.</p>'}`;
}
function groupedEntries(){
  const list=sortedParticipants(),seen=new Set(),entries=[];
  for(const p of list){if(p.groupId){if(seen.has(p.groupId))continue;seen.add(p.groupId);entries.push({type:'group',id:p.groupId,members:list.filter(x=>x.groupId===p.groupId)});}else entries.push({type:'single',id:p.id,members:[p]});}
  return entries;
}
function renderCombat(){
  const entries=groupedEntries(),active=activeParticipant();
  $('#combatList').innerHTML=entries.length?entries.map(entry=>entry.type==='group'?renderGroupCard(entry.members,active):renderSingleCard(entry.members[0],active)).join(''):'<div class="empty-combat">Aucun participant.</div>';
}
function hpClass(p){const pct=p.hp/p.maxHp*100;return pct>60?'healthy':pct>30?'mid':'low';}
function renderSingleCard(p,active){
  const selected=p.id===state.encounter.selectedId,multiSelected=ui.multiSelection.has(p.id),phase=currentPhase(p),pct=Math.max(0,Math.min(100,p.hp/p.maxHp*100));
  return `<article class="combat-card ${p.id===active?.id?'active':''} ${selected?'selected':''} ${p.hp<=0?'dead':''}">
    <button class="select-hit" ${ui.multiMode?`data-multi="${p.id}"`:`data-select="${p.id}"`} aria-label="Sélectionner ${esc(p.name)}"></button>
    <div class="combat-card-main">${ui.multiMode?`<span class="multi-check ${multiSelected?'on':''}">${multiSelected?'✓':''}</span>`:'<span class="turn-dot"></span>'}<div class="combat-ident"><strong>${esc(p.name)}</strong><small>${modelFor(p)?.category==='character'?esc(modelFor(p)?.subtitle||'Personnage'):modelFor(p)?.category==='companion'?esc(modelFor(p)?.subtitle||'Compagnon'):p.kind==='enemy'?esc(modelFor(p)?.type||'Adversaire'):'PJ / PNJ'} · CA ${effectiveAc(p)}</small></div><span class="ini-badge">${p.initiative}</span></div>
    <div class="hp-line"><div class="hpbar"><div class="hpfill ${hpClass(p)}" style="width:${pct}%"></div></div><div class="hptext">${p.hp}${p.tempHp?` +${p.tempHp}`:''}/${p.maxHp}</div></div>
    <div class="condition-pills">${p.hp<=0?'<span class="pill dead-pill">0 PV</span>':''}${phase?`<span class="pill phase-pill">${esc(phase.name)}</span>`:''}${p.conditions.slice(0,3).map(c=>`<span class="pill">${esc(c)}</span>`).join('')}${p.conditions.length>3?`<span class="pill">+${p.conditions.length-3}</span>`:''}</div>
  </article>`;
}
function renderGroupCard(members,active){
  const first=members[0],activeInside=members.some(p=>p.id===active?.id),alive=members.filter(p=>p.hp>0).length,ini=first.initiative;
  const allSelected=members.every(p=>ui.multiSelection.has(p.id));
  const sharedInitiative=new Set(members.map(p=>p.initiative)).size===1;
  return `<article class="group-card ${activeInside?'active':''}"><div class="group-head"><button class="group-title" ${ui.multiMode?`data-multi-group="${first.groupId}"`:`data-select="${activeInside?active.id:first.id}"`}><span class="group-icon">${ui.multiMode?(allSelected?'☑':'☐'):'▾'}</span><span><strong>${esc(first.baseName)}</strong><small>${alive}/${members.length} actifs · ${sharedInitiative?'initiative commune':'initiatives individuelles'}</small></span></button><span class="ini-badge">${sharedInitiative?ini:'×'}</span></div><div class="group-members">${members.map((p,i)=>{
    const sel=ui.multiSelection.has(p.id),pct=Math.max(0,Math.min(100,p.hp/p.maxHp*100));return `<button class="member-chip ${p.id===active?.id?'active':''} ${p.id===state.encounter.selectedId?'selected':''} ${p.hp<=0?'dead':''} ${sel?'multi-selected':''}" ${ui.multiMode?`data-multi="${p.id}"`:`data-select="${p.id}"`}><span>${i+1}${sharedInitiative?'':` · I${p.initiative}`}</span><b>${p.hp<=0?'☠':`${p.hp}/${p.maxHp}`}</b><i><em style="width:${pct}%"></em></i></button>`;
  }).join('')}</div></article>`;
}
function renderDetail(){
  const p=selectedParticipant(),root=$('#activeDetail');
  if(!p){root.className='active-detail empty-detail';root.innerHTML='<div class="empty-crest">✦</div><h2>Aucune créature sélectionnée</h2><p>Ajoute un adversaire ou un PJ/PNJ.</p>';return;}
  const m=modelFor(p),phase=currentPhase(p,m);root.className='active-detail';
  root.innerHTML=`${phase?`<div class="boss-alert"><strong>⚠ ${esc(phase.name)}</strong><span>${esc(phase.note||'')}</span></div>`:''}<div class="detail-header"><div><span class="eyebrow">${m?.category==='character'?'PERSONNAGE ACTIF':m?.category==='companion'?'COMPAGNON ACTIF':'CRÉATURE ACTIVE'}</span><h2>${esc(p.name)}</h2><div class="detail-meta">${m?esc(m.category==='character'||m.category==='companion'?(m.subtitle||m.type):[m.size,m.type,`FP ${m.cr||'—'}`].filter(Boolean).join(' · ')):'Participant manuel'}</div></div><div class="header-resources">${m?.legendaryMax?`<span class="resource-chip">★ ${p.legendaryRemaining}/${m.legendaryMax}</span>`:''}${m?.reactions?.length?`<span class="resource-chip ${p.reactionUsed?'spent':''}">↯ ${p.reactionUsed?'Utilisée':'Prête'}</span>`:''}</div></div>
    <div class="stat-grid"><div class="statbox"><span>CA</span><b>${effectiveAc(p)}</b></div><div class="statbox hp-stat"><span>PV</span><b>${p.hp}/${p.maxHp}</b></div><div class="statbox"><span>INI</span><b>${p.initiative}</b></div><div class="statbox"><span>VIT</span><b>${esc(m?.speed||'—')}</b></div></div>
    <nav class="detail-tabs"><button class="${ui.detailTab==='actions'?'active':''}" data-detail-tab="actions">⚔ Actions</button><button class="${ui.detailTab==='state'?'active':''}" data-detail-tab="state">◈ État</button><button class="${ui.detailTab==='sheet'?'active':''}" data-detail-tab="sheet">☰ Fiche</button></nav>
    <div class="detail-tab-body">${ui.detailTab==='actions'?renderActionsTab(p,m):ui.detailTab==='state'?renderStateTab(p,m):renderSheetTab(p,m)}</div>`;
}
function renderActionsTab(p,m){
  if(!m)return'<div class="empty-tab">Participant manuel : aucune action enregistrée.</div>';
  const blocks=[];
  if(m.actions.length)blocks.push(`<section class="detail-section"><h3>Actions</h3>${m.actions.map(a=>abilityCard(p,a,'action')).join('')}</section>`);
  if(m.reactions.length)blocks.push(`<section class="detail-section"><h3>Réactions · ${p.reactionUsed?'UTILISÉE':'PRÊTE'}</h3>${m.reactions.map(a=>abilityCard(p,a,'reaction')).join('')}</section>`);
  if(m.legendaryActions.length)blocks.push(`<section class="detail-section"><div class="section-title-row"><h3>Actions légendaires</h3><span class="legendary-meter">${Array.from({length:m.legendaryMax},(_,i)=>`<b class="${i<p.legendaryRemaining?'':'off'}">★</b>`).join('')}</span></div>${m.legendaryActions.map(a=>abilityCard(p,a,'legendary')).join('')}</section>`);
  return blocks.join('')||'<div class="empty-tab">Aucune action enregistrée.</div>';
}
function renderStateTab(p,m){
  const resources=m?.resources?.length?`<section class="detail-section"><h3>Ressources</h3><div class="resource-list">${m.resources.map(r=>{const cur=Number.isFinite(Number(p.resourceState?.[r.id]))?Number(p.resourceState[r.id]):r.start;return `<div class="resource-counter"><div><b>${esc(r.name)}</b><small>${esc(r.reset||'')}</small></div><div class="resource-stepper"><button data-resource="${p.id}|${r.id}|-1">−</button><strong>${cur}/${r.max}</strong><button data-resource="${p.id}|${r.id}|1">+</button></div></div>`;}).join('')}</div></section>`:'';
  const bossResources=m?.legendaryMax?`<section class="detail-section"><h3>Boss</h3><div class="resource-row"><span>Actions légendaires</span><strong>${p.legendaryRemaining}/${m.legendaryMax}</strong></div><div class="resource-row"><span>Réaction</span><strong>${p.reactionUsed?'Utilisée':'Disponible'}</strong></div></section>`:'';
  return `<section class="state-summary"><div class="state-hp"><span>Points de vie</span><strong>${p.hp}${p.tempHp?` + ${p.tempHp} temporaires`:''} / ${p.maxHp}</strong><div class="hpbar large"><div class="hpfill ${hpClass(p)}" style="width:${Math.max(0,Math.min(100,p.hp/p.maxHp*100))}%"></div></div></div><div class="state-controls"><button data-temp="${p.id}">PV temporaires</button><button data-sethp="${p.id}">Fixer les PV</button></div></section>${resources}<section class="detail-section"><h3>États</h3><div class="condition-grid">${CONDITIONS.map(c=>`<button class="condition-btn ${p.conditions.includes(c)?'active':''}" data-condition="${p.id}|${esc(c)}">${esc(c)}</button>`).join('')}</div></section>${bossResources}`;
}
function renderSheetTab(p,m){
  if(!m)return'<div class="empty-tab">Participant manuel : CA, PV et initiative uniquement.</div>';
  const defenses=[m.saves&&`<b>JS :</b> ${esc(m.saves)}`,m.vulnerabilities&&`<b>Vulnérabilités :</b> ${esc(m.vulnerabilities)}`,m.resistances&&`<b>Résistances :</b> ${esc(m.resistances)}`,m.immunities&&`<b>Immunités :</b> ${esc(m.immunities)}`,m.senses&&`<b>Sens & langues :</b> ${esc(m.senses)}`].filter(Boolean).join('<br>');
  return `${defenses?`<section class="detail-section"><h3>Défenses & sens</h3><p class="detail-notes">${defenses}</p></section>`:''}${m.traits.length?`<section class="detail-section"><h3>Traits</h3>${m.traits.map(a=>`<div class="trait-card"><b>${esc(a.name)}</b><p>${esc(a.detail)}</p></div>`).join('')}</section>`:''}${m.source?`<section class="detail-section"><h3>Source</h3><p class="detail-notes">${esc(m.source)}</p></section>`:''}${m.notes?`<section class="detail-section"><h3>Notes MJ</h3><p class="detail-notes">${esc(m.notes)}</p></section>`:''}${!isLocked()?`<section class="detail-section"><button class="ghost" data-edit-monster="${m.id}">✎ Modifier la fiche</button></section>`:''}`;
}
function abilityCard(p,a,section){
  const st=p.abilityState?.[a.id]||{ready:true},unavailable=(a.kind==='recharge'&&!st.ready)||(section==='reaction'&&p.reactionUsed)||(section==='legendary'&&p.legendaryRemaining<(a.cost||1));
  const tags=[];if(a.bonus!=null)tags.push(`+${a.bonus}`);if(a.dc!=null)tags.push(`${a.save||'JS'} DD ${a.dc}`);if(a.damage)tags.push(`${a.kind==='heal'?'Soins ':''}${a.damage}${a.damageType?` ${a.damageType}`:''}`);if(a.kind==='recharge')tags.push(`Recharge ${a.recharge||'5-6'}`);if(section==='legendary')tags.push(`${a.cost||1} ★`);
  return `<article class="ability-card ${unavailable?'unavailable':''}"><div class="ability-head"><div><b>${esc(a.name)}</b><small>${esc(tags.join(' · '))}</small></div>${a.kind==='recharge'&&!st.ready?'<span class="status-badge">À recharger</span>':''}</div>${a.detail?`<p>${esc(a.detail)}</p>`:''}<div class="ability-buttons">${a.kind==='recharge'&&!st.ready?`<button class="primary" data-recharge="${p.id}|${a.id}">🎲 Recharge</button>`:`<button class="primary" ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|normal">${a.kind==='attack'?'Attaquer':a.kind==='heal'?'Soigner':'Utiliser'}</button>`}${a.kind==='attack'?`<button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|adv">Avantage</button><button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|dis">Désav.</button>`:''}</div></article>`;
}
function renderLog(){$('#combatLog').innerHTML=state.encounter.log.length?state.encounter.log.map(x=>`<div class="log-entry"><span>${esc(x.time)}</span><p>${esc(x.text)}</p></div>`).join(''):'<div class="empty-log">Le journal est vide.</div>';}
function renderMultiState(){
  $('#btnMultiMode').classList.toggle('active',ui.multiMode);$('#multiCount').classList.toggle('hidden',!ui.multiMode);$('#multiCount').textContent=ui.multiSelection.size;document.body.classList.toggle('multi-mode',ui.multiMode);
}
function currentTargetIds(){
  // En mode multi-cibles, aucune sélection = aucune cible : évite d'appliquer des dégâts par erreur à la créature active.
  if(ui.multiMode)return [...ui.multiSelection].filter(id=>state.encounter.participants.some(p=>p.id===id));
  const p=selectedParticipant();return p?[p.id]:[];
}
function renderQuickbar(){
  const ids=currentTargetIds(),targets=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(Boolean);
  if(!targets.length){$('#quickTargetName').textContent='—';$('#quickTargetMeta').textContent='Aucune cible';return;}
  $('#quickTargetName').textContent=targets.length===1?targets[0].name:`${targets.length} cibles`;
  $('#quickTargetMeta').textContent=targets.length===1?`${targets[0].hp}/${targets[0].maxHp} PV · CA ${effectiveAc(targets[0])}`:targets.map(p=>p.name).slice(0,3).join(', ')+(targets.length>3?'…':'');
}

function applyDamageMany(ids,amount){
  amount=Math.max(0,Number(amount)||0);if(!amount||!ids.length)return;
  mutate(()=>{ids.forEach(id=>{const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;let left=amount;if(p.tempHp>0){const used=Math.min(p.tempHp,left);p.tempHp-=used;left-=used;}p.hp=Math.max(0,p.hp-left);checkPhaseTransition(p);});if(ids.length===1)state.encounter.selectedId=ids[0];},ids.length===1?`${state.encounter.participants.find(p=>p.id===ids[0])?.name||'Cible'} subit ${amount} dégâts.`:`${amount} dégâts appliqués à ${ids.length} cibles.`);
}
function applyHealMany(ids,amount){
  amount=Math.max(0,Number(amount)||0);if(!amount||!ids.length)return;
  mutate(()=>{ids.forEach(id=>{const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;p.hp=Math.min(p.maxHp,p.hp+amount);checkPhaseTransition(p);});if(ids.length===1)state.encounter.selectedId=ids[0];},ids.length===1?`${state.encounter.participants.find(p=>p.id===ids[0])?.name||'Cible'} récupère ${amount} PV.`:`${amount} PV rendus à ${ids.length} cibles.`);
}
function removeParticipant(id){if(structuralGuard())return;const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;mutate(()=>{state.encounter.participants=state.encounter.participants.filter(x=>x.id!==id);ui.multiSelection.delete(id);if(state.encounter.selectedId===id)state.encounter.selectedId=null;state.encounter.currentTurn=Math.min(state.encounter.currentTurn,Math.max(0,sortedParticipants().length-1));},`${p.name} est retiré du combat.`);}
function nextTurn(){
  const list=sortedParticipants();if(!list.length)return toast('Aucun participant.');checkpoint();let idx=state.encounter.currentTurn+1;if(idx>=list.length){idx=0;state.encounter.round++;}state.encounter.currentTurn=idx;const p=sortedParticipants()[idx];state.encounter.selectedId=p.id;p.reactionUsed=false;const m=modelFor(p);if(m?.legendaryMax)p.legendaryRemaining=m.legendaryMax;ui.detailTab='actions';log(`▶ Tour de ${p.name} — round ${state.encounter.round}.`);saveState();render();
}
function useAbility(pid,aid,section,mode='normal'){
  const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;const a=[...m.traits,...m.actions,...m.reactions,...m.legendaryActions].find(x=>x.id===aid);if(!a)return;const st=p.abilityState[aid]||(p.abilityState[aid]={ready:true});
  if(a.kind==='recharge'&&!st.ready)return toast('Cette capacité doit d’abord se recharger.');if(section==='reaction'&&p.reactionUsed)return toast('Réaction déjà utilisée.');if(section==='legendary'&&p.legendaryRemaining<(a.cost||1))return toast('Pas assez d’actions légendaires.');
  checkpoint();let text=`${p.name} — ${a.name}`;
  if(a.kind==='attack'){
    const r=rollD20(mode),bonus=Number(a.bonus)||0,total=r.roll+bonus,dmg=rollExpression(a.damage);text+=` : d20 ${r.detail}${mode==='adv'?' (avantage)':mode==='dis'?' (désavantage)':''} + ${bonus} = ${total}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;
  }else if(a.kind==='heal'){
    const heal=rollExpression(a.damage);text+=` : soins ${heal.total} PV [${heal.detail}]`;
  }else if(a.kind==='recharge'&&a.bonus!=null){
    const r=rollD20(mode),bonus=Number(a.bonus)||0,total=r.roll+bonus,dmg=rollExpression(a.damage);text+=` : d20 ${r.detail} + ${bonus} = ${total}`;if(a.dc)text+=` · ${a.save||'JS'} DD ${a.dc}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;
  }else if(a.kind==='save'||a.kind==='recharge'){
    const dmg=rollExpression(a.damage);if(a.dc)text+=` : ${a.save||'JS'} DD ${a.dc}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;else if(!a.dc&&a.detail)text+=` : ${a.detail}`;
  }else text+=a.detail?` : ${a.detail}`:'';
  if(a.kind==='recharge')st.ready=false;if(section==='reaction')p.reactionUsed=true;if(section==='legendary')p.legendaryRemaining-=a.cost||1;log(text);saveState();render();toast(`${a.name} utilisé.`);
}
function testRecharge(pid,aid){const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;const a=[...m.actions,...m.reactions,...m.legendaryActions].find(x=>x.id===aid);if(!a)return;const roll=rollDie(6),nums=((a.recharge||'5-6').match(/\d/g)||[]).map(Number),min=nums.length?Math.min(...nums):5,ok=roll>=min;mutate(()=>{p.abilityState[aid]=(p.abilityState[aid]||{});p.abilityState[aid].ready=ok;},`${p.name} teste la recharge de ${a.name} : d6 = ${roll} → ${ok?'rechargée':'indisponible'}.`);}
function toggleCondition(pid,c){const p=state.encounter.participants.find(x=>x.id===pid);if(!p)return;const adding=!p.conditions.includes(c);mutate(()=>{p.conditions=adding?[...p.conditions,c]:p.conditions.filter(x=>x!==c);state.encounter.selectedId=p.id;},`${p.name} : ${adding?'ajoute':'retire'} l’état ${c}.`);}
function toggleConditionMany(ids,c){if(!ids.length)return;const ps=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(Boolean),allHave=ps.every(p=>p.conditions.includes(c));mutate(()=>ps.forEach(p=>p.conditions=allHave?p.conditions.filter(x=>x!==c):[...new Set([...p.conditions,c])]),`${allHave?'Retrait':'Ajout'} de l’état ${c} sur ${ps.length} cible${ps.length>1?'s':''}.`);}

function adjustResource(pid,rid,delta){
  const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p),r=m?.resources?.find(x=>x.id===rid);if(!p||!r)return;
  const current=Number.isFinite(Number(p.resourceState?.[rid]))?Number(p.resourceState[rid]):r.start;
  const next=Math.max(0,Math.min(r.max,current+Number(delta)));
  mutate(()=>{p.resourceState=p.resourceState||{};p.resourceState[rid]=next;},`${p.name} — ${r.name} : ${next}/${r.max}.`);
}

function openAddMonster(id){if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;$('#addMonsterName').textContent=m.name;const f=$('#addMonsterForm');f.reset();f.elements.monsterId.value=id;f.elements.initiative.value=m.initiative||10;f.elements.count.value=1;const single=m.category!=='enemy';f.elements.count.max=single?1:50;f.elements.count.disabled=single;f.elements.sharedInitiative.checked=true;f.elements.sharedInitiative.closest('label').classList.toggle('hidden',single);const comp=$('#companionOption');if(comp){const show=id==='pj-silas-veyr';comp.classList.toggle('hidden',!show);f.elements.includeCompanion.checked=show;}$('#addMonsterDialog').showModal();}
function addMonsterToCombat(id,count,initiative,shared,includeCompanion=false){if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;count=m.category==='enemy'?Math.max(1,Math.min(50,Number(count)||1)):1;const groupId=count>1?uid('group'):null,wantsCompanion=id==='pj-silas-veyr'&&includeCompanion&&state.monsters.some(x=>x.id==='comp-crasseuse');mutate(()=>{let main=null;for(let i=1;i<=count;i++){const ini=shared?Number(initiative)||0:(Number(initiative)||0)+rollDie(6)-3;const p=makeParticipant(m,count>1?i:1,ini,groupId);state.encounter.participants.push(p);if(i===1)main=p;}if(wantsCompanion&&main){const cm=state.monsters.find(x=>x.id==='comp-crasseuse');state.encounter.participants.push(makeParticipant(cm,1,main.initiative,null,main.id));}state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;},`${count} × ${m.name} ajouté${count>1?'s':''} au combat${wantsCompanion?' avec C.R.A.S.S.E.U.S.E.':''}.`);closeDrawers();}
function addPlayer(data){if(structuralGuard())return;const p={id:uid('p'),modelId:null,groupId:null,name:data.name,baseName:data.name,kind:'ally',ac:Number(data.ac)||10,maxHp:Math.max(1,Number(data.hp)||1),hp:Math.max(1,Number(data.hp)||1),tempHp:0,initiative:Number(data.initiative)||0,conditions:[],reactionUsed:false,legendaryRemaining:0,currentPhaseId:null,abilityState:{}};mutate(()=>{state.encounter.participants.push(p);state.encounter.selectedId=p.id;},`${p.name} rejoint le combat.`);}

function addDynamicRow(type,data={}){const map={traits:'#traitsRows',actions:'#actionsRows',reactions:'#reactionsRows',legendaryActions:'#legendaryRows',phases:'#phasesRows',resources:'#resourcesRows'},container=$(map[type]);if(!container)return;const tpl=$(type==='phases'?'#phaseRowTemplate':type==='resources'?'#resourceRowTemplate':'#abilityRowTemplate'),node=tpl.content.firstElementChild.cloneNode(true);node.dataset.rowType=type;node.dataset.rowId=data.id||uid(type==='phases'?'phase':type==='resources'?'res':'ab');node.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;if(data[k]!=null)el.value=data[k];});container.appendChild(node);}
function clearEditorRows(){['#traitsRows','#actionsRows','#reactionsRows','#legendaryRows','#phasesRows','#resourcesRows'].forEach(s=>$(s).innerHTML='');}
function openMonsterEditor(id=null){if(structuralGuard())return;const f=$('#monsterForm');f.reset();clearEditorRows();const m=id?state.monsters.find(x=>x.id===id):null;$('#monsterEditorTitle').textContent=m?'Modifier la fiche':'Nouvelle fiche';$('#btnDeleteMonster').classList.toggle('hidden',!m);if(m){Object.entries({category:m.category,source:m.source,subtitle:m.subtitle,name:m.name,type:m.type,size:m.size,cr:m.cr,ac:m.ac,hp:m.hp,initiative:m.initiative,speed:m.speed,saves:m.saves,vulnerabilities:m.vulnerabilities,resistances:m.resistances,immunities:m.immunities,senses:m.senses,notes:m.notes,legendaryMax:m.legendaryMax,monsterId:m.id}).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??'';});m.traits.forEach(x=>addDynamicRow('traits',x));m.actions.forEach(x=>addDynamicRow('actions',x));m.reactions.forEach(x=>addDynamicRow('reactions',x));m.legendaryActions.forEach(x=>addDynamicRow('legendaryActions',x));m.phases.forEach(x=>addDynamicRow('phases',x));m.resources.forEach(x=>addDynamicRow('resources',x));}else{f.elements.monsterId.value='';f.elements.category.value='enemy';addDynamicRow('actions',{name:'Attaque',kind:'attack',bonus:5,damage:'1d8+3',damageType:'tranchants'});}$('#monsterEditor').showModal();}
function collectRows(sel,type){return $$(sel+' .dynamic-row').map(row=>{const o={id:row.dataset.rowId};row.querySelectorAll('[data-field]').forEach(el=>o[el.dataset.field]=el.type==='number'?numOrNull(el.value):el.value);if(type!=='phases'&&type!=='resources')o.cost=Number(o.cost)||1;if(type==='resources'){o.max=Math.max(0,Number(o.max)||0);o.start=o.start==null?o.max:Math.max(0,Math.min(o.max,Number(o.start)||0));}return o;}).filter(o=>o.name);}
function saveMonsterFromForm(){if(structuralGuard())return;const f=$('#monsterForm'),id=f.elements.monsterId.value||uid('monster'),existing=state.monsters.find(x=>x.id===id),m=normalizeMonster({id,category:f.elements.category.value,source:f.elements.source.value,subtitle:f.elements.subtitle.value,name:f.elements.name.value,type:f.elements.type.value,size:f.elements.size.value,cr:f.elements.cr.value,ac:f.elements.ac.value,hp:f.elements.hp.value,initiative:f.elements.initiative.value,speed:f.elements.speed.value,saves:f.elements.saves.value,vulnerabilities:f.elements.vulnerabilities.value,resistances:f.elements.resistances.value,immunities:f.elements.immunities.value,senses:f.elements.senses.value,notes:f.elements.notes.value,legendaryMax:f.elements.legendaryMax.value,traits:collectRows('#traitsRows','traits'),actions:collectRows('#actionsRows','actions'),reactions:collectRows('#reactionsRows','reactions'),legendaryActions:collectRows('#legendaryRows','legendaryActions'),phases:collectRows('#phasesRows','phases'),resources:collectRows('#resourcesRows','resources')});m.legendaryMax=m.legendaryActions.length?(Number(f.elements.legendaryMax.value)||3):0;mutate(()=>{const idx=state.monsters.findIndex(x=>x.id===id);if(idx>=0)state.monsters[idx]=m;else state.monsters.push(m);},`${m.name} ${existing?'modifié':'créé'} dans la bibliothèque.`);$('#monsterEditor').close();}
function deleteMonster(id){if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;if(!confirm(`Supprimer « ${m.name} » de la bibliothèque ?`))return;mutate(()=>{state.monsters=state.monsters.filter(x=>x.id!==id);state.encounter.participants.filter(p=>p.modelId===id).forEach(p=>p.modelId=null);},`${m.name} supprimé de la bibliothèque.`);$('#monsterEditor').close();}

function exportData(){const data={app:'ENCOUNTER',version:2.2,exportedAt:new Date().toISOString(),monsters:state.monsters,encounter:state.encounter};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`encounter-${state.encounter.name.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')||'combat'}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Export JSON créé.');}
function importData(raw){const data=JSON.parse(raw);checkpoint();if(data.app==='ENCOUNTER'&&data.monsters){state.monsters=data.monsters.map(normalizeMonster);if(data.encounter)state.encounter=Object.assign(blankState().encounter,data.encounter,{participants:(data.encounter.participants||[]).map(normalizeParticipant)});}else if(Array.isArray(data))data.forEach(m=>state.monsters.push(normalizeMonster(m)));else if(data.name)state.monsters.push(normalizeMonster(data));else throw new Error('Format non reconnu');const known=new Set(state.monsters.map(m=>m.id));SAMPLE_MONSTERS.map(normalizeMonster).forEach(m=>{if(!known.has(m.id))state.monsters.push(m);});saveState();render();log('Import JSON effectué.');}
function newEncounter(){if(state.encounter.participants.length&&!confirm('Créer une nouvelle rencontre ? La bibliothèque sera conservée.'))return;mutate(()=>{state.encounter={name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[]};ui.multiSelection.clear();ui.multiMode=false;},'Nouvelle rencontre créée.');}
function resetAll(){if(!confirm('Réinitialiser toute l’application, bibliothèque comprise ?'))return;checkpoint();state=blankState();ui.multiSelection.clear();saveState();render();toast('Application réinitialisée.');}
function renderConditionModal(){const ids=currentTargetIds(),ps=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(Boolean);$('#conditionTargetText').textContent=ps.length===1?ps[0].name:`${ps.length} cibles sélectionnées`;$('#conditionModalGrid').innerHTML=CONDITIONS.map(c=>{const all=ps.length&&ps.every(p=>p.conditions.includes(c));return`<button type="button" class="condition-btn ${all?'active':''}" data-modal-condition="${esc(c)}">${esc(c)}</button>`;}).join('');}
function openConditionDialog(){if(!currentTargetIds().length)return toast('Sélectionne une cible.');renderConditionModal();$('#conditionDialog').showModal();}

addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.dataset.closeDrawers!=null){closeDrawers();return;}
  if(t.dataset.addMonster)openAddMonster(t.dataset.addMonster);
  else if(t.dataset.editMonster)openMonsterEditor(t.dataset.editMonster);
  else if(t.dataset.select){state.encounter.selectedId=t.dataset.select;saveState();render();}
  else if(t.dataset.multi){const id=t.dataset.multi;ui.multiSelection.has(id)?ui.multiSelection.delete(id):ui.multiSelection.add(id);render();}
  else if(t.dataset.multiGroup){const members=state.encounter.participants.filter(p=>p.groupId===t.dataset.multiGroup),all=members.every(p=>ui.multiSelection.has(p.id));members.forEach(p=>all?ui.multiSelection.delete(p.id):ui.multiSelection.add(p.id));render();}
  else if(t.dataset.remove)removeParticipant(t.dataset.remove);
  else if(t.dataset.resource){const [pid,rid,delta]=t.dataset.resource.split('|');adjustResource(pid,rid,Number(delta));}
  else if(t.dataset.libraryFilter){ui.libraryFilter=t.dataset.libraryFilter;renderLibrary();}
  else if(t.dataset.quickDamage)applyDamageMany(currentTargetIds(),t.dataset.quickDamage);
  else if(t.dataset.temp){const p=state.encounter.participants.find(x=>x.id===t.dataset.temp),n=Number(prompt('PV temporaires :',p?.tempHp||0));if(p&&!Number.isNaN(n))mutate(()=>p.tempHp=Math.max(0,n),`${p.name} possède ${Math.max(0,n)} PV temporaires.`);}
  else if(t.dataset.sethp){const p=state.encounter.participants.find(x=>x.id===t.dataset.sethp),n=Number(prompt('Fixer les PV actuels :',p?.hp||0));if(p&&!Number.isNaN(n))mutate(()=>{p.hp=Math.max(0,Math.min(p.maxHp,n));checkPhaseTransition(p);},`${p.name} est fixé à ${Math.max(0,Math.min(p.maxHp,n))} PV.`);}
  else if(t.dataset.condition){const [id,c]=t.dataset.condition.split('|');toggleCondition(id,c);}
  else if(t.dataset.modalCondition){toggleConditionMany(currentTargetIds(),t.dataset.modalCondition);renderConditionModal();}
  else if(t.dataset.useAbility){const [pid,aid,section,mode]=t.dataset.useAbility.split('|');useAbility(pid,aid,section,mode);}
  else if(t.dataset.recharge){const [pid,aid]=t.dataset.recharge.split('|');testRecharge(pid,aid);}
  else if(t.dataset.detailTab){ui.detailTab=t.dataset.detailTab;renderDetail();}
  else if(t.dataset.addRow)addDynamicRow(t.dataset.addRow);
  else if(t.classList.contains('remove-row'))t.closest('.dynamic-row')?.remove();
});

addEventListener('change',e=>{if(e.target.matches('[data-init]')){if(structuralGuard()){render();return;}const p=state.encounter.participants.find(x=>x.id===e.target.dataset.init);if(p){checkpoint();p.initiative=Number(e.target.value)||0;state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;saveState();render();}}});

$('#monsterSearch').addEventListener('input',renderLibrary);
$('#encounterName').addEventListener('change',e=>{state.encounter.name=e.target.value.trim()||'Rencontre sans titre';saveState();render();});
$('#btnNextTurn').addEventListener('click',nextTurn);
$('#btnModePrep').addEventListener('click',()=>setMode('prep'));
$('#btnModeCombat').addEventListener('click',()=>setMode('combat'));
$('#btnStartCombat').addEventListener('click',()=>setMode('combat'));
$('#btnCombatLock').addEventListener('click',()=>{if(state.ui.mode!=='combat')return;state.ui.locked=!state.ui.locked;saveState();render();toast(state.ui.locked?'Combat verrouillé.':'Combat déverrouillé.');});
$('#btnLibraryDrawer').addEventListener('click',()=>openDrawer('library'));
$('#btnPrepOpenLibrary').addEventListener('click',()=>openDrawer('library'));
$('#btnJournalDrawer').addEventListener('click',()=>openDrawer('journal'));
$('#drawerScrim').addEventListener('click',closeDrawers);
$('#btnMore').addEventListener('click',()=>$('#moreMenu').classList.toggle('hidden'));
$('#btnCreateMonster').addEventListener('click',()=>openMonsterEditor());
$('#btnAddPlayer').addEventListener('click',()=>{if(structuralGuard())return;$('#addPlayerForm').reset();$('#addPlayerDialog').showModal();});
$('#btnSortInitiative').addEventListener('click',()=>{if(structuralGuard())return;state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;saveState();render();toast('Initiative retriée.');});
$('#btnMultiMode').addEventListener('click',()=>{ui.multiMode=!ui.multiMode;if(!ui.multiMode)ui.multiSelection.clear();render();});
$('#btnQuickDamage').addEventListener('click',()=>applyDamageMany(currentTargetIds(),$('#quickAmount').value));
$('#btnQuickHeal').addEventListener('click',()=>applyHealMany(currentTargetIds(),$('#quickAmount').value));
$('#btnQuickState').addEventListener('click',openConditionDialog);
$('#btnNewEncounter').addEventListener('click',newEncounter);$('#btnReset').addEventListener('click',resetAll);$('#btnExport').addEventListener('click',exportData);$('#btnImport').addEventListener('click',()=>{$('#importText').value='';$('#importDialog').showModal();});
$('#btnUndo').addEventListener('click',undo);$('#btnUndoDrawer').addEventListener('click',undo);$('#btnClearLog').addEventListener('click',()=>mutate(()=>state.encounter.log=[],null));
$('#addMonsterForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;addMonsterToCombat(f.elements.monsterId.value,f.elements.count.value,f.elements.initiative.value,f.elements.sharedInitiative.checked,f.elements.includeCompanion?.checked);$('#addMonsterDialog').close();});
$('#addPlayerForm').addEventListener('submit',e=>{e.preventDefault();addPlayer(Object.fromEntries(new FormData(e.currentTarget)));$('#addPlayerDialog').close();});
$('#monsterForm').addEventListener('submit',e=>{e.preventDefault();saveMonsterFromForm();});
$('#btnDeleteMonster').addEventListener('click',()=>deleteMonster($('#monsterForm').elements.monsterId.value));
$('#importForm').addEventListener('submit',e=>{e.preventDefault();try{importData($('#importText').value);$('#importDialog').close();toast('Import réussi.');}catch(err){alert('Import impossible : '+err.message);}});

render();
