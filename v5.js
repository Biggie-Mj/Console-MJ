'use strict';

/* =========================================================
   ENCOUNTER V5 — Combat First REBUILD
   Base : V4.4. Cette couche est volontairement additive :
   elle ne remplace ni les fiches, ni la bibliothèque, ni les
   mécanismes de combat validés en V4.4.
   ========================================================= */

const V5_VERSION = '5.0.0';
const V5_HISTORY_LIMIT = 30;
const V5_FOCUS_KEY = 'encounter-v5-focus';

// ---------------------------------------------------------------------------
// État V5 non destructif
// ---------------------------------------------------------------------------
ui.v5CombatFilter = ui.v5CombatFilter || 'all';
ui.v5Focus = localStorage.getItem(V5_FOCUS_KEY) === '1';
state.actionFavorites = state.actionFavorites && typeof state.actionFavorites === 'object' ? state.actionFavorites : {};
state.version = V5_VERSION;

function v5EnsureState(){
  state.actionFavorites = state.actionFavorites && typeof state.actionFavorites === 'object' ? state.actionFavorites : {};
  state.savedEncounters = Array.isArray(state.savedEncounters) ? state.savedEncounters : [];
  state.trash = Array.isArray(state.trash) ? state.trash : [];
  state.sessionLibrary = Array.isArray(state.sessionLibrary) ? state.sessionLibrary : [];
  state.encounter = state.encounter || blankState().encounter;
  state.encounter.lastTargets = state.encounter.lastTargets || {};
  state.encounter.participants = (state.encounter.participants || []).map(normalizeParticipant);
  state.version = V5_VERSION;
}

function v5PersistState(){
  v5EnsureState();
  state.savedAt = Date.now();
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(err){ console.warn('ENCOUNTER V5 : sauvegarde locale impossible', err); }
  if(typeof v4DbPut === 'function') v4DbPut('state',{savedAt:state.savedAt,state:clone(state)});
}

// ---------------------------------------------------------------------------
// Undo / Redo V5 — historique mémoire fiable, sans saturer localStorage.
// Les anciennes versions tentaient de sérialiser jusqu'à 60 états complets
// dans localStorage ; la bibliothèque intégrée rendait ce stockage trop lourd
// sur iPad. V5 conserve 30 états en mémoire et le state courant reste, lui,
// sauvegardé normalement dans localStorage + IndexedDB.
// ---------------------------------------------------------------------------
const v5History = {past:[], future:[], restoring:false};

function v5Snapshot(){ return JSON.stringify(state); }
function v5PushUnique(stack,snapshot){
  if(stack[stack.length-1] !== snapshot) stack.push(snapshot);
  while(stack.length > V5_HISTORY_LIMIT) stack.shift();
}
function v5Checkpoint(){
  if(v5History.restoring) return;
  v5PushUnique(v5History.past, v5Snapshot());
  v5History.future.length = 0;
  v5UpdateHistoryButtons();
}
function v5Restore(snapshot){
  const parsed = JSON.parse(snapshot);
  v5History.restoring = true;
  try{
    state = typeof normalizeV4State === 'function' ? (normalizeV4State(parsed) || parsed) : parsed;
    v5EnsureState();
    ui.targeting = null;
    ui.multiSelection.clear();
    ui.pendingAdvance = false;
    v5PersistState();
    render();
  } finally {
    v5History.restoring = false;
  }
}
function v5Undo(){
  if(!v5History.past.length){ toast('Rien à annuler.'); v5UpdateHistoryButtons(); return false; }
  const current = v5Snapshot();
  const previous = v5History.past.pop();
  v5PushUnique(v5History.future,current);
  try{
    v5Restore(previous);
    toast('Dernière action annulée.');
    v5UpdateHistoryButtons();
    return true;
  }catch(err){
    console.error(err);
    v5PushUnique(v5History.past,previous);
    toast('Impossible d’annuler cette action.');
    v5UpdateHistoryButtons();
    return false;
  }
}
function v5Redo(){
  if(!v5History.future.length){ toast('Rien à rétablir.'); v5UpdateHistoryButtons(); return false; }
  const current = v5Snapshot();
  const next = v5History.future.pop();
  v5PushUnique(v5History.past,current);
  try{
    v5Restore(next);
    toast('Action rétablie.');
    v5UpdateHistoryButtons();
    return true;
  }catch(err){
    console.error(err);
    v5PushUnique(v5History.future,next);
    toast('Impossible de rétablir cette action.');
    v5UpdateHistoryButtons();
    return false;
  }
}
function v5UpdateHistoryButtons(){
  ['btnUndo','btnUndoDrawer'].forEach(id=>{const b=document.getElementById(id);if(b)b.disabled=!v5History.past.length;});
  ['btnRedo','btnRedoDrawer'].forEach(id=>{const b=document.getElementById(id);if(b)b.disabled=!v5History.future.length;});
}

