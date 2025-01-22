const express = require("express");
const recipeController = require("../controllers/recipe.controller");
// const auth = require("../middleware/auth");

const router = express.Router();

// router.post("/createRecipe", auth, recipeController.recipeCreate);
// router.put("/updateRecipe", auth, recipeController.recipeUpdate);
// router.delete("/deleteRecipe", auth, recipeController.recipeDelete);

router.get("/", recipeController.showRecipe);
router.post("/", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
