'use strict';

const STORAGE_KEY = 'encounter-console-v1'; // compatibilité V1/V2.x
const APP_VERSION = 2.5;
const ABILITIES = ['FOR','DEX','CON','INT','SAG','CHA'];
const CONDITIONS = ['Aveuglé','Charmé','Assourdi','Effrayé','Empoisonné','Entravé','Étourdi','Inconscient','Invisible','Paralysé','Pétrifié','À terre','Agrippé','Incapacité','Épuisement'];
const DAMAGE_TYPES = ['acide','contondants','feu','force','foudre','froid','nécrotiques','perforants','poison','psychiques','radiants','tonnerre','tranchants'];
const uid = (p='id') => `${p}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const SAMPLE_MONSTERS = window.ENCOUNTER_BUILTINS || [];

function numOrNull(v){ return v==='' || v==null ? null : Number(v); }
function normKey(v){ return String(v||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim(); }
function splitList(v){
  if(Array.isArray(v)) return v.map(x=>String(x).trim()).filter(Boolean);
  return String(v||'').split(/[;,·]/).map(x=>x.trim()).filter(Boolean);
}
function formatList(v){ return (v||[]).join(' ; '); }
function parseSaveString(str=''){
  const out={};
  String(str).replace(/−/g,'-').split(/[;,]/).forEach(part=>{
    const m=part.trim().match(/^(FOR|DEX|CON|INT|SAG|CHA)\s*([+-]?\d+)/i);
    if(m) out[m[1].toUpperCase()]=Number(m[2]);
  });
  return out;
}
function abilityMod(score){ return Math.floor((Number(score)-10)/2); }
function signed(n){ n=Number(n)||0; return n>=0?`+${n}`:`${n}`; }

function normalizeAbility(a={}){
  return {
    id:a.id||uid('ab'),name:a.name||'Capacité',detail:a.detail||'',kind:a.kind||'text',economy:a.economy||'',
    bonus:numOrNull(a.bonus),damage:a.damage||'',damageType:a.damageType||'',dc:numOrNull(a.dc),save:(a.save||'').toUpperCase(),
    cost:Number(a.cost)||1,recharge:a.recharge||'',sequence:a.sequence||'',timing:a.timing||''
  };
}
function normalizeResource(r={}){
  const max=Math.max(0,Number(r.max)||0),start=r.start==null?max:Math.max(0,Math.min(max,Number(r.start)||0));
  return {id:r.id||uid('res'),name:r.name||'Ressource',max,start,reset:r.reset||''};
}
function normalizeCondition(c){
  if(typeof c==='string') return {id:uid('cond'),name:c,durationType:'indefinite',remaining:null,saveAbility:'',dc:null,source:''};
  c=c||{};
  return {id:c.id||uid('cond'),name:c.name||'État',durationType:c.durationType||'indefinite',remaining:c.remaining==null?null:Math.max(0,Number(c.remaining)||0),saveAbility:(c.saveAbility||'').toUpperCase(),dc:numOrNull(c.dc),source:c.source||''};
}
function classifyLegacyImmunities(v){
  const items=splitList(v),damage=[],conditions=[];
  items.forEach(x=>{
    const k=normKey(x.replace(/^dégâts\s*:\s*/i,'').replace(/^états?\s*:\s*/i,''));
    const condition=CONDITIONS.find(c=>normKey(c)===k);
    const damageType=DAMAGE_TYPES.find(d=>normKey(d)===k);
    if(condition)conditions.push(condition); else if(damageType)damage.push(damageType);
  });
  return {damage,conditions};
}
function normalizePhase(p={}){
  return {id:p.id||uid('phase'),name:p.name||'Phase',threshold:Math.max(0,Number(p.threshold)||0),ac:numOrNull(p.ac),legendaryMax:numOrNull(p.legendaryMax),speed:p.speed||'',addResistances:splitList(p.addResistances),addImmunities:splitList(p.addImmunities),note:p.note||''};
}
function normalizeMonster(m={}){
  const legacyImm=classifyLegacyImmunities(m.immunities||'');
  const abilities={}; ABILITIES.forEach(a=>{if(m.abilities?.[a]!=null&&m.abilities[a]!=='')abilities[a]=Number(m.abilities[a]);});
  const saveMods=Object.assign({},parseSaveString(m.saves||''),m.saveMods||{});
  return {
    id:m.id||uid('monster'),category:['character','companion'].includes(m.category)?m.category:'enemy',source:m.source||'',subtitle:m.subtitle||'',name:m.name||'Adversaire',type:m.type||'',size:m.size||'',cr:String(m.cr??''),
    ac:Number(m.ac)||10,hp:Math.max(1,Number(m.hp)||1),initiative:Number(m.initiative)||0,speed:m.speed||'',saves:m.saves||'',abilities,saveMods,
    damageResistances:splitList(m.damageResistances?.length?m.damageResistances:m.resistances),
    damageVulnerabilities:splitList(m.damageVulnerabilities?.length?m.damageVulnerabilities:m.vulnerabilities),
    damageImmunities:splitList(m.damageImmunities?.length?m.damageImmunities:legacyImm.damage),
    conditionImmunities:splitList(m.conditionImmunities?.length?m.conditionImmunities:legacyImm.conditions),
    senses:m.senses||'',
    traits:(m.traits||[]).map(normalizeAbility),actions:(m.actions||[]).map(normalizeAbility),reactions:(m.reactions||[]).map(normalizeAbility),legendaryActions:(m.legendaryActions||[]).map(normalizeAbility),lairActions:(m.lairActions||[]).map(normalizeAbility),
    legendaryMax:Number(m.legendaryMax)||((m.legendaryActions||[]).length?3:0),lairInitiative:Number.isFinite(Number(m.lairInitiative))?Number(m.lairInitiative):20,
    resources:(m.resources||[]).map(normalizeResource),phases:(m.phases||[]).map(normalizePhase).sort((a,b)=>b.threshold-a.threshold),notes:m.notes||''
  };
}
function normalizeParticipant(p={}){
  return {
    id:p.id||uid('p'),modelId:p.modelId||null,groupId:p.groupId||null,name:p.name||'Participant',baseName:p.baseName||p.name||'Participant',kind:p.kind||'enemy',
    ac:Number(p.ac)||10,maxHp:Math.max(1,Number(p.maxHp)||1),hp:Math.max(0,Number.isFinite(Number(p.hp))?Number(p.hp):1),tempHp:Math.max(0,Number(p.tempHp)||0),initiative:Number(p.initiative)||0,
    conditions:(p.conditions||[]).map(normalizeCondition),actionUsed:!!p.actionUsed,bonusActionUsed:!!p.bonusActionUsed,reactionUsed:!!p.reactionUsed,
    legendaryRemaining:Number(p.legendaryRemaining)||0,currentPhaseId:p.currentPhaseId||null,abilityState:p.abilityState||{},resourceState:p.resourceState||{},companionOf:p.companionOf||null,lairOwnerId:p.lairOwnerId||null
  };
}
function mergeBuiltinEnhancements(stored,builtin){
  if(!builtin)return stored;
  const b=normalizeMonster(builtin),s=normalizeMonster(stored);
  if(!Object.keys(s.abilities).length&&Object.keys(b.abilities).length)s.abilities=b.abilities;
  if(!Object.keys(s.saveMods).length&&Object.keys(b.saveMods).length)s.saveMods=b.saveMods;
  ['damageResistances','damageVulnerabilities','damageImmunities','conditionImmunities'].forEach(k=>{if(!s[k]?.length&&b[k]?.length)s[k]=b[k];});
  if(!s.lairActions.length&&b.lairActions.length)s.lairActions=b.lairActions;
  if(b.lairActions.length&&(!Number.isFinite(Number(s.lairInitiative))))s.lairInitiative=b.lairInitiative;
  const enrichList=(target,source)=>target.map(a=>{const src=source.find(x=>x.name===a.name);return src?Object.assign({},src,a,{economy:a.economy||src.economy||'',sequence:a.sequence||src.sequence||'',timing:a.timing||src.timing||''}):a;});
  s.actions=enrichList(s.actions,b.actions);s.reactions=enrichList(s.reactions,b.reactions);s.legendaryActions=enrichList(s.legendaryActions,b.legendaryActions);s.traits=enrichList(s.traits,b.traits);
  // Les nouvelles multiattaques V2.5 sont ajoutées aux profils intégrés existants sans écraser les actions personnalisées.
  b.actions.filter(a=>a.kind==='multiattack'&&!s.actions.some(x=>x.name===a.name)).forEach(a=>s.actions.unshift(normalizeAbility(a)));
  b.actions.filter(a=>a.kind==='multiattack'&&!s.actions.some(x=>x.name===a.name)).forEach(a=>s.actions.unshift(a));
  if(!s.phases.length&&b.phases.length)s.phases=b.phases; else s.phases=s.phases.map(p=>{const bp=b.phases.find(x=>x.name===p.name);return bp?Object.assign({},bp,p,{addResistances:p.addResistances?.length?p.addResistances:bp.addResistances,addImmunities:p.addImmunities?.length?p.addImmunities:bp.addImmunities}):p;});
  return s;
}
function blankState(){
  return {version:APP_VERSION,ui:{mode:'prep',locked:false},encounter:{name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[],turnNotices:[],pendingPhase:null},monsters:clone(SAMPLE_MONSTERS).map(normalizeMonster)};
}
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY); if(!raw)return blankState();
    const s=JSON.parse(raw); s.version=APP_VERSION;s.ui=Object.assign({mode:'prep',locked:false},s.ui||{});
    if(!s.monsters?.length)s.monsters=clone(SAMPLE_MONSTERS);
    const builtinMap=new Map(SAMPLE_MONSTERS.map(x=>[x.id,x]));
    s.monsters=s.monsters.map(m=>mergeBuiltinEnhancements(m,builtinMap.get(m.id)));
    const known=new Set(s.monsters.map(m=>m.id));
    SAMPLE_MONSTERS.map(normalizeMonster).forEach(m=>{if(!known.has(m.id))s.monsters.push(m);});
    s.encounter=Object.assign(blankState().encounter,s.encounter||{});s.encounter.participants=(s.encounter.participants||[]).map(normalizeParticipant);s.encounter.log=s.encounter.log||[];s.encounter.turnNotices=s.encounter.turnNotices||[];
    return s;
  }catch(err){console.warn(err);return blankState();}
}

let state=loadState();
let undoStack=[];
const ui={detailTab:'actions',multiMode:false,multiSelection:new Set(),drawer:null,libraryFilter:'all',quickMode:'damage',conditionName:CONDITIONS[0],checkDc:15,pendingAdvance:false};

function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function checkpoint(){undoStack.push(JSON.stringify(state));if(undoStack.length>50)undoStack.shift();}
function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2200);}
function log(msg){state.encounter.log.unshift({id:uid('log'),time:new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}),text:msg});state.encounter.log=state.encounter.log.slice(0,220);}
function mutate(fn,msg){checkpoint();fn();if(msg)log(msg);saveState();render();}
function undo(){if(!undoStack.length)return toast('Rien à annuler.');state=JSON.parse(undoStack.pop());saveState();render();toast('Dernière action annulée.');}
function modelFor(p){return p?.modelId?state.monsters.find(m=>m.id===p.modelId):null;}
function isLair(p){return p?.kind==='lair';}
function makeParticipant(monster,n=1,initiative=10,groupId=null,companionOf=null){
  const m=normalizeMonster(monster),abilityState={},resourceState={};[...m.actions,...m.reactions,...m.legendaryActions,...m.lairActions].forEach(a=>abilityState[a.id]={ready:true});m.resources.forEach(r=>resourceState[r.id]=r.start);
  return {id:uid('p'),modelId:m.id,groupId,name:groupId?`${m.name} ${n}`:m.name,baseName:m.name,kind:m.category==='enemy'?'enemy':'ally',ac:m.ac,maxHp:m.hp,hp:m.hp,tempHp:0,initiative:Number(initiative)||0,conditions:[],actionUsed:false,bonusActionUsed:false,reactionUsed:false,legendaryRemaining:m.legendaryMax,currentPhaseId:null,abilityState,resourceState,companionOf,lairOwnerId:null};
}
function makeLairParticipant(owner,m){return {id:uid('lair'),modelId:m.id,groupId:null,name:`Repaire — ${owner.baseName}`,baseName:`Repaire — ${owner.baseName}`,kind:'lair',ac:0,maxHp:1,hp:1,tempHp:0,initiative:m.lairInitiative??20,conditions:[],actionUsed:false,bonusActionUsed:false,reactionUsed:false,legendaryRemaining:0,currentPhaseId:null,abilityState:{},resourceState:{},companionOf:null,lairOwnerId:owner.id};}
function sortedParticipants(){
  const all=state.encounter.participants;
  const tieKey=p=>{if(p.companionOf){const parent=all.find(x=>x.id===p.companionOf);if(parent)return `${parent.name}\u0001${p.name}`;}if(p.kind==='lair')return `\uffff${p.name}`;return `${p.name}\u0000`;};
  return [...all].sort((a,b)=>b.initiative-a.initiative||tieKey(a).localeCompare(tieKey(b),'fr'));
}
function activeParticipant(){const list=sortedParticipants();if(!list.length)return null;state.encounter.currentTurn=Math.max(0,Math.min(state.encounter.currentTurn,list.length-1));return list[state.encounter.currentTurn];}
function selectedParticipant(){return state.encounter.participants.find(p=>p.id===state.encounter.selectedId)||activeParticipant();}
function phaseForHp(p,m=modelFor(p)){if(!m?.phases?.length)return null;return m.phases.filter(ph=>p.hp<=ph.threshold).sort((a,b)=>a.threshold-b.threshold)[0]||null;}
function currentPhase(p,m=modelFor(p)){if(!m?.phases?.length)return null;if(p.currentPhaseId)return m.phases.find(ph=>ph.id===p.currentPhaseId)||phaseForHp(p,m);return null;}
function phaseDepth(ph,m){if(!ph)return 0;const ordered=[...m.phases].sort((a,b)=>b.threshold-a.threshold);return ordered.findIndex(x=>x.id===ph.id)+1;}
function nextPhase(p,m=modelFor(p)){
  if(!m?.phases?.length)return null;const ordered=[...m.phases].sort((a,b)=>b.threshold-a.threshold),cur=currentPhase(p,m);if(!cur)return ordered[0]||null;const i=ordered.findIndex(x=>x.id===cur.id);return ordered[i+1]||null;
}
function checkPhaseTransition(p){
  const m=modelFor(p);if(!m?.phases?.length||isLair(p))return;const candidate=phaseForHp(p,m);if(!candidate)return;const cur=currentPhase(p,m);if(cur&&phaseDepth(candidate,m)<=phaseDepth(cur,m))return;
  p.currentPhaseId=candidate.id;const cap=effectiveLegendaryMax(p,m);if(cap)p.legendaryRemaining=Math.min(p.legendaryRemaining,cap);state.encounter.pendingPhase={participantId:p.id,phaseId:candidate.id};log(`⚠ ${p.name} entre dans « ${candidate.name} » — ${candidate.note||'changement de phase.'}`);
}
function effectiveAc(p){const ph=currentPhase(p);return ph?.ac??p.ac;}
function effectiveSpeed(p,m=modelFor(p)){return currentPhase(p,m)?.speed||m?.speed||'—';}
function effectiveLegendaryMax(p,m=modelFor(p)){const ph=currentPhase(p,m);return ph?.legendaryMax??m?.legendaryMax??0;}
function effectiveDamageResistances(p,m=modelFor(p)){return [...new Set([...(m?.damageResistances||[]),...(currentPhase(p,m)?.addResistances||[])])];}
function effectiveDamageImmunities(p,m=modelFor(p)){return [...new Set([...(m?.damageImmunities||[]),...(currentPhase(p,m)?.addImmunities||[])])];}
function effectiveConditionImmunities(p,m=modelFor(p)){return m?.conditionImmunities||[];}
function hpPct(p){return Math.max(0,Math.min(100,p.hp/p.maxHp*100));}
function hpClass(p){const pct=hpPct(p);return pct>60?'healthy':pct>30?'mid':'low';}
function hpBandClass(p){const pct=hpPct(p);return p.hp<=0?'hp-down':pct>75?'hp-high':pct>50?'hp-good':pct>25?'hp-warn':'hp-critical';}
function isLocked(){return state.ui.mode==='combat'&&state.ui.locked;}
function structuralGuard(){if(isLocked()){toast('Combat verrouillé : déverrouille pour modifier la structure.');return true;}return false;}

function rollDie(s){return Math.floor(Math.random()*s)+1;}
function rollD20(mode='normal'){const a=rollDie(20),b=rollDie(20);if(mode==='adv')return{roll:Math.max(a,b),detail:`${a}/${b}`};if(mode==='dis')return{roll:Math.min(a,b),detail:`${a}/${b}`};return{roll:a,detail:String(a)};}
function rollExpression(expr){
  if(!expr)return{total:0,detail:'0'};const clean=String(expr).replace(/\s/g,'').replace(/−/g,'-'),parts=clean.match(/[+-]?[^+-]+/g)||[];let total=0;const details=[];
  for(const raw of parts){let sign=1,part=raw;if(part[0]==='+')part=part.slice(1);else if(part[0]==='-'){sign=-1;part=part.slice(1);}const dm=part.match(/^(\d*)d(\d+)$/i);if(dm){const n=Number(dm[1]||1),s=Number(dm[2]),rolls=Array.from({length:n},()=>rollDie(s));total+=rolls.reduce((x,y)=>x+y,0)*sign;details.push(`${sign<0?'-':''}${rolls.join('+')}`);}else if(!Number.isNaN(Number(part))){total+=Number(part)*sign;details.push(`${sign<0?'-':''}${part}`);}else details.push(part);}
  return{total,detail:details.join(' + ').replace(/\+ -/g,'- ')};
}
function setMode(mode){if(mode==='prep')state.ui.locked=false;state.ui.mode=mode;ui.multiMode=false;ui.multiSelection.clear();if(mode==='combat'){const a=activeParticipant();if(a){state.encounter.selectedId=a.id;processStartTurn(a,true);}}saveState();render();}
function openDrawer(name){ui.drawer=name;renderDrawers();}
function closeDrawers(){ui.drawer=null;renderDrawers();}
function renderDrawers(){const lib=$('#libraryDrawer'),jr=$('#journalDrawer'),scrim=$('#drawerScrim');lib.classList.toggle('open',ui.drawer==='library');jr.classList.toggle('open',ui.drawer==='journal');scrim.classList.toggle('open',!!ui.drawer);lib.setAttribute('aria-hidden',ui.drawer==='library'?'false':'true');jr.setAttribute('aria-hidden',ui.drawer==='journal'?'false':'true');}

function render(){
  $('#encounterName').value=state.encounter.name;$('#roundNumber').textContent=state.encounter.round;document.body.classList.toggle('combat-mode',state.ui.mode==='combat');
  $('#prepView').classList.toggle('hidden',state.ui.mode!=='prep');$('#combatView').classList.toggle('hidden',state.ui.mode!=='combat');$('#quickBar').classList.toggle('hidden',state.ui.mode!=='combat');
  $('#btnModePrep').classList.toggle('active',state.ui.mode==='prep');$('#btnModeCombat').classList.toggle('active',state.ui.mode==='combat');$('#btnCombatLock').textContent=state.ui.locked?'🔒':'🔓';$('#btnCombatLock').classList.toggle('locked',state.ui.locked);$('#btnCombatLock').disabled=state.ui.mode!=='combat';
  renderInitiative();renderLibrary();renderPrep();renderCombat();renderDetail();renderLog();renderQuickbar();renderDrawers();renderMultiState();renderPendingPhase();
  requestAnimationFrame(()=>document.querySelector('.init-chip.active')?.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}));
}
function renderInitiative(){
  const list=sortedParticipants(),active=activeParticipant();
  $('#initiativeRibbon').innerHTML=list.length?list.map(p=>`<button class="init-chip ${p.id===active?.id?'active':''} ${p.hp<=0&&!isLair(p)?'dead':''} ${isLair(p)?'lair-chip':''}" data-select="${p.id}"><span>${isLair(p)?'🏰 ':''}${esc(p.name)}</span><b>${p.initiative}</b></button>`).join(''):'<span class="muted">Aucune initiative</span>';
  if(!list.length){$('#nextTurnHint').textContent='Aucun participant';return;}const idx=Math.min(state.encounter.currentTurn,list.length-1),next=list[(idx+1)%list.length];$('#nextTurnHint').textContent=`Suivant : ${next.name} · ${next.initiative}`;
}
function renderLibrary(){
  const q=$('#monsterSearch').value.trim().toLowerCase(),locked=isLocked();const ms=state.monsters.filter(m=>(ui.libraryFilter==='all'||m.category===ui.libraryFilter)&&`${m.name} ${m.type} ${m.cr} ${m.source} ${m.subtitle}`.toLowerCase().includes(q));
  $('#monsterLibrary').innerHTML=ms.map(m=>{const isChar=m.category==='character',isComp=m.category==='companion',cardClass=isChar?'character-card':isComp?'companion-card':'',badgeClass=isChar?'character-badge':isComp?'companion-badge':'',badge=isChar?'PJ':isComp?'COMP.':`FP ${esc(m.cr||'—')}`;return `<article class="library-card ${cardClass}"><div class="library-title"><h3>${esc(m.name)}</h3><span class="cr-badge ${badgeClass}">${badge}</span></div><div class="library-meta">${esc(m.subtitle||[m.size,m.type].filter(Boolean).join(' · '))} · CA ${m.ac} · ${m.hp} PV${m.lairActions.length?' · 🏰 repaire':''}</div>${m.source?`<div class="source-badge">${esc(m.source)}</div>`:''}<div class="library-actions"><button class="primary small" data-add-monster="${m.id}" ${locked?'disabled':''}>+ Ajouter</button><button class="ghost small" data-edit-monster="${m.id}" ${locked?'disabled':''}>Modifier</button></div></article>`;}).join('')||'<p class="muted">Aucun résultat.</p>';
  $('#btnCreateMonster').disabled=locked;$$('[data-library-filter]').forEach(b=>b.classList.toggle('active',b.dataset.libraryFilter===ui.libraryFilter));
}
function renderPrep(){
  const list=sortedParticipants();$('#prepCount').textContent=list.length;$('#prepParticipants').innerHTML=list.length?list.map(p=>isLair(p)?`<article class="prep-row lair-row ${p.id===state.encounter.selectedId?'selected':''}" data-select="${p.id}"><div><strong>🏰 ${esc(p.name)}</strong><small>Action de repaire · initiative ${p.initiative}</small></div><label>INI <input data-init="${p.id}" type="number" value="${p.initiative}"></label><div></div><button class="danger ghost small" data-remove="${p.id}">Retirer</button></article>`:`<article class="prep-row ${p.id===state.encounter.selectedId?'selected':''} ${hpBandClass(p)}" data-select="${p.id}"><div><strong>${esc(p.name)}</strong><small>${modelFor(p)?.category==='character'?esc(modelFor(p)?.subtitle||'Personnage'):modelFor(p)?.category==='companion'?esc(modelFor(p)?.subtitle||'Compagnon'):p.kind==='enemy'?esc(modelFor(p)?.type||'Adversaire'):'PJ / PNJ'} · CA ${effectiveAc(p)} · ${p.hp}/${p.maxHp} PV</small></div><label>INI <input data-init="${p.id}" type="number" value="${p.initiative}"></label><div class="mini-hp"><i style="width:${hpPct(p)}%"></i></div><button class="danger ghost small" data-remove="${p.id}">Retirer</button></article>`).join(''):'<div class="empty-prep">Aucun participant. Ouvre la bibliothèque pour ajouter tes adversaires.</div>';
  const p=selectedParticipant();if(!p){$('#prepPreview').innerHTML='<div class="empty-detail"><div class="empty-crest">✦</div><p>Sélectionne un participant.</p></div>';return;}const m=modelFor(p);
  $('#prepPreview').innerHTML=isLair(p)?`<div class="preview-head"><div><span class="eyebrow">REPAIRE</span><h2>${esc(p.name)}</h2><p>${m?.lairActions.length||0} action(s) de repaire</p></div></div>`:`<div class="preview-head"><div><span class="eyebrow">${m?.category==='character'?'PERSONNAGE':m?.category==='companion'?'COMPAGNON':p.kind==='enemy'?'ADVERSAIRE':'PARTICIPANT'}</span><h2>${esc(p.name)}</h2><p>${m?esc(m.category==='character'||m.category==='companion'?(m.subtitle||m.type):[m.size,m.type,`FP ${m.cr||'—'}`].filter(Boolean).join(' · ')):'PJ / PNJ'}</p></div>${m?`<button class="ghost small" data-edit-monster="${m.id}">✎ Modifier</button>`:''}</div><div class="stat-grid"><div class="statbox"><span>CA</span><b>${effectiveAc(p)}</b></div><div class="statbox"><span>PV</span><b>${p.hp}/${p.maxHp}</b></div><div class="statbox"><span>INI</span><b>${p.initiative}</b></div><div class="statbox"><span>VIT</span><b>${esc(effectiveSpeed(p,m))}</b></div></div>${m?`<div class="preview-summary"><b>${m.actions.length}</b> action(s) · <b>${m.reactions.length}</b> réaction(s) · <b>${m.legendaryActions.length}</b> légendaire(s)</div><p class="detail-notes">${esc(m.notes||'')}</p>`:'<p class="detail-notes">Suivi simple des PV, CA et initiative.</p>'}`;
}
function groupedEntries(){const list=sortedParticipants(),seen=new Set(),entries=[];for(const p of list){if(p.groupId){if(seen.has(p.groupId))continue;seen.add(p.groupId);entries.push({type:'group',id:p.groupId,members:list.filter(x=>x.groupId===p.groupId)});}else entries.push({type:'single',id:p.id,members:[p]});}return entries;}
function renderCombat(){const entries=groupedEntries(),active=activeParticipant();$('#combatList').innerHTML=entries.length?entries.map(entry=>entry.type==='group'?renderGroupCard(entry.members,active):renderSingleCard(entry.members[0],active)).join(''):'<div class="empty-combat">Aucun participant.</div>';}
function renderSingleCard(p,active){
  if(isLair(p))return `<article class="combat-card lair-card ${p.id===active?.id?'active':''} ${p.id===state.encounter.selectedId?'selected':''}"><button class="select-hit" data-select="${p.id}"></button><div class="combat-card-main"><span class="turn-dot">🏰</span><div class="combat-ident"><strong>${esc(p.name)}</strong><small>Action de repaire · ${modelFor(p)?.lairActions.length||0} option(s)</small></div><span class="ini-badge">${p.initiative}</span></div><div class="lair-card-foot">Initiative spéciale de repaire</div></article>`;
  const selected=p.id===state.encounter.selectedId,multiSelected=ui.multiSelection.has(p.id),phase=currentPhase(p),pct=hpPct(p);
  return `<article class="combat-card ${hpBandClass(p)} ${p.id===active?.id?'active':''} ${selected?'selected':''} ${p.hp<=0?'dead':''}"><button class="select-hit" ${ui.multiMode?`data-multi="${p.id}"`:`data-select="${p.id}"`} aria-label="Sélectionner ${esc(p.name)}"></button><div class="combat-card-main">${ui.multiMode?`<span class="multi-check ${multiSelected?'on':''}">${multiSelected?'✓':''}</span>`:'<span class="turn-dot"></span>'}<div class="combat-ident"><strong>${esc(p.name)}</strong><small>${modelFor(p)?.category==='character'?esc(modelFor(p)?.subtitle||'Personnage'):modelFor(p)?.category==='companion'?esc(modelFor(p)?.subtitle||'Compagnon'):p.kind==='enemy'?esc(modelFor(p)?.type||'Adversaire'):'PJ / PNJ'} · CA ${effectiveAc(p)}</small></div><span class="ini-badge">${p.initiative}</span></div><div class="hp-line"><div class="hpbar"><div class="hpfill ${hpClass(p)}" style="width:${pct}%"></div></div><div class="hptext">${p.hp}${p.tempHp?` +${p.tempHp}`:''}/${p.maxHp}</div></div><div class="economy-mini"><i class="eco-action ${p.actionUsed?'spent':''}">A</i><i class="eco-bonus ${p.bonusActionUsed?'spent':''}">B</i><i class="eco-reaction ${p.reactionUsed?'spent':''}">R</i></div><div class="condition-pills">${p.hp<=0?'<span class="pill dead-pill">0 PV</span>':''}${phase?`<span class="pill phase-pill">${esc(phase.name)}</span>`:''}${p.conditions.slice(0,3).map(c=>`<span class="pill">${esc(c.name)}${conditionShort(c)}</span>`).join('')}${p.conditions.length>3?`<span class="pill">+${p.conditions.length-3}</span>`:''}</div></article>`;
}
function renderGroupCard(members,active){
  const first=members[0],activeInside=members.some(p=>p.id===active?.id),alive=members.filter(p=>p.hp>0).length,ini=first.initiative,allSelected=members.every(p=>ui.multiSelection.has(p.id)),sharedInitiative=new Set(members.map(p=>p.initiative)).size===1;
  const worst=members.reduce((a,b)=>hpPct(a)<hpPct(b)?a:b,members[0]);
  return `<article class="group-card ${hpBandClass(worst)} ${activeInside?'active':''}"><div class="group-head"><button class="group-title" ${ui.multiMode?`data-multi-group="${first.groupId}"`:`data-select="${activeInside?active.id:first.id}"`}><span class="group-icon">${ui.multiMode?(allSelected?'☑':'☐'):'▾'}</span><span><strong>${esc(first.baseName)}</strong><small>${alive}/${members.length} actifs · ${sharedInitiative?'initiative commune':'initiatives individuelles'}</small></span></button><span class="ini-badge">${sharedInitiative?ini:'×'}</span></div><div class="group-members">${members.map((p,i)=>{const sel=ui.multiSelection.has(p.id),pct=hpPct(p);return `<button class="member-chip ${hpBandClass(p)} ${p.id===active?.id?'active':''} ${p.id===state.encounter.selectedId?'selected':''} ${p.hp<=0?'dead':''} ${sel?'multi-selected':''}" ${ui.multiMode?`data-multi="${p.id}"`:`data-select="${p.id}"`}><span>${i+1}${sharedInitiative?'':` · I${p.initiative}`}</span><b>${p.hp<=0?'☠':`${p.hp}/${p.maxHp}`}</b><i><em style="width:${pct}%"></em></i></button>`;}).join('')}</div></article>`;
}
function conditionShort(c){if(c.durationType==='rounds')return ` · ${c.remaining}t`;if(c.durationType==='saveEnd')return ` · JS ${c.saveAbility} DD${c.dc||'?'}`;if(c.durationType==='untilStart')return ' · début';if(c.durationType==='untilEnd')return ' · fin';return '';}
function economyStrip(p){return `<div class="economy-strip"><button class="economy-marker action ${p.actionUsed?'spent':''}" data-economy="${p.id}|action"><span>●</span><b>Action</b><small>${p.actionUsed?'utilisée':'disponible'}</small></button><button class="economy-marker bonus ${p.bonusActionUsed?'spent':''}" data-economy="${p.id}|bonus"><span>◆</span><b>Action bonus</b><small>${p.bonusActionUsed?'utilisée':'disponible'}</small></button><button class="economy-marker reaction ${p.reactionUsed?'spent':''}" data-economy="${p.id}|reaction"><span>↯</span><b>Réaction</b><small>${p.reactionUsed?'utilisée':'disponible'}</small></button></div>`;}
function renderTurnReminders(p,m){
  if(p.id!==activeParticipant()?.id)return'';const start=(state.encounter.turnNotices||[]).filter(n=>n.participantId===p.id);const end=[];
  p.conditions.forEach(c=>{if(c.durationType==='saveEnd')end.push({text:`${c.name} : JS ${c.saveAbility||'?'} DD ${c.dc||'?'} en fin de tour.`,condition:c});else if(c.durationType==='untilEnd')end.push({text:`${c.name} prend fin à la fin de ce tour.`});else if(c.durationType==='rounds')end.push({text:`${c.name} : ${c.remaining} tour${c.remaining>1?'s':''} restant${c.remaining>1?'s':''}.`});});
  (m?.traits||[]).filter(t=>t.timing==='end').forEach(t=>end.push({text:`${t.name} — ${t.detail}`}));
  if(!start.length&&!end.length)return'';
  return `<section class="turn-reminders"><div><span class="eyebrow">À NE PAS OUBLIER</span><h3>Tour de ${esc(p.name)}</h3></div>${start.map(n=>`<div class="reminder-row done"><span>✓</span><p>${esc(n.text)}</p></div>`).join('')}${end.map(n=>`<div class="reminder-row"><span>⚠</span><p>${esc(n.text)}</p>${n.condition?`<div class="reminder-actions">${canRollConditionSave(p,n.condition)?`<button class="primary" data-condition-roll="${p.id}|${n.condition.id}">🎲 Lancer</button>`:''}<button data-condition-result="${p.id}|${n.condition.id}|success">Réussite</button><button data-condition-result="${p.id}|${n.condition.id}|fail">Échec</button></div>`:''}</div>`).join('')}</section>`;
}
function renderDetail(){
  const p=selectedParticipant(),root=$('#activeDetail');if(!p){root.className='active-detail empty-detail';root.innerHTML='<div class="empty-crest">✦</div><h2>Aucune créature sélectionnée</h2><p>Ajoute un adversaire ou un PJ/PNJ.</p>';return;}const m=modelFor(p);
  if(isLair(p)){root.className='active-detail lair-detail';root.innerHTML=`<div class="detail-header"><div><span class="eyebrow">INITIATIVE ${p.initiative}</span><h2>🏰 ${esc(p.name)}</h2><div class="detail-meta">Action de repaire contextualisée</div></div></div><div class="detail-tab-body">${renderLairTab(p,m)}</div>`;return;}
  const phase=currentPhase(p,m),next=nextPhase(p,m),cap=effectiveLegendaryMax(p,m);root.className=`active-detail ${hpBandClass(p)}`;
  root.innerHTML=`${phase?`<div class="boss-alert"><strong>⚠ ${esc(phase.name)}</strong><span>${esc(phase.note||'')}</span>${next?`<small>Prochaine phase à ${next.threshold} PV · ${Math.max(0,p.hp-next.threshold)} PV avant transition</small>`:'<small>Phase finale</small>'}</div>`:m?.phases?.length&&next?`<div class="boss-alert upcoming"><strong>Boss · Phase I</strong><span>Prochaine phase à ${next.threshold} PV · ${Math.max(0,p.hp-next.threshold)} PV avant transition</span></div>`:''}<div class="detail-header"><div><span class="eyebrow">${m?.category==='character'?'PERSONNAGE ACTIF':m?.category==='companion'?'COMPAGNON ACTIF':'CRÉATURE ACTIVE'}</span><h2>${esc(p.name)}</h2><div class="detail-meta">${m?esc(m.category==='character'||m.category==='companion'?(m.subtitle||m.type):[m.size,m.type,`FP ${m.cr||'—'}`].filter(Boolean).join(' · ')):'Participant manuel'}</div></div><div class="header-resources">${cap?`<span class="resource-chip">★ ${p.legendaryRemaining}/${cap}</span>`:''}${m?.reactions?.length?`<span class="resource-chip ${p.reactionUsed?'spent':''}">↯ ${p.reactionUsed?'Utilisée':'Prête'}</span>`:''}</div></div>${economyStrip(p)}${renderTurnReminders(p,m)}<div class="stat-grid"><div class="statbox"><span>CA</span><b>${effectiveAc(p)}</b></div><div class="statbox hp-stat"><span>PV</span><b>${p.hp}/${p.maxHp}</b></div><div class="statbox"><span>INI</span><b>${p.initiative}</b></div><div class="statbox"><span>VIT</span><b>${esc(effectiveSpeed(p,m))}</b></div></div><nav class="detail-tabs"><button class="${ui.detailTab==='actions'?'active':''}" data-detail-tab="actions">⚔ Actions</button><button class="${ui.detailTab==='state'?'active':''}" data-detail-tab="state">◈ État</button><button class="${ui.detailTab==='sheet'?'active':''}" data-detail-tab="sheet">☰ Fiche</button></nav><div class="detail-tab-body">${ui.detailTab==='actions'?renderActionsTab(p,m):ui.detailTab==='state'?renderStateTab(p,m):renderSheetTab(p,m)}</div>`;
}
function renderActionsTab(p,m){
  if(!m)return'<div class="empty-tab">Participant manuel : aucune action enregistrée.</div>';const blocks=[];
  if(m.actions.length)blocks.push(`<section class="detail-section"><h3>Actions</h3>${m.actions.map(a=>abilityCard(p,a,'action')).join('')}</section>`);
  if(m.reactions.length)blocks.push(`<section class="detail-section"><h3>Réactions · ${p.reactionUsed?'UTILISÉE':'PRÊTE'}</h3>${m.reactions.map(a=>abilityCard(p,a,'reaction')).join('')}</section>`);
  if(m.legendaryActions.length){const cap=effectiveLegendaryMax(p,m);blocks.push(`<section class="detail-section"><div class="section-title-row"><h3>Actions légendaires</h3><span class="legendary-meter">${Array.from({length:cap},(_,i)=>`<b class="${i<p.legendaryRemaining?'':'off'}">★</b>`).join('')}</span></div><p class="muted tiny">ENCOUNTER les proposera automatiquement à la fin du tour d’une autre créature.</p>${m.legendaryActions.map(a=>abilityCard(p,a,'legendary')).join('')}</section>`);}
  return blocks.join('')||'<div class="empty-tab">Aucune action enregistrée.</div>';
}
function renderLairTab(p,m){if(!m?.lairActions?.length)return'<div class="empty-tab">Aucune action de repaire.</div>';return `<section class="detail-section"><div class="section-title-row"><h3>Actions de repaire</h3><span class="resource-chip">Initiative ${p.initiative}</span></div><p class="muted tiny">Choisis une option. Le marqueur Action de repaire est remis à zéro à chaque passage sur cette initiative.</p>${m.lairActions.map(a=>abilityCard(p,a,'lair')).join('')}</section>`;}
function conditionDurationLabel(c){if(c.durationType==='rounds')return `${c.remaining} tour${c.remaining>1?'s':''}`;if(c.durationType==='untilStart')return 'jusqu’au début du prochain tour';if(c.durationType==='untilEnd')return 'jusqu’à la fin du prochain tour';if(c.durationType==='saveEnd')return `JS ${c.saveAbility||'?'} DD ${c.dc||'?'} en fin de tour`;return 'durée indéfinie';}
function renderStateTab(p,m){
  const resources=m?.resources?.length?`<section class="detail-section"><h3>Ressources</h3><div class="resource-list">${m.resources.map(r=>{const cur=Number.isFinite(Number(p.resourceState?.[r.id]))?Number(p.resourceState[r.id]):r.start;return `<div class="resource-counter"><div><b>${esc(r.name)}</b><small>${esc(r.reset||'')}</small></div><div class="resource-stepper"><button data-resource="${p.id}|${r.id}|-1">−</button><strong>${cur}/${r.max}</strong><button data-resource="${p.id}|${r.id}|1">+</button></div></div>`;}).join('')}</div></section>`:'';
  const conditions=p.conditions.length?p.conditions.map(c=>`<div class="condition-active"><div><b>${esc(c.name)}</b><small>${esc(conditionDurationLabel(c))}${c.source?` · ${esc(c.source)}`:''}</small></div><button class="danger ghost small" data-remove-condition="${p.id}|${c.id}">Retirer</button></div>`).join(''):'<p class="muted">Aucun état actif.</p>';
  const cap=effectiveLegendaryMax(p,m),bossResources=cap?`<section class="detail-section"><h3>Boss</h3><div class="resource-row"><span>Actions légendaires</span><strong>${p.legendaryRemaining}/${cap}</strong></div><div class="resource-row"><span>Réaction</span><strong>${p.reactionUsed?'Utilisée':'Disponible'}</strong></div></section>`:'';
  return `<section class="state-summary"><div class="state-hp"><span>Points de vie</span><strong>${p.hp}${p.tempHp?` + ${p.tempHp} temporaires`:''} / ${p.maxHp}</strong><div class="hpbar large"><div class="hpfill ${hpClass(p)}" style="width:${hpPct(p)}%"></div></div></div><div class="state-controls"><button data-temp="${p.id}">PV temporaires</button><button data-sethp="${p.id}">Fixer les PV</button></div></section>${resources}<section class="detail-section"><div class="section-title-row"><h3>États & durées</h3><button class="ghost small" data-open-condition="${p.id}">+ Ajouter</button></div><div class="condition-active-list">${conditions}</div></section>${bossResources}`;
}
function characterChecks(p,m){
  if(!m||!Object.keys(m.abilities||{}).length)return'';const rows=ABILITIES.map(a=>{const score=m.abilities[a];if(score==null)return'';const mod=abilityMod(score),save=m.saveMods?.[a]??mod;return `<div class="check-row"><div><b>${a}</b><span>${score} (${signed(mod)})</span></div><button data-ability-check="${p.id}|${a}">Test ${signed(mod)}</button><button data-save-check="${p.id}|${a}">JS ${signed(save)}</button></div>`;}).join('');
  return `<section class="detail-section checks-section"><div class="section-title-row"><h3>Tests & sauvegardes</h3><label class="dc-field">DD <input id="checkDc" type="number" min="1" value="${ui.checkDc}" inputmode="numeric"></label></div><p class="muted tiny">Le jet utilise automatiquement le modificateur de caractéristique ou le modificateur de sauvegarde enregistré sur la fiche.</p><div class="checks-grid">${rows}</div></section>`;
}
function renderSheetTab(p,m){
  if(!m)return'<div class="empty-tab">Participant manuel : CA, PV et initiative uniquement.</div>';const res=effectiveDamageResistances(p,m),imm=effectiveDamageImmunities(p,m),condImm=effectiveConditionImmunities(p,m),vul=m.damageVulnerabilities||[];
  const defenses=[m.saves&&`<b>JS :</b> ${esc(m.saves)}`,vul.length&&`<b>Vulnérabilités :</b> ${esc(formatList(vul))}`,res.length&&`<b>Résistances :</b> ${esc(formatList(res))}`,imm.length&&`<b>Immunités dégâts :</b> ${esc(formatList(imm))}`,condImm.length&&`<b>Immunités états :</b> ${esc(formatList(condImm))}`,m.senses&&`<b>Sens & langues :</b> ${esc(m.senses)}`].filter(Boolean).join('<br>');
  return `${characterChecks(p,m)}${defenses?`<section class="detail-section"><h3>Défenses structurées & sens</h3><p class="detail-notes">${defenses}</p></section>`:''}${m.traits.length?`<section class="detail-section"><h3>Traits</h3>${m.traits.map(a=>`<div class="trait-card"><b>${esc(a.name)}</b>${a.timing?`<span class="timing-badge">${a.timing==='start'?'Début de tour':'Fin de tour'}</span>`:''}<p>${esc(a.detail)}</p></div>`).join('')}</section>`:''}${m.source?`<section class="detail-section"><h3>Source</h3><p class="detail-notes">${esc(m.source)}</p></section>`:''}${m.notes?`<section class="detail-section"><h3>Notes MJ</h3><p class="detail-notes">${esc(m.notes)}</p></section>`:''}${!isLocked()?`<section class="detail-section"><button class="ghost" data-edit-monster="${m.id}">✎ Modifier la fiche</button></section>`:''}`;
}
function abilityEconomy(a,section){if(section==='reaction')return'reaction';if(section==='legendary'||section==='lair')return'none';if(a.economy)return a.economy;if(/action bonus/i.test(a.detail||''))return'bonus';return'action';}
function abilityCard(p,a,section){
  const st=p.abilityState?.[a.id]||{ready:true},eco=abilityEconomy(a,section),economySpent=eco==='action'?p.actionUsed:eco==='bonus'?p.bonusActionUsed:eco==='reaction'?p.reactionUsed:false;
  const unavailable=(a.kind==='recharge'&&!st.ready)||(section==='legendary'&&p.legendaryRemaining<(a.cost||1))||(section==='lair'&&p.actionUsed)||(section!=='legendary'&&section!=='lair'&&economySpent);const tags=[];
  if(a.bonus!=null)tags.push(`${signed(a.bonus)}`);if(a.dc!=null)tags.push(`${a.save||'JS'} DD ${a.dc}`);if(a.damage)tags.push(`${a.kind==='heal'?'Soins ':''}${a.damage}${a.damageType?` ${a.damageType}`:''}`);if(a.kind==='recharge')tags.push(`Recharge ${a.recharge||'5–6'}`);if(a.kind==='multiattack'&&a.sequence)tags.push(a.sequence);if(section==='legendary')tags.push(`${a.cost||1} ★`);if(eco!=='none'&&section!=='legendary'&&section!=='lair')tags.push(eco==='bonus'?'Action bonus':eco==='reaction'?'Réaction':'Action');
  const label=a.kind==='attack'?'Attaquer':a.kind==='heal'?'Soigner':a.kind==='multiattack'?'Multiattaque':'Utiliser';
  return `<article class="ability-card ${unavailable?'unavailable':''}"><div class="ability-head"><div><b>${esc(a.name)}</b><small>${esc(tags.join(' · '))}</small></div>${a.kind==='recharge'&&!st.ready?'<span class="status-badge">Recharge en attente</span>':''}</div>${a.detail?`<p>${esc(a.detail)}</p>`:''}<div class="ability-buttons">${a.kind==='recharge'&&!st.ready?`<button class="primary" data-recharge="${p.id}|${a.id}">🎲 Tester maintenant</button>`:`<button class="primary" ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|normal">${label}</button>`}${a.kind==='attack'?`<button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|adv">Avantage</button><button ${unavailable?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|dis">Désav.</button>`:''}</div></article>`;
}
function renderLog(){$('#combatLog').innerHTML=state.encounter.log.length?state.encounter.log.map(x=>`<div class="log-entry"><span>${esc(x.time)}</span><p>${esc(x.text)}</p></div>`).join(''):'<div class="empty-log">Le journal est vide.</div>';}
function renderMultiState(){$('#btnMultiMode').classList.toggle('active',ui.multiMode);$('#multiCount').classList.toggle('hidden',!ui.multiMode);$('#multiCount').textContent=ui.multiSelection.size;document.body.classList.toggle('multi-mode',ui.multiMode);}
function currentTargetIds(){if(ui.multiMode)return [...ui.multiSelection].filter(id=>state.encounter.participants.some(p=>p.id===id&&!isLair(p)));const p=selectedParticipant();return p&&!isLair(p)?[p.id]:[];}
function renderQuickbar(){
  const ids=currentTargetIds(),targets=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(Boolean);$('#btnQuickDamage').classList.toggle('active',ui.quickMode==='damage');$('#btnQuickHeal').classList.toggle('active',ui.quickMode==='heal');$('#quickDamageType').classList.toggle('hidden',ui.quickMode==='heal');
  if(!targets.length){$('#quickTargetName').textContent='—';$('#quickTargetMeta').textContent='Aucune cible';return;}$('#quickTargetName').textContent=targets.length===1?targets[0].name:`${targets.length} cibles`;$('#quickTargetMeta').textContent=targets.length===1?`${targets[0].hp}/${targets[0].maxHp} PV · CA ${effectiveAc(targets[0])}`:targets.map(p=>p.name).slice(0,3).join(', ')+(targets.length>3?'…':'');
}
function resolveDamageAmount(p,amount,type){
  amount=Math.max(0,Number(amount)||0);if(!amount||!type)return{amount,reason:''};const k=normKey(type),imm=effectiveDamageImmunities(p).some(x=>normKey(x)===k),res=effectiveDamageResistances(p).some(x=>normKey(x)===k),vul=(modelFor(p)?.damageVulnerabilities||[]).some(x=>normKey(x)===k);if(imm)return{amount:0,reason:'immunité'};if(res&&vul)return{amount,reason:'résistance + vulnérabilité : annulation'};if(res)return{amount:Math.floor(amount/2),reason:'résistance'};if(vul)return{amount:amount*2,reason:'vulnérabilité'};return{amount,reason:''};
}
function applyDamageMany(ids,amount,type=''){
  amount=Math.max(0,Number(amount)||0);if(!amount||!ids.length)return;const details=[];mutate(()=>{ids.forEach(id=>{const p=state.encounter.participants.find(x=>x.id===id);if(!p||isLair(p))return;const r=resolveDamageAmount(p,amount,type);let left=r.amount;if(p.tempHp>0){const used=Math.min(p.tempHp,left);p.tempHp-=used;left-=used;}p.hp=Math.max(0,p.hp-left);checkPhaseTransition(p);details.push(`${p.name}: ${r.amount}${r.reason?` (${r.reason})`:''}`);});if(ids.length===1)state.encounter.selectedId=ids[0];},`${amount} dégâts${type?` ${type}`:''} → ${details.join(' · ')}`);
}
function applyHealMany(ids,amount){amount=Math.max(0,Number(amount)||0);if(!amount||!ids.length)return;mutate(()=>{ids.forEach(id=>{const p=state.encounter.participants.find(x=>x.id===id);if(!p||isLair(p))return;p.hp=Math.min(p.maxHp,p.hp+amount);});if(ids.length===1)state.encounter.selectedId=ids[0];},ids.length===1?`${state.encounter.participants.find(p=>p.id===ids[0])?.name||'Cible'} récupère ${amount} PV.`:`${amount} PV rendus à ${ids.length} cibles.`);}
function applyQuickAmount(amount){const ids=currentTargetIds();if(!ids.length)return toast('Sélectionne une cible.');if(ui.quickMode==='heal')applyHealMany(ids,amount);else applyDamageMany(ids,amount,$('#quickDamageType').value);}
function removeParticipant(id){if(structuralGuard())return;const p=state.encounter.participants.find(x=>x.id===id);if(!p)return;mutate(()=>{const ids=new Set([id]);if(!isLair(p))state.encounter.participants.filter(x=>x.lairOwnerId===id).forEach(x=>ids.add(x.id));state.encounter.participants=state.encounter.participants.filter(x=>!ids.has(x.id));ids.forEach(x=>ui.multiSelection.delete(x));if(ids.has(state.encounter.selectedId))state.encounter.selectedId=null;state.encounter.currentTurn=Math.min(state.encounter.currentTurn,Math.max(0,sortedParticipants().length-1));},`${p.name} est retiré du combat.`);}

function rechargeThreshold(a){const nums=((a.recharge||'5-6').match(/\d/g)||[]).map(Number);return nums.length?Math.min(...nums):5;}
function processStartTurn(p,silent=false){
  if(!p)return;const m=modelFor(p),notices=[];p.actionUsed=false;p.bonusActionUsed=false;p.reactionUsed=false;if(isLair(p)){notices.push('Action de repaire disponible.');}
  else{
    const cap=effectiveLegendaryMax(p,m);if(cap)p.legendaryRemaining=cap;
    const expired=p.conditions.filter(c=>c.durationType==='untilStart');if(expired.length){p.conditions=p.conditions.filter(c=>c.durationType!=='untilStart');expired.forEach(c=>notices.push(`${c.name} prend fin au début du tour.`));}
    [...(m?.actions||[]),...(m?.reactions||[]),...(m?.legendaryActions||[])].filter(a=>a.kind==='recharge').forEach(a=>{const st=p.abilityState[a.id]||(p.abilityState[a.id]={ready:true});if(!st.ready){const roll=rollDie(6),ok=roll>=rechargeThreshold(a);st.ready=ok;notices.push(`${a.name} : recharge automatique d6 = ${roll} → ${ok?'DISPONIBLE':'indisponible'}.`);log(`${p.name} — ${a.name} : recharge automatique d6 = ${roll} → ${ok?'rechargée':'non rechargée'}.`);}});
    (m?.traits||[]).filter(t=>t.timing==='start').forEach(t=>notices.push(`${t.name} — ${t.detail}`));
  }
  state.encounter.turnNotices=notices.map(text=>({id:uid('notice'),participantId:p.id,text}));if(!silent)log(`▶ Début du tour de ${p.name} — round ${state.encounter.round}.`);
}
function processEndTurn(p){
  if(!p||isLair(p))return;const removed=[];p.conditions.forEach(c=>{if(c.durationType==='untilEnd')removed.push(c.id);else if(c.durationType==='rounds'){c.remaining=Math.max(0,(Number(c.remaining)||1)-1);if(c.remaining<=0)removed.push(c.id);}});if(removed.length){const names=p.conditions.filter(c=>removed.includes(c.id)).map(c=>c.name);p.conditions=p.conditions.filter(c=>!removed.includes(c.id));log(`${p.name} : fin automatique de ${names.join(', ')}.`);}const m=modelFor(p);(m?.traits||[]).filter(t=>t.timing==='end').forEach(t=>log(`⏱ Fin de tour ${p.name} — rappel : ${t.name}.`));
}
function eligibleLegendaryBosses(ending){if(!ending||isLair(ending))return[];return state.encounter.participants.filter(p=>p.id!==ending.id&&!isLair(p)&&p.hp>0&&modelFor(p)?.legendaryActions?.length&&p.legendaryRemaining>0);}
function requestNextTurn(){const current=activeParticipant();if(!current)return toast('Aucun participant.');const bosses=eligibleLegendaryBosses(current);if(bosses.length){ui.pendingAdvance=true;renderLegendaryDialog(current,bosses);$('#legendaryDialog').showModal();return;}actualAdvanceTurn();}
function renderLegendaryDialog(ending,bosses){
  $('#legendaryContext').textContent=`Fin du tour de ${ending.name}. Avant de passer au suivant, ces boss peuvent dépenser des actions légendaires.`;$('#legendaryOptions').innerHTML=bosses.map(p=>{const m=modelFor(p),cap=effectiveLegendaryMax(p,m);return `<section class="legendary-context-block"><div class="section-title-row"><h3>${esc(p.name)}</h3><span class="legendary-meter">${Array.from({length:cap},(_,i)=>`<b class="${i<p.legendaryRemaining?'':'off'}">★</b>`).join('')}</span></div>${m.legendaryActions.map(a=>abilityCard(p,a,'legendary')).join('')}</section>`;}).join('');
}
function actualAdvanceTurn(){
  const list=sortedParticipants();if(!list.length)return toast('Aucun participant.');checkpoint();const ending=activeParticipant();processEndTurn(ending);let idx=state.encounter.currentTurn+1;if(idx>=list.length){idx=0;state.encounter.round++;}state.encounter.currentTurn=idx;const p=sortedParticipants()[idx];state.encounter.selectedId=p.id;processStartTurn(p);ui.detailTab='actions';ui.pendingAdvance=false;saveState();render();
}
function markEconomy(p,eco,value=true){if(eco==='action')p.actionUsed=value;if(eco==='bonus')p.bonusActionUsed=value;if(eco==='reaction')p.reactionUsed=value;}
function toggleEconomy(pid,eco){const p=state.encounter.participants.find(x=>x.id===pid);if(!p)return;mutate(()=>{if(eco==='action')p.actionUsed=!p.actionUsed;else if(eco==='bonus')p.bonusActionUsed=!p.bonusActionUsed;else if(eco==='reaction')p.reactionUsed=!p.reactionUsed;},`${p.name} — ${eco==='bonus'?'action bonus':eco==='reaction'?'réaction':'action'} ${eco==='action'?(p.actionUsed?'rendue disponible':'marquée utilisée'):eco==='bonus'?(p.bonusActionUsed?'rendue disponible':'marquée utilisée'):(p.reactionUsed?'rendue disponible':'marquée utilisée')}.`);}
function parseMultiSequence(sequence){return String(sequence||'').split(';').map(s=>s.trim()).filter(Boolean).map(part=>{const m=part.match(/^(.*?)(?:\*|x)(\d+)$/i);return{name:(m?m[1]:part).trim(),count:m?Number(m[2]):1};});}
function useMultiattack(p,m,a,mode='normal'){
  const seq=parseMultiSequence(a.sequence);if(!seq.length)return `${p.name} — ${a.name} : aucune séquence configurée.`;const results=[];seq.forEach(item=>{const attack=m.actions.find(x=>x.name===item.name);if(!attack){results.push(`${item.name} introuvable`);return;}for(let i=0;i<item.count;i++){const r=rollD20(mode),bonus=Number(attack.bonus)||0,total=r.roll+bonus,dmg=rollExpression(attack.damage);results.push(`${attack.name} ${i+1}/${item.count}: ${r.detail}${bonus?` ${signed(bonus)}`:''} = ${total}${attack.damage?` · ${dmg.total} ${attack.damageType||''}`:''}`);}});return `${p.name} — ${a.name} : ${results.join(' | ')}`;
}
function useAbility(pid,aid,section,mode='normal'){
  const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;const a=[...m.traits,...m.actions,...m.reactions,...m.legendaryActions,...m.lairActions].find(x=>x.id===aid);if(!a)return;const st=p.abilityState[aid]||(p.abilityState[aid]={ready:true});
  if(a.kind==='recharge'&&!st.ready)return toast('Cette capacité doit d’abord se recharger.');if(section==='reaction'&&p.reactionUsed)return toast('Réaction déjà utilisée.');if(section==='legendary'&&p.legendaryRemaining<(a.cost||1))return toast('Pas assez d’actions légendaires.');checkpoint();let text='';
  if(a.kind==='multiattack')text=useMultiattack(p,m,a,mode);else{ text=`${p.name} — ${a.name}`;if(a.kind==='attack'){const r=rollD20(mode),bonus=Number(a.bonus)||0,total=r.roll+bonus,dmg=rollExpression(a.damage);text+=` : d20 ${r.detail}${mode==='adv'?' (avantage)':mode==='dis'?' (désavantage)':''} ${signed(bonus)} = ${total}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;}else if(a.kind==='heal'){const heal=rollExpression(a.damage);text+=` : soins ${heal.total} PV [${heal.detail}]`;}else if(a.kind==='recharge'&&a.bonus!=null){const r=rollD20(mode),bonus=Number(a.bonus)||0,total=r.roll+bonus,dmg=rollExpression(a.damage);text+=` : d20 ${r.detail} ${signed(bonus)} = ${total}`;if(a.dc)text+=` · ${a.save||'JS'} DD ${a.dc}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;}else if(a.kind==='save'||a.kind==='recharge'){const dmg=rollExpression(a.damage);if(a.dc)text+=` : ${a.save||'JS'} DD ${a.dc}`;if(a.damage)text+=` · dégâts ${dmg.total} ${a.damageType||''} [${dmg.detail}]`;else if(!a.dc&&a.detail)text+=` : ${a.detail}`;}else text+=a.detail?` : ${a.detail}`:'';}
  if(a.kind==='recharge')st.ready=false;if(section==='reaction')p.reactionUsed=true;if(section==='legendary')p.legendaryRemaining-=a.cost||1;if(section==='lair')p.actionUsed=true;else markEconomy(p,abilityEconomy(a,section),true);log(text);saveState();render();if($('#legendaryDialog').open){const ending=activeParticipant(),bosses=eligibleLegendaryBosses(ending);if(bosses.length)renderLegendaryDialog(ending,bosses);else{$('#legendaryDialog').close();actualAdvanceTurn();}}toast(`${a.name} utilisé.`);
}
function testRecharge(pid,aid){const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m)return;const a=[...m.actions,...m.reactions,...m.legendaryActions].find(x=>x.id===aid);if(!a)return;const roll=rollDie(6),ok=roll>=rechargeThreshold(a);mutate(()=>{p.abilityState[aid]=p.abilityState[aid]||{};p.abilityState[aid].ready=ok;},`${p.name} teste la recharge de ${a.name} : d6 = ${roll} → ${ok?'rechargée':'indisponible'}.`);}
function adjustResource(pid,rid,delta){const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p),r=m?.resources?.find(x=>x.id===rid);if(!p||!r)return;const current=Number.isFinite(Number(p.resourceState?.[rid]))?Number(p.resourceState[rid]):r.start,next=Math.max(0,Math.min(r.max,current+Number(delta)));mutate(()=>{p.resourceState=p.resourceState||{};p.resourceState[rid]=next;},`${p.name} — ${r.name} : ${next}/${r.max}.`);}

function conditionImmune(p,name){return effectiveConditionImmunities(p).some(x=>normKey(x)===normKey(name));}
function addConditionMany(ids,data){if(!ids.length)return;const ps=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(p=>p&&!isLair(p));const applied=[],immune=[];mutate(()=>{ps.forEach(p=>{if(conditionImmune(p,data.name)){immune.push(p.name);return;}p.conditions=p.conditions.filter(c=>normKey(c.name)!==normKey(data.name));p.conditions.push(normalizeCondition(Object.assign({},data,{id:uid('cond')})));applied.push(p.name);});},`${data.name} : ${applied.length} cible(s) affectée(s)${immune.length?` · immunité : ${immune.join(', ')}`:''}.`);}
function removeCondition(pid,cid){const p=state.encounter.participants.find(x=>x.id===pid);if(!p)return;const c=p.conditions.find(x=>x.id===cid);if(!c)return;mutate(()=>p.conditions=p.conditions.filter(x=>x.id!==cid),`${p.name} : ${c.name} retiré.`);}
function resolveCondition(pid,cid,success){const p=state.encounter.participants.find(x=>x.id===pid),c=p?.conditions.find(x=>x.id===cid);if(!p||!c)return;mutate(()=>{if(success)p.conditions=p.conditions.filter(x=>x.id!==cid);},`${p.name} — ${c.name} : sauvegarde ${success?'réussie, état retiré':'échouée, état maintenu'}.`);}
function conditionSaveMod(p,c){const m=modelFor(p),a=c?.saveAbility;if(!m||!a)return null;if(m.saveMods?.[a]!=null)return Number(m.saveMods[a]);if(m.abilities?.[a]!=null)return abilityMod(m.abilities[a]);return null;}
function canRollConditionSave(p,c){return c?.durationType==='saveEnd'&&conditionSaveMod(p,c)!=null&&c.dc!=null;}
function rollConditionSave(pid,cid){const p=state.encounter.participants.find(x=>x.id===pid),c=p?.conditions.find(x=>x.id===cid);if(!p||!c)return;const mod=conditionSaveMod(p,c);if(mod==null||c.dc==null)return toast('Aucun modificateur de sauvegarde exploitable.');const r=rollD20(),total=r.roll+mod,success=total>=c.dc;mutate(()=>{if(success)p.conditions=p.conditions.filter(x=>x.id!==cid);},`${p.name} — ${c.name} : JS ${c.saveAbility} DD ${c.dc} = ${r.roll} ${signed(mod)} = ${total} → ${success?'RÉUSSITE, état retiré':'ÉCHEC, état maintenu'}.`);toast(`${p.name} : ${total} vs DD ${c.dc} — ${success?'RÉUSSITE':'ÉCHEC'}`);}
function renderConditionModal(){
  const ids=currentTargetIds(),ps=ids.map(id=>state.encounter.participants.find(p=>p.id===id)).filter(Boolean);$('#conditionTargetText').textContent=ps.length===1?ps[0].name:`${ps.length} cibles sélectionnées`;$('#conditionModalGrid').innerHTML=CONDITIONS.map(c=>`<button type="button" class="condition-btn ${ui.conditionName===c?'active':''}" data-choose-condition="${esc(c)}">${esc(c)}</button>`).join('');
  const current=ps.length===1?ps[0].conditions:[];$('#conditionCurrentList').innerHTML=current.length?`<h3>Déjà actifs</h3>${current.map(c=>`<div class="condition-active"><div><b>${esc(c.name)}</b><small>${esc(conditionDurationLabel(c))}</small></div><button type="button" class="danger ghost small" data-remove-condition="${ps[0].id}|${c.id}">Retirer</button></div>`).join('')}`:'';updateConditionOptionVisibility();
}
function updateConditionOptionVisibility(){const v=$('#conditionDuration').value;$('#conditionRoundsWrap').classList.toggle('hidden',v!=='rounds');$('#conditionSaveWrap').classList.toggle('hidden',v!=='saveEnd');$('#conditionDcWrap').classList.toggle('hidden',v!=='saveEnd');}
function openConditionDialog(){if(!currentTargetIds().length)return toast('Sélectionne une cible.');ui.conditionName=CONDITIONS[0];$('#conditionDuration').value='indefinite';$('#conditionRounds').value=1;$('#conditionSaveAbility').value='CON';$('#conditionDc').value=15;$('#conditionSource').value='';renderConditionModal();$('#conditionDialog').showModal();}

function rollCharacter(pid,ability,isSave){const p=state.encounter.participants.find(x=>x.id===pid),m=modelFor(p);if(!p||!m?.abilities?.[ability])return;const dc=Math.max(1,Number($('#checkDc')?.value)||ui.checkDc);ui.checkDc=dc;const mod=isSave?(m.saveMods?.[ability]??abilityMod(m.abilities[ability])):abilityMod(m.abilities[ability]),r=rollD20(),total=r.roll+mod,ok=total>=dc;log(`${p.name} — ${isSave?'JS':'test'} ${ability} DD ${dc} : ${r.roll} ${signed(mod)} = ${total} → ${ok?'RÉUSSITE':'ÉCHEC'}.`);saveState();renderLog();toast(`${ability} ${total} vs DD ${dc} — ${ok?'RÉUSSITE':'ÉCHEC'}`);}

function openAddMonster(id){if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;$('#addMonsterName').textContent=m.name;const f=$('#addMonsterForm');f.reset();f.elements.monsterId.value=id;f.elements.initiative.value=m.initiative||10;f.elements.count.value=1;const single=m.category!=='enemy';f.elements.count.max=single?1:50;f.elements.count.disabled=single;f.elements.sharedInitiative.checked=true;f.elements.sharedInitiative.closest('label').classList.toggle('hidden',single);const comp=$('#companionOption');if(comp){const show=id==='pj-silas-veyr';comp.classList.toggle('hidden',!show);f.elements.includeCompanion.checked=show;}const lair=$('#lairOption');if(lair){const show=!!m.lairActions.length;lair.classList.toggle('hidden',!show);f.elements.includeLair.checked=show;}$('#addMonsterDialog').showModal();}
function addMonsterToCombat(id,count,initiative,shared,includeCompanion=false,includeLair=false){
  if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;count=m.category==='enemy'?Math.max(1,Math.min(50,Number(count)||1)):1;const groupId=count>1?uid('group'):null,wantsCompanion=id==='pj-silas-veyr'&&includeCompanion&&state.monsters.some(x=>x.id==='comp-crasseuse');mutate(()=>{let main=null;for(let i=1;i<=count;i++){const ini=shared?Number(initiative)||0:(Number(initiative)||0)+rollDie(6)-3,p=makeParticipant(m,count>1?i:1,ini,groupId);state.encounter.participants.push(p);if(i===1)main=p;}if(wantsCompanion&&main){const cm=state.monsters.find(x=>x.id==='comp-crasseuse');state.encounter.participants.push(makeParticipant(cm,1,main.initiative,null,main.id));}if(includeLair&&m.lairActions.length&&main)state.encounter.participants.push(makeLairParticipant(main,m));state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;},`${count} × ${m.name} ajouté${count>1?'s':''}${wantsCompanion?' avec C.R.A.S.S.E.U.S.E.':''}${includeLair&&m.lairActions.length?' + repaire':''}.`);closeDrawers();}
function addPlayer(data){if(structuralGuard())return;const p={id:uid('p'),modelId:null,groupId:null,name:data.name,baseName:data.name,kind:'ally',ac:Number(data.ac)||10,maxHp:Math.max(1,Number(data.hp)||1),hp:Math.max(1,Number(data.hp)||1),tempHp:0,initiative:Number(data.initiative)||0,conditions:[],actionUsed:false,bonusActionUsed:false,reactionUsed:false,legendaryRemaining:0,currentPhaseId:null,abilityState:{},resourceState:{},companionOf:null,lairOwnerId:null};mutate(()=>{state.encounter.participants.push(p);state.encounter.selectedId=p.id;},`${p.name} rejoint le combat.`);}

function addDynamicRow(type,data={}){const map={traits:'#traitsRows',actions:'#actionsRows',reactions:'#reactionsRows',legendaryActions:'#legendaryRows',lairActions:'#lairRows',phases:'#phasesRows',resources:'#resourcesRows'},container=$(map[type]);if(!container)return;const tpl=$(type==='phases'?'#phaseRowTemplate':type==='resources'?'#resourceRowTemplate':'#abilityRowTemplate'),node=tpl.content.firstElementChild.cloneNode(true);node.dataset.rowType=type;node.dataset.rowId=data.id||uid(type==='phases'?'phase':type==='resources'?'res':'ab');node.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;if(data[k]!=null)el.value=Array.isArray(data[k])?formatList(data[k]):data[k];});container.appendChild(node);}
function clearEditorRows(){['#traitsRows','#actionsRows','#reactionsRows','#legendaryRows','#lairRows','#phasesRows','#resourcesRows'].forEach(s=>$(s).innerHTML='');}
function openMonsterEditor(id=null){
  if(structuralGuard())return;const f=$('#monsterForm');f.reset();clearEditorRows();const m=id?state.monsters.find(x=>x.id===id):null;$('#monsterEditorTitle').textContent=m?'Modifier la fiche':'Nouvelle fiche';$('#btnDeleteMonster').classList.toggle('hidden',!m);
  if(m){Object.entries({category:m.category,source:m.source,subtitle:m.subtitle,name:m.name,type:m.type,size:m.size,cr:m.cr,ac:m.ac,hp:m.hp,initiative:m.initiative,speed:m.speed,saves:m.saves,damageVulnerabilities:formatList(m.damageVulnerabilities),damageResistances:formatList(m.damageResistances),damageImmunities:formatList(m.damageImmunities),conditionImmunities:formatList(m.conditionImmunities),senses:m.senses,notes:m.notes,legendaryMax:m.legendaryMax,lairInitiative:m.lairInitiative,monsterId:m.id}).forEach(([k,v])=>{if(f.elements[k])f.elements[k].value=v??'';});ABILITIES.forEach(a=>{if(f.elements[`ability_${a}`])f.elements[`ability_${a}`].value=m.abilities?.[a]??'';if(f.elements[`save_${a}`])f.elements[`save_${a}`].value=m.saveMods?.[a]??'';});m.traits.forEach(x=>addDynamicRow('traits',x));m.actions.forEach(x=>addDynamicRow('actions',x));m.reactions.forEach(x=>addDynamicRow('reactions',x));m.legendaryActions.forEach(x=>addDynamicRow('legendaryActions',x));m.lairActions.forEach(x=>addDynamicRow('lairActions',x));m.phases.forEach(x=>addDynamicRow('phases',x));m.resources.forEach(x=>addDynamicRow('resources',x));}
  else{f.elements.monsterId.value='';f.elements.category.value='enemy';f.elements.lairInitiative.value=20;addDynamicRow('actions',{name:'Attaque',kind:'attack',economy:'action',bonus:5,damage:'1d8+3',damageType:'tranchants'});}$('#monsterEditor').showModal();
}
function collectRows(sel,type){return $$(sel+' .dynamic-row').map(row=>{const o={id:row.dataset.rowId};row.querySelectorAll('[data-field]').forEach(el=>{const k=el.dataset.field;o[k]=el.type==='number'?numOrNull(el.value):el.value;});if(type!=='phases'&&type!=='resources')o.cost=Number(o.cost)||1;if(type==='resources'){o.max=Math.max(0,Number(o.max)||0);o.start=o.start==null?o.max:Math.max(0,Math.min(o.max,Number(o.start)||0));}if(type==='phases'){o.addResistances=splitList(o.addResistances);o.addImmunities=splitList(o.addImmunities);}return o;}).filter(o=>o.name);}
function saveMonsterFromForm(){
  if(structuralGuard())return;const f=$('#monsterForm'),id=f.elements.monsterId.value||uid('monster'),existing=state.monsters.find(x=>x.id===id),abilities={},saveMods={};ABILITIES.forEach(a=>{if(f.elements[`ability_${a}`].value!=='')abilities[a]=Number(f.elements[`ability_${a}`].value);if(f.elements[`save_${a}`].value!=='')saveMods[a]=Number(f.elements[`save_${a}`].value);});
  const m=normalizeMonster({id,category:f.elements.category.value,source:f.elements.source.value,subtitle:f.elements.subtitle.value,name:f.elements.name.value,type:f.elements.type.value,size:f.elements.size.value,cr:f.elements.cr.value,ac:f.elements.ac.value,hp:f.elements.hp.value,initiative:f.elements.initiative.value,speed:f.elements.speed.value,saves:f.elements.saves.value,abilities,saveMods,damageVulnerabilities:splitList(f.elements.damageVulnerabilities.value),damageResistances:splitList(f.elements.damageResistances.value),damageImmunities:splitList(f.elements.damageImmunities.value),conditionImmunities:splitList(f.elements.conditionImmunities.value),senses:f.elements.senses.value,notes:f.elements.notes.value,legendaryMax:f.elements.legendaryMax.value,lairInitiative:f.elements.lairInitiative.value,traits:collectRows('#traitsRows','traits'),actions:collectRows('#actionsRows','actions'),reactions:collectRows('#reactionsRows','reactions'),legendaryActions:collectRows('#legendaryRows','legendaryActions'),lairActions:collectRows('#lairRows','lairActions'),phases:collectRows('#phasesRows','phases'),resources:collectRows('#resourcesRows','resources')});m.legendaryMax=m.legendaryActions.length?(Number(f.elements.legendaryMax.value)||3):0;mutate(()=>{const idx=state.monsters.findIndex(x=>x.id===id);if(idx>=0)state.monsters[idx]=m;else state.monsters.push(m);},`${m.name} ${existing?'modifié':'créé'} dans la bibliothèque.`);$('#monsterEditor').close();
}
function deleteMonster(id){if(structuralGuard())return;const m=state.monsters.find(x=>x.id===id);if(!m)return;if(!confirm(`Supprimer « ${m.name} » de la bibliothèque ?`))return;mutate(()=>{state.monsters=state.monsters.filter(x=>x.id!==id);state.encounter.participants.filter(p=>p.modelId===id).forEach(p=>p.modelId=null);},`${m.name} supprimé de la bibliothèque.`);$('#monsterEditor').close();}
function exportData(){const data={app:'ENCOUNTER',version:APP_VERSION,exportedAt:new Date().toISOString(),monsters:state.monsters,encounter:state.encounter};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`encounter-${state.encounter.name.toLowerCase().replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'')||'combat'}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);toast('Export JSON créé.');}
function importData(raw){if(!String(raw).trim())throw new Error('Aucune donnée JSON fournie.');const data=JSON.parse(raw);checkpoint();if(data.app==='ENCOUNTER'&&data.monsters){state.monsters=data.monsters.map(normalizeMonster);if(data.encounter)state.encounter=Object.assign(blankState().encounter,data.encounter,{participants:(data.encounter.participants||[]).map(normalizeParticipant)});}else if(Array.isArray(data))data.forEach(m=>state.monsters.push(normalizeMonster(m)));else if(data.name)state.monsters.push(normalizeMonster(data));else throw new Error('Format non reconnu');const known=new Set(state.monsters.map(m=>m.id));SAMPLE_MONSTERS.map(normalizeMonster).forEach(m=>{if(!known.has(m.id))state.monsters.push(m);});saveState();render();log('Import JSON effectué.');}
function newEncounter(){if(state.encounter.participants.length&&!confirm('Créer une nouvelle rencontre ? La bibliothèque sera conservée.'))return;mutate(()=>{state.encounter={name:'Rencontre sans titre',round:1,currentTurn:0,selectedId:null,participants:[],log:[],turnNotices:[],pendingPhase:null};ui.multiSelection.clear();ui.multiMode=false;},'Nouvelle rencontre créée.');}
function resetAll(){if(!confirm('Réinitialiser toute l’application, bibliothèque comprise ?'))return;checkpoint();state=blankState();ui.multiSelection.clear();saveState();render();toast('Application réinitialisée.');}
function renderPendingPhase(){const pending=state.encounter.pendingPhase,dlg=$('#phaseDialog');if(!pending||dlg.open)return;const p=state.encounter.participants.find(x=>x.id===pending.participantId),m=modelFor(p),ph=m?.phases.find(x=>x.id===pending.phaseId);if(!p||!ph){state.encounter.pendingPhase=null;saveState();return;}$('#phaseDialogTitle').textContent=`${p.name} — ${ph.name}`;$('#phaseDialogText').textContent=ph.note||'Le boss change de phase.';const stats=[];if(ph.ac!=null)stats.push(`CA ${ph.ac}`);if(ph.speed)stats.push(`Vitesse ${ph.speed}`);if(ph.legendaryMax!=null)stats.push(`${ph.legendaryMax} actions légendaires`);if(ph.addResistances.length)stats.push(`Résistances : ${formatList(ph.addResistances)}`);if(ph.addImmunities.length)stats.push(`Immunités : ${formatList(ph.addImmunities)}`);$('#phaseDialogStats').innerHTML=stats.map(x=>`<span>${esc(x)}</span>`).join('');dlg.showModal();state.encounter.pendingPhase=null;saveState();}
function closeDialogById(id){const d=document.getElementById(id);if(d?.open)d.close();}

