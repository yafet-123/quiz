// Verification: run SELECT COUNT(*) on every table to confirm data was loaded.
const mysql = require('mysql2/promise');
const fs = require('fs');

const env = fs.readFileSync('.env', 'utf8');
const urlLine = env.split(/\r?\n/).find((l) => /^DATABASE_URL\s*=/.test(l));
const url = urlLine.replace(/^DATABASE_URL\s*=\s*/, '').trim().replace(/^"|"$/g, '');
const m = url.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
const cfg = {
  user: m[1], password: m[2], host: m[3], port: Number(m[4]), database: m[5],
  multipleStatements: true,
  connectTimeout: 30000,
};

(async () => {
  const conn = await mysql.createConnection(cfg);
  console.log('Connected to', cfg.database, 'at', cfg.host + ':' + cfg.port, '\n');

  // Get ordered table list for this database
  const [tables] = await conn.query(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = ? ORDER BY table_name`,
    [cfg.database]
  );

  let grand = 0;
  console.log('TABLE'.padEnd(30), 'ROWS');
  console.log('-'.repeat(42));
  for (const t of tables) {
    const name = t.table_name;
    const [[r]] = await conn.query('SELECT COUNT(*) AS n FROM `' + name + '`');
    const cnt = Number(r.n);
    grand += cnt;
    console.log(name.padEnd(30), cnt);
  }
  console.log('-'.repeat(42));
  console.log('Total tables:'.padEnd(30), tables.length);
  console.log('TOTAL ROWS:'.padEnd(30), grand);

  await conn.end();
})().catch((e) => { console.error('❌ VERIFY FAILED:', e.message); process.exit(1); });
