// Build data/colorpie.js from the Notion CSV exports in ../Notion Exports/.
// Zero dependencies (uses ./csv.js). Run: node scripts/build-data.js [--check]
//
// Join:
//   - Example Cards:  card name -> image URL
//   - Effects Rankings (by Effect title) -> per-color tier {W..C: primary|secondary|tertiary|null}
//   - Effects: each row -> one effect; tier looked up via its `Ranking` relation
//     (canonical base title), which also groups variants under their base.
'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('./csv.js');

const DIR = path.join(__dirname, '..', 'Notion Exports');
if (!fs.existsSync(DIR)) {
  console.error('No "Notion Exports/" folder (it is gitignored). To refresh: export\n' +
    'Effects, Effects Rankings and Example Cards from Notion as CSV into\n' +
    '"Notion Exports/", then re-run: node scripts/build-data.js --check');
  process.exit(1);
}
const read = f => parse(fs.readFileSync(path.join(DIR, f), 'utf8')).rows;

const SENTINELS = ['🚫 Not in Pie', '❌ Not printed'];
const COLS = [['⚪ White','W'],['🔵 Blue','U'],['⚫ Black','B'],['🔴 Red','R'],['🟢 Green','G'],['◇ Colorless','C'],['🟡 MultiColor','Y']];
const CNAME2KEY = { White:'W', Blue:'U', Black:'B', Red:'R', Green:'G', Colorless:'C' };
const EMPTY_RANK = () => ({ W:null, U:null, B:null, R:null, G:null, C:null });

// Notion relation cells look like: "Name (https://…), Other Name (https://…)".
// Names can contain BOTH commas ("Sram, Senior Edificer") and parentheses
// ("Creature pumping — +N/+N (Auras)"), so anchor on the "(url)" boundary:
// the name is everything up to " (http…)" that ends at ", " or end-of-cell.
function relNames(cell) {
  if (!cell) return [];
  const out = [];
  const re = /(.*?)\s*\((https?:\/\/[^)]+)\)(?=,\s|$)/g;
  let m;
  while ((m = re.exec(cell))) {
    const n = m[1].replace(/^[,\s]+/, '').trim();
    if (n) out.push(n);
  }
  if (!out.length && cell.trim()) out.push(cell.trim()); // plain-text fallback
  return out;
}
const firstCard = cell => relNames(cell).find(n => SENTINELS.indexOf(n) === -1) || null;

// Bend/Break: emit ALL non-sentinel cards as {i:{name,desc}} (desc looked up by
// name from the paired '{"Card":"note"}' JSON column). A lone undescribed card
// stays a bare string (backward-compat with the string-only renderer).
function bbVal(cell, descRaw) {
  const names = relNames(cell).filter(n => SENTINELS.indexOf(n) === -1);
  if (!names.length) return undefined;
  let desc = {};
  if (descRaw) { try { desc = JSON.parse(descRaw); } catch (e) { /* ponytail: bad JSON → no notes */ } }
  names.forEach(pick);
  if (names.length === 1 && !Object.keys(desc).length) return names[0];
  const obj = {};
  names.forEach((n, i) => { obj[i + 1] = { name: n, desc: desc[n] || '' }; });
  return obj;
}

// Scryfall link tuning: the Notion column stores the pure effect query; the site
// link shows each card's FIRST printing (is:firstprint) ordered by most recent
// release. Applied uniformly here so Notion stays the canonical pure query.
function scryUrl(notionUrl) {
  if (!notionUrl) return '';
  const i = notionUrl.indexOf('?q=');
  if (i === -1) return notionUrl;
  const q = decodeURIComponent(notionUrl.slice(i + 3).split('&')[0]);
  return 'https://scryfall.com/search?q=' + encodeURIComponent(q + ' is:firstprint') + '&order=released&dir=desc';
}

// ---- Example Cards: name -> image url ----
const imgByName = {};
read('Example Cards.csv').forEach(r => {
  const name = r['Card'];
  if (name && !(name in imgByName)) imgByName[name] = r['Image URL'] || r['Image'] || '';
});
// Effects reference cards by name; image URLs live once in CARDS (name -> bare
// Scryfall id, the page rebuilds the URL). `used` collects referenced names.
const SCRY_ID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
const scryId = url => { const m = SCRY_ID.exec(url || ''); return m ? m[0] : (url || ''); };
const used = new Set();
const pick = name => { if (name) used.add(name); return name || undefined; };