addEventListener('click',e=>{
  const t=e.target.closest('button');if(!t)return;
  if(t.dataset.dialogClose){e.preventDefault();closeDialogById(t.dataset.dialogClose);return;}
  if(t.value==='cancel'&&t.closest('dialog')){e.preventDefault();t.closest('dialog').close();return;}
  if(t.dataset.closeDrawers!=null){closeDrawers();return;}
  if(t.dataset.addMonster)openAddMonster(t.dataset.addMonster);
  else if(t.dataset.editMonster)openMonsterEditor(t.dataset.editMonster);
  else if(t.dataset.select){state.encounter.selectedId=t.dataset.select;saveState();render();}
  else if(t.dataset.multi){const id=t.dataset.multi;ui.multiSelection.has(id)?ui.multiSelection.delete(id):ui.multiSelection.add(id);render();}
  else if(t.dataset.multiGroup){const members=state.encounter.participants.filter(p=>p.groupId===t.dataset.multiGroup),all=members.every(p=>ui.multiSelection.has(p.id));members.forEach(p=>all?ui.multiSelection.delete(p.id):ui.multiSelection.add(p.id));render();}
  else if(t.dataset.remove)removeParticipant(t.dataset.remove);
  else if(t.dataset.resource){const [pid,rid,delta]=t.dataset.resource.split('|');adjustResource(pid,rid,Number(delta));}
  else if(t.dataset.libraryFilter){ui.libraryFilter=t.dataset.libraryFilter;renderLibrary();}
  else if(t.dataset.quickMode){ui.quickMode=t.dataset.quickMode;renderQuickbar();}
  else if(t.dataset.quickAmount)applyQuickAmount(Number(t.dataset.quickAmount));
  else if(t.dataset.temp){const p=state.encounter.participants.find(x=>x.id===t.dataset.temp),n=Number(prompt('PV temporaires :',p?.tempHp||0));if(p&&!Number.isNaN(n))mutate(()=>p.tempHp=Math.max(0,n),`${p.name} possède ${Math.max(0,n)} PV temporaires.`);}
  else if(t.dataset.sethp){const p=state.encounter.participants.find(x=>x.id===t.dataset.sethp),n=Number(prompt('Fixer les PV actuels :',p?.hp||0));if(p&&!Number.isNaN(n))mutate(()=>{p.hp=Math.max(0,Math.min(p.maxHp,n));checkPhaseTransition(p);},`${p.name} est fixé à ${Math.max(0,Math.min(p.maxHp,n))} PV.`);}
  else if(t.dataset.openCondition){state.encounter.selectedId=t.dataset.openCondition;openConditionDialog();}
  else if(t.dataset.chooseCondition){ui.conditionName=t.dataset.chooseCondition;renderConditionModal();}
  else if(t.dataset.removeCondition){const [pid,cid]=t.dataset.removeCondition.split('|');removeCondition(pid,cid);if($('#conditionDialog').open)renderConditionModal();}
  else if(t.dataset.conditionResult){const [pid,cid,res]=t.dataset.conditionResult.split('|');resolveCondition(pid,cid,res==='success');}
  else if(t.dataset.conditionRoll){const [pid,cid]=t.dataset.conditionRoll.split('|');rollConditionSave(pid,cid);}
  else if(t.dataset.useAbility){const [pid,aid,section,mode]=t.dataset.useAbility.split('|');useAbility(pid,aid,section,mode);}
  else if(t.dataset.recharge){const [pid,aid]=t.dataset.recharge.split('|');testRecharge(pid,aid);}
  else if(t.dataset.economy){const [pid,eco]=t.dataset.economy.split('|');toggleEconomy(pid,eco);}
  else if(t.dataset.abilityCheck){const [pid,a]=t.dataset.abilityCheck.split('|');rollCharacter(pid,a,false);}
  else if(t.dataset.saveCheck){const [pid,a]=t.dataset.saveCheck.split('|');rollCharacter(pid,a,true);}
  else if(t.dataset.detailTab){ui.detailTab=t.dataset.detailTab;renderDetail();}
  else if(t.dataset.addRow)addDynamicRow(t.dataset.addRow);
  else if(t.classList.contains('remove-row'))t.closest('.dynamic-row')?.remove();
});

