const Database = require("better-sqlite3");
const path = require("path");

// Define la ruta del archivo SQLite.
const dbPath = path.join(__dirname, "..", "data", "inventory.db");

// Abre la base existente o la crea si no existe.
const db = new Database(dbPath);

// Mejora la lectura y escritura simultáneas.
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Carga productos iniciales solo cuando la tabla está vacía.
const { count } = db.prepare("SELECT COUNT(*) as count FROM products").get();
if (count === 0) {
  const insert = db.prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)");
  insert.run("Mouse", 300, 5);
  insert.run("Keyboard", 800, 0);
  insert.run("Monitor", 4500, 3);
}

module.exports = db;