// Remplace la fonction réellement appelée par toutes les mutations existantes.
checkpoint = v5Checkpoint;
undo = v5Undo;
window.ENCOUNTER_UNDO = v5Undo;
window.ENCOUNTER_REDO = v5Redo;

// Les anciennes piles persistées sont inutiles et peuvent occuper plusieurs Mo.
try{
  localStorage.removeItem('encounter-console-undo-v43');
  localStorage.removeItem('encounter-console-undo-v44');
}catch(_){/* rien */}
undoStack = [];

// ---------------------------------------------------------------------------
// Filtres de combat — ne masquent jamais des cibles pendant un ciblage.
// ---------------------------------------------------------------------------
function v5MatchesCombatFilter(p,filter){
  if(!p) return false;
  if(filter === 'all') return true;
  if(filter === 'injured') return !isLair(p) && p.hp < p.maxHp;
  if(filter === 'states') return !isLair(p) && (!!p.conditions?.length || p.tempHp>0 || (typeof v44DeathSaveActive==='function' && v44DeathSaveActive(p)));
  if(filter === 'boss') return !isLair(p) && isBossParticipant(p);
  return true;
}
function v5CombatFilterCount(filter){
  return (state.encounter.participants||[]).filter(p=>v5MatchesCombatFilter(p,filter)).length;
}
function v5RenderCombatFilters(){
  const wrap=$('#v5CombatFilters'); if(!wrap) return;
  const labels={all:'Tous',injured:'Blessés',states:'États',boss:'Boss'};
  wrap.querySelectorAll('[data-v5-combat-filter]').forEach(b=>{
    const key=b.dataset.v5CombatFilter;
    b.classList.toggle('active',ui.v5CombatFilter===key);
    const count=v5CombatFilterCount(key);
    b.innerHTML=`${labels[key]||key}<span>${count}</span>`;
  });
  wrap.classList.toggle('filter-bypassed',!!ui.targeting);
}

const v5RenderCombatBase = renderCombat;
renderCombat = function(){
  const entries=groupedEntries(),active=activeParticipant();
  const shown = ui.targeting ? entries : entries.filter(entry=>entry.members.some(p=>v5MatchesCombatFilter(p,ui.v5CombatFilter)));
  const host=$('#combatList');
  if(host){
    host.innerHTML=shown.length?shown.map(entry=>entry.type==='group'?renderGroupCard(entry.members,active):renderSingleCard(entry.members[0],active)).join(''):
      `<div class="empty-combat">Aucun participant pour ce filtre.<br><button type="button" class="ghost small" data-v5-combat-filter="all">Afficher tous</button></div>`;
  }else v5RenderCombatBase();
  v5RenderCombatFilters();
};

// ---------------------------------------------------------------------------
// Sauvegardes contre la mort directement visibles dans la liste COMBAT.
// ---------------------------------------------------------------------------
function v5DeathInline(p){
  if(typeof v44DeathSaveActive!=='function' || !v44DeathSaveActive(p)) return '';
  const s=Math.max(0,Math.min(3,Number(p.deathSuccesses)||0));
  const f=Math.max(0,Math.min(3,Number(p.deathFailures)||0));
  const skulls=(count,type)=>Array.from({length:3},(_,i)=>`<i class="${type} ${i<count?'lit':''}">☠</i>`).join('');
  return `<button type="button" class="v5-death-inline" data-death-save-open="${p.id}" title="Jets de sauvegarde contre la mort"><span class="success">${skulls(s,'success')}</span><b>${s}/3</b><span class="failure">${skulls(f,'failure')}</span><b>${f}/3</b></button>`;
}
const v5RenderSingleCardBase = renderSingleCard;
renderSingleCard = function(p,active){
  let html=v5RenderSingleCardBase(p,active);
  const death=v5DeathInline(p);
  if(death) html=html.replace('<div class="condition-pills">',`${death}<div class="condition-pills">`);
  return html;
};

