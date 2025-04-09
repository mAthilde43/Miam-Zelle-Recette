const express = require("express");
const router = express.Router();
const db = require("../db"); // Connexion à ta BDD

router.get("/", (req, res) => {
  const sql = "SELECT * FROM tips";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const tips = result.map((tip) => ({
      ...tip,
      description: JSON.parse(tip.description), // Si description est un JSON string
    }));

    res.json(tips);
  });
});

module.exports = router;
