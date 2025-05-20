const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const favorisCtrl = require("../controllers/favoris.controller");

router.post("/add", auth, favorisCtrl.addFavorite);
router.delete("/remove/:recipeId", auth, favorisCtrl.removeFavorite);
router.get("/", auth, favorisCtrl.getFavorites);

module.exports = router;
