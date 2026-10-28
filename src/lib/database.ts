import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export async function abrirBanco(): Promise<SQLite.SQLiteDatabase> {
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync('boom_patch.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS campeonatos (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      modalidade TEXT NOT NULL,
      dataInicio TEXT NOT NULL,
      dataFim TEXT NOT NULL,
      qtdTimes INTEGER NOT NULL,
      local TEXT NOT NULL,
      status TEXT NOT NULL,
      times TEXT NOT NULL
    );
  `);

  return db;
}
