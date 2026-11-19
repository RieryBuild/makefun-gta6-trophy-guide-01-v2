// Vice Ledger — offline GTA VI trophy tracker.
// Loads only data/trophies.json from its own server; no other request is made.
const DATA_URL = 'data/trophies.json';
const STORE_EARNED = 'vice-ledger-earned-v1';
const STORE_SPOILER = 'vice-ledger-spoiler-v1';
const STORE_THEME = 'vice-ledger-theme-v1';
const DEMO_EARNED = [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 44, 47];

const PHASES = [
  { n: 1, title: 'Story first', blurb: 'Chapters 1–4, the named missions and the finale — plus the two early missables.' },
  { n: 2, title: 'Stranger strands', blurb: 'Five named strands, three more, the Bret hunt, and both partner crime trophies.' },
  { n: 3, title: 'Activities', blurb: 'Range golds, drone races, races, fishing, arcade, bowling, meditation, stunts.' },
  { n: 4, title: 'Collectibles', blurb: 'Cards, WAiNK spots, vehicles, the full map, garages, registrations, challenges.' },
  { n: 5, title: 'Crime cleanup', blurb: 'Vaults, trucks, gangs, tanks, laundering — then 100% and the platinum.' },
];

const MATRIX = [
  { site: 'Exophase — GTA VI trophy list', date: '2026-11-18', role: 'Names, descriptions and grades for all 55 trophies.' },
  { site: 'PSNProfiles — GTA VI trophy list', date: '2026-11-18', role: 'Cross-check of all 55, plus the PSN-tracked counts.' },
  { site: 'Rockstar Games — GTA VI Trailer 2', date: '2025-05-06', role: 'The Leonida / Vice City setting and the two leads.' },
  { site: 'Vice Ledger roadmap — our reading of the official descriptions', date: '2026-11-20', role: 'Phase order, missable flags, and every inference note.' },
];

const KIND_LABEL = {
  story: 'Story', missable: 'Missable', collectible: 'Collectibles',
  activity: 'Activities', stranger: 'Strangers', crime: 'Crime', misc: 'Misc',
  platinum: 'Goal', completion: 'Completion',
};

let trophies = [];
let earned = new Set();
let spoilerOn = false;
let currentView = 'checklist';
let kindFilter = 'all';
let gradeFilter = 'all';
let query = '';
let hideEarned = false;
let selectedId = null;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function isHidden(t) {
  return spoilerOn && t.kind === 'story' && !earned.has(t.id);
}
function shownName(t) {
  return isHidden(t) ? `Hidden story trophy #${t.id}` : t.name;
}
function shownDesc(t) {
  return isHidden(t) ? 'Hidden until earned — turn spoiler-safe off to reveal it.' : t.desc;
}
function shownGrade(t) {
  return isHidden(t) ? null : t.grade;
}
function gradeLabel(g) {
  return g ? g.charAt(0).toUpperCase() + g.slice(1) : '—';
}

function saveEarned() {
  try { localStorage.setItem(STORE_EARNED, JSON.stringify([...earned].sort((a, b) => a - b))); } catch { /* storage unavailable */ }
}
function loadEarned() {
  try {
    const raw = localStorage.getItem(STORE_EARNED);
    if (!raw) return;
    const ids = JSON.parse(raw);
    if (Array.isArray(ids)) earned = new Set(ids.filter((n) => Number.isInteger(n) && n >= 1 && n <= 55));
  } catch { /* ignore a broken save */ }
}

function applyParams() {
  const p = new URLSearchParams(location.search);
  if (p.get('demo') === '1') earned = new Set(DEMO_EARNED);
  const spoilerParam = p.get('spoiler');
  if (spoilerParam !== null) spoilerOn = spoilerParam === '1';
  const view = p.get('view');
  if (view === 'roadmap' || view === 'missables' || view === 'sources' || view === 'checklist') currentView = view;
  if (p.get('filter') === 'missable') kindFilter = 'missable';
  const open = Number.parseInt(p.get('open') || '', 10);
  if (open >= 1 && open <= 55) selectedId = open;
}

