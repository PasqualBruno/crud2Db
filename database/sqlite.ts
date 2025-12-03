import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("app.db");

export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS dishes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL
    );
  `);
}

// SQLite CRUD
export async function createDish(name: string, price: number) {
  await db.runAsync("INSERT INTO dishes (name, price) VALUES (?, ?)", [
    name,
    price,
  ]);
}

export async function getAllDishes() {
  return await db.getAllAsync("SELECT * FROM dishes");
}

export async function deleteDish(id: number) {
  await db.runAsync("DELETE FROM dishes WHERE id = ?", [id]);
}
