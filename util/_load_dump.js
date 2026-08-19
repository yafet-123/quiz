// Push (load) the data from the aceitcom_quiz mysqldump into the remote database.
// Uses mysql2/promise with multipleStatements so the server parses the whole
// dump correctly (handles ';' inside string literals, transactions, etc.).
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
  multipleStatements: true,
  connectTimeout: 30000,
  // Per-query timeout (0 = no timeout) so a large load isn't killed.
  timeout: 0,
};

const DUMP_FILE = 'aceitcom_quiz.sql';

(async () => {
  const sql = fs.readFileSync(DUMP_FILE, 'utf8');
  console.log('Loaded dump:', DUMP_FILE, '(' + sql.length + ' bytes)');
  console.log('Connecting to', cfg.database, 'at', cfg.host + ':' + cfg.port);

  const conn = await mysql.createConnection(cfg);
  console.log('✅ Connected. Executing dump (schema + data)...\n');

  const start = Date.now();
  try {
    // The dump wraps everything in START TRANSACTION ... COMMIT, and sets
    // FOREIGN_KEY_CHECKS=0 before the DROP/CREATE/INSERTs. mysql2 with
    // multipleStatements executes them sequentially on one connection.
    const results = await conn.query(sql);
    const elapsed = (Date.now() - start) / 1000;

    const stmtCount = Array.isArray(results) ? results.length : 1;
    let inserted = 0;
    if (Array.isArray(results)) {
      for (const r of results) {
        if (r && typeof r.affectedRows === 'number') inserted += r.affectedRows;
      }
    }
    console.log('✅ Dump executed successfully in ' + elapsed.toFixed(1) + 's');
    console.log('   Statements executed:', stmtCount);
    console.log('   Total affected rows (incl. INSERTs):', inserted);
  } catch (e) {
    console.error('❌ Dump execution FAILED after ' + ((Date.now() - start) / 1000).toFixed(1) + 's');
    console.error('   Error:', e.message);
    // Best-effort rollback of the dump's transaction (if still open)
    try {
      await conn.query('ROLLBACK;');
      console.log('   Rolled back open transaction.');
    } catch (_) { /* ignore */ }
    await conn.end();
    process.exit(1);
  }

  await conn.end();
  console.log('\n✅ Data push complete. Connection closed.');
})().catch((e) => {
  console.error('❌ FATAL:', e.message);
  process.exit(1);
});
