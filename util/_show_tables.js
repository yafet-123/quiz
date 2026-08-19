// Inspect actual DB table definitions (SHOW CREATE TABLE) for key tables
// to compare DB structure against schema.prisma.
const mysql = require('mysql2/promise');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const urlLine = env.split(/\r?\n/).find((l) => /^DATABASE_URL\s*=/.test(l));
const url = urlLine.replace(/^DATABASE_URL\s*=\s*/, '').trim().replace(/^"|"$/g, '');
const m = url.match(/^mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)$/);
const cfg = {
  user: m[1], password: m[2], host: m[3], port: Number(m[4]), database: m[5],
  multipleStatements: true, connectTimeout: 30000,
};

const TABLES = ['Book', 'Definition', 'DefinitionSheet', 'Worksheet', 'WorksheetOption', 'WorksheetQuestion', 'Note'];

(async () => {
  const conn = await mysql.createConnection(cfg);
  for (const t of TABLES) {
    console.log('\n===== TABLE `' + t + '` =====');
    const [rows] = await conn.query(`SHOW CREATE TABLE \`${t}\``);
    const def = rows[0]['Create Table'];
    console.log(def);
  }
  await conn.end();
})().catch((e) => { console.error('FAIL:', e.message); process.exit(1); });