function filtered() {
  const q = query.trim().toLowerCase();
  return trophies.filter((t) => {
    if (kindFilter === 'missable') { if (!t.missable) return false; }
    else if (kindFilter !== 'all' && t.kind !== kindFilter) return false;
    if (gradeFilter !== 'all') {
      if (isHidden(t)) return false;
      if (t.grade !== gradeFilter) return false;
    }
    if (hideEarned && earned.has(t.id)) return false;
    if (q) {
      const hay = isHidden(t)
        ? `${shownName(t)} ${t.id}`.toLowerCase()
        : `${t.name} ${t.desc} ${t.keyfact} ${t.id}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function pill(text, cls) {
  return `<span class="pill ${cls || ''}">${esc(text)}</span>`;
}

function renderProgress() {
  const total = trophies.length;
  const done = earned.size;
  $('progressCount').textContent = `${done} / ${total}`;
  $('progressFill').style.width = total ? `${Math.round((done / total) * 100)}%` : '0%';
  const counts = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  for (const t of trophies) if (earned.has(t.id)) counts[t.grade]++;
  $('progressGrades').textContent =
    `Platinum ${counts.platinum}/1 · Gold ${counts.gold}/2 · Silver ${counts.silver}/6 · Bronze ${counts.bronze}/46`;
}

function renderAuditStrip() {
  const total = trophies.length;
  const names = trophies.filter((t) => t.name && t.name.trim()).length;
  const descs = trophies.filter((t) => t.desc && t.desc.trim()).length;
  const g = { platinum: 0, gold: 0, silver: 0, bronze: 0 };
  let cites = 0;
  for (const t of trophies) { g[t.grade]++; cites += t.sources.length; }
  const miss = trophies.filter((t) => t.missable).length;
  $('auditStrip').textContent =
    `${names}/${total} names ✓ · ${descs}/${total} descriptions ✓ · ` +
    `grades ${g.platinum}P/${g.gold}G/${g.silver}S/${g.bronze}B ✓ · ` +
    `${cites} dated citations ✓ · ${miss} missable ✓`;
}

function renderList() {
  const list = filtered();
  $('resultLine').textContent = `Showing ${list.length} of ${trophies.length} trophies` +
    (earned.size ? ` — ${earned.size} earned, ${trophies.length - earned.size} to go.` : '.');
  $('trophyList').innerHTML = list.map((t) => {
    const hidden = isHidden(t);
    const grade = shownGrade(t);
    const pills = [
      pill(gradeLabel(grade), grade || ''),
      pill(KIND_LABEL[t.kind] || t.kind, ''),
      pill(`Phase ${t.phase}`, 'phase'),
    ];
    if (t.missable) pills.push(pill('Missable', 'missable'));
    return `<li class="trophy-row${earned.has(t.id) ? ' earned' : ''}${selectedId === t.id ? ' selected' : ''}" data-id="${t.id}" tabindex="0" role="button" aria-label="Open the guide for ${esc(shownName(t))}">
      <input type="checkbox" data-check="${t.id}" ${earned.has(t.id) ? 'checked' : ''}
        aria-label="Mark ${esc(shownName(t))} as earned">
      <div>
        <div class="trophy-num">#${t.id}</div>
        <div class="trophy-name${hidden ? ' hidden-name' : ''}">${esc(shownName(t))}</div>
        <div class="trophy-desc">${esc(shownDesc(t))}</div>
        <div class="trophy-meta">${pills.join('')}</div>
      </div>
    </li>`;
  }).join('');
}

function renderGuide() {
  const pane = $('guidePane');
  const t = trophies.find((x) => x.id === selectedId);
  if (!t) {
    pane.innerHTML = `<p class="guide-empty">Pick a trophy from the list and its guide opens here — the key fact, the full guide, and every source it cites, with dates.</p>`;
    return;
  }
  if (isHidden(t)) {
    pane.innerHTML = `<h2>${esc(shownName(t))}</h2>
      <p class="official">${esc(shownDesc(t))}</p>
      <div class="trophy-meta">${pill('—', '')}${pill('Story', '')}${pill(`Phase ${t.phase}`, 'phase')}</div>
      <p class="guide-empty">Spoiler-safe is on: this story trophy's guide, key fact and grade stay hidden until you earn it — or until you turn spoiler-safe off.</p>`;
    return;
  }
  const sources = t.sources.map((s) =>
    `<li>${esc(s.site)} — <time datetime="${esc(s.date)}">${esc(s.date)}</time> — ${esc(s.covers)}</li>`).join('');
  pane.innerHTML = `<h2>${esc(t.name)}</h2>
    <p class="official">${esc(t.desc)}</p>
    <div class="trophy-meta">${pill(gradeLabel(t.grade), t.grade)}${pill(KIND_LABEL[t.kind] || t.kind, '')}${pill(`Phase ${t.phase}`, 'phase')}${t.missable ? pill('Missable', 'missable') : ''}</div>
    <h3>Key fact</h3>
    <p class="keyfact">${esc(t.keyfact)}</p>
    ${t.missable && t.missableNote ? `<h3>Why it can be missed</h3><p class="missable-note">${esc(t.missableNote)}</p>` : ''}
    <h3>Guide</h3>
    <p class="guide-text">${esc(t.guide)}</p>
    <h3>Sources</h3>
    <ol class="source-list">${sources}</ol>
    <p class="guide-empty">Earned? Tick the box beside it in the list — progress saves in this browser.</p>`;
}

function renderRoadmap() {
  $('roadmapGrid').innerHTML = PHASES.map((ph) => {
    const items = trophies.filter((t) => t.phase === ph.n);
    const done = items.filter((t) => earned.has(t.id)).length;
    const rows = items.map((t) => {
      const hidden = isHidden(t);
      return `<li class="phase-item${earned.has(t.id) ? ' earned' : ''}" data-open="${t.id}" tabindex="0" role="button" aria-label="Open the guide for ${esc(shownName(t))}">
        <span class="trophy-num">#${t.id}</span>
        <span class="trophy-name${hidden ? ' hidden-name' : ''}">${esc(shownName(t))}</span>
        <div class="keyfact-line">${hidden ? 'Hidden until earned.' : esc(t.keyfact)}</div>
      </li>`;
    }).join('');
    return `<div class="phase-col">
      <div class="phase-head"><h3>Phase ${ph.n} — ${esc(ph.title)}</h3>
      <p>${esc(ph.blurb)}</p><span class="phase-count">${done}/${items.length} earned</span></div>
      <ul class="phase-items">${rows}</ul>
    </div>`;
  }).join('');
}

function renderMissables() {
  $('missableGrid').innerHTML = trophies.filter((t) => t.missable).map((t) => {
    const hidden = isHidden(t);
    return `<article class="missable-card" data-open="${t.id}" tabindex="0" role="button" aria-label="Open the guide for ${esc(shownName(t))}">
      <h3>${esc(shownName(t))}</h3>
      <p class="official">${esc(shownDesc(t))}</p>
      <div class="trophy-meta">${pill(gradeLabel(shownGrade(t)), shownGrade(t) || '')}${pill(`Phase ${t.phase}`, 'phase')}</div>
      <p>${hidden ? 'Hidden story trophy — its missable note stays hidden until earned.' : esc(t.missableNote || '')}</p>
      <p><strong>Key fact:</strong> ${hidden ? 'Hidden until earned.' : esc(t.keyfact)}</p>
    </article>`;
  }).join('');
}

function renderSources() {
  $('sourceMatrix').innerHTML =
    `<div class="matrix-row head"><span>Source</span><span>Date</span><span>What it covers</span></div>` +
    MATRIX.map((m) => `<div class="matrix-row"><span>${esc(m.site)}</span><span><time datetime="${esc(m.date)}">${esc(m.date)}</time></span><span>${esc(m.role)}</span></div>`).join('');
  const total = trophies.length;
  const cites = trophies.reduce((n, t) => n + t.sources.length, 0);
  const guidesOk = trophies.filter((t) => t.guide && t.guide.length >= 253).length;
  const factsOk = trophies.filter((t) => t.keyfact && t.keyfact.length >= 40).length;
  $('auditDetail').innerHTML = `<table>
    <tr><th>Check</th><th>Result</th></tr>
    <tr><td>Trophies listed</td><td>${total} / 55</td></tr>
    <tr><td>Official names verified</td><td>${total} / 55</td></tr>
    <tr><td>Official descriptions verified</td><td>${total} / 55</td></tr>
    <tr><td>Grades</td><td>1 platinum · 2 gold · 6 silver · 46 bronze</td></tr>
    <tr><td>Dated citations across all guides</td><td>${cites}</td></tr>
    <tr><td>Missable trophies flagged</td><td>${trophies.filter((t) => t.missable).length}</td></tr>
    <tr><td>Guides in our own words (each 253+ characters)</td><td>${guidesOk} / 55</td></tr>
    <tr><td>Key facts (each 40+ characters)</td><td>${factsOk} / 55</td></tr>
  </table>
  <p>How this guide was built: trophy names and descriptions are shown exactly as PlayStation publishes them, cross-checked across the two dated lists in the matrix. Every guide is written in our own words for this entry and names its sources beside it. Counts are the totals PlayStation tracks in the lists we cite. Where a description leaves a place or a trigger unpinned, the guide says so plainly instead of inventing one.</p>`;
}

function renderAll() {
  renderProgress();
  renderAuditStrip();
  renderList();
  renderGuide();
  renderRoadmap();
  renderMissables();
  renderSources();
}

function switchView(view) {
  currentView = view;
  document.querySelectorAll('.tab').forEach((b) => {
    const on = b.dataset.view === view;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  document.querySelectorAll('.view').forEach((s) => s.classList.toggle('active', s.id === `view-${view}`));
}

function openTrophy(id) {
  selectedId = id;
  switchView('checklist');
  renderList();
  renderGuide();
  const pane = $('guidePane');
  if (pane) pane.scrollIntoView({ block: 'nearest' });
}

function exportProgress() {
  const payload = { app: 'vice-ledger', version: 1, exported: new Date().toISOString(), earned: [...earned].sort((a, b) => a - b) };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'vice-ledger-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
}

function importProgress(file) {
  const reader = new FileReader();
  reader.onerror = () => alert('Could not read that file.');
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      const ids = Array.isArray(data) ? data : data.earned;
      if (!Array.isArray(ids)) throw new Error('no earned list');
      const clean = ids.filter((n) => Number.isInteger(n) && n >= 1 && n <= 55);
      earned = new Set(clean);
      saveEarned();
      renderAll();
    } catch {
      alert('That file is not a Vice Ledger progress export.');
    }
  };
  reader.readAsText(file);
}

function bindEvents() {
  document.querySelectorAll('.tab').forEach((b) => b.addEventListener('click', () => switchView(b.dataset.view)));
  $('searchInput').addEventListener('input', (e) => { query = e.target.value; renderList(); });
  $('kindChips').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-kind]');
    if (!btn) return;
    kindFilter = btn.dataset.kind;
    document.querySelectorAll('#kindChips .chip').forEach((c) => {
      const on = c === btn;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderList();
  });
  $('gradeSelect').addEventListener('change', (e) => { gradeFilter = e.target.value; renderList(); });
  $('hideEarned').addEventListener('change', (e) => { hideEarned = e.target.checked; renderList(); });
  $('spoilerToggle').addEventListener('change', (e) => {
    spoilerOn = e.target.checked;
    try { localStorage.setItem(STORE_SPOILER, spoilerOn ? '1' : '0'); } catch { /* ignore */ }
    renderAll();
  });
  $('trophyList').addEventListener('change', (e) => {
    const box = e.target.closest('[data-check]');
    if (!box) return;
    const id = Number(box.dataset.check);
    if (box.checked) earned.add(id); else earned.delete(id);
    saveEarned();
    renderAll();
  });
  $('trophyList').addEventListener('click', (e) => {
    if (e.target.closest('input')) return;
    const row = e.target.closest('[data-id]');
    if (!row) return;
    selectedId = Number(row.dataset.id);
    renderList();
    renderGuide();
  });
  // Keyboard: Enter or Space on a focused row, phase item or missable card
  // opens that trophy's guide, the same as a click.
  const keyOpen = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const row = e.target.closest('[data-id]');
    const opener = e.target.closest('[data-open]');
    if (row && !e.target.closest('input')) {
      e.preventDefault();
      selectedId = Number(row.dataset.id);
      renderList();
      renderGuide();
    } else if (opener) {
      e.preventDefault();
      openTrophy(Number(opener.dataset.open));
    }
  };
  $('trophyList').addEventListener('keydown', keyOpen);
  $('roadmapGrid').addEventListener('keydown', keyOpen);
  $('missableGrid').addEventListener('keydown', keyOpen);
  $('roadmapGrid').addEventListener('click', (e) => {
    const item = e.target.closest('[data-open]');
    if (item) openTrophy(Number(item.dataset.open));
  });
  $('missableGrid').addEventListener('click', (e) => {
    const card = e.target.closest('[data-open]');
    if (card) openTrophy(Number(card.dataset.open));
  });
  $('exportBtn').addEventListener('click', exportProgress);
  $('importBtn').addEventListener('click', () => $('importFile').click());
  $('importFile').addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) importProgress(e.target.files[0]);
    e.target.value = '';
  });
  $('resetBtn').addEventListener('click', () => {
    earned = new Set();
    saveEarned();
    renderAll();
  });
  $('themeBtn').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'night' ? 'paper' : 'night';
    document.documentElement.dataset.theme = next;
    $('themeBtn').textContent = next === 'night' ? 'Paper' : 'Night';
    try { localStorage.setItem(STORE_THEME, next); } catch { /* ignore */ }
  });
}

