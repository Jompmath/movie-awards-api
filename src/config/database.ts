import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

export class DatabaseConfig {
  private static instance: Database;

  public static getInstance(): Database {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new sqlite3.Database(':memory:');
    }
    return DatabaseConfig.instance;
  }

  public static async initialize(): Promise<void> {
    const db = DatabaseConfig.getInstance();
    
    await new Promise<void>((resolve, reject) => {
      db.run(`
        CREATE TABLE IF NOT EXISTS movies (
          year INTEGER,
          title TEXT,
          studios TEXT,
          producers TEXT,
          winner BOOLEAN
        )
      `, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
} 