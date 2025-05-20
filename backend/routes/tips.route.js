const express = require("express");
const router = express.Router();
const Tips = require("../models/Tips"); // importer le modèle Tips

router.get("/", async (req, res) => {
  try {
    const tips = await Tips.findAll();

    const parsedTips = tips.map((tip) => {
      let descriptionParsed;
      try {
        descriptionParsed = JSON.parse(tip.description);
      } catch {
        descriptionParsed = tip.description;
      }
      return {
        ...tip.toJSON(), // convertir instance Sequelize en objet JS
        description: descriptionParsed,
      };
    });

    res.json(parsedTips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
