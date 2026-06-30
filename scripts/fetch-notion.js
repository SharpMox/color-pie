// Fetch Color Pie data from the Notion REST API and write the 3 CSVs that
// scripts/build-data.js consumes — so a refresh is `node scripts/fetch-notion.js
// && node scripts/build-data.js --check`, no manual Notion export.
// Zero deps (Node built-ins + global fetch). Token: process.env.NOTION_TOKEN.
// Self-test (no token): node scripts/fetch-notion.js --selftest
'use strict';

const fs = require('fs');
const path = require('path');

const TOKEN = process.env.NOTION_TOKEN;
const VERSION = '2025-09-03'; // data-source query endpoint. ponytail: legacy is /v1/databases/{id}/query @ 2022-06-28 if this 404s.
const DIR = path.join(__dirname, '..', 'Notion Exports');

// Notion data-source (collection) IDs.
const DS = {
  effects:    '1eea3791-e75a-46d1-9303-00e18e044579',
  rankings:   '86f921a5-202e-45c8-a4c2-fb8554cf0297',
  cards:      '293e799c-2d2f-43f5-8be5-7ab4f5916c06',
  colors:     '32c6290a-d7b8-4671-b02c-8f2f35a9a218',
  categories: 'b556acf4-d2cb-44fb-ac30-432726fdd7ea',
};

const COLOR_COLS = [];
for (const c of ['⚪ White', '🔵 Blue', '⚫ Black', '🔴 Red', '🟢 Green', '◇ Colorless'])
  for (const s of ['', ' (Cheapest)', ' (Outdated)', ' (Iconic)', ' (Bends)', ' (Breaks)']) COLOR_COLS.push(c + s);
// 🟡 MultiColor: base (On-Rate) + Outdated only — no Cheapest/Iconic/Bends/Breaks columns exist
for (const s of ['', ' (Outdated)']) COLOR_COLS.push('🟡 MultiColor' + s);

const sleep = ms => new Promise(r => setTimeout(r, ms));
const pageUrl = id => 'https://www.notion.so/' + id.replace(/-/g, '');

// ---- Notion API ----
async function api(path, body) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch('https://api.notion.com' + path, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + TOKEN,
        'Notion-Version': VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if ((res.status === 429 || res.status >= 500) && attempt < 5) {
      await sleep((Number(res.headers.get('retry-after')) || 1) * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`Notion ${res.status} on ${path}: ${await res.text()}`);
    return res.json();
  }
}

async function queryAll(ds) {
  const out = [];
  let cursor;
  do {
    const body = { page_size: 100 };
    if (cursor) body.start_cursor = cursor;
    const d = await api(`/v1/data_sources/${ds}/query`, body);
    out.push(...d.results);
    cursor = d.has_more ? d.next_cursor : null;
    await sleep(350); // Notion ~3 req/s
  } while (cursor);
  return out;
}

// ---- property extraction (by the property's own type) ----
function val(p) {
  if (!p) return '';
  switch (p.type) {
    case 'title': return p.title.map(t => t.plain_text).join('');
    case 'rich_text': return p.rich_text.map(t => t.plain_text).join('');
    case 'select': return p.select ? p.select.name : '';
    case 'multi_select': return p.multi_select.map(s => s.name).join(', ');
    case 'number': return p.number == null ? '' : String(p.number);
    case 'url': return p.url || '';
    case 'unique_id':
      if (!p.unique_id) return '';
      return (p.unique_id.prefix ? p.unique_id.prefix + '-' : '') + p.unique_id.number;
    case 'files': { const f = (p.files || [])[0]; return f ? (f.file ? f.file.url : f.external ? f.external.url : '') : ''; }
    default: return '';
  }
}
const titleOf = page => { for (const k in page.properties) if (page.properties[k].type === 'title') return val(page.properties[k]); return ''; };
const indexOf = page => { for (const k in page.properties) if (page.properties[k].type === 'unique_id') return val(page.properties[k]); return ''; };
const relIds = (page, name) => { const p = page.properties[name]; return p && p.type === 'relation' ? p.relation.map(r => r.id) : []; };
const mapById = pages => Object.fromEntries(pages.map(p => [p.id, titleOf(p)]));
// Inverse of build-data.js relNames(): "Name (url), Name2 (url2)".
const relCell = (ids, map) => ids.map(id => `${map[id] || ''} (${pageUrl(id)})`).join(', ');

