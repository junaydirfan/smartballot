import Database, { Database as DatabaseType } from 'better-sqlite3';

let db: DatabaseType;

if (typeof window === 'undefined') {
  // Running on server-side
  const sqlite3 = (await import('better-sqlite3')).default;
  db = new sqlite3('./public/voters.sqlite');
} else {
  // Running on client-side
  const sqlite3 = (await import('better-sqlite3')).default;
  db = new sqlite3('voters.sqlite');
}

export default db;