addEventListener('change',e=>{
  if(e.target.matches('[data-init]')){if(structuralGuard()){render();return;}const p=state.encounter.participants.find(x=>x.id===e.target.dataset.init);if(p){checkpoint();p.initiative=Number(e.target.value)||0;state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;saveState();render();}}
  if(e.target.id==='conditionDuration')updateConditionOptionVisibility();if(e.target.id==='checkDc')ui.checkDc=Math.max(1,Number(e.target.value)||15);
});

$('#monsterSearch').addEventListener('input',renderLibrary);
$('#encounterName').addEventListener('change',e=>{state.encounter.name=e.target.value.trim()||'Rencontre sans titre';saveState();render();});
$('#btnNextTurn').addEventListener('click',requestNextTurn);
$('#btnModePrep').addEventListener('click',()=>setMode('prep'));$('#btnModeCombat').addEventListener('click',()=>setMode('combat'));$('#btnStartCombat').addEventListener('click',()=>setMode('combat'));
$('#btnCombatLock').addEventListener('click',()=>{if(state.ui.mode!=='combat')return;state.ui.locked=!state.ui.locked;saveState();render();toast(state.ui.locked?'Combat verrouillé.':'Combat déverrouillé.');});
$('#btnLibraryDrawer').addEventListener('click',()=>openDrawer('library'));$('#btnPrepOpenLibrary').addEventListener('click',()=>openDrawer('library'));$('#btnJournalDrawer').addEventListener('click',()=>openDrawer('journal'));$('#drawerScrim').addEventListener('click',closeDrawers);
$('#btnMore').addEventListener('click',()=>$('#moreMenu').classList.toggle('hidden'));$('#btnCreateMonster').addEventListener('click',()=>openMonsterEditor());
$('#btnAddPlayer').addEventListener('click',()=>{if(structuralGuard())return;$('#addPlayerForm').reset();$('#addPlayerDialog').showModal();});
$('#btnSortInitiative').addEventListener('click',()=>{if(structuralGuard())return;state.encounter.currentTurn=0;state.encounter.selectedId=sortedParticipants()[0]?.id||null;saveState();render();toast('Initiative retriée.');});
$('#btnMultiMode').addEventListener('click',()=>{ui.multiMode=!ui.multiMode;if(!ui.multiMode)ui.multiSelection.clear();render();});
$('#btnQuickApply').addEventListener('click',()=>applyQuickAmount($('#quickAmount').value));$('#btnQuickState').addEventListener('click',openConditionDialog);
$('#btnNewEncounter').addEventListener('click',newEncounter);$('#btnReset').addEventListener('click',resetAll);$('#btnExport').addEventListener('click',exportData);$('#btnImport').addEventListener('click',()=>{$('#importText').value='';$('#importDialog').showModal();});
$('#btnUndo').addEventListener('click',undo);$('#btnUndoDrawer').addEventListener('click',undo);$('#btnClearLog').addEventListener('click',()=>mutate(()=>state.encounter.log=[],null));
$('#btnLegendaryContinue').addEventListener('click',()=>{$('#legendaryDialog').close();actualAdvanceTurn();});$('#btnLegendaryContinueTop').addEventListener('click',()=>{$('#legendaryDialog').close();actualAdvanceTurn();});
$('#addMonsterForm').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;addMonsterToCombat(f.elements.monsterId.value,f.elements.count.value,f.elements.initiative.value,f.elements.sharedInitiative.checked,f.elements.includeCompanion?.checked,f.elements.includeLair?.checked);$('#addMonsterDialog').close();});
$('#addPlayerForm').addEventListener('submit',e=>{e.preventDefault();addPlayer(Object.fromEntries(new FormData(e.currentTarget)));$('#addPlayerDialog').close();});
$('#conditionForm').addEventListener('submit',e=>{e.preventDefault();const duration=$('#conditionDuration').value,data={name:ui.conditionName,durationType:duration,remaining:duration==='rounds'?Math.max(1,Number($('#conditionRounds').value)||1):null,saveAbility:duration==='saveEnd'?$('#conditionSaveAbility').value:'',dc:duration==='saveEnd'?Math.max(1,Number($('#conditionDc').value)||15):null,source:$('#conditionSource').value.trim()};addConditionMany(currentTargetIds(),data);$('#conditionDialog').close();});
$('#monsterForm').addEventListener('submit',e=>{e.preventDefault();saveMonsterFromForm();});$('#btnDeleteMonster').addEventListener('click',()=>deleteMonster($('#monsterForm').elements.monsterId.value));
$('#importForm').addEventListener('submit',e=>{e.preventDefault();try{importData($('#importText').value);$('#importDialog').close();toast('Import réussi.');}catch(err){alert('Import impossible : '+err.message);}});

render();
