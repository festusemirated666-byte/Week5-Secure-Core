const express = require("express");

const app = express();

app.get("/api/search", async (req, res) => {
  const term = String(req.query.q ?? "").trim();

  if (!term || term.length > 100) {
    return res.status(400).json({ error: "Invalid search term." });
  }

  const query = "SELECT id, name FROM products WHERE name LIKE ?";
  const rows = await db.query(query, [`%${term}%`]);

  res.json({ results: rows });
});

app.listen(3000);
