const recipeService = require("../services/recipe.service");

const showRecipe = async (req, res) => {
  res.status(200).json({ message: "montrer les recettes" });
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await recipeService.createRecipe({ ...req.body });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  //   res.status(200).json({ message: "nouvelle recette crée" });
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const recipeData = req.body;
  try {
    const updatedRecipe = await recipeService.modifyRecipe(
      recipeId,
      recipeData
    );
    res.status(200).json({ message: "Votre recette a bien été modifié" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  //   res.status(200).json({ message: " recette modifié" });
};
const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;
  try {
    const deletedRecipe = await recipeService.destroyRecipe(recipeId);
    res.status(200).json({ message: "Votre recette a bien été supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

  //   res.status(200).json({ message: " recette supprimé" });
};

module.exports = { showRecipe, createRecipe, updateRecipe, deleteRecipe };
