const db = require("../db");

function toDTO(row) {
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    stock: row.stock,
    status: row.stock > 0 ? "Available" : "Out of stock",
  };
}

function getAll({ search } = {}) {
  let rows;
  if (search) {
    rows = db
      .prepare("SELECT * FROM products WHERE LOWER(name) LIKE LOWER(?) ORDER BY id DESC")
      .all(`%${search}%`);
  } else {
    rows = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
  }
  return rows.map(toDTO);
}

function getById(id) {
  const row = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  return row ? toDTO(row) : null;
}

function create({ name, price, stock }) {
  const result = db
    .prepare("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)")
    .run(name, price, stock);
  return getById(result.lastInsertRowid);
}

function update(id, { name, price, stock }) {
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(id);
  if (!existing) return null;

  db.prepare("UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?").run(
    name ?? existing.name,
    price ?? existing.price,
    stock ?? existing.stock,
    id
  );
  return getById(id);
}

function remove(id) {
  const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);
  return result.changes > 0;
}

module.exports = { getAll, getById, create, update, remove };