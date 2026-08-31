const express = require("express");
const app = express();

const db = global.db || {
  async query() {
    throw new Error("Database is not configured.");
  }
};

function normalizeSearchTerm(value) {
  const term = String(value ?? "").trim();

  if (!term || term.length > 100) {
    return null;
  }

  if (!/^[\p{L}\p{N}\s._:-]+$/u.test(term)) {
    return null;
  }

  return term;
}

app.get("/api/search", async (req, res) => {
  const term = normalizeSearchTerm(req.query.q);

  if (!term) {
    return res.status(400).json({
      error: "Invalid search term."
    });
  }

  const safeTerm = term.replace(/[\\%_]/g, "\\$&");
  const query = "SELECT id, name FROM products WHERE name LIKE ? ESCAPE '\\'";
  const rows = await db.query(query, [`%${safeTerm}%`]);

  res.json({ results: rows });
});

module.exports = app;
