const recipeService = require("../services/recipe.service");

const showRecipe = async (req, res) => {
  res.status(200).json({ message: "montrer les recettes" });
};

const createRecipe = async (req, res) => {
  console.log("CONTROLLER", req.file);
  try {
    const newRecipe = await recipeService.createRecipe({
      ...req.body,
      image: req.file.path,
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRecipe = async (req, res) => {
  const recipeId = req.params.id;
  const recipeData = req.body;
  try {
    //verifier si recetet existe
    const recipeExist = await recipeService.findRecipeById(recipeId);

    //si elle existe la MAJ
    await recipeService.modifyRecipe(recipeExist.id, recipeData);

    res.status(200).json({ message: "Votre recette a bien été modifié" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id;
  try {
    const recipeExist = await recipeService.findRecipeById(recipeId);

    await recipeService.destroyRecipe(recipeExist.id);

    res.status(200).json({ message: "Votre recette a bien été supprimé" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { showRecipe, createRecipe, updateRecipe, deleteRecipe };
