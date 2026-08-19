// Count the actual data rows present in the mysqldump (per table + total),
// by counting value-tuple lines (lines whose trimmed content starts with '(').
const fs = require('fs');
const sql = fs.readFileSync('aceitcom_quiz.sql', 'utf8');
const lines = sql.split(/\r?\n/);

let cur = null;
const per = {};
let total = 0;
for (const L of lines) {
  const t = L.trim();
  const m = t.match(/^INSERT\s+INTO\s+`([^`]+)`/i);
  if (m) cur = m[1];
  if (t.startsWith('(')) {
    total++;
    if (cur) per[cur] = (per[cur] || 0) + 1;
  }
}

console.log('=== Expected rows in dump (value-tuple lines) ===');
let sum = 0;
for (const k of Object.keys(per).sort()) {
  console.log(k.padEnd(26), per[k]);
  sum += per[k];
}
console.log('---'.repeat(2));
console.log('SUM per-table:', sum);
console.log('Total value-tuple lines:', total);
