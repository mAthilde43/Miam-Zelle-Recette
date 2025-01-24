const express = require("express");
const recipeController = require("../controllers/recipe.controller");
const multer = require("../middleware/multer-config");
const router = express.Router();

router.get("/", recipeController.showRecipe);
router.post("/add", multer.single("image"), recipeController.createRecipe);
router.put("/:id", multer.single("image"), recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
