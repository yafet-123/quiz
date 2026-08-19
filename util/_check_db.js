// Read-only reconnaissance: inspect the remote MySQL DB state (tables + row counts).
const mysql = require('mysql2/promise');
const fs = require('fs');

// Parse DATABASE_URL from .env (mirrors util/_backup_db.js parsing)
const env = fs.readFileSync('.env', 'utf8');
const urlLine = env.split(/\r?\n/).find((l) => /^DATABASE_URL\s*=/.test(l));
if (!urlLine) {
  console.error('DATABASE_URL not found in .env');
  process.exit(1);
}
const url = urlLine.replace(/^DATABASE_URL\s*=\s*/, '').trim().replace(/^"|"$/g, '');
const m = url.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
if (!m) {
  console.error('Could not parse DATABASE_URL:', url);
  process.exit(1);
}
const cfg = {
  user: m[1],
  password: m[2],
  host: m[3],
  port: Number(m[4]),
  database: m[5],
  connectTimeout: 15000,
};

(async () => {
  console.log('Connecting to', cfg.database, 'at', cfg.host + ':' + cfg.port);
  const conn = await mysql.createConnection(cfg);
  console.log('✅ Connected.\n');

  // 1) List tables in the target database with approximate row counts
  const [rows] = await conn.query(
    `SELECT table_name AS table_name, table_rows AS table_rows
       FROM information_schema.tables
      WHERE table_schema = ?
      ORDER BY table_name`,
    [cfg.database]
  );

  let totalRows = 0;
  console.log('TABLES in database `' + cfg.database + '`:');
  console.log('------------------------------------------------');
  if (rows.length === 0) {
    console.log('(no tables — database is empty)');
  } else {
    for (const r of rows) {
      const cnt = Number(r.table_rows);
      totalRows += cnt;
      console.log((r.table_name + '').padEnd(28), 'rows:', cnt);
    }
  }
  console.log('------------------------------------------------');
  console.log('Total tables:', rows.length);
  console.log('Approx total rows:', totalRows);

  await conn.end();
  console.log('\n✅ Recon complete. Connection closed.');
})().catch((e) => {
  console.error('❌ RECON FAILED:', e.message);
  process.exit(1);
});
