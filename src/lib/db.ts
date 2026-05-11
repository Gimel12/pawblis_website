import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "pawblis.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initDb(_db);
  }
  return _db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
      created_at TEXT DEFAULT (datetime('now')),
      consultation_date TEXT,
      owner_name TEXT NOT NULL,
      owner_email TEXT NOT NULL,
      dog_breed TEXT,
      dog_sex TEXT,
      dog_reproductive_status TEXT,
      consultation_reason TEXT,
      dog_weight TEXT,
      dog_birth_date TEXT,
      dog_adoption_date TEXT,
      adoption_status TEXT,
      dog_origin TEXT,
      consultation_motives TEXT,
      housing_type TEXT,
      interior_access TEXT,
      where_left_alone TEXT,
      how_stays_alone TEXT,
      walk_start_age TEXT,
      control_tools TEXT,
      food_type TEXT,
      food_brand TEXT,
      food_administration TEXT,
      treats TEXT,
      treats_when TEXT,
      is_glutton INTEGER DEFAULT 0,
      food_removal_reaction TEXT,
      walks_number_duration TEXT,
      post_walk_routine TEXT,
      feeding_schedule TEXT,
      other_animals TEXT DEFAULT '[]',
      socialization_family TEXT,
      socialization_strangers TEXT,
      socialization_known_dogs TEXT,
      socialization_unknown_dogs TEXT,
      elimination_behavior TEXT,
      sleep_location TEXT,
      uses_kongs TEXT,
      chases_bikes_kids TEXT,
      previous_training TEXT,
      training_method TEXT,
      play_behavior TEXT,
      phobias TEXT DEFAULT '[]',
      stimulus_reaction TEXT,
      repetitive_behavior TEXT,
      punishments_type TEXT,
      punishments_frequency TEXT,
      punishments_context TEXT,
      punishments_start TEXT,
      medical_history_type TEXT,
      medical_history_start TEXT,
      medical_history_frequency TEXT,
      consultation_observations TEXT,
      medical_problems TEXT,
      current_medication TEXT
    );
  `);
}