// ---------------------------------------------------------------------------
// Actions favorites + raccourcis contextuels.
// ---------------------------------------------------------------------------
function v5FavoriteKey(p){ return p?.modelId || `instance:${p?.baseName||p?.name||'participant'}`; }
function v5FavoriteList(p){
  const key=v5FavoriteKey(p); const list=state.actionFavorites?.[key];
  return Array.isArray(list)?list:[];
}
function v5IsFavorite(p,aid){ return v5FavoriteList(p).includes(aid); }
function v5ToggleFavorite(pid,aid){
  const p=state.encounter.participants.find(x=>x.id===pid); if(!p) return;
  checkpoint();
  const key=v5FavoriteKey(p),list=[...v5FavoriteList(p)],i=list.indexOf(aid);
  if(i>=0) list.splice(i,1); else { if(list.length>=4) list.shift(); list.push(aid); }
  state.actionFavorites[key]=list;
  saveState(); render();
  toast(i>=0?'Raccourci retiré.':'Action ajoutée aux raccourcis.');
}
function v5AbilitySection(m,aid){
  if(m.actions?.some(a=>a.id===aid)) return 'action';
  if(m.reactions?.some(a=>a.id===aid)) return 'reaction';
  if(m.legendaryActions?.some(a=>a.id===aid)) return 'legendary';
  if(m.lairActions?.some(a=>a.id===aid)) return 'lair';
  if(m.traits?.some(a=>a.id===aid)) return 'action';
  return 'action';
}
function v5FindAbility(m,aid){ return [...(m.actions||[]),...(m.reactions||[]),...(m.legendaryActions||[]),...(m.lairActions||[]),...(m.traits||[])].find(a=>a.id===aid); }
function v5ShortcutUnavailable(p,a,section){
  if(!p||!a) return true;
  const st=p.abilityState?.[a.id]||{ready:true},eco=abilityEconomy(a,section),max=attacksPerAction(p),progress=Math.min(max,p.attackProgress||0);
  const continuation=eco==='action'&&a.kind==='attack'&&p.actionUsed&&progress<max;
  const spent=eco==='action'?p.actionUsed:eco==='bonus'?p.bonusActionUsed:eco==='reaction'?p.reactionUsed:false;
  return (a.kind==='recharge'&&!st.ready)||(section==='legendary'&&p.legendaryRemaining<(a.cost||1))||(section==='lair'&&p.actionUsed)||(section!=='legendary'&&section!=='lair'&&spent&&!continuation);
}
function v5ShortcutCandidates(p,m){
  const favorites=v5FavoriteList(p).map(id=>({a:v5FindAbility(m,id),section:v5AbilitySection(m,id)})).filter(x=>x.a);
  if(favorites.length) return favorites.slice(0,4);
  const auto=[];
  (m.actions||[]).filter(a=>a.kind!=='text').slice(0,4).forEach(a=>auto.push({a,section:'action'}));
  if(auto.length<4)(m.reactions||[]).slice(0,4-auto.length).forEach(a=>auto.push({a,section:'reaction'}));
  return auto.slice(0,4);
}
function v5ShortcutPanel(p,m){
  if(!m||isLair(p)) return '';
  const rows=v5ShortcutCandidates(p,m),remembered=state.encounter.participants.find(x=>x.id===state.encounter.lastTargets?.[p.id]);
  const auto=!v5FavoriteList(p).length;
  const buttons=rows.length?rows.map(({a,section})=>{
    const disabled=v5ShortcutUnavailable(p,a,section),eco=abilityEconomy(a,section);
    const tag=section==='legendary'?`${a.cost||1}★`:eco==='bonus'?'B':eco==='reaction'?'R':eco==='action'?'A':'•';
    return `<button type="button" class="v5-shortcut ${disabled?'disabled':''}" ${disabled?'disabled':''} data-use-ability="${p.id}|${a.id}|${section}|normal"><span>${esc(a.name)}</span><small>${tag}${a.kind==='recharge'&&p.abilityState?.[a.id]?.ready===false?' · recharge':''}</small></button>`;
  }).join(''):`<span class="v5-shortcut-empty">Aucune action exploitable.</span>`;
  return `<section class="v5-shortcuts"><div class="v5-shortcuts-head"><div><span class="eyebrow">RACCOURCIS DU TOUR</span><strong>${auto?'Actions suggérées':'Actions favorites'}</strong></div>${remembered?`<span class="v5-last-target">🎯 ${esc(remembered.name)}</span>`:''}</div><div class="v5-shortcut-grid">${buttons}</div>${auto?'<small class="v5-shortcut-help">Touche ☆ sur une action de la fiche pour choisir jusqu’à 4 raccourcis.</small>':''}</section>`;
}

const v5AbilityCardBase = abilityCard;
abilityCard = function(p,a,section){
  let html=v5AbilityCardBase(p,a,section);
  if(!p||!a||section==='lair') return html;
  const on=v5IsFavorite(p,a.id);
  const star=`<button type="button" class="v5-favorite-star ${on?'on':''}" data-v5-favorite="${p.id}|${a.id}" title="${on?'Retirer des raccourcis':'Ajouter aux raccourcis'}">${on?'★':'☆'}</button>`;
  return html.replace('<div class="ability-head">',`<div class="ability-head">${star}`);
};