// ---- Effects Rankings: effect title -> tier per color ----
const rankByEffect = {};
read('Effects Rankings.csv').forEach(r => {
  if (!r['Effect']) return;
  const rank = EMPTY_RANK();
  // apply weakest first so Primary wins if a color appears twice
  [['Tertiary','tertiary'], ['Secondary','secondary'], ['Primary','primary']].forEach(([col, tier]) => {
    relNames(r[col]).forEach(cn => { const k = CNAME2KEY[cn]; if (k) rank[k] = tier; });
  });
  rankByEffect[r['Effect']] = rank;
});

// ---- Effects ----
const effects = read('Effects.csv')
  // ponytail: keep Notion's "Sort Order" as the natural row order; no-op if the column is absent
  .sort((a, b) => (Number(a['Sort Order']) || 0) - (Number(b['Sort Order']) || 0))
  .map(r => {
  const title = r['Effect'];
  if (!title) return null;
  const base = relNames(r['Ranking'])[0] || title.split(' — ')[0];
  const rank = rankByEffect[base] || EMPTY_RANK();
  const cards = {};
  COLS.forEach(([col, k]) => {
    const c = {};
    const on = firstCard(r[col]);                    if (on) c.onRate = pick(on);
    const ch = firstCard(r[col + ' (Cheapest)']);    if (ch) c.cheapest = pick(ch);
    const od = firstCard(r[col + ' (Outdated)']);    if (od) c.outdated = pick(od);
    const ic = firstCard(r[col + ' (Iconic)']);      if (ic) c.iconic = pick(ic);
    const bn = bbVal(r[col + ' (Bends)'], r[col + ' (Bends Description)']);    if (bn) c.bend = bn;
    const bk = bbVal(r[col + ' (Breaks)'], r[col + ' (Breaks Description)']);  if (bk) c.breaks = bk;
    if (Object.keys(c).length) cards[k] = c;
  });
  return {
    id: r['Index'] || '',        // Notion unique-ID — stable key for review feedback
    title, base,                 // base = group label (Notion Ranking relation), not a real row

    type: r['Type'] || '',
    category: relNames(r['Category'])[0] || '',
    rationale: r['Design Rationale'] || '',
    interaction: r['Interaction'] || '',
    duration: r['Duration'] || '',
    baseKeyword: r['Base Keyword'] || '',
    scryfall: scryUrl(r['Scryfall Query']),
    rank, cards
  };
}).filter(Boolean);

const CARDS = {};
used.forEach(name => { CARDS[name] = scryId(imgByName[name] || ''); });

const banner = '/* GENERATED by scripts/build-data.js from Notion CSV exports — do not edit by hand. */\n';
fs.writeFileSync(path.join(__dirname, '..', 'data', 'colorpie.js'),
  banner +
  'var CARDS = ' + JSON.stringify(CARDS) + ';\n' +
  'var COLORPIE = ' + JSON.stringify(effects) + ';\n');
console.log('Wrote data/colorpie.js —', effects.length, 'effects ·', Object.keys(CARDS).length, 'cards');

// ---- self-check ----
if (process.argv.includes('--check')) {
  const errs = [];
  if (effects.length < 250) errs.push('expected >250 effects, got ' + effects.length);
  const flying = effects.find(e => e.base === 'Flying');
  if (!flying) errs.push('no effect in the "Flying" group found');
  else if (flying.rank.W !== 'primary') errs.push('Flying tier in White = ' + flying.rank.W + ' (expected primary)');
  const unranked = effects.filter(e => !Object.values(e.rank).some(Boolean) && !Object.values(e.cards).some(Boolean));
  if (unranked.length > 20) errs.push(unranked.length + ' effects have no ranking (parser likely dropped relations)');
  const withArt = effects.filter(e =>
    Object.values(e.cards).some(c => Object.values(c).some(n => CARDS[n]))).length;
  if (withArt < 100) errs.push('only ' + withArt + ' effects have card art (expected >100)');
  // id is the review system's stable key (Notion Index/unique_id). Empty or
  // duplicate ids silently break feedback save/load + prev/next — fail loudly.
  const noId = effects.filter(e => !e.id).length;
  if (noId) errs.push(noId + ' effects have an empty id (Notion "Index" unique_id missing?)');
  const ids = effects.map(e => e.id).filter(Boolean);
  const dupIds = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))];
  if (dupIds.length) errs.push(dupIds.length + ' duplicate effect ids: ' + dupIds.slice(0, 5).join(', '));
  const sx = scryUrl('https://scryfall.com/search?q=keyword%3Aflying');
  if (!/is%3Afirstprint/.test(sx) || !/order=released&dir=desc/.test(sx)) errs.push('scryUrl transform broken: ' + sx);
  if (errs.length) { console.error('CHECK FAILED:\n - ' + errs.join('\n - ')); process.exit(1); }
  console.log('CHECK PASSED: ' + effects.length + ' effects · Flying primary in White · ' + withArt + ' effects have art');
}