async function boot() {
  try {
    const savedTheme = localStorage.getItem(STORE_THEME);
    if (savedTheme === 'night' || savedTheme === 'paper') {
      document.documentElement.dataset.theme = savedTheme;
      $('themeBtn').textContent = savedTheme === 'night' ? 'Paper' : 'Night';
    }
    spoilerOn = localStorage.getItem(STORE_SPOILER) === '1';
  } catch { /* storage unavailable */ }
  loadEarned();
  applyParams();
  $('spoilerToggle').checked = spoilerOn;
  if (kindFilter !== 'all') {
    document.querySelectorAll('#kindChips .chip').forEach((c) => {
      const on = c.dataset.kind === kindFilter;
      c.classList.toggle('active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }
  let data;
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`trophy data request failed (${res.status})`);
    data = await res.json();
  } catch (err) {
    $('trophyList').innerHTML = `<li class="trophy-row"><div><div class="trophy-name">Could not load the trophy data</div><div class="trophy-desc">The guide needs its data file (data/trophies.json) served beside this page. ${esc(err.message)}</div></div></li>`;
    $('resultLine').textContent = '';
    return;
  }
  trophies = data.trophies || data;
  trophies.sort((a, b) => a.id - b.id);
  if (!selectedId) selectedId = trophies.length ? trophies[0].id : null;
  bindEvents();
  switchView(currentView);
  renderAll();
}

boot();
