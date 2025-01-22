const recipeRepository = require("../repositories/recipe.repository");

const createRecipe = async (recipeData) => {
  return await recipeRepository.saveRecipe(recipeData);
};

const modifyRecipe = async (recipeId, recipeData) => {
  return await recipeRepository.updateRecipe(recipeId, recipeData);
};

const destroyRecipe = async (recipeId) => {
  return await recipeRepository.deleteRecipe(recipeId);
};

module.exports = { createRecipe, modifyRecipe, destroyRecipe };
// const recipeRepository = require("../repositories/recipe.repository");

// const createdRecipe = async (recipeData) => {
//   return await recipeRepository.createRecipe(recipeData);
// };

// const updatedRecipe = async (recipeId, updates) => {
//   return await recipeRepository.updateRecipe(recipeId, updates);
// };

// const deletedRecipe = async (recipeId) => {
//   return await recipeRepository.deleteRecipe(recipeId);
// };

// module.exports = { createdRecipe, updatedRecipe, deletedRecipe };