// ---- CSV serializer (inverse of scripts/csv.js parse()) ----
const csvField = v => { v = v == null ? '' : String(v); return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const toCSV = (headers, rows) =>
  [headers.map(csvField).join(','), ...rows.map(r => headers.map(h => csvField(r[h])).join(','))].join('\n') + '\n';

function writeCSV(name, headers, rows) {
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, name), toCSV(headers, rows));
  console.log(`${name}: ${rows.length} rows`);
}

async function main() {
  if (!TOKEN) {
    console.error('NOTION_TOKEN is not set. In CI it comes from the GitHub secret;\n' +
      'locally: export NOTION_TOKEN=ntn_…  The integration must be connected to the Color Pie hub page.');
    process.exit(1);
  }
  // Query sequentially so pacing keeps us under Notion's rate limit.
  const cards = await queryAll(DS.cards);
  const colors = await queryAll(DS.colors);
  const categories = await queryAll(DS.categories);
  const rankings = await queryAll(DS.rankings);
  const effects = await queryAll(DS.effects);

  const cardMap = mapById(cards), colorMap = mapById(colors), catMap = mapById(categories), rankMap = mapById(rankings);

  writeCSV('Example Cards.csv', ['Card', 'Image URL', 'Image'], cards.map(p => {
    const url = val(p.properties['Image URL']) || val(p.properties['Image']);
    return { Card: titleOf(p), 'Image URL': url, Image: url };
  }));

  writeCSV('Effects Rankings.csv', ['Effect', 'Primary', 'Secondary', 'Tertiary'], rankings.map(p => ({
    Effect: titleOf(p),
    Primary: relCell(relIds(p, 'Primary'), colorMap),
    Secondary: relCell(relIds(p, 'Secondary'), colorMap),
    Tertiary: relCell(relIds(p, 'Tertiary'), colorMap),
  })));

  const effHeaders = ['Effect', 'Index', 'Type', 'Interaction', 'Duration', 'Base Keyword',
    'Design Rationale', 'Scryfall Query', 'Sort Order', 'Category', 'Ranking', ...COLOR_COLS];
  writeCSV('Effects.csv', effHeaders, effects.map(p => {
    const r = {
      Effect: titleOf(p), Index: indexOf(p),
      Type: val(p.properties['Type']), Interaction: val(p.properties['Interaction']),
      Duration: val(p.properties['Duration']), 'Base Keyword': val(p.properties['Base Keyword']),
      'Design Rationale': val(p.properties['Design Rationale']), 'Sort Order': val(p.properties['Sort Order']),
      'Scryfall Query': val(p.properties['Scryfall Query']),
      Category: relCell(relIds(p, 'Category'), catMap), Ranking: relCell(relIds(p, 'Ranking'), rankMap),
    };
    for (const col of COLOR_COLS) r[col] = relCell(relIds(p, col), cardMap);
    return r;
  }));

  console.log('Done. Now run: node scripts/build-data.js --check');
}

// ---- self-check: serializer round-trips through csv.js, relation cell survives build-data's regex ----
function selftest() {
  const assert = require('assert');
  const { parse } = require('./csv.js');
  const headers = ['Effect', 'Note', '⚪ White'];
  const rows = [{
    Effect: 'Creature pumping — +N/+N (Auras)',
    Note: 'a,b "q"\nz',
    '⚪ White': `Sram, Senior Edificer (${pageUrl('abc')}), ❌ Not printed (${pageUrl('def')})`,
  }];
  const back = parse(toCSV(headers, rows));
  assert.strictEqual(back.headers.join('|'), headers.join('|'), 'headers');
  assert.strictEqual(back.rows[0]['Effect'], rows[0].Effect, 'title with em-dash+parens');
  assert.strictEqual(back.rows[0]['Note'], rows[0].Note, 'quotes+comma+newline');
  assert.strictEqual(back.rows[0]['⚪ White'], rows[0]['⚪ White'], 'relation cell');
  const re = /(.*?)\s*\((https?:\/\/[^)]+)\)(?=,\s|$)/g; // build-data.js:36
  const names = []; let m;
  while ((m = re.exec(back.rows[0]['⚪ White']))) { const n = m[1].replace(/^[,\s]+/, '').trim(); if (n) names.push(n); }
  assert.strictEqual(names.join('|'), 'Sram, Senior Edificer|❌ Not printed', 'relNames: ' + names.join('|'));
  console.log('selftest passed');
}

if (process.argv.includes('--selftest')) selftest();
else main().catch(e => { console.error(e.message); process.exit(1); });
