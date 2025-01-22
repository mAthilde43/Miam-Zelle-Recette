const recipeRepository = require("../repositories/recipe.repository");

const createRecipe = async (recipeData) => {
  return await recipeRepository.saveRecipe(recipeData);
};

const findRecipeById = async (recipeId) => {
  //   return await recipeRepository.getRecipeById(recipeId);
  const recipe = await recipeRepository.getRecipeById(recipeId);
  if (!recipe) {
    throw new Error("La recette demandée n'existe pas");
  }
  return recipe;
};

const modifyRecipe = async (recipeId, recipeData) => {
  return await recipeRepository.updateRecipe(recipeId, recipeData);
};

const destroyRecipe = async (recipeId) => {
  return await recipeRepository.deleteRecipe(recipeId);
};

module.exports = { createRecipe, findRecipeById, modifyRecipe, destroyRecipe };