// ---------------------------------------------------------------------------
// Contexte cible et boss dans la fiche, sans retirer les informations V4.4.
// ---------------------------------------------------------------------------
function v5BossStrip(p,m){
  if(!m||!isBossParticipant(p)) return '';
  const cur=currentPhase(p,m),next=nextPhase(p,m),cap=effectiveLegendaryMax(p,m);
  return `<section class="v5-boss-strip"><span class="v5-boss-title">BOSS</span><span>${cur?esc(cur.name):'Phase initiale'}</span>${next?`<span>Prochain seuil : <b>${next.threshold} PV</b></span>`:''}${cap?`<span>Actions légendaires : <b>${p.legendaryRemaining}/${cap}</b></span>`:''}</section>`;
}
const v5RenderDetailBase = renderDetail;
renderDetail = function(){
  v5RenderDetailBase();
  const p=selectedParticipant(),root=$('#activeDetail'); if(!p||!root||isLair(p)) return;
  const m=modelFor(p);
  const command=root.querySelector('.turn-command-center');
  const shortcuts=v5ShortcutPanel(p,m);
  const boss=v5BossStrip(p,m);
  const anchor=command||root.querySelector('.detail-header');
  if(anchor && shortcuts) anchor.insertAdjacentHTML('afterend',shortcuts);
  const shortcut=root.querySelector('.v5-shortcuts');
  if((shortcut||anchor) && boss) (shortcut||anchor).insertAdjacentHTML('afterend',boss);
};

// ---------------------------------------------------------------------------
// Mode Focus optionnel — désactivé par défaut. Il compacte, il ne supprime
// aucune fonctionnalité et se désactive en un toucher.
// ---------------------------------------------------------------------------
function v5ApplyFocus(){
  document.body.classList.toggle('v5-focus',!!ui.v5Focus && state.ui.mode==='combat');
  const b=$('#btnCombatFocus'); if(b){b.classList.toggle('active',!!ui.v5Focus);b.textContent=ui.v5Focus?'◫ Focus ON':'◫ Focus';}
}
function v5ToggleFocus(){
  ui.v5Focus=!ui.v5Focus;
  try{localStorage.setItem(V5_FOCUS_KEY,ui.v5Focus?'1':'0');}catch(_){/* rien */}
  v5ApplyFocus();
}

// ---------------------------------------------------------------------------
// Render final V5 : une couche de décoration après le render V4.4.
// ---------------------------------------------------------------------------
const v5RenderBase = render;
render = function(){
  v5RenderBase();
  v5RenderCombatFilters();
  v5UpdateHistoryButtons();
  v5ApplyFocus();
  const brand=$('.brand p'); if(brand) brand.textContent='Console MJ · V5 Rebuild';
  const eyebrow=$('#homeView .home-brand-block .eyebrow'); if(eyebrow) eyebrow.textContent='ENCOUNTER V5';
};

// ---------------------------------------------------------------------------
// Délégation V5. On n'intercepte que les nouveaux contrôles.
// ---------------------------------------------------------------------------
addEventListener('click',e=>{
  const b=e.target.closest('button'); if(!b) return;
  if(b.id==='btnRedo'||b.id==='btnRedoDrawer'){
    e.preventDefault();e.stopImmediatePropagation();v5Redo();return;
  }
  if(b.dataset.v5CombatFilter){
    e.preventDefault();e.stopImmediatePropagation();ui.v5CombatFilter=b.dataset.v5CombatFilter;renderCombat();return;
  }
  if(b.dataset.v5Favorite){
    e.preventDefault();e.stopImmediatePropagation();const [pid,aid]=b.dataset.v5Favorite.split('|');v5ToggleFavorite(pid,aid);return;
  }
  if(b.id==='btnCombatFocus'){
    e.preventDefault();e.stopImmediatePropagation();v5ToggleFocus();return;
  }
},true);

// L'ancien gestionnaire capture #btnUndo mais appelle la variable `undo`.
// Celle-ci pointe déjà sur v5Undo ; on garde aussi ce filet de sécurité.
addEventListener('click',e=>{
  const b=e.target.closest('#btnUndo,#btnUndoDrawer'); if(!b) return;
  // Si un ancien listener n'a pas déjà stoppé l'événement, on assure l'Undo V5.
  if(e.defaultPrevented) return;
  e.preventDefault(); e.stopImmediatePropagation(); v5Undo();
},true);

// ---------------------------------------------------------------------------
// Initialisation. Aucune migration destructive : on conserve exactement
// le stockage V4.4, les participants, les profils et les rencontres.
// ---------------------------------------------------------------------------
function v5Init(){
  v5EnsureState();
  // Point de départ : l'état au chargement n'est pas une action à annuler.
  v5History.past.length=0;v5History.future.length=0;
  v5PersistState();
  render();
  if(!localStorage.getItem('encounter-v5-rebuild-migrated')){
    if(typeof forceBackup==='function') forceBackup('Migration vers ENCOUNTER V5 Rebuild — base V4.4 conservée');
    localStorage.setItem('encounter-v5-rebuild-migrated','1');
  }
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',v5Init,{once:true}); else v5Init();
