// Minimal RFC-4180 CSV parser (handles quoted fields, embedded commas/newlines,
// and "" escapes). Returns { headers, rows } where each row is an object keyed
// by header. Zero dependencies. ponytail: enough for Notion exports, not a
// general CSV library — add edge cases only if a real export breaks it.
'use strict';

function parse(text) {
  // strip UTF-8 BOM
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
  const records = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else q = false;
      } else field += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); records.push(row); row = []; field = ''; }
      else if (c === '\r') { /* ignore */ }
      else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); records.push(row); }

  const headers = records.shift() || [];
  const rows = records
    .filter(r => r.length > 1 || (r.length === 1 && r[0] !== ''))
    .map(r => {
      const o = {};
      headers.forEach((h, i) => { o[h] = (r[i] !== undefined ? r[i] : '').trim(); });
      return o;
    });
  return { headers, rows };
}

module.exports = { parse };

// self-check
if (require.main === module) {
  const t = 'a,b,c\n1,"x,y","line\n2"\n3,"he said ""hi""",z\n';
  const { headers, rows } = parse(t);
  console.assert(headers.join('|') === 'a|b|c', 'headers');
  console.assert(rows.length === 2, 'row count: ' + rows.length);
  console.assert(rows[0].b === 'x,y', 'embedded comma: ' + rows[0].b);
  console.assert(rows[0].c === 'line\n2', 'embedded newline');
  console.assert(rows[1].b === 'he said "hi"', 'escaped quote: ' + rows[1].b);
  console.log('csv.js self-check passed');
}
