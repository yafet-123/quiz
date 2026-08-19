const mysql = require('mysql2/promise');
const fs = require('fs');

// Parse DATABASE_URL from .env
const env = fs.readFileSync('.env', 'utf8');
const urlLine = env.split(/\r?\n/).find(l => /^DATABASE_URL\s*=/.test(l));
const url = urlLine.replace(/^DATABASE_URL\s*=\s*/, '').trim().replace(/^"|"$/g, '');
const m = url.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
const cfg = { user: m[1], password: m[2], host: m[3], port: Number(m[4]), database: m[5] };

function sqlDate(d) {
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

(async () => {
  const conn = await mysql.createConnection(cfg);
  const [tables] = await conn.query(
    `SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME`,
    [cfg.database]
  );

  const out = [];
  out.push('-- =====================================================');
  out.push('-- BACKUP of ' + cfg.database + ' @ ' + cfg.host + ':' + cfg.port);
  out.push('-- Created ' + new Date().toISOString());
  out.push('-- =====================================================');
  out.push('SET FOREIGN_KEY_CHECKS = 0;');
  out.push('');

  for (const t of tables) {
    const table = t.TABLE_NAME;
    const [rows] = await conn.query('SELECT * FROM `' + table + '`');
    out.push('--' + '-'.repeat(60));
    out.push('DROP TABLE IF EXISTS `' + table + '`;');
    if (rows.length === 0) {
      out.push('-- (table `' + table + '` is empty - no data to back up)');
      continue;
    }
    const cols = Object.keys(rows[0]);
    const colList = cols.map(c => '`' + c + '`').join(', ');
    out.push('INSERT INTO `' + table + '` (' + colList + ') VALUES');
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const vals = cols.map(c => {
        const v = r[c];
        if (v === null || v === undefined) return 'NULL';
        if (v instanceof Date) return "'" + sqlDate(v) + "'";
        if (typeof v === 'number') return String(v);
        return conn.escape(v);
      });
      out.push('(' + vals.join(', ') + ')' + (i === rows.length - 1 ? ';' : ','));
    }
    out.push('');
  }

  out.push('SET FOREIGN_KEY_CHECKS = 1;');
  const file = 'db_backup_' + Date.now() + '.sql';
  fs.writeFileSync(file, out.join('\n'), 'utf8');
  console.log('Backup written to ' + file);
  console.log('Tables backed up: ' + tables.length);
  await conn.end();
})().catch(e => { console.error('BACKUP FAILED:', e.message); process.exit(1); });